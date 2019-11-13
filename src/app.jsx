import Taro, { Component } from '@tarojs/taro';
import Index from './pages/index';

import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidMount() {
    Taro.setStorage({
      key: 'token',
      data: 'Iamtoken'
    });
  }
  config = {
    pages: [
      'pages/index/index',
      'pages/freeCourse/index',
      'pages/courseDetails/courseDetails',
      'pages/list/index',
      'pages/postReview/index',
      'pages/homepage/index',
      'pages/mycourse/index',
      'pages/courseCommentsDetails/courseCommentsDetails',
      // 'pages/assessSquare/index',
      'pages/message/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/assessSquare/index',
          text: '评课广场',
          iconPath: 'src/assets/svg/cmmt-squaG.svg',
          selectedIconPath: 'src/assets/svg/cmmt-squa.svg'
        },
        {
          pagePath: 'pages/list/index',
          text: '选课助手',
          iconPath: 'src/assets/svg/shelper.svg',
          selectedIconPath: 'src/assets/svg/shelperG.svg'
        },
        {
          pagePath: 'pages/homepage/index',
          text: '个人主页',
          iconPath: 'src/assets/svg/user-info.svg',
          selectedIconPath: 'src/assets/svg/user-infoG.svg'
        }
      ],
      color: '#CACACA',
      selectedColor: '#7273F7',
      backgroundColor: '#ffffff',
      borderStyle: 'white'
    }
  };

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
