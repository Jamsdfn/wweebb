import React from 'react';
import List from './components/list'
import Counter from './components/counter'
import Book from './components/book'
import store from './store'
// console.log(store.getState())
class App extends React.Component {
    add(v) {
        store.dispatch({type:'addLi',text:v})
    }
    click() {
        store.dispatch(function (dispatch) {
            setTimeout(function(){dispatch({type:'add'})},1000)
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.click.bind(this)}>thunk</button>
                <Counter
                    value={store.getState().Counter}
                    onAdd={()=>store.dispatch({type:'add'})}
                    onSub={()=>store.dispatch({type:'sub'})}
                />
                <hr/>
                <List
                    // 推荐还是直接把整个store传给组件，让组件处理，这里复习一下子组件给父组件传数据
                    value={store.getState().List}
                    add={this.add.bind(this)}
                    store={store}
                />
                <hr/>
                <Book/>
            </div>
        )
    }
}

export {App,store};
