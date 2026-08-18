// next.config.mjs
/** @type {import('next').NextConfig} */
const basePath = ''

export default {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
}
