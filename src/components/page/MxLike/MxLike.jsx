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
    console.log('已点赞');
    console.log(this.state.islike);
    var theid = this.props.theid;
    Fetch(
      'api/v1/evaluation/' + theid + '/like',
      {
        data: {
          like_state: this.state.islike
        }
      },
      'PUT'
    ).then(data => {
      if (data) {
        console.log(data);
        this.setState({
          islike: data.data.like_state,
          likenum: data.data.like_num
        });
      }
    });
    console.log(this.state.islike);
  }
  todislike() {
    console.log('已取消点赞');
    console.log(this.state.islike);
    var theid = this.props.theid;
    Fetch(
      'api/v1/evaluation/' + theid + '/like',
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
    console.log(this.state.islike);
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
  likenum: '0'
};

export default MxLike;
