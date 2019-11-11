import Taro, { Component } from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
import './courseDetails.scss';
import MxRate from '../../components/common/MxRate/MxRate';

export default class Coursedetails extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      courseName: '线性代数',
      teacherName: '张俊',
      courseCategory: '专业必修课',
      courseCredit: '2',
      rate: '4',
      starNumber: '23',
      attendance1: '30',
      attendance2: '60',
      attendance3: '10',
      inspection1: '40',
      inspection2: '20',
      inspection3: '10',
      inspection4: '10',
      courseTime1: '',
      courseTime2: '',
      courseTime3: '',
      coursePlace1: '',
      coursePlace2: '',
      coursePlace3: '',
      courseGrade70: '11',
      courseGrade7085: '76',
      courseGrade85: '13',
      courseGradeNumber: '89',
      totalGrade: '78.69',
      ordinaryGrade: '94.04'
    };
  }

  componentWillMount() {
    var attendance1 = '30';
    var attendance2 = '60';
    var attendance3 = '10';
    var inspection1 = '40';
    var inspection2 = '20';
    var inspection3 = '10';
    var inspection4 = '10';
    var courseGrade70 = '11';
    var courseGrade7085 = '76';
    var courseGrade85 = '13';
    const res = Taro.getSystemInfoSync();
    const point = (res.screenWidth / 750) * 50;
    const radiusOut = (res.screenWidth / 750) * 50;
    const radiusIn = (res.screenWidth / 750) * 48;
    const PALETTE = ['#6869F7', '#FD817E', '#D8D8D8', '#F9D57F'];

    function toInt(percent) {
      return parseInt(percent);
    }
    const ANGLE1 = [
      toInt(courseGrade70),
      toInt(courseGrade70) + toInt(courseGrade7085),
      toInt(courseGrade70) + toInt(courseGrade7085) + toInt(courseGrade85)
    ];
    const ANGLE2 = [
      toInt(attendance1),
      toInt(attendance1) + toInt(attendance2),
      toInt(attendance1) + toInt(attendance2) + toInt(attendance3)
    ];
    const ANGLE3 = [
      toInt(inspection1),
      toInt(inspection1) + toInt(inspection2),
      toInt(inspection1) + toInt(inspection2) + toInt(inspection3),
      toInt(inspection1) +
        toInt(inspection2) +
        toInt(inspection3) +
        toInt(inspection4)
    ];

    function computeAngle(percent) {
      return (Math.PI / 180) * 3.6 * percent + (Math.PI * 3) / 2;
    }
    function drawSector(beginAngle, finishAngle, color, ctx) {
      ctx.beginPath();
      ctx.arc(
        point,
        point,
        radiusOut,
        computeAngle(beginAngle),
        computeAngle(finishAngle),
        false
      );
      ctx.arc(
        point,
        point,
        radiusIn,
        computeAngle(finishAngle),
        computeAngle(beginAngle),
        true
      );
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }
    function drawRing(ctx, ANGLE, type) {
      drawSector(0, ANGLE[0], PALETTE[0], ctx);
      drawSector(ANGLE[0], ANGLE[1], PALETTE[3], ctx);
      drawSector(ANGLE[1], ANGLE[2], PALETTE[2], ctx);
      if (ANGLE[3]) {
        drawSector(ANGLE[2], ANGLE[3], PALETTE[1], ctx);
      }
      ctx.fillStyle = '#6869F7';
      ctx.font = '23rpx';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${type}`, radiusOut, radiusOut);
      ctx.draw();
    }
    drawRing(Taro.createCanvasContext('ring1'), ANGLE1, '成绩');
    drawRing(Taro.createCanvasContext('ring2'), ANGLE2, '考勤');
    drawRing(Taro.createCanvasContext('ring3'), ANGLE3, '考核');
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      courseCategory,
      courseCredit,
      rate,
      starNumber,
      attendance1,
      attendance2,
      attendance3,
      inspection1,
      inspection2,
      inspection3,
      inspection4,
      courseTime1,
      courseTime2,
      courseTime3,
      coursePlace1,
      coursePlace2,
      coursePlace3,
      courseGrade70,
      courseGrade7085,
      courseGrade85,
      courseGradeNumber
    } = this.state;
    function toInt(percent) {
      return parseInt(percent);
    }
    console.log('shi');
    console.log('asdf');
    const ANGLE1 = [
      toInt(courseGrade70),
      toInt(courseGrade7085),
      toInt(courseGrade85)
    ];
    const ANGLE2 = [toInt(attendance1), toInt(attendance2), toInt(attendance3)];
    const ANGLE3 = [
      toInt(inspection1),
      toInt(inspection2),
      toInt(inspection3),
      toInt(inspection4)
    ];

    return (
      <View className="courseDetails">
        <View className="greybody">
          <View className="commentBox">
            <View className="name">综合评分：</View>
            <MxRate commont={false} value={rate} />
            <View className="commentNumber">(共{starNumber}人评价)</View>
          </View>
          <View className="creditBox">
            <View className="name">基本信息：</View>
            <View className="courseCredit">
              {courseCategory}
              {courseCredit}
              学分
            </View>
          </View>
          <View className="lookCourseBox">
            <View className="name">基本信息：</View>
            <View className="chooseCourse">查看当前所有可选课堂</View>
          </View>
          <View className="ring">
            <View className="ringBox1">
              <View className="canvasBox">
                <Canvas style="width: 100px; height: 100px;" canvasId="ring1" />
              </View>
              <View className="levels" style="font-size: 20rpx">
                <View className="item">
                  <View className="circle1"></View>
                  <View className="level">70以下：{ANGLE1[0]}%</View>
                </View>
                <View className="item">
                  <View className="circle2"></View>
                  <View className="level">70~85：{ANGLE1[1]}%</View>
                </View>
                <View className="item">
                  <View className="circle3"></View>
                  <View className="level">85以上：{ANGLE1[2]}%</View>
                </View>
              </View>
            </View>
            <View className="ringBox2">
              <View className="canvasBox">
                <Canvas style="width: 100px; height: 100px;" canvasId="ring2" />
              </View>
              <View className="levels" style="font-size: 20rpx">
                <View className="item">
                  <View className="circle1"></View>
                  <View className="level">经常点名：{ANGLE2[0]}%</View>
                </View>
                <View className="item">
                  <View className="circle2"></View>
                  <View className="level">偶尔点名：{ANGLE2[1]}%</View>
                </View>
                <View className="item">
                  <View className="circle3"></View>
                  <View className="level">从不点名：{ANGLE2[2]}%</View>
                </View>
              </View>
            </View>
            <View className="ringBox3">
              <View className="canvasBox">
                <Canvas style="width: 100px; height: 100px;" canvasId="ring3" />
              </View>
              <View className="levels" style="font-size: 20rpx">
                <View className="item">
                  <View className="circle1"></View>
                  <View className="level">闭卷考试：{ANGLE3[0]}%</View>
                </View>
                <View className="item">
                  <View className="circle2"></View>
                  <View className="level">开卷考试：{ANGLE3[1]}%</View>
                </View>
                <View className="item">
                  <View className="circle3"></View>
                  <View className="level">论文考试：{ANGLE3[2]}%</View>
                </View>
                <View className="item">
                  <View className="circle4"></View>
                  <View className="level">无考试：{ANGLE3[3]}%</View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="sampleSize">(成绩样本量：{courseGradeNumber})</View>
        <View className="averageBox">
          <View className="averageSmallBox1">
            <View className="averageName">总平均分</View>
            <View className="averageGrade">{this.state.totalGrade}</View>
          </View>
          <View className="averageSmallBox2">
            <View className="averageName">平时均分</View>
            <View className="averageGrade">{this.state.ordinaryGrade}</View>
          </View>
        </View>
        <View className="feature">课堂特点：</View>
        <View className="tagBox">
          <View className="tag">生动有趣(10)</View>
          <View className="tag">干货满满(2)</View>
          <View className="tag">老师很好(1)</View>
          <View className="tag">作业量少(72)</View>
          <View className="tag">云课堂资料全(8)</View>
          <View className="tag">简单易学(0)</View>
        </View>
      </View>
    );
  }
}
