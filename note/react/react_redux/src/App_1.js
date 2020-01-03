import React from 'react';
import counter from './Reducers'
import {createStore} from 'redux'
import Counter from './components/counter'

let store = createStore(counter)


class App extends React.Component {
    render() {
        return (
            <div>
                <Counter
                    value={store.getState()}
                    onAdd={() => store.dispatch({type:'add'})}
                    onSub={() => store.dispatch({type:'sub'})}
                />
            </div>
        )
    }
}

export {App,store};
