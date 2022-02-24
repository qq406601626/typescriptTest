// type Tree<T> ={
//     value:T,
//     left?:Tree<T>,
//     right?:Tree<T>
// }
// let tree:Tree<number> = {
//     value:11,
//     left:{
//         value:111,
//     },
//     right:{
//         value:111,
//     }
// }

// template <T>
// Tree(){
//   value:T,
//   left:Tree<T>(),
//   right:Tree<>(T)
// }


// type LinkedList<T> = T & { next: LinkedList<T> };
// template<T>

// function pluck<T,K extends keyof T>(o:T,names:K[]):T[K][]{
//     return names.map(n=>o[n])
// }
// interface suoyinleixing {
//     name: string;
//     age: number;
//     gender:string;
//     address:string,
//     country:string
// }
// let person: suoyinleixing = {
//     name: 'Jarid',
//     age: 35,
//     gender:'man',
//     address:'china',
//     country:'beijing'
// };
// let suoyinResult: string[] = pluck(person, ['name','address','country']); // ok, string[]
// console.log(suoyinResult)

type ReadonlyAAA<T> = {
    readonly [P in keyof T]: T[P];
}
type PartialAAA<T> = {
    [P in keyof T]?: T[P];
}
type PersonPartial = PartialAAA<{name:string,age:number}>
