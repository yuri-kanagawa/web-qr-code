'use client'
import React, { FC, useMemo } from 'react'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextField } from '@mui/material'
import { useQrcode } from '@/hooks'

import dynamic from 'next/dynamic'

type Props = {}

export const TextPage: FC<Props> = ({}) => {
  const { text, setText } = useQrcode()
  const Map = useMemo(
    () =>
      dynamic(() => import('@/ui/cores/map/LeafletMap/LeafletMap'), {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }),
    []
  )

  return (
    <PageWrapper>
      <TextField
        placeholder="MultiLine with rows: "
        multiline
        rows={20}
        sx={{
          width: '30%'
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </PageWrapper>
  )
}
