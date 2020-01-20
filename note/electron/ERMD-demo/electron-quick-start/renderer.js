const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#node-version').innerHTML = process.versions.node
    document.querySelector('#send').addEventListener('click', () => {
        ipcRenderer.send('message', 'hello from renderer')
    })
    ipcRenderer.on('reply', (event, msg) => {
        document.querySelector('#msg').innerHTML = msg
    })
})


