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
import Loader from './components/Loader'
//static file
import { objToArr, flattenArr, timestampToString } from './utils/helper'
import fileHelper from './utils/fileHelper'
import useIpcRenderer from './hooks/useIpcRenderer'
// reuqire nodeJS modules
const fs = window.require('fs')
const path = window.require('path')
const { remote, ipcRenderer } = window.require('electron')
const Store = window.require('electron-store')


//fileDate Storage
const fileStore = new Store({ 'name': 'Files Data' })
const settingsStore = new Store({ name: 'Settings' })
const getAutoSync = () => {
  return ['accessId', 'accessKey', 'bucket', 'region', 'enableAutoSync'].every(key => !!settingsStore.get(key))
}

const saveFilesToStore = (files) => {
  // 我们只存一些重要的信息就行了，不用素有文件信息都存进去
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, path, title, createAt, isSynced, updateAt } = file
    result[id] = {
      id,
      path,
      title,
      createAt,
      isSynced,
      updateAt
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
  const [files, setFiles] = useState(checkfile(fileStore.get('files') || {}) || {})
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsaveFileIDs, setUnsaveFileIDs] = useState([])
  const [searchFiles, setSearchFiles] = useState([])
  const [ isLoading, setLoading ] = useState(false)
  //location
  const savedLocation = settingsStore.get('saveFileLocation') || path.join(remote.app.getAppPath(), 'doc')
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
    const { id, title, path, isLoaded } = currentFile
    if (!isLoaded) {
      if (getAutoSync()) {
        ipcRenderer.send('download-file', { key: `${title}.md`, path, id })
      } else {
        fileHelper.readFile(path)
        .then((data) => {
          const newFile = { ...files[fileID], body: data, isLoaded: true }
          setFiles({ ...files, [fileID]: newFile })
        })
      }
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
    if (value !== files[id].body) {
      // 把值更新到file数组中，不用疑惑为什么直接就保存在file中，因为只有保存了才持久化，所以这个数组可以随便改
      // const newFiles = updateFile(id, 'body', value)
      // setFiles(newFiles)
      const newFile = { ...files[id], body: value }
      setFiles({ ...files, [id]: newFile })
      if (!unsaveFileIDs.includes(id)) {
        setUnsaveFileIDs([...unsaveFileIDs, id])
      }
    }
  }

  const deleteFile = (id) => {
    if (files[id].isNew) {
      // delete files[id]
      // 用delete语句删除项的话，如果直接传files，那么因为obj引用没改变，react认为state并没有改变，所以不会重新render
      //setFiles({... files})

      // 用解构和rest语法进行删除，相当于提了一项出来，剩下了给afterDelete
      const { [id]: value, ...afterDelete } = files
      setFiles(afterDelete)
    } else {
      fileHelper.deleteFile(files[id].path)
        .then(() => {
          if (getAutoSync()) {
            ipcRenderer.send('delete-file', {
              key: `${files[id].title}.md`
            })
          }
          const { [id]: value, ...afterDelete } = files
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
    const oldPath = files[id].path
    const newPath = isNew ? path.join(savedLocation, `${ title }.md`) : path.join(path.dirname(files[id].path), `${ title }.md`)
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
          if (getAutoSync()) {
            ipcRenderer.send('rename-file', {
              oldkey: `${files[id].title}.md`,
              newkey: `${title}.md`,
              path: newPath
            })
          }
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
    // console.log(activeFile)
    if (activeFile) {
      fileHelper.writeFile(activeFile.path, activeFile.body)
        .then(() => {
          setUnsaveFileIDs(unsaveFileIDs.filter(id => id !== activeFile.id))
          // console.log(getAutoSync())
          if (getAutoSync()) {
            ipcRenderer.send('upload-file', {
              key: `${ activeFile.title }.md`,
              path: activeFile.path
            })
          }
        })
    }

  }

  const importFiles = () => {
    remote.dialog.showOpenDialog({
      title: '选择要导入的 Markdown 文件',
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Markdown files', extensions: ['md'] }
      ]
    })
      .then((pathObj) => {
        if (Array.isArray(pathObj.filePaths)) {
          // 把已有的文件过滤掉
          const filteredPaths = pathObj.filePaths.filter(path => {
            const alreadyAdded = Object.values(files).find(file => {
              return file.path === path
            })
            return !alreadyAdded
          })
          // 扩展文件信息
          const importFilesArr = filteredPaths.map(paths => {
            return {
              id: uuidv4(),
              title: path.basename(paths, path.extname(paths)),
              path: paths,
              createAt: new Date().getTime()
            }
          })
          // console.log(importFilesArr)
          // 把数组转为 flatten 数组
          const newFiles = { ...files, ...flattenArr(importFilesArr) }
          // console.log(newFiles)
          // setState 并且持久化
          setFiles(newFiles)
          saveFilesToStore(newFiles)
          if (importFilesArr.length > 0) {
            remote.dialog.showMessageBox({
              type: 'info',
              title: '提示',
              message: `成功导入了${ importFilesArr.length }个文件`
            })
          }
        }
      })
  }

  const activeFileUploaded = () => {
    const { id } = activeFile
    const modifiedFile = { ...files[id], isSynced: true, updateAt: new Date().getTime() }
    const newFiles = { ...files, [id]: modifiedFile }
    setFiles(newFiles)
    saveFilesToStore(newFiles)
  }

  const activeFileDownloaded = (event, message) => {
    const currentFile = files[message.id]
    const { id, path } = currentFile
    fileHelper.readFile(path)
      .then(value => {
        let newFile
        if (message.status === 'download-success') {
          newFile = { ...files[id], body: value, isLoaded: true, isSynced: true, updateAt: new Date().getTime() }
        } else {
          newFile = { ...files[id], body: value, isLoaded: true }
        }
        const newFiles = { ...files, [id]: newFile }
        setFiles(newFiles)
        saveFilesToStore(newFiles)
      })
  }

  const filesUploaded = () => {
    const newFiles = objToArr(files).reduce((result, file) => {
      const currentTime = new Date().getTime()
      result[file.id] = {
        ...files[file.id],
        isSynced: true,
        updateAt: currentTime
      }
      return result
    }, {})
    setFiles(newFiles)
    saveFilesToStore(newFiles)
  }

  const downloadedAllFiles = (event, message) => {
      // const newID = uuidv4()
      // const newFile = {
      //   id: newID,
      //   title: '',
      //   body: '## 新建文档',
      //   createAt: new Date().getTime(),
      //   isNew: true
      // }
      // setFiles({ ...files, [newID]: newFile })
    const currentTime = new Date().getTime()
    let newFiles = files
    message.titleArr.forEach(value => {
      const newID = uuidv4()
      const newFile = {
        id: newID,
        title: value,
        createAt: currentTime,
        isSynced: true,
        updateAt: currentTime,
        path: path.join(settingsStore.get('saveFileLocation'), `${value}.md`)
      }
      // setFiles({ ...files, [newID]: newFile })
      newFiles = { ...newFiles, [newID]: newFile }
    })
    setFiles(newFiles)
    saveFilesToStore(newFiles)
  }

  //flag
  let fileListArr = (searchFiles.length > 0) ? searchFiles : filesArr
  //effect
  useIpcRenderer({
    'create-new-file': createNewFile,
    'import-file': importFiles,
    'save-edit-file': saveCurrentFile,
    'active-file-uploaded': activeFileUploaded,
    'file-downloaded': activeFileDownloaded,
    'loading-status': (message, status) => { setLoading(status)},
    'files-uploaded': filesUploaded,
    'downloaded-all-files': downloadedAllFiles
  })
  //render
  return (
    <div className="App container-fluid px-0">
      { isLoading && <Loader />}
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
                onBtnClick={importFiles}
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
              {activeFile.isSynced &&
                <span className='sync-status'>已同步，上次同步 {timestampToString(activeFile.updateAt)}</span>
              }
            </>
          }
        </div>
      </div>
    </div>
  );
}


export default App;
