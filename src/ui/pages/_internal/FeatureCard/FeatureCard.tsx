import { Box, Card, CardContent, Typography } from '@/ui/cores'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

interface Props {
  icon: ReactNode
  path: string
  title: string
  description: string
}

export const FeatureCard: FC<Props> = ({ icon, path, title, description }) => {
  return (
    <Link href={path} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
            borderColor: 'primary.main',
            background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
            '& .feature-icon': {
              color: 'primary.dark',
              transform: 'scale(1.15)'
            }
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4, pb: 3 }}>
          <Box
            className="feature-icon"
            sx={{
              mb: 2.5,
              display: 'flex',
              justifyContent: 'center',
              color: 'primary.main',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontSize: '2.5rem'
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            fontWeight={600}
            sx={{ color: 'text.primary', mb: 1 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
