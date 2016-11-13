/**
 * @file webpack dev config
 * @author ielgnaw(wuji0223@gmail.com)
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import {styleLoaders} from './utils';
import config from '../config';
import baseWebpackConfig from './webpack.base.conf';
import RemoveScriptTagPlugin from './remove-script-tag-plugin';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(name => {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

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
        'process.env': config.dev.env
    }),

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoErrorsPlugin(),

    new webpack.optimize.DedupePlugin()
];

entryTplList.forEach(item => {
    webpackPluginList.push(
        new HtmlWebpackPlugin({
            filename: item.filename,
            template: item.filename,
            inject: true,
            chunks: [item.chunksName]
        })
    );
});

export default merge(baseWebpackConfig, {
    module: {
        loaders: styleLoaders()
    },
    devtool: '#eval-source-map',
    plugins: webpackPluginList.concat(new RemoveScriptTagPlugin())
});
