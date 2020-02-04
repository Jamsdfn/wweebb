//modules
import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'
import useContextMenu from '../hooks/useContextMenu'
import { getParentNode } from '../utils/helper'



const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')
  const [sameNameFlag, setSameNameFlag] = useState(false)
  const node = useRef(null)
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const closeEdit = (editItem) => {
    setEditStatus(false)
    setValue('')

    if (editItem.isNew) {
      onFileDelete(editItem.id)
    }
  }

  const clickedItem = useContextMenu([
    {
      label: '打开',
      click: () => {
        const partentElement = getParentNode(clickedItem.current, 'file-item')
        if (partentElement) {
          onFileClick(partentElement.dataset.id)
        }
      }
    },
    {
      label: '重命名',
      click: () => {
        const partentElement = getParentNode(clickedItem.current, 'file-item')
        if (partentElement) {
          setEditStatus(partentElement.dataset.id);
          setValue(partentElement.dataset.title);
        }
        
      }
    },
    {
      label: '删除',
      click: () => {
        const partentElement = getParentNode(clickedItem.current, 'file-item')
        if (partentElement) {
          onFileDelete(partentElement.dataset.id)
        }
      }
    }
  ], '.file-list', [files])


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
    const editItem = files.find(file => file.id === editStatus)
    let flag = false
    if (enterPressed && editStatus && value.trim() !== '') {
      files.map((file => {
        if (file.title === value) {
          flag = true
        }
      }))
      if (!flag) {
        onSaveEdit(editItem.id, value, editItem.isNew)
        setEditStatus(false)
        setSameNameFlag(false)
      } else {
        setSameNameFlag(true)
      }
    }
    if (escPressed && editStatus) {
      closeEdit(editItem)
      setSameNameFlag(false)
    }
  })

  useEffect(() => {
    const newFile = files.find(file => file.isNew)
    // console.log(newFile)
    if (newFile) {
      setEditStatus(newFile.id)
      setValue(newFile.title)
    }
  }, [files])

  useEffect(() => {
    if (editStatus) {
      node.current.focus()
    }
  }, [editStatus])

  return (
    <ul className='file-list list-group list-group-flush'>
      {
        files.map(file => {
          return (
            <li
              className='row no-gutters list-group-item bg-light d-flex align-items-center file-item'
              key={file.id}
              data-id={file.id}
              data-title={file.title}
            >
              {((file.id !== editStatus) && !file.isNew) &&
                <>
                  <span className='col-2 ml-2'>
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
                </>
              }
              {
                ((file.id === editStatus) || file.isNew) &&
                <>
                  <input
                    type="text"
                    className='form-control col-10 search pl-2'
                    value={value}
                    ref={node}
                    placeholder="请输入文件名称"
                    onChange={(e) => { setValue(e.target.value) }}
                  />
                  <button
                    className='icon-button search col-2'
                    onClick={() => { closeEdit(file) }}
                  >
                    <FontAwesomeIcon title='关闭' icon={faTimes} />
                  </button>
                </>
              }
              {
                (file.id === editStatus && sameNameFlag) &&
                <div className="mt-2 mb-0 warnning alert alert-warning" role="alert">
                  <strong>警告！</strong>已存在同名文件
                </div>
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