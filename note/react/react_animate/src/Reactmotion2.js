import React from 'react'
import {Motion, spring} from 'react-motion'

class Reactmotion extends React.Component {
    constructor() {
        super()
        this.state = {
            v: true,
            start: '中国',
            myArr: ['中国', '瑞士', '印度', '新西兰']
        }
    }

    click() {
        this.setState({
            v: !this.state.v
        })
    }

    myClick(index) {
        this.setState({
            start: this.state.myArr[index]
        })
    }

    render() {
        let aLi = this.state.myArr.map((item, index) => {
            return <li key={index} onClick={this.myClick.bind(this,index)}>{item}</li>
        })
        return (
            <div>
                <Motion style={{myLeo:spring(this.state.v ? 161 : 0)}}>
                    {({myLeo}) =>
                        <div className='myTab' onClick={this.click.bind(this)}>
                            {this.state.start}
                            <ul style={{height:myLeo}}>
                                {aLi}
                            </ul>
                        </div>
                    }
                </Motion>
            </div>
        )
    }
}

export default Reactmotion
