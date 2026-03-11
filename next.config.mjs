/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allows importing from @/src, @/app, etc. via tsconfig paths
  experimental: {
    typedRoutes: false,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",       value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
