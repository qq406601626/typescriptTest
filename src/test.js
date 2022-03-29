// function getValues<O, K extends keyof O>(obj: O, keys: Array<K>): Array<O[K]> {
//     return keys.map(key => obj[key])
// }
function proxify(obj) {
    var res = {};
    var _loop_1 = function (key) {
        res[key] = {
            get: function () { return obj[key]; },
            set: function (v) {
                obj[key] = v;
            }
        };
    };
    for (var key in obj) {
        _loop_1(key);
    }
    return res;
}
var props = {
    name: 'zhangsan',
    age: 18
};
var proxyProps = proxify(props);
console.log(proxyProps);
function unproxify(t) {
    var res = {};
    for (var k in t) {
        res[k] = t[k].get();
    }
    return res;
}
var originalProps = unproxify(proxyProps);
console.log(originalProps);
