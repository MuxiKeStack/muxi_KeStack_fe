import Taro, { Component } from '@tarojs/taro';
import { View, Image, Textarea } from '@tarojs/components';
import './courseCommentsDetails.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import MxIcon from '../../components/common/MxIcon/index';
import MxTag from '../../components/common/MxTag/index';
import Fetch from '../../service/fetch';
import MxLike from '../../components/page/MxLike/MxLike';
import CmtList from '../../components/page/CmtList/CmtList';
import check from '../../assets/svg/annoy.svg';

export default class Coursecommentsdetails extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      page: 1,
      nomorecmt: false,
      ancestor: '',
      replyID: this.$router.params.id,
      replyUser: this.$router.params.ancestorName + ' ：',
      replyContent: '',
      replySID: this.$router.params.sid,
      isAnonymous: false,
      cmtList: []
    };
  }
  componentWillMount() {
    Fetch();
    // console.log('this.$router.params');
    // console.log(this.$router.params);
    Fetch('api/v1/evaluation/' + this.$router.params.id + '/', 'GET').then(
      data => {
        if (data) {
          this.setState({
            ancestor: data.data,
            ancestorCmtNum: data.data.comment_num
          });
          // console.log(data.data.is_like);
          // console.log(data.data.like_num);
          console.log(data.data);
        }
      }
    );
    Fetch(
      'api/v1/evaluation/' + this.$router.params.id + '/comments/',
      { limit: 5, page: 1 },
      'GET'
    ).then(data => {
      if (data.data.parent_comment_list) {
        this.setState({
          cmtList: data.data.parent_comment_list,
          page: data.data.page + 1
        });
        console.log(data.data);
      }
    });
  }
  componentDidMount() {}
  componentDidShow() {}

  componentDidHide() {}

  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '评课详情',
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  };
  onPullDownRefresh() {
    Taro.showNavigationBarLoading();
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
      Taro.stopPullDownRefresh();
    }, 3000);
    this.setState({});
    // console.log('下拉加载刷新');
  } //下拉事件

  onReachBottom() {
    this.getComments();
    Taro.showNavigationBarLoading();
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
      Taro.stopPullDownRefresh();
    }, 500);
    // console.log('下拉加载更多');
  }
  getComments() {
    // console.log(this.state.page);
    if (!this.state.nomorecmt) {
      Fetch(
        'api/v1/evaluation/' + this.$router.params.id + '/comments/',
        {
          limit: 10,
          page: this.state.page
        },
        'GET'
      ).then(data => {
        if (data) {
          if (data.data.parent_comment_list) {
            // console.log(data.data);
            this.setState({
              cmtList: this.state.cmtList.concat(data.data.parent_comment_list),
              page: data.data.page + 1
            });
          } else {
            this.setState({
              nomorecmt: true
            });
            Taro.showToast({
              title: '没有更多数据啦',
              icon: 'none'
            });
          }
        }
      });
      // console.log(this.state.cmtList);
    }
  }

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
  onChangeReply(user, x) {
    // console.log('onChangeReply:');
    // console.log(user);
    // console.log(x);
    this.setState({
      replyID: user.id,
      replyUser: x.is_anonymous ? '匿名用户 ：' : x.user_info.username + ' ：',
      isAnonymous: x.user_info ? false : true,
      replySID: x.is_anonymous ? '0' : x.user_info.sid
    });
    // console.log(user);
  }
  toWriteReplyContent(e) {
    let value = e.detail.value;
    this.setState({
      replyContent: value
    });
  }
  toReply() {
    if (!Taro.getStorageSync('token')) {
      Taro.showToast({
        title: '评论失败!请先登录'
      });
      Taro.navigateTo({
        url: '/pages/login/index'
      });
    } else {
      const { replyID, replyContent, isAnonymous, replySID } = this.state;
      if (replyContent) {
        if (replyID == this.$router.params.id) {
          Fetch(
            'api/v1/evaluation/' + replyID + '/comment/',
            {
              content: replyContent,
              is_anonymous: isAnonymous
            },
            'POST'
          ).then(data => {
            if (data) {
              this.setState({
                cmtList: this.state.cmtList.concat(data.data),
                ancestorCmtNum: this.state.ancestorCmtNum + 1,
                replyContent: ''
              });
              // console.log(this.state.cmtList);
            }
          });
        } else {
          Fetch(
            'api/v1/comment/' + replyID + '/' + '?sid=' + `${replySID}`,
            {
              content: replyContent,
              is_anonymous: isAnonymous
            },
            'POST'
          ).then(data => {
            if (data) {
              this.setState({
                replyContent: ''
              });
              console.log(data.data);
            }
          });
        }
      } else {
        Taro.showToast({
          title: '评论不能为空',
          icon: 'none'
        });
      }
    }
  }
  toReport(content, id) {
    Fetch(
      'api/v1/report/evaluation/' + id + '/',
      {
        content: content
      },
      'POST'
    ).then(data => {
      if (data) {
        console.log(data.data);
      }
    });
  }
  changeAnon(x) {
    this.setState({
      isAnonymous: !x
    });
  }
  render() {
    const {
      ancestor,
      cmtList,
      replyUser,
      replyContent,
      ancestorCmtNum,
      nomorecmt,
      isAnonymous
    } = this.state;
    return (
      <View className="courseCommentsDetails">
        <View className="ancestorBox">
          <View className="informationBox">
            <View className="ancestorAvatar">
              {ancestor.is_anonymous ? (
                <MxIcon type="avatar" width="80rpx" height="80rpx" />
              ) : (
                <Image src={ancestor.user_info.avatar} />
              )}
            </View>
            <View className="ancestorInformation">
              <View className="ancestorUsername">
                {ancestor.user_info.username}
              </View>
              <View className="ancestorTime">
                {ancestor.date + ' ' + ancestor.time}
              </View>
            </View>
            <View
              className="report"
              onClick={this.toReport.bind(this, ancestor.content, ancestor.id)}
            >
              <MxIcon type="arrowD" width="50" />
            </View>
          </View>
          <View className="courseInformationBox">
            <View className="courseInformation">
              #{ancestor.course_name} ({ancestor.teacher})
            </View>
            <View className="toRate">评价星级：</View>
            <View className="rateBox">
              <MxRate value={ancestor.rate} readOnly="true" className="rate" />
            </View>
          </View>
          <View className="tags">
            {ancestor.tags &&
              ancestor.tags.map(item => {
                return (
                  <MxTag
                    key={item}
                    padding="10rpx 40rpx"
                    borderRadius="30rpx"
                    className="tag"
                    margin="5rpx 10rpx"
                    check={false}
                  >
                    {item}
                  </MxTag>
                );
              })}
          </View>
          <View className="ancestorComment">{ancestor.content}</View>
          <View className="iconsBox">
            <View className="Like">
              {ancestor && (
                <MxLike
                  theid={ancestor.id}
                  islike={ancestor.is_like}
                  likenum={ancestor.like_num}
                />
              )}
            </View>
            <View
              className="commentsNumber"
              onClick={this.onChangeReply.bind(this, ancestor, ancestor)}
            >
              <MxIcon width="43" type="cmmtBtn" className="commentIcon" />
              {ancestorCmtNum}
            </View>
          </View>
        </View>
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
                          {item.date + ' ' + item.time}
                        </View>
                        <View
                          className="reply"
                          onClick={this.onChangeReply.bind(this, item, item)}
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
                            bottom="30rpx"
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
          {!isAnonymous && (
            <View
              className="notanon"
              onClick={this.changeAnon.bind(this, isAnonymous)}
            ></View>
          )}
          {isAnonymous && (
            <Image
              src={check}
              onClick={this.changeAnon.bind(this, isAnonymous)}
              className="isanon"
            ></Image>
          )}
          <View className="anonWords">匿名</View>
          <View className="replyCard">
            <View className="toreply">回复{replyUser}</View>
            <Textarea
              className="replyFram"
              maxlength={-1}
              value={replyContent}
              onInput={this.toWriteReplyContent.bind(this)}
            />
            <View onClick={this.toReply.bind(this)} className="replyWords">
              发送
            </View>
          </View>
        </View>
      </View>
    );
  }
}
