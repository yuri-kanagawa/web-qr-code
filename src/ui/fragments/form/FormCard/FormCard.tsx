'use client'
import { FC, ReactNode } from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'

interface Props {
  title: string
  children: ReactNode
  variant?: 'required' | 'optional'
}

export const FormCard: FC<Props> = ({
  title,
  children,
  variant = 'required'
}) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {title}
            {variant === 'required' && (
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'error.main', ml: 1 }}
              >
                *
              </Typography>
            )}
            {variant === 'optional' && (
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.secondary', ml: 1 }}
              >
                (Optional)
              </Typography>
            )}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  )
}

export default FormCard
