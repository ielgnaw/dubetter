/**
 * @file 主入口
 * @author ielgnaw <wuji0223@gmail.com>
 */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import Main from './components/Main';
import App from './components/App';
import Bar from './components/Bar';
import Foo from './components/Foo';

import rootReducer from './reducers';

import './css/common.styl';

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

// 创建 store
const store = createStoreWithMiddleware(
    // 主 reducer，包括多个子 reducer
    rootReducer,
    initialState
);

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <div>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Main}/>
                <Route path="foo" component={Foo}/>
                <Route path="bar" component={Bar}/>
            </Route>
        </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
