# MarkDown-Demo

## React Hooks

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。即让react更适合函数式编程。

### State Hooks

- useState 

  - useState 的传的参是的要赋的值，返回的是一个数组，第一项是当前的 state，第二项是更新state的函数
  - 我们可以用解构赋值的方法赋值，第一项的参数名就是对此state的命名，第二项参数名就是更新state的函数命一个新的函数名

  ```jsx
  const LikeButton = () => {
      // useState 的参是的要赋的值，解构的第一项是当前的state 第二项是更新state的函数,第一项的参数名就是对此state的命名
      const [like, setLike] = useState(0)
      const [flag, setFlag] = useState(true)
      // const [obj, setObj] = useState({
      //     like: 0,
      //     flag: true
      // })
      function addLike() {
          setLike(like + 1)
          // setobj({
          //     like: obj.like,
          //     flag: !obj.flag
          // })
      }
      function swichFlag() {
          setFlag(!flag)
      }
      return (
          <div>
              <button onClick={addLike}>
                  {like}赞
              </button>
              <button onClick={swichFlag}>
                  {flag ? 'ON' : 'OFF'}
              </button>
          </div>
      )
  }
  ```

  **注：**如果state是一个obj的话，在更新state时候，不能像class那样只更新需要更新的那样，这样会导致为更新的所有属性丢失。因此如果state是obj的话更新时不变的值也要加上。所以用到state hook的话通常我们都是分开写state的

### Effect Hook

- ###### 无需清除的 Effect

  ​		初始化和每次更新都会执行 useEffect 函数

  ​		同理于当我们想要在每次render之后执行时在class组件中需要在commponentDidMount和componentDidUpdate中都调用事件。就比如网页有个初始标题，点击某一个标题后网页标题会改变

  ```jsx
  const LikeButton = () => {
      const [like, setLike] = useState(0)
  
      useEffect(() => {
          document.title = `点击了 ${like} 次`
      })
  
      function addLike() {
          setLike(like + 1)
      }
      return (
          <div>
              <button onClick={addLike}>
                  {like}赞
              </button>
          </div>
      )
  }
  ```

- 需要清除的 Effect

  ​	比如订阅外部数据源、清除DOM事件、清除timeinterval。这种情况清除工作是非常重要的，可以防止引起内存泄漏！

  ​	相当于 componentDidMount() 添加一个事件，componentWillUnmount() 后清除事件

  ​	使用 useEffect 完成一个数遍追踪器

  ```jsx
  const MouseTracker = () => {
      const [positions, setPositions] = useState({x: 0, y: 0})
  
      useEffect(() => {
          // 这样会有问题，因为每次点击都注册了一次事件，同一个事件注册了很多次
          // document.addEventListener('click', (e) => {
          //     setPositions({x: e.clientX, y: e.clientY})
          // })
          const updateMouse = (e) => {
              console.log('click')
              setPositions({x: e.clientX, y: e.clientY})
          }
          console.log('add listener')
          document.addEventListener('click', updateMouse)
          return () => {
              console.log('remove listener')
              document.removeEventListener('click', updateMouse)
          }
      })
  
      return (
      <p>X: {positions.x}, Y: {positions.y}</p>
      )
  }
  ```
  
- 控制 useEffect 的执行
  
​	useEffect 第二个参数可以是个数组（可选），当数组内元素发生变化时则会再执行一遍回调函数，如果我们加上第二个参数且不改变其数组元素则组件只会在渲染是执行一次
  
```jsx
  const DogShow = () => {
    const [url, setUrl] = useState('')
      const [loading, setLoading] = useState(false)
    const [fetch, setFetch] = useState(false)
  
      const style = {
          width:200
      }
  
      useEffect(() => {
          setLoading(true)
          axios.get('https://dog.ceo/api/breeds/image/random')
              .then(result => {
                  console.log(result)
                  setUrl(result.data.message)
                  setLoading(false)
              })
      },[fetch])
      return (
          <div>
              {loading ? <p>🐕读取中。。。</p> : <img src={url} alt="dog" style={style} />}
              <br/>
              <button onClick={() => {setFetch(!fetch)}}>再来一张</button>
          </div>
         
      )
  }
  ```
  
  **注：**第二个参数是可选参数，如果不使用则当state改变时都会触发

### 自定义 Hook

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。（命名规定要以use开头）

- 将组件逻辑提取到可重用的函数中

  使用自定义 Hook 抽象鼠标追踪器

  ```js
  import React, {useState,useEffect} from 'react'
  
  const useMousePosition = () => {
      const [positions, setPositions] = useState({x: 0, y: 0})
      useEffect(() => {
          const updateMouse = (e) => {
              setPositions({x: e.clientX, y: e.clientY})
          }
          document.addEventListener('mousemove', updateMouse)
          return () => {
              document.removeEventListener('mousemove', updateMouse)
          }
      })
      return positions
  }
  
  export default useMousePosition
  ```

  使用：(因为export的是个函数，导入后直接调用就可以使用了)

  ```jsx
  import React from 'react';
  
  import useMousePositon from './hooks/useMousePosition'
  
  function App() {
    const positons = useMousePositon()
    return (
      <div className="App">
        <header className="App-header">
          <p>X: {positons.x}, Y: {positons.y}</p>
        </header>
      </div>
    );
  }
  ```

#### HOC

高阶组件（Higher order component）**一个函数返回一个React组件**，指的就是一个React组包裹着另一个React组件。新的组件就包含的另一个组件的功能和数据

有两种类型的HOC：

1. Props Proxy（pp） HOC对被包裹组件`WrappedComponent`的props进行操作。
2. Inherbitance Inversion（ii）HOC继承被包裹组件`WrappedComponent`。

> 想仔细了解可以查看 https://segmentfault.com/a/1190000012232867

因为HOOK也可以做到HOC做的事

```jsx
// hook 
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useURLLoader = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(url)
            .then(result => {
                setData(result.data)
                setLoading(false)
            })
    },[url])
    return [data, loading]
}

export default useURLLoader
// component
import useURLLoader from './hooks/useURLLoader'
const CatShowWithHook = () => {
  const [category, setCategory] = useState('1')
  const [data, loading] = useURLLoader(`https://api.thecatapi.com/v1/images/search?category_ids=${category}`)
  return (
    <div>
      {loading ? <p>🐱读取中。。。</p> : <img src={data && data[0].url} alt="cat" style={{ width: 200 }} />}
      <br />
      <button onClick={() => { setCategory('1') }}>🧢</button>
      <button onClick={() => { setCategory('4') }}>🕶</button>
    </div>
  )
}
export default CatShowWithHook
```

### HOOK规则

- 只在最顶层使用 Hook
- 只在 React 函数中调用 Hook

**其他Hook**

> https://zh-hans.reactjs.org/docs/hooks-reference.html

