import Taro, { Component } from '@tarojs/taro';
import { View, Canvas, Button, Image } from '@tarojs/components';
import './courseDetails.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import MxIcon from '../../components/common/MxIcon/index';
import Fetch from '../../service/fetch';
import MxLike from '../../components/page/MxLike/MxLike';
import MxTag from '../../components/common/MxTag/index';

export default class Coursedetails extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      hotList: '',
      normalList: '',
      lastID: 0,
      normalLimit: 10,
      nomorecmt: false,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQ5OTI1MDQsImlkIjoyLCJuYmYiOjE1NzQ5OTI1MDR9.TeG9DKVvzw-1j_e3wmQSdZsc1jlNPlUBOw0orUqhyGY',
      sort: 'hot',
      limit: 5,
      sum: 10,
      classes: [
        [
          { time: '周一7~8节', place: '7105', week: '2' },
          { time: '周三5~6节', place: '7107', week: '1' },
          { time: '周四5~6节', place: '7107', week: '1' }
        ],
        [
          { time: '周一7~8节', place: '7105', week: '2' },
          { time: '周三5~6节', place: '7107', week: '1' }
        ],
        [
          { time: '周一7~8节', place: '7105', week: '2' },
          { time: '周三5~6节', place: '7107', week: '1' },
          { time: '周四5~6节', place: '7107', week: '1' }
        ],
        [
          { time: '周一7~8节', place: '7105', week: '2' },
          { time: '周三5~6节', place: '7107', week: '1' },
          { time: '周四5~6节', place: '7107', week: '1' }
        ],
        [
          { time: '周一7~8节', place: '7105', week: '2' },
          { time: '周三5~6节', place: '7107', week: '1' }
        ],
        [
          { time: '周一7~8节', place: '7105', week: '0' },
          { time: '周三5~6节', place: '7107', week: '0' },
          { time: '周四5~6节', place: '7107', week: '0' }
        ]
      ],
      drawerWidth: '0px',
      cover: 'none',
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
  config = {
    navigationBarTitleText: '课程主页',
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  };
  onPullDownRefresh() {
    Taro.showNavigationBarLoading();
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
      Taro.stopPullDownRefresh();
    }, 3000);
    this.setState({});
    console.log('下拉加载刷新');
  } //下拉事件

  onReachBottom() {
    this.getComments();
    Taro.showNavigationBarLoading();
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
      Taro.stopPullDownRefresh();
    }, 500);
  }
  getComments() {
    const { normalLimit, lastID, nomorecmt } = this.state;
    if (!nomorecmt) {
      Fetch(
        'api/v1/course/112d34testsvggase/evaluations/',
        {
          id: '112d34testsvggase',
          limit: normalLimit,
          last_id: lastID
        },
        'GET'
      ).then(data => {
        if (data.data.normal_list) {
          console.log(data.data);
          this.setState({
            normalList: this.state.normalList.concat(data.data.normal_list),
            lastID: data.data.normal_list[data.data.normal_list.length - 1].id
          });
          console.log(lastID);
        } else {
          this.setState({
            nomorecmt: true
          });
          Taro.showToast({
            title: '没有更多数据啦',
            icon: 'none'
          });
        }
      });
    }

    console.log(this.state.normalList);
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

  componentDidMount() {
    Fetch(
      'api/v1/course/112d34testsvggase/evaluations/',
      {
        id: '112d34testsvggase',
        hot_limit: '5'
      },
      'GET'
    ).then(data => {
      if (data) {
        console.log(data.data);
        this.setState({
          hotList: data.data.hot_list,
          normalList: data.data.normal_list,
          lastID: data.data.normal_list[data.data.normal_list.length - 1].id
        });
      }
    });
    Taro.setStorageSync(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQ5OTI1MDQsImlkIjoyLCJuYmYiOjE1NzQ5OTI1MDR9.TeG9DKVvzw-1j_e3wmQSdZsc1jlNPlUBOw0orUqhyGY'
    );
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
  normalTime(timestamp) {
    var date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes();
    if (m % 10 == 0) return Y + M + D + h + m + 0;
    else return Y + M + D + h + m;
  }

  commentPage(id) {
    Taro.navigateTo({
      url: '../courseCommentsDetails/courseCommentsDetails?id=' + id
    });
  }

  render() {
    const PALETTE = ['#81CAE2', '#F9C895', '#FBC5D4', '#93D9D1'];
    const {
      nomorecmt,
      hotList,
      normalList,
      courseCategory,
      courseCredit,
      rate,
      classes,
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
    const drawerStyle = {
      width: this.state.drawerWidth
    };
    const coverStyle = {
      display: this.state.cover
    };

    return (
      <View className="courseDetails">
        <View className="cover" style={coverStyle} onClick={this.toHide} />
        <View style={drawerStyle} className="drawer">
          <View className="infobox_drawer">
            <View className="info_drawer">课堂信息</View>
            <View className="info_Eng_drawer">class message</View>
          </View>
          {classes &&
            classes.map(item => {
              return (
                <View className="classBox" key={item.id}>
                  <View>{item.id + 1}课堂</View>
                  {item &&
                    item.map(index => {
                      return (
                        <View key={index.id}>
                          {index.time}节 @ {index.place}
                        </View>
                      );
                    })}
                </View>
              );
            })}
        </View>
        <View className="detailBox">
          <View className="name">课程名称：</View>
          <View className="content">线性代数</View>
        </View>
        <View className="detailBox">
          <View className="name">课程教师：</View>
          <View className="content">张俊</View>
        </View>
        <View className="detailBox">
          <View className="name">综合评分：</View>
          <View className="rate">
            <MxRate commont={false} value={rate} />
          </View>
          <View className="commentNumber">(共{starNumber}人评价)</View>
        </View>
        <View className="detailBox">
          <View className="name">基本信息：</View>
          <View className="content">
            {courseCategory}
            {courseCredit}
            学分
          </View>
        </View>
        <View className="detailBox">
          <View className="name">基本信息：</View>
          <View className="chooseCourse" onClick={this.toCover}>
            查看当前所有可选课堂
          </View>
        </View>
        <View className="ring">
          <View className="ringBox">
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
          <View className="ringBox">
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
          <View className="ringBox2">
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
          <MxTag
            padding="10rpx 40rpx"
            borderRadius="30rpx"
            className="tag"
            margin="5rpx 10rpx"
          >
            老师幽默风趣(10)
          </MxTag>
          <MxTag
            padding="10rpx 40rpx"
            borderRadius="30rpx"
            className="tag"
            margin="5rpx 10rpx"
          >
            课堂干货满满(2)
          </MxTag>
          <MxTag
            padding="10rpx 40rpx"
            borderRadius="30rpx"
            className="tag"
            margin="5rpx 10rpx"
          >
            老师普通话标准(100)
          </MxTag>
          <MxTag
            padding="10rpx 40rpx"
            borderRadius="30rpx"
            className="tag"
            margin="5rpx 10rpx"
          >
            作业量非常少(7582)
          </MxTag>
          <MxTag
            padding="10rpx 40rpx"
            borderRadius="30rpx"
            className="tag"
            margin="5rpx 10rpx"
          >
            云课堂资料全(8)
          </MxTag>
          <MxTag
            padding="10rpx 40rpx"
            borderRadius="30rpx"
            className="tag"
            margin="5rpx 10rpx"
          >
            简单易学(0)
          </MxTag>
        </View>
        <View className="List">热门评论</View>
        <View className="cmtBigBox">
          {hotList &&
            hotList.map(item => {
              return (
                <View key={item.id} className="commentCard">
                  <View className="userInfo">
                    {item.user_info.avatar ? (
                      <Image
                        src={item.user_info.avatar}
                        className="avatar"
                        style="width: 80rpx; height: 80rpx"
                      />
                    ) : (
                      <MxIcon type="avatar" width="80rpx" height="80rpx" />
                    )}
                    <View className="infoDetail">
                      <View className="username">
                        {item.user_info.username
                          ? item.user_info.username
                          : '匿名用户'}
                      </View>
                      <View className="time">{this.normalTime(item.time)}</View>
                    </View>
                  </View>
                  <View className="courseInfo">
                    <View className="courseName">
                      #{item.course_name}({item.teacher})
                    </View>
                    <View className="cmtRateBox">
                      <MxRate readOnly="true" value={item.rate} />
                    </View>
                  </View>
                  <View className="cmtContent">{item.content}</View>
                  <View className="cmtIconsBox">
                    <View className="likeIconBox">
                      <MxLike
                        theid={item.id}
                        islike={item.is_like}
                        likenum={item.like_num}
                      />
                    </View>
                    <View className="cmtIconBox">
                      <MxIcon
                        width="43"
                        type="cmmtBtn"
                        className="commentIcon"
                        onClick={this.commentPage.bind(this, item.id)}
                      />
                      {item.comment_num}
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
        <View className="List">全部评论</View>
        <View className="cmtBigBox">
          {normalList &&
            normalList.map(item => {
              return (
                <View key={item.id} className="commentCard">
                  <View className="userInfo">
                    {item.user_info.avatar ? (
                      <Image
                        src={item.user_info.avatar}
                        className="avatar"
                        style="width: 80rpx; height: 80rpx"
                      />
                    ) : (
                      <MxIcon type="avatar" width="80rpx" height="80rpx" />
                    )}
                    <View className="infoDetail">
                      <View className="username">
                        {item.user_info.username
                          ? item.user_info.username
                          : '匿名用户'}
                      </View>
                      <View className="time">{this.normalTime(item.time)}</View>
                    </View>
                  </View>
                  <View className="courseInfo">
                    <View className="courseName">
                      #{item.course_name}({item.teacher})
                    </View>
                    <View className="cmtRateBox">
                      <MxRate readOnly="true" value={item.rate} />
                    </View>
                  </View>
                  <View className="cmtContent">{item.content}</View>
                  <View className="cmtIconsBox">
                    <View className="likeIconBox">
                      <MxLike
                        theid={item.id}
                        islike={item.is_like}
                        likenum={item.like_num}
                      />
                    </View>
                    <View className="cmtIconBox">
                      <MxIcon
                        width="43"
                        type="cmmtBtn"
                        className="commentIcon"
                        onClick={this.commentPage.bind(this, item.id)}
                      />
                      {item.comment_num}
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
        {nomorecmt && (
          <View className="nomore">已经到底啦，没有更多数据啦</View>
        )}
      </View>
    );
  }
}
