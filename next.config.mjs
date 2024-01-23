/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tqlcwmklajozsjzxtskt.supabase.co",
            },
        ],
    },
};

export default nextConfig;
