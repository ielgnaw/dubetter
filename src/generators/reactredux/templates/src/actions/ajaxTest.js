/**
 * @file ajaxTest action
 * @author ielgnaw <wuji0223@gmail.com>
 */

import reqwest from 'reqwest';
export const RESULT = 'RESULT';

export function returnAjaxRet(statusCode, method, ret) {
    const ajaxRet = {
        status: statusCode,
        method: method,
        data: ret
    };
    return {
        type: 'RESULT',
        ajaxRet
    };
}

/**
 * get
 *
 * @param {Object} ajaxArgs ajax 参数
 *
 * @return {Object} actionType
 */
export function sendGet(ajaxArgs) {
    return (dispatch, getState) => {
        const testAjaxUrl = '/test/log?isAjax=1';
        reqwest({
            url: testAjaxUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            crossOrigin: true,
            withCredentials: true,
            // data: [{name: 'foo', value: 'bar' }, { name: 'baz', value: 100}]
            data: ajaxArgs
        })
        .then(resp => {
            dispatch(returnAjaxRet(0, 'get', resp));
        })
        .fail((err, msg) => {
            dispatch(returnAjaxRet(1, 'get', err));
        })
        .always(resp => {
            console.log('get ajax done');
        });
    };
}

/**
 * post
 *
 * @param {Object} ajaxArgs 参数
 *
 * @return {Object} actionType
 */
export function sendPost(ajaxArgs) {
    return (dispatch, getState) => {
        const testAjaxUrl = '/test/log?isAjax=1';
        reqwest({
            url: testAjaxUrl,
            method: 'post',
            data: ajaxArgs
        })
        .then(resp => {
            dispatch(returnAjaxRet(0, 'post', resp));
        })
        .fail((err, msg) => {
            dispatch(returnAjaxRet(1, 'post', err));
        })
        .always(resp => {
            console.log('post ajax done');
        });
    };
}
