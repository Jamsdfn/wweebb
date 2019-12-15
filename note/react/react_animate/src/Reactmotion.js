import React from 'react'
import {Motion, spring} from 'react-motion'
import './Test.css'

class Reactmotion extends React.Component {
    constructor() {
        super()
        this.state = {
            v: true,
            start: '中国',
            myArr: ['中国','瑞士','印度','新西兰']
        }
    }
    click() {
        this.setState({
            v: !this.state.v
        })
    }
    render() {
        let aLi = this.state.myArr.map((item, index) => {
            return <li key={index}>{item}</li>
        })
        return (
            <div>
                <div className='myTab' onClick={this.click.bind(this)}>
                    {this.state.start}
                    <ul style={{height:this.state.v ? '161px' : '0'}}>
                        {aLi}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Reactmotion
