import React, { useState } from 'react';

import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import DogShow from './components/DogShow'

import useMousePositon from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'

import logo from './logo.svg';
import './App.css';

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

const DogShowWithHook = () => {
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random')
  return (
    <div>
      {loading ? <p>🐕读取中。。。</p> : <img src={data && data.message} alt="dog" style={{ width: 200 }} />}
      <br />
    </div>
  )
}

function App() {
  const positons = useMousePositon()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>X: {positons.x}, Y: {positons.y}</p>
        <CatShowWithHook />
        <LikeButton />
      </header>
    </div>
  );
}

export default App;
