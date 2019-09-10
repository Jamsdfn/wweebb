const lis=document.querySelectorAll("#footer li");

Array.from(lis,ele=>{
	ele.onmouseover=()=>ele.style.background='green';
	ele.onmouseout=()=>ele.style.background='none';
});