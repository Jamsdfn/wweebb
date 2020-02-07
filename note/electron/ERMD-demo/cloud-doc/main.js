const { app, Menu, shell, ipcMain, dialog } = require('electron')
const isDev = require('electron-is-dev')
const defaultMenu = require('./src/menuTemplate')
const AppWindow = require('./src/AppWindow')
const path = require('path')
const Store = require('electron-store')
const cosManager = require('./src/utils/cosManager')
const settingsStore = new Store({ name: 'Settings' })
const fileStore = new Store({ name: 'Files Data' })
const menuTemplate = defaultMenu(app, shell, ipcMain, settingsStore)
let mainWindow, settingsWindow

const createManager = () => {
  const accessId = settingsStore.get('accessId')
  const accessKey = settingsStore.get('accessKey')
  const bucket = settingsStore.get('bucket')
  const region = settingsStore.get('region')
  return new cosManager(accessId, accessKey, bucket, region)
}


app.on('ready', () => {
  // mainWindow = new BrowserWindow({
  //     width: 1024,
  //     height: 680,
  //     webPreferences: {
  //         nodeIntegration: true
  //     }
  // })
  const mainWindowConfig = {
    width: 1024,
    height: 680,
  }
  const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'build/index.html')}`
  mainWindow = new AppWindow(mainWindowConfig, urlLocation)
  // mainWindow.loadURL(urlLocation)
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  let menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  ipcMain.on('open-setting-window', () => {
    const settingsWindowConfig = {
      width: 500,
      height: 400,
      parent: mainWindow
    }
    const settingsFileLocation = `file://${ path.join(__dirname, './settings/settings.html') }`
    settingsWindow = new AppWindow(settingsWindowConfig, settingsFileLocation)
    settingsWindow.removeMenu()
    settingsWindow.on('close', () => {
      settingsWindow = null
    })
  })

  ipcMain.on('config-is-saved', () => {
    // 因为 mac 菜单会多一项，所以要判断一下
    let cosMenu = process.platform === 'darwin' ? menu.items[3] : menu.items[2]
    const switchItems = (toggle) => {
      // 云同步菜单的第二三四先的enabled属性要改变
      [1, 2, 3].forEach(number => {
        cosMenu.submenu.items[number].enabled = toggle
      })
    }
    const cosIsConfig = ['accessId', 'accessKey', 'bucket', 'region'].every(key => settingsStore.get(key))
    if (cosIsConfig) {
      switchItems(true)
    } else {
      switchItems(false)
    }
  })

  ipcMain.on('upload-file', (event, data) => {
    const manager = createManager()
    manager.uploadFIle(data.key, data.path)
      .then(data => {
        mainWindow.webContents.send('active-file-uploaded')
      })
      .catch(err => {
        dialog.showErrorBox('同步失败', '请检查腾讯云参数是否正确')
      })
  })

  ipcMain.on('download-file', (event, data) => {
    const manager = createManager()
    const filesObj = fileStore.get('files')
    const { key, path, id } = data
    manager.getStat(key)
      .then((item) => {
        const serverUpdatedTime = Date.parse(item.LastModified)
        const localUpdatedTime = filesObj[id].updateAt
        if (serverUpdatedTime > localUpdatedTime || !localUpdatedTime) {
          manager.downloadFile(key, path)
            .then(() => {
              mainWindow.webContents.send('file-downloaded', {
                status: 'download-success',
                id
              })
            })
        } else {
          mainWindow.webContents.send('file-downloaded', {
            status: 'no-new-file',
            id
          })
        }
      }, (err) => {
        // console.log(err)
        if (err === 'noFile') {
          mainWindow.webContents.send('file-downloaded', {
            status: 'no-file',
            id
          })
        }
      })
  })

  ipcMain.on('upload-all-to-cos', () => {
    mainWindow.webContents.send('loading-status', true)
    const filesObj = fileStore.get('files') || {}
    const manager = createManager()
    const uploadPromiseArr = Object.keys(filesObj).map(key => {
      const file = filesObj[key]
      return manager.uploadFIle(`${ file.title }.md`, file.path)
    })
    Promise.all(uploadPromiseArr)
      .then(result => {
        dialog.showMessageBox({
          type: 'info',
          title: '消息',
          message: `成功上传了${ result.length }个文件`
        })
        mainWindow.webContents.send('files-uploaded')
      })
      .catch(() => {
        dialog.showErrorBox('同步失败', '请检查腾讯云参数是否正确')
      })
      .finally(() => {
        mainWindow.webContents.send('loading-status', false)
      })
  })

  ipcMain.on('download-all-to-local', () => {
    mainWindow.webContents.send('loading-status', true)
    const manager = createManager()
    const filesObj = fileStore.get('files') || {}
    const existFilesKeys = Object.keys(filesObj).map(key => {
      const file = filesObj[key]
      return `${ file.title }.md`
    })
    manager.getAllStat()
      .then((data) => {
        const needDownloadFiles = data.filter(item => {
          return !existFilesKeys.find(value => value === item.Key)
        })
        const downloadPromiseArr = needDownloadFiles.map(item => {
          return manager.downloadFile(item.Key, path.join(settingsStore.get('saveFileLocation'), item.Key))
        })
        const needDownloadFilesTitles = needDownloadFiles.map(item => {
          return item.Key.replace(/.md/, '')
        })
        Promise.all(downloadPromiseArr)
          .then(result => {
            dialog.showMessageBox({
              type: 'info',
              title: '消息',
              message: `成功下载了${ result.length }个文件`
            })
            mainWindow.webContents.send('downloaded-all-files', {
              titleArr: needDownloadFilesTitles
            })
          })
          .catch(() => {
            dialog.showErrorBox('同步失败', '请检查腾讯云参数是否正确')
          })
          .finally(() => {
            mainWindow.webContents.send('loading-status', false)
          })
      })
  })

  ipcMain.on('rename-file', (event, data) => {
    const { oldkey, newkey, path } = data
    const manager = createManager()
    manager.renameFile(oldkey, newkey, path)
      .catch(() => {
        dialog.showErrorBox('同步失败', '请检查腾讯云参数是否正确')
      })
  })

  ipcMain.on('delete-file', (event, data) => {
    const manager = createManager()
    manager.deleteFile(data.key)
      .catch(() => {
        dialog.showErrorBox('同步失败', '请检查腾讯云参数是否正确')
      })
  })
})