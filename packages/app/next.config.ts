import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
};

module.exports = {
  allowedDevOrigins: ["http://localhost:3000", '192.168.1.90']
}

export default nextConfig;
