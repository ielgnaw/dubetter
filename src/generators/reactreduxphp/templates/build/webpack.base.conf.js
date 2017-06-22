/**
 * @file webpack base config
 * @author ielgnaw <wuji0223@gmail.com>
 */

import {resolve, join} from 'path';
import autoprefixer from 'autoprefixer';

import config from '../config';
import {assetsPath} from './utils';

const PROJECT_ROOT = resolve(__dirname, '../src');
const NODE_MODULES_DIR = resolve(__dirname, '../node_modules');

export default {
    entry: {
        'example': './src/main.js',
        'dir-example': './src/main.js',
        'sub': './src/main.js',
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [NODE_MODULES_DIR, 'node_modules'],
        alias: {
            'src': PROJECT_ROOT,
            'react': 'react/dist/react.js',
            'react-dom': 'react-dom/dist/react-dom.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader?cacheDirectory',
                include: PROJECT_ROOT,
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: assetsPath('font/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};
