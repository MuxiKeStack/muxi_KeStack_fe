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
    var { theid, content } = this.props;
    Fetch(
      'api/v1/' + content + '/' + theid + '/like',
      {
        data: {
          like_state: this.state.islike
        }
      },
      'PUT'
    ).then(data => {
      if (data) {
        this.setState({
          islike: data.data.like_state,
          likenum: data.data.like_num
        });
      }
    });
  }
  todislike() {
    var { theid, content } = this.props;
    Fetch(
      'api/v1/' + content + '/' + theid + '/like',
      {
        data: {
          like_state: this.state.islike
        }
      },
      'PUT'
    ).then(data => {
      if (data) {
        this.setState({
          islike: data.data.like_state,
          likenum: data.data.like_num
        });
      }
    });
  }
  render() {
    return (
      <View>
        <View>
          {!this.state.islike && (
            <MxIcon
              width="43"
              type="likeBtn"
              className="commentIcon"
              onClick={this.tolike.bind(this)}
            />
          )}
          {this.state.islike && (
            <MxIcon
              width="43"
              type="check"
              className="commentIcon"
              onClick={this.todislike.bind(this)}
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
  content: 'evaluation'
};

export default MxLike;
