import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to="/001">文章1</Link>
                    <Link to="/002">文章2</Link>
                    <Link to="/003">文章3</Link>
                    <Route path='/:id' component={Book} />
                </div>
            </Router>
        )
    }
}

class Book extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: ''
        }
    }
    componentDidMount() {
        fetch(`http://127.0.0.1:3001/book?id=${this.props.match.params.id}`,{
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then(res => {
            this.setState({
                msg: res.data
            })
        }).catch(()=>{
            console.log('服务器异常')
        })
    }
    componentDidUpdate() {
        fetch(`http://127.0.0.1:3001/book?id=${this.props.match.params.id}`,{
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then(res => {
            this.setState({
                msg: res.data
            })
        }).catch(()=>{
            console.log('服务器异常')
        })
    }
    render() {
        return (
            <div>
                {this.state.msg}
            </div>
        )
    }
}


export default App;
