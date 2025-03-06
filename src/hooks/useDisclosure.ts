import { useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(true)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)
  return {
    isOpen,
    setIsOpen,
    onClose,
    onOpen,
    toggleOpen
  }
}
