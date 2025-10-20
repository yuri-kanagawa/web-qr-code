import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'

export interface QrFormProps {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}
