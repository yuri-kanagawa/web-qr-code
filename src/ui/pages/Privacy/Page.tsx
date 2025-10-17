'use client'

import { LEGAL_DATES } from '@/config'
import { Language } from '@/domains/valueObjects/language'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography
} from '@mui/material'

type Props = {
  language: Language
}

export const PrivacyPolicyPage = ({ language }: Props) => {
  const locale = language.locale
  const lastUpdated = new Date(LEGAL_DATES.privacyPolicy)
  const privacy = locale.message.legal.privacy

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        {privacy.title}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {privacy.sections.informationCollection.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {privacy.sections.informationCollection.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {privacy.sections.cookies.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {privacy.sections.cookies.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {privacy.sections.thirdParty.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {privacy.sections.thirdParty.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {privacy.sections.dataSecurity.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {privacy.sections.dataSecurity.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {privacy.sections.changes.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {privacy.sections.changes.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {privacy.sections.contact.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {privacy.sections.contact.content}
              <a
                href="https://ledenm.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ledenm.com
              </a>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box
        sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
      >
        <Typography variant="body2" color="text.secondary">
          {privacy.lastUpdated}
          {lastUpdated.toLocaleDateString(
            language.isEnglish ? 'en-US' : 'ja-JP'
          )}
        </Typography>
      </Box>
    </Container>
  )
}
