console.log('这是第一个入口文件');

import '../css/index.css';

import img1 from '../images/img_01.jpg';
import img2 from '../images/img_02.jpg';

const loadImg=img=>{
	const newImg=new Image();
	newImg.onload=()=>document.body.appendChild(newImg);
	newImg.src=img;
};
loadImg(img1);
loadImg(img2);

