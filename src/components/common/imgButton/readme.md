
#### 组件名：MuxibuttonI（图标按钮）
#### button-image本身(图标按钮)
**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
imageWidth | 图标宽度 | 30px | | String
imageHeight | 图标高度 | 30px | | String

#### button本身
**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
buttonWidth | 整个button宽度 | 513rpx | | String
buttonHeight | button高度 | 92rpx | | String
padding | button与图标的内距离 | 0 | | string

#### button事件
**名称** | **描述** | **返回参数** | **类型** 
:--:|:--:|:--:|:--:
onClick|点击按钮时触发，可以获取 event 参数|(value,event) => void|Function