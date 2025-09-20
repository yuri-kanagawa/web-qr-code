import { useRouter } from 'next/navigation'
import { path } from '@/config/path'
import { Page as ReaderPage } from '@/ui/pages/reader/Page'

export default function Page() {
  return <ReaderPage language="en" />
}
