'use client'
import { Button, Stack } from '@mui/material'
import { useQrCode } from '@/hooks/useQrCode'

export const SocialMediaLinkList = () => {
  const { socialMedia, urls, labels } = useQrCode()
  return (
    <Stack spacing={2}>
      {socialMedia.map((sm, idx) => (
        <Button
          key={idx}
          variant="contained"
          onClick={() => window.open(urls[idx], '_blank')}
        >
          {labels[idx] ?? ''}
        </Button>
      ))}
    </Stack>
  )
}
