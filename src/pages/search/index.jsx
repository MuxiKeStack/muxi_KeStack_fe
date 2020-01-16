/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, MovableArea, MovableView } from '@tarojs/components';
import './index.scss';
import MxTag from '../../components/common/MxTag/index';
import MxRate from '../../components/common/MxRate/MxRate';
import MxInput from '../../components/common/MxInput/MxInput';
import Fetch from '../../service/fetch';

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      keyword: '',
      type: '',
      tagsState: [false, false, false, false, false],
      datas: [
        {
          text: '线性代数B',
          teacher: '张俊',
          people: '84',
          num: '2019347817462',
          tag1: '偶尔点名',
          tag2: '期末闭卷',
          tag3: '期末闭卷',
          tag4: '期末闭卷'
        },
        {
          text: '线性代数B',
          teacher: '张俊',
          people: '84',
          num: '2019347817462',
          tag1: '偶尔点名',
          tag2: '期末闭卷',
          tag3: '暂无课程特点评价',
          tag4: ''
        },
        {
          text: '线性代数B',
          teacher: '张俊',
          people: '84',
          num: '2019347817462',
          tag1: '偶尔点名',
          tag2: '期末闭卷',
          tag3: '期末闭卷',
          tag4: '期末闭卷'
        }
      ],
      value: 4,
      // eslint-disable-next-line react/no-unused-state
      checkable: false
    };
  }
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '木犀课栈'
  };

  state = {
    // eslint-disable-next-line react/no-unused-state
    animation: '',

    // eslint-disable-next-line react/no-unused-state
    startX: 0, //开始坐标
    // eslint-disable-next-line react/no-unused-state
    startY: 0
  };

  ChangeTodetails() {
    Taro.navigateTo({
      url: '/pages/courseDetails/courseDetails'
    });
  }

  getHistorySearch() {
    Fetch(
      'api/v1/search/historyCourse',
      {
        keyword: this.state.keyword,
        type: this.state.type,
        page: '1',
        limit: '10'
      },
      'GET'
    ).then(data => {
      console.log(data);
    });
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  // 滑动开始
  touchstart(e) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      startX: e.changedTouches[0].clientX,
      // eslint-disable-next-line react/no-unused-state
      startY: e.changedTouches[0].clientY
    });
  }

  //滑动事件处理 _index当前索引
  touchmove(e) {
    var that = this;

    var startX = that.state.startX; //开始X坐标
    var startY = that.state.startY; //开始Y坐标
    var touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标
    var touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标
    // var isLeft = _class.indexOf("leftMove") != -1; //往左滑的位置
    // var isRight = _class.indexOf("rightMove") != -1;//往右滑的位置
    //获取滑动角度
    var angle = that.angle(
      { X: startX, Y: startY },
      { X: touchMoveX, Y: touchMoveY }
    );
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) return;
    //右滑
    if (touchMoveX > startX) {
      console.log('右滑');
      //实例化一个动画
      let _animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'linear',
        delay: 100,
        transformOrigin: 'left top 0',
        success: function(res) {
          console.log(res);
        }
      });

      _animation.translateX(0).step();
      that.setState({
        //输出动画
        animation: _animation.export()
      });
    } else if (touchMoveX - startX < -10) {
      //左滑
      console.log('左滑');
      //实例化一个动画
      let _animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'linear',
        delay: 100,
        transformOrigin: 'left top 0',
        success: function(res) {
          console.log(res);
        }
      });
      _animation.translateX(-80).step();
      that.setState({
        //输出动画
        animation: _animation.export()
      });
    }
  }

  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y;
    //返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
  }

  componentWillMount() {
    console.log(this.$router.params);
  }

  componentDidMount() {
    let animation = Taro.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: 'left top 0',
      success: function(res) {
        console.log(res);
      }
    });
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      animation: animation
    });
    this.getHistorySearch();
  }
  collect() {
    let id = '112d34testsvggase';
    Fetch(
      `api/v1/course/using/${id}/favorite`,
      {
        like_state: false
      },
      'PUT'
    ).then(res => {
      switch (res.code) {
        case 0:
          // eslint-disable-next-line no-undef
          isCollect = true;
          break;
        case 20302:
          // eslint-disable-next-line no-undef
          isCollect = false;
          break;
      }
    });
  }

  handleClickInput() {
    this.getHistorySearch();
  }

  handleClickContent(event) {
    this.setState({
      keyword: event.detail.value
    });
  }

  onClickTags(num) {
    let state = [false, false, false, false, false];
    if (this.state.tagsState[num] != true) {
      state[num] = true;
    }

    this.setState(
      {
        type: num,
        tagsState: state
      },
      () => {
        console.log(this.state.type);
        console.log(this.state.tagsState);
        this.getHistorySearch();
      }
    );
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let tagState = this.state.tagsState;
    const isCollect = this.props.isCollect;
    let status = null;
    if (isCollect) {
      status = <Text>收藏</Text>;
    } else {
      status = <Text>已收藏</Text>;
    }
    const content = (
      <View className="detailsBoxes">
        {this.state.datas.map(data => {
          return (
            // eslint-disable-next-line react/jsx-key
            <View className="mx-card">
              <MovableArea className="cardm">
                <MovableView
                  damping="100"
                  out-of-bounds="true"
                  direction="horizontal"
                  className="card"
                  onTouchStart={this.touchstart.bind(this)}
                  onTouchEnd={this.touchmove.bind(this)}
                  animation={this.state.animation}
                  onClick={this.ChangeTodetails.bind(this)}
                >
                  <View className="user-info">
                    <View className="class">{data.text}</View>
                    <View className="teacher">{data.teacher}</View>
                    <View className="num">{data.num}</View>
                  </View>
                  <View>
                    <View className="blue">
                      <View className="star">
                        <MxRate
                          value={this.state.value}
                          onChange={this.handleChange.bind(this)}
                          readOnly
                        />
                      </View>
                      <View className="word">评价人数：</View>
                      <View className="people">{data.people}</View>
                    </View>
                    <View className="tag">
                      <View className="tag1">
                        <MxTag check={false} padding="1rpx 28rpx 3rpx 28rpx">
                          {data.tag1}
                        </MxTag>
                      </View>
                      <View className="tag2">
                        <MxTag check={false} padding="1rpx 28rpx 3rpx 28rpx">
                          {data.tag2}
                        </MxTag>
                      </View>
                      <View className="tag3">
                        <MxTag check={false} padding="1rpx 28rpx 3rpx 28rpx">
                          {data.tag3}
                        </MxTag>
                      </View>
                      <View className="tag4">
                        <MxTag check={false} padding="1rpx 28rpx 3rpx 28rpx">
                          {data.tag4}
                        </MxTag>
                      </View>
                    </View>
                  </View>
                </MovableView>
              </MovableArea>
              <View
                className="itemDelete right"
                onClick={this.collect.bind(this)}
              >
                {status}
              </View>
            </View>
          );
        })}
      </View>
    );

    return (
      <View style="display: block">
        <View className="chooseBox">
          <View className="search">
            <MxInput
              leftSrc="../../../assets/svg/searchicon.svg"
              leftSize="20px"
              width="670rpx"
              height="72rpx"
              background="rgba(241,240,245,1)"
              radius="36rpx"
              onClick={this.handleClickInput.bind(this)}
              onInput={this.handleClickContent.bind(this)}
            ></MxInput>
          </View>
        </View>
        <View className="label">
          <View>
            <View className="label1">
              <MxTag
                onClick={this.onClickTags.bind(this, 0)}
                font="28rpx"
                checkable={true}
                checked={tagState[0]}
                padding="1rpx 44rpx 1rpx 44rpx"
                checkedControl={true}
                border="2px solid rgba(110,102,238,1)"
              >
                专业必修课
              </MxTag>
            </View>
            <View className="label2">
              <MxTag
                onClick={this.onClickTags.bind(this, 1)}
                font="28rpx"
                checkable={true}
                checked={tagState[1]}
                padding="1rpx 44rpx 1rpx 44rpx"
                checkedControl={true}
                border="2px solid rgba(110,102,238,1)"
              >
                专业选修课
              </MxTag>
            </View>
          </View>
          <View>
            <View className="label3">
              <MxTag
                onClick={this.onClickTags.bind(this, 2)}
                font="28rpx"
                checkable={true}
                checked={tagState[2]}
                padding="1rpx 44rpx 1rpx 44rpx"
                checkedControl={true}
                border="2px solid rgba(110,102,238,1)"
              >
                通识核心课
              </MxTag>
            </View>
            <View className="label4">
              <MxTag
                onClick={this.onClickTags.bind(this, 3)}
                font="28rpx"
                checkable={true}
                checked={tagState[3]}
                padding="1rpx 44rpx 1rpx 44rpx"
                checkedControl={true}
                border="2px solid rgba(110,102,238,1)"
              >
                通识选修课
              </MxTag>
            </View>
            <View className="label5">
              <MxTag
                onClick={this.onClickTags.bind(this, 4)}
                font="28rpx"
                checkable={true}
                checked={tagState[4]}
                padding="1rpx 44rpx 1rpx 44rpx"
                checkedControl={true}
                border="2px solid rgba(110,102,238,1)"
              >
                公共课
              </MxTag>
            </View>
          </View>
        </View>
        {content}
      </View>
    );
  }
}
