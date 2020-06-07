import Taro, { Component } from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
import './test.scss';

export default class Test extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  componentWillMount() {}

  componentDidMount() {
    // const res = Taro.getSystemInfoSync();
    // const point = (res.screenWidth / 750) * 50;
    // const radiusOut = (res.screenWidth / 750) * 50;
    // // const radiusIn = (res.screenWidth / 750) * 48;
    // var ctx = Taro.createCanvasContext('ring');
    // // ctx.beginPath();
    // // ctx.arc(point, point, radiusOut, 30, 20, false);
    // // ctx.closePath();
    // // ctx.fillStyle = 'red';
    // // ctx.fill();
    // // ctx.draw();
    function computeAngle(percent) {
      return (Math.PI / 180) * 3.6 * percent + (Math.PI * 3) / 2;
    }
    const res = Taro.getSystemInfoSync();
    const point = (res.screenWidth / 750) * 50;
    const radiusOut = (res.screenWidth / 750) * 50;
    const radiusIn = (res.screenWidth / 750) * 46;
    function drawSector(beginAngle, finishAngle, color, ctx) {
      // ctx.beginPath();
      // ctx.arc(
      //   point,
      //   point,
      //   radiusOut,
      //   computeAngle(beginAngle),
      //   computeAngle(finishAngle),
      //   false
      // );
      // ctx.arc(
      //   point,
      //   point,
      //   radiusIn,
      //   computeAngle(finishAngle),
      //   computeAngle(beginAngle),
      //   true
      // );
      // ctx.closePath();
      // ctx.fillStyle = color;
      // ctx.fill();
      ctx.beginPath();
      ctx.moveTo(point, point);
      // 绘制圆弧
      ctx.arc(
        point,
        point,
        radiusOut,
        computeAngle(beginAngle),
        computeAngle(finishAngle),
        false
      );
      // 闭合路径
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      //绘制小圆
    }
    // Draw coordinates
    const ctx = Taro.createCanvasContext('myCanvas');
    drawSector(0, 40, '#6869F7', ctx);
    drawSector(40, 80, 'black', ctx);
    ctx.beginPath();
    ctx.moveTo(point, point);
    ctx.arc(point, point, radiusIn, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.draw();
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View>
        <Canvas style="width: 300px; height: 300px;" canvasId="myCanvas" />
      </View>
    );
  }
}
