'use client'
import { Language } from '@/domains/valueObjects/language'
import { PathBuilder } from '@/lib/routing'
import { Box, Card, CardContent, Container, Grid, Typography } from '@/ui/cores'
import EditIcon from '@mui/icons-material/Edit'
import LinkIcon from '@mui/icons-material/Link'
import PhoneIcon from '@mui/icons-material/Phone'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { FaCommentSms, FaWifi } from 'react-icons/fa6'
import { MdLocationOn, MdPermContactCalendar } from 'react-icons/md'
import { RiMailFill } from 'react-icons/ri'

interface Props {
  language: Language
}

const getFeatures = (pathBuilder: PathBuilder) => [
  {
    key: 'url',
    icon: <LinkIcon />,
    path: pathBuilder.url.index
  },
  {
    key: 'wifi',
    icon: <FaWifi />,
    path: pathBuilder.wifi.index
  },
  {
    key: 'device',
    icon: <SmartphoneIcon />,
    path: pathBuilder.device.index
  },
  {
    key: 'contact',
    icon: <MdPermContactCalendar size={24} />,
    path: pathBuilder.contact.index
  },
  {
    key: 'phone',
    icon: <PhoneIcon />,
    path: pathBuilder.phone.index()
  },
  {
    key: 'email',
    icon: <RiMailFill size={24} />,
    path: pathBuilder.email.index
  },
  {
    key: 'sms',
    icon: <FaCommentSms />,
    path: pathBuilder.sms.index()
  },
  {
    key: 'text',
    icon: <EditIcon />,
    path: pathBuilder.text.index
  },
  {
    key: 'map',
    icon: <MdLocationOn size={24} />,
    path: pathBuilder.map.index
  },
  {
    key: 'reader',
    icon: <QrCodeScannerIcon />,
    path: pathBuilder.reader.index
  }
]

export const Page: FC<Props> = ({ language }) => {
  const locale = language.getLocale()
  const word = locale.word

  const pathBuilder = useMemo(() => new PathBuilder(language), [language])
  const features = useMemo(() => getFeatures(pathBuilder), [pathBuilder])

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {word.topPage.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {word.topPage.subtitle}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.key}>
            <Card
              component={Link}
              href={feature.path}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
                  borderColor: 'primary.main',
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
                  '& .feature-icon': {
                    color: 'primary.dark',
                    transform: 'scale(1.15)'
                  }
                }
              }}
            >
              <CardContent
                sx={{ flexGrow: 1, textAlign: 'center', pt: 4, pb: 3 }}
              >
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
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  fontWeight={600}
                  sx={{ color: 'text.primary', mb: 1 }}
                >
                  {
                    word.features[feature.key as keyof typeof word.features]
                      .title
                  }
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {
                    word.features[feature.key as keyof typeof word.features]
                      .description
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
