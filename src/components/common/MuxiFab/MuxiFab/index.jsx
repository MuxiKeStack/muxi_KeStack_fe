import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'


export default class MuxiFab extends Component {
  constructor (){
    super(...arguments)
    this.state ={
      fabtext:'评课'
  }
}
   
  
    onClick () {
      this.props.onClick && this.props.onClick(...arguments)
    }
  
    render () {
      const { 
        size
       } = this.props
    
      return (
        <View className='muxi-fab'
          onClick={this.onClick.bind(this)}
        >{this.props.children}
        </View>
      )
    }
}
MuxiFab.defaultProps = {
    size: 'normal',
    onClick: () => {},
}