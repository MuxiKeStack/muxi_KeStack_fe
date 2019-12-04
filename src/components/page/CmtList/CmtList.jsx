/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './CmtList.scss';
import MxLike from '../MxLike/MxLike';
import MxIcon from '../../common/MxIcon/index';

class CmtList extends Component {
  constructor() {
    this.state = {
      cmtList:
        this.props.item.sub_comments_num > 5
          ? this.props.item.sub_comments_list.slice(0, 5)
          : ''
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
  toShow() {
    this.setState({
      cmtList: this.props.item.sub_comments_list
    });
  }
  onChange(item, x) {
    this.props.onChangeReply(item, x);
  }

  render() {
    const { cmtList } = this.state;
    const { item } = this.props;
    return (
      <View>
        {cmtList &&
          cmtList.map(x => {
            return (
              <View key={x.id} className="subCommentBox">
                <View className="sonAvatar">
                  {x.user_info ? (
                    <Image src={item.user_info.avatar} />
                  ) : (
                    <MxIcon type="avatar" width="50rpx" height="50rpx" />
                  )}
                </View>
                <View className="sonComment">
                  <View className="sonContainer">
                    <View className="sonContainerIn">
                      <View className="sonUsername">
                        {x.target_user_info.username ==
                          item.user_info.username && (
                          <View className="sonUsername">
                            {x.user_info.username}
                          </View>
                        )}
                        {x.target_user_info.username !=
                          item.user_info.username && (
                          <View className="sonUsername">
                            {x.user_info.username}
                            <View className="replyContext">回复</View>
                            {x.target_user_info.username}
                          </View>
                        )}
                      </View>
                      <View className="sonCommentContent">{x.content}</View>
                    </View>
                  </View>
                  <View className="sonDetail">
                    <View className="time">{this.normalTime(x.time)}</View>
                    <View
                      className="reply"
                      onClick={this.onChange.bind(this, item, x)}
                    >
                      回复
                    </View>
                    <View className="like">
                      <MxLike
                        theid={x.id}
                        islike={x.is_like}
                        likenum={x.like_num}
                        content="comment"
                        width="20"
                        height="20"
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        {cmtList && cmtList.length <= 5 && (
          <View onClick={this.toShow} className="remainComments">
            产看剩余{item.sub_comments_num - 5}条评论
          </View>
        )}
      </View>
    );
  }
}
CmtList.defaultProps = {
  item: '',
  onChangeReply: () => {}
};

export default CmtList;
