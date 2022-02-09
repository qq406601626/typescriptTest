// 比较两个函数
// ①比较函数的参数
let f1 = (a: number) => 0;
let f2 = (b: number, s: string) => 0;
// f2 = f1; // OK
// f1 = f2; // Error : 因为f2的参数比f1多

let f3 = (a: string) => a;
let f4 = (b: number, s: string) => 0;
// f4 = f3; // Error : 虽然f3的参数比f4少，但是参数从左往右的类型没对应上

// ②比较函数的返回值
let f5 = () => ({name: 'Alice'});
let f6 = () => ({name: 'Alice', location: 'Seattle'});
// f5 = f6 // ok
// f6 = f5 // Error ：f5的返回值的属性比f6少

// 类比较
// 类与对象字面量和接口差不多
// 类有静态部分和实例部分的类型。 比较两个类类型的对象时，只有实例的成员会被比较
class leibijiao1 {
    prop1: number;
    prop2:number

    constructor(name: string, numFeet: number) {
    }
}

class leibijiao2 {
    prop1: number;

    constructor(numFeet: number) {
    }
}

let leibijiao_1: leibijiao1
let leibijiao_2: leibijiao2

// leibijiao_1 = leibijiao_2;  // Error : leibijiao_2的属性比leibijiao1少
leibijiao_2 = leibijiao_1;  // OK
