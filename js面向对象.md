
### javascript 的new过程

比如一个Person构造函数，使用new操作符后，经历下面过程：

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（this指向这个新对象）
3. 执行构造函数中的代码。
4. 返回新函数

**生成的对象包含一个属性constructor，指向构造函数。**比如`p1 instanceOf Person`返回True，要求instanceOf右边的对象必须是可调用的，也就是函数。

任何函数，只要通过`new`操作符来调用就能作为构造函数。

### `__proto__`

现在有这样一个构造函数`function SS() {}`

那么`SS.prototype.__proto__.__proto__`是`null`

`SS.prototype.__proto__`是构造函数Object生成的对象

```javascript
{
	constructor: ƒ Object()
	hasOwnProperty: ƒ hasOwnProperty()
	isPrototypeOf: ƒ isPrototypeOf()
	propertyIsEnumerable: ƒ propertyIsEnumerable()
	toLocaleString: ƒ toLocaleString()
	toString: ƒ toString()
	valueOf: ƒ valueOf()
	__defineGetter__: ƒ __defineGetter__()
	__defineSetter__: ƒ __defineSetter__()
	__lookupGetter__: ƒ __lookupGetter__()
	__lookupSetter__: ƒ __lookupSetter__()
	get __proto__: ƒ __proto__()
	set __proto__: ƒ __proto__()
}
```

### javascript继承

参考《Javascript高级程序设计第3版》

**原型链继承：**js的继承实现本质上通过重写子类构造函数的原型，使子类原型指向父类实例。这里父类实例也会使用子类构造函数进行构造。

```javascript
function SuperType() { // 父类
  this.ss = 'super'
  SuperType.prototype.say = function() {
    console.log(this.ss)
  }
}
function SubType () { // 子类
  SubType.prototype = new SuperType();
  this.ss = 'sub'
}
let sub = new SubType()
console.log(sub.say()) // 输出sub
// 但是这样会导致sub的原型的构造函数是SuperType
```

缺点：因为原型是父类实例，如果父类实例中包含引用类型，就会被所有子类共享。

**借用构造函数**：在子类构造函数中调用父类构造函数。因为构造函数大多都是在对象上添加属性。

```javascript
function SuperType() {
  this.colors = ['red', 'blue', 'green']
}

function SubType() {
  SuperType.call(); // 借用构造函数
}
```

缺点：无法做到函数复用。

**组合式继承：**将原型链和构造函数借用技术组合在一起。使用原型链实现原型属性和方法的复用，使用构造函数借用来对实例属性继承。

```javascript
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'black']
}

function SubType(name) {
  SuperType.call(this, name);
  this.sb = 'sb';
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
```

缺点在于第7行、10行调用了两次构造函数。

**原型式继承：**与原型链继承类似，引用属性会被所有子类共享。

```javascript
function objecet(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

ES5 提供Object.create()来实现object()这个功能。

**寄生式继承：**创建一个仅用于封装继承过程的函数，内部已某种方式增强对象。

```javascript
function createSub(original) {
  let sub = Object.create(original);
  sub.say = function() {
    console.log("Hi~")
  };
  return sub;
}
```

这里面的say无法被复用。

**寄生组合式继承：**在组合继承中调用了两次父类的构造函数。因此使用Object.create来自己将子类构造函数的原型执行父类。

```javascript
function superType(name) {
  this.name = name;
}
superType.prototype = function() { console.log('lalala'); }
function subType(name) {
  superType.call(this, name);
}

function inherit(subType, superType) {  // 关键在于创建了用过父类构造函数路来创建子类构造函数的原型。
  let sub = Object.create(superType);
  sub.constructor = subType;
  subType.prototype = sub;
}

```



### 确认原型与实例之间的关系

1. `instance instanceof Object`
2. `instance instanceof SuperType`
3. `instance instanceof SubType` 

4. `Object.prototype.isPrototypeOf(instance)`
5. `SuperType.prototype.isPrototypeOf(instance)`



### 对象拷贝

1. 简单拷贝：使用`for … in`复制每个属性，如下：

```javascript
function copy(source) {
  let target = {};
  for (let key in source) {
    target[key] = source[key];
  }
  return target;
}
```

简单拷贝没有拷贝原型，只复制了可枚举属性，复制对象的引用。

2. 浅拷贝：`Object.assign({}, obj)`，Object.assign会将对象中所有可枚举的属性复制到目标对象

3. 深拷贝：`JSON.parse(JSON.stringify(object));`，缺点：对于用户自定义的函数无法复制，如下：

   ```javascript
   let ss = {
     print: function() {
       console.log('ss');
     }
   }
   console.log(JSON.parse(JSON.stringify(ss))); // 输出：{}，一个空对象 
   ```

   同时这个方法不能用于循环引用的对象。

4. 使用ES展开操作符：对象字面量的展开操作符能够将源对象中可枚举的属性复制到目标对象中。

   ```javascript
   let o1 = { a: 1, b:2 };
   let o2 = {...o1};
   ```


### 类型判断

参考 https://www.cnblogs.com/onepixel/p/5126046.html

```javascript
typeof '' // string
typeof 1  // number
typeof NaN // number , NaN === NaN 返回false
typeof true // boolean
typeof Symbel() // symbol
typeof undefined // undefined
typeof null // object
typeof new Function() // function
typeof new RegExp() // object
typeof new Date() // object
typeof new String() // object
```

对于基本类型，除了null都能正确返回。

使用instanceof能够判断A是否是B的实例，表达式`A instanceof B`

类似下面的代码：

```javascript
function instanceOf(A, B) {
  let proto = A.__proto__;
  while (proto && proto != B.prototype) {
    console.log(proto);
    proto = proto.__proto__;
  }
  if (proto) return true;
  return false;
}
```

使用原型链向上，比如一个`let arr = new Array()` ，那么`arr.__proto__ == Array.prototype , Array.prototype.__proto__ == Object.prototype, Object.prototype.__proto__ == null`.

![](/Users/shaoshuai/OneDrive/notes/frontend/js原型链.png)

因为instanceof有一个问题，它默认在一个全局环境中，如果是iframe中的Array来生成数组，instanceof会判断false，所以ES5中添加判断数组的方法**Array.isArray()**。
使用`Object.prototype.toString.call(obj)`来返回对象的`[[Class]] `值
