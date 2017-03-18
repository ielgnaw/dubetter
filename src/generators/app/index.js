/**
 * @file DubetterGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import kebabCase from 'lodash.kebabcase';
import chalk from 'chalk';
import {Base} from 'yeoman-generator';
import {basename} from 'path';

const GENERATOR_MAP = {
    nodejs: '../nodejs',
    reactreduxphp: '../reactreduxphp',
    reactredux: '../reactredux',
    reactphp: '../reactphp',
    reactmulti: '../reactmulti',
};

export default class DubetterGenerator extends Base {
    constructor(...args) {
        super(...args);
    }

    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Your project name',
                default: kebabCase(this.appname)
            },
            {
                type: 'list',
                name: 'projectType',
                message: 'Project Type',
                choices: [
                    {
                        name: 'Npm Module Project',
                        value: 'nodejs'
                    },
                    {
                        name: 'React & Redux project, use Smarty rendering template',
                        value: 'reactreduxphp'
                    },
                    {
                        name: 'React & Redux project, Pure FE Project',
                        value: 'reactredux'
                    },
                    {
                        name: 'React project, Multiple page, Pure FE Project',
                        value: 'reactmulti'
                    },
                    {
                        name: 'React project, use Smarty rendering template',
                        value: 'reactphp'
                    }
                ]
            }]
        ).then(answers => {
            this.projectType = answers.projectType;
            this.projectName = answers.projectName;
        });
    }

    compose() {
        const ns = `dubetter:${this.projectType}`;
        const local = GENERATOR_MAP[this.projectType];
        if (ns) {
            this.composeWith(ns,
                {
                    options: {
                        appName: this.projectName,
                        isCreateProjectDir: basename(process.cwd()) !== this.projectName
                    }
                },
                {
                    local: require.resolve(local)
                }
            );
        }
    }
}
