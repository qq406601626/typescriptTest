// 鸭式辨型法
let yashibianxingfa1 = function (prop: { label: string }) {
    console.log(prop.label)
}
let yashibianxingfaProp1 = {size: 10, label: 'label'}
yashibianxingfa1(yashibianxingfaProp1)

// >>>改用接口
interface Label {
    label: string
}

let yashibianxingfa2 = function (prop: Label) {
    console.log(prop.label)
}
let yashibianxingfaProp2 = {size: 10, label: 'label'}
yashibianxingfa2(yashibianxingfaProp2)

// 可选属性
interface interface1 {
    color?: string
    width?: number
}

let kexuanshuxing1 = function (prop: interface1): { color: string, width: number } {
    let returnValue = {color: 'red', width: 10}
    return returnValue
}

// 只读属性
// readonly vs const
// 做为变量使用的话用 const，若做为属性则使用readonly。
interface Readonly1 {
    readonly x: number
    readonly y: number
    z: number
}

let readonlyP1: Readonly1 = {x: 5, y: 6, z: 8}
// readonlyP1.x = 55 // error
readonlyP1.z = 88

// 只读数组
let readonlyArr: ReadonlyArray<number> = [1, 2, 3, 4, 5] // 没有了操作数组的方法
// readonlyArr[0]=11 // error
// let readonlyArr2:number[] = readonlyArr // error:把整个ReadonlyArray赋值到一个普通数组也是不可以的
let readonlyArr2: number[] = <number[]>readonlyArr

// 额外的属性检查
// 当将对象字面量赋值给变量或作为参数传递的时候会被特殊对待而且会经过额外属性检查
interface erwaishuxingjiancha1 {
    color: string,
    width: number
}

let erwaishuxingjiancha2 = function (prop: erwaishuxingjiancha1) {
    console.log(prop.color)
}
// erwaishuxingjiancha2({color:'red',width:3,x:1}) // error：作为对象字面量传递
// 解决1:创建变量
let erwaishuxingjianchaProp1 = {color: 'red', width: 3, x: 1}
erwaishuxingjiancha2(erwaishuxingjianchaProp1)
// 解决2:类型断言
erwaishuxingjiancha2(<erwaishuxingjiancha1>{color: 'red', width: 3, x: 1})

// 解决3：索引签名
interface erwaishuxingjiancha3 {
    color: string,
    width: number,

    [prop: number]: number

    [prop: string]: any // erwaishuxingjiancha2可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓string类型的key的类型是什么
    [prop: symbol]: any // erwaishuxingjiancha2可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓symbol类型的key的类型是什么
}

let erwaishuxingjiancha4 = function (prop: erwaishuxingjiancha3) {
    console.log(prop.color)
}
erwaishuxingjiancha4({color: 'red', width: 3, x: 1})
// 函数类型
// 接口除了描述带有属性的普通对象外，接口也可以描述函数类型。
// 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
interface hanshuleixing1 {
    (prop1: string, prop2: number): boolean
}

let hanshuleixing2: hanshuleixing1 = function (prop1, prop2) {
    return true
}

// 可索引的类型
// TypeScript支持两种索引签名：字符串和数字。
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
// 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象
interface kesuoyinleixing {
    [prop: number]: string
}

let kesuoyinleixingArr1: kesuoyinleixing = ['1', '2'] // 数组也可以使用索引接口

class Animal {
    name: string;
}

class Dog extends Animal {
    breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
    // error:
    // [x: number]: Animal;
    // [x: string]: Dog;
    // right:
    [x: number]: Dog,

    [x: string]: Animal
}

// 只读索引
interface readonlykesuoyin {
    readonly [prop: number]: string
}

let readonlykesuoyinarr: readonlykesuoyin = ['1', '2']
// readonlykesuoyinarr[0] = '111' // error
// readonlykesuoyinarr[10] = '1010' // error

// 类类型
// 实现接口，与C#或Java里接口的基本作用一样
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
interface leileixingInterface1 {
    prop1: Date

    setTime(prop1: Date): boolean
}

class leileixingIngterface2 implements leileixingInterface1 {
    prop1: Date = new Date()

    constructor(h: number, m: number) {

    }

    setTime(prop) {
        return true
    }
}

// 类静态部分与实例部分的区别
// 当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。
// 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：
// interface ClockConstructor {
//     new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
    // currentTime: Date;
    // constructor(h: number, m: number) { } // error
// }
// 这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。
// constructor存在于类的静态部分，所以不在检查的范围内。
// 解决：
interface jiekoushengminggouzaoqi{
    new(prop1:string,prop2:number,prop3:boolean):jiekouInstance
}
interface jiekouInstance{
    f1():boolean
}
let yanzhenggouzaoqiAnddedaoinstance = function (constructor){

}
