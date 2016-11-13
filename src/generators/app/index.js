/**
 * @file DubetterGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import kebabCase from 'lodash.kebabcase';
import chalk from 'chalk';
import {Base} from 'yeoman-generator';

const GENERATOR_MAP = {
    nodejs: '../nodejs',
    reactreduxphp: '../reactreduxphp',
    reactredux: '../reactredux',
    reactphp: '../reactphp'
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

        this.appName = kebabCase(this.projectName);
    }

    prompting() {
        const prompts = [{
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
                    name: 'React project, use Smarty rendering template',
                    value: 'reactphp'
                }
                // {
                //     name: 'Vue.js Project',
                //     value: 'vue'
                // }
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
