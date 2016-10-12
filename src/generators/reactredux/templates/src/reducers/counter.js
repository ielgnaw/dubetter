/**
 * @file counter reducer
 * @author ielgnaw(wuji0223@gmail.com)
 */

import {INCREMENT_COUNTER, DECREMENT_COUNTER} from '../actions/counter';

// reducer 其实是个方法，参数是 state 和 action，返回值是新的 state
export default function counter(state = 0, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        case DECREMENT_COUNTER:
            return state - 1;
        default:
            return state;
    }
}
