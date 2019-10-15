#### 组件名：Mxcard

#### 属性值

**名称** | **描述** | **默认** |**可选值** | **类型**
:--:|:--:|:--:|:--:|:--:
radius|边框圆角值|20|数字|string
className|
customStyle|内联样式（可选）
备注：padding，margin是有预设值，但由于上下左右的padding都可能不一样，就不同过传递参数了，自己用className或customStyle重定义
所以与预设值不同时，这个card组件也没什么用的必要

#### 使用示例代码

```js
// pages/index/index.jsx
import { MxCard } from "../../components/common/card";
<MxCard>这里装的是卡片内容</MxCard>；
    //padding: 28px 92px 48px 35px;
    //margin: 37px 18px 0 21px;
//
```
