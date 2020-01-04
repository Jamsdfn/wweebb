// counter函数

function add(state,action) {
    return state.concat([action.text])
}

function remove(state,action) {
    state.splice(action.index,1)
    return state
}

export {add,remove}
