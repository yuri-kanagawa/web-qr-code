'use client'
import { FC } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  Container
} from '@/ui/cores'
import Link from 'next/link'
import { path } from '@/config/path'
import { word as enWord } from '@/locales/en/word'
import { word as jaWord } from '@/locales/ja/word'
import LinkIcon from '@mui/icons-material/Link'
import { FaWifi } from 'react-icons/fa6'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import { MdPermContactCalendar } from 'react-icons/md'
import PhoneIcon from '@mui/icons-material/Phone'
import { RiMailFill } from 'react-icons/ri'
import { FaCommentSms } from 'react-icons/fa6'
import EditIcon from '@mui/icons-material/Edit'
import { MdLocationOn } from 'react-icons/md'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'

interface Props {
  language?: string
}

const getFeatures = (lang: string) => [
  {
    key: 'url',
    icon: <LinkIcon />,
    path: path.url.index({ lang })
  },
  {
    key: 'wifi',
    icon: <FaWifi />,
    path: path.wifi.index({ lang })
  },
  {
    key: 'device',
    icon: <SmartphoneIcon />,
    path: path.device.index({ lang })
  },
  {
    key: 'contact',
    icon: <MdPermContactCalendar size={24} />,
    path: path.contact.index({ lang })
  },
  {
    key: 'phone',
    icon: <PhoneIcon />,
    path: path.phone.index({ lang })
  },
  {
    key: 'email',
    icon: <RiMailFill size={24} />,
    path: path.email.index({ lang })
  },
  {
    key: 'sms',
    icon: <FaCommentSms />,
    path: path.sms.index({ lang })
  },
  {
    key: 'text',
    icon: <EditIcon />,
    path: path.text.index({ lang })
  },
  {
    key: 'map',
    icon: <MdLocationOn size={24} />,
    path: path.map.index({ lang })
  },
  {
    key: 'reader',
    icon: <QrCodeScannerIcon />,
    path: path.reader.index({ lang })
  }
]

export const Page: FC<Props> = ({ language = 'en' }) => {
  const word = language === 'ja' ? jaWord : enWord
  const features = getFeatures(language)

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
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition:
                  'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 3 }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {
                    word.features[feature.key as keyof typeof word.features]
                      .title
                  }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {
                    word.features[feature.key as keyof typeof word.features]
                      .description
                  }
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  component={Link}
                  href={feature.path}
                  variant="contained"
                  fullWidth
                  sx={{ mx: 2 }}
                >
                  {word.buttons.confirm}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
