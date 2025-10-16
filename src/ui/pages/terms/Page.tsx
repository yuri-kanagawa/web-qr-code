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

export const TermsOfServicePage = ({ language }: Props) => {
  const locale = language.locale
  const lastUpdated = new Date(LEGAL_DATES.termsOfService)
  const terms = locale.message.legal.terms

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        {terms.title}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {terms.sections.acceptance.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {terms.sections.acceptance.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {terms.sections.useOfService.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {terms.sections.useOfService.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {terms.sections.prohibited.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {terms.sections.prohibited.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {terms.sections.warranty.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {terms.sections.warranty.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {terms.sections.liability.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {terms.sections.liability.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {terms.sections.intellectual.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {terms.sections.intellectual.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {terms.sections.termsChanges.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {terms.sections.termsChanges.content}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {terms.sections.termsContact.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {terms.sections.termsContact.content}
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
          {terms.lastUpdated}
          {lastUpdated.toLocaleDateString(
            language.isEnglish ? 'en-US' : 'ja-JP'
          )}
        </Typography>
      </Box>
    </Container>
  )
}
