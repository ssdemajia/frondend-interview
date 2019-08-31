# Vue

## vue virtual dom 以及diff算法

Virtual dom是Vue使用Object对象模拟DOM节点，再使用特殊的render方法将其渲染成真实的DOM节点.

![vueDiff](vueDiff.png)

diff算法只会在同层级比较，比较后出现四种情况：

1. 当前节点被删除或添加。
2. 节点属性是否被修改。
3. 文本内容被修改。
4. 节点被整个替换。

## 生命周期函数

vue的生命周期函数 ![Vue.js Component Lifecycle Diagram](vue-lifecycle.png)

生命周期钩子函数：

1. beforeCreate：组件实例刚被创建，组件属性计算之前。

2. created：组件实例创建完成，属性已经绑定，但Dom还未生成，$el属性不存在。

3. beforeMount：模版编译/挂载前。

4. mounted：模版编译/挂载后。

5. beforeUpdate：组件更新前。

6. updated：组件更新后。

7. activated：用于keep-alive，组件被激活时调用。

8. deactivated：用于keep-alive，组件被移除时调用。

9. beforeDestroy：组件销毁前调用。

10. destroyed：组件销毁后调用。

## Vue Watcher

在Vue 的watch里面如果要访问vue对象的元素就不能使用剪头函数，因为箭头函数会将this绑定到parent context，这个context是不可知的，所以this有可能是undefined。

```javascript
watch: {
  propShow: {
    handler: function(val, oldVal) {
      this.show = val;
    }
  }
}
```

## Vue组件渲染过程

首先是调用子组件的mounted，然后再调用父组件的mounted，是一个后序遍历。befordestroyed会先调用父组件的beforeDestroyed然后调用子组件的，是先序遍历。



## vue watch与computed的区别

1. watch和computed都是对每个定义的属性单独建立了一个Watcher对象。

2. computed对属性getter执行后会进行缓存，因此计算依赖多个值时，computed更方便；

3. watch在监听的值发生变化时会执行回调函数，因此如果需要新旧值对比或者需要对值变化时执行其他函数，watch更加适合。
