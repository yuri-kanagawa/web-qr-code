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
  distDir: 'out'
}

export default nextConfig
