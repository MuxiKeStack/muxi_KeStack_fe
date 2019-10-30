import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import MxComponent from "../../../common/component";

import "./index.scss";

export default class MxCard extends MxComponent {
  static options = {
    addGlobalClass: true
  }
  render() {
    return (
      <View className='muxi-card'>
        <View className='mx-card'>{this.props.children}</View>
      </View>
    );
  }
}
