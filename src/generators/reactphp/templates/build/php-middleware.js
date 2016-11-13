/**
 * @file php handler for dev
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';

export default function ajaxMiddleWare(req, res, next) {
    const docRoot = '';
    if (!/\.php$/.test(req.path)) {
        return next();
    }
    const targetPathName = req.path;
    const query = require('url').parse(req.url).query;
    const scriptFileName = path.normalize(
        path.join(process.cwd(), docRoot, targetPathName)
    );

    // @see: http://www.cgi101.com/book/ch3/text.html
    const host = (req.headers.host || '').split(':');
    const env = {
        PATH: process.env.PATH,
        GATEWAY_INTERFACE: 'CGI/1.1',
        SERVER_PROTOCOL: 'HTTP/1.1',
        SERVER_ROOT: path.join(process.cwd(), docRoot),
        DOCUMENT_ROOT: path.join(process.cwd(), docRoot),
        SERVER_NAME: host[0],
        SERVER_PORT: host[1] || 80,
        REDIRECT_STATUS: 200,
        SCRIPT_NAME: path.join(process.cwd(), req.path), //docroot上的文件
        REQUEST_URI: req.url,
        SCRIPT_FILENAME: scriptFileName, //物理文件
        REQUEST_METHOD: req.method,
        QUERY_STRING: query || '',
        TRANSFER_ENCODING: 'Chunked'
    };

    // expose request headers
    for (let header in req.headers) {
        if (req.headers.hasOwnProperty(header)) {
            const name = 'HTTP_' + header.toUpperCase().replace(/-/g, '_');
            env[name] = req.headers[header];
        }
    }

    if ('content-type' in req.headers) {
        env.CONTENT_TYPE = req.headers['content-type'];
    }

    // 将php解析后的结果填充到 context 中
    const done = (code) => {
        if (code === undefined) {
            return;
        }

        for (let i in headers) {
            if (headers.hasOwnProperty(i)) {
                res.setHeader(i, headers[i]);
            }
        }
        res.end(bodyBuffer.join(''));
        // next();
    };

    const child = require('child_process').spawn(
        'php-cgi',
        [],
        { env: env }
    );

    const bodyBuffer = [];
    const headers = {};
    let line = [];
    let isBodyData = false;

    child.on('exit', done);

    child.on('error', (err) => {
        console.log(err);
    });

    child.stderr.on('end', (chunk) => {
        chunk && console.log('php error:\n' + chunk.toString('utf8') + '\n');
    }).on('data', (chunk) => {
        chunk && console.log('php error:\n' + chunk.toString('utf8') + '\n');
    });

    child.stdout.on('end', done).on('data', (buf) => {
        for (let i = 0; i < buf.length; i++) {
            // 如果是主体数据内容
            if (isBodyData) {
                return bodyBuffer.push(buf);
            }

            // 取出header
            const c = buf[i];
            if (c == 0xA) { // 如果是\n，则一行读取完毕
                if (!line.length) { // 如果读取到一个空行
                    isBodyData = true;
                    bodyBuffer.push( buf.slice(i + 1) );
                    return;
                }

                const s = line.join('');
                line = [];
                const idx = s.indexOf(':');

                headers[s.slice(0, idx)] = s.slice(idx + 1).trim();
            } else if (c != 0xD) { //如果不是\n，也不是\r，说明一行还未读取结束
                line.push(String.fromCharCode(c));
            }
        }
    });
}
