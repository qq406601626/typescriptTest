// function getValues<O, K extends keyof O>(obj: O, keys: Array<K>): Array<O[K]> {
//     return keys.map(key => obj[key])
// }
// type objs<T> = {
//     [key:string] : T
// }
// type objsNumber = objs<number>
// let keysObj: objs<number> = {
//     age:18
// }
// let keyType:objsNumber['name']
// function pick<O, K extends keyof O>(obj: O, keys: Array<K>): Pick<O, K> {
//     const res: any = {}
//     keys.forEach(key => {
//         res[key] = obj[key]
//     })
//     return res
// }
function mapObject(obj, f) {
    var res = {};
    for (var objKey in obj) {
        res[objKey] = f(obj[objKey]);
    }
    return res;
}
var names = {
    name: 'zhangsan',
    nickName: 'lisi',
    addr: 'beijing'
};
var res = mapObject(names, function (s) { return s.length; });
console.log(res);
