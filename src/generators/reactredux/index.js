/**
 * @file ReactReduxGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import _ from 'lodash';
import path from 'path';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import {Base} from 'yeoman-generator';

export default class NodejsGenerator extends Base {
    constructor(...args) {
        super(...args);
    }

    /**
     * 复制目录
     */
    copyDirectory() {
        const appName = this.options.appName;
        ['build', 'config', 'entry', 'mock', 'src'].forEach(item => {
            this.fs.copy(this.templatePath(item), this.destinationPath(appName, item));
        })
    }

    /**
     * 复制模板
     */
    copyTpl() {
        const appName = this.options.appName;

        this.fs.copyTpl(
            this.templatePath('babelrc'),
            this.destinationPath(appName, '.babelrc')
        );

        this.fs.copyTpl(
            this.templatePath('editorconfig'),
            this.destinationPath(appName, '.editorconfig')
        );

        this.fs.copyTpl(
            this.templatePath('eslintrc'),
            this.destinationPath(appName, '.eslintrc')
        );

        this.fs.copyTpl(
            this.templatePath('fecsrc'),
            this.destinationPath(appName, '.fecsrc')
        );

        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath(appName, '.gitignore')
        );

        this.fs.copyTpl(
            this.templatePath('jshintrc'),
            this.destinationPath(appName, '.jshintrc')
        );

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(appName, 'package.json'),
            {
                appName: appName
            }
        );

        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath(appName, 'README.md'),
            {
                appName: appName
            }
        );
    }

    /**
     * 安装依赖
     */
    install() {
        process.chdir(`${this.options.appName}/`);
        this.npmInstall([
            'react', 'react-dom', 'react-redux', 'redux', 'redux-thunk', 'reqwest'
        ], {save: true});
        this.npmInstall([
            'autoprefixer', 'babel-cli', 'babel-core', 'babel-loader', 'babel-plugin-add-module-exports',
            'babel-plugin-transform-runtime', 'babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-2',
            'body-parser', 'cheerio', 'compression-webpack-plugin', 'css-loader', 'eslint-friendly-formatter',
            'eventsource-polyfill', 'express', 'extract-text-webpack-plugin', 'fecs', 'file-loader', 'handlebars',
            'html-webpack-plugin', 'http-proxy-middleware', 'json-loader', 'ora', 'postcss-loader', 'rider',
            'shelljs', 'style-loader', 'stylus', 'stylus-loader', 'url-loader', 'vue-style-loader', 'webpack',
            'webpack-dev-middleware', 'webpack-hot-middleware', 'webpack-merge'
        ], {saveDev: true});
    }

    /**
     * 安装结束、清除文件、设置good bye文案、等
     * @return {[type]} [description]
     */
    end() {
        const appName = this.options.appName;
        this.log(chalk.cyan('\nProject create success'));
        this.log(chalk.cyan(`\nFor more information, please see ${appName}${path.sep}README.md\n`));
    }
}
