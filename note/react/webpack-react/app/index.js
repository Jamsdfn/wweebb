import React from 'react'
import ReactDOM from 'react-dom'
console.log(11)
class Leo extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: '我吐了，webpack 配置真恶心'
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
