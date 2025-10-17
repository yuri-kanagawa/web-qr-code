import { Box, FormLabel } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
}

export const FormSection = ({ label, children }: Props) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: 1,
        position: 'relative',
        px: 2,
        pt: 3,
        pb: 2,
        '&:hover': {
          borderColor: 'rgba(0, 0, 0, 0.87)'
        }
      }}
    >
      <FormLabel
        sx={{
          position: 'absolute',
          top: -10,
          left: 10,
          px: 0.5,
          bgcolor: 'background.paper',
          fontSize: '0.75rem'
        }}
      >
        {label}
      </FormLabel>
      {children}
    </Box>
  )
}
