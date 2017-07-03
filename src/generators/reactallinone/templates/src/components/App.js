/**
 * @file App component
 * @author ielgnaw <wuji0223@gmail.com>
 */

import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <header>
                    Links:
                    {' '}
                    <Link to="/">Home</Link>
                    {' '}
                    <Link to="/foo">Foo</Link>
                    {' '}
                    <Link to="/bar">Bar</Link>
                </header>
                <div>
                    <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
                </div>
                <div className="content-wrapper">
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
