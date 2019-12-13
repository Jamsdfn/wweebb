import React from 'react'

class Tab extends React.Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            transitions: 0,
            w: 0,
            myTimer: null,
            setTimer:null
        }
    }
    componentDidMount(){
        this.autoPlay()
    }
    click(index) {
        // console.log(index)
        this.setState({
            index: index
        })
    }
    leftClick() {
        this.setState({
            index: this.state.index === 0 ? this.props.tabJson.picUrl.length - 1 : --this.state.index
        })
    }
    rightClick() {
        this.setState({
            index: this.state.index === this.props.tabJson.picUrl.length - 1 ? 0 : ++this.state.index
        })
    }
    mouseover() {
        clearInterval(this.state.myTimer)
        clearInterval(this.state.setTimer)
        this.setState({
            w:0,
            transitions:0
        })
    }
    autoPlay() {
        clearInterval(this.state.myTimer)
        clearInterval(this.state.setTimer)
        this.state.myTimer = setTimeout(() => {
            this.setState({
                transitions: this.props.tabJson.timer/1000,
                w:100
            })
        },0)
        this.state.setTimer = setInterval(() => {
            this.setState({
                index: this.state.index === this.props.tabJson.picUrl.length - 1 ? 0 : ++this.state.index,
                w:0,
                transitions:0
            })
            setTimeout(() => {
                this.setState({
                    transitions: this.props.tabJson.timer/1000,
                    w:100
                })
            },10)
        },this.props.tabJson.timer)
    }
    mouseout() {
        this.autoPlay()
    }
    render() {
        let aLi = this.props.tabJson.picUrl.map((item, index) => {
            return <li key={index}><img src={item}/></li>
        })
        let aOl = this.props.tabJson.picUrl.map((item, index) => {
            return <li key={index} className={index === this.state.index ? 'active' : ''} onClick={this.click.bind(this,index)}/>
        })
        return(
            <div className='tab' onMouseOver={this.mouseover.bind(this)} onMouseOut={this.mouseout.bind(this)}>
                <div className='line' style={{transition: this.state.transitions + 's',width:this.state.w + '%'}}/>
                <div className='left' onClick={this.leftClick.bind(this)}/>
                <div className='right' onClick={this.rightClick.bind(this)}/>
                <ul style={{width:this.props.tabJson.picUrl.length*960,left:this.state.index*-960}}>
                    {aLi}
                </ul>
                <ol>
                    {aOl}
                </ol>
            </div>
        )
    }
}

export default Tab
