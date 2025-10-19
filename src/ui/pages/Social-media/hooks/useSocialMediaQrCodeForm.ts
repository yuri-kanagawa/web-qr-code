import { Language } from '@/domains'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  registerSocialMediaQrCodeSchema,
  RegisterSocialMediaQrCodeSchema
} from './zod'

type Props = {
  language: Language
}
export const useSocialMediaQrCodeForm = ({ language }: Props) => {
  const defaultValues: RegisterSocialMediaQrCodeSchema = {
    socialMedia: [
      {
        socialMedia: 0,
        label: '',
        url: ''
      }
    ],
    language: language.value
  }
  const { handleSubmit, control, ...rest } =
    useForm<RegisterSocialMediaQrCodeSchema>({
      defaultValues,
      resolver: zodResolver(registerSocialMediaQrCodeSchema),
      mode: 'onChange'
    })

  const submitErrorHandler: SubmitErrorHandler<
    RegisterSocialMediaQrCodeSchema
  > = (errors) => {
    console.error(errors)
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    return "qr-generated"
  }

  return {
    control,
    onConfirm: handleConfirm,
    onDownload: () => console.log("Download functionality temporarily disabled"),
    ...rest
  }
}
