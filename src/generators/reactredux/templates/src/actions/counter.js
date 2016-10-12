/**
 * @file counter action
 * @author ielgnaw(wuji0223@gmail.com)
 */

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

/**
 * 加一
 *
 * @return {Object} actionType
 */
export function increment() {
    return {
        type: INCREMENT_COUNTER
    };
}

/**
 * 减一
 *
 * @return {Object} actionType
 */
export function decrement() {
    return {
        type: DECREMENT_COUNTER
    };
}

/**
 * 奇数才加一的方法，该方法返回一个方法，包含dispatch和getState两个参数，dispatch用于执行action的方法，getState返回state
 *
 * @return {Function} 包含两个参数 dispatch 和 getState，dispatch 用于执行 action 的方法，getState 返回 state
 */
export function incrementIfOdd() {
    return (dispatch, getState) => {
        const {counter} = getState();

        if (counter % 2 === 0) {
            return;
        }

        dispatch(increment());
    };
}


/**
 * 延迟一秒后加 1
 *
 * @param {number} delay 延迟
 *
 * @return {Object} 延迟执行的方法
 */
export function incrementAsync(delay = 1000) {
    return dispatch => {
        console.log('delay', delay);
        setTimeout(() => {
            dispatch(increment());
        }, delay);
    };
}
