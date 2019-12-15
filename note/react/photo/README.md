# Photo Gallery

- 有很多图
- 下面的按钮对应上面的图
- 每个按钮允许点两次，第一次正面在最中间出现，第二次是背面
- 每张图随机角度散落在屏幕中（0-360deg）
- 允许出去自己的一半
    + 窗口宽度 window.innerWidth
    + 图片宽度一半 170px
    + 同理高度


## 组件

<PicTab/>

## 数据

```jsx
PicJson={
    picUrl: [],// 图片地址
    text: [],// 正面文字
    bText: []// 背面文字
}
```

