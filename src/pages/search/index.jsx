import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import commentHistory from '../../assets/png/commentHistory.png'

// 色板
const PALETTE = ['#9154B8', '#F9D57F', '#D8D8D8', '#FD817E'];

export default class Index extends Component {
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '首页'
  };

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}



  render() {
    return (
        <View>
    <Image src={commentHistory} className='image' ></Image>
    </View>
    );
  }
}
