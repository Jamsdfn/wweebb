import '../css/index.css';
import '../less/less.less';

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

//ES6
const map=new Map();
map.set('name','kaivon');
console.log(map);

const strArr=Array.from('kaivon');
console.log(strArr);

function* bear(){
	console.log('熊大');
	console.log('熊二');
}
bear().next();

//jsx
ReactDOM.render(
	<h2>这是JSX的语法</h2>,
	document.getElementById('box')
)
