/**
 * @file webpack dev config
 * @author ielgnaw <wuji0223@gmail.com>
 */

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
 * webpack plugin 集合
 *
 * @type {Array}
 */
const webpackPluginList = [
    new webpack.DefinePlugin({
        'process.env': config.dev.env
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
    })
];

export default merge(baseWebpackConfig, {
    module: {
        rules: styleLoaders()
    },
    devtool: '#eval-source-map',
    plugins: webpackPluginList.concat(new RemoveScriptTagPlugin())
});
