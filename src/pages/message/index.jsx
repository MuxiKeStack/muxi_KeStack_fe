import Taro, { Component } from '@tarojs/taro';
import { View, Image, Input, Text } from '@tarojs/components';
import { MxIcon } from '../../components/common/MxIcon';
import Img from '../../assets/png/avatar.png';
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
      messageList: [],
      page: 1,
      limit: 20
    };
  }
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '消息提醒',
    onReachBottomDistance: 50,
    enablePullDownRefresh: true
  };
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }
  //还有关于时间顺序和请求数量的问题
  componentDidMount() {
    Fetch(
      'api/v1/message/?page=' + this.state.page + '&limit=' + this.state.limit,
      {},
      'GET'
    )
      .then(res => {
        if (res.data) {
          // console.log(res.data),
          this.setState({
            messageList: this.state.messageList.concat(res.data),
            page: this.state.page + 1
          });
        } else {
          Taro.showToast({ title: '没有收到消息哦～', icon: 'none' });
        }
      })
      .catch(err => {
        Taro.showToast({ title: '没有消息哦～', icon: 'none' });
      });
  }
  getData() {
    Fetch(
      'api/v1/message/?page=' + this.state.page + '&limit=' + this.state.limit,
      {},
      'GET'
    )
      .then(res => {
        if (res.data) {
          // console.log(res.data),
          this.setState({
            messageList: this.state.messageList.concat(res.data),
            page: this.state.page + 1
          });
        } else {
          Taro.showToast({ title: '已经到底了', icon: 'none' });
        }
      })
      .catch(err => {
        Taro.showToast({ title: '已经到底了', icon: 'none' });
      });
  }
  onReachBottom() {
    this.getData();
  }
  onPullDownRefresh() {
    this.getData();
  }

  toNormalTime(timestamp) {
    var date = new Date(timestamp * 1000); //如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':';
    var s =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
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
          var isToEvalueation = message.kind == 3 ? true : false;
          return (
            <View key={message.time}>
              {isLike && (
                <View className="card-container">
                  <View className="user-info">
                    <View className="avatar-container">
                      <Image
                        src={
                          message.user_info.avatar
                            ? message.user_info.avatar
                            : Img
                        }
                        className="avatar-image"
                      ></Image>
                    </View>
                    <View className="name-time">
                      <View className="name">
                        {message.user_info.username
                          ? message.user_info.username
                          : '匿名'}
                      </View>
                      <View className="time">
                        {this.toNormalTime(message.time)}
                      </View>
                    </View>
                  </View>
                  <View className="message-text">
                    <View className="icon">
                      <MxIcon type="likeBtn"></MxIcon>
                    </View>
                    <View className="detail-text">赞了我</View>
                  </View>
                  <View className="course-container">
                    <View
                      className="course-name"
                      onClick={() =>
                        Taro.navigateTo({
                          url:
                            '/pages/courseDetails/courseDetails?courseId=' +
                            message.course_id
                        })
                      }
                    >
                      {'#' + message.course_name} {'(' + message.teacher + ')'}
                    </View>{' '}
                    <View
                      className="message-content"
                      onClick={() =>
                        Taro.navigateTo({
                          url:
                            '/pages/courseCommentsDetails/courseCommentsDetails?id=' +
                            message.evaluation_id
                        })
                      }
                    >
                      {message.content}
                    </View>
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
                        src={
                          message.user_info.avatar
                            ? message.user_info.avatar
                            : Img
                        }
                        className="avatar-image"
                      ></Image>
                    </View>
                    <View className="name-time">
                      <View className="name">
                        {message.user_info.username
                          ? message.user_info.username
                          : '匿名'}
                      </View>
                      <View className="time">
                        {this.toNormalTime(message.time)}
                      </View>
                    </View>
                  </View>
                  <View className="message-text">
                    <View className="icon">
                      <MxIcon type="cmmtBtn"></MxIcon>
                    </View>
                    <View className="detail-text">回复我</View>
                    <Text className="reply-text">{message.reply}</Text>
                  </View>
                  <View className="course-container">
                    <View
                      className="course-name"
                      onClick={() =>
                        Taro.navigateTo({
                          url:
                            '/pages/courseDetails/courseDetails?courseId=' +
                            message.course_id
                        })
                      }
                    >
                      {'#' + message.course_name} {'(' + message.teacher + ')'}
                    </View>{' '}
                    <View
                      className="message-content"
                      onClick={() =>
                        Taro.navigateTo({
                          url:
                            '/pages/courseCommentsDetails/courseCommentsDetails?id=' +
                            message.evaluation_id
                        })
                      }
                    >
                      {message.content}
                    </View>
                  </View>
                  <ReplyInput
                    Pid={message.parent_comment_id}
                    Sid={message.sid}
                    Eid={message.evaluation_id}
                  />
                </View>
              )}
              {isReport && (
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
                  <View className="text">
                    你的评论/评课，已被举报，经系统审核不合规范，已被删除！
                  </View>
                  <View className="course-container">
                    <View className="course-name">
                      {'#' + message.course_name} {'(' + message.teacher + ')'}
                    </View>{' '}
                    {message.content}
                  </View>
                </View>
              )}
              {isToEvalueation && (
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
                    <View
                      className="course-name"
                      onClick={() =>
                        Taro.navigateTo({
                          url:
                            '/pages/courseDetails/courseDetails?courseId=' +
                            message.course_id
                        })
                      }
                    >
                      {'#' + message.course_name} {'(' + message.teacher + ')'}
                    </View>{' '}
                    {/* {message.content} */}
                    未评课～欢迎评课
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
