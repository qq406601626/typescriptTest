// 导出
// 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。
class ZipCodeValidator implements Object {}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };

// 重新导出
// @ts-ignore
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";

// 导入
// @ts-ignore
import * as validator from "./ZipCodeValidator";
// 具有副作用的导入模块
// 一些模块会设置一些全局状态供其它模块使用。 这些模块可能没有任何的导出或用户根本就不关注它的导出。 使用下面的方法来导入这类模块：
// @ts-ignore
import "./my-module.js";

// 外部模块
// node.d.ts (simplified excerpt)
// @ts-ignore
declare module "url" { // 声明
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}
// @ts-ignore
declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
}
// 现在我们可以/// <reference> node.d.ts并且使用import url = require("url");
// 或import * as URL from "url"加载模块。
/// <reference path="node.d.ts"/>
// @ts-ignore
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");

// 外部模块简写
// 假如你不想在使用一个新模块之前花时间去编写声明
// declarations.d.ts
// @ts-ignore
declare module "hot-new-module"; // 声明了module名称但没有模块内容
// 简写模块里所有导出的类型将是any：
// @ts-ignore
import x, {y} from "hot-new-module";
x(y); // x、y都是any类型
