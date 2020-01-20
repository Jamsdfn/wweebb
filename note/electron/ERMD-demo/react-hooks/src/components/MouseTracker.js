import React, { useState, useEffect } from 'react'

const MouseTracker = () => {
    const [positions, setPositions] = useState({x: 0, y: 0})

    useEffect(() => {
        // 这样会有问题，因为每次点击都注册了一次事件，同一个事件注册了很多次
        // document.addEventListener('click', (e) => {
        //     setPositions({x: e.clientX, y: e.clientY})
        // })
        const updateMouse = (e) => {
            console.log('click')
            setPositions({x: e.clientX, y: e.clientY})
        }
        console.log('add listener')
        document.addEventListener('click', updateMouse)
        return () => {
            console.log('remove listener')
            document.removeEventListener('click', updateMouse)
        }
    })

    return (
    <p>X: {positions.x}, Y: {positions.y}</p>
    )
}

export default MouseTracker