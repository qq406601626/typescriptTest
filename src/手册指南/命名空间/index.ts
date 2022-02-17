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
