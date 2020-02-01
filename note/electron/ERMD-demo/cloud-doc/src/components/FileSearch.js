import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const node = useRef(null)

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)
  const closeSearch = () => {
    setInputActive(false)
    setValue('')
  }

  useEffect(() => {
    // const handleInputEvent = (e) => {
    //   if (e.keyCode === 13 && inputActive) {
    //     onFileSearch(value)
    //   } else if (e.keyCode === 27 && inputActive) {
    //     closeSearch(e)
    //   }
    // }
    // document.addEventListener('keyup', handleInputEvent)
    // return () => {
    //   // 清除事件的注册，防止多次按按键多次注册
    //   document.removeEventListener('keyup', handleInputEvent)
    // }
    if (enterPressed && inputActive) {
      onFileSearch(value)
    }
    if (escPressed && inputActive) {
      closeSearch()
    }
  })

  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
    // 只有inputActive 改变的时候我们才用
  },[inputActive])

  return (
    <div className='alert alert-primary d-flex justify-content-between align-items-center
    d-flex justify-content-between align-items-center mb-0'>
      {
        !inputActive ?
          (
            <>
              <span>{title}</span>
              <button
                className='icon-button'
                onClick={() => { setInputActive(true) }}
              >
                <FontAwesomeIcon title='搜索' icon={faSearch}/>
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                className='form-control search'
                value={value}
                ref={node}
                onChange={(e) => { setValue(e.target.value) }}
              />
              <button
                className='icon-button'
                onClick={closeSearch}
              >
                <FontAwesomeIcon title='关闭' icon={faTimes}/>
              </button>
            </>
          )
      }
    </div>
  )
}

FileSearch.propTypes = {
  // title为字符串数据
  title: PropTypes.string,
  // onFileSearch为方法且是必需传的参
  onFileSearch: PropTypes.func.isRequired,
}

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch