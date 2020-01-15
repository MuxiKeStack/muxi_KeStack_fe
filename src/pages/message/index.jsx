import Taro, { Component } from '@tarojs/taro';
import { View, Image, Input } from '@tarojs/components';
import { MxIcon } from '../../components/common/MxIcon';
import Img from '../../assets/svg/avatar-img.svg';
import './index.scss';
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'
import Fetch from '../../service/fetch';
import ReplyInput from '../../components/page/replyInput';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: []
    };
  }
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '消息提醒',
    onReachBottomDistance: 50
  };

  //还有关于时间顺序和请求数量的问题
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
  // onReachBottom() {
  //   if (this.state.last_id) {
  //     Fetch(
  //       'api/v1/user/evaluations/',
  //       {
  //         limit: '10',
  //         last_id: this.state.last_id
  //       },
  //       'GET'
  //     ).then(res => {
  //       if (res) {
  //         console.log(res.data.list);
  //         this.setState({
  //           list: res.data.list,
  //           last_id: this.state.id
  //         });
  //         if (!res.data.list)
  //           Taro.showToast({
  //             title: '已经到底啦',
  //             icon: 'none'
  //           });
  //       }
  //     });
  //   }
  // }

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
          var isComment = message.kind == 1 ? true : false;
          var isLike = message.kind == 0 ? true : false;
          var isReport = message.kind == 2 ? true : false;
          return (
            <View key={message.time}>
              {isLike && (
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
                      {'#' + message.course_name} {'(' + message.teacher + ')'}
                    </View>{' '}
                    {message.content}
                  </View>

                  {/* <ReplyInput
                    Eid={message.parent_comment_id}
                    Sid={message.sid}
                  /> */}
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
                      <View className="time">
                        {this.toNormalTime(message.time)}
                      </View>
                    </View>
                  </View>
                  <View className="message-text">
                    <MxIcon type="cmmtBtn"></MxIcon>
                    <View className="detail-text">回复我</View>
                    <View className="reply-text">{message.reply}</View>
                  </View>
                  <View className="course-container">
                    <View className="course-name">
                      {'#' + message.course_name} {'(' + message.teacher + ')'}
                    </View>{' '}
                    {message.content}
                  </View>
                  <ReplyInput
                    Eid={message.parent_comment_id}
                    Sid={message.sid}
                  />
                </View>
              )}
              {!isLike && !isComment && (
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
                  <View className="course-container">
                    <View className="course-name">
                      {'#' + message.course_name} {'(' + message.teacher + ')'}
                    </View>{' '}
                    {message.content}
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
