import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  ...(process.env.ANALYZE === "true" || process.env.NODE_ENV === "production"
    ? {}
    : { turbopack: {} }),

  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  transpilePackages: [],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  modularizeImports: {
    "react-icons": {
      transform: "react-icons/{{member}}",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.zephyratravels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.figma.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 65, 75, 85, 95, 100],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
    contentDispositionType: "inline",
    loader: "default",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/sitemap-packages.xml",
        destination: "/api/sitemap-packages",
      },
      {
        source: "/sitemap-blogs.xml",
        destination: "/api/sitemap-blogs",
      },
      {
        source: "/robots.txt",
        destination: "/robots.txt",
      },
    ];
  },

  experimental: {
    // Disable optimizeCss in development when using Turbopack to avoid CSS chunk issues
    optimizeCss: process.env.NODE_ENV === "production",
    scrollRestoration: true,
    optimizePackageImports: [
      "framer-motion",
      "react-icons",
      "lucide-react",
      "@headlessui/react",
      "react-toastify",
      "swiper",
    ],
    webpackBuildWorker: true,
    optimisticClientCache: true,
  },
  productionBrowserSourceMaps: false,
};

export default bundleAnalyzer(nextConfig);
