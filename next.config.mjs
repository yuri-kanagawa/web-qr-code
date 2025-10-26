/** @types {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mui-color-input', 'qrcode'],
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  // 積極的なCSS最適化設定
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    // バンドル最適化
    optimizeServerReact: true,
    // メモリ使用量最適化
    memoryBasedWorkersCount: true
  },
  // コンパイラ最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

export default nextConfig
