
# CSS

## CSS基础

### display: none和visibility:hidden

display:none表示这个tag不会出现在页面上（但是可以使用dom交互），在页面上没有它的空间。

visibility:hidden表示这个tag不可见，但是空间会给他分配。

### a标签伪类排序

`:link -> :visited -> :hover -> :active`

link是未访问状态，因此它是第一个，即它可以变为visited、hover、active状态。

visited是访问过的状态，它不能再变为未访问，但是可以hover和active切换样式。

hover是移动到a标签上时激活，它可以通过点击变为active状态。

active是鼠标选定时的样式，它不能再变为其他状态。

### IE盒模型与标准盒模型

标准盒模型中一个块级元素的height和width只能设置content区域，此时这个元素在页面的大小等于content的height加padding加border，这也是box-sizing这个属性的box-sizing: content-box;

box-sizing还有一个属性是border-box，设置后border和padding会被包含进height中一起计算。那么内容content的高宽就要剪去border和padding。老的IE也就是这个border-box的模型。

### Position、Display、Float

参考 https://medium.com/@mautayro/understanding-css-position-display-float-87f9727334b2

Position是一个元素在页面中相对于其他元素是怎么定位的，共有5种：

static：默认的。

relative：有left、right、top、bottom等属性，不会脱离原先的文档流。

absolute：和relative类似，相对于第一个非static父元素进行定位，原来的位置会被人取代。

fixed：相对于window进行定位。

sticky：一开始是relative定位，然后在滑动到边缘后就固定了。



Display是一个元素被创建出来后是一个盒子，然后应该怎么显示在页面上。

block：元素开始于一个新行，占据整行宽度`<div>, <p>, <h1>-<h6>, <ul>, <li>, & <canvas>`。

Inline：元素可以从任意行的位置开始，height、width不再有用。`<span>, <input>, <button>, <img>`

grid：元素表现为块级元素，内部使用grid layout。

flex：元素表现为块级元素，内部使用flex layout。

inline-block：元素表现为inline元素，但是有height、width。

none：移除这个元素。



Float默认无浮动，

### webfont

使用font-face下载字体

```css
@font-face {
  font-family: "myFont";
  src: url("myFont.ttf");
}
html {
  font-family: "myFont", "Bitstream Vera Serif", serif;
}
```

### 堆叠上下文（层叠上下文）z-index

层叠a上下文是html元素的三维空间，div的渲染顺序受到z-index的影响

## CSS实现元素水平居中

### 1. 行内元素

常用行内元素：`a/img/input/span`等。水平居中使用对父类设置`text-align:center`

### 2. 块级元素

常用的块级元素为`div/table/ul/dl/form/h1/p`等。分为下面几种情况：

* 等宽的块级元素，可以设置`margin:20px auto;`来实现居中
* 不等宽元素，如分页导航页面，使用：
  * 加入`table标签`，在需要居中的元素外面添加一个table包含，然后再对table设置`margin: 20px auto;` 增加了无语义html标签，增加了嵌套深度。
  * 将块级元素变为`display:inline`或者`display:inline-block`，然后在父元素使用`text-align:center`，来让该元素能够居中。
  * 设置父元素`display:flex`，然后设置`justify-content: center`

## float属性

float CSS属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。**该元素从网页的正常流动(文档流)中移除**，尽管仍然保持部分的流动性（与[绝对定位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position#Absolute_positioning)相反）。

### float元素如何定位？

当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到**另外一个浮动的元素**。

### 清除浮动

当应用于非浮动块时，它将非浮动块的[边框边界](https://developer.mozilla.org/en-US/docs/CSS/box_model)移动到所有相关浮动元素[外边界](https://developer.mozilla.org/en-US/docs/CSS/box_model)的下方。这个非浮动块的[垂直外边距](https://developer.mozilla.org/en-US/docs/CSS/margin_collapsing)会折叠。

**如果一个元素里只有浮动元素，那它的高度会是0。**如果你想要它自适应即包含所有浮动元素，那你需要清除它的子元素。一种方法叫做**clearfix**，即`clear`一个不浮动的 [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after) [伪元素](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)。

## CSS单位

px：像素，是一种绝对单位。

pt：点，一英尺的1/72 长度，也是绝对单位。

em：1em与当前字体大小相等。注意⚠️em会继承父元素的字体大小，常用的相对单位。

ex：小写字母x的高度。

ch：小写字母0的高度。

rem：功能与em相同，但是等于默认基础字体大小，继承的字体将不起作用。

vh、vw：分别是视窗高度的1/100和视窗宽度的1/100，视窗指的是浏览器网站可见部分

vmin、vmax：	1vmax在横向模式等于1vw，在纵向模式等于1vh。



## CSS 动画

### scale

CSS 函数 `scale()` 用于修改元素的大小。可以通过向量形式定义的缩放值来放大或缩小元素，同时可以在不同的方向设置不同的缩放值。

## CSS 布局

### flex弹性布局

参考 https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox

弹性布局（flex）是一个一维布局，弹性布局的子元素可以在任意方向弹性伸缩其尺寸。

使用`display:flex`将元素变为弹性容器，子项成为弹性项。

弹性布局两个轴线：主轴和交叉轴。

![](/Users/shaoshuai/OneDrive/notes/frontend/flex axis.png)

![](/Users/shaoshuai/OneDrive/notes/frontend/flex cross axis.png)

flex根据轴来对齐元素。

flex容器默认属性：

1. 元素排列为一行。
2. 元素从主轴的起始处开始。
3. 元素不会在主轴拉伸，但会缩小。
4. 元素会在交叉轴方向拉伸（上下拉伸）。
5. flex-basis为auto，也就是宽度为内容宽度。
6. flex-wrap:nowrap，不允许换行。

针对容器：

1. 使用`justify-content:space-between`将子元素之间主轴空间均匀分配。
2. `align-items:stretch`，默认值，会在交叉轴方向拉伸子元素的高度，`align: flex-start`会将子元素按flex容器顶部对其。
3. `flex-direction: column;`，默认是row，按照列（行）的方向排列。
4. `flex-wrap:wrap;`子元素宽度超过父元素宽度时会换行，如果flex容器有高度限制，那么子元素的高度也会被压缩。
5. 可以用`flex-flow`来替换`flex-direction flex-wrap`.
6. `justify-content`，在主轴方向对齐子元素， `justify-content: flex-start`在主轴前部对齐子元素，`justify-content: space-around`使每个子元素左右空间一致。

针对子项：

1. `flex-glow`：这个子元素能够伸长多少positive free space，设置这个属性的子元素会参与空白空间的分配，按照值大小按比例分配。
2. `flex-shrink`：这个子元素能收缩多少空间。
3. `flex-basis:200px;`设置子元素初始宽度，也就是未被伸长收缩之前的长度。

这三个属性可以统一写为`flex: 2 1 auto;`，这三个属性主要针对white space（空白区域）的分配，如果希望子元素能够按照一定比例扩展这些空白空间。

flex固定值：initial（相当于flex: 0 1 auto;）、auto（相当于flex:1 1 auto;）、none（相当于flex: 0 0 auto）



flex子元素的宽度计算：在css中有两种宽度计算min-content、max-content

flex宽度计算： https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax

`flex: 1 1 0;`这个设置会忽略`flex-basis`不将其计算进去，那么每个元素的宽度就会相等。

## CSS 布局
### 实现盒内元素居中
使用felx的align-items对主轴进行对齐，justify-content对交叉轴进行对齐。
```css
.container {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item {
    width: 10em;
}
```
```html
<div class="container">
  <div class="item">I am centered!</div>
</div>    
```