import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './MxRate.scss';

class MxRate extends Component {
  handleClick() {
    this.props.onChange(...arguments);
  }
  render() {
    const { value, readOnly } = this.props;

    const classNameArr = [];
    for (let i = 0; i < 5; i++) {
      if (value > i) {
        classNameArr.push('on');
      } else {
        classNameArr.push('off');
      }
    }
    const width = (parseFloat(value) * 30).toString() + 'rpx';
    const starStyle = {
      width: `${width}`
    };
    //有一个问题未解决：背景图片用空的紫星星加载不出来，只能用黑星星先替代一下
    return (
      <View className="box">
        {readOnly && (
          <View className="empty">
            <View className="full" style={starStyle}></View>
          </View>
        )}
        {!readOnly &&
          classNameArr.map((cls, i) => (
            <View
              className={cls}
              key={i}
              onClick={this.handleClick.bind(this, i + 1)}
            />
          ))}
      </View>
    );
  }
}

MxRate.defaultProps = {
  value: '0',
  readOnly: false,
  onChange: () => {}
};

export default MxRate;
