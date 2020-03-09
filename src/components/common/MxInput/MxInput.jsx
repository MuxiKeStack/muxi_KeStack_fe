import Taro, { Component } from '@tarojs/taro';
import { Input, View, Image } from '@tarojs/components';
import './MxInput.scss';

class MxInput extends Component {
  render() {
    const {
      leftSrc,
      rightSrc,
      leftSize,
      rightSize,
      type,
      width,
      height,
      placeholder,
      border,
      background,
      radius,
      onClick,
      onInput,
      onBlur,
      onChange,
      onConfirm,
      onFocus
    } = this.props;

    var password = false;

    switch (type) {
      case 'password':
        password = true;
        break;
      default:
        break;
    }

    var left = leftSrc ? true : false;
    var right = rightSrc ? true : false;
    const borderBottom = border ? '1px solid #707070' : '';

    const css = {
      left: {
        width: `${leftSize}`,
        height: `${leftSize}`
      },
      right: {
        width: `${rightSize}`,
        height: `${rightSize}`,
        float: 'right'
      },
      input: {
        height: `${height}`
      },
      box: {
        width: `${width}`,
        height: `${height}`,
        background: `${background}`,
        borderBottom: `${borderBottom}`,
        borderRadius: `${radius}`
      }
    };
    return (
      <View style={css.box} className="box">
        {left && (
          <Image style={css.left} src={leftSrc} onClick={onClick}></Image>
        )}
        <Input
          style={css.input}
          type={type}
          placeholder={placeholder}
          placeholderClass="placeholderStyle"
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onConfirm={onConfirm}
          onChange={onChange}
        />
        {right && <Image style={css.right} src={rightSrc} onClick={onClick} />}
      </View>
    );
  }
}

MxInput.defaultProps = {
  leftSize: '30px',
  rightSize: '30px',
  leftSrc: '',
  rightSrc: '',
  type: 'text',
  width: '250px',
  height: '30px',
  placeholder: '',
  background: '#ffffff',
  radius: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onConfirm: () => {},
  onClick: () => {},
  onInput: () => {}
};

export default MxInput;
