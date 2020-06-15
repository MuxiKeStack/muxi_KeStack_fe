import Taro, { Component } from '@tarojs/taro';
import { View, Canvas, CoverView } from '@tarojs/components';
import './test.scss';

export default class Test extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      drawerWidth: '0px',
      cover: 'none'
    };
  }
  config = {
    navigationBarTitleText: '首页'
  };
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }
  componentWillMount() {}

  componentDidMount() {
    const res = Taro.getSystemInfoSync();
    const point = res.screenWidth / 2;
    const radiusOut = (res.screenWidth / 4) * 3;
    const ctx = Taro.createCanvasContext('myCanvas');
    // 绘制小圆
    ctx.beginPath();
    ctx.moveTo(point, point);
    ctx.arc(point, point, radiusOut, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.draw();
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  toCover() {
    this.setState({
      drawerWidth: '448rpx',
      cover: 'block'
    });
  }
  toHide() {
    this.setState({
      drawerWidth: '0px',
      cover: 'none'
    });
  }

  render() {
    const coverStyle = { display: this.state.cover };
    const drawerStyle = {
      width: this.state.drawerWidth
    };
    return (
      <View>
        <View onClick={this.toCover}>aaaaaa</View>
        <Canvas style="width: 900px; height: 900px;" canvasId="myCanvas" />
        <CoverView
          className="cover"
          style={coverStyle}
          onClick={this.toHide}
        ></CoverView>
        <CoverView style={drawerStyle} className="drawer">
          asdfasdfasdfa
        </CoverView>
      </View>
    );
  }
}
