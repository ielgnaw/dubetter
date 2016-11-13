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
import phpMiddleware from './php-middleware';
import ajaxMiddleware from './ajax-middleware';
import mockRouteMiddleWare from './mock-route-middleware';
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

app.get(/\/$/, (req, res) => {
    const dirPath = path.join(process.cwd(), 'entry', req.path);
    fs.readdir(dirPath, (err, files) => {
        const list = [];
        files.forEach(file => {
            const stat = fs.statSync(path.join(dirPath, file));
            const size = stat.size;
            const mtime = stat.mtime;

            let name;
            let url;
            if (stat.isDirectory()) {
                name = `${file}/`;
                url = `${encodeURIComponent(file)}/`;
            }
            else {
                name = file;
                const extname = path.extname(file);
                if (req.path !== '/') {
                    /^\/(.*)/.test(req.path);
                    url = `/mock${path.sep}${RegExp.$1}${encodeURIComponent(file.replace(extname, ''))}.php`;
                }
                else {
                    url = `mock${path.sep}${encodeURIComponent(file.replace(extname, ''))}.php`;
                }
            }
            list.push({name, url, size, mtime});
        });

        const tplStr = fs.readFileSync(path.join(__dirname, 'dirlist.tpl'), 'utf8');
        const tpl = handlebars.compile(tplStr);
        const html = tpl({'files': list});
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
});

app.use(devMiddleware);

app.use(hotMiddleware);

app.use(phpMiddleware);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(ajaxMiddleware);

app.use(mockRouteMiddleWare);

// serve pure static assets
// var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
// app.use(staticPath, express.static('./static'));

app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + ' or http://' + getIP() + ':' + port + '\n');
});
