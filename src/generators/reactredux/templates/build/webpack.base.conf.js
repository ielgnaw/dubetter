/**
 * @file webpack base config
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import autoprefixer from 'autoprefixer';
import rider from 'rider';

import config from '../config';
import {assetsPath} from './utils';

const PROJECT_ROOT = path.resolve(__dirname, '../');

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
        extensions: ['', '.js', '.jsx', '.php'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    postcss: [
        autoprefixer({
            browsers: ['iOS >= 7', 'Android >= 4.0']
        })
    ],
    stylus: {
        use: [rider()]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: PROJECT_ROOT,
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            // {
            //     test: /\.css$/,
            //     loader: 'style!css'
            // },
            // {
            //     test: /\.styl$/,
            //     loader: 'style!css!postcss!stylus'
            // },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 100000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 100000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    }
};
