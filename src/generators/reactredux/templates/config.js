import path from 'path';

export default config = {
    build: {
        env: {
            'NODE_ENV': JSON.stringify('production')
        },
        assetsRoot: path.resolve(__dirname, 'output'),
        assetsSubDirectory: 'saiya/talkstar',
        assetsPublicPath: '/',
        productionSourceMap: false
    },
    dev: {
        env: {
            'NODE_ENV': JSON.stringify('development')
        },
        port: 8002,
        assetsSubDirectory: '',
        assetsPublicPath: '/static/',
        proxyTable: {}
    }
};
