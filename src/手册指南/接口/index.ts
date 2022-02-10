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
// ==>可以简写成
let hanshuleixing3: { (prop1: number): number } = function (prop1) {
    return prop1
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
interface jiekoushengminggouzaoqi {
    new(prop1: string, prop2: number, prop3: boolean): jiekouInstance // 声明构造器验证
}

interface jiekouInstance {
    f1(): boolean
}

let yanzhenggouzaoqiAnddedaoinstance = function (constructor: jiekoushengminggouzaoqi, prop1: string, prop2: number, prop3: boolean): jiekouInstance {
    return new constructor(prop1, prop2, prop3) // 在这里进行构造器的验证
}

class gouzaoqiyanzhengClass1 implements jiekouInstance {
    constructor(prop1: string, prop2: number, prop3: boolean) {
        console.log(prop1, prop2, prop3)
    }

    f1() {
        return true
    }
}

let gouzaoqiyanzhengInstance1 = yanzhenggouzaoqiAnddedaoinstance(gouzaoqiyanzhengClass1, '1', 1, true)

// 接口继承
// 和类一样，接口也可以相互继承
// 一个接口可以继承多个接口，创建出多个接口的合成接口。
interface jiekoujicheng1 {
    prop1: string
}

interface jiekoujicheng2 {
    prop2: string
}

interface jiekoujicheng3 extends jiekoujicheng1, jiekoujicheng2 { // 接口多继承
    prop3: number
}

class jiekoujichengLei implements jiekoujicheng3 {
    prop1: string // 需要实现三个属性
    prop2: string // 需要实现三个属性
    prop3: number // 需要实现三个属性

    constructor() {
    }
}

// 混合类型
interface hunheleixing1 {
    (prop1: string): string // 作为函数
    prop2: number

    f1(): void

}

function getHunheleixing1Instance(): hunheleixing1 {
    let hunheleixing1Instance = <hunheleixing1>function (prop1: string) {
    }; // 声明函数然后类型断言
    hunheleixing1Instance.prop2 = 1 // 对函数添加属性
    hunheleixing1Instance.f1 = function () {
    } // 对函数添加属性
    return hunheleixing1Instance
}

let hunheleixing1Instance = getHunheleixing1Instance()
hunheleixing1Instance('1') // 可以作为函数使用
console.log(hunheleixing1Instance.prop2) // 可以输出函数的属性
hunheleixing1Instance.f1() // 可以调用函数的函数属性

// 接口继承类
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
// 接口同样会继承到类的private和protected成员，这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
class jiekoujichenglei1 {
    private prop1: any
}

interface jiekoujichenglei2 extends jiekoujichenglei1 {
    // 继承类后，隐式声明了prop1的定义
    f1(): void
}

class jiekoujichenglei3 extends jiekoujichenglei1 implements jiekoujichenglei2 {
    // 继承类后，继承了类的prop1属性，继而隐式实现了接口的prop1属性
    // jiekoujichenglei3是jiekoujichenglei1的子类，所以可以实现jiekoujichenglei2
    f1() {
    }
}

class jiekoujichenglei4 extends jiekoujichenglei1 { // 没有实现接口，所以不用声明任何方法

}

// @ts-ignore
class jiekoujichenglei5 implements jiekoujichenglei2 {
    // error : 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
    // jiekoujichenglei5不是jiekoujichenglei1的子类，所以不能实现jiekoujichenglei2接口
    f1() {
    }
}

// 接口重载
interface chongzai{
    utcOffset(): number;
    utcOffset(b: number|string): number;
}

