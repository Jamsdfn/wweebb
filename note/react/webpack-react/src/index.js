import React from 'react'
import ReactDOM from 'react-dom'

class Leo extends React.Component {
    render() {
        return (
            <div>
                组件Leo!
            </div>
        )
    }
}

ReactDOM.render(<Leo/>,document.getElementById('app'))
// ReactDOM.render(<Leo/>,app)
