/**
 * @file ReactReduxGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import {Base} from 'yeoman-generator';

const DEPENDENCIES = [
    'react', 'react-dom', 'react-redux', 'redux', 'redux-thunk', 'reqwest'
];

const DEV_DEPENDENCIES = [
    'autoprefixer', 'babel-cli', 'babel-core', 'babel-loader', 'babel-plugin-add-module-exports',
    'babel-plugin-transform-runtime', 'babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-2',
    'body-parser', 'cheerio', 'compression-webpack-plugin', 'css-loader', 'eslint-friendly-formatter',
    'eventsource-polyfill', 'express', 'extract-text-webpack-plugin@v1', 'fecs', 'file-loader', 'handlebars',
    'html-webpack-plugin', 'http-proxy-middleware', 'json-loader', 'ora', 'postcss-loader', 'rider',
    'shelljs', 'style-loader', 'stylus', 'stylus-loader', 'url-loader', 'vue-style-loader', 'webpack@v1',
    'webpack-dev-middleware', 'webpack-hot-middleware', 'webpack-merge'
];


export default class NodejsGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.appName = this.options.appName;

        if (DEPENDENCIES.indexOf(this.appName) !== -1) {
            this.env.error(chalk.magenta('Project name can\'t be the same as dependencies names'));
        }

        if (DEV_DEPENDENCIES.indexOf(this.appName) !== -1) {
            this.env.error(chalk.magenta('Project name can\'t be the same as devDependencies names'));
        }

        mkdirp.sync(this.appName);
    }

    /**
     * 复制目录
     */
    copyDirectory() {
        ['build', 'config', 'entry', 'mock', 'src'].forEach(item => {
            this.fs.copy(this.templatePath(item), this.destinationPath(this.appName, item));
        });
    }

    /**
     * 复制模板
     */
    copyTpl() {
        this.fs.copyTpl(
            this.templatePath('babelrc'),
            this.destinationPath(this.appName, '.babelrc')
        );

        this.fs.copyTpl(
            this.templatePath('editorconfig'),
            this.destinationPath(this.appName, '.editorconfig')
        );

        this.fs.copyTpl(
            this.templatePath('eslintrc'),
            this.destinationPath(this.appName, '.eslintrc')
        );

        this.fs.copyTpl(
            this.templatePath('fecsrc'),
            this.destinationPath(this.appName, '.fecsrc')
        );

        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath(this.appName, '.gitignore')
        );

        this.fs.copyTpl(
            this.templatePath('jshintrc'),
            this.destinationPath(this.appName, '.jshintrc')
        );

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(this.appName, 'package.json'),
            {
                appName: this.appName
            }
        );

        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath(this.appName, 'README.md'),
            {
                appName: this.appName
            }
        );
    }

    /**
     * 安装依赖
     */
    install() {
        process.chdir(`${this.appName}/`);
        this.npmInstall(DEPENDENCIES, {save: true});
        this.npmInstall(DEV_DEPENDENCIES, {saveDev: true});
    }

    /**
     * 安装结束、清除文件、设置good bye文案、等
     */
    end() {
        this.log(chalk.cyan('\nProject create success'));
        this.log(chalk.cyan(`\nFor more information, please see ${this.appName}${path.sep}README.md\n`));
    }
}
