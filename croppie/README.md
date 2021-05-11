# Croppie
---

## 功能
上传图片，裁剪后合成海报。

## 依赖
开发：
1. vite
2. less

生产：
1. vuejs
2. croppie [链接](http://foliotek.github.io/Croppie/)

详见package.json

## 逻辑
上传：
1. 上传图片触发 new Croppie()对象，展示裁剪交互页面，通过bind将图片绑定到Croppie对象；
2. 裁剪交互页面支持旋转图片（调用rotate），完成裁剪等配置功能；
3. 调用result实现完成，返回一个promise对象，进行后续操作。

合成：
1. 初始化一个canvas
2. 遍历要绘制图片src的array
    1. 创建image对象，`new Image(); img.src = array[i]`
    2. 图片加载完成就绘制，`img.onload = () => {ctx.drawImg(...)}`
3. 绘制完的canvas保存下来

## demo

[https://adpaiprojects.thepaper.cn/h5-demo/croppie/index.html](https://adpaiprojects.thepaper.cn/h5-demo/croppie/index.html)