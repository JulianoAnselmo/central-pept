/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Quando publicar em <user>.github.io/calcular-peps, defina PAGES_BASE=/calcular-peps
  // no workflow do GitHub Actions. Para domínio customizado, deixe vazio.
  basePath: process.env.PAGES_BASE || '',
  assetPrefix: process.env.PAGES_BASE || '',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
