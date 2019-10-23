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
        const{ className }=this.props;
        return (
            <View 
            className={classNames("muxi-tag", className)}
            onClick={this.onClick.bind(this)}   
            >
               <View className='tag-content'>{this.props.children}</View>
            </View>
        );
    }
}

MxTag.defaultProps = {
    className: '',
    onClick: () =>{},
  }
  
MxTag.propTypes = {
    className: PropTypes.string,
}
  


