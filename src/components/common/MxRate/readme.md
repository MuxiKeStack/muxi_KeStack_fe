#### 组件名：MxRate
**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
score|课程评分（只读状态下可选)|0|0-5|Number
value|当前评分（评论状态下可选)|0|0-5|Number
show|是否显示分数（只读状态下可选）| false | true & flase |Bool
commont|是否可以评分| flase | true & false | Bool
onChange|输入框值改变时触发的事件，开发者需要通过 onChange 事件来更新 value 值变化|||Function
size|评分星星大小|||String