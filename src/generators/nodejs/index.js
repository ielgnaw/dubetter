/**
 * @file NodejsGenerator entry
 * @author ielgnaw(wuji0223@gmail.com)
 */

import _ from 'lodash';
import {Base} from 'yeoman-generator';

export default class NodejsGenerator extends Base {
    constructor(...args) {
        super(...args);
    }

    method1() {
        this.log('nodejs method1');
    }
}
