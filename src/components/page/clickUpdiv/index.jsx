import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { View, Text } from '@tarojs/components';
import { MxIcon } from '../../common/MxIcon';
import './index.scss';
import Fetch from '../../../service/fetch';

export default class clickUpdiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dispaly: 'none'
    };
  }
  // handleIconClick = (...args) => {
  //    this.props.onClick(...args);
  // };
  handleIconClick() {
    this.setState(
      {
        isOpen: !this.state.isOpen
      },
      () => {
        this.setState({
          dispaly: this.state.isOpen ? 'block' : 'none'
        });
      }
    );
  }
  // handleTextClick = (...args) => {
  //   this.props.onClick(...args);
  // };
  handleTextClick = () => {
    this.setState(
      {
        isOpen: !this.state.isOpen
      },
      () => {
        this.setState({
          dispaly: this.state.isOpen ? 'block' : 'none'
        });
      }
    );
    Fetch(
      // 'api/v1/evaluation/' + this.state.list[index].id + '/',
      // { id: this.state.list[index].id },
      'api/v1/evaluation/' + this.props.courseId + '/',
      {},
      'DELETE'
    )
      .then(res => {
        if (res) {
          // console.log(res);
          Taro.showToast({
            title: '删除成功',
            icon: 'succese',
            duration: 2000
          });
        }
      })
      .catch(err => {
        Taro.showToast({ title: '删除失败', icon: 'none' });
      });
  };
  render() {
    const { courseId, className } = this.props;
    return (
      <View className={classNames('box', className)}>
        <View className="icon">
          <MxIcon
            width="60"
            height="50"
            type="arrowD"
            className="arrow"
            onClick={this.handleIconClick.bind(this)}
          ></MxIcon>
        </View>
        <View
          className="unsee"
          style={{ display: this.state.dispaly }}
          onClick={this.handleTextClick.bind(this)}
        >
          删除
        </View>
      </View>
    );
  }
}
clickUpdiv.defaultProps = {
  className: '',
  courseId: 1
};
clickUpdiv.propTypes = {
  className: PropTypes.string,
  // isOpen: PropTypes.bool,
  courseId: PropTypes.number
};
