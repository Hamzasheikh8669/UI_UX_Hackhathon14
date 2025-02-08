/** @type {import('next').NextConfig} */
const nextConfig = {


  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
          port: '',
          pathname: '/**',
          search: '',
        },
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
          port: '',
          pathname: '/**',
          search: '',
        },
        {
          protocol: 'https',
          hostname: 'randomuser.me',
          port: '',
          pathname: '/**',
          search: '',
        },
      ],
    },
};

export default nextConfig;