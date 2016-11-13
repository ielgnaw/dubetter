/**
 * @file AjaxTest 组件
 * @author ielgnaw(wuji0223@gmail.com)
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as ajaxTestAction from '../actions/ajaxTest';

class AjaxTest extends Component {

    constructor(props) {
        super(props);

        this.stateSendGet = this.stateSendGet.bind(this);
        this.stateSendPost = this.stateSendPost.bind(this);
    }

    stateSendGet() {
        this.props.sendGet(this.props.counter);
    }

    stateSendPost() {
        this.props.sendPost(this.props.counter);
    }

    render() {
        const {ajaxResult} = this.props;

        const ajaxRetView = ajaxResult
            ? (
                <p>
                    ajax 结果为：<br/>
                    {ajaxResult.method === 'get' ? 'GET' : 'POST'} 方式提交<br/>
                    请求结果 {ajaxResult.status === 0 ? '成功' : '失败'}<br/>
                    提交的参数为
                    <span style={{color: 'red'}}>
                        {ajaxResult.data.data[(ajaxResult.method === 'get' ? 'get' : 'post') + 'Args'].counter}
                    </span>
                    <br/>
                    返回数据为 {JSON.stringify(ajaxResult)}
                </p>
            )
            : null;


        return (
            <div>
                <p>
                    <button onClick={this.stateSendGet}>get</button>
                    {' '}
                    <button onClick={this.stateSendPost}>post</button>
                </p>
                {ajaxRetView}
            </div>
        );
    }
}

/**
 * 将 state.counter 绑定到 props 的 counter
 * 参数从 reducer 中拿到，这里就可以通过 rootReducer 拿到其他组件的 reducer 即其他组件的 state 绑定到自己的 props 上
 *
 * @param {Object} state state 对象
 *
 * @return {Object} 对象
 */
const mapStateToProps = state => {
    return {
        counter: state.counter,
        ajaxResult: state.ajaxTest
    };
};

/**
 * 将 action 的所有方法绑定到 props 上
 *
 * 这里也可以简写，直接把 action 中的方法全部绑定上
 *     import {bindActionCreators} from 'redux';
 *     import * as CounterActions from '../actions/counter';
 *
 *     return bindActionCreators(CounterActions, dispatch);
 *
 * @param {Function} dispatch connect 的 dispatch
 *
 * @return {Object} action 里的方法的对象集合
 */
function mapDispatchToProps(dispatch) {
    return {
        sendGet(counter) {
            dispatch(ajaxTestAction.sendGet({counter}));
        },
        sendPost(counter) {
            dispatch(ajaxTestAction.sendPost({counter}));
        }
    };
}

// 通过 connect 把需要的 state 中的数据和 actions 中的方法绑定到 props 上
export default connect(mapStateToProps, mapDispatchToProps)(AjaxTest);
