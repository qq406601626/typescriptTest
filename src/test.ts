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


interface Test<T>{
    name:Test<T>
}
