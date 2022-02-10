// 1、假如greet函数是引用第三方库里的函数
// const greet = require('module')
// 2、第三方库里并没有对函数类型的声明，所以需要使用declare来声明函数类型，以约束第三方库的代码
// greet("hello, world")的参数为string类型
// 3、声明约束
declare function greet(prop1: string): void

// 4、这样就达到了对第三方库的代码约束
// 当执行greet(1)时就会报错

// 全局函数
declare function f1(greeting: string): void;

// 带属性的对象
// base：全局变量myLib包含一个makeGreeting函数， 还有一个属性 numberOfGreetings指示目前为止欢迎数量。
// lib code:
/*
let result = myLib.makeGreeting("hello, world");
console.log("The computed greeting is:" + result);
let count = myLib.numberOfGreetings;
*/
// ==>使用declare namespace描述用点表示法访问的类型或值。
declare namespace myLib {
    function makeGreeting(prop1: string): void

    let numberOfGreetings: number
}


// 函数重载
// lib code:
/*
* let x:Widget = getWidget(43)
* let arr:Widget[] = getWidget('43')
* */

// @ts-ignore
declare function getWidget(prop1: number): Widget
// @ts-ignore
declare function getWidget(prop1: string): Widget []

// 可重用类型（接口）
// 需求：当指定一个欢迎词时，你必须传入一个GreetingSettings对象。 这个对象具有以下几个属性：
// 1- greeting：必需的字符串
// 2- duration: 可靠的时长（毫秒表示）
// 3- color: 可选字符串，比如‘#ff00ff’
// lib code:
// greet({
//     greeting: "hello world",
//     duration: 4000
// });
// ==>使用interface定义一个带有属性的类型。
interface GreetingSettings {
    greeting: string,
    duration: number,
    color?: string
}

declare function GreetingSettings(setting: GreetingSettings): void

// 可重用类型（类型别名）
// 需求：在任何需要欢迎词的地方，你可以提供一个string，一个返回string的函数或一个Greeter实例。
// lib code:
// function getGreeting() {
//     return "howdy";
// }
// class MyGreeter extends Greeter { }
//
// greet("hello");
// greet(getGreeting);
// greet(new MyGreeter());
// ==>你可以使用类型别名来定义类型的短名：
// @ts-ignore
type GreetingLike = string | (() => string)/*注意这里要额外加上()*/ | MyGreeter

declare function greet(prop1: GreetingLike): void

// 组织类型
// 你可以为 .log(...)提供LogOptions和为.alert(...)提供选项。
// const g = new Greeter("Hello");
// g.log({verbose: true});
// g.alert({modal: false, title: "Current Greeting"})
// 使用命名空间组织类型。
declare namespace GreetingLib {
    interface LogOptions {
        verbose?: boolean;
    }
    interface AlertOptions {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
// 你也可以在一个声明中创建嵌套的命名空间：
declare namespace GreetingLib.Options {
    // Refer to via GreetingLib.Options.Log
    interface Log {
        verbose?: boolean;
    }
    interface Alert {
        modal: boolean;
        title?: string;
        color?: string;
    }
}

// 类
// lib code
// const myGreeter = new Greeter("hello, world");
// myGreeter.greeting = "howdy";
// myGreeter.showGreeting();
//
// class SpecialGreeter extends Greeter {
//     constructor() {
//         super("Very special greetings");
//     }
// }
// 使用declare class描述一个类或像类一样的对象。
// 类可以有属性和方法，就和构造函数一样
declare  class Greeter { // 这种方式比interface中声明new ()要简单
    constructor(prop1:string)
    greeting: string;
    showGreeting(): void;
}
let greeter = new Greeter('111')
console.log(greeter.greeting)
greeter.showGreeting()
