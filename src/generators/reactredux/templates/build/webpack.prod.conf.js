/**
 * @file webpack prod config
 * @author ielgnaw <wuji0223@gmail.com>
 */

import {join} from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';

import RemoveScriptTagPlugin from './remove-script-tag-plugin';
import config from '../config';
import {assetsPath, styleLoaders} from './utils';
import baseWebpackConfig from './webpack.base.conf';

/**
 * webpack plugin 集合
 *
 * @type {Array}
 */
const webpackPluginList = [
    new webpack.DefinePlugin({
        'process.env': config.build.env
    }),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
            // 在 UglifyJs 删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 console，可以兼容 ie 浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
        },
        output: {
            comments: false
        }
    }),
    // extract css into its own file
    new ExtractTextPlugin(assetsPath('css/[name].[contenthash].css')),

    new HtmlWebpackPlugin({
        filename: config.build.index,
        template: 'index.html',
        inject: 'body',
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        // 如果打开 vendor 和 manifest 那么需要配置 chunksSortMode 保证引入 script 的顺序
        chunksSortMode: 'dependency'
    }),

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => module.resource
            && /\.js$/.test(module.resource)
            && module.resource.indexOf(join(__dirname, '../node_modules')) === 0
    }),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
    })
];

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
    },
    devtool: config.build.productionSourceMap ? '#eval-source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: assetsPath('js/[id].[chunkhash].js')
    },
    plugins: webpackPluginList.concat(new RemoveScriptTagPlugin())
});

if (config.build.productionGzip) {
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

export default webpackConfig;
