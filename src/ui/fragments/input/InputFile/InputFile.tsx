import { IconButton, Input, useTheme } from '@mui/material'

import { ImageFile } from '@/domains/valueObjects/imageFile'
import { Language } from '@/domains/valueObjects/language'
import { useClientSearchParams } from '@/hooks/useClientSearchParams'
import { Box, BoxProps, Button, Stack, TextField } from '@/ui/cores'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { FC, useEffect, useRef, useState } from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { TiDelete } from 'react-icons/ti'

type Props = {
  file: File | null
  onChange: (file: File | null) => void
  message?: string
  language: Language
} & Omit<BoxProps, 'onChange'>

export const InputFile: FC<Props> = ({
  file,
  onChange,
  message,
  language,
  ...props
}) => {
  console.log('InputFile props:', { file, onChange: typeof onChange, language })
  console.log('InputFile language:', language)
  console.log('InputFile language.locale:', language?.locale)
  
  if (!language) {
    console.error('InputFile: language is undefined')
    return null
  }
  
  const locale = language.locale
  const theme = useTheme()
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    const droppedFile = droppedFiles[0] as File
    console.log('InputFile: onChange called with droppedFile:', droppedFile)
    onChange(droppedFile)
  }
  const searchParams = useClientSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickFileSelect = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  const [image, setImage] = useState<string | undefined>(undefined)
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || [])
    const selectedFile = selectedFiles[0]
    console.log('InputFile: onChange called with selectedFile:', selectedFile)
    onChange(selectedFile)
  }
  useEffect(() => {
    const processFile = async () => {
      if (file) {
        try {
          const imageFileResult = ImageFile.create(file, language)
          if (imageFileResult.isSuccess && imageFileResult.imageFile) {
            const base64 = await imageFileResult.imageFile.toBase64()
            setImage(base64.value)
          }
        } catch (error) {
          console.error('Failed to convert file to base64:', error)
        }
      }
    }

    processFile()
  }, [file])

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  const onRemove = () => {
    console.log('onRemove called, current file:', file)
    if (!file) return
    console.log('InputFile: onChange called with null (onRemove)')
    onChange(null)
    setImage(undefined)
  }
  return (
    <Box>
      <CornerHighlightBox width={props.width} height={props.height}>
        <Stack
          width={props.width}
          height={props.height}
          sx={{ position: 'relative' }}
        >
          {!file && (
            <div onDrop={handleDrop} onDragOver={handleDragOver}>
              <Box
                {...props}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  borderRadius: 2,
                  bgcolor: 'action.hover',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'action.selected'
                  }
                }}
                onClick={onClickFileSelect}
              >
                <Stack alignItems="center" spacing={2} py={4}>
                  <IoCloudUploadOutline
                    size={80}
                    color={theme.palette.primary.main}
                  />

                  <Input
                    type={'file'}
                    inputRef={inputRef}
                    style={{ display: 'none' }}
                    inputProps={{ accept: '.jpg, .jpeg, .png' }}
                    onChange={handleFileChange}
                  ></Input>
                  <Button variant="contained" size="large">
                    {locale.word.buttons.selectFile}
                  </Button>
                </Stack>
              </Box>
            </div>
          )}
          {image && (
            <>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  p: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={image}
                  alt="uploaded image"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </Box>

              <IconButton
                color="error"
                size="large"
                sx={{
                  position: 'absolute',
                  top: -25,
                  right: -25
                }}
                onClick={onRemove}
              >
                <TiDelete />
              </IconButton>
            </>
          )}

          <Box>{message && <TextField>{message}</TextField>}</Box>
        </Stack>
      </CornerHighlightBox>
    </Box>
  )
}
