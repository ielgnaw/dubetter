/**
 * @file config
 * @author ielgnaw <wuji0223@gmail.com>
 */

import path from 'path';
import prodEnv from './prod.env';
import devEnv from './dev.env';

export default {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../output/index.html'),
        assetsRoot: path.resolve(__dirname, '../output'),
        // assetsSubDirectory: 'saiya/plan',
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 8003,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    }
}
