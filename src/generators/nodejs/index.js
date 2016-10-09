/**
 * @file NodejsGenerator entry
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
            this.templatePath('jshintrc'),
            this.destinationPath(appName, '.jshintrc')
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
            this.templatePath('npmignore'),
            this.destinationPath(appName, '.npmignore')
        );

        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath(appName, '.gitignore')
        );

        this.fs.copyTpl(
            this.templatePath('travis.yml'),
            this.destinationPath(appName, '.travis.yml')
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
            this.templatePath('editorconfig'),
            this.destinationPath(appName, '.editorconfig')
        );

        this.directory(
            this.templatePath('test'),
            this.destinationPath(appName, 'test')
        );

        this.fs.copyTpl(
            this.templatePath('Person.js'),
            this.destinationPath(appName, 'src/Person.js')
        );
    }

    /**
     * 安装依赖
     */
    install() {
        process.chdir(`${this.options.appName}/`);
        this.npmInstall([
            'babel-cli', 'babel-core', 'babel-preset-es2015', 'babel-preset-stage-2',
            'babel-istanbul', 'babel-plugin-add-module-exports',
            'fecs', 'chai', 'mocha'
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
