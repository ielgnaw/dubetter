/**
 * @file NodejsGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import {Base} from 'yeoman-generator';

const DEV_DEPENDENCIES = [
    'babel-cli', 'babel-core', 'babel-preset-es2015', 'babel-preset-stage-2',
    'babel-istanbul', 'babel-plugin-add-module-exports', 'fecs', 'chai', 'mocha'
];

export default class NodejsGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.appName = this.options.appName;

        if (DEV_DEPENDENCIES.indexOf(this.appName) !== -1) {
            this.env.error(chalk.magenta('Project name can\'t be the same as devDependencies names'));
        }

        mkdirp.sync(this.appName);
    }

    /**
     * 创建文件夹
     */
    creating() {
        mkdirp.sync(this.appName, 'src');
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
            this.templatePath('jshintrc'),
            this.destinationPath(this.appName, '.jshintrc')
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
            this.templatePath('npmignore'),
            this.destinationPath(this.appName, '.npmignore')
        );

        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath(this.appName, '.gitignore')
        );

        this.fs.copyTpl(
            this.templatePath('travis.yml'),
            this.destinationPath(this.appName, '.travis.yml')
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

        this.fs.copyTpl(
            this.templatePath('editorconfig'),
            this.destinationPath(this.appName, '.editorconfig')
        );

        this.directory(
            this.templatePath('test'),
            this.destinationPath(this.appName, 'test')
        );

        this.fs.copyTpl(
            this.templatePath('Person.js'),
            this.destinationPath(this.appName, 'src/Person.js')
        );
    }

    /**
     * 安装依赖
     */
    install() {
        process.chdir(`${this.appName}/`);
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
