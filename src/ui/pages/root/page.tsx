'use client'
import { Language } from '@/domains/valueObjects/language'
import { PathBuilder } from '@/lib/routing'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography
} from '@/ui/cores'
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
