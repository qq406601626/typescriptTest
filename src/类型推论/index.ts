// 基础
// 在有些没有明确指出类型的地方，类型推论会帮助提供类型
let jichu1 = 3 // ==> let jichu1:number = 3
// jichu1 = '3' // error : jichu1 为 number

let jichu2: number | string
jichu2 = 1
jichu2 = '1'
// jichu2 = true // error

