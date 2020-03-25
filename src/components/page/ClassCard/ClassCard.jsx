/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './ClassCard.scss';

class ClassCard extends Component {
  constructor() {
    this.state = {
      list: this.props.list
    };
  }

  renderTime(value) {
    let time = value.substr(0, value.length - 2);
    let week = value.substr(value.length - 1, 1);
    switch (week) {
      case '1':
        {
          return (
            <View className="time">{`周一${time.replace(/-/, '~')}节`}</View>
          );
        }
        break;
      case '2':
        {
          return (
            <View className="time">{`周二${time.replace(/-/, '~')}节`}</View>
          );
        }
        break;
      case '3':
        {
          return (
            <View className="time">{`周三${time.replace(/-/, '~')}节`}</View>
          );
        }
        break;
      case '4':
        {
          return (
            <View className="time">{`周四${time.replace(/-/, '~')}节`}</View>
          );
        }
        break;
      case '5':
        {
          return (
            <View className="time">{`周五${time.replace(/-/, '~')}节`}</View>
          );
        }
        break;
      case '6':
        {
          return (
            <View className="time">{`周六${time.replace(/-/, '~')}节`}</View>
          );
        }
        break;
      case '7':
        {
          return (
            <View className="time">{`周一${time.replace(/-/, '~')}节`}</View>
          );
        }
        break;
    }
  }
  renderSpanWeek(value) {
    const spanWeek = this.state.list[0].Week.substring(
      0,
      this.state.list[0].Week.length - 2
    );
    if (spanWeek != value) {
      return <View className="classWeek">{value}周</View>;
    }
  }

  render() {
    return (
      <View className="classCard">
        {this.state.list.map(item => {
          return (
            <View key={item.id} className="row">
              {this.renderSpanWeek(
                item.Week.substring(0, this.state.list[0].Week.length - 2)
              )}
              {this.renderTime(item.Time)}
              <View className="place"> @ {item.Place}</View>
              {item.Week.substr(item.Week.length - 1, 1) == '1' && (
                <View className="week">(单)</View>
              )}
              {item.Week.substr(item.Week.length - 1, 1) == '2' && (
                <View className="week">(双)</View>
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
ClassCard.defaultProps = {};

export default ClassCard;
