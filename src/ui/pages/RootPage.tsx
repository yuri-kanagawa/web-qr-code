'use client'
import { Language } from '@/domains/valueObjects/language'
import { PathBuilder } from '@/lib/routing'
import { Box, Container, Grid, Typography } from '@/ui/cores'
import EditIcon from '@mui/icons-material/Edit'
import LinkIcon from '@mui/icons-material/Link'
import PhoneIcon from '@mui/icons-material/Phone'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import { FC, useMemo } from 'react'
import { FaCommentSms, FaWifi } from 'react-icons/fa6'
import { MdLocationOn, MdPermContactCalendar } from 'react-icons/md'
import { RiMailFill } from 'react-icons/ri'
import { FeatureCard } from './_internal/FeatureCard'

interface Props {
  language: Language
}

export const Page: FC<Props> = ({ language }) => {
  const locale = language.locale
  const word = locale.word

  const pathBuilder = useMemo(() => new PathBuilder(language), [language])

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
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<LinkIcon />}
            path={pathBuilder.url.index}
            title={word.features.url.title}
            description={word.features.url.description}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<FaWifi />}
            path={pathBuilder.wifi.index}
            title={word.features.wifi.title}
            description={word.features.wifi.description}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<SmartphoneIcon />}
            path={pathBuilder.device.index}
            title={word.features.device.title}
            description={word.features.device.description}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<MdPermContactCalendar size={24} />}
            path={pathBuilder.contact.index}
            title={word.features.contact.title}
            description={word.features.contact.description}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<PhoneIcon />}
            path={pathBuilder.phone.index()}
            title={word.features.phone.title}
            description={word.features.phone.description}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<RiMailFill size={24} />}
            path={pathBuilder.email.index}
            title={word.features.email.title}
            description={word.features.email.description}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<FaCommentSms />}
            path={pathBuilder.sms.index()}
            title={word.features.sms.title}
            description={word.features.sms.description}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<EditIcon />}
            path={pathBuilder.text.index}
            title={word.features.text.title}
            description={word.features.text.description}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<MdLocationOn size={24} />}
            path={pathBuilder.map.index}
            title={word.features.map.title}
            description={word.features.map.description}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<QrCodeScannerIcon />}
            path={pathBuilder.reader.index}
            title={word.features.reader.title}
            description={word.features.reader.description}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
