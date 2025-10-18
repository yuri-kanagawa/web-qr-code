/** @types {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mui-color-input'],
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'export',
  images: {
    unoptimized: true
  }
}

export default nextConfig
