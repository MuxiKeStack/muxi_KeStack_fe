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
          var isComment = message.Kind == 1 ? true : false;
          var isLike = message.Kind == 0 ? true : false;
          var isReport = message.Kind == 2 ? true : false;
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
                      {'#' + message.CourseName} {'(' + message.Teacher + ')'}
                    </View>{' '}
                    {message.Content}
                  </View>

                  <ReplyInput
                    // onConfirm={e => {
                    //   Fetch(
                    //     'api/v1/comment/' + message.EvaluationId + '/',
                    //     { content: e.target.value, is_anonymous: false },
                    //     'POST'
                    //   ).then(res => {
                    //     console.log(res.data);
                    //     Taro.showToast({
                    //       title: '成功',
                    //       icon: 'success',
                    //       duration: 2000
                    //     });
                    //   });
                    // }}
                    Eid={message.EvaluationId}
                    Sid={message.Sid}
                  />
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
                      {'#' + message.CourseName} {'(' + message.Teacher + ')'}
                    </View>{' '}
                    {message.Content}
                  </View>
                  <View className="input">
                    <Input
                      placeholder="回复："
                      placeholderClass="placeholder"
                      className="reply-input"
                      confirmType="send"
                      onConfirm={e => {
                        Fetch(
                          'api/v1/comment/' + message.EvaluationId + '/',
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
                      {'#' + message.CourseName} {'(' + message.Teacher + ')'}
                    </View>{' '}
                    {message.Content}
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
