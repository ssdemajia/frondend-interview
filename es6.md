### 箭头函数

与普通函数的区别，主要是：

1. 箭头函数会在定义时绑定外层环境的this，之后不会再改变了（包括bind、call、apply）。
2. 箭头函数没有自己的arguments对象。
3. 箭头函数没有prototype属性。


### Map

map保存键值对，任何值都可以作为key。可以将任何可迭代的对象放入构造函数中：`new Map([iterable])`

Map对象在迭代时会根据对象插入顺序进行`for ... of`，每次迭代返回[key, value]数组。

```javascript
let m = new Map([[1, 2], [3, 4]]);
for (let i of m) {
  console.log(i);
}
// 输出 [1, 2]
//     [3, 4]
```

可以使用`m.set(key, value); `来设置。

键相等比较，NaN===NaN返回true，-0 === +0返回true， 剩余都是通过===来判断。

**与Object的区别**：Object的key只能是字符串或者symbol，而map的key可以是任意类型，Map中键值对的顺序按照插入顺序固定的。Map有size属性得到键值对数量，object只能自己计算。Object有原型，有一些key自带的。

`Map.clear()`清除所有键值对

### var、const、let的区别

**var**

将函数作为作用区域，比如：

```javascript
function print() {
  for (var i = 0; i < 10; i++) {
    
  }
  console.log(i); // 得到i为10, 所以for循环中的var i相当于在print的顶部声明。
}
print();
console.log(i); // Uncaught ReferenceError: i is not defined
```

var会变量提升，这个变量的声明会提升到作用域的顶端，比如:

```javascript
console.log(i);
var i;
```

因为变量提升，等价于：

```javascript
var i;
console.log(i); // undefined
```

**let**

不允许重复声明，比如：

```javascript
let i = 10;
let i = 20;
// Uncaught SyntaxError: Identifier 'i' has already been declared
```

块级作用区域，比如:

```javascript
for(let i = 0; i < 10; i++){ 
	
}
console.log(i); // Uncaught ReferenceError: i is not defined
```

**const**

不允许重复声明，与let类似，有块级作用区域，同时**声明需要同时初始化**:

```javascript
const i;
// Uncaught SyntaxError: Missing initializer in const declaration
```

**暂时性死区**

在代码块中如果存在let、const声明的变量，这个区域中，使用这些变量需要在声明后。

```javascript
var tmp = 123;

if (true) {
	tmp = 'abc';// Uncaught ReferenceError: tmp is not defined
	let tmp;
}
```

### await、async

async修饰的函数会返回一个promise，无论函数结果是否为promise。

```javascript
async function ss() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}
```

await 会把后面的 promise 放到 microtask queue 中，所以当 await 和 setTimeout 放到一起时，会先执行 await 的部分，再执行 setTimeout 的部分（setTimeout 会进入 macrotask，优先级低于 microtask）