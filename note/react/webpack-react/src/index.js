import React from 'react'
import ReactDOM from 'react-dom'
console.log(11)
class Leo extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: 'hello react'
        }
    }
    render() {
        return (
            <div>
                {this.state.msg}
            </div>
        )
    }
}

ReactDOM.render(<Leo/>,document.getElementById('app'))
// ReactDOM.render(<Leo/>,app)
