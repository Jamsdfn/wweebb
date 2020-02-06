const { remote,ipcRenderer } = require('electron')
const Store = require('electron-store')

const settingsStore = new Store({ name: 'Settings' })
const settingsConfig = ['#saved-file-location', '#accessId', '#accessKey', '#bucket', '#region']

const $ = (selector) => {
  const result = document.querySelectorAll(selector)
  return result.length > 1 ? result : result[0]
}

document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('saveFileLocation')
  if (savedLocation) {
    $('#saved-file-location').value = savedLocation
  }

  settingsConfig.forEach(selector => {
    const savedValue = settingsStore.get(selector.substr(1))
    if (savedValue) {
      $(selector).value = savedValue
    }
  })

  $('#select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      title: '选择文件的存储路径'
    })
      .then((obj) => {
        if (Array.isArray(obj.filePaths)) {
          $('#saved-file-location').value = obj.filePaths[0]
          savedLocation = obj.filePaths[0]
        }
      })
  })
  $('#settings-form').addEventListener('click', (e) => {
    e.preventDefault()
    settingsConfig.forEach(selector => {
      if ($(selector)) {
        let {id, value} = $(selector)
        if (id === 'saved-file-location') {
          settingsStore.set('saveFileLocation', savedLocation)
        } else {
          settingsStore.set(id, value ? value : '')
        }
      }
    })
    // 给主窗口发消息，让菜单项动态改变
    ipcRenderer.send('config-is-saved')
    remote.getCurrentWindow().close()
  })
  $('.nav-tabs').addEventListener('click', (e) => {
    e.preventDefault()
    $('.nav-link').forEach(element => {
      element.classList.remove('active')
    })
    e.target.classList.add('active')
    $('.config-area').forEach(element => {
      element.style.display = 'none'
    })
    $(e.target.dataset.tab).style.display = 'block'
  })
})