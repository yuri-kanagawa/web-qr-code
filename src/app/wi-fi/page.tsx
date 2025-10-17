'use client'
import React from 'react'
import { Page as WiFiPage } from '@/ui/pages/Wi-fi'
import { Language } from '@/domains'

export default function Page() {
  return <WiFiPage language={Language.default()} ssid="" password="" type="" />
}
