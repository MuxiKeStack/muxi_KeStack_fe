import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class MxTag extends Component{
    onClick () {
        this.props.onClick && this.props.onClick(...arguments)
      }
    render (){
        const{ className }=this.props;
            <View 
            className={classNames("muxi-tag", className)}
            onClick={this.onClick.bind(this)}   
            >
               <View className='tag-content'>{this.props.children}</View>
            </View>
        
    }
}
MxTag.defaultProps = {
    onClick: () =>{},
}


