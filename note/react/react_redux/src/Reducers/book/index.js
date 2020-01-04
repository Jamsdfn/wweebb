import {bookData} from './initState'
import {bookTo} from './initFn'

function reducer(state=bookData,action) {
    let json = {'bookTo':bookTo}
    if (json[action.type]) {
        return  json[action.type](state,action)
    } else {
        return state
    }
}
export default reducer
