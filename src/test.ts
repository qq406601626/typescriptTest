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

// 多看
// function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U):Record<K, U> {
//     let res: any = {}
//     for (const objKey in obj) {
//         res[objKey] = f(obj[objKey])
//     }
//     return res
// }
// const names = {
//     name:'zhangsan',
//     nickName:'lisi',
//     addr:'beijing'
// }
// const res = mapObject(names,(s)=>s.length)
// console.log(res)





