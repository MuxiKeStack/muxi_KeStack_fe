import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'


export default class MxFab extends Component { // 名字是 MxFab，文件夹的名字也改一下，MuxiFab -> MxFab, readme 改成 README


  onClick=()=> {
    this.props.onClick && this.props.onClick(...arguments) // 这边有了defaultProps，是空函数，所以就算用户没有给，调空函数也不会报错，所以不用判断空。然后不用 bind this, 用下面我注释掉的写法就行 
  }

  // onClick = () => {
  //   this.props.onClick()
  // }

  render() {
    const {
      fabtext,
    } = this.props
    
    return (
      <View
        className='muxi-fab'
        onClick={this.onClick.bind(this)}
      >
        {fabtext}
      </View>
    )
  }
}
MxFab.defaultProps = { // 这边不需要的 props 删掉
  fabtext: '评课',
  onClick: () => { },
}