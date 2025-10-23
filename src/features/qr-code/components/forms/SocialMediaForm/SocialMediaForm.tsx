import { Language, QrCode, SocialMedia } from '@/domains'
import { FormButton, SocialMediaSelect } from '@/features/qr-code'
import { LabelTextField, UrlTextField } from '@/ui/fragments/textField'
import { Button, Stack } from '@mui/material'
import { FC, useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import { useSocialMediaQrCodeForm } from './hooks'
import type { RegisterSocialMediaQrCodeSchema } from './hooks/zod'
type Props = {
  language: Language
}

export const SocialMediaForm: FC<Props> = ({ language }) => {
  const [settings, setSettings] = useState<QrCode>(QrCode.default(language))

  const {
    control,
    onConfirm,
    onDownload,
    formState: { isValid }
  } = useSocialMediaQrCodeForm({
    language
  })
  const { fields, append } = useFieldArray<RegisterSocialMediaQrCodeSchema>({
    control,
    name: 'socialMedia'
  })

  return (
    <FormButton
      onConfirm={onConfirm}
      onDownload={onDownload}
      value=""
      language={language}
      qr={settings}
      isValid={isValid}
    >
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <Stack key={field.id} direction="row" spacing={2}>
            <Controller
              control={control}
              name={`socialMedia.${index}.socialMedia`}
              render={({ field: { value, onChange } }) => {
                const socialMediaResult = SocialMedia.create(value, language)
                const socialMedia =
                  socialMediaResult.isSuccess && socialMediaResult.socialMedia
                    ? socialMediaResult.socialMedia
                    : SocialMedia.notSet(language)

                return (
                  <SocialMediaSelect
                    value={socialMedia}
                    onChange={(selectedSocialMedia) =>
                      onChange(selectedSocialMedia.value)
                    }
                    isOptional={true}
                    language={language}
                    label={language.locale.word.select.socialMedia}
                  />
                )
              }}
            />
            <Controller
              control={control}
              name={`socialMedia.${index}.label`}
              render={({ field: { value, onChange } }) => (
                <LabelTextField value={value} onChange={onChange} />
              )}
            />
            <Controller
              control={control}
              name={`socialMedia.${index}.url`}
              render={({ field: { value, onChange } }) => (
                <UrlTextField value={value} onChange={onChange} />
              )}
            />
          </Stack>
        ))}
        <Button
          type="button"
          onClick={() => append({ socialMedia: 0, label: '', url: '' })}
          variant="outlined"
        >
          追加
        </Button>
      </Stack>
    </FormButton>
  )
}
