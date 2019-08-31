
## Javascript懒加载、预加载

懒加载：只有当元素可见的时候在加载

handle使用onscroll来实现，同时使用节流函数，window.innerHeight获得窗口大小，然后比对元素是否已经在窗口下。

```javascript
<!DOCTYPE html>
<html lang="en">
<style>
  img {
    height: 200px;
    width: 200px;
    display: block;
    border: 1px solid yellowgreen;
  }
</style>

<body>
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
    <img data-origin="1.png">
  <script>
    function throttle(fn, timeout) {
      let before = +new Date;
      return function() {
        let cur = +new Date;
        if (cur - before > timeout) {
          fn.call(null, arguments);// fn(...arguments);
          before = cur;
        }
      }
    }
    const imgs = document.querySelectorAll('img');
    const heigt = window.innerHeight; // 获取视窗高度
    // document.body.clientHeight; 文档的高度
    let curIndex = 0;
    document.addEventListener('scroll', throttle(handle, 200)); // 关键在于document的scroll事件
    
    function handle(e) {
      imgs.forEach((img, index) => {
        if (index < curIndex) return;
        const rect = img.getBoundingClientRect();
        if (rect.top < heigt) {
          img.src = img.dataset.origin
          curIndex = index;
        }
      })
    }
    handle();
  </script>
</body>
</html>
```

也可以使用insersectionObserver来帮你监控是否目标已经在可视范围

```javascript
  <script>
    const imgs = document.querySelectorAll('img');
    const height = window.innerHeight;
    const observer = new IntersectionObserver(entries => {
       entries.forEach(entry => {
         if (height > entry.boundingClientRect.top) {
           let img = entry.target;
           img.src = img.dataset.origin;
           observer.unobserve(img); // 不需要在监控了
         }
       })
    });    
    imgs.forEach(img => {
      observer.observe(img);
    });
  </script>
```

IntersectionObserver API 支持容器内滚动。`root`属性指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。

```javascript
var opts = { 
  root: document.querySelector('.container'),
  rootMargin: "500px 0px" 
};

var observer = new IntersectionObserver(
  callback,
  opts
);
```

预加载：预先加载需要的资源、减少用户等待时间
