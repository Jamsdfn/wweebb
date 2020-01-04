import {combineReducers} from 'redux'
import Counter from './Counter'
import List from './List'
import book from './book'

export default combineReducers({
    Counter,
    List,
    book
})
