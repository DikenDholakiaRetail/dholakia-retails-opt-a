import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack root — project path contains spaces which the auto-inferer
  // mishandles, causing "We couldn't find the Next.js package" failures.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    // Spec §1.13 — canonical About route is /the-group; old /about path redirects.
    return [
      { source: "/about", destination: "/the-group", permanent: true },
      { source: "/about/:path*", destination: "/the-group/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
