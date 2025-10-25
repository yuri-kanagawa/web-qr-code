import { Language } from '@/domains/valueObjects/language'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { QrScannerRepository } from './repository'

// QrScannerのモック
vi.mock('qr-scanner', () => ({
  default: {
    scanImage: vi.fn()
  }
}))

describe('QrScannerRepository', () => {
  let repository: QrScannerRepository
  let language: Language

  beforeEach(() => {
    language = Language.default()
    repository = new QrScannerRepository(language)
    vi.clearAllMocks()
  })

  describe('scanFromImageUrl', () => {
    it('画像URLからQRコードをスキャンできる', async () => {
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce(
        'https://example.com'
      )

      const result = await repository.scanFromImageUrl('blob:test-url')

      expect(result.data).toBe('https://example.com')
      expect(QrScanner.default.scanImage).toHaveBeenCalledWith('blob:test-url')
    })

    it('HTTP URLからQRコードをスキャンできる', async () => {
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce(
        'Sample QR Data'
      )

      const result = await repository.scanFromImageUrl(
        'https://example.com/qr.png'
      )

      expect(result.data).toBe('Sample QR Data')
    })

    it('日本語を含むQRコードをスキャンできる', async () => {
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce(
        'こんにちは、世界！'
      )

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
        .mockResolvedValueOnce('First QR')
        .mockResolvedValueOnce('Second QR')

      const result1 = await repository.scanFromImageUrl('blob:test-url-1')
      const result2 = await repository.scanFromImageUrl('blob:test-url-2')

      expect(result1.data).toBe('First QR')
      expect(result2.data).toBe('Second QR')
    })

    it('長いテキストを含むQRコードをスキャンできる', async () => {
      const longText = 'a'.repeat(1000)
      const QrScanner = await import('qr-scanner')
      ;(QrScanner.default.scanImage as any).mockResolvedValueOnce(longText)

      const result = await repository.scanFromImageUrl('blob:test-url')

      expect(result.data).toBe(longText)
      expect(result.data.length).toBe(1000)
    })
  })
})
