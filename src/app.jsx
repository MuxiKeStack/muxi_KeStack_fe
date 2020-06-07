import Taro, { Component } from '@tarojs/taro';
import Index from './pages/index';
import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
// Array.prototype.remove = function(obj) {
//   for (var i = 0; i < this.length; i++) {
//     var temp = this[i];
//     if (!isNaN(obj)) {
//       temp = i;
//     }
//     if (temp == obj) {
//       for (var j = i; j < this.length; j++) {
//         this[j] = this[j + 1];
//       }
//       this.length = this.length - 1;
//     }
//   }
// };

class App extends Component {
  componentDidMount() {
    // let judge = Taro.getStorageSync('judge');
    // if (judge) {
    //   Taro.setStorageSync('isFir', false);
    // } else {
    //   Taro.setStorageSync('isFir', true);
    // }
    Taro.getStorage({
      key: 'token',
      success: function(res) {
        Taro.switchTab({
          url: '/pages/commentSquare/index'
        });
      },
      fail: function(res) {
        Taro.redirectTo({
          url: '/pages/login/index'
        });
      }
    });
  }
  config = {
    pages: [
      // 'pages/homepage/index',
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
      'pages/changeUserInfo/index',
      'pages/courseSelectionList/index',
      'pages/index/index',

      'pages/test/test'
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
          text: '评课广场',
          iconPath: './assets/png/cmmt-squaG.png',
          selectedIconPath: './assets/png/cmmt-squa.png'
        },
        {
          pagePath: 'pages/courseAssistant/index',
          text: '选课助手',
          iconPath: './assets/png/shelperG.png',
          selectedIconPath: './assets/png/shelper.png'
        },
        {
          pagePath: 'pages/homepage/index',
          text: '个人主页',
          iconPath: './assets/png/user-infoG.png',
          selectedIconPath: './assets/png/user-info.png'
        }
      ],
      color: '#CACACA',
      selectedColor: '#7273F7',
      backgroundColor: '#ffffff',
      borderStyle: 'black'
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
