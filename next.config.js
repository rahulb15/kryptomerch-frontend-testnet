/* eslint-disable no-unused-vars */
const path = require("path");

module.exports = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "./src/assets/scss")],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    // images: {
    //     domains: [
    //         "res.cloudinary.com",
    //         "www.coindesk.com",
    //         "cointelegraph.com",
    //         "bitcoinist.com",
    //         "decrypt.co",
    //         "ipfs.io"
    //     ],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // eslint-disable-next-line no-param-reassign
        config.ignoreWarnings = [
            {
                message:
                    /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
            },
        ];
        return config;
    },
    generateBuildId: async () => {
        return 'my-build-id-' + Date.now()
      }
};
