import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

// import bgim from '../../assets/svg/bgim.svg'
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

  // drawCircle(data, id, title) {
  //   // 做一下检查，看 data 加起来是否大于 100

  //   // 常量
  //   const canvasSize = 102;
  //   const radiusSize = 45;

  //   const ctx = Taro.createCanvasContext(id);
  //   const res = Taro.getSystemInfoSync();
  //   const radio = res.screenWidth / 750; // device pixel radio

  //   let currentRadian = -radiusSize / 180; // 目前画到了哪个弧度，范围（0 - 2 π），这就是下一次绘制 arc 的起点。初始值为 -45deg，也就是时钟12点方向
  //   const centerX = (radio * canvasSize) / 2;
  //   const centerY = (radio * canvasSize) / 2;
  //   const outterRadius = radio * radiusSize; // 外圆的半径
  //   data.forEach((item, index) => {
  //     let radian = item / 100;

  //     ctx.beginPath();
  //     ctx.arc(
  //       centerX,
  //       centerY,
  //       outterRadius,
  //       currentRadian * 2 * Math.PI,
  //       (currentRadian + radian) * 2 * Math.PI
  //     );
  //     ctx.setLineWidth(3);
  //     ctx.strokeStyle = PALETTE[index % PALETTE.length];
  //     ctx.stroke();

  //     currentRadian = currentRadian + radian;
  //   });

  //   // 文字绘制
  //   ctx.fillStyle = "#9154B8"; // 字体颜色
  //   ctx.textAlign = "center";
  //   ctx.textBaseline = "middle";
  //   ctx.font = "14px Microsoft YaHei"; // 字号
  //   ctx.fillText(title, centerX, centerY);

  //   ctx.draw();
  // }

  render() {
    return <View className="index">你好</View>;
  }
}
