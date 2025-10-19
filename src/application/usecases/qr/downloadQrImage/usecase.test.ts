import { QrCode } from '@/domains/repositories'
import { Language } from '@/domains/valueObjects/language'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DownloadQrImageUseCase } from './usecase'

describe('DownloadQrImageUseCase', () => {
  let useCase: DownloadQrImageUseCase
  let mockQrScannerRepository: IQrScannerRepository
  let mockCanvas: HTMLCanvasElement

  beforeEach(() => {
    // リポジトリのモック
    mockQrScannerRepository = {
      scanFromImageUrl: vi.fn()
    }
    useCase = new DownloadQrImageUseCase(
      mockQrScannerRepository,
      Language.default()
    )

    // Canvas要素のモック
    mockCanvas = {
      toDataURL: vi.fn(() => 'data:image/png;base64,mockBase64Data')
    } as any

    vi.clearAllMocks()
  })

  describe('execute', () => {
    it('CanvasからダウンロードURLを正しく取得できる', async () => {
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'https://example.com'
      })

      const result = await useCase.execute(mockCanvas, 'test.png')

      expect(result.isSuccess).toBe(true)
      expect(result.dataUrl).toBe('data:image/png;base64,mockBase64Data')
      expect(result.fileName).toBe('test.png')
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png')
    })

    it('ファイル名をデフォルトで設定できる', async () => {
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'test'
      })

      const result = await useCase.execute(mockCanvas)

      expect(result.isSuccess).toBe(true)
      expect(result.fileName).toBe('qr.png')
    })

    it('JPEG形式で画像を生成できる', async () => {
      mockCanvas.toDataURL = vi.fn(() => 'data:image/jpeg;base64,mockJpegData')
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'test'
      })

      const result = await useCase.execute(mockCanvas, 'qr.jpg', 'image/jpeg')

      expect(result.isSuccess).toBe(true)
      expect(result.dataUrl).toBe('data:image/jpeg;base64,mockJpegData')
      expect(result.fileName).toBe('qr.jpg')
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg')
    })

    it('Canvasがnullの場合は失敗結果を返す', async () => {
      const result = await useCase.execute(null, 'test.png')

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBe('Canvas element is null')
      expect(result.dataUrl).toBeNull()
      expect(result.fileName).toBeNull()
    })

    it('QRコード検証エラー時は失敗結果を返す', async () => {
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockRejectedValueOnce(
        new Error('Invalid QR code')
      )

      const result = await useCase.execute(mockCanvas, 'test.png')

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBe('Invalid QR code')
    })

    it('Canvas.toDataURLがエラーの場合は失敗結果を返す', async () => {
      mockCanvas.toDataURL = vi.fn(() => {
        throw new Error('toDataURL failed')
      })

      const result = await useCase.execute(mockCanvas, 'test.png')

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBe('toDataURL failed')
    })

    it('カスタムファイル名を設定できる', async () => {
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'test'
      })

      const result = await useCase.execute(mockCanvas, 'my-custom-qr.png')

      expect(result.isSuccess).toBe(true)
      expect(result.fileName).toBe('my-custom-qr.png')
    })
  })
})
