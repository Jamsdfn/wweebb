const lis = document.querySelectorAll('#footer li')

Array.from(lis, ele => {
    ele.onmouseover = () => ele.style.background = 'red'
    ele.onmouseout = () => ele.style.background = 'none'
})
