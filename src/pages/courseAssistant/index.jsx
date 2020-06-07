import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import MxInput from '../../components/common/MxInput/MxInput';
import MxPicker from '../../components/common/MxPicker';
import MxTag from '../../components/common/MxTag/index';
import MxRate from '../../components/common/MxRate/MxRate';
import MxGuide from '../../components/common/MxGuide/index';
import Fetch from '../../service/fetch';

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '选课助手',
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  };

  constructor() {
    super(...arguments);
    this.state = {
      inputVal: '',
      kindChecked: '课程性质',
      checkKind: [
        '全部课程',
        '公共课',
        '专业必修课',
        '专业选修课',
        '通识选修课',
        '通识核心课'
      ],
      colledgeChecked: '上课学院',
      checkColledge: [
        '全部学院',
        '城市与环境科学学院',
        '历史文化学院',
        '社会学院',
        '生命科学学院',
        '公共管理学院',
        '文学院',
        '计算机学院',
        '外国语学院',
        '数学与统计学院',
        '化学学院',
        '教育学院',
        '物理科学与技术学院',
        '新闻传播学院',
        '体育学院',
        '马克思主义学院',
        '经济与工商管理学院',
        '信息管理学院',
        '音乐学院',
        '心理学院',
        '国家数字化学习工程技术研究中心',
        '法学院',
        '教育信息技术学院',
        '美术学院',
        '政治与国际关系学院'
      ],
      timeChecked: '上课时间',
      checkTime: [
        '全部时间',
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六',
        '周日'
      ],
      placeChecked: '上课地点',
      checkPlace: ['全部地点', '本校区', '南湖'],
      keyword: '',
      records: [],
      hidden: false,
      type: '',
      academy: '',
      weekday: '',
      place: '',
      page: 1,
      datas: []
    };
  }

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

  ChangeTofree() {
    Taro.navigateTo({
      url: '/pages/freeCourse/index'
    });
  }

  onPullDownRefresh() {
    this.setState({
      page: 1
    });
    Taro.showNavigationBarLoading();
    this.getSearch();
  } //下拉事件

  onReachBottom() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => Taro.showNavigationBarLoading(),
      this.getSearch()
    );
  }

  getSearch() {
    var that = this;
    Fetch(
      'api/v1/search/course/',
      {
        keyword: this.state.keyword,
        type: this.state.type,
        academy: this.state.academy,
        weekday: this.state.weekday,
        place: this.state.place,
        page: this.state.page,
        limit: 10
      },
      'GET'
    ).then(data => {
      // console.log(data);
      let newdatas = data.data.courses;
      if (newdatas != null) {
        let ndatas = this.state.datas;
        ndatas = ndatas.concat(newdatas);
        Taro.stopPullDownRefresh();
        Taro.hideNavigationBarLoading();
        that.setState({
          datas: ndatas
        });
        // console.log(newdatas);
      } else {
        Taro.showToast({
          title: '到底啦'
        });
        Taro.stopPullDownRefresh();
        Taro.hideNavigationBarLoading();
      }
    });
  }

  handleChangeKind(e) {
    if (e.detail.value != 0) {
      this.setState(
        {
          kindChecked: this.state.checkKind[e.detail.value],
          type: e.detail.value - 1,
          datas: [],
          page: 1
        },
        () => {
          this.getSearch();
        }
      );
    } else {
      this.setState(
        {
          kindChecked: this.state.checkKind[e.detail.value],
          type: '',
          datas: [],
          page: 1
        },
        () => {
          this.getSearch();
        }
      );
    }
  }
  handleChangeColledge(e) {
    if (e.detail.value != 0) {
      this.setState(
        {
          colledgeChecked: this.state.checkColledge[e.detail.value],
          academy: this.state.checkColledge[e.detail.value],
          datas: [],
          page: 1
        },
        () => {
          this.getSearch();
        }
      );
    } else {
      this.setState(
        {
          colledgeChecked: this.state.checkColledge[e.detail.value],
          academy: '',
          datas: [],
          page: 1
        },
        () => {
          this.getSearch();
        }
      );
    }
  }
  handleChangeTime(e) {
    if (e.detail.value != 0) {
      this.setState(
        {
          timeChecked: this.state.checkTime[e.detail.value],
          weekday: e.detail.value,
          datas: [],
          page: 1
        },
        () => {
          this.getSearch();
        }
      );
    } else {
      this.setState(
        {
          timeChecked: this.state.checkTime[e.detail.value],
          weekday: '',
          datas: [],
          page: 1
        },
        () => {
          this.getSearch();
        }
      );
    }
  }
  handleChangePlace(e) {
    if (e.detail.value != 0) {
      this.setState(
        {
          placeChecked: this.state.checkPlace[e.detail.value],
          place: this.state.checkPlace[e.detail.value],
          datas: [],
          page: 1
        },
        () => {
          this.getSearch();
        }
      );
    } else {
      this.setState(
        {
          placeChecked: this.state.checkPlace[e.detail.value],
          place: '',
          datas: [],
          page: 1
        },
        () => {
          this.getSearch();
        }
      );
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.getSearch();
  }

  handleClickInput() {
    this.setState(
      {
        hidden: false,
        datas: []
      },
      () => {
        this.getSearch();
      }
    );
  }

  handleClickContent(e) {
    this.setState(
      {
        keyword: e.detail.value,
        datas: [],
        hidden: false
      },
      () => {
        this.getSearch();
      }
    );
  }

  //input的onfocus
  handleFocus() {
    let records = Taro.getStorageSync('records') || [];
    this.setState({
      hidden: true,
      records: records
    });
  }

  onChhange(e) {
    if (e.detail.value != '') {
      let records = Taro.getStorageSync('records') || [];
      if (records.length < 6) {
        records.push({ id: records.length, title: e.detail.value });
      } else {
        records.pop();
        records.push({ id: records.length, title: e.detail.value });
      }
      this.setState({
        // hidden: true,
        records: records
      });
      Taro.setStorageSync('records', records);
    }
  }
  //清除缓存历史并关闭历史搜索框
  onClearHistory() {
    this.setState({
      records: [],
      hidden: false
    });
    Taro.setStorageSync('records', []);
  }

  handleHistory(e) {
    const that = this;
    var text = e.currentTarget.dataset.title;
    // console.log(text);
    that.setState(
      {
        inputVal: text,
        keyword: text,
        hidden: false,
        datas: [],
        page: 1
      },
      () => {
        that.getSearch();
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
        this.getSearch();
      }
    );
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let isFir = Taro.getStorageSync('isFir');
    let inputVal = this.state.inputVal;
    const hidden = this.state.hidden;
    const { records } = this.state;
    const list = (
      <View className="index">
        {records.map(record => {
          // eslint-disable-next-line react/jsx-key
          return (
            <View
              className="title"
              key={record.id}
              data-title={record.title}
              onClick={this.handleHistory.bind(this)}
            >
              {record.title}
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
        <View onClick={this.ChangeTofree.bind(this)} className="fab">
          课
        </View>
        {this.state.datas.map(data => {
          return (
            // eslint-disable-next-line react/jsx-key
            <View className="detailsBox">
              <View
                className="mx-card"
                onClick={this.ChangeTodetails.bind(this, data.hash)}
              >
                <View className="user-info">
                  <View className="class">{data.name}</View>
                  <View className="teacher">{data.teacher}</View>
                  <View className="num">{data.course_id}</View>
                </View>
                <View>
                  <View className="rate">
                    <View className="star">
                      <MxRate value={data.rate} />
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
                    {data.tags != '' &&
                      data.tags.map(t => {
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <View className="tag3">
                            <MxTag
                              check={false}
                              font="24rpx"
                              padding="3rpx 28rpx 3rpx 28rpx"
                            >
                              {t}
                            </MxTag>
                          </View>
                        );
                      })}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );

    return (
      <View style="display: block">
        {isFir && <MxGuide type="helper1"></MxGuide>}
        {isFir && <MxGuide type="helper2"></MxGuide>}
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
              placeholder="搜索课程名/老师名/课程序号"
              onClick1={this.handleClickInput.bind(this)}
              onClick2={this.handleCancel.bind(this)}
              onConfirm={this.handleClickContent.bind(this)}
              onChange={this.onChhange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            ></MxInput>
          </View>
          {hidden && list}
          <View className="choicePicker">
            <View className="choicePicker1">
              <MxPicker
                selectorChecked={this.state.kindChecked}
                selector={this.state.checkKind}
                width="170rpx"
                onChange={this.handleChangeKind.bind(this)}
              />
            </View>
            <View className="choicePicker2">
              <MxPicker
                selectorChecked={this.state.colledgeChecked}
                selector={this.state.checkColledge}
                width="170rpx"
                onChange={this.handleChangeColledge.bind(this)}
              />
            </View>
            <View className="choicePicker3">
              <MxPicker
                selectorChecked={this.state.timeChecked}
                selector={this.state.checkTime}
                width="170rpx"
                onChange={this.handleChangeTime.bind(this)}
              />
            </View>
            <View className="choicePicker4">
              <MxPicker
                selectorChecked={this.state.placeChecked}
                selector={this.state.checkPlace}
                width="180rpx"
                onChange={this.handleChangePlace.bind(this)}
              />
            </View>
          </View>
        </View>
        {content}
      </View>
    );
  }
}
