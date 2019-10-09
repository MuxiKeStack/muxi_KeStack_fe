import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class MuxiFab extends Component {
    onClick () {
      this.props.onClick && this.props.onClick(...arguments)
    }
  
    render () {
      const { size } = this.props
      
      return (
        <View 
          onClick={this.onClick.bind(this)}
        >{this.props.children}</View>
      )
    }
}
MuxiFab.defaultProps = {
    size: 'normal',
    onClick: () => {},
}