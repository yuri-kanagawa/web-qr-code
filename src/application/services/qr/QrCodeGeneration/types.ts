export interface QrGenerationResult {
  isSuccess: boolean
  canvas?: HTMLCanvasElement
  scanResult?: {
    data: string
    isReadable: boolean
  }
  error?: Error
}
