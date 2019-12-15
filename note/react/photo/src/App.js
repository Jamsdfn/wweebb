import React from 'react';
import PicTab from './PicTab.js'

import './App.css';

let data = {
    picUrl: ['./img/1.jpeg','./img/2.jpeg','./img/3.jpg','./img/4.jpg','./img/5.jpg','./img/6.jpg','./img/7.jpg','./img/8.jpg','./img/9.jpg'],
    text: ['好看的动漫1','好看的动漫2','好看的动漫3','好看的动漫4','好看的动漫5','好看的动漫6','好看的动漫7','好看的动漫8','好看的动漫9'],
    bText: ['详细介绍1','详细介绍2','详细介绍3','详细介绍4','详细介绍5','详细介绍6','详细介绍7','详细介绍8','详细介绍9']
}

class App extends React.Component{
    render() {
        return (
            <div>
                <PicTab PicJson={data}/>
            </div>
        )
    }
}


export default App;
