import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { View, Text } from '@tarojs/components';
import MxComponent from '../../../common/component';
import './index.scss';
import Fetch from '../../../service/fetch';
import MxIcon from '../MxIcon';

// 文档
export default class MxReport extends MxComponent {
  constructor() {
    super(...arguments);
    this.isCompleted = true;
    this.startOpen = false;
    this.state = {
      wrapperHeight: '',
      open: false
    };
  }

  onClick = () => this.props.onClick();

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  // propsClik = event =>{
  //   this.props.onClick(event)
  // }
  toReply() {
    const ID = this.props.ID;
    Fetch(
      'api/v1/evaluation/' + ID + '/report/',
      {
        reason: " "
      },
      'POST'
    ).then(data => {
      if (data.data.fail) {
        Taro.showToast({
          title: '已经举报',
          icon: 'none'
        });
      } else {
        Taro.showToast({
          title: '举报成功'
        });
      }
      this.setState({
        open: false
      });
    });
  }

  render() {
    const { className } = this.props;
    const open = this.state.open;
    const { wrapperHeight } = this.state;

    const rootCls = classNames('at-accordion', className);

    const arrowCls = classNames('at-accordion__arrow');

    const contentCls = classNames('at-accordion__content', {
      'at-accordion__content--inactive':
        (!open && this.isCompleted) || this.startOpen
    });
    const contentStyle = { height: `${wrapperHeight}px` };

    if (this.isCompleted) {
      contentStyle.height = '';
    }

    return (
      <View className={rootCls}>
        <View onClick={this.handleClick} className="at-accordion__header">
          <View className={arrowCls}>
            <Text className="at-icon at-icon-chevron-down"></Text>
          </View>
        </View>
        <View
          style={contentStyle}
          className={contentCls}
          onClick={this.toReply}
        >
          举报
        </View>
      </View>
    );
  }
}

MxReport.defaultProps = {
  open: false,
  className: '',
  isAnimation: true,
  ID: ''
};

MxReport.propTypes = {
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  open: PropTypes.bool,
  isAnimation: PropTypes.bool,
  onClick: PropTypes.func
};
