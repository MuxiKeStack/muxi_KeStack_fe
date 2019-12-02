import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';
import MxTag from '../../components/common/MxTag/index';
import MxIcon from '../../components/common/MxIcon/index';
import anonymous from '../../assets/png/octodex.jpg';
import Test from '../../components/page/test/Test';

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
  render() {
    return (
      <View>
        <Test
          value={this.state.value}
          onItemChange={this.onItemChange.bind(this)}
        />
      </View>
    );
  }
}
