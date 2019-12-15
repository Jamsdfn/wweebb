import React from 'react'

class PicTab extends React.Component {
    constructor() {
        super()
        this.state = {
            rotate: [],
            left: [],
            top: [],
            zIndex: [],
            index: 0,
            rotateY:[]
        }
    }

    componentDidMount() {
        this.random()
    }

    random(i) {
        let newRotate = [], newLeft = [], newTop = [], newZIndex = [], newRotateY = []
        this.props.PicJson.picUrl.forEach((item, index) => {
            newRotateY.push(0)
            if (index === i) {
                newRotate.push('0')
                newLeft.push('calc(50% - 170px)')
                newTop.push('20%')
                newZIndex.push(50)
            } else {
                newRotate.push(Math.random() * 360)
                newLeft.push(Math.random() * window.innerWidth - 170)
                newTop.push(Math.random() * window.innerHeight - 208)
                newZIndex.push(30)
            }
        })
        this.setState({
            rotate: newRotate,
            top: newTop,
            left: newLeft,
            zIndex: newZIndex,
            rotateY: newRotateY
        })
    }

    click(index, e) {
        if (e.target.classList.contains('active')) {
            if (e.target.classList.contains('bactive')) {
                e.target.classList.remove('bactive')
                this.state.rotateY.splice(index, 1, 0)
            } else {
                e.target.classList.add('bactive')
                // 把第 index 个元素起 往后1个 替换成180
                this.state.rotateY.splice(index, 1, 180)
            }
            this.setState({
                rotateY: this.state.rotateY
            })
        } else {
            this.random(index)
            this.setState({
                index: index
            })
        }
    }

    render() {
        // 图片
        let aLi = this.props.PicJson.picUrl.map((item, index) => {
            return (
                <li key={index} style={{
                    transform: `perspective(800px) rotate(${this.state.rotate[index]}deg) rotateY(${this.state.rotateY[index]}deg)`,
                    left: this.state.left[index],
                    top: this.state.top[index],
                    zIndex: this.state.zIndex[index],
                    transition: Math.random() * 0.4 + 0.3 + 's'
                }}>
                    <div className='zm'>
                        <img src={item}/>
                        <div className='textNode'>{this.props.PicJson.text[index]}</div>
                    </div>
                    <div className='bm'>{this.props.PicJson.bText[index]}</div>
                </li>
            )
        })
        // 点
        let bLi = this.props.PicJson.picUrl.map((item, index) => {
            return <li key={index} onClick={this.click.bind(this, index)}
                       className={index === this.state.index ? 'active' : ''}/>
        })
        return (
            <div>
                <ul className='myUl' ref='myUl'>
                    {aLi}
                </ul>
                <ol className='myOl'>
                    {bLi}
                </ol>
            </div>
        )
    }
}

export default PicTab
