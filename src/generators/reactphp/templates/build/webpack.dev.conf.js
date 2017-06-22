/**
 * @file webpack dev config
 * @author ielgnaw <wuji0223@gmail.com>
 */

import fs from 'fs';
import {basename, relative, join, extname} from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import {styleLoaders} from './utils';
import config from '../config';
import baseWebpackConfig from './webpack.base.conf';
import RemoveScriptTagPlugin from './remove-script-tag-plugin';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(name => {
    // 相对于 webpack.base.conf 的 context 路径
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
        'process.env': config.dev.env
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin()
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
        rules: styleLoaders()
    },
    devtool: '#eval-source-map',
    plugins: webpackPluginList.concat(new RemoveScriptTagPlugin())
});
