const { app, BrowserWindow, ipcMain } = require('electron')


// 让 mainWindow 的作用域放在外面，防止外部引用不了mainWindow
let mainWindow
app.on('ready', () => {
  require('devtron').install()
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  mainWindow.loadFile('index.html')

  // let secondWindow = new BrowserWindow({
  //   width: 400,
  //   height: 300,
  //   webPreferences: {
  //     nodeIntegration: true,
  //   },
  //   parent: mainWindow
  // })
  // secondWindow.loadFile('second.html')
  console.log('running')
  ipcMain.on('message',(event, msg) => {
    console.log(msg)
    event.reply('reply','hello from main')
  })
})