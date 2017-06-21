/**
 * @file build
 * @author ielgnaw <wuji0223@gmail.com>
 */

import 'shelljs/global';

import path from 'path';
import ora from 'ora';
import webpack from 'webpack';
import config from '../config';
import webpackConfig from './webpack.prod.conf';

console.log(
    '  Tip:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
)

const spinner = ora('building for production...');
spinner.start();

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

rm('-rf', assetsPath);
mkdir('-p', assetsPath);

webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) {
        throw err;
    }
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
});
