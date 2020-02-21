import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image, View, Input, Button, Form, Text, Textarea } from '@tarojs/components';
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
    // console.log(this.props.Eid);
  }
  handleSubmit(e) {
    // console.log(this.props.Eid);
    // console.log(e.target.value);
    if (this.props.Pid) {
      Fetch(
        'api/v1/comment/' + this.props.Pid + '/?sid=' + this.props.Sid,
        { content: e.target.value, is_anonymous: this.state.is_anonymous },
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
            content: '',
            is_anonymous: false
          });
        })
        .catch(err => {
          Taro.showToast({
            title: '失败',
            icon: 'none'
          });
        });
    }
  }

  changeAnony() {
    this.setState({ is_anonymous: !this.state.is_anonymous });
  }
  handleChange(e) {
    this.setState({ content: e.target.value });
  }
  render() {
    const is_anonymous = this.state.is_anonymous;
    return (
      <View className="input">
        {/* <Form onSubmit={this.handleSubmit.bind(this)} className="form"> */}
        <View className="icon">
          {is_anonymous && (
            <MxIcon
              width="40"
              type="anony"
              // type="likeBtnS"
              onClick={this.changeAnony.bind(this)}
            ></MxIcon>
          )}
          {!is_anonymous && (
            <MxIcon
              width="40"
              type="unanony"
              // type="likeBtn"
              onClick={this.changeAnony.bind(this)}
            ></MxIcon>
          )}
        </View>
        <Text className="text">匿名</Text>
        {/* <Input
          placeholder="回复："
          placeholderClass="placeholder"
          className="reply-input"
          cursorSpacing="50"
          confirmType="send"
          onConfirm={this.handleSubmit.bind(this)}
          value={this.state.content}
          onChange={this.handleChange.bind(this)}
        /> */}
        {/* <Button className="send-button" formType="submit" size="2">
            发送
          </Button> */}
        {/* </Form> */}
        <Textarea
          placeholder="回复"
          placeholderClass="placeholder"
          className="reply-input"
          maxlength="-1"
          autoHeight
          showConfirmBar
          cursorSpacing="50"
          onConfirm={this.handleSubmit.bind(this)}
          value={this.state.content}
          onInput={this.handleChange.bind(this)}
        ></Textarea>
      </View>
    );
  }
}
replyInput.defaultProps = {
  className: '',
  // onConfirm: () => {},
  Eid: '',
  Sid: '',
  Pid: ''
};

replyInput.propTypes = {
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  // onConfirm: PropTypes.func,
  Eid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  Sid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  Pid: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
