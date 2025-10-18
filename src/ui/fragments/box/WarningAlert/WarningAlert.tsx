import { Language } from '@/domains/valueObjects/language'
import { Alert, Stack, Typography } from '@mui/material'
import { FC } from 'react'

type Props = {
  language: Language
  title: string
  messages: string[]
  recommendedText?: string
}

export const WarningAlert: FC<Props> = ({
  language,
  title,
  messages,
  recommendedText
}) => {
  return (
    <Alert severity="warning" sx={{ mt: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
        {title}
      </Typography>
      <Stack spacing={0.5}>
        {messages.map((message, index) => (
          <Typography key={index} variant="caption" component="div">
            • {message}
          </Typography>
        ))}
      </Stack>
      {recommendedText && (
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
          {recommendedText}
        </Typography>
      )}
    </Alert>
  )
}
