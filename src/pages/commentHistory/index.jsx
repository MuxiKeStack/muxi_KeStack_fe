import Taro, { Component } from '@tarojs/taro';
import { View, Image, Input } from '@tarojs/components';
import { MxIcon } from '../../components/common/MxIcon';
import MxRate from '../../components/common/MxRate/MxRate';
import Img from '../../assets/svg/avatar-img.svg';
import './index.scss';
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {
          id: 0,
          userInfo: {
            userName: '我是一个小丸子',
            avatar: Img
          },
          time: '2019.8.23/11: 04', //暂时这样，到时候再该成时间格式？
          courseId: '0',
          courseName: '近代史纲要',
          teacher: '常弘',
          rate: 3,
          content:
            '我有一只小毛驴，我从来也不骑。有一天我心血来潮，骑着去赶集。我手里拿着小皮鞭，我心里正得意。',
          likeNum: 3,
          commentNum: 5
        },
        {
          id: 1,
          userInfo: {
            userName: '我是一个小丸子',
            avatar: Img
          },
          time: '2019.8.23/11: 04', //暂时这样，到时候再该成时间格式？
          courseId: '0',
          courseName: '近代史纲要',
          teacher: '常弘',
          rate: 3,
          content:
            '我有一只小毛驴，我从来也不骑。有一天我心血来潮，骑着去赶集。我手里拿着小皮鞭，我心里正得意。',
          likeNum: 3,
          commentNum: 5
        },
        {
          id: 2,
          userInfo: {
            userName: '我是一个小丸子',
            avatar: Img
          },
          time: '2019.8.23/11: 04', //暂时这样，到时候再该成时间格式？
          courseId: '0',
          courseName: '近代史纲要',
          teacher: '常弘',
          rate: 3,
          content:
            '我有一只小毛驴，我从来也不骑。有一天我心血来潮，骑着去赶集。我手里拿着小皮鞭，我心里正得意。',
          likeNum: 3,
          commentNum: 5
        }
      ]
    };
  }
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '消息提醒'
  };

  componentDidMount() {
    /*        courseList().then(res => {
                console.log(res);
                this.setState({
                    course: res.info,
                    });
                });*/
  }

  componentWillUnmount() {}

  componentDidHide() {}


  ChangeTodetails() {
    Taro.navigateTo({
      url: '/pages/courseDetails/courseDetails'
    });
  }

  render() {
    const { courses } = this.state;
    return (
      <View className="index">
        {courses.map(course => {
          return (
            <View className="card-container">
              <View className="user-info">
                <View className="avatar-container">
                  <Image
                    src={course.userInfo.avatar}
                    className="avatar-image"
                  ></Image>
                </View>
                <View className="name-time">
                  <View className="name">{course.userInfo.userName}</View>
                  <View className="time">{course.time}</View>
                </View>
              </View>
              <View className="course-container">
                <View className="course-name" onClick={this.ChangeTodetails.bind(this)}>
                  {'#' + course.courseName} {'(' + course.teacher + ')'}{' '}
                </View>
                <View className='course-rate'>
                  <View className="rate-text">评价星级:</View>
                  <View className='rate-icon'><MxRate value={course.rate}></MxRate></View>
                </View>
                <View className='course-comment'>{course.content}</View>
              </View>
              <View className="like-and-comment">
                <MxIcon type="likeBtn" className="like-icon"></MxIcon>
                <View>{course.likeNum}</View>
                <MxIcon type="cmmtBtn" className="comment-icon"></MxIcon>
                <View>{course.commentNum}</View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
