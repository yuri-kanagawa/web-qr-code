import { Fab } from '@mui/material'
import { FC, useState } from 'react'
import { MdOutlineQrCode2 } from 'react-icons/md'
import { useDisclosure } from '@/hooks/useDisclosure'
import { QrDialog } from './QrDialog'

type Props = {}

export const QrFloatingActionButton: FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Fab color="primary" onClick={onOpen}>
        <MdOutlineQrCode2 size={30} />
      </Fab>
      <QrDialog isOpen={isOpen} onClose={onClose} />
    </>
  )
}
