/**
 * @file mock route handler for dev
 * @author ielgnaw(wuji0223@gmail.com)
 */

import fs from 'fs';
import path from 'path';
// import queryString from 'querystring';

export default function mockRouteMiddleWare(req, res, next) {
    // /saiya/userinfo/homeDetail?a=1&b=2
    //  => ["", "saiya", "userinfo", "homeDetail"]
    //  => [saiya", "userinfo", "homeDetail"]
    let segments = req.path.split('/');
    segments = segments.splice(1, segments.length);

    if (segments[0] === 'saiya') {
        const mockRouteFilePath = path.join(__dirname, '../mock/', segments.concat().splice(1).join('/')) + '.php';
        if (!fs.existsSync(mockRouteFilePath)) {
            return next();
        }
        // var query = queryString.parse(require('url').parse(req.url).query);
        let query = require('url').parse(req.url).query;
        query = query ? '?' + query : '';

        res.redirect(''
            + 'http://'
            + req.headers.host
            + path.sep
            + 'mock'
            + path.sep
            + segments.concat().splice(1).join('/')
            + '.php'
            + query
        );
    }
    return next();
}
