import Taro, { Component } from '@tarojs/taro';
import { View, Textarea, Text, ScrollView } from '@tarojs/components';
import './index.scss';
import Test from '../../components/page/test/Test';
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

  componentDidMount() {}
  onPullDownRefresh() {
    console.log('pull down refresh');
  }
  onReachBottom() {
    console.log('reach bottom');
  }
  componentWillUnmount() {}

  componentDidHide() {}
  onItemChange(item) {
    this.setState({
      value: item
    });
    console.log('传值成功啦');
    console.log(this.state.value);
  }
  toTop() {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
  render() {
    return (
      <View>
        <Test
          value={this.state.value}
          onItemChange={this.onItemChange.bind(this)}
        />
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
