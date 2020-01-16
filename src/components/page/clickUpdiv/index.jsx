import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { View, Text } from '@tarojs/components';
import { MxIcon } from '../../common/MxIcon';
import './index.scss';
import Fetch from '../../../service/fetch';

export default class clickUpdiv extends Component {
  constructor() {
    // super(...arguments);
    this.state = {
      isOpen: false,
      dispaly: 'block'
    };
  }
  // handleIconClick = (...args) => {
  //    this.props.onClick(...args);
  // };
  handleIconClick = () => {
    console.log("已经点击啦");
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      display: prevState.isOpen ? 'block' : 'none'
    }));
    console.log(this.state.isOpen);
  };
  // handleTextClick = (...args) => {
  //   this.props.onClick(...args);
  // };
  handleTextClick = () =>{
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
      });
  }
  render() {
    // const { isOpen, display, className } = this.props;
    // const rootClass = classNames('list-item', this.props.className);
    // /*const setIconCenter={
    //         display: 'flex',
    //         'align-items': 'center',
    //     }*/
    const textstyle = {
      dispaly: this.state.dispaly
    };
    const {courseId} = this.props;
    return (
      <View className="box">
        <View className="icon">
          <MxIcon
            type="arrowD"
            className="arrow"
            onClick={this.handleIconClick}
          ></MxIcon>
        </View>
        <View
          className="unsee"
          style={textstyle}
          onClick={this.handleTextClick}
        >
          删除
        </View>
      </View>
    );
  }
}
clickUpdiv.defaultProps = {
  className: '',
  // onClick: () => {}
  courseId: 1
};
clickUpdiv.propTypes = {
  className: PropTypes.string,
  // isOpen: PropTypes.bool,
  // onClick: PropTypes.func
  courseId: PropTypes.number
};
