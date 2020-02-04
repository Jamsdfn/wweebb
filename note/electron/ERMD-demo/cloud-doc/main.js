const {app, BrowserWindow, Menu, shell, ipcMain} = require('electron')
const isDev = require('electron-is-dev')
const defaultMenu  = require('./src/menuTemplate')
const AppWindow = require('./src/AppWinodw')
const menuTemplate = defaultMenu(app, shell, ipcMain)
const path = require('path')
let mainWindow, settingsWindow
// console.log(menuTemplate)
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
    mainWindow = new AppWindow(mainWindowConfig,urlLocation)
    // mainWindow.loadURL(urlLocation)
    mainWindow.on('closed', () => {
      mainWindow = null
    })

    ipcMain.on('open-setting-window', () => {
      const settingsWindowConfig = {
        width: 500,
        height: 400,
        parent: mainWindow
      }
      const settingsFileLocation = `file://${path.join(__dirname,'./settings/settings.html')}`
      settingsWindow = new AppWindow(settingsWindowConfig, settingsFileLocation)
      settingsWindow.on('close', () => {
        settingsWindow = null
      })
    })

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
})