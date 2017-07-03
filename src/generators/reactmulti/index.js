/**
 * @file ReactPureMultiPageGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import {Base} from 'yeoman-generator';

const DEPENDENCIES = [
    'react', 'react-dom', 'reqwest'
];

const DEV_DEPENDENCIES = [
    'autoprefixer@7', 'babel-cli@6', 'babel-core@6', 'babel-loader@7', 'babel-plugin-add-module-exports',
    'babel-plugin-transform-runtime@6', 'babel-preset-es2015@6', 'babel-preset-react@6',
    'babel-preset-stage-2@6', 'body-parser', 'cheerio', 'compression-webpack-plugin', 'css-loader',
    'eslint-friendly-formatter', 'eventsource-polyfill', 'express@4', 'extract-text-webpack-plugin@2', 'fecs',
    'file-loader', 'handlebars@4', 'html-webpack-plugin@2', 'http-proxy-middleware', 'json-loader', 'ora',
    'postcss', 'rider', 'rimraf', 'shelljs', 'style-loader', 'stylus', 'stylus-loader', 'url-loader',
    'webpack@3', 'webpack-dev-middleware', 'webpack-hot-middleware', 'webpack-merge'
];

export default class ReactPureMultiGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.path = this.options.isCreateProjectDir
            ? this.options.projectName
            : '.'

        if (DEPENDENCIES.indexOf(this.options.projectName) !== -1) {
            this.env.error(chalk.magenta('Project name can\'t be the same as dependencies names'));
        }

        if (DEV_DEPENDENCIES.indexOf(this.options.projectName) !== -1) {
            this.env.error(chalk.magenta('Project name can\'t be the same as devDependencies names'));
        }

        if (this.options.isCreateProjectDir) {
            mkdirp.sync(this.path);
        }
    }

    /**
     * 复制目录
     */
    copyDirectory() {
        ['build', 'config', 'mock', 'src', 'entry'].forEach(item => {
            this.fs.copy(this.templatePath(item), this.destinationPath(this.path, item));
        });
    }

    /**
     * 复制模板
     */
    copyTpl() {
        this.fs.copyTpl(
            this.templatePath('babelrc'),
            this.destinationPath(this.path, '.babelrc')
        );

        this.fs.copyTpl(
            this.templatePath('editorconfig'),
            this.destinationPath(this.path, '.editorconfig')
        );

        this.fs.copyTpl(
            this.templatePath('eslintrc'),
            this.destinationPath(this.path, '.eslintrc')
        );

        this.fs.copyTpl(
            this.templatePath('fecsrc'),
            this.destinationPath(this.path, '.fecsrc')
        );

        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath(this.path, '.gitignore')
        );

        this.fs.copyTpl(
            this.templatePath('jshintrc'),
            this.destinationPath(this.path, '.jshintrc')
        );

        this.fs.copyTpl(
            this.templatePath(this.options.isInstall ? 'package.json' : 'package_with_dep.json'),
            this.destinationPath(this.path, 'package.json'),
            {
                projectName: this.options.projectName
            }
        );

        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath(this.path, 'README.md'),
            {
                projectName: this.options.projectName
            }
        );
    }

    /**
     * 安装依赖
     */
    install() {
        if (this.options.isInstall) {
            process.chdir(`${this.path}/`);
            this.npmInstall(DEPENDENCIES, {save: true});
            this.npmInstall(DEV_DEPENDENCIES, {saveDev: true});
        }
    }

    /**
     * 安装结束、清除文件、设置 good bye 文案、等
     */
    end() {
        const msg = `\nFor more information, please see ${this.path}${path.sep}README.md\n`;
        if (this.options.isInstall) {
            this.log(chalk.cyan('\nProject create success and all deps install done'));
            this.log(chalk.cyan(msg));
        }
        else {
            this.log(chalk.cyan('\nProject create success'));
            this.log(chalk.cyan(`\ncd ${this.path} && npm i`));
            this.log(chalk.cyan(msg));
        }
    }
}
