// 书写完整函数类型
let f1: (prop1: number, prop2: number) => number = function (prop1, prop2) {
    return prop1 + prop2
}
let f2: (prop1: number, prop2: number) => number = (prop1, prop2) => {
    return prop1 + prop2
}
// 推断类型
// let f3 = (prop1: number, prop2: number): number => {
//     return prop1 + prop2
// }
function f3(prop1: number, prop2: number): number {
    return prop1 + prop2
}

// let f4:f3 = function (prop1,prop2){ // error : 不能把声明的函数作为类型
//     return prop1+prop2
// }

// 可选参数
// 在参数名旁使用 ?实现可选参数的功能
function kexuancanshu(prop1: number, prop2?: string) { // prop2为可选参数

}

kexuancanshu(1)
kexuancanshu(1, '2')
// kexuancanshu(1,'2',3) // error

// 剩余参数
function buildName(firstName: string, ...restOfName: string[]) {

}

buildName('1', '2')
// buildName('1',2) // error : restOfName为字符串数组

// this参数
interface thiscanshu1 {
    prop1: string
    prop2: number
}

interface thiscanshu2 {
    prop1: string[]
    prop2: number[]

    f1(): (prop1: number) => thiscanshu1
}


