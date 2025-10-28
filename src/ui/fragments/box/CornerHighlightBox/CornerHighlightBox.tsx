import { Box, BoxProps } from '@/ui/cores'
import { FC, ReactNode } from 'react'
type Props = {
  children: ReactNode
} & BoxProps
export const CornerHighlightBox: FC<Props> = ({ children, ...boxProps }) => {
  return (
    <Box
      {...boxProps}
      sx={{
        position: 'relative', // 角線や中央配置のための基点
        display: 'flex',
        alignItems: 'center', // 子コンポーネントを中央に配置
        justifyContent: 'center',
        margin: 'auto' // 中央配置を補助
      }}
    >
      {/* 子コンポーネント（中央に配置される内容） */}
      {children}

      {/* 左上の線 */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          width: '20px', // 横線の長さ
          height: '2px', // 横線の太さ
          backgroundColor: 'black' // 線の色
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          width: '2px', // 縦線の太さ
          height: '20px', // 縦線の長さ
          backgroundColor: 'black'
        }}
      />

      {/* 右上の線 */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '20px',
          height: '2px',
          backgroundColor: 'black'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '2px',
          height: '20px',
          backgroundColor: 'black'
        }}
      />

      {/* 左下の線 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          width: '20px',
          height: '2px',
          backgroundColor: 'black'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          width: '2px',
          height: '20px',
          backgroundColor: 'black'
        }}
      />

      {/* 右下の線 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          width: '20px',
          height: '2px',
          backgroundColor: 'black'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          width: '2px',
          height: '20px',
          backgroundColor: 'black'
        }}
      />
    </Box>
  )
}
