import { beforeEach, describe, expect, it, vi } from 'vitest'
import { QrScannerRepository } from './QrScannerRepository'

// QrScannerのモック
vi.mock('qr-scanner', () => ({
  default: {
    scanImage: vi.fn()
  }
}))

describe('QrScannerRepository', () => {
  let repository: QrScannerRepository

  beforeEach(() => {
    repository = new QrScannerRepository()
    vi.clearAllMocks()
  })

  describe('scanFromImageUrl', () => {
    it('画像URLからQRコードをスキャンできる', async () => {
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce({
        data: 'https://example.com',
        cornerPoints: []
      })

      const result = await repository.scanFromImageUrl('blob:test-url')

      expect(result.data).toBe('https://example.com')
      expect(QrScanner.default.scanImage).toHaveBeenCalledWith('blob:test-url', {
        returnDetailedScanResult: true
      })
    })

    it('HTTP URLからQRコードをスキャンできる', async () => {
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce({
        data: 'Sample QR Data',
        cornerPoints: []
      })

      const result = await repository.scanFromImageUrl(
        'https://example.com/qr.png'
      )

      expect(result.data).toBe('Sample QR Data')
    })

    it('日本語を含むQRコードをスキャンできる', async () => {
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce({
        data: 'こんにちは、世界！',
        cornerPoints: []
      })

      const result = await repository.scanFromImageUrl('blob:test-url')

      expect(result.data).toBe('こんにちは、世界！')
    })

    it('スキャンエラー時はエラーをスローする', async () => {
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockRejectedValueOnce(
        new Error('No QR code found')
      )

      await expect(
        repository.scanFromImageUrl('blob:test-url')
      ).rejects.toThrow('No QR code found')
    })

    it('複数の画像を連続でスキャンできる', async () => {
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any)
        .mockResolvedValueOnce({
          data: 'First QR',
          cornerPoints: []
        })
        .mockResolvedValueOnce({
          data: 'Second QR',
          cornerPoints: []
        })

      const result1 = await repository.scanFromImageUrl('blob:test-url-1')
      const result2 = await repository.scanFromImageUrl('blob:test-url-2')

      expect(result1.data).toBe('First QR')
      expect(result2.data).toBe('Second QR')
    })

    it('長いテキストを含むQRコードをスキャンできる', async () => {
      const longText = 'a'.repeat(1000)
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce({
        data: longText,
        cornerPoints: []
      })

      const result = await repository.scanFromImageUrl('blob:test-url')

      expect(result.data).toBe(longText)
      expect(result.data.length).toBe(1000)
    })
  })
})

