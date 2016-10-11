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
     * 创建文件夹
     */
    creating() {
        const appName = this.options.appName;
        mkdirp.sync(appName, 'src');
        mkdirp.sync(appName, 'src/actions');
        mkdirp.sync(appName, 'src/components');
        mkdirp.sync(appName, 'src/css');
        mkdirp.sync(appName, 'src/css/img');
        mkdirp.sync(appName, 'src/reducers');
        mkdirp.sync(appName, 'src/util');
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
            this.templatePath('config.js'),
            this.destinationPath(appName, 'config.js')
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
            this.templatePath('gulpfile.babel.js'),
            this.destinationPath(appName, 'gulpfile.babel.js')
        );

        this.fs.copyTpl(
            this.templatePath('index.php'),
            this.destinationPath(appName, 'index.php')
        );

        this.fs.copyTpl(
            this.templatePath('jshintrc'),
            this.destinationPath(appName, '.jshintrc')
        );

        this.fs.copyTpl(
            this.templatePath('main.tpl'),
            this.destinationPath(appName, 'main.tpl')
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

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath(appName, 'webpack.config.js')
        );
    }

    /**
     * 安装依赖
     */
    install() {
        process.chdir(`${this.options.appName}/`);
        this.npmInstall([
            'babel-core', 'babel-loader', 'babel-plugin-react-transform', 'babel-plugin-transform-class-properties',
            'babel-plugin-transform-object-assign', 'babel-plugin-transform-runtime',
            'babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-2', 'babel-register', 'babel-runtime',
            'body-parser', 'cheerio', 'css-loader', 'eslint-friendly-formatter', 'express',
            'extract-text-webpack-plugin', 'fecs', 'file-loader', 'ghooks', 'gulp', 'gulp-babel', 'gulp-util',
            'gulp-watch', 'html-webpack-plugin', 'ora', 'postcss-loader', 'react-hot-loader',
            'react-transform-catch-errors', 'rider', 'shelljs', 'style-loader', 'stylus', 'stylus-loader',
            'transfer-webpack-plugin', 'url-loader', 'webpack', 'webpack-dashboard', 'webpack-dev-middleware',
            'webpack-dev-server', 'webpack-hot-middleware', 'webpack-merge'
        ], {'saveDev': true});
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
