import { Box, BoxProps, FormLabel } from '@mui/material'
import { FC, ReactNode } from 'react'

interface Props extends BoxProps {
  label: string
  children: ReactNode
}

export const LabeledBox: FC<Props> = ({ label, children, sx, ...rest }) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: 1,
        position: 'relative',
        px: 2,
        pt: 3,
        pb: 4,
        '&:hover': {
          borderColor: 'rgba(0, 0, 0, 0.87)'
        },
        ...sx
      }}
      {...rest}
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

export default LabeledBox
