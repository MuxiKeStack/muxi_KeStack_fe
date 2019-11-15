import Taro from "@tarojs/taro";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { View } from "@tarojs/components";
import MxComponent from "../../../common/component";

import "./index.scss";

export default class MxCard extends MxComponent {
  render() {
    const { className } = this.props;
    return (
      <View className={classNames("muxi-card", className)}>
        <View className='card-content'>{this.props.children}</View>
      </View>
    );
  }
}

MxCard.defaultProps = {
  className: '',
}

MxCard.propTypes = {
  className: PropTypes.string,
}
