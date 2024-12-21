import {
  Box,
  BoxProps,
  Button,
  Input,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { FC, useRef } from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { useSearchParams } from 'next/navigation'
import { convertImageToBase64 } from '@/utils/file'

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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || [])
    const selectedFile = selectedFiles[0]
    onChange(selectedFile)
    const url = new URL(window.location.href)
    const base64 = await convertImageToBase64(selectedFile)
    url.searchParams.set('file', base64)
    window.history.pushState({}, '', url.toString())
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const onClickPreview = () => {
    if (file == null) return
    const fileURL = URL.createObjectURL(file)
    window.open(fileURL, '_blank')
  }
  const onClickReset = () => {
    onChange(null)
  }

  return (
    <Stack width={props.width} height={props.height}>
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
            {/*<Typography>*/}
            {/*  ファイルを選択するか、ここにドラッグ&ドロップ*/}
            {/*</Typography>*/}
            {/*<Typography>1ファイル20MB以内、PDFファイル</Typography>*/}
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
      {/*<Stack>*/}
      {/*  {file && <GoPaperclip />}*/}
      {/*  {file && <Text color={message ? 'red' : 'green'}>{file.name}</Text>}*/}
      {/*  {file && <div style={{ flexGrow: 1 }}></div>}*/}
      {/*  {file && <Button onClick={onClickPreview}>プレビュー</Button>}*/}
      {/*  {file && <SmallCloseIcon onClick={onClickReset} />}*/}
      {/*</Stack>*/}
      <Box>{message && <TextField>{message}</TextField>}</Box>
    </Stack>
  )
}
