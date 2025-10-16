'use client'

import { LEGAL_DATES } from '@/config'
import { Language } from '@/domains/valueObjects/language'
import { Box, Container, Typography } from '@mui/material'

type Props = {
  language: Language
}

export const TermsOfServicePage = ({ language }: Props) => {
  const locale = language.locale
  const lastUpdated = new Date(LEGAL_DATES.termsOfService)

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        {language.isEnglish ? 'Terms of Service' : '利用規約'}
      </Typography>

      <Box sx={{ '& > *': { mb: 3 } }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '1. Acceptance of Terms' : '1. 規約の承認'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'By accessing and using this QR code generator service, you accept and agree to be bound by the terms and provisions of this agreement.'
              : 'このQRコードジェネレーターサービスにアクセスして使用することにより、本規約の条項および規定に拘束されることに同意したものとみなされます。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '2. Use of Service' : '2. サービスの使用'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'This service is provided free of charge for personal and commercial use. You may generate QR codes for any lawful purpose. You are responsible for the content you create and its use.'
              : 'このサービスは個人利用および商用利用のために無料で提供されています。合法的な目的のためにQRコードを生成することができます。作成したコンテンツとその使用については、お客様が責任を負うものとします。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '3. Prohibited Uses' : '3. 禁止事項'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'You agree not to use this service to create QR codes that: contain illegal content, infringe on intellectual property rights, distribute malware or viruses, engage in phishing or fraud, or violate any applicable laws or regulations.'
              : 'お客様は、以下のQRコードを作成するために本サービスを使用しないことに同意します：違法なコンテンツを含むもの、知的財産権を侵害するもの、マルウェアやウイルスを配布するもの、フィッシングや詐欺行為を行うもの、または適用される法律や規制に違反するもの。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '4. No Warranty' : '4. 免責事項'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'This service is provided "as is" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.'
              : '本サービスは「現状のまま」提供され、明示的または黙示的な保証はありません。サービスが中断されず、安全で、エラーがないことを保証するものではありません。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish
              ? '5. Limitation of Liability'
              : '5. 責任の制限'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this service.'
              : '本サービスの使用または使用不能から生じる直接的、間接的、偶発的、特別、または結果的な損害について、当社は一切の責任を負いません。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '6. Intellectual Property' : '6. 知的財産権'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'The QR codes you generate are yours to use freely. The service itself and its underlying code remain our property.'
              : '生成されたQRコードは、お客様が自由に使用できます。サービス自体とその基礎となるコードは当社の財産です。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '7. Changes to Terms' : '7. 規約の変更'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.'
              : '当社は、本規約をいつでも変更する権利を留保します。変更は、このページに掲載された時点で直ちに有効となります。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '8. Contact' : '8. お問い合わせ'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'If you have any questions about these terms, please contact us at: '
              : '本規約に関するご質問がある場合は、以下までお問い合わせください：'}
            <a
              href="https://ledenm.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ledenm.com
            </a>
          </Typography>
        </Box>

        <Box
          sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
        >
          <Typography variant="body2" color="text.secondary">
            {language.isEnglish ? 'Last Updated: ' : '最終更新日：'}
            {lastUpdated.toLocaleDateString(
              language.isEnglish ? 'en-US' : 'ja-JP'
            )}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
