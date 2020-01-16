import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

export default class MxFab extends Component {
  onClick() {
    // eslint-disable-next-line no-undef
    if (this.props.back) {
      this.BacktoTop.bind(this);
    } else {
      // eslint-disable-next-line no-undef
      this.props.onClick && this.props.onClick(...arguments);
    }
  }

  BacktoTop() {
    Taro.pageScrollTo({
      scrollTop: 0
    });
  }

  render() {
    return (
      <View className="muxi-fab" onClick={this.onClick.bind(this)}>
        {this.props.children}
      </View>
    );
  }
}
MxFab.defaultProps = {
  back: false,
  onClick: () => {}
};
