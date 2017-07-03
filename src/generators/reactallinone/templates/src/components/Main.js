/**
 * @file Description
 * @author ielgnaw <wuji0223@gmail.com>
 */

import React, {Component} from 'react';

import Counter from './Counter';
import AjaxTest from './AjaxTest';

import img from '../css/img/react-logo.png';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div id="workbench">
                <ul>
                    <li>11</li>
                    <li>22</li>
                    <li>33</li>
                </ul>
                <span className="ccc"></span>
                <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" />
                <br/>
                <div id="app-title">
                    <Counter />
                    <AjaxTest />
                </div>
                <br/>
                <i className="icon-mute iconfont"></i>
                <img src={img} style={{height: '50px', width: '50px'}}/>
            </div>
        );
    }
}
