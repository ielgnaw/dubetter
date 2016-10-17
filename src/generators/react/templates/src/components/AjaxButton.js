/**
 * @file AjaxButton 组件
 * @author ielgnaw(wuji0223@gmail.com)
 */

import React from 'react';
import reqwest from 'reqwest';

import './AjaxButton.styl';

export default class AjaxButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            num: 1,
            ajaxRet: null
        };
    }
    componentWillMount() {
        console.debug('componentWillMount');
    }
    componentDidMount() {
        console.debug('componentDidMount');
    }
    componentWillReceiveProps() {
        console.debug('componentWillReceiveProps');
    }
    componentWillUpdate() {
        console.debug('componentWillUpdate');
    }
    componentDidUpdate() {
        console.debug('componentDidUpdate');
    }
    shouldComponentUpdate() {
        console.debug('shouldComponentUpdate');
        return true;
    }
    handleClick(n, method) {
        this.setState({
            num: n
        });
        const testAjaxUrl = '/saiya/log?isAjax=1';
        const args = method === 'get'
            ? {
                url: testAjaxUrl,
                type: 'json',
                method: method,
                contentType: 'application/json',
                crossOrigin: true,
                withCredentials: true,
                data: {num: n}
            }
            :
            {
                url: testAjaxUrl,
                method: 'post',
                data: {num: n}
            };

        reqwest(args).then(resp => {
            this.setState({
                ajaxRet: {
                    method: method,
                    status: resp.status,
                    data: resp
                }
            });
        })
        .fail((err, msg) => {
            console.error(err, msg);
        })
        .always(resp => {
            console.debug(`${method} ajax done`);
        });
    }
    render() {
        const {num, ajaxRet} = this.state;
        const n = num + this.props.start || 0;
        const ajaxRetView = ajaxRet
            ? (
                <p>
                    ajax 结果为：<br/>
                    {ajaxRet.method === 'get' ? 'GET' : 'POST'} 方式提交<br/>
                    请求结果 {ajaxRet.status === 0 ? '成功' : '失败'}<br/>
                    提交的参数为
                    <span style={{color: 'red'}}>
                        {ajaxRet.data.data[(ajaxRet.method === 'get' ? 'get' : 'post') + 'Args'].num}
                    </span>
                    <br/>
                    返回数据为 {JSON.stringify(ajaxRet)}
                </p>
            )
            : null;
        return (
            <div>
                <button className="button" onClick={() => this.handleClick(n, 'get')}>sendGet({n})</button>
                <button className="button" onClick={() => this.handleClick(n, 'post')}>sendPost({n})</button>
                {ajaxRetView}
            </div>
        );
    }
}
