export type Props = {
  control: Control<RegisterQrCodeUrlSchema>
  file: File | null
  setFile: (value: File | null) => void
  onDownload: () => void
  onConfirm: () => Promise<string | undefined>
}
