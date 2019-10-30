#### 组件名：Mxcard

#### 属性值

**名称** | **描述** | **默认** |**可选值** | **类型**
:--:|:--:|:--:|:--:|:--:
className|-|-|（只能为）mx-card，别的值无效|-

#### 使用示例代码

```js
// pages/index/index.jsx
import { MxCard } from "../../components/common/Mxcard";
<MxCard className="mx-card">这里装的是卡片内容</MxCard>
//pages/index/index.css
.mx-card{
    margin:20px 10px 0 10px;
    border-radius: 20px;
}
```
