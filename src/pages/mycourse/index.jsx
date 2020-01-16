/* eslint-disable prettier/prettier */
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { MxPicker } from '../../components/common/MxPicker';
import { MxIcon } from '../../components/common/MxIcon';
import './index.scss';
import Fetch from '../../service/fetch';
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      selectorCheckedY: '选择学年',
      selectorCheckedT: '选择学期',
      selectoryears: [],
    };
    this.selectorterms = ['第一学期', '第二学期', '第三学期'];
  }
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '我的课程'
  };

  componentDidMount() {
    /*        courseList().then(res => {
                console.log(res);
                this.setState({
                    course: res.info,
                    });
                });*/
    // Fetch('api/v1/login/',{sid:'2018214877',password:'2yuhly0312'},'POST').then(
    //   res =>{
    //     console.log(res.data.token);
    //   }
    // );
    var sid = Taro.getStorageSync('sid');
    var newList = [];
    var firstYear = sid.slice(0,4);
    newList.push(firstYear+'-'+parseInt(parseInt(firstYear)+1));
    newList.push(parseInt(parseInt(firstYear)+1)+'-'+parseInt(parseInt(firstYear)+2));
    newList.push(parseInt(parseInt(firstYear)+2)+'-'+parseInt(parseInt(firstYear)+3));
    newList.push(parseInt(parseInt(firstYear)+3)+'-'+parseInt(parseInt(firstYear)+4));
    this.setState({
      selectoryears: newList,
    },()=>{
      console.log(this.state.selectoryears);
    })
  }

  componentWillUnmount() {}

  componentDidHide() {}
  handleChangeY = e => {
    this.setState({
      selectorCheckedY: this.state.selectoryears[e.detail.value]
    },()=>{
      console.log('现在选择的学年'+this.state.selectorCheckedY);//还是上一个时刻的state，setState滞后了在此处；
      var Y=0;
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
            console.log(res.data.data);
            if(res.data.data){
              this.setState({
                courses: res.data.data,
              })
            }
          }
        )
        .catch(err => Taro.showToast({title: '已经到底了',icon: 'none'}));
    });
    
  };
  handleChangeT = e => {
    this.setState({
      selectorCheckedT: this.selectorterms[e.detail.value]
    },()=>{
      var Y=0;
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
    Fetch(`api/v1/user/courses/?year=${Y}&term=${T}`, {sid: Taro.getStorageSync('sid'),password:Taro.getStorageSync('password')}, 'POST')
      .then(
        res =>{
          console.log(res.data.data);
          if(res.data.data){
            this.setState({
              courses: res.data.data,
            })
          }
        }
      )
      .catch(err => console.error(err));
    });  
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
          var leftIcon = course.is_evaluate ? 'solidC' : 'solidC';
          var rightIcon = course.is_evaluate ? 'check' : 'arrowRM';
          var hasComment = course.is_evaluate ? '已评课' : '未评课';
          var teacher = course.is_evaluate
            ? 'teacher-name'
            : 'teacher-name-color';
          return (
            <View
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/postReview/index?id=' + course.course_id
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
              <Text className="teacher-name">{course.teacher}</Text>
              <View className="float-right">
                <Text className={teacher}>{hasComment}</Text>
                <MxIcon
                  className="right-icon"
                  type={rightIcon}
                  width="42"
                  height="42"
                ></MxIcon>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
