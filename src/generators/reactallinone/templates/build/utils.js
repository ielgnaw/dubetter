/**
 * @file utils
 * @author ielgnaw <wuji0223@gmail.com>
 */

import path from 'path';
import autoprefixer from 'autoprefixer';
import rider from 'rider';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config';

export function assetsPath(_path) {
    return path.posix.join(config.build.assetsSubDirectory, _path);
}

export function cssLoaders(options = {}) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    };

    const generateLoaders = (loader, loaderOptions) => {
        const loaders = [cssLoader];
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'style-loader'
            });
        }

        return [...['style-loader'], ...loaders];
    };

    return {
        css: generateLoaders(),
        postcss: generateLoaders('postcss', {
            postcss: autoprefixer({
                browsers: ['iOS >= 7', 'Android >= 4.0']
            })
        }),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus', {
            use: [rider()]
        }),
        styl: generateLoaders('stylus', {
            use: [rider()]
        })
    };
}

export function styleLoaders(options) {
    const output = [];
    const loaders = cssLoaders(options);
    /* eslint-disable fecs-use-for-of */
    for (const extension in loaders) {
        if (loaders.hasOwnProperty(extension)) {
            const loader = loaders[extension];
            output.push({
                test: new RegExp('\\.' + extension + '$'),
                use: loader
            });
        }
    }
    /* eslint-enable fecs-use-for-of */
    return output;
}

export function getIP() {
    const ifaces = require('os').networkInterfaces();
    const defultAddress = '127.0.0.1';
    let ip = defultAddress;

    /* eslint-disable fecs-use-for-of, no-loop-func */
    for (const dev in ifaces) {
        if (ifaces.hasOwnProperty(dev)) {
            /* jshint loopfunc: true */
            ifaces[dev].forEach(details => {
                if (ip === defultAddress && details.family === 'IPv4') {
                    ip = details.address;
                }
            });
        }
    }
    /* eslint-enable fecs-use-for-of, no-loop-func */
    return ip;
}
