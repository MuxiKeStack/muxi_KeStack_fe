import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'


export default class MuxiFab extends Component {
  
  
    onClick () {
      this.props.onClick && this.props.onClick(...arguments)
    }
  
    render () {
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
      const fabStyle={
        width:`${fabWidth}`,
        height:`${fabHeight}`,
        border:`${fabBorder}`,
        'border-radius':`${fabRadius}`,
        'font-size':`${fabSize}`,
        'text-aglin':`${fabAglin}`,
        'line-height':`${fabLine}`,
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
MuxiFab.defaultProps = {
    fabLine:'90px',
    fabSize:'40px',
    fabAglin:'center',
    fabtext:'评课',
    fabWidth:'100px',
    fabHeight:'100px',
    fabBorder:'2px solid black',
    fabRadius:'100px',
    onClick: () => {},
}