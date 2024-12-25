/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL:
          process.env.NODE_ENV === 'production'
            ? 'https://e-commerce-ruddy-pi.vercel.app'
            : 'http://localhost:3000',
      },
};

export default nextConfig;
