/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'mediumblue-porpoise-731818.hostingersite.com' },
      { protocol: 'https', hostname: 'rosybrown-ant-681893.hostingersite.com' },
      { protocol: 'http',  hostname: 'localhost' },
      { protocol: 'https', hostname: '**' },
      { protocol: 'http',  hostname: '**' },
    ],
  },
};

export default nextConfig;
