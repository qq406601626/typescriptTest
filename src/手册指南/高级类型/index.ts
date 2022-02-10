// 交叉类型
// Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable
function jiaochaleixing<T, U>(arg1: T, arg2: U): T & U {
    return <T & U>{}
}

// 联合类型
// number | string | boolean表示一个值可以是 number， string，或 boolean

function leixinglianhe(prop:number|string): number | string {
    return  prop
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
function isNumber(arg1:number|string):arg1 is number{
    // arg1 is number就是类型谓词。 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。
    // 每当使用一些变量调用 isFish时，TypeScript会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。
    return typeof arg1 ==='number'
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
