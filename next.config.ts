import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    //comentar para rodar local: basePath: '/cifra',
    // basePath: '/cifra',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
