import React from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import './Test.css'

class Test extends React.Component {
    constructor() {
        super()
        this.state = {
            v: true,
            myArr:[]
        }
    }
    click() {
        console.log(this.refs.inputValue.value)
        let newArr = this.state.myArr.concat([<div key={Math.random()}>{this.refs.inputValue.value}</div>])
        this.setState({
            myArr: newArr
        })
    }
    render() {
        // let oDiv = [this.state.v ? <div key={0} className='leo'/> : '']
        return (
            <div>
                <input type="text" ref='inputValue'/>
                <button onClick={this.click.bind(this)}>切换</button>
                <CSSTransitionGroup
                    transitionName='leo'
                    transitionEnterTimeout={700}
                    transitionLeaveTimeout={700}
                    transitionAppear={true}
                    transitionAppearTimeout={700}
                >
                    {this.state.myArr}
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Test
