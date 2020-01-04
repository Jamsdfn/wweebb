import {counterInit,TabInit} from './initState'
import {add,remove} from './initFn'
import createReducer from './createReducer'
function reducer(state=counterInit,action) {
    let json = {'addLi':add,'remove':remove}
    if (json[action.type]) {
        return  json[action.type](state,action)
    } else {
        return state
    }
}
export default reducer
//export default createReducer(counterInit,{'add':add,'remove':remove})
