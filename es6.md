### 箭头函数

与普通函数的区别


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
