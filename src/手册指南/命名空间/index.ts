// 所有的验证器都放在一个文件里
// 功能代码
interface StringValidator {
    isAcceptable(s: string): boolean
}

let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
    isAcceptable(s) {
        return lettersRegexp.test(s)
    }
}

class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

let strings = ['hello', '123', 456]

let validators: { [s: string]: StringValidator } = {}
validators['ZIP code'] = new ZipCodeValidator()
validators["Letters only"] = new LettersOnlyValidator();

// 使用命名空间改装
namespace Validation {
    export interface StringValidator { // 命名空间内的内容如果外部需要使用，需要export导出
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
let validators2: { [s: string]: Validation.StringValidator; } = {}; // 使用命名空间
validators2["ZIP code"] = new Validation.ZipCodeValidator(); // 使用命名空间
validators2["Letters only"] = new Validation.LettersOnlyValidator(); // 使用命名空间

// 分离到多文件
// 参照index2.ts

// 别名
namespace biemingNamespace {
    export namespace bieming2 {
        export class c1 {
        }

        export class c2 {
        }
    }
}
import bieming = biemingNamespace.bieming2 // 创建别名
let c1 = new bieming.c1() // 使用别名

// 使用其它的js库
// 为了描述不是用TypeScript编写的类库的类型，我们需要声明类库导出的API。
// 由于大部分程序库只提供少数的顶级对象，命名空间是用来表示它们的一个好办法。
// 我们称其为声明是因为它不是外部程序的具体实现。 我们通常在 .d.ts里写这些声明。
// 流行的程序库D3在全局对象d3里定义它的功能。 因为这个库通过一个 <script>标签加载（不是通过模块加载器），它的声明文件使用内部模块来定义它的类型。 为了让TypeScript编译器识别它的类型，我们使用外部命名空间声明。
// 声明代码如下：
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base; // 使用声明的命名空间里的类型
