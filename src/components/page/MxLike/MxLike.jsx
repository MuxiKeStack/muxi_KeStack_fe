/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './MxLike.scss';
import MxIcon from '../../common/MxIcon/index';
import Fetch from '../../../service/fetch';

class MxLike extends Component {
  constructor() {
    var likestate;
    if (this.props.islike === 'true') {
      likestate = true;
    } else if (this.props.islike === 'false') {
      likestate = false;
    } else {
      likestate = this.props.islike;
    }
    // switch (this.props.islike) {
    //   case "true":
    //   case true:
    //     likestate = true;
    //   case "false":
    //   case false:
    //     likestate = false;
    // }
    this.state = {
      islike: this.props.islike,
      likenum: this.props.likenum
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      islike: nextProps.islike,
      likenum: nextProps.likenum
    });
  }

  tolike() {
    // console.log('tolikes like_state:');
    // console.log(this.state.islike);
    var { theid, content } = this.props;
    Fetch(
      'api/v1/' + content + '/' + theid + '/like/',
      {
        like_state: this.state.islike
      },
      'PUT'
    ).then(data => {
      if (data) {
        this.setState({
          islike: data.data.like_state,
          likenum: data.data.like_num
        });
        if (this.state.islike) {
          Taro.showToast({
            title: '取消点赞成功',
            icon: 'success'
          });
        } else {
          Taro.showToast({
            title: '点赞成功',
            icon: 'success'
          });
        }
      }
    });
  }
  render() {
    const likeNumStyle = {
      marginBottom: this.props.bottom
    };
    return (
      <View>
        <View className="like-comp">
          {!this.state.islike && (
            <MxIcon
              width={this.props.width}
              type="likeBtn"
              className="commentIcon"
              onClick={this.tolike.bind(this)}
            />
          )}
          {this.state.islike && (
            <MxIcon
              width={this.props.width}
              type="likeBtnS"
              className="commentIcon"
              onClick={this.tolike.bind(this)}
            />
          )}
        </View>
        <View className="number" style={likeNumStyle}>
          {this.state.likenum}
        </View>
      </View>
    );
  }
}

MxLike.defaultProps = {
  theid: '',
  islike: '',
  likenum: '',
  content: 'evaluation',
  width: '43',
  bottom: '0rpx'
};

export default MxLike;
