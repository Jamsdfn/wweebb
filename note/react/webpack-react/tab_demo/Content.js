import React from 'react'
import Title from "./Title"

class Content extends React.Component {
    render() {
        let oDiv = this.props.bottomVal.topValue.map((item,index) => {
            return <div style={{display: index === this.props.index ? 'block' : 'none'}} className='bottomBox' key={index}>{this.props.bottomVal.bottomValue[index]}</div>
        })
        return (
            <div className='bBox'>{oDiv}</div>
        )
    }
}

export default Content
