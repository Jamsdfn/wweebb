const {remote} = require('electron')

const {Menu, MenuItem} = remote

function openMenu() {
    const template = [
        // json 格式设置菜单项
        {label:'Exit',role:'quit'},
        {label: '第一个菜单项目', submenu: [
            {label: 'redo',role:'redo',accelerator:'CommandOrControl+E'},
            {label: '子菜单2111111111111111',role:'undo',accelerator:'CommandOrControl+Q'}
        ]},
        {label: '点击测试', click: () => {
            console.log('点击事件触发了')
        }},
        {label: '重写', role:'redo'},
        {label: '撤销', role:'undo'},
        {label: '旅游', type: 'checkbox', checked: true},
        {label: '吃', type: 'checkbox', checked: true},
        {label: '逛街', type: 'checkbox', checked: false},
        // new MenuItem格式设置菜单 option和json格式的菜单是一样的
        new MenuItem({label: '这是MenuItem生成的菜单', click: () => {
            console.log('这是MenuItem生成的菜单')
        }})
    ]
    const menu = Menu.buildFromTemplate(template)
    // 下面的方法就是把应用程序顶头的菜单栏也改了，不加这句就可以不改的
    // 注意 菜单的快捷键只有加了下面那句话，也就是变成了顶头的菜单栏才会生效
    Menu.setApplicationMenu(menu)
    menu.popup()
}
document.querySelector('html').onmousedown = function (e) {
    if (e.button === 2) {
        openMenu()
    }
}
