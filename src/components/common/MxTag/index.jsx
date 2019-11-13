<<<<<<< HEAD
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

export default class MxTag extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      ifChecked: this.props.checked
    };
  }

  onClick() {
    if (this.props.checkable) {
      this.setState({
        ifChecked: !this.state.ifChecked
      });
    }
    this.props.onClick();
  }

  render() {
    const {
      // height,
      display,
      font,
      color,
      padding
    } = this.props;
    const tag = {
      tagStyle: {
        // height: `${height}`,
        display: `${display}`,
        // 'border-radius': `${Taro.pxTransform(parseInt(height)/2)}`,
        'font-size': `${font}`,
        color: `${color}`,
        padding: `${padding}`
      }
    };

    return (
      <View
        style={tag.tagStyle}
        onClick={this.onClick.bind(this)}
        className={classNames({
          'tag-checked': this.state.ifChecked && this.props.checkable,
          'tag-unchecked': !this.state.ifChecked && this.props.checkable
        })}
      >
        {this.props.children}
      </View>
    );
  }
}

MxTag.defaultProps = {
  padding: '3px 6px 3px 6px',
  // height:'30px',
  display: 'inline-block',
  color: '',
  font: '24px',
  checkable: false,
  checked: false,
  onClick: () => {}
};
=======
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
            //height,
            display,
            font,
            padding,
            borderRadius,
        }=this.props;
        const tag={
            tagStyle:{
                //height: `${height}`,
                display: `${display}`,                
                'border-radius': `${borderRadius}`,
                'font-size':`${font}`,
                padding:`${padding}`,
            },     
        }
    
        return (
            <View 
            style={tag.tagStyle}
            onClick={this.onClick.bind(this)}   
            className={classNames(
            {'tag-checked': this.state.ifChecked && this.props.checkable,
            'tag-unchecked': !this.state.ifChecked && this.props.checkable
            })}
            >
               {this.props.children}
            </View>
        )
    }
}

MxTag.defaultProps = {
    padding:'3px 6px 3px 6px',
    // height:'30px',
    display:'inline-block',
    font:'18px',
    borderRadius:'18rpx',
    checkable: false,
    checked: false,
    onClick: () =>{},
  }
  


>>>>>>> da0a46e5458471fd1cced4b70db70e0573bf91d8
