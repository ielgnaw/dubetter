/**
 * @file DubetterGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import _ from 'lodash';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import {Base} from 'yeoman-generator';

const GENERATOR_MAP = {
    nodejs: '../nodejs'
};

export default class DubetterGenerator extends Base {
    constructor(...args) {
        super(...args);

        try {
            this.argument('projectName', {
                type: String,
                required: true,
                desc: 'Project name'
            });
        }
        catch (e) {
            this.log(chalk.magenta('\nPlease provide Project Name\n'));
            this.log(chalk.magenta('eg: yo dubetter projectName\n'));
            process.exit(1);
        }

        this.appName = _.camelCase(this.projectName);

        mkdirp.sync(this.appName);
    }

    prompting() {
        const prompts = [{
            type: 'list',
            name: 'projectType',
            message: 'Project Type',
            choices: [
                {
                    name: 'Npm Module',
                    value: 'nodejs'
                },
                {
                    name: 'React Project',
                    value: 'react'
                },
                {
                    name: 'Vue.js Project',
                    value: 'vue'
                }
            ]
        }];

        return this.prompt(prompts).then(answers => {
            this.projectType = answers.projectType;
        });
    }

    compose() {
        const ns = `dubetter:${this.projectType}`;
        const local = GENERATOR_MAP[this.projectType];

        if (ns) {
            this.composeWith(ns,
                {
                    options: {
                        appName: this.appName
                    }
                },
                {
                    local: require.resolve(local)
                }
            );
        }
    }
}
