// 数组
let arr: number [] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
let arr3: any[] = [1, '2', false]

// 元组
let tuple: [number, number] = [1, 2]

// 枚举
enum Color {Red, Blue, Green = 'Green'}

let enum1: Color = Color.Blue
let enum2: number = Color.Red
let enum3: string = Color.Green

// Any
let any1: any = 1
any1 = '1'
any1 = false

// Void
// void变量只能赋值undefined或null
function void1(): void {
    console.log('nothing return')
}

let void2: void = undefined
let void3: void = null

// Null和Undefined
// 默认情况下null和undefined是所有类型的子类型
let undefined1: string = undefined
let undefined2: number = undefined
let undefined3: boolean = undefined

// Never
// 主要用于函数
// never类型是任何类型的子类型，也可以赋值给任何类型
function never1(): never {
    while (true) {
    }
}

let never2: number = never1()

// 类型断言
// 当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
let assert1: any = 'some string'
let assert2: number = (<string>assert1).length
let assert3: number = (assert1 as string).length



