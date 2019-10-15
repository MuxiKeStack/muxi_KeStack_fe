
#### 组件名：MxInput
#### input中的图标

**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
leftSize | 左边图标的宽、高度（宽 = 高） | 30px | |String
rightSize | 右边图标的宽、高度（宽 = 高）| 30px | | String
leftSrc | 左端图标的src |无 | | String
rightSrc | 右端图标的src| 无| | String
#### input本身
**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
type | input类型 | text | 所有input自带的类型 | String
width | 整个input（包含icon的宽度）| 250px | | String
height | input高度 | 30px | | String
placeholder | input框中提示词 | 无 | | String
border | 是否显示下划线（下划线宽度是input的宽度） |false | true && false | Bool
background|input框（包括icon）的背景颜色 |#FFFFFF | |String |
radius |圆角角度 |无| |String 

#### input事件
**名称** | **描述** | **返回参数** | **类型** 
:--:|:--:|:--:|:--:
onChange|输入框值改变时触发的事件，开发者需要通过 onChange 事件来更新 value 值变化，onChange 函数必填。小程序中，如果想改变 value 的值，需要 return value 从而改变输入框的当前值, 可以获取 event 参数|(value,event) => void|Function
onFocus|输入框被选中时触发的事件，可以获取 event 参数|(value,event) => void|Function
onBlur|输入框失去焦点时触发的事件，可以获取 event 参数|(value,event) => void|Function
onConfirm|点击完成按钮时触发，可以获取 event 参数|(value,event) => void|Function