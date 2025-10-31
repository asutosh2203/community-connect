import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Any request to /api/...
        destination: "http://localhost:8008/api/:path*", // ...will be proxied to your backend
      },
    ];
  },
};

export default nextConfig;
