import Taro from "@tarojs/taro";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { View } from "@tarojs/components";
import MxComponent from "../../../common/component";

import "./index.scss";

export default class MxCard extends MxComponent {
  render() {
    const { customStyle, className, radius } = this.props;
    const rootStyle ={
        'bordder-rabius': `${Taro.pxTransform(parseInt(radius))}`,
    }
    return (
      <View className={classNames("card", className)} style={this.mergeStyle(rootStyle,customStyle)}>
        <View className='card-content'>{this.props.children}</View>
      </View>
    );
  }
}
MxCard.defaultProps = {
    customStyle: '',
    className: '',
    radius: '20',
  }
  
  MxCard.propTypes = {
    radius: PropTypes.string,
    customStyle: PropTypes.string,
    className: PropTypes.string,
}
