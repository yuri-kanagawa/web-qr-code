import { IconButton, Stack, Typography } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import { FC, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

type Props = {
  isOpen: boolean
  setIsOpen: () => void
}

export const OpenButton: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <IconButton
      color="primary"
      onClick={setIsOpen}
      style={{
        transition: isOpen
          ? 'transform 0.5s ease-in-out' // 上向きから下向き（時計回り）
          : 'transform 0.5s ease', // 下向きから上向き（反時計回り）
        transform: isOpen
          ? 'rotate(0deg)' // 上から下に反転（反時計回り）
          : 'rotate(-180deg)' // 下から上に反転（時計回り）
      }}
    >
      <NavigateNextIcon />
      {isOpen && <Typography color={'black'}>閉じる</Typography>}
    </IconButton>
  )
}
