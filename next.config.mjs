/** @type {import("next").NextConfig} */
export default {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: ["picsum.photos"],
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false,
  },
};
