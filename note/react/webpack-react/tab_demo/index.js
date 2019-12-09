import React from 'react'
import ReactDOM from 'react-dom'

import Title from './Title'
import Content from './Content'

require('./tabCss.css');

let tabJson = {
    topValue: ['tab1','tab2','tab3'],
    bottomValue: ['tab1_context','tab2_context','tab3_context']
}

class Tab extends React.Component {
    constructor() {
        super()
        this.state = {
            index: 0
        }
    }
    change(index) {
        // console.log(index)
        this.setState({
            index: index
        })
    }
    render() {
        return (
            <div className='outBox'>
                <Title change={this.change.bind(this)} index={this.state.index} topVal={this.props.val.topValue}/>
                <Content change={this.change.bind(this)} index={this.state.index} bottomVal={this.props.val}/>
            </div>
        )
    }
}

ReactDOM.render(<Tab val={tabJson}/>,document.getElementById('app'))
