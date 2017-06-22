/**
 * @file 主入口
 * @author ielgnaw <wuji0223@gmail.com>
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Counter from './components/Counter';
import AjaxTest from './components/AjaxTest';
import rootReducer from './reducers';

import img from './css/img/react-logo.png';
import './main.styl';

class Main extends Component {
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

// applyMiddleware 来自 redux 可以包装 store 的 dispatch
// thunk 作用是使 action 创建函数可以返回一个 function 代替一个 action 对象
const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

// 初始 state
const initialState = {};

// 创建store
const store = createStoreWithMiddleware(
    // 主 reducer,包括多个子reducer
    rootReducer,
    initialState
);

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
