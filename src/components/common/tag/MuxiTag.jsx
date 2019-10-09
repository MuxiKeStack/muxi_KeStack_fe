import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import './MuxiTag.scss'

export default class MuxiTag extends Component{
    constructor (){
        super(...arguments)
        this.state ={}
    }
    onClick () {
        if (!this.props.disabled) {
          this.props.onClick && this.props.onClick({ name: this.props.name, active: this.props.active })
        }
    }
    render (){
        const {
            size='normal',
            type='',
            circle=false,
            disabled=false,
            active=false,
            tagStyle,
        }=this.props
       
        return (
            <View 
              onClick={this.onClick.bind(this)}
              style={tagStyle}
            >
                {this.props.children}
            </View>
        )
    }
}
MuxiTag.defaultProps = {
   
    
    size:'normal',
    type:'',
    name:'',
    circle:false,
    active:false,
    disabled:false,
    tagStyle:{},
    onClick: () =>{},
}
