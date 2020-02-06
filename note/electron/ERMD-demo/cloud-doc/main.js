const { app, Menu, shell, ipcMain, dialog } = require('electron')
const isDev = require('electron-is-dev')
const defaultMenu = require('./src/menuTemplate')
const AppWindow = require('./src/AppWinodw')
const path = require('path')
const Store = require('electron-store')
const cosManager = require('./src/utils/cosManager')
const settingsStore = new Store({ name: 'Settings' })
const fileStore = new Store({name: 'Files Data'})
const menuTemplate = defaultMenu(app, shell, ipcMain, settingsStore)
let mainWindow, settingsWindow
// console.log(menuTemplate)

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
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
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
    // console.log(data)
    const manager = createManager()
    manager.uploadFIle(data.key, data.path)
      .then(data => {
        // console.log('上传成功', data)
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
    // console.log(id)
    manager.getStat(key)
      .then((item) => {
        const serverUpdatedTime = Date.parse(item.LastModified)
        const localUpdatedTime = filesObj[id].updateAt
        // console.log(serverUpdatedTime, localUpdatedTime)
        if (serverUpdatedTime > localUpdatedTime || !localUpdatedTime) {
          manager.downloadFile(key, path)
            .then(() => {
              console.log('newFileDownloaded')
              mainWindow.webContents.send('file-downloaded', {
                status: 'download-success',
                id
              })
            })
        } else {
          console.log('noNewFile')
          mainWindow.webContents.send('file-downloaded', {
            status: 'no-new-file',
            id
          })
        }
      }, (err) => {
        console.log(err)
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
    setTimeout(() => {
      mainWindow.webContents.send('loading-status', false)
    }, 2000)
  })
})