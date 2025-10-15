import { FC } from 'react'
import { Stack, Button } from '@mui/material'
import { SocialMediaSelect } from '@/ui/fragments/select'
import { useSocialMediaQrCodeForm } from '../../hooks'
import { useFieldArray, Controller } from 'react-hook-form'
import { FormButton } from '@/ui/fragments/form/FormButton'
import type { RegisterSocialMediaQrCodeSchema } from '../../hooks/zod'
import { LabelTextField, UrlTextField } from '@/ui/fragments/textField'
import { Language } from '@/domains'
type Props = {
  language: Language
}

export const SocialMediaForm: FC<Props> = ({ language }) => {
  const { control, onConfirm, onDownload, ref } = useSocialMediaQrCodeForm({
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
      ref={ref}
    >
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <Stack key={field.id} direction="row" spacing={2}>
            <Controller
              control={control}
              name={`socialMedia.${index}.socialMedia`}
              render={({ field: { value, onChange } }) => (
                <SocialMediaSelect
                  value={value}
                  onChange={({ id }) => onChange(id)}
                  sx={{ width: 200 }}
                  isOptional={true}
                />
              )}
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
