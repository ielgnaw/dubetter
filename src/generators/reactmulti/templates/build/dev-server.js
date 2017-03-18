/**
 * @file dev server
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import proxyMiddleware from 'http-proxy-middleware';
import handlebars from 'handlebars';

import config from '../config';
import ajaxMiddleware from './ajax-middleware';
import {getIP} from './utils';

const webpackConfig = process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf');

const port = process.env.PORT || config.dev.port;
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

const hotMiddleware = require('webpack-hot-middleware')(compiler);
compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({action: 'reload'});
        cb();
    });
});

Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options
        };
    }
    app.use(proxyMiddleware(context, options));
});

app.use(devMiddleware);

app.use(hotMiddleware);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(ajaxMiddleware);

app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + ' or http://' + getIP() + ':' + port + '\n');
});
