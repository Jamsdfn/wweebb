import React from 'react'
import './Loader.css'

const Loader = ({ text = '处理中' }) => {
  return (
    <div className='text-center loading-component'>
      <div className="text-primary spinner-border" role="status">
        <span className="sr-only">{text}</span>
      </div>
      <h6 className='text-secondary'>{text}</h6>
    </div>
  )
}


export default Loader