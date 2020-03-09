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
      history: [],
      hidden: false,
      type: '',
      tagsState: [false, false, false, false, false],
      datas: [],
      // eslint-disable-next-line react/no-unused-state
      checkable: false,
      page: 1,
      isCollect: true
      // mask: 'mask',
      // masklist: 'masklist'
    };
  }
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '木犀课栈',
    enablePullDownRefresh: true
  };

  state = {
    // eslint-disable-next-line react/no-unused-state
    animation: '',

    // eslint-disable-next-line react/no-unused-state
    startX: 0, //开始坐标
    // eslint-disable-next-line react/no-unused-state
    startY: 0
  };

  // handleSave() {
  //   this.setState({
  //     mask: 'unmask',
  //     masklist: 'unmasklist'
  //   });
  // }

  handleChange(value) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      value
    });
  }

  ChangeTodetails() {
    Taro.navigateTo({
      url: '/pages/courseDetails/courseDetails'
    });
  }

  onPullDownRefresh() {
    this.setState({
      page: 1
    });
    Taro.showNavigationBarLoading();
    this.getHistorySearch();
  } //下拉事件

  onReachBottom() {
    this.setState({
      page: this.state.page + 1
    });
    Taro.showNavigationBarLoading();
    this.getHistorySearch();
  }

  getHistorySearch() {
    var that = this;
    Fetch(
      'api/v1/search/historyCourse/',
      {
        keyword: this.state.keyword,
        type: this.state.type,
        page: this.state.page,
        limit: '10'
      },
      'GET'
    ).then(data => {
      console.log(data);
      let newdatas = data.data.courses;
      if (newdatas != null) {
        Taro.stopPullDownRefresh();
        Taro.hideNavigationBarLoading();
        that.setState({
          datas: newdatas
        });
      } else {
        Taro.showToast({
          title: '到底了'
        });
        Taro.stopPullDownRefresh();
        Taro.hideNavigationBarLoading();
      }
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
  collect(hash) {
    Fetch(
      `api/v1/course/using/${hash}/favorite/`,
      {
        like_state: false
      },
      'PUT'
    ).then(res => {
      console.log(res);
      switch (res.code) {
        case 0:
          this.setState({
            isCollect: false
          });
          Taro.showToast({
            title: '已收藏',
            icon: 'success',
            duration: 2000
          });
          break;
        case 20302:
          Taro.showToast({
            title: '收藏失败',
            icon: 'none',
            duration: 2000
          });
          break;
      }
    });
  }
  //input的onClick
  handleClickInput() {
    this.setState({
      hidden: false
    });
    this.getHistorySearch();
  }
  //input的oninput
  handleClickContent(e) {
    this.setState({
      keyword: e.detail.value
    });
    if (e.detail.value == '') {
      this.setState({
        keyword: e.detail.value
      });
      this.getHistorySearch();
    }
  }
  //input的onfocus
  handleFocus() {
    this.setState({
      hidden: true
    });
  }
  //input的onchange
  onChhange(e) {
    if (e.detail.value != '') {
      let history = Taro.getStorageSync('history') || [];
      if (history.length < 10) {
        history.push({ id: history.length, title: e.detail.value });
      } else {
        history.pop();
        history.push({ id: history.length, title: e.detail.value });
      }
      this.setState({
        hidden: true,
        history: history
      });
      Taro.setStorageSync('history', history);
    }
  }
  //清除缓存历史并关闭历史搜索框
  onClearHistory() {
    this.setState({
      history: [],
      hidden: false
    });
    Taro.setStorageSync('history', []);
  }
  //input失去焦点
  handleBlur(e) {
    if (e.detail.value == '') {
      this.setState({
        hidden: false
      });
    }
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

  handleHistory(e) {
    const that = this;
    var text = e.currentTarget.dataset.title;
    console.log(text);
    that.setState(
      {
        keyword: text,
        hidden: false
      },
      () => {
        that.getHistorySearch();
      }
    );
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let tagState = this.state.tagsState;
    const isCollect = this.state.isCollect;
    let status = null;
    if (isCollect) {
      status = <Text>收藏</Text>;
    } else {
      status = <Text>已收藏</Text>;
    }
    const hidden = this.state.hidden;
    const { history } = this.state;
    const list = (
      <View className="index">
        <View className="history">历史记录</View>
        {history.map(h => {
          return (
            <View
              className="title"
              key={h.id}
              data-title={h.title}
              onClick={this.handleHistory.bind(this)}
            >
              {h.title}
            </View>
          );
        })}
        <View className="clear" onClick={this.onClearHistory.bind(this)}>
          清空
        </View>
      </View>
    );
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
                    <View className="class">{data.name}</View>
                    <View className="teacher">{data.teacher}</View>
                    <View className="num">{data.id}</View>
                  </View>
                  <View className="right">
                    <View className="blue">
                      <View className="star">
                        <MxRate
                          value={data.rat}
                          onChange={this.handleChange.bind(this)}
                          readOnly
                        />
                      </View>
                      <View className="word">评价人数：</View>
                      <View className="people">{data.stars_num}</View>
                    </View>
                    <View className="tag">
                      {data.attendance == '' && (
                        <View className="tag1">
                          <MxTag check={false} padding="1rpx 28rpx 3rpx 28rpx">
                            暂无评价
                          </MxTag>
                        </View>
                      )}
                      {data.attendance !== '' && (
                        <View className="tag1">
                          <MxTag check={false} padding="1rpx 28rpx 3rpx 28rpx">
                            {data.attendance}
                          </MxTag>
                        </View>
                      )}
                      {data.exam == '' && (
                        <View className="tag2">
                          <MxTag check={false} padding="1rpx 28rpx 3rpx 28rpx">
                            暂无评价
                          </MxTag>
                        </View>
                      )}
                      {data.exam !== '' && (
                        <View className="tag2">
                          <MxTag check={false} padding="1rpx 28rpx 3rpx 28rpx">
                            {data.exam}
                          </MxTag>
                        </View>
                      )}
                      {data.tags == '' && (
                        <View className="tag3">
                          <MxTag check={false} padding="1rpx 28rpx 3rpx 28rpx">
                            暂无课程特点评价
                          </MxTag>
                        </View>
                      )}
                      {data.tags != '' &&
                        data.tags.map(t => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <View className="tag3">
                              <MxTag
                                check={false}
                                padding="1rpx 28rpx 3rpx 28rpx"
                              >
                                {t}
                              </MxTag>
                            </View>
                          );
                        })}
                    </View>
                  </View>
                </MovableView>
              </MovableArea>
              <View
                className="itemDelete"
                onClick={this.collect.bind(this, data.hash)}
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
              leftSize="32rpx"
              rightSize="32rpx"
              width="670rpx"
              height="72rpx"
              background="rgba(241,240,245,1)"
              radius="36rpx"
              placeholder="搜索课程名/老师名"
              onClick={this.handleClickInput.bind(this)}
              onInput={this.handleClickContent.bind(this)}
              onChange={this.onChhange.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            ></MxInput>
          </View>
          {hidden && list}
          <View className="label1">
            <MxTag
              onClick={this.onClickTags.bind(this, 0)}
              font="28rpx"
              checkable={true}
              checked={tagState[0]}
              padding="1rpx 44rpx 1rpx 44rpx"
              checkedControl={true}
              border="2rpx solid rgba(110,102,238,1)"
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
              border="2rpx solid rgba(110,102,238,1)"
            >
              专业选修课
            </MxTag>
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
                border="2rpx solid rgba(110,102,238,1)"
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
                border="2rpx solid rgba(110,102,238,1)"
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
                border="2rpx solid rgba(110,102,238,1)"
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
