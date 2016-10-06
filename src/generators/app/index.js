/**
 * @file DubetterGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import _ from 'lodash';
import {Base} from 'yeoman-generator';

const GENERATOR_MAP = {
    nodejs: '../nodejs'
};

export default class DubetterGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.argument('appname', {
            type: String,
            required: false,
            defaults: this.appname,
            desc: 'Project name'
        });
        this.appname = _.camelCase(this.appname);

        this.option('name', {
            type: String,
            desc: 'Project name',
            alias: 'n'
        });

        this.option('test');
        this.scriptSuffix = (this.options.test ? '.t': '.js');
    }

    default() {
        const ns = `dubetter:${this.projectType}`;
        const local = GENERATOR_MAP[this.projectType];

        if (ns) {
            this.composeWith(ns,
                {
                    options: this.options
                },
                {
                    local: require.resolve(local)
                }
            );
        }
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

    method1() {
        this.log('hey 1', this.appname);
    }

    _private_method() {
        this.log('private hey');
    }
}
