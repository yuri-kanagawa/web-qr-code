import { Language } from '@/domains/valueObjects/language'
import { Qr } from '@/domains/valueObjects/qr'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ReadQrFromFileUseCase } from './ReadQrFromFileUseCase'

// QrScannerのモック
vi.mock('qr-scanner', () => ({
  default: {
    scanImage: vi.fn()
  }
}))

// グローバルURLのモック
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
global.URL.revokeObjectURL = vi.fn()

describe('ReadQrFromFileUseCase', () => {
  let useCase: ReadQrFromFileUseCase
  const defaultLanguage = Language.default()

  beforeEach(() => {
    useCase = new ReadQrFromFileUseCase()
    vi.clearAllMocks()
  })

  describe('execute', () => {
    it('ファイルからQRコードを正しく読み取れる', async () => {
      // モックファイル
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      // QrScannerのモック
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce({
        data: 'https://example.com',
        cornerPoints: []
      })

      const result = await useCase.execute(file, defaultLanguage)

      expect(result).toBeInstanceOf(Qr)
      expect(result.value).toBe('https://example.com')
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(file)
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
    })

    it('QRコードスキャンが成功した後、ObjectURLを解放する', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce({
        data: 'https://example.com',
        cornerPoints: []
      })

      await useCase.execute(file, defaultLanguage)

      expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1)
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
    })

    it('スキャンエラー時もObjectURLを解放する', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockRejectedValueOnce(
        new Error('Scan failed')
      )

      await expect(useCase.execute(file, defaultLanguage)).rejects.toThrow(
        'Scan failed'
      )

      expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1)
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
    })

    it('無効なQRコードデータの場合はエラーをスローする', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce({
        data: '', // 空文字列は無効
        cornerPoints: []
      })

      await expect(useCase.execute(file, defaultLanguage)).rejects.toThrow()

      // エラーが発生してもObjectURLは解放される
      expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1)
    })

    it('日本語でエラーメッセージを返す', async () => {
      const japaneseLanguage = Language.create('ja').language!
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce({
        data: '',
        cornerPoints: []
      })

      await expect(useCase.execute(file, japaneseLanguage)).rejects.toThrow()
    })

    it('複数の異なるファイルを連続で処理できる', async () => {
      const file1 = new File(['test1'], 'test1.png', { type: 'image/png' })
      const file2 = new File(['test2'], 'test2.png', { type: 'image/png' })

      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any)
        .mockResolvedValueOnce({
          data: 'https://example1.com',
          cornerPoints: []
        })
        .mockResolvedValueOnce({
          data: 'https://example2.com',
          cornerPoints: []
        })

      const result1 = await useCase.execute(file1, defaultLanguage)
      const result2 = await useCase.execute(file2, defaultLanguage)

      expect(result1.value).toBe('https://example1.com')
      expect(result2.value).toBe('https://example2.com')
      expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(2)
    })

    it('QRコードに日本語が含まれている場合も正しく読み取れる', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })

      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce({
        data: 'こんにちは、世界！',
        cornerPoints: []
      })

      const result = await useCase.execute(file, defaultLanguage)

      expect(result.value).toBe('こんにちは、世界！')
    })
  })
})

