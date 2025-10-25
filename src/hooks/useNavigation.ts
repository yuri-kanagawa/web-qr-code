import { Language } from '@/domains'
import { PathBuilder } from '@/lib/routing'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export const useNavigation = (language: Language) => {
  const router = useRouter()
  const pathBuilder = useMemo(() => new PathBuilder(language), [language])

  const navigateToRoot = () => {
    router.push(pathBuilder.root)
  }

  const navigateToUrl = () => {
    router.push(pathBuilder.url.index)
  }

  const navigateToDevice = () => {
    router.push(pathBuilder.device.index)
  }

  const navigateToContact = () => {
    router.push(pathBuilder.contact.index)
  }

  const navigateToPhone = () => {
    router.push(pathBuilder.phone.index)
  }

  const navigateToEmail = () => {
    router.push(pathBuilder.email.index)
  }

  const navigateToSms = () => {
    router.push(pathBuilder.sms.index())
  }

  const navigateToMap = () => {
    router.push(pathBuilder.map.index)
  }

  const navigateToText = () => {
    router.push(pathBuilder.text.index)
  }

  const navigateToWifi = () => {
    router.push(pathBuilder.wifi.index)
  }

  const navigateToReader = () => {
    router.push(pathBuilder.reader.index)
  }

  const navigateToEdit = () => {
    router.push(pathBuilder.edit.index)
  }

  const navigateToPrivacy = () => {
    router.push(pathBuilder.privacy)
  }

  const navigateToTerms = () => {
    router.push(pathBuilder.terms)
  }

  return {
    pathBuilder, // パラメータが必要な場合はこれを使う
    navigateToRoot,
    navigateToUrl,
    navigateToDevice,
    navigateToContact,
    navigateToPhone,
    navigateToEmail,
    navigateToSms,
    navigateToMap,
    navigateToText,
    navigateToWifi,
    navigateToReader,
    navigateToEdit,
    navigateToPrivacy,
    navigateToTerms
  }
}
