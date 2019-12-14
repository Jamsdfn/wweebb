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
        this.setState({
            v: !this.state.v
        })
    }
    render() {
        let oDiv = [this.state.v ? <div key={0} className='leo'/> : '']
        return (
            <div>
                <button onClick={this.click.bind(this)}>切换</button>
                <CSSTransitionGroup
                    transitionName='leo'
                    transitionEnterTimeout={700}
                    transitionLeaveTimeout={700}
                    transitionAppear={true}
                    transitionAppearTimeout={700}
                >
                    {oDiv}
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Test
