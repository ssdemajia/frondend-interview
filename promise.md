### Promise

Promise是一个thenable的对象。

promise对象有三种状态：Pending（进行中）、Fulfilled（已成功）、Rejected（已失败）。

```javascript
new promise(resolve => {
	console.log(1);
	resolve(3);
}).then(num => {
	console.log(num); // 2
})
console.log(2)

//输出结果的顺序是123
```

then(fn)里的fn会延迟执行，而是放入promise queue任务队列中，等普通的JS代码执行完后，事件对列再出栈。

在promise中直接执行构造函数中传入的handle，用于通过传入两个函数resolve、reject进行状态转换。然后在then中分别指定fulfilled和rejected状态的回调函数。

实现then，then会生成一个新的promise，然后then像一个链条一样会将前后两个promise连接，使用的是defered数组保存。

## Eventloop

参考 https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

JS中异步任务有两种：macrotasks和microtasks

macrotasks：setTimeout、setInterval、setImmediate、I/O、UI render

microtasks：process.nextTick、Promise、MutationObserver

一个事件循环中只有一个macrotask任务，可以有多个microtask任务，首先处理micro task队列，再处理macro task队列。

```javascript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```

运行顺序是script start、script end、promise1、promise2、setTimeout。

当没有其他的JS代码执行，就会执行microtask队列里面的任务。在then里面的任务会被放入micro task queue里面。

一个复杂的例子：

```html
<div class="outer">
  <div class="inner"></div>
</div>
```



```javascript
// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// Here's a click listener…
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
```

当点击inner时，

1. 首先进行click事件的派发，将click事件放入macro task中
2. 此时macro task中只有click事件，因此执行click的回调函数，打印`'click'`，然后setTimeout将回调函数放入macro task，promise.then将任务放入micro task中，第25行使得mutationObserver的回调函数也放入micro task中。
3. 此时JS栈运行完，首先执行micro task队列，将promise和mutationObserver执行，micro task空。此时macro task队列中将click的事件派发根据事件冒泡，触发outer的click事件回调函数，然后再将setTimeout放入macro task队列中，执行promise 和mutationObserver。
4. 最后macro task中只剩下setTimeout回调，执行setTimeout的回调函数。

执行输出为：click、promise、mutate、click、promise、mutate、timeout、timeout。

**其中**

marco task的render任务也就是比如someItem.innerHTML = input.value，会引起浏览器重新渲染，这个任务也会放到task中。所以在input里需要把上面的语句放到setTimeout里，等input的value更新任务后再修改innerHTML。参考：http://ghmagical.com/article/page/id/H61NOVU0RZ9Y
