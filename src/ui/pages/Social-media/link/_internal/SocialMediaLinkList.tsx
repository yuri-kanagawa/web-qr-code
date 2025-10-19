'use client'
import { Button, Stack } from '@mui/material'

export const SocialMediaLinkList = () => {
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
