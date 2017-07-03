/**
 * @file main reducers
 * @author ielgnaw <wuji0223@gmail.com>
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import counter from './counter';
import ajaxTest from './ajaxTest';

// 使用 redux 的 combineReducers 方法将所有 reducer 打包起来
export default combineReducers({
    counter,
    ajaxTest,
    routing: routerReducer
});
