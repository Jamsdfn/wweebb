import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Reducer from './Reducers/combine'
let store = createStore(Reducer,applyMiddleware(thunk,fn))

function fn() {
    return function (dispatch) {
        return function (action) {
            if (action.text === 'aaa') {
                console.log('非法输入')
                action.text = '***'
                dispatch(action)
            }else{
                dispatch(action)
            }
        }
    }
}

export default store
