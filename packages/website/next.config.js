const dotenv = require("dotenv-flow");

const env = {};
const loaded = dotenv.config({
  node_env: process.env.APP_ENV || process.env.NODE_ENV || "development",
});
env["NEXT_PUBLIC_APP_ENV"] = process.env.APP_ENV;
Object.keys(process.env).forEach((key) => {
  if (key.startsWith("NEXT_PUBLIC_")) {
    env[key] = loaded.parsed[key];
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },

  images: {
    domains: ["assets.example.com", "loremflickr.com"],
  },
  env,
};

module.exports = nextConfig;
