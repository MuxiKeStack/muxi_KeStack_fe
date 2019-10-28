import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from "classnames";
import PropTypes from 'prop-types';
import './index.scss'

export default class MxTag extends Component{
    onClick () {
        this.props.onClick && this.props.onClick(...arguments)
      }
    render (){
        const{ 
            width,
            height,
            border,
            radius,
            font,
            color,
            line,
            align,
        }=this.props;
        const{
            backcolor=backcolor?'#F2F1F6':'#6868F8'
        }=this.props;
        const tag={
            tagStyle:{
                width: `${width}`,
                height: `${height}`,
                border: `${border}`,                
                'border-radius': `${radius}`,
                'background-color':`${backcolor}`,
            },
            content:{
                'font-size':`${font}`,
                color:`${color}`,
                'line-height':`${line}`,
                'text-align':`${align}`,

            },
            
        }
    
        return (
            <View 
            style={tag.tagStyle}
            onClick={this.onClick.bind(this)}   
            >
               <View style={tag.content}>{this.props.children}</View>
            </View>
        )
    }
}

MxTag.defaultProps = {
    width:'300rpx',
    height:'60rpx',
    border:'1px solid #F2F1F6',
    radius:'34rpx',
    color:'#A2A2A2',
    font:'32rpx',
    line:'60rpx',
    align:'center',
    backcolor:'#F2F1F6',
    onClick: () =>{},
  }
  


