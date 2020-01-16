import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import './index.scss';

export default class MxTag extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      ifChecked: this.props.checked
    };
  }
  onClick() {
    if (this.props.checkable) {
      this.setState({
        ifChecked: !this.state.ifChecked
      });
    }
    this.props.onClick();
  }

  render() {
    const {
      display,
      font,
      borderRadius,
      padding,
      margin,
      color,
      backgroud
    } = this.props;
    const tag = {
      tagStyle: {
        display: `${display}`,
        'border-radius': `${borderRadius}`,
        'font-size': `${font}`,
        padding: `${padding}`,
        margin: `${margin}`,
        'backgroud-color': `${backgroud}`,
        color: `${color}`
      }
    };

    return (
      <View
        style={tag.tagStyle}
        onClick={this.onClick.bind(this)}
        className={classNames({
          'tag-checked': this.state.ifChecked && this.props.checkable,
          'tag-unchecked': !this.state.ifChecked && this.props.checkable,
          'tag-uncheckable': !this.props.checkable,
          tag: !this.props.check
        })}
      >
        {this.props.children}
      </View>
    );
  }
}

MxTag.defaultProps = {
  padding: '1rpx 44rpx 1rpx 44rp',
  margin: '0',
  display: 'inline-block',
  font: '28rpx',
  borderRadius: '34rpx',
  checkable: false,
  checked: false,
  check: true,
  backgroud: '',
  color: '',
  onClick: () => {}
};
