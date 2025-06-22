import { RegisterQrCodeWiFiSchema } from "./zod"

export const isWiFiSchema = (value: string) => value.startsWith('WIFI:')

export const toWifiSchema = (value: RegisterQrCodeWiFiSchema): string => {
  return `WIFI:T:${value.type};S:${value.ssid};P:${value.password};;`
}

export const fromWifiSchema = (value: string): RegisterQrCodeWiFiSchema => {
  if (!value.startsWith('WIFI:')) {
    return {
      type: 'WPA',
      ssid: value,
      password: ''
    }
  }

  const wifiData = value.slice(5) // 'WIFI:' を削除
  const parts = wifiData.split(';')
  
  let type = 'WPA'
  let ssid = ''
  let password = ''

  for (const part of parts) {
    if (part.startsWith('T:')) {
      type = part.slice(2)
    } else if (part.startsWith('S:')) {
      ssid = part.slice(2)
    } else if (part.startsWith('P:')) {
      password = part.slice(2)
    }
  }

  return {
    type,
    ssid,
    password
  }
}