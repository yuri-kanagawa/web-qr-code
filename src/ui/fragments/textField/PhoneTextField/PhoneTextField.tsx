// CELL	携帯電話 (Mobile)
// HOME	自宅の電話番号
// WORK	勤務先の電話番号
// FAX	ファックス番号
// PAGER	ポケベル (Pager)
// MAIN	メインの電話番号
// OTHER	その他の電話番号
// VOICE	音声通話が可能な番号
// TEXT	テキストメッセージ (SMS) が可能な番号
// VIDEO	ビデオ通話が可能な番号
// BBS	電子掲示板システム (Bulletin Board System)
// CAR	車載電話 (Car Phone)
// PREF	優先番号 (Preferred)
// TLX	テレックス番号 (Telex)
// 📝 複数のタイプを組み合わせることも可能
// plaintext
// コピーする
// 編集する
// TEL;TYPE=CELL,WORK:+819012345678
// TEL;TYPE=HOME,FAX:+81312345678

import { FC } from 'react'
import { PhoneProps } from '@/ui/fragments/textField/PhoneTextField/Device/Common/type'
import { ResponsiveSwitcher } from '@/ui/fragments/ResponsiveSwitcher'
import { Desktop, Mobile } from './Device'

export const PhoneTextField: FC<PhoneProps> = (props) => {
  return (
    <ResponsiveSwitcher
      desktop={<Desktop {...props} />}
      laptop={<Desktop {...props} />}
      tablet={<Mobile {...props} />}
      mobile={<Mobile {...props} />}
    />
  )
}
