import React, { useState,useEffect } from 'react'

const LikeButton = () => {
    const [like, setLike] = useState(0)

    useEffect(() => {
        document.title = `点击了 ${like} 次`
    })

    function addLike() {
        setLike(like + 1)
    }
    return (
        <div>
            <button onClick={addLike}>
                {like}赞
            </button>
        </div>
    )
}

export default LikeButton