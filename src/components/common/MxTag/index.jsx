import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from "classnames";
import PropTypes from 'prop-types';
import './index.scss'

export default class MxTag extends Component{
    constructor() {
        super(...arguments)
        this.state = {
          ifChecked: this.props.checked
        }
      }
    onClick () {
        if(this.props.checkable){
            this.setState({
                ifChecked: !this.state.ifChecked
              })
        }
        this.props.onClick()
      }


    render (){
        const{ 
            display,
            font,
            width,
            height,
            borderRadius,
            padding,
            lineHeight,
            checked,
            checkable,
        }=this.props;
        const tag={
            tagStyle:{
                display: `${display}`,                
                'border-radius': `${borderRadius}`,
                'line-height':`${lineHeight}`,
                'font-size':`${font}`,
                width:`${width}`,
                height:`${height}`,
                padding:`${padding}`,
            },     
        }
    
        return (
            <View 
            style={tag.tagStyle}
            onClick={this.onClick.bind(this)}   
            className={classNames(
            {'tag-checked': this.state.ifChecked && this.props.checkable,
            'tag-unchecked': !this.state.ifChecked && this.props.checkable,
            'tag-uncheckable': !this.props.checkable
            })}
            >
               {this.props.children}
            </View>
        )
    }
}

MxTag.defaultProps = {
    width:'222rpx',
    height:'60rpx',
    lineHeight:'40rpx',
    padding:'31rpx 32rpx 10rpx 32rpx',
    display:'inline-block',
    font:'28rpx',
    borderRadius:'34rpx',
    checkable: false,
    checked: false,
    onClick: () =>{},
  }
  


