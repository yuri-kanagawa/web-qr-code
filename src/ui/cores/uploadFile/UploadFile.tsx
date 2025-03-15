import {
  Box,
  BoxProps,
  Button,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { FC, useEffect, useRef, useState } from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { useSearchParams } from 'next/navigation'
import { convertImageToBase64 } from '@/utils/file'
import { CornerHighlightBox } from '@/ui/cores/box'
import { addQueryParameter } from '@/utils/queryParameter'
import { CgRemoveR } from 'react-icons/cg'
import { TiDelete } from 'react-icons/ti'

type Props = {
  file: File | null
  onChange: (file: File | null) => void
  message?: string
} & Omit<BoxProps, 'onChange'>

export const UploadFile: FC<Props> = ({
  file,
  onChange,
  message,
  ...props
}) => {
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
          const base64 = await convertImageToBase64(file)
          setImage(base64)
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
                // sx={{
                //   borderStyle: 'dotted',
                //   borderWidth: '2px',
                //   borderColor: 'black',
                //   borderRadius: '10px 10px'
                // }}
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
                    onChange={handleFileChange}
                  ></Input>
                  <Button
                    // leftIcon={<AddIcon />}
                    // colorScheme="blue"
                    onClick={onClickFileSelect}
                  >
                    ファイルを選択
                  </Button>
                </Stack>
              </Box>
            </div>
          )}
          {image && (
            <>
              {/*<div>*/}
              {/*  <CgRemoveR*/}
              {/*    size={20} // アイコンサイズを指定*/}
              {/*    style={{ cursor: 'pointer' }} // クリック可能なスタイル*/}
              {/*    onClick={() => console.log('sfsijio')}*/}
              {/*  />*/}
              {/*</div>*/}
              {/*<Box component="img" src={image} alt="Preview" />*/}
              <Box
                component="img"
                src={image}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* ボタン */}
              <IconButton
                color="error"
                size="large"
                sx={{
                  position: 'absolute',
                  top: -25,
                  right: -25,
                  zIndex: 9999 // 高いzIndexで他の要素より上に表示
                }}
                onClick={onRemove}
              >
                <TiDelete />
              </IconButton>
            </>
          )}
          {/*<Stack>*/}
          {/*  {file && <GoPaperclip />}*/}
          {/*  {file && <Text color={message ? 'red' : 'green'}>{file.name}</Text>}*/}
          {/*  {file && <div style={{ flexGrow: 1 }}></div>}*/}
          {/*  {file && <Button onClick={onClickPreview}>プレビュー</Button>}*/}
          {/*  {file && <SmallCloseIcon onClick={onClickReset} />}*/}
          {/*</Stack>*/}

          <Box>{message && <TextField>{message}</TextField>}</Box>
        </Stack>
      </CornerHighlightBox>
    </Box>
  )
}
