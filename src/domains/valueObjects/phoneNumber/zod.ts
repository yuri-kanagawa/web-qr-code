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
      message: language.isJapanese
        ? '有効な電話番号の形式で入力してください（例: +1-555-123-4567, 03-1234-5678）'
        : language.isFrench
          ? 'Veuillez saisir un numéro de téléphone dans un format valide (ex: +1-555-123-4567, 03-1234-5678)'
          : 'Please enter a valid phone number format (e.g., +1-555-123-4567, 03-1234-5678)'
    }
  )
