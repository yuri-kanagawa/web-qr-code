import QrScanner from 'qr-scanner'

export const useQrScanner = () => {
  const trigger = async (value: string) => {
    return await QrScanner.scanImage(value, {
      returnDetailedScanResult: true
    })
  }

  return {
    trigger
  }
}
