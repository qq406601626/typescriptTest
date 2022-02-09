class Animal {
    name: string // 声明一个public属性并声明类型，没有赋值。
    constructor(theName: string) {
        this.name = theName
    }

    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters: number) { // 重写基类方法。参数个数和类型要与基类一致。
        console.log("Slithering...")
    }
}

let snake: Animal = new Snake('snake') // 里氏替换原则

// 公共、私有、受保护修饰符
// 默认修饰符为public

// 当成员被标记成 private时，它就不能在声明它的类的外部访问：
// @ts-ignore
class Animal2 {
    private name: string;

    constructor(theName: string) {
        this.name = theName;
    } // 内部可以使用name属性
}

// @ts-ignore
new Animal2("Cat").name; // error: 外部不可以使用name属性

// protected修饰符与 private修饰符的行为很相似，但protected成员在派生类中仍然可以访问
class Person {
    protected prop1: string;

    constructor(name: string) {
        this.prop1 = name;
    }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        // 这里使用了基类的prop1属性。
        return `Hello, my name is ${this.prop1} and I work in ${this.department}.`;
    }
}

// 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，只能在基类中调用
class Person2 {
    protected constructor(theName: string) {
    }
}

// Employee 能够继承 Person
class Employee2 extends Person {
    constructor(name: string) {
        super(name); // 基类中的构造器为protected，只能在基类中调用
    }

    f(name: string) {
        // const instance = new Person2(name) // error：在基类中实例化protected的构造器会报错
    }
}

// readonly修饰符
// 只读属性必须在声明时或构造函数里被初始化
class readonlyClass {
    readonly prop1: string
    readonly prop2: string = '2' // 声明时赋值
    readonly prop3: string
    readonly prop4: string

    constructor() {
        this.prop3 = '3' // 构造器里赋值
    }

    // f(){
    //     this.prop4 = '4' // error : 方法体中不能赋值
    // }
}

let readonlyClassInstance = new readonlyClass()
// readonlyClassInstance.prop1 = '1' // error

// 参数属性
// 参数属性通过给构造函数参数前面添加一个访问限定符来声明。
// 使用 private限定一个参数属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样。
class canshushuxinglei {
    constructor(readonly prop1: string, public prop2, private prop3, protected prop4) {
    }
}

// 存取器
class cunquqiClass {
    private _name: string

    get Name(): string {
        return this._name
    }

    set Name(newName: string) {
        this._name = newName
    }
}

// 静态属性
class jingtaishuxingClass {
    static prop1: object = {x: 0} // 使用static声明静态属性
    static prop2: number

    f(value: number): void {
        jingtaishuxingClass.prop2 = value
    }
}

// 抽象类
// 抽象类做为其它派生类的基类使用。
// 它们一般不会直接被实例化。
// 不同于接口，抽象类可以包含成员的实现细节。
abstract class chouxianglei1 {
    abstract f1(): number // 抽象方法，不包含实现体
    f2(prop1: string): string { // 包含具体实现体
        console.log(prop1)
        return prop1
    }
}

// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// 抽象方法的语法与接口方法相似。
// 两者都是定义方法签名但不包含方法体。
// 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
class chouxjianglei2 extends chouxianglei1 {
    f1(): number { // 继承抽象类，基类中的抽象方法必须实现。
        return 0
    }
}

// let chouxiangleiInstance1 = new chouxianglei1() // error ：抽象类不能实例化
let chouxiangleiInstance1 = new chouxjianglei2() // 抽象类的子类可以实例化

// 把类当作接口使用（即接口继承类）
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
