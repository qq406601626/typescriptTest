// 联合枚举与枚举成员的类型
enum ShapeKind {
    Kind1,
    Kind2,
}

interface Circle {
    kind: ShapeKind.Kind1 // 枚举成员成为了类型。
    // 前提是ShapeKind枚举成员不带有初始值或者是值被初始化为：
    // 任何字符串字面量（例如： "foo"， "bar"， "baz"）
    // 任何数字字面量（例如： 1, 100）
    // 应用了一元 -符号的数字字面量（例如： -1, -100）
    radius: number
}

let c: Circle = {
    // kind: ShapeKind.Kind2, // error
    // kind: ShapeKind.Kind1, // right
    kind: 100, // right
    radius: 1
}

enum E {
    Foo,
    Bar,
    A,
    B
}

function f(x: E) {
    // if (x !== E.Foo|| x !== E.Bar) {
    // error：后面的x!==E.Bar的判断只有在x !== E.Foo为false时才会执行。
    // 当x !== E.Foo为false时，x为E.Foo，所以后面的x !== E.Bar永远为true
    // }
}

// 运行时的枚举
// 枚举是在运行时真正存在的对象
enum yunxingshimeiju {
    x,
    y
}

let yunxingshimeijuInstance: { x: number, y: number } = yunxingshimeiju // 可以直接把枚举当做对象使用

// 反向映射
enum fanxiangyingshe {
    A
}

let fanxiangyingshevalue = fanxiangyingshe.A;
let fanxiangyingshevalue2 = fanxiangyingshe[fanxiangyingshevalue]; // "A"
fanxiangyingshevalue2 = fanxiangyingshe[1]

// 常量枚举
enum Enum {
    A,
    B = A * 2 // 可以在枚举内使用自身的枚举变量
}

// 外部枚举
// 外部枚举用来描述已经存在的枚举类型的形状。
// 外部枚举和非外部枚举之间有一个重要的区别:
// 在正常的枚举里，没有初始化方法的成员被当成常数成员。
// 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。(没看懂)
declare enum waibumeiju {
    A = 1,
    B,
    C = 2
}
