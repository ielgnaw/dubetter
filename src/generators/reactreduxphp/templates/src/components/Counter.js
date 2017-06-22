/**
 * @file Counter 组件
 * @author ielgnaw <wuji0223@gmail.com>
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {increment, decrement, incrementIfOdd, incrementAsync} from '../actions/counter';

import './Counter.styl';

class Counter extends Component {
    render() {
        const {increment, incrementIfOdd, incrementAsync, decrement, counter} = this.props;
        return (
            <p>
                Clicked: {counter} times
                {' '}
                <button onClick={increment}>+</button>
                {' '}
                <button onClick={decrement}>-</button>
                {' '}
                <button onClick={incrementIfOdd}>Increment if odd</button>
                {' '}
                <button onClick={() => incrementAsync(3000)}>3000s Increment async</button>
            </p>
        );
    }
}

Counter.propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
};

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
        counter: state.counter
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
        increment() {
            dispatch(increment());
        },
        decrement() {
            dispatch(decrement());
        },
        incrementIfOdd() {
            dispatch(incrementIfOdd());
        },
        incrementAsync(delay = 1000) {
            dispatch(incrementAsync(delay));
        }
    };
}

// 通过 connect 把需要的 state 中的数据和 actions 中的方法绑定到 props 上
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
