
#### 组件名：MuxibuttonN
#### button本身
**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
buttonWidth | 整个button宽度 | 513rpx | | String
buttonHeight | button高度 | 92rpx | | String
buttonBackground|button框的背景颜色 |#9255B9 | |String |
border-radius |圆角角度 |46rpx| |String 

#### 当需要icon的button
**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
buttonWidthI | 整个button宽度 | 0 | | String
buttonHeightI | button高度 | 0 | | String
src  | 图片的src | 无 | | String
padding | button与图标的内距离 | 0 | | string

#### 当需要icon的Image
**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
buttonWidthI | 整个button宽度 | 0 | | String
buttonHeightI | button高度 | 0 | | String
src  | 图片的src | 无 | | String
imageWidth | 图标宽度 | 30px | | String
imageHeight | 图标高度 | 30px | | String

#### button事件
**名称** | **描述** | **返回参数** | **类型** 
:--:|:--:|:--:|:--:
onClick|点击按钮时触发，可以获取 event 参数|(value,event) => void|Function