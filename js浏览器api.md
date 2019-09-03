### img使用Base64

src包括`Content-type`、`Content-encoding`。格式为`data:[Content-type];[Charset];base64,<data>`

```html
<div>
  <p>Taken from wikpedia</p>
  <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
</div>
```



### for和forEach哪个快

环境是chrome版本75.0.3770.100

```javascript
let arr = new Array(10000000)
let temp = 0;
console.time('sb')
for (let i = 0; i < arr.length; i++) {
   temp += 1
}
console.timeEnd('sb')
temp = 0;
console.time('ss')
arr.forEach(a => {
   temp += 1;
})
console.timeEnd('ss')
```

最后得到for循环需要77.67ms而forEach需要28.4ms。

后面将arr.length放在initial 里面，for的速度会得到提升。

```javascript
for (let i = 0; i < arr.length; i++) {
   temp += 1
}
```

其中for循环需要24.7ms而forEach需要28.49ms。

### 直接执行Javascript代码

1. 最好的方法，可以在void()里面放函数，比如window.form.submit()，`<a href="javascript:void(0)" onclick="test()">test</a>`

2. 或者使用锚点，但是锚点，点击后会跳到顶部，`<a href="#" onclick="test2()">test2</a>`

## BOM
```javascript
<div id="ss">ss</div>
  <script>
    function doSomething() {
      alert(this);
    }
    let element = document.getElementById('ss');
    element.onclick = doSomething; // 返回[object HTMLDivElement]
    element.onclick = function() { doSomething() } // 返回[object Window]
    doSomething() // 返回[object Window]
  </script>
```
### Window.onload 和 document.onload的区别

Window.onload：当整个页面加载完毕（包括图片、css、js等）然后被触发，在某些浏览器中用window.onload来接替document.onload

document.onload：当DOM已经准备好时被触发。

### DOMContentLoaded事件

当初始的html文档被完全加载和解析完成之后，DOMContentLoaded事件被触发，**而无需等待样式表、图像、子框架完成加载。**

## DOM

### label、input

label标签需要一个for属性和input的id属性相同，这样他们就能匹配在一起

### 使用input上传文件

参考 https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications

```javascript
<!DOCTYPE html>
<html lang="en">
<body>
  <label for="ss">上传图片</label>
  <input type="file" name="ss" id="ss" multiple>
  <img id="img">
  <script>
    let ss = document.querySelector('#ss');
    ss.addEventListener('change', e => {
      for (let i = 0; i < ss.files.length; i++) {
        let curFile = ss.files[i]; // file类型对象
        let img = document.querySelector('#img');
        let reader = new FileReader();
        reader.readAsDataURL(curFile);  // 读取成为URL形式
        reader.onload = e => { // 读取完毕后设置
          img.src = e.target.result;
        }
      }
    })
  </script>
</body>
</html>
```

### 拖拽上传

参考 https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API

使用html5的drag和drop。一个drag操作：用户拖拽一个可移动元素到一个可放置元素上，然后释放鼠标。

| `drag`      | [`ondrag`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondrag) | 当拖动元素或选中的文本时触发。                               |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `dragend`   | [`ondragend`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondragend) | 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键). (见[结束拖拽](https://developer.mozilla.org/zh-CN/docs/DragDrop/Drag_Operations#dragend)) |
| `dragenter` | [`ondragenter`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondragenter) | 当拖动元素或选中的文本到一个可释放目标时触发（见 [指定释放目标](https://developer.mozilla.org/zh-CN/docs/DragDrop/Drag_Operations#droptargets)）。 |
| `dragexit`  | [`ondragexit`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondragexit) | 当元素变得不再是拖动操作的选中目标时触发。                   |
| `dragleave` | [`ondragleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondragleave) | 当拖动元素或选中的文本离开一个可释放目标时触发。             |
| `dragover`  | [`ondragover`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondragover) | 当元素或选中的文本被拖到一个可释放目标上时触发（每100毫秒触发一次）。 |
| `dragstart` | [`ondragstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondragstart) | 当用户开始拖动一个元素或选中的文本时触发（见[开始拖动操作](https://developer.mozilla.org/zh-CN/docs/DragDrop/Drag_Operations#dragstart)）。 |
| `drop`      | [`ondrop`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondrop) | 当元素或选中的文本在可释放目标上被释放时触发（见[执行释放](https://developer.mozilla.org/zh-CN/docs/DragDrop/Drag_Operations#drop)）。 |

例子：

```html
<!DOCTYPE html>
<html lang="en">
  <style>
    #dropArea {
      background-color: green;
      width: 400px;
      height: 400px;
    }
  </style>
<body>
  <div id="dropArea">ss </div>
  <img id="img" alt="">
  <script>
    let dropArea = document.querySelector('#dropArea');
    let img = document.querySelector('#img');
    let stopEvent = e => {
      e.stopPropagation()
      e.preventDefault();
    }
    dropArea.addEventListener('dragenter', stopEvent);
    dropArea.addEventListener('dragover', stopEvent);
    dropArea.addEventListener('drop', e => {
      e.stopPropagation();
      e.preventDefault();
      console.log(e);
      let dt = e.dataTransfer
      let files = dt.files;
      for (let i = 0; i < files.length; i++) {
        if (/image\/png/.test(files[i].type)) {
          let fr = new FileReader();
          fr.onload = e => {
            img.src = e.target.result;
          }
          fr.readAsDataURL(files[i]);
        }
      }
    })
  </script>
</body>
</html>
```



### localStorage与sessionStorage

localStorage储存的数据能够跨浏览器保留（各大浏览器默认最大5M），而sessionStorage当页面结束时会被清除(页面会话在浏览器打开期间一直保持打开，重新加载或者恢复页面仍会保持原来的会话，在新标签或者打开一个新页面会初始化一个新的会话)。

localStorage中键值对总是以**字符串的形式储存**（值会被转换为字符串）。

```javascript
localStorage.setItem('myCat', 'Tom');
let cat = localStorage.getItem('myCat');
localStorage.removeItem('myCat');
localStorage.clear(); // 移除所有	
```

而且setItem会把value表示为字符串

```javascript
function SS() {
    this.ss = "shaoshuai"
    this.name = "ss"
}
sessionStorage.setItem('ss', new SS())
sessionStorage.getItem('ss')
>> "[object Object]"
```

sessionStorage主要用于会话期间的独立存储区域。

无论何时当storage变化时都会触发storage事件

### cookie

当服务器收到HTTP请求时，服务器可以在响应头里面添加一个`Set-Cookie`选项。浏览器收到响应后通常会保存下Cookie，之后**对该服务器每一次请求中都通过Cookie请求头部将Cookie信息发送给服务器（大小限制4K）。**

会话期Cookie不需要设置expires（过期时间）。

**Cookie安全**：标记为 `Secure` 的Cookie只应通过被HTTPS协议加密过的请求发送给服务端，通过JavaScript的 `Document.cookie`API无法访问带有 `HttpOnly` 标记的Cookie，它们只应该发送给服务端。

### 匿名函数缺点

1. 匿名函数没有名称标识符，导致栈追踪中不会显示用意义的函数名，调试困难.

2. 如果要递归只能使用arguments.callee。

3. 事件监听函数，需要解绑自己。

4. 缺少函数名，可阅读性差。

### addEventListener

为元素添加事件监听

```javascript
target.addEventListener(type, listener[, useCapture]);
```

其中useCapture默认为false表示冒泡，当父元素和子元素都有这个事件的监听时，事件会沿着DOM树向上触发。

### setTimeout

```javascript
setTimeout(code, millisec, args);
```

如果code为字符串相当于执行eval().

setTimeout只会在millisec后将任务插到macro task任务队列中，但是不确保任务队列中任务按时被执行

### src与href之间的区别

- 引用css文件时：`href="cssfile.css"`
- 引用js文件时：`src="myscript.js"`
- 引用图片：`src="mypic.jpg"`
- 网站链接：`href="http://www.webpage.com"`

href表示hypertext reference，超文本引用，定义文档与这个资源之间的关系，浏览器对于这个地址不会停下HTML解析和渲染。

src表示将资源嵌入文档中，浏览器会等待JS脚本解析完。


## JS模块化

参考：http://huangxuan.me/js-module-7day

一开始直接function定义函数会污染global命名空间，然后使用Namespace方式，使用`let Name = { foo:function(){} }`来封装。

后来使用IIFE（立即调用函数表达式）模式，因为匿名函数拥有独立的词法作用域，避免了外界访问IIFE中的变量。

```javascript
var Module = (function(){
    var _private = "safe now";
    var foo = function(){
        console.log(_private)
    }

    return {
        foo: foo
    }
})()

Module.foo();
Module._private; // undefined
```

后来发现可以通过传入IIFE参数来引入依赖

```javascript
var Module = (function($){
    var _$body = $("body");     // we can use jQuery now!
    var foo = function(){
        console.log(_$body);    // 特权方法
    }

    // Revelation Pattern
    return {
        foo: foo
    }
})(jQuery)

Module.foo();
```

解决完作用域后，还要解决模块加载问题，原来的通过`script src`方法会导致需要根据依赖来排放。而且多个`script src`也会引起HTTP请求过多。难以维护！

之后，YUI3 Loader出现了，其中Y是一个沙箱，所以的依赖通过attach的方式被注入。

```javascript
// hello.js
YUI.add('hello', function(Y){
    Y.sayHello = function(msg){
        Y.DOM.set(el, 'innerHTML', 'Hello!');
    }
},'3.0.0',{
    requires:['dom']
})
// main.js
YUI().use('hello', function(Y){
    Y.sayHello("hey yui loader");
})
```

通过Combo来将多个对JS文件GET请求合并为一个。

后面出现了CommonJS用在nodejs中。CommonJS是**阻塞的依赖加载**，所以require()可以写在任意行。

```javascript
// math.js
exports.add = function(a, b){
    return a + b;
}
// main.js
var math = require('math')      // ./math in node
console.log(math.add(1, 2));    // 3
```

后面出现了AMD（async module definition，requireJS对模块定义的规范）和CMD（common module definition，SeaJS对模块定义的规范）

因为AMD是**异步加载**，所以需要等依赖被加载后再使用，需要将**依赖前置**。

```javascript
//AMD Wrapper
define(
    ["types/Employee"],  //依赖
    function(Employee){  //这个回调会在所有依赖都被加载后才执行
        function Programmer(){
            //do something
        };

        Programmer.prototype = new Employee();
        return Programmer;  //return Constructor
    }
)
```

CMD的依赖加载代码和CommonJS很像, 依赖延迟执行。

```javascript
// CMD recommanded
define(function(require, exports, module){
    var a = require("a");
    a.doSomething();
    var b = require("b");
    b.doSomething();    // 依赖就近，延迟执行
})
```

后面又出现了browserify，使得CommonJS能够用于浏览器环境。

之后出现了webpack。

webpack会根据文件类型，加载指定的loader。对于静态资源也能加载。

```javascript
// Ensure the stylesheet is loaded
require('./bootstrap.css');

// get a URL or DataURI
var myImage = document.createElement('img');
myImage.src = require('./myImage.jpg');
```

最后是ES6的import模块管理。

## Javascript事件委托

一般对于dom元素直接添加事件监听器就行，但是那样会出现比如一个ul下100个li都需要添加事件监听器，需要很多的内存。

事件委托使用事件冒泡来实现。（事件冒泡：事件从最里面的元素开始向外触发。事件触发：从外层元素向里触发）

可以使用event.stopPropagation()；来禁止事件继续传播。使用event.preventDefault()来禁止事件默认的处理行为。

```javascript
let ul = document.querySelector('#ss')
ul.onclick = function(event) {
	console.log(event)
}
```

根据事件冒泡的原理，当li被点中后，事件会向上冒泡到ul。同时event事件内包含一个target属性，用于指定当前触发的dom元素。可以根据这个元素的信息进行筛选，选出需要的节点，比如li节点。

```javascript
let ul = document.querySelector('#ss')
ul.onclick = function(e) {
  let target = e.target || e.srcElement
	if (target.nodeName == 'LI') {
		console.log('123')
	}
}
```
