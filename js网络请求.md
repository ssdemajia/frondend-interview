
### Ajax

ajax有两种请求类型异步和同步模式，是在`xhrReq.send(methods, urls, async, user, password)`中async定义，如果为false，那么send只会在收到答复后返回。

**XMLHttpRequest.readyState 状态**

| Value | State              | Description                           |
| ----- | ------------------ | ------------------------------------- |
| `0`   | `UNSENT`           | xhr被创建. `open()` 还没调用.         |
| `1`   | `OPENED`           | `open()` 被调用.                      |
| `2`   | `HEADERS_RECEIVED` | `send()` 已经调用, header和status可用 |
| `3`   | `LOADING`          | 下载中; `responseText` 有部分数据     |
| `4`   | `DONE`             | 操作已经完成                          |

**处理发送二进制数据：**

```js
var oReq = new XMLHttpRequest();

oReq.onload = function(e) {
  var arraybuffer = xhr.response; // not responseText
  /* ... */
}
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";
oReq.send();
```

**监控发送进度：**

需要在open前添加事件处理函数

```js
var req = new XMLHttpRequest();
req.addEventListener("progress", updateProgress, false);
req.addEventListener("load", transferComplete, false);
req.addEventListener("error", transferFailed, false);
req.addEventListener("abort", transferCanceled, false);
req.open();
// progress on transfers from the server to the client (downloads)
function updateProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = evt.loaded / evt.total;
    ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}
function transferComplete(evt) {
  alert("The transfer is complete.");
}
function transferFailed(evt) {
  alert("An error occurred while transferring the file.");
}
function transferCanceled(evt) {
  alert("The transfer has been canceled by the user.");
}
```

### Fetch

当接收到一个代表错误的 HTTP 状态码时，从 `fetch()`返回的 Promise **不会被标记为 reject，** 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve， 仅当网络故障时或请求被阻止时，才会标记为 reject。
**Fetch 请求默认是不带cookie的**，需要设置 fetch(url, {credentials: 'include'})

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

fetch的第二个参数可以配置

```javascript
function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}
```

上传文件：

通过html的`<input type="file" />`

```js
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
```


### jsonp

通过script标签的src属性进行跨域。

**不足：**由于使用的src属性，所以请求是GET方法，而且不能定制请求头。

在前端部分通过创建一个script元素，其src为需要传入信息的回调函数，因为在script加载后会执行里面的代码，这样会调用回调函数。

**下面是jsonp的前端代码：**

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script>
    function jsonp(req) {
      let script = document.createElement('script');
      script.src = req.url + '?callback=' + req.callback.name;
      document.getElementsByTagName('head')[0].appendChild(script)
    }
    function hello(data) {
      console.log('hello:', data)
    }
    jsonp({
      url: '127.0.0.1',
      callback: hello
    })
  </script>
</body>
</html>
```

script加载完成后会调用hello().

**下面是支持jsonp的服务器代码：**

```javascript
let http = require('http')
let urllib = require('url')
let fs = require('fs');

let port = 8080
let data = {'data': 'shaoshuai'}

http.createServer((req, res) => {
  let params = urllib.parse(req.url, true)
  if (params.query.callback) {
    let ret = params.query.callback + '(' + JSON.stringify(data) + ')';
    res.end(ret);
  } else {
    res.setHeader("Content-Type","text/html;charset='utf-8'");
    fs.readFile("./test.html", "utf-8", (err, data) => {
      res.end(data)
    })
  }
}).listen(port, () => {
  console.log('servering...')
})
```
