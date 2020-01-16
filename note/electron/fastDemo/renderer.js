// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const ipc = require('electron').ipcRenderer
const fs = require('fs')

function winClose() {
    ipc.send('window-close')
}

function getProcessInfo() {
    console.log('cpu', process.getCPUUsage())
    // console.log('env',process.env)
    console.log('arc', process.arch)
}

const dragwrapper = document.querySelector('#holder')
// console.log(dragwrapper)
dragwrapper.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
        const path = files[0].path
        // console.log('path:' + path)
        console.log(fs.readFileSync(path).toString())
    }
})
dragwrapper.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.stopPropagation()
})
// webview
// const wb = document.querySelector('#wb')
// const loading = document.querySelector('#loading')
// const loadstart = () => {
//     loading.innerText = 'loading...'
// }
//
// const loadstop = () => {
//     loading.innerText = ''
//     wb.insertCSS(`
//         input {
//             background: #ccc !important;
//         }
//     `)
//     wb.executeJavaScript(`
//         // alert('executeJavaScript')
//         console.log('111')
//     `)
//     // wb.openDevTools()
// }
//
// wb.addEventListener('did-start-loading', loadstart)
// wb.addEventListener('did-stop-loading', loadstop)

let subwin
function openNewWindow() {
    subwin = window.open('./popup_page.html', 'popup', 'nodeIntegration=no')

}

function deleteNewWindow() {
    subwin.close()
}

window.addEventListener('message', (msg) => {
    console.log('接收到的消息：' , msg)
})

