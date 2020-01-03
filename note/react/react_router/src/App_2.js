import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to="/index">首页</Link>
                    <Link to="/news">新闻</Link>
                    <Link to="/about">关于我</Link>
                    <Route path='/:link' component={App2} />
                </div>
            </Router>
        )
    }
}

class App2 extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Link to={`${this.props.match.url}/index`}>首页</Link>
                        <Link to={`${this.props.match.url}/news`}>新闻</Link>
                        <Link to={`${this.props.match.url}/about`}>关于我</Link>
                        <Route path={`${this.props.match.url}/:name`} component={App2} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;
