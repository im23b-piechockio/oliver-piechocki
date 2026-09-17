/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // One root layout per language (app/(de), app/(en)), so 404 needs its own document.
    globalNotFound: true,
  },
};

export default nextConfig;
