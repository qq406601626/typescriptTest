/// <reference path="Validation.ts" />
// 引入Validation.ts,因为下方使用到了StringValidatorReference
// 引入必须是以///开头
namespace ValidationReference {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidatorReference implements StringValidatorReference {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
