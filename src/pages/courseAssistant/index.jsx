import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';
import MxInput from '../../components/common/MxInput/MxInput';
import MxFab from '../../components/common/MxFab';
import MxPicker from '../../components/common/MxPicker'

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '选课助手'
  };

  constructor() {
    super(...arguments);
    this.state = {
      kindChecked: "课程性质",
      checkKind: ['通识必修课','通识选修课','通识核心课','专业必修课','专业选修课'],
      timeChecked: "上课时间",
      checkTime: ['周一','周二','周三','周四','周五'],
      placeChecked: "上课地点",
      checkPlace: ['本校','南湖'],
      // eslint-disable-next-line react/no-unused-state
      value: 5,
      datas: [
        {
          text: '马克思主义基本原理',
          teacher: '张俊',
          num: '2019347817462',
          people: '23',
          time: '周二7~8；周四5~6',
          address: '7203(东区)'
        },
        {
          text: '线性代数B',
          teacher: '张俊',
          num: '2019347817462',
          people: '23',
          time: '周二7~8；周四5~6',
          address: '7203(东区)'
        },
        {
          text: '线性代数B',
          teacher: '张俊',
          num: '2019347817462',
          people: '23',
          time: '周二7~8；周四5~6',
          address: '7203(东区)'
        }
      ]
    };
  }

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

  ChangeTofree() {
    Taro.navigateTo({
      url: '/pages/freeCourse/index'
    });
  }


  handleChangeKind = e => {
    this.setState({
        kindChecked: this.state.checkKind[e.detail.value],
    },()=>{
      console.log(this.state.kindChecked)
    });
  };
  handleChangeTime = e => {
    this.setState({
        timeChecked: this.state.checkTime[e.detail.value],
    },()=>{
      console.log(this.state.timeChecked)
    });
};
handleChangePlace = e => {
  this.setState({
      placeChecked: this.state.checkPlace[e.detail.value],
  },()=>{
    console.log(this.state.placeChecked)
  });
};

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const content = (
      <View className="detailsBoxes">
        <MxFab back>置顶</MxFab>
        {this.state.datas.map(data => {
          return (
            // eslint-disable-next-line react/jsx-key
            <View className="detailsBox">
              <View
                className="mx-card"
                onClick={this.ChangeTodetails.bind(this)}
              >
                <View className="info">
                  <View className="user-info">
                    <View className="class">{data.text}</View>
                    <View className="teacher">{data.teacher}</View>
                    <View className="num">{data.num}</View>
                  </View>
                  <View className="ta">
                    <View className="time">
                      <Text>{data.time}</Text>
                    </View>
                    <View className="address">
                      <Text>{data.address}</Text>
                    </View>
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
        <View className="chooseBox">
          <View className="search">
            <MxInput
              leftSrc="../../../assets/svg/searchicon.svg"
              leftSize="20px"
              width="670rpx"
              height="72rpx"
              background="rgba(241,240,245,1)"
              radius="36rpx"
            ></MxInput>
            <MxPicker
              selectorChecked={this.state.kindChecked}
              selector={this.state.checkKind}
              width='170rpx'
              onChange={this.handleChangeKind.bind(this)}
              className='choicePicker'
            />
            <MxPicker
              selectorChecked={this.state.timeChecked}
              selector={this.state.checkTime}
              width='170rpx'
              onChange={this.handleChangeTime.bind(this)}
              className='choicePicker'
            />
            <MxPicker
              selectorChecked={this.state.timeChecked}
              selector={this.state.checkTime}
              width='170rpx'
              onChange={this.handleChangeTime.bind(this)}
              className='choicePicker'
            />
            <MxPicker
              selectorChecked={this.state.placeChecked}
              selector={this.state.checkPlace}
              width='170rpx'
              onChange={this.handleChangePlace.bind(this)}
              className='choicePicker'
            />
          </View>
        </View>
        {content}
      </View>
    );
  }
}
