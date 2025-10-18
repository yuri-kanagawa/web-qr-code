/** @types {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mui-color-input'],
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig
