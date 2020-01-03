export default function counter(state=0,action) {
    if (action.type === 'add') {
        console.log('add')
        return  ++state
    } else if (action.type === 'sub') {
        console.log('sub')
        return --state
    } else {
        return state
    }
}
