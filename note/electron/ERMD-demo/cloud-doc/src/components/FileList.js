import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')
  const node = useRef(null)
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const closeEdit = () => {
    setEditStatus(false)
    setValue('')
  }

  useEffect(() => {
    // const handleInputEvent = (e) => {
    //   if (e.keyCode === 13 && editStatus) {
    //     const editItem = files.find(file => file.id === editStatus)
    //     onSaveEdit(editItem.id, value)
    //     setEditStatus(false)
    //   } else if (e.keyCode === 27 && editStatus) {
    //     closeEdit(e)
    //   }
    // }
    // document.addEventListener('keyup', handleInputEvent)
    // return () => {
    //   // 清除事件的注册，防止多次按按键多次注册
    //   document.removeEventListener('keyup', handleInputEvent)
    // }
    if (enterPressed && editStatus) {
      const editItem = files.find(file => file.id === editStatus)
      onSaveEdit(editItem.id, value)
      setEditStatus(false)
    }
    if (escPressed && editStatus) {
      closeEdit()
    }
  })
  
  useEffect(() => {
    if (editStatus) {
      node.current.focus()
    }
  },[editStatus])

  return (
    <ul className='file-list list-group list-group-flush'>
      {
        files.map(file => {
          return (
            <li
              className='row no-gutters list-group-item bg-light d-flex align-items-center file-item'
              key={file.id}
            >
              {(file.id !== editStatus) &&
                <>
                  <span className='col-2'>
                    <FontAwesomeIcon
                      icon={faMarkdown}
                    />
                  </span>
                  <span
                    className='col-7 c-link'
                    onClick={() => { onFileClick(file.id) }}
                  >
                    {file.title}
                  </span>
                  <button
                    className='icon-button col-1 mr-3'
                    onClick={() => { setEditStatus(file.id); setValue(file.title); }}
                  >
                    <FontAwesomeIcon
                      title='编辑'
                      icon={faEdit}
                    />
                  </button>
                  <button
                    className='icon-button col-1'
                    onClick={() => { onFileDelete(file.id) }}
                  >
                    <FontAwesomeIcon
                      title='删除'
                      icon={faTrash}
                    />
                  </button>
                </>
              }
              {
                (file.id === editStatus) &&
                <>
                  <input
                    type="text"
                    className='form-control col-10 search'
                    value={value}
                    ref={node}
                    onChange={(e) => { setValue(e.target.value) }}
                  />
                  <button
                    className='icon-button search col-2'
                    onClick={closeEdit}
                  >
                    <FontAwesomeIcon title='关闭' icon={faTimes} />
                  </button>
                </>
              }
            </li>
          )
        })
      }
    </ul>
  )
}

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func
}

export default FileList