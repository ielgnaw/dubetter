/**
 * @file DubetterGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import kebabCase from 'lodash.kebabcase';
import {Base} from 'yeoman-generator';
import {basename} from 'path';

const GENERATOR_MAP = {
    nodejs: '../nodejs',
    react: '../react',
    reactphp: '../reactphp',
    reactmulti: '../reactmulti',
    reactredux: '../reactredux',
    reactreduxphp: '../reactreduxphp',
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
                message: 'Your project name. a new project folder will be created '
                    + 'when the project name is not the same as the current folder name',
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
                        name: 'React project, Pure FE Project',
                        value: 'react'
                    },
                    {
                        name: 'React project, use Smarty rendering template',
                        value: 'reactphp'
                    },
                    {
                        name: 'React project, Multiple page, Pure FE Project',
                        value: 'reactmulti'
                    },
                    {
                        name: 'React & Redux project, Pure FE Project',
                        value: 'reactredux'
                    },
                    {
                        name: 'React & Redux project, use Smarty rendering template',
                        value: 'reactreduxphp'
                    }
                ]
            },
            {
                type: 'confirm',
                name: 'isInstall',
                message: 'Install dependencies?',
                default: false
            }]
        ).then(answers => {
            this.projectType = answers.projectType;
            this.projectName = answers.projectName;
            this.isInstall = answers.isInstall;
        });
    }

    compose() {
        const ns = `dubetter:${this.projectType}`;
        const local = GENERATOR_MAP[this.projectType];
        if (ns) {
            this.composeWith(ns,
                {
                    options: {
                        projectName: this.projectName,
                        isCreateProjectDir: basename(process.cwd()) !== this.projectName,
                        isInstall: this.isInstall
                    }
                },
                {
                    local: require.resolve(local)
                }
            );
        }
    }
}
