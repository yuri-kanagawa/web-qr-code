import { LabeledBox } from '@/ui/fragments/form'
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { FC } from 'react'

type Props = Omit<
  React.ComponentProps<typeof MuiColorInput>,
  'value' | 'onChange'
> & {
  value: string
  onChange: (value: string) => void
  showTransparency?: boolean
  transparencyLabel?: string
  transparentHelpText?: string
}

export const ColorInputWithTransparency: FC<Props> = ({
  value,
  onChange,
  showTransparency = true,
  transparencyLabel = 'Transparent',
  transparentHelpText,
  ...rest
}) => {
  const isTransparent = value === '' || value === 'transparent'
  const { label, ...restWithoutLabel } = rest

  const handleTransparencyChange = (checked: boolean) => {
    if (checked) {
      onChange('')
    } else {
      onChange('#ffffff')
    }
  }

  const handleColorChange = (newValue: string) => {
    onChange(newValue)
  }

  const content = (
    <Stack spacing={1}>
      {showTransparency && (
        <FormControlLabel
          control={
            <Checkbox
              checked={isTransparent}
              onChange={(e) => handleTransparencyChange(e.target.checked)}
            />
          }
          label={transparencyLabel}
        />
      )}
      <MuiColorInput
        {...restWithoutLabel}
        value={isTransparent ? '#ffffff' : value}
        onChange={handleColorChange}
        disabled={isTransparent}
      />
      {isTransparent && transparentHelpText && (
        <Typography variant="caption" color="text.secondary">
          {transparentHelpText}
        </Typography>
      )}
    </Stack>
  )

  if (label && typeof label === 'string') {
    return <LabeledBox label={label}>{content}</LabeledBox>
  }

  return content
}
