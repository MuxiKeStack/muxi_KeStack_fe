import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class MuxiTag extends Component{
    constructor (){
        super(...arguments)
        this.state ={
            tagList: [
                { name: '简单易学', active: false },
                { name: '老师温柔', active: false },
                { name: '干货满满', active: false },
                { name: '作业量少', active: false },
                { name: '生动有趣', active: false },
                { name: '云课堂资料全', active: false }
              ],
        }
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
        }=this.props
        return (
            <View className='muxi-tag'
              onClick={this.onClick.bind(this)}   
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
