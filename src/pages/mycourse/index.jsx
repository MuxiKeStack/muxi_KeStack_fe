/* eslint-disable prettier/prettier */
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { MxPicker } from '../../components/common/MxPicker';
import { MxIcon } from '../../components/common/MxIcon';
import './index.scss';
import Fetch from '../../service/fetch';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      selectorCheckedY: '选择学年',
      selectorCheckedT: '选择学期',
      selectoryears: [],
    };
    this.selectorterms = ['第一学期', '第二学期', '第三学期', '全部学期'];
  }
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '我的课程'
  };
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }
  componentDidMount() {
    var sid = Taro.getStorageSync('sid');
    var newList = [];
    var firstYear = sid.slice(0,4);
    newList.push(firstYear+'-'+parseInt(parseInt(firstYear)+1));
    newList.push(parseInt(parseInt(firstYear)+1)+'-'+parseInt(parseInt(firstYear)+2));
    newList.push(parseInt(parseInt(firstYear)+2)+'-'+parseInt(parseInt(firstYear)+3));
    newList.push(parseInt(parseInt(firstYear)+3)+'-'+parseInt(parseInt(firstYear)+4));
    newList.push('全部学年');
    this.setState({
      selectoryears: newList,
    },this.getData());
  }

  componentWillUnmount() {}

  componentDidHide() {}

  getData(){
      // console.log('现在选择的学年'+this.state.selectorCheckedY);//还是上一个时刻的state，setState滞后了在此处；
      Taro.showNavigationBarLoading();
      var Y;
      var T;
      switch (this.state.selectorCheckedT) {
        case '第一学期':
          T = 1;
          break;
        case '第二学期':
          T = 2;
          break;
        case '第三学期':
          T = 3;
          break;
        default:
          T = 0;
      }
      switch (this.state.selectorCheckedY) {
        case this.state.selectoryears[0]:
          Y = this.state.selectoryears[0].slice(0,4);
          break;
        case this.state.selectoryears[1]:
          Y = this.state.selectoryears[1].slice(0,4);
          break;
        case this.state.selectoryears[2]:
          Y = this.state.selectoryears[2].slice(0,4);
          break;
        case this.state.selectoryears[3]:
          Y = this.state.selectoryears[3].slice(0,4);
          break;
        default:
          Y = '0';
      }
      Fetch(`api/v1/user/courses/?year=${Y}&term=${T}`, {sid:Taro.getStorageSync('sid'),password:Taro.getStorageSync('password')}, 'POST')
        .then(
          res =>{
            // console.log(res.data.data);
            Taro.hideNavigationBarLoading()
            if(res.data.sum > 0){
              this.setState({
                courses: res.data.data,
              })
            } else if(res.data.sum == 0){
              this.setState({
                courses: [],
              });
              Taro.showToast({title: '无数据',icon: 'none'})
            }
          }
        )
        .catch(err => {
          Taro.showToast({title: '查询失败，请稍后再试',icon: 'none'})
          Taro.hideNavigationBarLoading()
      });
  }
  handleChangeY = e => {
    this.setState({
      selectorCheckedY: this.state.selectoryears[e.detail.value]
    },() => this.getData())
  };
  handleChangeT = e => {
    this.setState({
      selectorCheckedT: this.selectorterms[e.detail.value]
    },() => this.getData())
  };

  render() {
    const { courses } = this.state;
    return (
      <View className="index">
        <View className="mycourse_page-picker-container">
          <View className="select-year">
            <MxPicker
              width="257"
              selector={this.state.selectoryears}
              selectorChecked={this.state.selectorCheckedY}
              onChange={this.handleChangeY.bind(this)}
            />
          </View>
          <View className="select-term">
            <MxPicker
              width="267"
              selector={this.selectorterms}
              selectorChecked={this.state.selectorCheckedT}
              onChange={this.handleChangeT.bind(this)}
            />
          </View>
        </View>
        {courses.map(course => {
          var leftIcon = course.has_evaluated ? 'solidC' : 'solidC';
          var rightIcon = course.has_evaluated ? 'check' : 'arrowRM';
          var hasComment = course.has_evaluated ? '已评课' : '未评课';
          var textClassName = course.has_evaluated? "text-normal":"text-special";
          return (
            <View
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/postReview/index?name=' + course.name + '&' + 'id=' + course.course_id
                })
              }
              key={course.id}
              className="mycourse_page-courselist-item"
            >
              <MxIcon
                className="left-icon"
                type={leftIcon}
                width="27"
                height="27"
              ></MxIcon>
              <Text className="course-name">{course.name}</Text>
              <Text className="teacher-name">{'('+course.teacher+')'}</Text>

                <Text className={textClassName}>{hasComment}</Text>
                <MxIcon
                  className="right-icon"
                  type={rightIcon}
                  width="42"
                  height="42"
                ></MxIcon>

            </View>
          );
        })}
      </View>
    );
  }
}
