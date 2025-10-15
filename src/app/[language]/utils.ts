import { Language } from '@/domains/valueObjects/language'
import { LanguageKey } from '@/locales'

/**
 * paramsからLanguage ValueObjectを生成
 * @param languageParam - URLパラメータの言語コード
 * @returns Language ValueObject（無効な場合はデフォルト）
 */
export function getLanguageFromParams(languageParam: string): Language {
  const languageResult = Language.create(languageParam)
  return languageResult.isSuccess && languageResult.language
    ? languageResult.language
    : Language.default()
}

/**
 * paramsから有効な言語キーを取得（メタデータ用）
 * @param languageParam - URLパラメータの言語コード
 * @returns 有効な言語キー（無効な場合は'en'）
 */
export function getValidLanguageKey(languageParam: string): LanguageKey {
  const languageResult = Language.create(languageParam)
  return languageResult.isSuccess && languageResult.language
    ? languageResult.language.value
    : 'en'
}

/**
 * 言語パラメータからメタデータオブジェクト全体を取得
 * @param languageParam - URLパラメータの言語コード
 * @returns メタデータオブジェクト全体
 */
export async function getMeta(languageParam: string) {
  const validLanguage = getValidLanguageKey(languageParam)
  const { meta } = await import(`@/locales/${validLanguage}/metas/meta`)
  return meta
}
