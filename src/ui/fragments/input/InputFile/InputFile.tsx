import { IconButton, Input } from '@mui/material'

import { FC, useEffect, useRef, useState } from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { useSearchParams } from 'next/navigation'
import { ImageFile } from '@/domains/valueObjects/imageFile'
import { Language } from '@/domains/valueObjects/language'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { TiDelete } from 'react-icons/ti'
import { Box, BoxProps, Button, Stack, TextField } from '@/ui/cores'

type Props = {
  file: File | null
  onChange: (file: File | null) => void
  message?: string
} & Omit<BoxProps, 'onChange'>

export const InputFile: FC<Props> = ({ file, onChange, message, ...props }) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    const droppedFile = droppedFiles[0] as File
    onChange(droppedFile)
  }
  const searchParams = useSearchParams()
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
    onChange(selectedFile)
  }
  useEffect(() => {
    const processFile = async () => {
      if (file) {
        try {
          const imageFileResult = ImageFile.create(file, Language.default())
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
    if (!file) return
    onChange(null)
    setImage(undefined)
  }
  return (
    <Box>
      <CornerHighlightBox width={props.width} height={props.height}>
        <Stack width={props.width} height={props.height}>
          {!file && (
            <div onDrop={handleDrop} onDragOver={handleDragOver}>
              <Box
                {...props}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Stack alignItems="center">
                  <IoCloudUploadOutline size={50} />

                  <Input
                    type={'file'}
                    inputRef={inputRef}
                    style={{ display: 'none' }}
                    inputProps={{ accept: '.jpg, .jpeg, .png' }}
                    onChange={handleFileChange}
                  ></Input>
                  <Button onClick={onClickFileSelect}>ファイルを選択</Button>
                </Stack>
              </Box>
            </div>
          )}
          {image && (
            <>
              <img
                src={image}
                alt="uploaded image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

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
