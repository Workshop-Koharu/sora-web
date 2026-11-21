/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com", "media.giphy.com", "raw.githubusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/invite",
        destination: "https://discord.com/oauth2/authorize?client_id=1558397761861451805&permissions=0&integration_type=0&scope=bot%20applications.commands",
        permanent: false,
      },
      {
        source: "/server",
        destination: "https://discord.gg/rnD8HQDDz3",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
