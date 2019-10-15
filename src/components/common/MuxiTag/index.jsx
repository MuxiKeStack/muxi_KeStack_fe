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
            tagWidth,
            tagHeight,
            tagRadius,
            tagBorder,     
            timeGet,
            timeSize,
            textAglin,
            textSize,
        }=this.props
        const css={
        tagStyle:{
            display:`inline-block`,
            width:`${tagWidth}`,
            height:`${tagHeight}`,
            'border-radius':`${tagRadius}`,
            border:`${tagBorder}`,
            },
         right:{
            'font-size':`${timeSize}`,
            float: 'right',
            display:`${timesrc}`,
            },
         textStyle:{
             'font-size':`${textSize}`,
             'text-aglin':`${textAglin}`,
         },
        }
        const {
            timesrc
        }=getTagProps(this.props)
        var right = timeGet ? true : false;
        return (
            <View 
             style={css.tagStyle}
              onClick={this.onClick.bind(this)}   
            >
               <Text style={css.textStyle} >{this.props.children}</Text> 
               {right&&<Time style={css.right}>{timeGet}</Time>}
            </View>
        )
    }
}
MuxiTag.defaultProps = {
    tagBorder: '1px solid black',
    tagRadius: '34px',
    tagWidth: '120pt',
    tagHeight: '30pt',
    timeSize:'15pt',
    timeGet:'',
    textSize:'15pt',
    textAglin:'center',
    onClick: () =>{},
}


