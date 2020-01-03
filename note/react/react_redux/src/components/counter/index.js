import React from 'react'

class Counter extends React.Component {
    render() {
        let {value,onAdd,onSub} = this.props
        return (
            <div>
                <button onClick={onSub}>-</button>
                <span>{value}</span>
                <button onClick={onAdd}>+</button>
            </div>
        )
    }
}

export default Counter
