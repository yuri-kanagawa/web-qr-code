export interface ConfirmQrCodeResult {
  isSuccess: boolean
  canvas?: HTMLCanvasElement
  scanResult?: {
    data: string
    isReadable: boolean
  }
  error?: Error
}
