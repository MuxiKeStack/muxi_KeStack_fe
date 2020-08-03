/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './CmtCourseCard.scss';
import MxLike from '../MxLike/MxLike';
import MxIcon from '../../common/MxIcon/index';
import MxRate from '../../common/MxRate/MxRate';
import MxReport from '../../common/MxReport/index';

class CmtCourseCard extends Component {
  constructor() {
    this.state = {
      report: false,
      reportHeight: '0rpx'
    };
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
  commentPage(item) {
    const SID = item.is_anonymous ? '0' : item.user_info.sid;
    const name = item.is_anonymous ? '匿名用户' : item.user_info.username;
    Taro.navigateTo({
      url:
        '../courseCommentsDetails/courseCommentsDetails?id=' +
        item.id +
        '&ancestorName=' +
        name +
        '&sid=' +
        SID
    });
  }
  toShowReport(id) {
    console.log(this.state.reportHeight);
    if (this.state.reportHeight == '0rpx') {
      this.setState({ reportHeight: '50rpx' });
    } else {
      this.setState({ reportHeight: '0rpx' });
    }
  }
  render() {
    const { item } = this.props;
    const reportStyle = {
      height: this.state.reportHeight
    };
    return (
      <View key={item.id} className="commentCard" onClick={this.commentPage.bind(this, item)}>
        <View className="userInfo">
          {item.user_info.avatar ? (
            <Image
              src={item.user_info.avatar}
              className="avatar"
              style="width: 80rpx; height: 80rpx"
            />
          ) : (
            <MxIcon type="avatar" width="80rpx" height="80rpx" />
          )}
          <View className="infoDetail">
            <View className="username">
              {item.user_info.username ? item.user_info.username : '匿名用户'}
            </View>
            <View className="time">{item.date + '  ' + item.time}</View>
          </View>
          <MxReport ID={item.id} />
        </View>
        <View className="courseInfo">
          <View className="courseName">
            #{item.course_name}({item.teacher})
          </View>
          <View className="cmtRateBox">
            <MxRate readOnly="true" value={item.rate} />
          </View>
        </View>
        <View className="cmtContent">{item.content}</View>
        <View className="cmtIconsBox">
          <View className="likeIconBox">
            <MxLike
              theid={item.id}
              islike={item.is_like}
              likenum={item.like_num}
            />
          </View>
          <View className="cmtIconBox">
            <MxIcon
              width="43"
              type="cmmtBtn"
              className="commentIcon"
              onClick={this.commentPage.bind(this, item)}
            />
            {item.comment_num}
          </View>
        </View>
      </View>
    );
  }
}
CmtCourseCard.defaultProps = {
  item: ''
};

export default CmtCourseCard;
