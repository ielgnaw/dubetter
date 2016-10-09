import gulp from 'gulp';
import gUtil from 'gulp-util';
import watch from 'gulp-watch';
import babel from 'gulp-babel';
import webpack from 'webpack';
import merge from 'webpack-merge';
import webpackDevMiddle from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import TransferWebpackPlugin from 'transfer-webpack-plugin';
import express from 'express';
import bodyParser from 'body-parser';
import ora from 'ora';
import path from 'path';
import 'shelljs/global';
import DashboardPlugin from 'webpack-dashboard/plugin';

import webpackConfig from './webpack.config';
import ajaxMiddleware from './middleware/ajax-middleware';
import phpMiddleware from './middleware/php-middleware';
import RemoveScriptTagPlugin from './middleware/remove-script-tag-plugin';

import CONFIG from './config';

/* globals env */

const getIP = () => {
    const ifaces = require('os').networkInterfaces();
    const defultAddress = '127.0.0.1';
    let ip = defultAddress;

    for (const dev in ifaces) {
        if (ifaces.hasOwnProperty(dev)) {
            ifaces[dev].forEach(
                /* jshint loopfunc: true */
                (details) => {
                    if (ip === defultAddress && details.family === 'IPv4') {
                        ip = details.address;
                    }
                }
            );
        }
    }
    return ip;
};

// webpack-dev-server
gulp.task('webpack:server', () => {
    env.NODE_ENV = 'development';

    const app = express();

    const devServerConfig = merge(webpackConfig, {
        devtool: '#eval-source-map',
        debug: true,
        output: {
            path: CONFIG.build.assetsRoot,
            publicPath: process.env.NODE_ENV === 'production'
                ? CONFIG.build.assetsPublicPath
                : CONFIG.dev.assetsPublicPath,
            filename: '[name].js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    // This has effect on the react lib size
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new TransferWebpackPlugin([
                {from: 'src/css/img', to: path.posix.join(CONFIG.dev.assetsSubDirectory, 'img')}
            ]),
        ]
    });

    const compiler = webpack(devServerConfig);

    // Using Webpack Dashboard
    compiler.apply(new DashboardPlugin());

    const devMiddleware = webpackDevMiddle(compiler, {
        publicPath: '/' + devServerConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    });

    app.use(webpackHotMiddleware(compiler));

    const hotMiddleware = webpackHotMiddleware(compiler);
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' });
            cb();
        });
    });

    app.get('/', (req, res) => {
        res.redirect('./index.php');
    });

    // serve webpack bundle output
    app.use(devMiddleware);

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware);

    // php
    app.use(phpMiddleware);

    // to support JSON-encoded bodies
    app.use(bodyParser.json());

    // to support URL-encoded bodies
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // 处理 mock ajax
    app.use(ajaxMiddleware);

    app.listen(CONFIG.dev.port, function (err) {
        if (err) {
            throw new gUtil.PluginError('webpack-dev-server', err);
        }
        gUtil.log(
            `Listening at http://localhost:${CONFIG.dev.port} or http://${getIP()}:${CONFIG.dev.port}\n`
        );
    });
});

// watch transform
gulp.task('watch-transform', () => {
  return gulp.src('src/**/*.js?(x)')
        .pipe(
            watch('src/**/*.js?(x)',
            {
                verbose: true
            }
        ))
        .pipe(babel())
        .on('error', function (e) {
            console.log('>>> ERROR', e);
            this.emit('end');
        })
        .pipe(gulp.dest('compile'));
});

// build
gulp.task('webpack:build', (cb) => {
    env.NODE_ENV = 'production';
    const buildWebpackConfig = merge(webpackConfig, {
        devtool: false,
        output: {
            path: CONFIG.build.assetsRoot,
            publicPath: process.env.NODE_ENV === 'production'
                ? CONFIG.build.assetsPublicPath
                : CONFIG.dev.assetsPublicPath,
            filename: path.posix.join(CONFIG.build.assetsSubDirectory, 'js/[name].[chunkhash].js'),
            chunkFilename: path.posix.join(CONFIG.build.assetsSubDirectory, 'js/[id].[chunkhash].js')
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    // This has effect on the react lib size
                    'NODE_ENV': JSON.stringify('production')
                }
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
            // new ExtractTextPlugin(path.posix.join('saiya/star', 'css/[name].[contenthash].css')),
            // utils.assetsPath('css/[name].[contenthash].css')

            new HtmlWebpackPlugin({
                filename: 'main.tpl',
                template: 'main.tpl',
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            }),

            new TransferWebpackPlugin([
                {from: 'src/css/img', to: path.posix.join(CONFIG.build.assetsSubDirectory, 'img')}
            ]),

            new RemoveScriptTagPlugin()
        ]
    });

    const spinner = ora('building for production...');
    spinner.start();

    webpack(buildWebpackConfig, (err, stats) => {
        spinner.stop();
        if (err) {
            throw new gUtil.PluginError('webpack:build', err);
        }
        gUtil.log('');
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');
        cb();
    });
});

gulp.task('default', ['watch-transform', 'webpack:server']);
