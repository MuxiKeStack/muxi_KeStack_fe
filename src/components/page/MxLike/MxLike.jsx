/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './MxLike.scss';
import MxIcon from '../../common/MxIcon/index';
import Fetch from '../../../service/fetch';

class MxLike extends Component {
  constructor() {
    this.state = {
      islike: this.props.islike,
      likenum: this.props.likenum
    };
  }
  tolike() {
    console.log('tolikes like_state:');
    console.log(this.state.islike);
    var { theid, content } = this.props;
    Fetch(
      'api/v1/' + content + '/' + theid + '/like',
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
    return (
      <View>
        <View>
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
              type="check"
              className="commentIcon"
              onClick={this.tolike.bind(this)}
            />
          )}
          {this.state.likenum}
        </View>
      </View>
    );
  }
}

MxLike.defaultProps = {
  theid: '',
  islike: '',
  likenum: '0',
  content: 'evaluation',
  width: '43'
};

export default MxLike;
