import { IQrScannerRepository } from '@/domains/repositories'
import { Language } from '@/domains/valueObjects/language'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ReadQrFromCanvasUseCase } from './usecase'

describe('ReadQrFromCanvasUseCase', () => {
  let useCase: ReadQrFromCanvasUseCase
  let mockQrScannerRepository: IQrScannerRepository
  let mockCanvas: HTMLCanvasElement

  beforeEach(() => {
    // リポジトリのモック
    mockQrScannerRepository = {
      scanFromImageUrl: vi.fn()
    }
    useCase = new ReadQrFromCanvasUseCase(
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
    it('CanvasからQRコードを正しく読み取れる', async () => {
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'https://example.com'
      })

      const result = await useCase.execute(mockCanvas)

      expect(result.isSuccess).toBe(true)
      expect(result.qrData).toBe('https://example.com')
      expect(result.imageDataUrl).toBe('data:image/png;base64,mockBase64Data')
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png')
      expect(mockQrScannerRepository.scanFromImageUrl).toHaveBeenCalledWith(
        'data:image/png;base64,mockBase64Data'
      )
    })

    it('JPEG形式で画像を生成できる', async () => {
      mockCanvas.toDataURL = vi.fn(
        () => 'data:image/jpeg;base64,mockBase64Data'
      )
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'test data'
      })

      const result = await useCase.execute(mockCanvas, 'image/jpeg')

      expect(result.isSuccess).toBe(true)
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg')
    })

    it('Canvasがnullの場合は失敗結果を返す', async () => {
      const result = await useCase.execute(null)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBe('Canvas element is null')
      expect(result.qrData).toBeNull()
      expect(result.imageDataUrl).toBeNull()
    })

    it('QRコードスキャンエラー時は失敗結果を返す', async () => {
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockRejectedValueOnce(
        new Error('Scan failed')
      )

      const result = await useCase.execute(mockCanvas)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBe('Scan failed')
    })

    it('Canvas.toDataURLがエラーの場合は失敗結果を返す', async () => {
      mockCanvas.toDataURL = vi.fn(() => {
        throw new Error('toDataURL failed')
      })

      const result = await useCase.execute(mockCanvas)

      expect(result.isFailure).toBe(true)
      expect(result.errorMessage).toBe('toDataURL failed')
    })

    it('日本語を含むQRコードを読み取れる', async () => {
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: 'こんにちは、世界！'
      })

      const result = await useCase.execute(mockCanvas)

      expect(result.isSuccess).toBe(true)
      expect(result.qrData).toBe('こんにちは、世界！')
    })

    it('長いテキストを含むQRコードを読み取れる', async () => {
      const longText = 'a'.repeat(1000)
      ;(mockQrScannerRepository.scanFromImageUrl as any).mockResolvedValueOnce({
        data: longText
      })

      const result = await useCase.execute(mockCanvas)

      expect(result.isSuccess).toBe(true)
      expect(result.qrData).toBe(longText)
      expect(result.qrData?.length).toBe(1000)
    })

    it('複数のCanvas要素を連続で処理できる', async () => {
      const canvas1 = {
        toDataURL: vi.fn(() => 'data:image/png;base64,canvas1')
      } as any
      const canvas2 = {
        toDataURL: vi.fn(() => 'data:image/png;base64,canvas2')
      } as any

      ;(mockQrScannerRepository.scanFromImageUrl as any)
        .mockResolvedValueOnce({ data: 'QR1' })
        .mockResolvedValueOnce({ data: 'QR2' })

      const result1 = await useCase.execute(canvas1)
      const result2 = await useCase.execute(canvas2)

      expect(result1.isSuccess).toBe(true)
      expect(result1.qrData).toBe('QR1')
      expect(result2.isSuccess).toBe(true)
      expect(result2.qrData).toBe('QR2')
    })
  })
})
