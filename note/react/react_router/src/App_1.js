import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to="/">首页</Link>
                    <Link to="/news">新闻</Link>
                    <Link to="/about">关于我</Link>
                    {/*
                    首页的Route加一个exact属性，不然切换Route时，首页的组件不会消失
                    即严格匹配，因为每一个path都有一个开头都有一个/，都会走一遍/的path
                    */}
                    <Route exact path='/' component={Home} />
                    <Route path='/news' component={News} />
                    <Route path='/about' component={About} />
                </div>
            </Router>
        )
    }
}

class Home extends React.Component {
    render() {
        return (
            <div>首页</div>
        )
    }
}
class News extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <ul>
                    {/*想要用这种方式节省记路由的时间的话，前面Route 引组件只能用单标签的方式引，用双标签的话Props是没有参数的*/}
                    <li><Link to={`${this.props.match.url}/football`}>足球</Link></li>
                    <li><Link to='/news/basketball'>篮球</Link></li>
                    <li><Link to='/news/running'>跑步</Link></li>
                </ul>
                {/*<Route path='/news/:变量名' component={Sport} />*/}
                <Route path='/news/:path' component={Sport} />
            </div>
        )
    }
}
class About extends React.Component {
    render() {
        return (
            <div>关于我</div>
        )
    }
}
class Sport extends React.Component {
    render() {
        console.log(this.props)
        let a = ''
        // this.props.match.params = {你给Route:后面的变量名：传过来的路径}
        if (this.props.match.params.path === 'football') {
            a = '我是足球'
        }
        else if (this.props.match.params.path === 'basketball') {
            a = '我是篮球'
        }
        else if (this.props.match.params.path === 'running') {
            a = '我是跑步'
        }
        return (
            <div>{a}</div>
        )
    }
}
export default App;
