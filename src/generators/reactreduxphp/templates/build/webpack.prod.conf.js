/**
 * @file webpack prod config
 * @author ielgnaw <wuji0223@gmail.com>
 */

import fs from 'fs';
import {basename, relative, join, extname} from 'path';
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
 * entry 下所有的 tpl 文件集合
 *
 * @type {Array}
 */
const entryTplList = [];

/**
 * 遍历 entry 下的 tpl 文件
 *
 * @param {string} filePath 遍历的目录
 */
(function walkTpl(filePath) {
    var dirList = fs.readdirSync(filePath);
    dirList.forEach(function (item) {
        if (fs.statSync(filePath + '/' + item).isDirectory()) {
            walkTpl(filePath + '/' + item);
        }
        else {
            const ext = extname(item);
            if (ext === '.tpl' || ext === '.html') {
                entryTplList.push({
                    chunksName: basename(item).replace(ext, ''),
                    filename: relative('.', filePath + '/' + item)
                });
            }
        }
    });
})(join(__dirname, '..', 'entry'));

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
    new ExtractTextPlugin(assetsPath('css/[name].[contenthash].css'))
];

entryTplList.forEach(item => {
    webpackPluginList.push(
        new HtmlWebpackPlugin({
            filename: item.filename,
            template: item.filename,
            inject: 'body',
            chunks: [item.chunksName],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: [item.chunksName.replace('index', 'main'), 'vendor', 'manifest'],
            // 如果打开 vendor 和 manifest 那么需要配置 chunksSortMode 保证引入 script 的顺序
            chunksSortMode: 'dependency'
        })
    );
});

Array.prototype.push.apply(webpackPluginList, [
    // split vendor js into its own file
    /* eslint-disable fecs-use-method-definition */
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module, count) => module.resource
            && /\.js$/.test(module.resource)
            && module.resource.indexOf(join(__dirname, '../node_modules')) === 0
    }),
    /* eslint-enable fecs-use-method-definition */

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
    })
]);

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
