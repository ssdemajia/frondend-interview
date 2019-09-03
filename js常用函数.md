## 二维数组生成

`let dp = Array.from({length: len1+1}, item => Array(len2+1).fill(0));`

### apply、call、bind

apply使用数组作为参数，call使用一个一个参数，bind使用一个一个参数。

```javascript
function ss() {
	console.log(this.a);
}
let obj = { a:1 }
let obj2 = { a:2 };
ss.bind(obj).call(obj2); // 返回1
```

说明bind绑定后就改不了。

### 克里化

克里化会延迟求值，需要使用函数的作用域来保存。

```javascript
function currying(fn, ...args) {
    if (args.length >= fn.length) {
        return fn(...args)
    }
    return function(...otherArgs) {
        return currying(fn, ...args, ...otherArgs)
    }
}
```

解决的问题：参数复用、延时执行。

### debouce防抖函数

函数在某段时间内，只有不抖了才执行。设置了等待3秒的函数，在3秒内如果遇到函数调用请求就重新计时，只有在3s内没有一次调用的时候才能执行这个函数。

只有在快速执行结束后才出发响应的功能，比如滚轮滑动向下的时候，会不断出发onscroll，使用debouce后在滑动停止后才真正执行debouce里的函数。比如mousemove这个事件也是能这样用的

**实现1**

```javascript
    function debounce(fn, wait = 50) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), wait)
      }
    }
```

这个实现有一个缺点在于不能第一次就触发。

**实现2**

```javascript
function debounce(fn, wait = 50, immediate = false) {
      let timer = null;
      return function (...args) {
        if (immediate && !timer) {
          fn(...args);
        }
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), wait)
      }
    }
```



### throttle节流函数

在时间范围内只执行一次，会立即执行。比如滚轮**持续**向下滑动时，滑一段时间就会出发一次throttle，而debouce只有在不滑的时候才运行。throttle适合频繁被调用的api，比如window.onresize()、mousemove事件。

**实现1** 

基本实现，根据时间戳来判断是不是触发

```javascript
function throttle(fn, wait) {
      let previous = 0
      return function(...args) {
        let now = +new Date();
        if (now - previous > wait) {
          previous = now;
          fn.apply(this, args)
        }
      }
    }
```

**实现2**

这个实现中leading用于表示是否立马调用fn，trailing指示是否最后一次会触发。

```javascript
function throttle(fn, wait, leading = false, trailing = false) {
      let previous = 0
      let timeout = null;
      let args, context;

      function handle() {
        fn.apply(this, args);
        clearTimeout(timeout)
        timeout = null; // 恢复throttle闭包内的属性
        previous = (+new Date); // 恢复throttle闭包内的属性
        context = args = null;
      }
      function throttled(...originArgs) {
        context = this;
        args = originArgs;
        let now = +new Date();
        if (previous == 0 && leading == false) { // 此时不需要开始时执行fn
          previous = now;
        }
        if (now - previous >= wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = fn.apply(this, args)
        } else if (!timeout && trailing) { // 此时在事件间隔内，所以加个定时器来触发下个时间段一定会执行
          let remain = wait - (now - previous)
          timeout = setTimeout(handle, remain);
        }
        return result;
      }
      return throttled;
    }
```

最后一次触发使用的是setTimeout来对剩余时间进行计时，当节流3s时，那么开始会设置一个定时器setTimeout来保证最后一次会在3s后触发，如果trailing为false，那么使用的是方法1的按照时间戳的方法。

