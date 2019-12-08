import Taro, { Component } from '@tarojs/taro';
import { View, Image, Input } from '@tarojs/components';
import { MxIcon } from '../../components/common/MxIcon';
import Img from '../../assets/svg/avatar-img.svg';
import './index.scss';
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'
import Fetch from '../../service/fetch';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: []
      //   messageList: [
      //     {
      //       id: 0,
      //       user_info: {
      //         username: '我是一个小丸子',
      //         avatar: Img
      //         //暂时这样，到时候再该成时间格式？
      //       },
      //       time: '2019.8.23/11: 04',
      //       course_info: {
      //         course_name: '线性代数',
      //         teacher: '李书刚',
      //         comment:
      //           '在晚上上课，经常很困，书上的证明难，但是考的很简单，经常要交作业，不怎么点名，老师很有个性。在晚上上课，经常很困，书上的证明难，但是考的很简单，经常要交作业，不怎么点名，老师很有个性'
      //       },
      //       is_like: true,
      //       isComment: true,
      //       reply: '哈哈哈，怎么有个性了',
      //       is_read: false
      //     },
      //     {
      //       id: 1,
      //       user_info: {
      //         username: '我是一个小丸子',
      //         avatar: Img
      //       },
      //       time: '2019.8.23/11: 04',
      //       course_info: {
      //         course_name: '诗苑经典的芳菲世界',
      //         teacher: '苏云',
      //         comment:
      //           '上课经常要用手机操作和答题，总之事情有点多，每次上课都要手势签到或者拍旁边人的照片，很难逃课'
      //       },
      //       is_like: false,
      //       isComment: true,
      //       reply: '这真的有点惨',
      //       is_read: false
      //     },
      //     {
      //       id: 2,
      //       user_info: {
      //         username: '系统消息',
      //         avatar: Img
      //       },
      //       time: '2019.8.23/11: 04',
      //       course_info: {
      //         course_name: '诗苑经典的芳菲世界',
      //         teacher: '苏云',
      //         comment: '未评课！'
      //       },
      //       is_like: false,
      //       isComment: false,
      //       reply: '',
      //       is_read: false
      //     }
      //   ]
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
    Fetch('api/v1/message', { limit: 30 }, 'GET').then(res => {
      if (res) {
        console.log(res.data),
          this.setState({
            messageList: res.data
          });
      }
    });
  }
  toNormalTime(timestamp) {
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

  componentWillUnmount() {}

  componentDidHide() {}

  render() {
    const { messageList } = this.state;
    return (
      <View className="index">
        {messageList.map((message, index) => {
          var isComment = message.reply == '' ? false : true;
          return (
            <View key={index}>
              {message.is_like && (
                <View className="card-container">
                  <View className="user-info">
                    <View className="avatar-container">
                      <Image
                        src={message.user_info.avatar}
                        className="avatar-image"
                      ></Image>
                    </View>
                    <View className="name-time">
                      <View className="name">{message.user_info.username}</View>
                      <View className="time">
                        {this.toNormalTime(message.time)}
                      </View>
                    </View>
                  </View>
                  <View className="message-text">
                    <View>
                      <MxIcon type="likeBtn"></MxIcon>
                    </View>
                    <View className="detail-text">赞了我</View>
                  </View>
                  <View className="course-container">
                    <View className="course-name">
                      {'#' + message.course_info.course_name}{' '}
                      {'(' + message.course_info.teacher + ')'}
                    </View>{' '}
                    {message.course_info.content}
                  </View>
                </View>
              )}
              {isComment && (
                <View className="card-container">
                  <View className="user-info">
                    <View className="avatar-container">
                      <Image
                        src={message.user_info.avatar}
                        className="avatar-image"
                      ></Image>
                    </View>
                    <View className="name-time">
                      <View className="name">{message.user_info.username}</View>
                      <View className="time">{message.time}</View>
                    </View>
                  </View>
                  <View className="message-text">
                    <MxIcon type="cmmtBtn"></MxIcon>
                    <View className="detail-text">回复我</View>
                    <View className="reply-text">{message.reply}</View>
                  </View>
                  <View className="course-container">
                    <View className="course-name">
                      {'#' + message.course_info.course_name}{' '}
                      {'(' + message.course_info.teacher + ')'}
                    </View>{' '}
                    {message.course_info.comment}
                  </View>
                  <View className="input">
                    <Input
                      placeholder="回复："
                      placeholderClass="placeholder"
                      className="reply-input"
                      confirmType="发送"
                      onConfirm={e => {
                        Fetch(
                          'api/v1/comment/' +
                            message.course_info.evaluation_id +
                            '/',
                          { content: e.target.value, is_anonymous: false },
                          'POST'
                        ).then(res => {
                          console.log(res.data);
                          Taro.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 2000
                          });
                        });
                      }}
                    />
                  </View>
                </View>
              )}
              {!message.is_like && !isComment && (
                <View className="card-container">
                  <View className="user-info">
                    <View className="avatar-container">
                      <Image
                        src={message.user_info.avatar}
                        className="avatar-image"
                      ></Image>
                    </View>
                    <View className="name-time">
                      <View className="name">{message.user_info.username}</View>
                      <View className="time">{message.time}</View>
                    </View>
                  </View>
                  <View className="course-container">
                    <View className="course-name">
                      {'#' + message.course_info.course_name}{' '}
                      {'(' + message.course_info.teacher + ')'}
                    </View>{' '}
                    {message.course_info.comment}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
