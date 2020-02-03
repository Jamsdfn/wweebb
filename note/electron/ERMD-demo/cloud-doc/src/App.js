//modules
import React, { useState } from 'react'
import { faPlus, faFileImport, faSave } from '@fortawesome/free-solid-svg-icons'
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
import fileHelper from './utils/fileHelper'
// reuqire nodeJS modules
const fs = window.require('fs')
const path = window.require('path')
const { remote } = window.require('electron')
const Store = window.require('electron-store')


//fileDate Storage
const fileStore = new Store({ 'name': 'Files Data' })
const saveFilesToStore = (files) => {
  // 我们只存一些重要的信息就行了，不用素有文件信息都存进去
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, path, title, createAt } = file
    result[id] = {
      id,
      path,
      title,
      createAt
    }
    return result
  }, {})
  fileStore.set('files', filesStoreObj)
}

const checkfile = (files) => {
  const list = objToArr(files).reduce((result, file) => {
    if (fs.existsSync(file.path)) {
      result[file.id] = file
    }
    return result
  }, {})
  fileStore.set('files', list)
  return list
}


function App() {
  //state
  const [files, setFiles] = useState(checkfile(fileStore.get('files')))
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsaveFileIDs, setUnsaveFileIDs] = useState([])
  const [searchFiles, setSearchFiles] = useState([])
  //location
  const savedLocation = path.join(remote.app.getAppPath(), 'doc')
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
    const currentFile = files[fileID]
    if (!currentFile.isLoaded) {
      fileHelper.readFile(currentFile.path)
        .then((data) => {
          const newFile = { ...files[fileID], body: data, isLoaded: true }
          setFiles({ ...files, [fileID]: newFile })
        })
    }
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
    if (files[id].isNew) {
      // delete files[id]
      // 用delete语句删除项的话，如果直接传files，那么因为obj引用没改变，react认为state并没有改变，所以不会重新render
      //setFiles({... files})

      // 用解构和rest语法进行删除，相当于提了一项出来，剩下了给afterDelete
      const {[id]:value, ...afterDelete} = files
      setFiles(afterDelete)
    } else {
      fileHelper.deleteFile(files[id].path)
        .then(() => {
          const {[id]:value, ...afterDelete} = files
          setFiles(afterDelete)
          saveFilesToStore(afterDelete)
          const tabsWitout = openedFileIDs.filter(fileID => fileID !== id)
          setOpenedFileIDs(tabsWitout)
          if (id === activeFileID && tabsWitout.length > 0) {
            setActiveFileID(tabsWitout[0])
          }
        })
    }
  }

  const updateFileName = (id, title, isNew) => {
    // const newFiles = files.map(file => {
    //   if (file.id === id) {
    //     file.title = title
    //     file.isNew = false
    //   }
    //   return file
    // })
    const oldPath = path.join(savedLocation, `${ files[id].title }.md`)
    const newPath = path.join(savedLocation, `${ title }.md`)
    const modifiedFile = { ...files[id], title, isNew: false, path: newPath }
    const newFiles = { ...files, [id]: modifiedFile }
    const fileContent = files[id].body

    if (isNew) {
      fileHelper.writeFile(newPath, fileContent)
        .then(() => {
          setFiles(newFiles)
          saveFilesToStore(newFiles)
        })
    } else {
      fileHelper.renameFile(oldPath, newPath)
        .then(() => {
          setFiles(newFiles)
          saveFilesToStore(newFiles)
        })
    }
  }

  const fileSearch = (keyword) => {
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchFiles(newFiles)
  }

  const createNewFile = () => {
    let flag = false
    objToArr(files).map((file) => {
      if (file.isNew) {
        flag = true
      }
    })
    if (!flag) {
      const newID = uuidv4()
      const newFile = {
        id: newID,
        title: '',
        body: '## 新建文档',
        createAt: new Date().getTime(),
        isNew: true
      }
      setFiles({ ...files, [newID]: newFile })
    }
  }

  const saveCurrentFile = () => {
    fileHelper.writeFile(path.join(savedLocation, `${ activeFile.title }.md`), activeFile.body)
      .then(() => {
        setUnsaveFileIDs(unsaveFileIDs.filter(id => id !== activeFile.id))
      })
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
              <BottomBtn
                icon={faSave}
                text='保存'
                colorClass='btn-danger'
                onBtnClick={saveCurrentFile}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}


export default App;
