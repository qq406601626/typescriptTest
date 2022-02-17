/// <reference path="Validation.ts" />
// 引入Validation.ts,因为下方使用到了ValidationReference
/// <reference path="LettersOnlyValidator.ts" />
// 引入Validation.ts,因为下方使用到了StringValidatorReference
/// <reference path="ZipCodeValidator.ts" />
// 引入Validation.ts,因为下方使用到了ZipCodeValidatorReference

let strings = ["Hello", "98052", "101"];

let validators: { [s: string]: ValidationReference.StringValidatorReference; } = {};
validators["ZIP code"] = new ValidationReference.ZipCodeValidatorReference();
validators["Letters only"] = new ValidationReference.LettersOnlyValidatorReference();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
    }
}
