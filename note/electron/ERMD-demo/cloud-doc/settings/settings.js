const { remote } = require('electron')
const Store = require('electron-store')

const settingsStore = new Store({name: 'Settings'})

const $ = (id) => {
  return document.getElementById(id)
}

document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('saveFileLocation')
  if (savedLocation) {
    $('saved-file-location').value = savedLocation
  }
  $('select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      title: '选择文件的存储路径'
    })
    .then((obj) => {
      if (Array.isArray(obj.filePaths)) {
        $('saved-file-location').value = obj.filePaths[0]
        savedLocation = obj.filePaths[0]
      }
    })
  })
  $('settings-form').addEventListener('click', () => {
    settingsStore.set('saveFileLocation', savedLocation)
    remote.getCurrentWindow().close()
  })
})