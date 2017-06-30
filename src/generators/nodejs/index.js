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

        this.path = this.options.isCreateProjectDir
            ? this.options.projectName
            : '.';

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
        ['src', 'test'].forEach(item => {
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
            this.templatePath('jshintrc'),
            this.destinationPath(this.path, '.jshintrc')
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
            this.templatePath('npmignore'),
            this.destinationPath(this.path, '.npmignore')
        );

        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath(this.path, '.gitignore')
        );

        this.fs.copyTpl(
            this.templatePath('travis.yml'),
            this.destinationPath(this.path, '.travis.yml')
        );

        this.fs.copyTpl(
            this.templatePath('package.json'),
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

        this.fs.copyTpl(
            this.templatePath('editorconfig'),
            this.destinationPath(this.path, '.editorconfig')
        );
    }

    /**
     * 安装依赖
     */
    install() {
        if (this.options.isInstall) {
            process.chdir(`${this.path}/`);
            this.npmInstall(DEV_DEPENDENCIES, {saveDev: true});
        }
    }

    /**
     * 安装结束、清除文件、设置 good bye 文案等
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
