module.exports = (app, shell, ipcMain, settingsStore) =>{
  const cosIsConfig = ['accessId', 'accessKey', 'bucket', 'region'].every(key => settingsStore.get(key))
  let enableAutoSync = settingsStore.get('enableAutoSync')
  let template = [
    {
      label: '文件',
      submenu: [
        {
          label: '新建',
          accelerator: 'CmdOrCtrl+N',
          click: (menuItem, browserWindow, event) => {
            // 主进程向browserWindow这个参数所对应的渲染进程发信息
            browserWindow.webContents.send('create-new-file')
          }
        }, {
          label: '保存',
          accelerator: 'CmdOrCtrl+S',
          click: (menuItem, browserWindow, event) => {
            browserWindow.webContents.send('save-edit-file')
          }
        }, {
          label: '搜索',
          accelerator: 'CmdOrCtrl+F',
          click: (menuItem, browserWindow, event) => {
            browserWindow.webContents.send('search-file')
          }
        }, {
          label: '导入',
          accelerator: 'CmdOrCtrl+O',
          click: (menuItem, browserWindow, event) => {
            browserWindow.webContents.send('import-file')
          }
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        {
          label: '撤销',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        }, {
          label: '重做',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        }, {
          type: 'separator'
        }, {
          label: '剪切',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        }, {
          label: '复制',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        }, {
          label: '黏贴',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        }, {
          label: '全选',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: '云同步',
      submenu: [
        {
          label: '设置',
          accelerator: 'Command+,',
          click: () => {
            ipcMain.emit('open-setting-window')
          }
        }, {
          label: '自动同步',
          type: 'checkbox',
          enabled: cosIsConfig,
          checked: enableAutoSync,
          click: () => {
            settingsStore.set('enableAutoSync', !enableAutoSync)
          }
        }, {
          label: '全部同步至云端',
          enabled: cosIsConfig,
          click: () => {
            ipcMain.emit('upload-all-to-cos')
          }
        }, {
          label: '从云端下载至本地',
          enabled: cosIsConfig,
          click: () => {
            ipcMain.emit('download-all-to-local')
          }
        }
      ]
    },
    {
      label: '视图',
      submenu: [
        {
          label: '刷新当前页面',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow)
              focusedWindow.reload();
          }
        }, {
          label: '切换全屏模式',
          accelerator: (() => {
            if (process.platform === 'darwin')
              return 'Ctrl+Command+F';
            else
              return 'F11';
          })(),
          click: (item, focusedWindow) => {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        }, {
          label: '切换开发者模式',
          accelerator: (() => {
            if (process.platform === 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click: (item, focusedWindow) => {
            if (focusedWindow)
              focusedWindow.toggleDevTools();
          }
        },
      ]
    },
    {
      label: '窗口',
      role: 'window',
      submenu: [
        {
          label: '最小化',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        }, {
          label: '关闭',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    }, {
      label: '帮助',
      role: 'help',
      submenu: [
        {
          label: '学习更多',
          click: () => {
            // 用默认浏览器打开网址
            shell.openExternal('https://www.electronjs.org/')
          }
        }
      ]
    }
  ]
  
  if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          label: `关于 ${ name }`,
          role: 'about'
        }, {
          type: 'separator'
        }, {
          label: '设置',
          accelerator: 'Command+,',
          click: () => {
            ipcMain.emit('open-setting-window')
          }
        }, {
          label: '服务',
          role: 'services',
          submenu: []
        }, {
          label: `隐藏 ${ name }`,
          accelerator: 'Command+H',
          role: 'hideothers'
        }, {
          label: '显示全部',
          role: 'unhide'
        }, {
          type: 'separator'
        }, {
          label: '退出',
          accelerator: 'Command+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    })
    const windowMenu = template.find(function (m) { return m.role === 'window' })
    if (windowMenu) {
      windowMenu.submenu.push(
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          role: 'front'
        }
      );
    }
  }
  return template
}

