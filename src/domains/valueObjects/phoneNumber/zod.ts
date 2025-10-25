import { Language } from '@/domains/valueObjects/language'
import { z } from 'zod'
import { PhoneNumber } from './valueObject'

export const createPhoneNumberZodSchema = (language: Language) =>
  z.string().refine(
    (value) => {
      // 空文字列は許可
      if (value.trim().length === 0) {
        return true
      }

      // PhoneNumberドメインのバリデーションを使用
      const result = PhoneNumber.create(value, language)
      return result.isSuccess
    },
    {
      message: language.locale.message.validation.phone.pleaseEnterValid
    }
  )
