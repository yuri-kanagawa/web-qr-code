import contactMeta from './contact/meta'
import deviceMeta from './device/meta'
import editMeta from './edit/meta'
import emailMeta from './email/meta'
import mapMeta from './map/meta'
import multipleMeta from './multiple/meta'
import phoneMeta from './phone/meta'
import privacyMeta from './privacy/meta'
import readerMeta from './reader/meta'
import rootMeta from './root/meta'
import smsMeta from './sms/meta'
import socialMediaMeta from './social-media/meta'
import termsMeta from './terms/meta'
import textMeta from './text/meta'
import urlMeta from './url/meta'
import wifiMeta from './wifi/meta'

export const meta = {
  root: rootMeta,
  index: rootMeta,
  map: mapMeta,
  url: urlMeta,
  wifi: wifiMeta,
  device: deviceMeta,
  contact: contactMeta,
  phone: phoneMeta,
  email: emailMeta,
  sms: smsMeta,
  text: textMeta,
  reader: readerMeta,
  socialMedia: socialMediaMeta,
  multiple: multipleMeta,
  edit: editMeta,
  privacy: privacyMeta,
  terms: termsMeta
}
