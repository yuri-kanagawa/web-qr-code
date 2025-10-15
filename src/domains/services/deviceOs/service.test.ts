import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { describe, expect, it } from 'vitest'
import { DeviceOsService } from './service'

describe('DeviceOsService', () => {
  const defaultLanguage = Language.default()

  describe('COMBINATIONS', () => {
    it('すべての組み合わせ定数が定義されている', () => {
      expect(DeviceOsService.COMBINATIONS.NOT_SET).toBe(0)
      expect(DeviceOsService.COMBINATIONS.WINDOWS_AND_ALL).toBe(1)
      expect(DeviceOsService.COMBINATIONS.WINDOWS_AND_MOBILE).toBe(2)
      expect(DeviceOsService.COMBINATIONS.WINDOWS_AND_TABLET).toBe(3)
      expect(DeviceOsService.COMBINATIONS.WINDOWS_AND_PC).toBe(4)
      expect(DeviceOsService.COMBINATIONS.MACINTOSH_AND_ALL).toBe(5)
      expect(DeviceOsService.COMBINATIONS.MACINTOSH_AND_MOBILE).toBe(6)
      expect(DeviceOsService.COMBINATIONS.MACINTOSH_AND_TABLET).toBe(7)
      expect(DeviceOsService.COMBINATIONS.MACINTOSH_AND_PC).toBe(8)
      expect(DeviceOsService.COMBINATIONS.IOS_AND_ALL).toBe(9)
      expect(DeviceOsService.COMBINATIONS.IOS_AND_MOBILE).toBe(10)
      expect(DeviceOsService.COMBINATIONS.IOS_AND_TABLET).toBe(11)
      expect(DeviceOsService.COMBINATIONS.IOS_AND_PC).toBe(12)
      expect(DeviceOsService.COMBINATIONS.ANDROID_AND_ALL).toBe(13)
      expect(DeviceOsService.COMBINATIONS.ANDROID_AND_MOBILE).toBe(14)
      expect(DeviceOsService.COMBINATIONS.ANDROID_AND_TABLET).toBe(15)
      expect(DeviceOsService.COMBINATIONS.ANDROID_AND_PC).toBe(16)
      expect(DeviceOsService.COMBINATIONS.LINUX_AND_ALL).toBe(17)
      expect(DeviceOsService.COMBINATIONS.LINUX_AND_MOBILE).toBe(18)
      expect(DeviceOsService.COMBINATIONS.LINUX_AND_TABLET).toBe(19)
      expect(DeviceOsService.COMBINATIONS.LINUX_AND_PC).toBe(20)
      expect(DeviceOsService.COMBINATIONS.OTHER_AND_ALL).toBe(21)
      expect(DeviceOsService.COMBINATIONS.OTHER_AND_MOBILE).toBe(22)
      expect(DeviceOsService.COMBINATIONS.OTHER_AND_TABLET).toBe(23)
      expect(DeviceOsService.COMBINATIONS.OTHER_AND_PC).toBe(24)
    })
  })

  describe('getDeviceOs', () => {
    describe('All Device', () => {
      const device = Device.all(defaultLanguage)

      it('Windows + All の組み合わせを返す', () => {
        const os = Os.windows(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.WINDOWS_AND_ALL)
      })

      it('Macintosh + All の組み合わせを返す', () => {
        const os = Os.macintosh(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.MACINTOSH_AND_ALL)
      })

      it('iOS + All の組み合わせを返す', () => {
        const os = Os.ios(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.IOS_AND_ALL)
      })

      it('Android + All の組み合わせを返す', () => {
        const os = Os.android(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.ANDROID_AND_ALL)
      })

      it('Linux + All の組み合わせを返す', () => {
        const os = Os.linux(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.LINUX_AND_ALL)
      })

      it('Other + All の組み合わせを返す', () => {
        const os = Os.other(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.OTHER_AND_ALL)
      })
    })

    describe('Mobile Device', () => {
      const device = Device.mobile(defaultLanguage)

      it('Windows + Mobile の組み合わせを返す', () => {
        const os = Os.windows(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.WINDOWS_AND_MOBILE)
      })

      it('Macintosh + Mobile の組み合わせを返す', () => {
        const os = Os.macintosh(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.MACINTOSH_AND_MOBILE)
      })

      it('iOS + Mobile の組み合わせを返す', () => {
        const os = Os.ios(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.IOS_AND_MOBILE)
      })

      it('Android + Mobile の組み合わせを返す', () => {
        const os = Os.android(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.ANDROID_AND_MOBILE)
      })

      it('Linux + Mobile の組み合わせを返す', () => {
        const os = Os.linux(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.LINUX_AND_MOBILE)
      })

      it('Other + Mobile の組み合わせを返す', () => {
        const os = Os.other(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.OTHER_AND_MOBILE)
      })
    })

    describe('Tablet Device', () => {
      const device = Device.tablet(defaultLanguage)

      it('Windows + Tablet の組み合わせを返す', () => {
        const os = Os.windows(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.WINDOWS_AND_TABLET)
      })

      it('Macintosh + Tablet の組み合わせを返す', () => {
        const os = Os.macintosh(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.MACINTOSH_AND_TABLET)
      })

      it('iOS + Tablet の組み合わせを返す', () => {
        const os = Os.ios(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.IOS_AND_TABLET)
      })

      it('Android + Tablet の組み合わせを返す', () => {
        const os = Os.android(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.ANDROID_AND_TABLET)
      })

      it('Linux + Tablet の組み合わせを返す', () => {
        const os = Os.linux(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.LINUX_AND_TABLET)
      })

      it('Other + Tablet の組み合わせを返す', () => {
        const os = Os.other(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.OTHER_AND_TABLET)
      })
    })

    describe('PC Device', () => {
      const device = Device.pc(defaultLanguage)

      it('Windows + PC の組み合わせを返す', () => {
        const os = Os.windows(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.WINDOWS_AND_PC)
      })

      it('Macintosh + PC の組み合わせを返す', () => {
        const os = Os.macintosh(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.MACINTOSH_AND_PC)
      })

      it('iOS + PC の組み合わせを返す', () => {
        const os = Os.ios(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.IOS_AND_PC)
      })

      it('Android + PC の組み合わせを返す', () => {
        const os = Os.android(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.ANDROID_AND_PC)
      })

      it('Linux + PC の組み合わせを返す', () => {
        const os = Os.linux(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.LINUX_AND_PC)
      })

      it('Other + PC の組み合わせを返す', () => {
        const os = Os.other(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.OTHER_AND_PC)
      })
    })

    describe('NotSet Device', () => {
      it('NotSet Device の場合は NOT_SET を返す', () => {
        const device = Device.notSet(defaultLanguage)
        const os = Os.windows(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.NOT_SET)
      })
    })

    describe('NotSet OS', () => {
      it('NotSet OS の場合は NOT_SET を返す', () => {
        const device = Device.mobile(defaultLanguage)
        const os = Os.notSet(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.NOT_SET)
      })
    })

    describe('Both NotSet', () => {
      it('デバイスもOSもNotSetの場合は NOT_SET を返す', () => {
        const device = Device.notSet(defaultLanguage)
        const os = Os.notSet(defaultLanguage)
        const result = DeviceOsService.getDeviceOs(device, os)

        expect(result).toBe(DeviceOsService.COMBINATIONS.NOT_SET)
      })
    })
  })
})

