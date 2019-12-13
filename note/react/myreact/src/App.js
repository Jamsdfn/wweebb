import React from 'react'
import './App.css'
import Tab from './tab.js'

let tabJson = {
    picUrl: ['1.jpeg','2.jpeg','3.jpeg', '4.jpeg'],
    timer: 3000
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Tab tabJson={tabJson}/>
            </div>
        )
    }
}

export default App
