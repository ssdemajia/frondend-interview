## 设计模式

### 单例模式

饿汉：不管程序是否需要这个对象的实例，总是提前创建好实例。对于多线程的程序来说这样不会出现loadSingle()时竞态。

```javascript
let loadSingle = (function() {
  function Person(name) {
    this.name = name;
    this.age = 18;
  }
  Person.prototype.print = function() {
    console.log(`${this.name}:${this.age}`);
  }
  let instance = new Person;
  return function() {
    return instance
  }
})(); //使用立即函数来创建闭包
console.log(loadSingle().print());
```



懒汉：当某个对象使用频率不高，内存占用大，这个静态类就只有在需要的时候才加载。

```javascript
let loadSingle = (function() {
  function Person(name) {
    this.name = name;
    this.age = 18;
  }
  Person.prototype.print = function() {
    console.log(`${this.name}:${this.age}`);
  }
  let instance = null;
  return function() {
    if (!instance) instance = new Person('ss');
    return instance
  }
})(); //使用立即函数来创建闭包
console.log(loadSingle().print());
```

