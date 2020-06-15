import Taro, { Component } from '@tarojs/taro';
import { View, Textarea, Text, ScrollView } from '@tarojs/components';
import './index.scss';
import MxIcon from '../../components/common/MxIcon/index';

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: 'parent'
    };
  }
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50
  };
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }

  componentDidMount() {}
  onPullDownRefresh() {
    console.log('pull down refresh');
  }
  onReachBottom() {
    console.log('reach bottom');
  }
  componentWillUnmount() {}

  componentDidHide() {}
  render() {
    const res = Taro.getSystemInfoSync();
    const point = (res.screenWidth / 750) * 50;
    const radiusOut = (res.screenWidth / 750) * 50;
    const radiusIn = (res.screenWidth / 750) * 48;
    function drawSector(beginAngle, finishAngle, color, ctx) {
      ctx.beginPath();
      ctx.arc(
        point,
        point,
        radiusOut,
        computeAngle(beginAngle),
        computeAngle(finishAngle),
        false
      );
      ctx.arc(
        point,
        point,
        radiusIn,
        computeAngle(finishAngle),
        computeAngle(beginAngle),
        true
      );
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }
    return (
      <View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="test"></View>
        <View className="top" onClick={this.toTop}></View>
      </View>
    );
  }
}
