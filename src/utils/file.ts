/**
 * 指定された画像ファイルをBase64形式の文字列に変換する関数
 * @param file - 変換する画像ファイル（Fileオブジェクト）
 * @returns Base64形式の文字列
 */
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result?.toString() || ''
      console.log('Base64 string generated:', base64String) // デバッグ用
      resolve(base64String)
    }

    reader.onerror = (error) => {
      console.error('FileReader error:', error) // エラーの内容をログに表示
      reject(error)
    }

    reader.readAsDataURL(file) // Base64エンコードのためにデータを読み込む
  })
}

/**
 * Base64文字列をFileオブジェクトに変換する関数
 * @param base64String - Base64形式の文字列
 * @param fileName - ファイル名（例: "image.png"）
 * @returns Fileオブジェクト
 */
export const convertBase64ToFile = (
  base64String: string,
  fileName: string
): File => {
  // Base64のプレフィックス（data:image/png;base64, など）を取り除く
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || ''
  const bstr = atob(arr[1]) // Base64をデコード
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  // バイナリデータをUint8Arrayに変換
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  // Fileオブジェクトを作成
  return new File([u8arr], fileName, { type: mime })
}
