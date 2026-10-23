import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Inline scripts are limited to the pre-paint theme script and JSON-LD blocks.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 82],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2400],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/quote", destination: "/en/contact", permanent: true },
      { source: "/:locale(en|ar|zh)/quote", destination: "/:locale/contact", permanent: true },
      { source: "/:locale(en|ar|zh)/process", destination: "/:locale/rental-process", permanent: true },
      { source: "/:locale(en|ar|zh)/fleet", destination: "/:locale/equipment", permanent: true },
      { source: "/:locale(en|ar|zh)/equipment/truck-dumpers", destination: "/:locale/equipment/dump-trucks", permanent: true },
    ];
  },
};

export default nextConfig;
