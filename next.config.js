/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  i18n: { locales: ["ja"], defaultLocale: "ja" },
  future: { strictPostcssConfiguration: true },
  pageExtensions: ["page.tsx", "page.ts"],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: [
      "ticketia-b34da.appspot.com",
      "firebasestorage.googleapis.com",
      "files.stripe.com",
    ],
  },
};

module.exports = nextConfig;
