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
            width,
            height,
            border,
            borderRadius,
            font,
            color,
        }=this.props;
        const tag={
            tagStyle:{
                width: `${width}`,
                height: `${height}`,
                border: `${border}`,                
                borderRadius: `${borderRadius}`,
                'text-align': 'center',
            },
            content:{
                'font-size':`${font}`,
                'font-color':`${color}`,
                'line-height': `${height}`,
            },
            
        }
    
        return (
            <View 
            style={tag.tagStyle}
            onClick={this.onClick.bind(this)}   
            className={classNames({
                'tag-checked': this.state.ifChecked && this.props.checkable
            })}

            >
               <View style={tag.content}>{this.props.children}</View>
            </View>
        )
    }
}

MxTag.defaultProps = {
    width:'120px',
    height:'30px',
    border:'1px solid black',
    borderRadius:'34px',
    color:'',
    font:'',
    checkable: false,
    checked: false,
    onClick: () =>{},
  }
  


