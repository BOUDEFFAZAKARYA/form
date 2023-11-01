/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          bodySizeLimit: '2mb',
        },
      },   
    /** Linting and typechecking are already done as separate tasks in the CI pipeline */
    // eslint: {
    //   ignoreDuringBuilds: true,
    // },
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
  }
module.exports = nextConfig
