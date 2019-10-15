#### 组件名：MxIcon

**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
type|图标的类型|-|参考下表|string
width|图标的宽度|40|-|string
height|图标的高度|40|-|string
customStyle|支持在js使用内联样式，优先级customStyle大于className和default
className|支持自定义样式

#### type表

名称|描述（放图有点麻烦，将就一下）
:--:|:--:
add| +号图标
avatar| 初次登陆页面的头像
check| √ 勾
cmmtBtn| 评论的icon
cmmtSq|  tabbar的评课广场 紫色
cmmtSqG| tabbar的评课广场 灰色
cross| （外包裹了圈的）×，在登陆输入框时用到
hollowC| ○
largeC| ○
likeBtn| 点赞
search| 🔍
sHelper| tabbar的选课助手 紫色
sHelperG| tabbar的选课助手 灰色
solidC | ◎
solidS | ★
triangle | ▲ 不过是倒着的
useInf | tabbar的个人主页 紫色
useInfG | tabbar的个人主页 灰色

#### 示例代码

```js
// pages/index/index.jsx
import { MxIcon } from "../../components/common/icon";
<MxIcon  type='add' width='20'></MxIcon>
```
