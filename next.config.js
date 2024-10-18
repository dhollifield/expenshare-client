/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "learn.g2.com",
        port: "",
        pathname: "/hubfs/businesstravelexpenseheader.jpg",
      },
    ],
  },
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = nextConfig;
