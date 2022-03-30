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

// 多看
// 相当于声明了一个函数，返回值为一个对象，对象内使用了形参
// type Proxy<T> = {
//     get(): T,
//     set(v: T): void
// }
// type Proxify<T> = {
//     [P in keyof T]: Proxy<T[P]>
// }
//
// function proxify<T>(obj: T): Proxify<T> {
//     const res = <Proxify<T>>{}
//     for (const key in obj) {
//         res[key] = {
//             get: () => obj[key],
//             set: (v) => {
//                 obj[key] = v
//             }
//         }
//     }
//     return res
// }
//
// let props = {
//     name: 'zhangsan',
//     age: 18
// }
// let proxyProps = proxify(props)
// console.log(proxyProps)
//
// function unproxify<T>(t: Proxify<T>): T {
//     let res = <T>{}
//     for (const k in t) {
//         res[k] = t[k].get()
//     }
//     return res
// }
//
// let originalProps = unproxify(proxyProps)
// console.log(originalProps)


// type MapToPromise<T> = {
//     [P in keyof T]: Promise<T[P]>
// }
// type Tuple = [number,string,boolean]
// type promiseTuple = MapToPromise<Tuple>
// let tuple1:promiseTuple = [
//     new Promise((resolve,reject)=>resolve(1)),
//     new Promise((resolve,reject)=>resolve('1')),
//     new Promise((resolve,reject)=>resolve(true)),
// ]

// 注意：Type[keyof someType]会过滤掉类型为null/undefined/never的类型
// type aaa = {
//     a: string,
//     b: undefined,
//     c: null,
//     d: number,
//     e: boolean
// }
// type bbb = aaa[keyof aaa]

