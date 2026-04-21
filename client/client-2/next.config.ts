// next.config.js (or next.config.ts)
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '.'), // or just omit this line if it's your project root
  },
};

export default nextConfig;