import { FC, useMemo } from 'react'
import { Stack, TextField } from '@mui/material'
import { SocialMediaSelect } from '@/ui/fragments/select'
import { useQrCode } from '@/hooks'

type Props = {}

export const SocialMediaUrl: FC<Props> = ({}) => {
  const { socialMedia, setSocialMedia, urls, setUrls } = useQrCode()
  const array = useMemo(() => {
    if (socialMedia.length === 0) {
      return [0]
    }
    return [...socialMedia, 0]
  }, [socialMedia])
  return (
    <Stack>
      {array.map((e, index) => (
        <Stack direction={'row'}>
          <SocialMediaSelect
            value={e}
            onChange={({ id }) => {
              const newSocialMedia = [...socialMedia]
              if (index < newSocialMedia.length) {
                newSocialMedia[index] = id
              } else {
                newSocialMedia.push(id)
              }
              setSocialMedia(newSocialMedia)
            }}
            sx={{ width: 200 }}
            isOptional={true}
          />
          <TextField
            value={urls[index] ?? ''}
            onChange={(event) => {
              const newUrls = [...urls]
              if (index < newUrls.length) {
                newUrls[index] = event.currentTarget.value
              } else {
                newUrls.push(event.currentTarget.value)
              }
              setUrls(newUrls)
            }}
          />
        </Stack>
      ))}
    </Stack>
  )
}
