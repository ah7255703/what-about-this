/** @type {import("next").NextConfig} */
export default {
  reactStrictMode: false,
  images:{
    domains:["picsum.photos"]
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false,
  },
};
