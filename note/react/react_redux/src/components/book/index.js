import React from 'react'
import store from './../../store'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";


// console.log(store.getState())
class Book extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to='/001'>文章1</Link>
                    <Link to='/002'>文章2</Link>
                    <Link to='/003'>文章3</Link>
                </div>
                <Route path='/:id' component={Mybook}/>
            </Router>
        )
    }
}

class Mybook extends React.Component {
    componentDidMount() {
        this.ajax()
    }
    componentDidUpdate() {
        this.ajax()
    }
    ajax() {
        fetch(`http://127.0.0.1:3001/book?id=${this.props.match.params.id}`,{
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then(res => {
            store.dispatch({type:'bookTo',data:res.data})
        }).catch(()=>{
            console.log('服务器异常')
        })
    }
    render() {
        return (
            <div>{store.getState().book}</div>
        )
    }
}

export default Book
