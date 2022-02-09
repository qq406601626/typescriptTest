function fanxing1(arg: number): number { // 传入参数类型和返回类型一致时，可以使用泛型
    return arg
}

function fanxing2(arg: any): any {
    // 本来需求是形参类型和返回类型一致，但是这样的话会存在形参为number返回值为Date的情况。与需求不符
    return new Date()
}

// ==>使用泛型改造
function fanxing3<T>(arg: T): T {
    return arg
}

// ==>使用泛型①：传入所有的参数，包含类型参数
fanxing3<number>(1)
// ==>使用泛型②：利用了类型推论，即编译器会根据传入的参数自动地帮助我们确定T的类型
fanxing3('1')

// 使用泛型变量(泛型变量指的是ca形参)
function funxingbianliang1<T>(arg: T): T {
    // console.log(arg.length) // error：T可以是任何类型，当为number时不存在length属性
    // 可以参照下方的泛型约束写法
    return arg
}

function funxingbianliang2<T>(arg: T[]): T[] {
    console.log(arg.length) // 这时可以使用.length属性
    return arg
}

// ==>或者写成
function funxingbianliang3<T>(arg: Array<T>): Array<T> {
    console.log(arg.length) // 这时可以使用.length属性
    return arg
}

// ==>或者写成
let funxingbianliang4: { <T>(prop1: T): T } = function (prop1) {
    return prop1
}

// 泛型接口
interface fanxingjiekou1 {
    <T>(prop1: T): T
}

let fanxingjiekouhanshu: fanxingjiekou1 = function (pro1) {
    return pro1
}
// 整体泛型接口
// 在使用整体泛型接口的时候，要传入泛型的类型
interface fanxingjiekou2<T> { // 给接口声明泛型类型。注意该接口是混合类型接口
    (prop1: T): T

    f1(): T

    f2: () => T
}

let getFanxingjiekou2Instance = function (): fanxingjiekou2<number> {
    let f = <fanxingjiekou2<number>>function (prop1) {
        return prop1
    }
    f.f1 = function () {
        return 1
    }
    f.f2 = function () {
        return 1
    }
    return f
}
let fanxingjiekou2Instance: fanxingjiekou2<number> = getFanxingjiekou2Instance() // 在使用整体泛型接口的时候，要传入泛型的类型，这里为number

// 泛型类
class fanxinglei<T> {
    prop1: T

    add: (arg: T) => T // 作为变量

    add2(arg: T): T { // 作为方法
        return arg
    }
}

let fanxingleiInstance = new fanxinglei<number>()
fanxingleiInstance.prop1 = 1
// fanxingleiInstance.prop1 = '1' // error : 应为number
fanxingleiInstance.add = function (arg) {
    return arg
}
fanxingleiInstance.add2(1)

// 泛型约束
interface fanxingyueshu1 {
    length: number
}

function fanxingyueshu2<T extends fanxingyueshu1>(arg: T): T { // 泛型T继承了fanxingyueshu1接口
    console.log(arg.length) // 所以，这里可以调用.length属性
    return arg
}

// fanxingyueshu2(3) // error : 参数没有.length属性
fanxingyueshu2([])
fanxingyueshu2('1') // 字符串有.length属性
fanxingyueshu2({length: 1})

// 在泛型里使用类类型
function fanxingshiyongleileixing1<T>(constructor: { new(): T }): T {
    // 注意声明constructor的写法
    return new constructor()
}

function fanxingshiyongleileixing2<T>(constructor: new () => T): T {
    // 注意声明constructor的写法
    return new constructor()
}

// 高级例子
class Animal {
    prop1: number
}

class ZooKeeper {
    prop2: string
}

class BeeKeeper {
    prop3: boolean
}

class Bee extends Animal {
    keeper: BeeKeeper
}

class Lion extends Animal {
    keeper: ZooKeeper
}
function createInstance<A extends Animal>(c:new ()=>A):A{
    return  new c()
}
createInstance<Bee>(Bee) // 显示传入泛型类型
createInstance(Lion) // 隐式传入泛型类型
