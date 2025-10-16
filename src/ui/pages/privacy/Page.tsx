'use client'

import { LEGAL_DATES } from '@/config'
import { Language } from '@/domains/valueObjects/language'
import { Box, Container, Typography } from '@mui/material'

type Props = {
  language: Language
}

export const PrivacyPolicyPage = ({ language }: Props) => {
  const locale = language.locale
  const lastUpdated = new Date(LEGAL_DATES.privacyPolicy)

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        {language.isEnglish ? 'Privacy Policy' : 'プライバシーポリシー'}
      </Typography>

      <Box sx={{ '& > *': { mb: 3 } }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '1. Information Collection' : '1. 情報の収集'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'This QR code generator operates entirely in your browser. We do not collect, store, or transmit any personal information or QR code content to our servers. All QR code generation is performed locally on your device.'
              : 'このQRコードジェネレーターは完全にブラウザ内で動作します。個人情報やQRコードのコンテンツを収集、保存、または当社のサーバーに送信することはありません。すべてのQRコード生成はお使いのデバイス上でローカルに実行されます。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish
              ? '2. Cookies and Local Storage'
              : '2. Cookieとローカルストレージ'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'We may use browser local storage to save your QR code settings and preferences for a better user experience. This data remains on your device and is not transmitted to us.'
              : 'より良いユーザー体験のために、ブラウザのローカルストレージを使用してQRコードの設定や環境設定を保存する場合があります。このデータはお使いのデバイスに保存され、当社に送信されることはありません。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish
              ? '3. Third-Party Services'
              : '3. 第三者サービス'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'This website may use third-party services for analytics or hosting. These services may collect information as described in their respective privacy policies.'
              : 'このウェブサイトは、分析やホスティングのために第三者サービスを使用する場合があります。これらのサービスは、それぞれのプライバシーポリシーに記載されている情報を収集する場合があります。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '4. Data Security' : '4. データセキュリティ'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'Since all QR code generation happens locally in your browser, your data never leaves your device. We cannot access or view any content you create.'
              : 'すべてのQRコード生成はブラウザ内でローカルに行われるため、データがお使いのデバイスを離れることはありません。作成されたコンテンツにアクセスしたり閲覧したりすることはできません。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish
              ? '5. Changes to Privacy Policy'
              : '5. プライバシーポリシーの変更'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.'
              : 'このプライバシーポリシーは随時更新される場合があります。変更があった場合は、このページに更新日とともに掲載されます。'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {language.isEnglish ? '6. Contact' : '6. お問い合わせ'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'If you have any questions about this privacy policy, please contact us at: '
              : 'このプライバシーポリシーに関するご質問がある場合は、以下までお問い合わせください：'}
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
