import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

function getTagProps(props){
    const actualProps = {
        time: props.timesrc,
    }
    switch(actualProps.timesrc){
        case 'true':
            actualProps.timesrc = 'inline-block'
            break
        case 'false':
            actualProps.timesrc= 'none'
            break
        default:
            actualProps.timesrc = 'none'
            break
    }
    return actualProps
}
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
            tagWidth,
            tagHeight,
            tagRadius,
            tagBorder,     
            timeGet,
        }=this.props
        const tagStyle={
            display:'inline-block',
            width:'${tagWidth}',
            height:'${tagHeight}',
            'border-radius':'${tagRadius}',
            border:'${tagBorder}',
        }
        const {
            timesrc
        }=getTagProps(this.props)
        var right = timeGet ? true : false;
        const timeStyle={
            display:'${timesrc}'
        }
        return (
            <View 
             style={tagStyle}
              onClick={this.onClick.bind(this)}   
            >
               <Text className='tagText'>{this.props.children}</Text> 
               {right&&<time style={timeStyle}>{timeGet}</time>}
            </View>
        )
    }
}
MuxiTag.defaultProps = {
    tagBorder: '1px solid black',
    tagRadius: '34px',
    tagWidth: '120pt',
    tagHeight: '30pt',
    timeGet:'',
    size:'normal',
    type:'',
    name:'',
    circle:false,
    active:false,
    disabled:false,
    onClick: () =>{},
}


