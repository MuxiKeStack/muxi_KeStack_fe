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
    let checkedControl = this.props.checkedControl;
    if (this.props.checkable) {
      if (checkedControl) {
        this.props.onClick &&
          this.props.onClick({
            checked: this.props.checked
          });
      } else {
        this.setState({
          ifChecked: !this.state.ifChecked
        });
        this.props.onClick();
      }
    }
  }

  render() {
    const {
      display,
      font,
      borderRadius,
      padding,
      margin,
      color,
      backgroud,
      checked,
      checkedControl,
      border
      width
    } = this.props;
    const tag = {
      tagStyle: {
        display: `${display}`,
        'border-radius': `${borderRadius}`,
        'font-size': `${font}`,
        padding: `${padding}`,
        margin: `${margin}`,
        'backgroud-color': `${backgroud}`,
        color: `${color}`,
        border: `${border}`,
        width: `${width}`,
        'text-align': 'center'
      }
    };

    return (
      <View>
        {checkedControl && (
          <View
            style={tag.tagStyle}
            onClick={this.onClick.bind(this)}
            className={classNames({
              'tag-checked': checked && this.props.checkable,
              'tag-uncheck': !checked && this.props.checkable,
              'tag-uncheckable': !this.props.checkable,
              tag: !this.props.check
            })}
          >
            {this.props.children}
          </View>
        )}

        {!checkedControl && (
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
        )}
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
  checkedControl: false,
  backgroud: '',
  color: '',
  border: '',
  width: '',
  onClick: () => {}
};
