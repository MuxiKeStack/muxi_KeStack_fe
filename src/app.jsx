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
      'pages/login/index',
      'pages/commentSquare/index',
      'pages/search/index',
      'pages/postReview/index',
      'pages/courseCommentsDetails/courseCommentsDetails',

      'pages/courseAssistant/index',
      'pages/freeCourse/index',
      'pages/courseDetails/courseDetails',

      'pages/homepage/index',
      'pages/mycourse/index',
      'pages/commentHistory/index',
      'pages/message/index',
      'pages/courseSelectionList/index',
      'pages/index/index'
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
          pagePath: 'pages/commentSquare/index',
          // text: '评课广场',
          iconPath: './assets/svg/cmmt-squaG.svg',
          selectedIconPath: './assets/svg/cmmt-squa.svg'
        },
        {
          pagePath: 'pages/courseAssistant/index',
          // text: '选课助手',
          iconPath: './assets/svg/shelperG.svg',
          selectedIconPath: './assets/svg/shelper.svg'
        },
        {
          pagePath: 'pages/homepage/index',
          // text: '个人主页',
          iconPath: './assets/svg/user-infoG.svg',
          selectedIconPath: './assets/svg/user-info.svg'
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
