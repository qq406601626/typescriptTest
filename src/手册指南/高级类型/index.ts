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
type leixingbieming = string
type leixingbieming2 = () => leixingbieming
type leixingbieming3 = leixingbieming | leixingbieming2
type leixingbieming4<T> = { value: T } // 创建一个泛型类型别名
type leixingbieming5<T> = { value: T, value2: leixingbieming5<T> } // 类型别名来在属性里引用自己

// 接口 vs. 类型别名
// 类型别名可以像接口一样；然而，仍有一些细微差别：
// 1、接口创建了一个新的名字，可以在其它任何地方使用。类型别名并不创建新名字。
// 2、类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）
// 3、如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名


// 字符串字面量类型
// 字符串字面量类型允许你指定字符串必须的固定值
// 通过结合联合类型，你可以实现类似枚举类型的字符串
type zifuchuanzimianliangleixing = "ease-in" | "ease-out" | "ease-in-out";
let zifuchuanzimianliangleixing:zifuchuanzimianliangleixing = 'ease-in' // ok
// let zifuchuanzimianliangleixing2:zifuchuanzimianliangleixing = '1' // Error
function createElement(tagName: "img"): HTMLImageElement // 区分函数重载
function createElement(tagName: "input"): HTMLInputElement // 区分函数重载
function createElement(tagName: string): any{}

// 枚举成员类型

