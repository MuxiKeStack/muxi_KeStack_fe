import Taro, { Component, hideTabBarRedDot } from '@tarojs/taro';
import {
  View,
  Canvas,
  Image,
  Text,
  CoverView,
  CoverImage
} from '@tarojs/components';
import './courseDetails.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import Fetch from '../../service/fetch';
import MxTag from '../../components/common/MxTag/index';
import star from '../../assets/png/star.png';
import starFill from '../../assets/png/starFill.png';
import hotcmt from '../../assets/png/hotcmt.png';
import newcmt from '../../assets/png/newcmt.png';
import CmtCourseCard from '../../components/page/CmtCourseCard/CmtCourseCard';
import ClassCard from '../../components/page/ClassCard/ClassCard';

export default class Coursedetails extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      gradeInfo: { section_1: 0, section_2: 0, section_3: 0 },
      classInfo: '',
      hotList: '',
      normalList: '',
      lastID: 0,
      normalLimit: 10,
      nomorecmt: false,
      drawerWidth: '0px',
      cover: 'none',
      collect: false,
      getGrade: '',
      getGradeCover: 'none',
      password: '',
      sid: '',
      isFir: true,
      height: 1,
      width: 1
    };
  }
  config = {
    navigationBarTitleText: '课程主页',
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  };
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }

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
        'api/v1/course/history/112d34testsvggase/evaluations/',
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
            lastID:
              data.data.normal_list == null
                ? 0
                : data.data.normal_list[data.data.normal_list.length - 1].id
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
  componentWillMount() {}

  componentDidMount() {
    this.setState({
      password: Taro.getStorageSync('password'),
      sid: Taro.getStorageSync('sid')
    });
    Fetch(
      'api/v1/course/history/' + this.$router.params.courseId + '/evaluations/',
      {
        id: '112d34testsvggase',
        hot_limit: '5'
      },
      'GET'
    ).then(data => {
      if (data) {
        this.setState({
          hotList: data.data.hot_list,
          normalList: data.data.normal_list,
          lastID:
            data.data.normal_list == null
              ? 0
              : data.data.normal_list[data.data.normal_list.length - 1].id
        });
      }
    });
    Fetch(
      'api/v1/course/using/info/' + this.$router.params.courseId + '/',
      // 'api/v1/course/using/info/6c890e39a029da0cef4566907ed4e07e/',
      {},
      'GET'
    ).then(data => {
      if (data) {
        this.setState({
          classInfo: data.data,
          collect: data.data.like_state
        });
        console.log(data);
      }
    });
    Fetch(
      'api/v1/grade/',
      { course_id: this.$router.params.courseId },
      'GET'
    ).then(data => {
      if (data.code == 0) {
        this.setState({
          getGrade: data.data.has_licence,
          gradeInfo: data.data
        });
      }
      console.log(data.data);
    });
  }

  componentWillUnmount() {}

  componentDidShow() {
    let isFir = Taro.getStorageSync('isnew');
    if (isFir == 0) {
      this.setState({
        isFir: false
      });
    }
  }

  componentDidHide() {}

  favorite() {
    if (!Taro.getStorageSync('token')) {
      Taro.showToast({
        title: '收藏失败!',
        icon: 'none'
      });
      Taro.navigateTo({
        url: '/pages/login/index'
      });
    } else {
      Fetch(
        `api/v1/course/using/${this.$router.params.courseId}/favorite/`,
        {
          like_state: this.state.collect
        },
        'PUT'
      ).then(res => {
        console.log(res);
        switch (res.code) {
          case 0:
            if (this.state.collect == false) {
              Taro.showToast({
                title: '收藏成功！',
                icon: 'success'
              });
            } else {
              Taro.showToast({
                title: '取消收藏成功！',
                icon: 'success'
              });
            }
            this.setState({
              collect: !this.state.collect
            });
            break;
          case 20302:
            // eslint-disable-next-line no-undef
            Taro.showToast({
              title: '收藏失败!',
              icon: 'none'
            });
            break;
        }
      });
    }
  }

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
  toHideGetGrade() {
    this.setState({
      getGradeCover: 'none'
    });
  }
  toShowGetGrade() {
    this.setState({
      getGradeCover: 'block'
    });
  }
  toJoin() {
    if (!Taro.getStorageSync('token')) {
      Taro.showToast({
        title: '请先登陆',
        icon: 'none'
      });
    } else {
      if (this.state.sid == '') {
        Taro.showToast({
          title: '登录信息已过期',
          icon: 'none'
        });
        Taro.navigateTo({
          url: '/pages/login/index'
        });
      } else {
        Fetch(
          'api/v1/user/licence/',
          {
            password: this.state.password,
            sid: this.state.sid
          },
          'POST'
        ).then(data => {
          if (data) {
            this.toHideGetGrade();
            Taro.showToast({
              title: '加入成绩共享计划成功',
              icon: 'success'
            });
            this.setState({
              getGrade: true
            });
          }
        });
      }
    }
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

  commentPage(item) {
    const SID = item.is_anonymous ? '0' : item.user_info.sid;
    const name = item.is_anonymous ? '匿名用户' : item.user_info.username;
    Taro.navigateTo({
      url:
        '../courseCommentsDetails/courseCommentsDetails?id=' +
        item.id +
        '&ancestorName=' +
        name +
        '&sid=' +
        SID
    });
  }
// Test:
  // toTest() {
  //   Taro.navigateTo({
  //     url: '/pages/test/test'
  //   });
  // }

  onClick() {
    this.setState({
      isFir: false
    });
  }

  render() {
    const {
      gradeInfo,
      classInfo,
      nomorecmt,
      hotList,
      normalList,
      collect,
      getGrade
    } = this.state;
    const res = Taro.getSystemInfoSync();
    const point = (res.screenWidth / 750) * 50;
    const radiusOut = (res.screenWidth / 750) * 50;
    const radiusIn = (res.screenWidth / 750) * 40;
    var TOTAL = [
      parseInt(gradeInfo.sample_size),
      classInfo.attendance.Occasionally +
        classInfo.attendance.Often +
        classInfo.attendance.SignIn,
      classInfo.exam.Close +
        classInfo.exam.Eassay +
        classInfo.exam.None +
        classInfo.exam.Open
    ];
    var NUM1 = [
      parseInt(gradeInfo.section_1),
      parseInt(gradeInfo.section_1) + parseInt(gradeInfo.section_2),
      parseInt(gradeInfo.section_1) +
        parseInt(gradeInfo.section_2) +
        parseInt(gradeInfo.section_3)
    ];
    var NUM2 = [
      classInfo.attendance.Often,
      classInfo.attendance.Often + classInfo.attendance.Occasionally,
      classInfo.attendance.Often +
        classInfo.attendance.Occasionally +
        classInfo.attendance.SignIn
    ];
    var NUM3 = [
      classInfo.exam.Close,
      classInfo.exam.Close + classInfo.exam.Eassay,
      classInfo.exam.Close + classInfo.exam.Eassay + classInfo.exam.None,
      classInfo.exam.Close +
        classInfo.exam.Eassay +
        classInfo.exam.None +
        classInfo.exam.Open
    ];
    var ANGLE1 =
      TOTAL[0] != 0
        ? [
            (NUM1[0] * 100) / TOTAL[0],
            (NUM1[1] * 100) / TOTAL[0],
            (NUM1[2] * 100) / TOTAL[0]
          ]
        : [0, 0, 0];
    var ANGLE2 =
      TOTAL[1] != 0
        ? [
            (NUM2[0] * 100) / TOTAL[1],
            (NUM2[1] * 100) / TOTAL[1],
            (NUM2[2] * 100) / TOTAL[1]
          ]
        : [0, 0, 0];
    var ANGLE3 =
      TOTAL[2] != 0
        ? [
            (NUM3[0] * 100) / TOTAL[2],
            (NUM3[1] * 100) / TOTAL[2],
            (NUM3[2] * 100) / TOTAL[2],
            (NUM3[3] * 100) / TOTAL[2]
          ]
        : [0, 0, 0, 0];

    function computeAngle(percent) {
      // if (percent != 0) {
      //   return (Math.PI / 180) * 3.6 * percent + (Math.PI * 3) / 2;
      // } else {
      //   return 0;
      // }
      return (Math.PI / 180) * 3.6 * percent + (Math.PI * 3) / 2;
    }
    function drawSector(beginAngle, finishAngle, color, ctx) {
      if (beginAngle != finishAngle) {
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
      }
    }
    function drawRing(ctx, ANGLE, type) {
      drawSector(0, ANGLE[0], '#6869F7', ctx);
      drawSector(ANGLE[0], ANGLE[1], '#F9D57F', ctx);
      drawSector(ANGLE[1], ANGLE[2], '#D8D8D8', ctx);
      if (ANGLE[3]) {
        drawSector(ANGLE[2], ANGLE[3], '#FD817E', ctx);
      }
      ctx.beginPath();
      ctx.moveTo(point, point);
      ctx.arc(point, point, radiusIn, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.fillStyle = '#6869F7';
      ctx.font = '14corpx Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${type}`, radiusOut, radiusOut);
      ctx.draw();
    }
    drawRing(Taro.createCanvasContext('ring1'), ANGLE1, '成绩');
    drawRing(Taro.createCanvasContext('ring2'), ANGLE2, '考勤');
    drawRing(Taro.createCanvasContext('ring3'), ANGLE3, '考核');

    let courseCategory = null;
    if (this.state.classInfo.course_category == 0) {
      courseCategory = <Text>通识必修课</Text>;
    } else if (this.state.classInfo.course_category == 1) {
      courseCategory = <Text>专业必修课</Text>;
    } else if (this.state.classInfo.course_category == 2) {
      courseCategory = <Text>专业选修课</Text>;
    } else if (this.state.classInfo.course_category == 3) {
      courseCategory = <Text>通识选修课</Text>;
    } else if (this.state.classInfo.course_category == 4) {
      courseCategory = <Text>专业课</Text>;
    } else if (this.state.classInfo.course_category == 5) {
      courseCategory = <Text>通识核心课</Text>;
    }

    const drawerStyle = {
      width: this.state.drawerWidth
    };
    const coverStyle = { display: this.state.cover };
    const getGradeStyle = { display: this.state.getGradeCover };
    const CARDCOLOR = ['#81CAE2', '#F9C895', '#FBC5D4', '#93D9D1'];
    const isFir = this.state.isFir;
    const r = Taro.getSystemInfoSync();
    const root = {
      height: r.windowHeight + 'px',
      width: r.windowWidth + 'px'
    };
    return (
      <View className="courseDetails">
        {isFir && (
          <CoverView className="guide" onClick={this.onClick.bind(this)}>
            <CoverImage
              style={root}
              src="http://kestackoss.muxixyz.com/guidance/detail.png"
            />
          </CoverView>
        )}
        <View className="starBac" onClick={this.favorite}>
          {!collect && <Image src={star} className="star"></Image>}
          {collect && <Image src={starFill} className="star"></Image>}
        </View>
        <CoverView className="cover" style={coverStyle} onClick={this.toHide} />
        <CoverView style={drawerStyle} className="drawer">
          <CoverView className="infobox_drawer">
            <CoverView className="info_drawer">课堂信息</CoverView>
            <CoverView className="info_Eng_drawer">class message</CoverView>
          </CoverView>
          {classInfo.class_info &&
            classInfo.class_info.map(item => {
              return (
                <CoverView
                  className="classBox"
                  key={item.id}
                  style={`background-color:${CARDCOLOR[item.id % 4]}`}
                >
                  <CoverView className="classNum">{item.id}课堂</CoverView>
                  <CoverView className="classWeek">
                    {item.list[0].Week.substring(
                      0,
                      item.list[0].Week.length - 2
                    )}
                    周
                  </CoverView>
                  {item.list && <ClassCard list={item.list} />}
                </CoverView>
              );
            })}
        </CoverView>
        <CoverView className="getGrade" style={getGradeStyle}>
          <CoverView className="getGradeCon">
            <CoverView className="joinTitle">加入成绩共享计划</CoverView>
            <CoverView className="joinCon">
              该部分的课程成绩信息是我们在征得用户同意后，匿名收集用户成绩数据所得到的统计结果。查看该信息需要您加入我们的课程成绩共享计划，提供自己的过往成绩信息作为数据分析的一部分。我们将根据隐私条例中的内容，保证您的个人信息受到安全保护。
            </CoverView>
            <CoverView className="joinButton">
              <CoverView onClick={this.toHideGetGrade} className="unjoin">
                再想想
              </CoverView>
              <CoverView className="tojoin" onClick={this.toJoin}>
                同意
              </CoverView>
            </CoverView>
          </CoverView>
        </CoverView>
        <View className="detailBox">
          <View className="name" onClick={this.toTest}>
            课程名称：
          </View>
          <View className="content">{classInfo.course_name}</View>
        </View>
        <View className="detailBox">
          <View className="name">课程教师：</View>
          <View className="content">{classInfo.teacher_name}</View>
        </View>
        <View className="detailBox">
          <View className="name">综合评分：</View>
          <View className="rate">
            <MxRate commont={false} value={classInfo.rate} />
          </View>
          <View className="commentNumber">(共{classInfo.stars_num}人评价)</View>
        </View>
        <View className="detailBox">
          <View className="name">基本信息：</View>
          <View className="content">
            {courseCategory}
            {classInfo.course_credit}
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
            {classInfo.attendance && (
              <View className="canvasBox">
                <Canvas style="width: 100px; height: 100px;" canvasId="ring1" />
              </View>
            )}
            <View className="levels" style="font-size: 20rpx">
              <View className="item">
                <View className="circle1"></View>
                <View className="level">
                  85以上：
                  {TOTAL[0] != 0
                    ? (parseInt(gradeInfo.section_1) * 100) / TOTAL[0]
                    : 0}
                  %
                </View>
              </View>
              <View className="item">
                <View className="circle2"></View>
                <View className="level">
                  70~85：
                  {TOTAL[0] != 0
                    ? (parseInt(gradeInfo.section_2) * 100) / TOTAL[0]
                    : 0}
                  %
                </View>
              </View>
              <View className="item">
                <View className="circle3"></View>
                <View className="level">
                  70以下：
                  {TOTAL[0] != 0
                    ? (parseInt(gradeInfo.section_3) * 100) / TOTAL[0]
                    : 0}
                  %
                </View>
              </View>
            </View>
          </View>
          <View className="ringBox">
            {classInfo.attendance && (
              <View className="canvasBox">
                <Canvas style="width: 100px; height: 100px;" canvasId="ring2" />
              </View>
            )}
            <View className="levels" style="font-size: 20rpx">
              <View className="item">
                <View className="circle1"></View>
                <View className="level">
                  经常点名：
                  {TOTAL[1] != 0
                    ? (classInfo.attendance.Often * 100) / TOTAL[1]
                    : 0}
                  %
                </View>
              </View>
              <View className="item">
                <View className="circle2"></View>
                <View className="level">
                  偶尔点名：
                  {TOTAL[1] != 0
                    ? (classInfo.attendance.Occasionally * 100) / TOTAL[1]
                    : 0}
                  %
                </View>
              </View>
              <View className="item">
                <View className="circle3"></View>
                <View className="level">
                  从不点名：
                  {TOTAL[1] != 0
                    ? (classInfo.attendance.SignIn * 100) / TOTAL[1]
                    : 0}
                  %
                </View>
              </View>
            </View>
          </View>
          <View className="ringBox2">
            {classInfo.attendance && (
              <View className="canvasBox">
                <Canvas style="width: 100px; height: 100px;" canvasId="ring3" />
              </View>
            )}
            <View className="levels" style="font-size: 20rpx">
              <View className="item">
                <View className="circle1"></View>
                <View className="level">
                  闭卷考试：
                  {TOTAL[2] != 0 ? (classInfo.exam.Close * 100) / TOTAL[2] : 0}%
                </View>
              </View>
              <View className="item">
                <View className="circle2"></View>
                <View className="level">
                  论文考试：
                  {TOTAL[2] != 0 ? (classInfo.exam.Eassay * 100) / TOTAL[2] : 0}
                  %
                </View>
              </View>
              <View className="item">
                <View className="circle3"></View>
                <View className="level">
                  无考试：
                  {TOTAL[2] != 0 ? (classInfo.exam.None * 100) / TOTAL[2] : 0}%
                </View>
              </View>
              <View className="item">
                <View className="circle4"></View>
                <View className="level">
                  开卷考试：
                  {TOTAL[2] != 0 ? (classInfo.exam.Open * 100) / TOTAL[2] : 0}%
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="sampleSize">
          (成绩样本量：{gradeInfo.sample_size})
        </View>
        {getGrade && (
          <View className="averageBox">
            <View className="averageSmallBox1">
              <View className="averageName">总平均分</View>
              <View className="averageGrade">{gradeInfo.total_score}</View>
            </View>
            <View className="averageSmallBox2">
              <View className="averageName">平时均分</View>
              <View className="averageGrade">{gradeInfo.usual_score}</View>
            </View>
          </View>
        )}
        {!getGrade && (
          <View className="averageBox">
            <View className="averageSmallBox1">
              <View className="averageName">总平均分</View>
              <View className="averageGrade" onClick={this.toShowGetGrade}>
                **.**
              </View>
            </View>
            <View className="averageSmallBox2">
              <View className="averageName">平时均分</View>
              <View className="averageGrade" onClick={this.toShowGetGrade}>
                **.**
              </View>
            </View>
          </View>
        )}
        <View className="feature">课堂特点：</View>
        <View className="tagBox">
          {classInfo &&
            classInfo.tag.map(item => {
              return (
                <MxTag
                  padding="10rpx 40rpx"
                  borderRadius="30rpx"
                  className="tag"
                  margin="15rpx 10rpx"
                  key={item.data.name}
                >
                  {item.data.name}({item.data.num})
                </MxTag>
              );
            })}
        </View>
        <View className="cmtimgBox">
          {hotList && <Image className="cmtimg" src={hotcmt} />}
        </View>
        <View className="cmtBigBox">
          {hotList &&
            hotList.map(item => {
              return <CmtCourseCard item={item} key={item.id}></CmtCourseCard>;
            })}
        </View>
          {normalList && <Image className="cmtimg" src={newcmt} />}
          {!normalList && <View className="noMoreCmt">暂无更多评论</View>}
        <View className="cmtBigBox">
          {normalList &&
            normalList.map(item => {
              return <CmtCourseCard item={item} key={item.id}></CmtCourseCard>;
            })}
        </View>
        {nomorecmt && (
          <View className="nomore">已经到底啦，没有更多数据啦</View>
        )}
      </View>
    );
  }
}
