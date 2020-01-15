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
    console.log('已经点击啦');
    // this.setState(prevState => ({
    //   isOpen: !prevState.isOpen,
    //   display: prevState.isOpen ? 'block' : 'none'
    // }));
    this.setState(
      {
        isOpen: !this.state.isOpen
        // dispaly: this.state.isOpen ? 'block' : 'none'
      },
      () => {
        this.setState({
          dispaly: this.state.isOpen ? 'block' : 'none'
        });
      }
    );
    console.log(this.state.isOpen + this.state.dispaly);
  }
  // handleTextClick = (...args) => {
  //   this.props.onClick(...args);
  // };
  handleTextClick = () => {
    //console.log(id);//
    console.log(this.props.courseId); //
    Fetch(
      // 'api/v1/evaluation/' + this.state.list[index].id + '/',
      // { id: this.state.list[index].id },
      'api/v1/evaluation/' + this.props.courseId + '/',
      {},
      'DELETE'
    ).then(res => {
      console.log(res);
      if (res) {
        Taro.showToast('删除成功');
      }
      this.setState({ isOpen: false });
    });
  };
  render() {
    const { courseId, className } = this.props;
    // const rootClass = classNames('list-item', this.props.className);
    // /*const setIconCenter={
    //         display: 'flex',
    //         'align-items': 'center',
    //     }*/
    // const textstyle = {
    //   dispaly: this.state.dispaly
    // };
    // const { courseId } = this.props;
    return (
      <View className={classNames('box', className)}>
        <View className="icon">
          <MxIcon
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
