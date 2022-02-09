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
// this参数是个假的参数，它出现在参数列表的最前面
interface thiscanshu1 {
    prop1: string
    prop2: number
}

interface thiscanshu2 {
    prop1: string[]
    prop2: number[]

    f1(this: thiscanshu2): () => thiscanshu1 // 在这里声明this类型为thiscanshu2
}

let thiscanshuInstance: thiscanshu2 = {
    prop1: ['1', '2'],
    prop2: [1, 2],
    f1() {
        return () => {
            return {
                prop1: this.prop1[0], // 在这里使用this时，会自动识别到thiscanshu2
                prop2: this.prop2[0] // 在这里使用this时，会自动识别到thiscanshu2
            }
        }
    }
}

// 重载
// 函数重载只是为了校验参数的类型
function chongzai(x: { suit: string, card: number }[]): number // 声明重载，但没有方法体
function chongzai(x: number): { suit: string, card: number } // 声明重载，但没有方法体
function chongzai(x):any{ // 声明函数，包含具体方法体。声明的参数不能写参数类型，返回值要为any
    if (typeof x == 'object') {
        return 1
    } else if (typeof x == 'number') {
        return {suit: '1', card: 1}
    }
}


