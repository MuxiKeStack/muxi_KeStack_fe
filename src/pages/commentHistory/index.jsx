import Taro, { Component } from '@tarojs/taro';
import { View, Image, Input } from '@tarojs/components';
import { MxIcon } from '../../components/common/MxIcon';
import MxRate from '../../components/common/MxRate/MxRate';
import Img from '../../assets/svg/avatar-img.svg';
import './index.scss';
import Fetch from '../../service/fetch'
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      // sum: 0,
  //     list: [
  //       {
  //         id: 0,
  //         user_info: {
  //           username: '我是一个小丸子',
  //           avatar: Img
  //         },
  //         time: '2019.8.23/11: 04', //暂时这样，到时候再该成时间格式？
  //         courseId: '0',
  //         course_name: '近代史纲要',
  //         teacher: '常弘',
  //         rate: 3,
  //         content:
  //           '我有一只小毛驴，我从来也不骑。有一天我心血来潮，骑着去赶集。我手里拿着小皮鞭，我心里正得意。',
  //         like_num: 3,
  //         comment_num: 5
  //       },
  //       {
  //         id: 1,
  //         user_info: {
  //           username: '我是一个小丸子',
  //           avatar: Img
  //         },
  //         time: '2019.8.23/11: 04', //暂时这样，到时候再该成时间格式？
  //         courseId: '0',
  //         course_name: '近代史纲要',
  //         teacher: '常弘',
  //         rate: 3,
  //         content:
  //           '我有一只小毛驴，我从来也不骑。有一天我心血来潮，骑着去赶集。我手里拿着小皮鞭，我心里正得意。',
  //         like_num: 3,
  //         comment_num: 5
  //       },
  //       {
  //         id: 2,
  //         user_info: {
  //           username: '我是一个小丸子',
  //           avatar: Img
  //         },
  //         time: '2019.8.23/11: 04', //暂时这样，到时候再该成时间格式？
  //         courseId: '0',
  //         course_name: '近代史纲要',
  //         teacher: '常弘',
  //         rate: 3,
  //         content:
  //           '我有一只小毛驴，我从来也不骑。有一天我心血来潮，骑着去赶集。我手里拿着小皮鞭，我心里正得意。',
  //         like_num: 3,
  //         comment_num: 5
  //       }
  //     ]
      };
    }
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '评课历史'
  };

  componentDidMount() {
    /*        courseList().then(res => {
                console.log(res);
                this.setState({
                    course: res.info,
                    });
                });*/
                
                      Fetch(
                        '/user/evaluations/',
                        {
                          limit:'10',
                        }
                      ,'GET').then(
                          res => {
                              if(res){
                                  console.log(res.data.list);
                              this.setState({
                                  list: res.data.list,
                              })
                          }
                          }
                      )
  }

  componentWillUnmount() {}

  componentDidHide() {}


  ChangeTodetails() {
    Taro.navigateTo({
      url: '/pages/courseDetails/courseDetails'
    });
  }

  render() {
    const { list } = this.state;
    return (
      <View className="index">
        {list.map(course => {
          return (
            <View className="card-container">
              <View className="user-info">
                <View className="avatar-container">
                  <Image
                    src={course.user_info.avatar}
                    className="avatar-image"
                  ></Image>
                </View>
                <View className="name-time">
                  <View className="name">{course.user_info.username}</View>
                  <View className="time">{course.time}</View>
                </View>
              </View>
              <View className="course-container">
                <View className="course-name" onClick={this.ChangeTodetails.bind(this)}>
                  {'#' + course.course_name} {'(' + course.teacher + ')'}{' '}
                </View>
                <View className='course-rate'>
                  <View className="rate-text">评价星级:</View>
                  <View className='rate-icon'><MxRate value={course.rate}></MxRate></View>
                </View>
                <View className='course-comment'>{course.content}</View>
              </View>
              <View className="like-and-comment">
                <MxLike theid={course.id} islike={course.is_like} likenum={course.like_num}></MxLike>
                <MxIcon type="cmmtBtn" className="comment-icon"></MxIcon>
                <View>{course.comment_num}</View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
