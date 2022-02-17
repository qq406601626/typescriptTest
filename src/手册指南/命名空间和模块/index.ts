// import顺序
// 编译器首先尝试去查找相应路径下的.ts，.tsx再或者.d.ts

// 不必要的命名空间
// 这种方式对于使用它的人来说这是令人迷惑和讨厌的
export namespace Shapes {
    export class Triangle { /* ... */
    }

    export class Square { /* ... */
    }
}
// @ts-ignore
import * as shapes from "./shapes";
// @ts-ignore
let t = new shapes.Shapes.Triangle(); // shape
// s.Shapes?
// 再次重申，不应该对模块使用命名空间
// 下面是改进的例子：
// shapes.ts
export class Triangle { /* ... */
}

export class Square { /* ... */
}

// shapeConsumer.ts
// @ts-ignore
import * as shapes from "./shapes";
// @ts-ignore
let t = new shapes.Triangle();
