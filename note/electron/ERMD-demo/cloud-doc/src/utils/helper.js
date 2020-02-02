// 把数组转为伪数组
export const flattenArr = (arr) => {
  return arr.reduce((map,item) => {
    map[item.id] = item
    return map
  },{})
}
// reduce 累加器
// 初项为一个空obj 没迭代一次，这个map都会增加一项
/* 
1 { arr[0].id:arr[0] }
2 {
    arr[0].id: arr[0],
    arr[1].id: arr[1]
  }
           .
           .
           .
*/

// 把伪数组转为数组
export const objToArr = (obj) => {
  return Object.keys(obj).map(key => obj[key])
}