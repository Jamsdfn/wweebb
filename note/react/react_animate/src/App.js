import React from 'react'
import './App.css'
import Test2 from './Test2.js'
import Test from './Test.js'
import Reactmotion2 from './Reactmotion2.js'
import Reactmotion from './Reactmotion.js'

class App extends React.Component{
    constructor() {
        super()
        this.state = {
            myArr: ['myInput']
        }
    }
    focus() {
        this.setState({
            myArr: ['myInput','active']
        })
    }
    blur() {
        this.setState({
            myArr: ['myInput']
        })
    }
    render() {
        return (
            <div className="App">
                <input className={this.state.myArr.join(' ')} onBlur={this.blur.bind(this)} onFocus={this.focus.bind(this)}/>
                {/*<Test />*/}
                {/*<Test2 />*/}
                {/*<Reactmotion />*/}
                <Reactmotion2 />
            </div>
        )
    }
}

export default App
