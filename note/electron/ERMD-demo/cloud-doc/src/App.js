//modules
import React, { useState } from 'react'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import uuidv4 from 'uuid/v4'
//style
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'easymde/dist/easymde.min.css'
//component
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import SimpleMDE from 'react-simplemde-editor'
//static file
import defaultFiles from './utils/defaultFiles'
import { flattenArr, objToArr } from './utils/helper'

function App() {
  //state
  const [files, setFiles] = useState(flattenArr(defaultFiles))
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsaveFileIDs, setUnsaveFileIDs] = useState([])
  const [searchFiles, setSearchFiles] = useState([])
  //files
  const filesArr = objToArr(files)
  const openedFiles = openedFileIDs.map(openID => {
    return files[openID]
  })
  const activeFile = files[activeFileID]

  //refactor function
  const updateFile = (id, key, value) => {
    return files.map(file => {
      if (file.id === id) {
        file[key] = value
      }
      return file
    })
  }

  //business logic function
  const fileClick = (fileID) => {
    setActiveFileID(fileID)
    if (!openedFileIDs.includes(fileID)) {
      // 用扩展运算符... 把数组展开然后加一项
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }

  const tabClick = (fileID) => {
    setActiveFileID(fileID)
  }

  const tabClose = (closeID) => {
    const tabsWitout = openedFileIDs.filter(fileID => fileID !== closeID)
    setOpenedFileIDs(tabsWitout)
    // 关掉后把第一个tab变为active tab，如果全部tab都没了 active为空
    if (tabsWitout.length > 0) {
      setActiveFileID(tabsWitout[0])
    } else {
      setActiveFileID('')
    }
  }

  const fileChange = (id, value) => {
    // 把值更新到file数组中，不用疑惑为什么直接就保存在file中，因为只有保存了才持久化，所以这个数组可以随便改
    // const newFiles = updateFile(id, 'body', value)
    // setFiles(newFiles)
    const newFile = { ...files[id], body: value }
    setFiles({ ...files, [id]: newFile })
    if (!unsaveFileIDs.includes(id)) {
      setUnsaveFileIDs([...unsaveFileIDs, id])
    }
  }

  const deleteFile = (id) => {
    delete files[id]
    setFiles(files)
    const tabsWitout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabsWitout)
    if (id === activeFileID && tabsWitout.length > 0) {
      setActiveFileID(tabsWitout[0])
    }
  }

  const updateFileName = (id, title) => {
    // const newFiles = files.map(file => {
    //   if (file.id === id) {
    //     file.title = title
    //     file.isNew = false
    //   }
    //   return file
    // })
    const modifiedFile = { ...files[id], title, isNew: false }
    setFiles({ ...files, [id]: modifiedFile })
  }

  const fileSearch = (keyword) => {
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchFiles(newFiles)
  }

  const createNewFile = () => {
    // const newFiles = [
    //   ...files,
    //   {
    //     id: uuidv4(),
    //     title: '',
    //     body: '## 新建文档',
    //     createAt: new Date().getTime(),
    //     isNew: true
    //   }
    // ]
    const newID = uuidv4()
    const newFile = {
      id: newID,
      title: '',
      body: '',
      createAt: new Date().getTime(),
      isNew: true
    }
    setFiles({...files, [newID]: newFile})
  }

  //flag
  let fileListArr = (searchFiles.length > 0) ? searchFiles : filesArr

  //render
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch
            title='My Document'
            onFileSearch={fileSearch}
          />
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn
                icon={faPlus}
                text='新建'
                colorClass='btn-primary'
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                icon={faFileImport}
                text='导入'
                colorClass='btn-success'
                onBtnClick={() => { }}
              />
            </div>
          </div>
        </div>
        <div className="col-9">
          {
            !activeFile &&
            <div className='start-page'>
              选择或者创建新的 Markdown 文档
            </div>
          }
          {
            activeFile &&
            <>
              <TabList
                files={openedFiles}
                onTabClick={tabClick}
                activeId={activeFileID}
                onCloseTab={tabClose}
                unsaveIds={unsaveFileIDs}
              />
              <SimpleMDE
                // 这个 key 属性是区分打开不同file的，没有的话切换tab的时候内容变得会混乱
                key={activeFile && activeFile.id}
                value={activeFileID && activeFile.body}
                onChange={(value) => { fileChange(activeFile.id, value) }}
                options={{
                  minHeight: '475px'
                }}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}


export default App;
