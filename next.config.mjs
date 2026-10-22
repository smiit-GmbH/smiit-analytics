/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export to out/ – no server, any static host can serve it.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
