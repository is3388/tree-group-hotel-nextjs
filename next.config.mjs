/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gtgrzfuqtpxirkvcvxrn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**'
      }
    ],
    // unoptimized: true, if high memory usage and slow compiling time
  },
  //output: 'export' // for deployment to static hosting if all pages are static - pregenerate on the server
};

export default nextConfig;
