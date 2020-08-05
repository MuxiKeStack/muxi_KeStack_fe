import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { View, Text } from '@tarojs/components';
import { MxIcon } from '../../../common/MxIcon';
import './index.scss';

export default class Item extends Component {
  constructor() {
    super(...arguments);
  }
  handleClick = (...args) => {
    this.props.onClick(...args);
  };
  render() {
    const { title, extraText, hasBgi, iconType, hasNew, num } = this.props;
    const rootClass = classNames('list-item', this.props.className);
    /*const setIconCenter={
            display: 'flex',
            'align-items': 'center',
        }*/

    return (
      <View className={rootClass} onClick={this.handleClick}>
        {hasNew && hasBgi && (
          <View className={num==true?'item-container':'item-container-Fir'}>
            <View className="icon">
              <MxIcon
                type={iconType}
                width="44"
                height="45"
                className="item-icon" /*outerStyle={setIconCenter}*/
              ></MxIcon>
            </View>
            <Text className='item-title'>{title}</Text>
            <MxIcon type="solidC" width="20" height="20"></MxIcon>
            <Text className="item-extra">{extraText}</Text>
          </View>
        )}
        {!hasNew && hasBgi && (
          <View className={num==true?'item-container':'item-container-Fir'}>
            <View className="icon">
              <MxIcon
                type={iconType}
                width="44"
                height="45"
                className="item-icon" /*outerStyle={setIconCenter}*/
              ></MxIcon>
            </View>
            <Text className='item-title'>{title}</Text>
            <Text className="item-extra">{extraText}</Text>
          </View>
        )}
        {!hasBgi && (
          <View className={num==true?'item-container':'item-container-Fir'}>
            <View className="icon">
              <MxIcon
                type={iconType}
                width="44"
                height="45"
                className="item-icon" /*outerStyle={setIconCenter}*/
              ></MxIcon>
            </View>
            <Text className='item-title'>{title}</Text>
            <Text className="item-extra">{extraText}</Text>
          </View>
        )}
      </View>
    );
  }
}
Item.defaultProps = {
  className: '',
  title: '',
  extraText: '',
  customStyle: '',
  hasBgi: false,
  hasNew: false,
  iconType: '',
  num: true
};
Item.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  extraText: PropTypes.string,
  customStyle: PropTypes.string,
  hasBgi: PropTypes.bool,
  hasNew: PropTypes.bool,
  iconType: PropTypes.string
};
