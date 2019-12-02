import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './courseCommentsDetails.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import MxIcon from '../../components/common/MxIcon/index';
import MxInput from '../..//components/common/MxInput/MxInput';
import Fetch from '../../service/fetch';
import MxLike from '../../components/page/MxLike/MxLike';
import CmtList from '../../components/page/CmtList/CmtList';

export default class Coursecommentsdetails extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      ancestor: '',
      replyID: '',
      replyUser: ' ：'
    };
  }
  componentWillMount() {}
  componentDidMount() {
    Fetch('api/v1/evaluation/' + this.$router.params.id + '/', 'GET').then(
      data => {
        if (data) {
          this.setState({
            ancestor: data.data
          });
          console.log(data.data);
        }
      }
    );
    Fetch(
      'api/v1/evaluation/' + this.$router.params.id + '/comments/',
      { limit: 5, page: 1 },
      'GET'
    ).then(data => {
      if (data) {
        this.setState({
          cmtList: data.data.parent_comment_list
        });
        console.log(data.data);
      }
    });
  }

  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '评课详情'
  };

  componentDidShow() {}

  componentDidHide() {}

  normalTime(timestamp) {
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
  onChangeReply(user) {
    this.setState({
      replyID: user.id,
      replyUser: user.user_info
        ? user.user_info.username + ' ：'
        : '匿名用户 ：'
    });
    console.log(user);
  }
  render() {
    const { ancestor, cmtList, replyUser } = this.state;
    return (
      <View className="courseCommentsDetails">
        <View className="ancestorBox">
          <View className="informationBox">
            <View className="ancestorAvatar">
              {ancestor.user_info ? (
                <Image src={ancestor.user_info.avatar} />
              ) : (
                <MxIcon type="avatar" width="80rpx" height="80rpx" />
              )}
            </View>
            <View className="ancestorInformation">
              <View className="ancestorUsername">
                {ancestor.user_info.username}
              </View>
              <View className="ancestorTime">
                {this.normalTime(ancestor.time)}
              </View>
            </View>
          </View>
          <View className="courseInformationBox">
            <View className="courseInformation">
              #{ancestor.course_name} ({ancestor.teacher})
            </View>
            <View className="toRate">评价星级：</View>
            <MxRate value={ancestor.rate} readOnly="true" className="rate" />
          </View>
          <View className="tag"></View>
          <View className="ancestorComment">{ancestor.content}</View>
          <View className="iconsBox">
            <View className="like">
              <MxLike
                theid={ancestor.id}
                islike={ancestor.is_like}
                likenum={ancestor.like_num}
              />
            </View>
            <View
              className="commentsNumber"
              onClick={this.onChangeReply.bind(this, ancestor)}
            >
              <MxIcon width="43" type="cmmtBtn" className="commentIcon" />
              {ancestor.comment_num}
            </View>
          </View>
        </View>
        <View className="replyy">回复{replyUser}</View>
        <View className="commentsList">
          {cmtList &&
            cmtList.map(item => {
              return (
                <View key={item.id}>
                  <View className="parentCommentBox">
                    <View className="parentAvatar">
                      {item.user_info ? (
                        <Image src={item.user_info.avatar} />
                      ) : (
                        <MxIcon type="avatar" width="80rpx" height="80rpx" />
                      )}
                    </View>
                    <View className="parentComment">
                      <View className="parentContainer">
                        <View className="parentContainerIn">
                          <View className="parentUsername">
                            {item.user_info.username}
                          </View>
                          <View className="parentCommentContent">
                            {item.content}
                          </View>
                        </View>
                      </View>
                      <View className="parentDetail">
                        <View className="time">
                          {this.normalTime(item.time)}
                        </View>
                        <View
                          className="reply"
                          onClick={this.onChangeReply.bind(this, item)}
                        >
                          回复
                        </View>
                        <View className="like">
                          <MxLike
                            theid={item.id}
                            islike={item.is_like}
                            likenum={item.like_num}
                            content="comment"
                            width="20"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className="subCommentListBox">
                    <CmtList
                      item={item}
                      onChangeReply={this.onChangeReply.bind(this)}
                    />
                  </View>
                </View>
              );
            })}
        </View>
        <View className="inputBox">
          <MxInput placeholder="回复" background="#F1F0F5" />
        </View>
      </View>
    );
  }
}
