import { IQrScannerRepository } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ReadQrFromFileUseCase } from './ReadQrFromFileUseCase'

// グローバルURLのモック
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
global.URL.revokeObjectURL = vi.fn()

describe('ReadQrFromFileUseCase', () => {
  let useCase: ReadQrFromFileUseCase
  let mockQrScannerRepository: IQrScannerRepository
  const defaultLanguage = Language.default()

  beforeEach(() => {
    // リポジトリのモック
    mockQrScannerRepository = {
      scanFromImageUrl: vi.fn()
    }
    useCase = new ReadQrFromFileUseCase(mockQrScannerRepository)
    vi.clearAllMocks()
  })

  describe('execute', () => {
    it('ファイルからQRコードを正しく読み取れる', async () => {
      // モックファイル
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      // リポジトリのモック
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'https://example.com'
      })

      const result = await useCase.execute(file, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.qr?.value).toBe('https://example.com')
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(file)
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
      expect(mockQrScannerRepository.scanFromImageUrl).toHaveBeenCalledWith(
        'blob:mock-url'
      )
    })

    it('QRコードスキャンが成功した後、ObjectURLを解放する', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'https://example.com'
      })

      const result = await useCase.execute(file, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1)
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
    })

    it('スキャンエラー時もObjectURLを解放し、失敗結果を返す', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      ;(mockQrScannerRepository.scanFromImageUrl as any).mockRejectedValueOnce(
        new Error('Scan failed')
      )

      const result = await useCase.execute(file, defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBe('Scan failed')
      expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1)
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
    })

    it('無効なQRコードデータの場合は失敗結果を返す', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: '' // 空文字列は無効
      })

      const result = await useCase.execute(file, defaultLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBeTruthy()
      // エラーが発生してもObjectURLは解放される
      expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1)
    })

    it('日本語でエラーメッセージを返す', async () => {
      const japaneseLanguage = Language.create('ja').language!
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: ''
      })

      const result = await useCase.execute(file, japaneseLanguage)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBeTruthy()
    })

    it('複数の異なるファイルを連続で処理できる', async () => {
      const file1 = new File(['test1'], 'test1.png', { type: 'image/png' })
      const file2 = new File(['test2'], 'test2.png', { type: 'image/png' })

      ;(mockQrScannerRepository.scanFromImageUrl as any)
        .mockResolvedValueOnce({
          data: 'https://example1.com'
        })
        .mockResolvedValueOnce({
          data: 'https://example2.com'
        })

      const result1 = await useCase.execute(file1, defaultLanguage)
      const result2 = await useCase.execute(file2, defaultLanguage)

      expect(result1.isSuccess).toBe(true)
      expect(result1.qr?.value).toBe('https://example1.com')
      expect(result2.isSuccess).toBe(true)
      expect(result2.qr?.value).toBe('https://example2.com')
      expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(2)
    })

    it('QRコードに日本語が含まれている場合も正しく読み取れる', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'こんにちは、世界！'
      })

      const result = await useCase.execute(file, defaultLanguage)

      expect(result.isSuccess).toBe(true)
      expect(result.qr?.value).toBe('こんにちは、世界！')
    })
  })
})
