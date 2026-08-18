import type { NextConfig } from 'next';
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit ({
    swSrc: 'app/sw.ts',
    swDest: 'public/sw.js',
});

const nextConfig: NextConfig = {
    output: 'export',
    //comentar para rodar local: basePath: '/cifra',
    basePath: '/cifra',
    images: {
        unoptimized: true,
    },
};

export default withSerwist(nextConfig);
