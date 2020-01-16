import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image, View, Input, Button, Form } from '@tarojs/components';
import MxIcon from '../../common/MxIcon/index';
import Fetch from '../../../service/fetch';
import './index.scss';

export default class replyInput extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      is_anonymous: false,
      content: ''
    };
  }
  componentDidMount() {
    console.log(this.props.Eid);
  }
  handleChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  // handleConfirm() {
  //   this.props.onConfirm(...arguments);
  // }
  //   handleSubmit() {
  //     this.props.onSubmit(...arguments);
  //   }
  handleSubmit() {
    console.log(this.props.Eid);
    console.log(this.props.Sid);
    Fetch(
      'api/v1/comment/' + this.props.Eid + '/?sid=' + this.props.Sid,
      { content: this.state.content, is_anonymous: this.state.is_anonymous },
      'POST'
    )
      .then(res => {
        console.log(res.data);
        Taro.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        });
        this.setState({
          content: ''
        });
      })
      .catch(err => {
        Taro.showToast({
          title: '失败',
          icon: 'none'
        });
      });
  }

  changeAnony() {
    this.setState({ is_anonymous: !this.state.is_anonymous });
  }
  render() {
    const is_anonymous = this.state.is_anonymous;
    return (
      <View className="input">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          {is_anonymous && (
            <MxIcon
              type="anony"
              // type="likeBtnS"
              onClick={this.changeAnony.bind(this)}
            ></MxIcon>
          )}
          {!is_anonymous && (
            <MxIcon
              type="unanony"
              // type="likeBtn"
              onClick={this.changeAnony.bind(this)}
            ></MxIcon>
          )}
          <Input
            placeholder="回复："
            placeholderClass="placeholder"
            className="reply-input"
            cursorSpacing="50"
            // confirmType="send"
            //   onConfirm={e => {
            //     Fetch(
            //       'api/v1/comment/' + message.EvaluationId + '/',
            //       { content: e.target.value, is_anonymous: false },
            //       'POST'
            //     ).then(res => {
            //       console.log(res.data);
            //       Taro.showToast({
            //         title: '成功',
            //         icon: 'success',
            //         duration: 2000
            //       });
            //     });
            //   }}
            value={this.state.content}
            onChange={this.handleChange.bind(this)}
            onConfirm={this.handleConfirm.bind(this)}
          />
          <Button className="send-button" formType="submit" size="2">
            发送
          </Button>
        </Form>
      </View>
    );
  }
}
replyInput.defaultProps = {
  className: '',
  // onConfirm: () => {},
  Eid: '',
  Sid: ''
};

replyInput.propTypes = {
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  // onConfirm: PropTypes.func,
  Eid: PropTypes.string,
  Sid: PropTypes.string
};
