import React from 'react'

class Title extends React.Component {
    render() {
        let oLi = this.props.topVal.map((value,index) => {
            return <li onMouseOver={this.props.change.bind(null, index)} className={index === this.props.index ? 'active' : ''} key={index}>{value}</li>
        })
        return (
            <div className='topBox'>
                <ul>{oLi}</ul>
            </div>
        )
    }
}

export default Title
