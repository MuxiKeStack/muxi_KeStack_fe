import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import courseAssistant from '../../assets/png/courseAssistant.png'

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

  ChangeTofreeCourse() {
    Taro.navigateTo({
        url: "/pages/freeCourse/index"
    });
}
    ChangeToCourseDetails() {
    Taro.navigateTo({
        url: '/pages/courseDetails/courseDetails'
    });
  }


  render() {
    return (
        <View>
            <View className='ChangeToCourseDetails' onClick={this.ChangeToCourseDetails.bind(this)}></View>
            <View className='ChangeToFreeCourse' onClick={this.ChangeTofreeCourse.bind(this)}></View>
    <Image src={courseAssistant} className='image' ></Image>
    
    {/* <View className='ChangeToCourseDetails'></View> */}
    </View>
    );
  }
}
