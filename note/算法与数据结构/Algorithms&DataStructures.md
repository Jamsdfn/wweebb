# 算法题

## instanceof

手写类似instanceof的函数

```js
// 手写类似instanceof的方法

// instanceof 实现
// A instanceof B 左边是对象右边是数组
var instance = (left, right) => {
    left = left.__proto__
    right = right.prototype
    while(1) {
        if (left == null) return false
        if (left === right) return true
        left = left.__proto__
    }
}
```

## LUR

最近最少使用原则，就是一个数组，固定大小，往头部新增，尾部删除形成一个类似于队列的结构，如果调用某一个元素，若存在那么此元素变成头部第一个

```js
function LRUCache(limit) {
    this.limit = limit || 10 // 默认值是10个
    var store = [] // 存放元素的容器
    this.cache = store
    var index = {} // 存放目标key的下标，因为这也是通过keyValue来获取元素的,{a:0,b:1}
    this.get = (key) => {
        var i = index[key] // 获得元素的下标
        if (store[i] == null) return null
        var newArr = store.splice(0,i+1) // newArr为从0到要获取元素 就store为剩下的元素
        var res = newArr.pop() // 取得命中元素
        store = newArr.concat(store) // 拼接两段
        store.unshift(res) // 把刚刚调用的命中元素给
        // 修改索引位置
        for (var ikey in index) {
            var oldKeyIndex = index[ikey] // 这力的j是key对应的下标位置
            if (oldKeyIndex == i) {
                index[ikey] = 0 // 把命中目标的索引变成0
            }else if (oldKeyIndex < i) {
                index[ikey] = ++oldKeyIndex //把命中目标前的元素的索引加1，其余不变
            }
        }
        return res
    }
    this.set = (key,value) => {
        if (store.length > limit){ 
            store.pop() // 去掉元素
             // 去掉被铲除元素的key
            for (var ikey in index) {
                if (index[ikey] == limit) index[ikey] = undefined 
            }
        }
        for (var ikey in index) {
            index[ikey] = ++index[ikey] // 头部加入，所以索引全部加一
        }
        store.unshift(value)
        index[key] = 0
    }
    this.list = () => {console.log(this.cache)}
}
```

## 排序

### 冒泡排序 O(n²)

```js
const sort = (array) => {
    let arr = array.concat()
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length-i-1; j++) {
            if (arr[j] < arr[j+1]) { // 降序
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr
}
```

### 快速排序 O(nlogn)

```js
const quickSort = (array) => {
    const subSort = (arr, left = 0, right = array.length - 1) => {
        if (left >= right) {
            return
        }
        let i = left
        let j = right
        let baseVal = arr[j]
        while (i<j) { 
            // 因为arr[i]是左边开始的，左边开始的大于基数就换到右边去，所以是升序
            while (i<j && arr[i] <= baseVal) {
                i++
            }
            arr[j] = arr[i]
            while (j>i && arr[j] >= baseVal) {
                j--
            }
            arr[i] = arr[j]
        }
        arr[j] = baseVal
        subSort(arr, left, j-1)
        subSort(arr, j+1 , right)
    }
    let arr = array.concat()// 防止改变原函数的索引
    subSort(arr)
    return arr
}
```

### 选择排序 O(n²)

```js
const sort = (array) => {
    let arr = array.concat()
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] > arr[i]) { // 大的就放在第一位
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}
```

