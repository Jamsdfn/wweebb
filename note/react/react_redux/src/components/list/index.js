import React from 'react'

class List extends React.Component {
    ChildAdd() {
        this.props.add(this.refs.input.value)
    }
    remove(i) {
        this.props.store.dispatch({type:'remove',index:i})
    }
    render() {
        let {value} = this.props
        //console.log(value)
        let aLi = value.map((item,index)=>{
            return <li key={index} onClick={this.remove.bind(this,index)}>{item}</li>
        })
        // console.log(value)
        return (
            <div>
                <ul>
                    <input type="text" ref='input'/>
                    <button onClick={this.ChildAdd.bind(this)}>add</button>
                    {aLi}
                </ul>
            </div>
        )
    }
}

export default List
