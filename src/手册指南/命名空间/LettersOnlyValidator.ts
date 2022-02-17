/// <reference path="Validation.ts" />
// 引入Validation.ts,因为下方使用到了StringValidatorReference
// 引入必须是以///开头
namespace ValidationReference {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidatorReference implements StringValidatorReference {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}
