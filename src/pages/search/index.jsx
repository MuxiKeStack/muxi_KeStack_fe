/* eslint-disable react/jsx-boolean-value */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, MovableArea, MovableView } from '@tarojs/components';
import './index.scss';
import MxTag from '../../components/common/MxTag/index';
import MxRate from '../../components/common/MxRate/MxRate';
import MxInput from '../../components/common/MxInput/MxInput';
import MxGuide from '../../components/common/MxGuide/index';
import Fetch from '../../service/fetch';

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      status: false,
      inputVal: '',
      keyword: '',
      history: [],
      hidden: false,
      type: '',
      tagsState: [false, false, false, false, false],
      datas: [],
      // eslint-disable-next-line react/no-unused-state
      checkable: false,
      page: 1,
      X: 0,
      // mask: 'mask',
      // masklist: 'masklist',
      courseCollected: [],
      isFir: true
    };
  }
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '搜索查询',
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  };

  handleChange(value) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      value
    });
  }

  ChangeTodetails(value) {
    Taro.navigateTo({
      url: `/pages/courseDetails/courseDetails?courseId=${value}`
    });
  }

  onPullDownRefresh() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        console.log(this.state.page);
        Taro.showNavigationBarLoading();
        this.getHistorySearch();
      }
    );
  } //下拉事件

  onReachBottom() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        console.log(this.state.page);
        Taro.showNavigationBarLoading();
        this.getHistorySearch();
      }
    );
  }

  componentWillMount() {}

  componentDidMount() {
    this.getHistorySearch();
    this.getCollected();
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
      if (newdatas != '') {
        let ndatas = this.state.datas;
        ndatas = ndatas.concat(newdatas);
        Taro.stopPullDownRefresh();
        Taro.hideNavigationBarLoading();
        that.setState({
          datas: ndatas
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

  getCollected() {
    Fetch(
      'api/v1/collection/',
      {
        limit: 100,
        last_id: 0
      },
      'GET'
    ).then(data => {
      let courseCollected = data.data.list.map(a => a.course_id);
      this.setState({
        courseCollected: courseCollected
      });
    });
  }

  collect(hash) {
    if (!Taro.getStorageSync('sid')) {
      Taro.navigateTo({
        url: '/pages/login/index'
      });
    }
    Fetch(
      `api/v1/course/using/${hash}/favorite/`,
      {
        like_state: false
      },
      'PUT'
    ).then(res => {
      this.setCollect(hash);
      switch (res.code) {
        case 0: {
          Taro.showToast({
            title: '已收藏',
            icon: 'success',
            duration: 1000
          });
          break;
        }
        case 20302: {
          Taro.showToast({
            title: '已收藏',
            duration: 1000
          });
          break;
        }
      }
    });
  }
  setCollect(h) {
    let newCollected = this.state.courseCollected;
    newCollected.push(h);
    this.setState({
      courseCollected: newCollected
    });
  }
  judge(h) {
    let collectState = Taro.getStorageSync('_collect') || [];
    for (let i = 0; i < collectState.length; i++) {
      if (collectState[i].a === h) {
        let b = collectState[i].b;
        this.setState({
          status: b
        });
        return true;
      }
    }
    return false;
  }
  touchstart(h) {
    let collectState = Taro.getStorageSync('_collect') || [];
    if (!this.judge(h)) {
      collectState.push({ a: h, b: false });
    }
    this.setState({
      // collectState: collectState
    });
    Taro.setStorageSync('_collect', collectState);
  }

  //input的onClick
  handleClickInput() {
    this.setState(
      {
        hidden: false,
        datas: [],
        page: 1
      },
      () => {
        this.getHistorySearch();
      }
    );
  }
  //input的onconfirm
  handleClickContent(e) {
    this.setState(
      {
        keyword: e.detail.value,
        datas: [],
        page: 1,
        hidden: false
      },
      () => {
        this.getHistorySearch();
      }
    );
  }
  //input的onfocus
  handleFocus() {
    let history = Taro.getStorageSync('history') || [];
    this.setState({
      hidden: true,
      history: history
    });
  }
  //input的onchange
  onChhange(e) {
    if (e.detail.value != '') {
      let history = Taro.getStorageSync('history') || [];
      if (history.length < 6) {
        history.push({ id: history.length, title: e.detail.value });
      } else {
        history.pop();
        history.push({ id: history.length, title: e.detail.value });
      }
      this.setState({
        // hidden: true,
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

  onClickTags(num, e) {
    console.log(e);
    let state = [false, false, false, false, false];
    if (this.state.tagsState[num] != true) {
      state[num] = true;
    }

    this.setState(
      {
        type: num,
        tagsState: state,
        datas: [],
        page: 1
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
        inputVal: text,
        keyword: text,
        hidden: false,
        datas: [],
        page: 1
      },
      () => {
        that.getHistorySearch();
      }
    );
  }
  handleCancel() {
    this.setState(
      {
        inputVal: '',
        hidden: false,
        keyword: '',
        datas: [],
        page: 1
      },
      () => {
        this.getHistorySearch();
      }
    );
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

  render() {
    const isFir = this.state.isFir;
    let inputVal = this.state.inputVal;
    let status = this.state.status;
    let collected = this.state.courseCollected;
    let tagState = this.state.tagsState;
    const hidden = this.state.hidden;
    const { history } = this.state;
    const list = (
      <View className="index">
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
          清除全部
        </View>
      </View>
    );
    const content = (
      <View className="detailsBoxes">
        {this.state.datas.map((data, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <View className="mx-card">
              <MovableArea className="cardm">
                <MovableView
                  damping="100"
                  animation={false}
                  outOfBounds
                  direction="horizontal"
                  className="card"
                  X={this.state.X}
                  onTouchStart={this.touchstart.bind(this, data.hash)}
                  onTouchEnd={this.touchstart.bind(this, data.hash)}
                  // animation={this.state.animation}
                  onClick={this.ChangeTodetails.bind(this, data.hash)}
                >
                  <View className="user-info">
                    <View className="class">{data.name}</View>
                    <View className="teacher">{data.teacher}</View>
                    <View className="num">{data.course_id}</View>
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
                          <MxTag
                            check={false}
                            font="24rpx"
                            padding="3rpx 28rpx 3rpx 28rpx"
                          >
                            暂无评价
                          </MxTag>
                        </View>
                      )}
                      {data.attendance !== '' && (
                        <View className="tag1">
                          <MxTag
                            check={false}
                            font="24rpx"
                            padding="3rpx 28rpx 3rpx 28rpx"
                          >
                            {data.attendance}
                          </MxTag>
                        </View>
                      )}
                      {data.exam == '' && (
                        <View className="tag2">
                          <MxTag
                            check={false}
                            font="24rpx"
                            padding="3rpx 28rpx 3rpx 28rpx"
                          >
                            暂无评价
                          </MxTag>
                        </View>
                      )}
                      {data.exam !== '' && (
                        <View className="tag2">
                          <MxTag
                            check={false}
                            font="24rpx"
                            padding="3rpx 28rpx 3rpx 28rpx"
                          >
                            {data.exam}
                          </MxTag>
                        </View>
                      )}
                      {data.tags == '' && (
                        <View className="tag3">
                          <MxTag
                            check={false}
                            font="24rpx"
                            padding="3rpx 28rpx 3rpx 28rpx"
                          >
                            暂无课程特点评价
                          </MxTag>
                        </View>
                      )}
                      {data.tags != '' && (
                        <View>
                          <View className="tag3">
                            <MxTag
                              check={false}
                              font="24rpx"
                              padding="3rpx 28rpx 3rpx 28rpx"
                            >
                              {data.tags[0]}
                            </MxTag>
                          </View>
                          <View className="tag4">
                            <MxTag
                              check={false}
                              font="24rpx"
                              padding="3rpx 28rpx 3rpx 28rpx"
                            >
                              {data.tags[1]}
                            </MxTag>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </MovableView>
              </MovableArea>
              <View
                className="itemDelete"
                onClick={this.collect.bind(this, data.hash, index)}
              >
                {collected.indexOf(data.hash) === -1 ? (
                  <Text>收藏</Text>
                ) : (
                  <Text>已收藏</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );

    return (
      <View style="display: block">
        {isFir && <MxGuide type="search"></MxGuide>}
        <View className="chooseBox">
          <View className="search">
            <MxInput
              value={inputVal}
              confirmType="search"
              leftSrc="../../../assets/svg/searchicon.svg"
              rightSrc="../../../assets/svg/cross.svg"
              leftSize="32rpx"
              rightSize="48rpx"
              padding1="20rpx"
              padding2="10rpx"
              width="670rpx"
              height="72rpx"
              background="rgba(241,240,245,1)"
              radius="36rpx"
              placeholder="搜索课程名/老师名"
              onClick1={this.handleClickInput.bind(this)}
              onClick2={this.handleCancel.bind(this)}
              onChange={this.onChhange.bind(this)}
              onConfirm={this.handleClickContent.bind(this)}
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
              // padding="1rpx 44rpx 1rpx 44rpx"
              width="200rpx"
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
              // padding="1rpx 44rpx 1rpx 44rpx"
              width="200rpx"
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
                // padding="1rpx 44rpx 1rpx 44rpx"
                width="200rpx"
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
                // padding="1rpx 44rpx 1rpx 44rpx"
                width="200rpx"
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
                // padding="1rpx 44rpx 1rpx 44rpx"
                width="200rpx"
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
