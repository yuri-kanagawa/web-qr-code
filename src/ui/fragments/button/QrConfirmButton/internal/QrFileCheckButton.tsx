import { FC, MutableRefObject, useCallback } from 'react'

import { useNotify, useQrScanner } from '@/hooks'

import { Button } from '@/ui/cores'

type Props = {
  file: File | null
  setQrInformation: (value: string) => void
}

export const QrFileCheckButton: FC<Props> = ({ file, setQrInformation }) => {
  const { successNotify, errorNotify } = useNotify()
  const { trigger } = useQrScanner()

  const onClick = useCallback(async () => {
    if (!file) return
    const objectUrl = URL.createObjectURL(file)

    try {
      const result = await trigger(objectUrl)

      setQrInformation(result.data)
    } catch (error) {
      errorNotify('読み込めない')
    }
  }, [errorNotify])
  return <Button onClick={onClick}>確認</Button>
}
