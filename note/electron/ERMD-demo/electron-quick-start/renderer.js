const { ipcRenderer,remote  } = require('electron')
const { Menu, MenuItem } = remote
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#node-version').innerHTML = process.versions.node
    document.querySelector('#send').addEventListener('click', () => {
        ipcRenderer.send('message', 'hello from renderer')
    })
    ipcRenderer.on('reply', (event, msg) => {
        document.querySelector('#msg').innerHTML = msg
    })

      
      const menu = new Menu()
      menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
      menu.append(new MenuItem({ type: 'separator' }))
      menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))
      const menuBtn = document.querySelector('.menu')
      menuBtn.addEventListener('click', (e) => {
        menu.popup({ 
            window: remote.getCurrentWindow(),
            x: e.clientX,
            y: menuBtn.offsetHeight+menuBtn.offsetTop
        })
      }, false)
})


