import { LeftDrawer } from '@/ui/cores/drawer'
import { Box, Stack } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const PageWrapper = (props: Props) => {
  const { children } = props
  return (
    <Stack direction="row" spacing={30}>
      <LeftDrawer />
      <Box>{children}</Box>
    </Stack>
  )
}
