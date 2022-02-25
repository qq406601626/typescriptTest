// 交叉类型
// Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable
function jiaochaleixing<T, U>(arg1: T, arg2: U): T & U {
    return <T & U>{}
}

// 联合类型
// number | string | boolean表示一个值可以是 number， string，或 boolean

function leixinglianhe(prop: number | string): number | string {
    return prop
}

let leixinglianheInstance = leixinglianhe('1');
// leixinglianheInstance.length // Error，程序不知道返回的是number还是string
(<string>leixinglianheInstance).length // OK，需要使用类型断言

// 用户自定义的类型保护
// 类型保护就是一些表达式
// if ((<Fish>pet).swim) {
//     (<Fish>pet).swim();
// }
// else {
//     (<Bird>pet).fly();
// }
// 这里可以注意到我们不得不多次使用类型断言
// 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：
function isNumber(arg1: number | string): arg1 is number {
    // arg1 is number就是类型谓词。 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。
    // 每当使用一些变量调用 isFish时，TypeScript会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。
    return typeof arg1 === 'number'
}

// 'swim' 和 'fly' 调用都没有问题了
// if (isFish(pet)) { // 意思就是说调用过isNumber函数后，如果返回true，系统就记住了类型谓词的值。
//     pet.swim();
// }
// else {
//     pet.fly();
// }
// 注意TypeScript不仅知道在 if分支里 pet是 Fish类型； 它还清楚在 else分支里，一定 不是 Fish类型，一定是 Bird类型。

// typeof类型保护

// 类型里去除了 null和 undefined
function fixed(name: string | null): string {
    function postfix(epithet: string) {
        return name!.charAt(0) + '.  the ' + epithet; // ok 。这是使用!来确认属性不为null和undefined
    }

    name = name || "Bob"; // 在这里对name进行了null和undefined的排除
    return postfix("great");
}

// 类型别名
// 类型别名会给一个类型起个新名字。
// 起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。
type leixingbieming = string
type leixingbieming2 = () => leixingbieming
type leixingbieming3 = leixingbieming | leixingbieming2
type leixingbieming4<T> = { value: T } // 创建一个泛型类型别名
type leixingbieming5<T> = { value: T, value2: leixingbieming5<T> } // 类型别名来在属性里引用自己
// 类型别名不能出现在声明右侧的任何地方(除非是泛型类型。因为泛型类型可以理解成模板函数，而普通类型就是一个变量)
type Yikes = Array<Yikes>; // error

// 接口 vs. 类型别名
// 类型别名可以像接口一样；然而，仍有一些细微差别：
// 1、接口创建了一个新的名字，可以在其它任何地方使用。类型别名并不创建新名字。
// 2、类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）
// 3、如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名


// 字符串字面量类型
// 字符串字面量类型允许你指定字符串必须的固定值
// 通过结合联合类型，你可以实现类似枚举类型的字符串
type zifuchuanzimianliangleixing = "ease-in" | "ease-out" | "ease-in-out";
let zifuchuanzimianliangleixing: zifuchuanzimianliangleixing = 'ease-in' // ok
// let zifuchuanzimianliangleixing2:zifuchuanzimianliangleixing = '1' // Error
function createElement(tagName: "img"): HTMLImageElement // 区分函数重载
function createElement(tagName: "input"): HTMLInputElement // 区分函数重载
function createElement(tagName: string): any {
}

// 测试element-ui复杂类型
type ExtractPropTypes<T> = { // T:{ test: U } => { test: number }
    key: {
        type: T,
        required: true
    }
    // ==> key : {
    //  type : {
    //     test:number
    //  }
    // }
}
type ResolveProp<U> = ExtractPropTypes<{ test: U }>  // U : number
let prop: ResolveProp<number> = {key: {required: true, type: {test: 11}}}

// 可辨识联合
// 可辨识联合需要三个要素：
// 1、具有普通的单例类型属性— 可辨识的特征。
// 2、一个类型别名包含了那些类型的联合— 联合。
// 3、此属性上的类型保护。
// 也就是说每个但类型要有一个可以辨识的属性，且每个类型的其它属性不能存在相同的。
interface SquareA {
    kind: "square"; // 要素属性
    size: number;
}

interface RectangleB {
    kind: "rectangle"; // 要素属性
    width: number;
    height: number;
}

interface CircleC {
    kind: "circle"; // 要素属性
    radius: number;
}

type ShapeA = SquareA | RectangleB | RectangleB
let shapeInstance: ShapeA = {
    kind: 'rectangle', // 当输入kind为rectangle时，会自动推断为RectangleB类型
    width: 1,
    height: 1
}

// 索引类型
// 使用索引类型，编译器就能够检查使用了动态属性名的代码。
// 例如，一个常见的JavaScript模式是从对象中选取属性的子集：
// function pluck(o, names) {
//     return names.map(n => o[n]);
// }
// 下面是如何在TypeScript里使用此函数，通过 索引类型查询和 索引访问操作符：
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    // keyof T， 索引类型查询操作符。
    // 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。
    // keyof {name:string;age:number}; ==> 'name' | 'age' 。
    // keyof {name:string;age:number} 可与'name' | 'age'互相替换
    // K extend keyof T 表示 K 是 T 的子类型，这里是一个类型约束声明。
    // 比如 type T = "a" | "b" | "c";，那么 K 可以是 "a"，也可以是 "a" | "c" 或者 "a" | "b" | "c" 等
    return names.map(n => o[n])
}

interface suoyinleixing {
    name: string;
    age: number;
    gender: string;
    address: string,
    country: string
}

let person: suoyinleixing = {
    name: 'Jarid',
    age: 35,
    gender: 'man',
    address: 'china',
    country: 'beijing'
};
let suoyinResult: string[] = pluck(person, ['name', 'address', 'country']); // ok, string[]
// suoyinResult：[ 'Jarid', 'china', 'beijing' ]

// 索引类型和字符串索引签名
interface Map<T> {
    name: T,

    [key: number]: T;
}

let keys: keyof Map<number>; // string
let value: Map<number>[123]; // number; 这里的123可以'name'或任意数字，目的是获得对应属性的返回值的类型

// 映射类型
// 假如有一个接口，要把该接口所有变成readonly：
interface yingsheleixing {
    name: string;
    age: number
}

// 声明一个转换类型（类似于一个转换方法）
type yingsheleixingzhuanhuan<T> = {
    readonly [K in keyof T]: T[K]
}
// type yingsheleixingResult = yingsheleixingzhuanhuan<yingsheleixing>
// 或者简写成
type yingsheleixingResult = yingsheleixingzhuanhuan<{ name: string; age: number }>
let yingsheleixingInstance: yingsheleixingResult = {
    name: '111',
    age: 18
}
// yingsheleixingInstance.age = 20 // Error ：age 为readonly
// 最简单的映射类型和它的组成：
// 对于对象要使用keyof。对于联合类型只需要使用in即可，无需再加上keyof
type KeysAAA = 'option1' | 'option2';
type FlagsAAA = { [K in KeysAAA]: boolean }
let flagsAAAInstance: FlagsAAA = {
    option1: true,
    option2: false,
}

// 预定义的有条件类型
/*TypeScript 2.8在lib.d.ts里增加了一些预定义的有条件类型：
Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
Extract<T, U> -- 提取T中可以赋值给U的类型。
NonNullable<T> -- 从T中剔除null和undefined。
ReturnType<T> -- 获取函数返回值类型。
InstanceType<T> -- 获取构造函数类型的实例类型。*/
