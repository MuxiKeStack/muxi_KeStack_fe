import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';
import MxTag from '../../components/common/MxTag/index';
import anonymous from '../../assets/png/octodex.jpg';

export default class Index extends Component {
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50
  };

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
    return (
      <View>
        <View className="son">1</View>
        <View className="son">2</View>
        <View className="son">3</View>
        <View className="son">4</View>
        <View className="son">5</View>
        <View className="son">6</View>
        <View className="son">7</View>
        <View className="son">8</View>
        <View className="son">9</View>
        <View className="son">10</View>
        <View className="son">11</View>
        <View class="mult_line_ellipsis">
          多行文本css溢出部分css溢出部分css溢出部分css溢出部分css溢出部分css溢出部分css溢出部分
        </View>
        <MxTag>我点击</MxTag>
        <Image src={anonymous} />
      </View>
    );
  }
}
