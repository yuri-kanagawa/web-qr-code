import MuiPhoneNumber, { MuiPhoneNumberProps } from 'mui-phone-number'
import { FC } from 'react'

type PhoneNumberProps = MuiPhoneNumberProps

export const PhoneNumber: FC<PhoneNumberProps> = ({ ...props }) => {
  return (
    <MuiPhoneNumber
      {...props}
      onKeyDown={(e) => {
        // setSelectionRangeエラーを防ぐためのエラーハンドリング
        try {
          if (props.onKeyDown) {
            props.onKeyDown(e)
          }
        } catch (error) {
          console.error('PhoneNumber onKeyDown error:', error)
          // エラーを無視して処理を続行
        }
      }}
      onInput={(e) => {
        // setSelectionRangeエラーを防ぐためのエラーハンドリング
        try {
          if (props.onInput) {
            props.onInput(e)
          }
        } catch (error) {
          console.error('PhoneNumber onInput error:', error)
          // エラーを無視して処理を続行
        }
      }}
      onBlur={(e) => {
        // setSelectionRangeエラーを防ぐためのエラーハンドリング
        try {
          if (props.onBlur) {
            props.onBlur(e)
          }
        } catch (error) {
          console.error('PhoneNumber onBlur error:', error)
          // エラーを無視して処理を続行
        }
      }}
      onFocus={(e) => {
        // setSelectionRangeエラーを防ぐためのエラーハンドリング
        try {
          if (props.onFocus) {
            props.onFocus(e)
          }
        } catch (error) {
          console.error('PhoneNumber onFocus error:', error)
          // エラーを無視して処理を続行
        }
      }}
    />
  )
}
