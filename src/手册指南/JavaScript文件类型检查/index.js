// javascript文件类型检查主要针对的是.js文件
// 用途是在.js文件中对变量和函数等进行类型约束
// 主要用到的特性是typescript中的JSDoc模式
// 感觉用处不大
/** @type {number} */
let x ;
x = 0 // OK
x = false // Error: boolean is not assignable to number
// ...
