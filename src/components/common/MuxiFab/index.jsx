import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'


export default class MuxiFab extends Component { // 名字是 MxFab，文件夹的名字也改一下，MuxiFab -> MxFab, readme 改成 README


  onClick() {
    this.props.onClick && this.props.onClick(...arguments) // 这边有了defaultProps，是空函数，所以就算用户没有给，调空函数也不会报错，所以不用判断空。然后不用 bind this, 用下面我注释掉的写法就行 
  }

  // onClick = () => {
  //   this.props.onClick()
  // }

  render() {
    const {
      fabWidth,
      fabHeight,
      fabBorder,
      fabRadius,
      fabtext,
      fabSize,
      fabAglin,
      fabLine,
    } = this.props
    const fabStyle = {  // 不要用这么多的 props 属性。就给外面一个 className 的 props。他可以传一个类名进来，参考 MxCard。他想改什么样式就他自己覆盖就行。
      // 这边这些默认的样式都写到 css 里面去
      width: `${fabWidth}`,
      height: `${fabHeight}`,
      border: `${fabBorder}`,
      'border-radius': `${fabRadius}`,
      'font-size': `${fabSize}`,
      'text-aglin': `${fabAglin}`,
      'line-height': `${fabLine}`,
    }
    return (
      <View
        style={fabStyle}
        className='muxi-fab'
        onClick={this.onClick.bind(this)}
      >
        {fabtext}
      </View>
    )
  }
}
MuxiFab.defaultProps = { // 这边不需要的 props 删掉
  fabLine: '90px',
  fabSize: '40px',
  fabAglin: 'center',
  fabtext: '评课',
  fabWidth: '100px',
  fabHeight: '100px',
  fabBorder: '2px solid black',
  fabRadius: '100px',
  onClick: () => { },
}