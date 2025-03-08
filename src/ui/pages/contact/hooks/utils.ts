import { RegisterQrCodeContactSchema } from '@/ui/pages/contact/hooks/validation'

export const convertContact = (value: RegisterQrCodeContactSchema) => {
  return `
        BEGIN:VCARD
        VERSION:3.0
        FN:${value.lastName} ${value.firstName}
        N:${value.lastName};${value.firstName}
        ORG:${value.organization}
        TITLE: ${value.post}
        TEL;TYPE=CELL:+819012345678
        TEL;TYPE=WORK:+81312345678
        EMAIL:taro.yamada@example.com
        ADR;TYPE=WORK:;;1-2-3 ABCビル;虎ノ門;港区;東京都;105-0001;日本
        URL:http://www.example.com
        END:VCARD
        `
}
