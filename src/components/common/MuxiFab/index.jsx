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
        fabWidth,
        fabHeight,
        fabBorder,
        fabRadius
       } = this.props
      const fabStyle={
        width:`${fabWidth}`,
        height:`${fabHeight}`,
        border:`${fabBorder}`,
        'border-radius':`${fabRadius}`,
      }
      return (
        <View 
          style={fabStyle}
          className='muxi-fab'
          onClick={this.onClick.bind(this)}
        >
          {this.props.children}
        </View>
      )
    }
}
MuxiFab.defaultProps = {

    fabWidth:'100px',
    fabHeight:'100px',
    fabBorder:'2px solid black',
    fabRadius:'100px',
    onClick: () => {},
}