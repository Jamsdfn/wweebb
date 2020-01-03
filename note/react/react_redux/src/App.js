import React from 'react';
import counter from './Reducers'
import {createStore} from 'redux'
import List from './components/list'

let store = createStore(counter)

class App extends React.Component {
    add(v) {
        store.dispatch({type:'add',text:v})
    }
    render() {
        return (
            <div>
                <List
                    // 推荐还是直接把整个store传给组件，让组件处理，这里复习一下子组件给父组件传数据
                    value={store.getState()}
                    add={this.add.bind(this)}
                    store={store}
                />
            </div>
        )
    }
}

export {App,store};
