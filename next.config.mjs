/** @type {import('next').NextConfig} */
const nextConfig = {
  /*compiler: {
    removeConsole: true,
  }*/
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'flowbite.s3.amazonaws.com',
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      }
    ],
  },
};

export default nextConfig;
