/**
 * @file webpack prod config
 * @author ielgnaw(wuji0223@gmail.com)
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';

import RemoveScriptTagPlugin from './remove-script-tag-plugin';
import config from '../config';
import {assetsPath, styleLoaders} from './utils';
import baseWebpackConfig from './webpack.base.conf';

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : config.build.env;

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
            const extname = path.extname(item);
            if (extname === '.tpl' || extname === '.html') {
                entryTplList.push({
                    chunksName: path.basename(item).replace(extname, ''),
                    filename: path.relative('.', filePath + '/' + item)
                });
            }
        }
    });
})(path.join(__dirname, '..', 'entry'));

/**
 * webpack plugin 集合
 *
 * @type {Array}
 */
const webpackPluginList = [
    new webpack.DefinePlugin({
        'process.env': env
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),

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
            }
        })
    );
});

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        loaders: styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
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
