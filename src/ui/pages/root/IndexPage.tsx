'use client'
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Slider,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { PageWrapper } from '@/ui/cores/pageWrapper'

import { Controller } from 'react-hook-form'
import { useUrlQRCodeForm } from '@/ui/pages/root/hooks/useUrlQRCodeForm'
import QrDownloadButton from '@/ui/cores/button/QrDownloadButton'
import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'
import { WidthSlider } from '@/ui/cores/slider'
import { HeightSlider } from '@/ui/cores/slider/heightSlider/HeightSlider'
import GeneratedQrcode from '@/ui/cores/qrcode/qrcode'
import { useRef } from 'react'
import { convertBase64ToFile } from '@/utils/file'
import QrCheckButton from '@/ui/cores/button/QrCheckButton'
import { usePathQueryParameter } from '@/ui/pages/root/hooks/usePathQueryParameter'
import { MuiColorInput } from 'mui-color-input'
import { OptionalForm } from '@/ui/fragments/Form'

export const IndexPage = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const onChange = (file: File | null) => {
    console.log('ファイルが選択されました:', file)
  }
  const handleClick = () => {
    if (ref.current) {
      console.log('QR Code ref:', ref.current) // refが正しく設定されているか確認
    } else {
      console.log('ref is null') // nullの場合のログ
    }
  }
  const { control, onSubmit } = useUrlQRCodeForm()
  const { url, bgColor, setBgColor, setFgColor, fgColor } =
    usePathQueryParameter()

  console.log('gvsgs', url)
  return (
    <>
      <PageWrapper>
        <Box component="form" onSubmit={onSubmit}>
          <Stack direction={'row'} spacing={10}>
            <Stack>
              <Controller
                control={control}
                name="url"
                render={({ field: { value, onChange }, fieldState }) => (
                  <TextField
                    label="URL*"
                    placeholder="https://"
                    value={value} // フィールドの値
                    onChange={(e) => {
                      onChange(e.currentTarget.value)
                    }} // onChange ハンドラ
                    error={!!fieldState.error} // エラー状態
                    helperText={fieldState.error?.message} // エラーメッセージ
                  />
                )}
              />
              <OptionalForm />
            </Stack>

            <Box>
              <GeneratedQrcode ref={ref} value={url} />

              <QrCheckButton ref={ref} />
              <Button type={'submit'}>Generate</Button>
              <QrDownloadButton ref={ref} />
              {/*<QrCheckButton forwardedRef={qrValue.ref} />*/}
            </Box>
          </Stack>

          {/*<SelectLevel />*/}
          {/*<MuiColorInput*/}
          {/*  format="hex"*/}
          {/*  value={value}*/}
          {/*  label={'Space Color'}*/}
          {/*  onChange={handleChange}*/}
          {/*  isAlphaHidden={true}*/}
          {/*/>*/}
          {/*<Checkbox checked={isSameRatio} onChange={setIsSameRatio} />*/}
        </Box>
        <Stack spacing={8}>
          <Stack direction={'row'}>
            <HeightSlider width={100} height={100}>
              <></>
            </HeightSlider>
          </Stack>

          <WidthSlider />
        </Stack>
      </PageWrapper>
    </>
  )
}
