/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro';
import { CoverView } from '@tarojs/components';
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
            <CoverView className="time">{`周一${time.replace(
              /-/,
              '~'
            )}节`}</CoverView>
          );
        }
        break;
      case '2':
        {
          return (
            <CoverView className="time">{`周二${time.replace(
              /-/,
              '~'
            )}节`}</CoverView>
          );
        }
        break;
      case '3':
        {
          return (
            <CoverView className="time">{`周三${time.replace(
              /-/,
              '~'
            )}节`}</CoverView>
          );
        }
        break;
      case '4':
        {
          return (
            <CoverView className="time">{`周四${time.replace(
              /-/,
              '~'
            )}节`}</CoverView>
          );
        }
        break;
      case '5':
        {
          return (
            <CoverView className="time">{`周五${time.replace(
              /-/,
              '~'
            )}节`}</CoverView>
          );
        }
        break;
      case '6':
        {
          return (
            <CoverView className="time">{`周六${time.replace(
              /-/,
              '~'
            )}节`}</CoverView>
          );
        }
        break;
      case '7':
        {
          return (
            <CoverView className="time">{`周一${time.replace(
              /-/,
              '~'
            )}节`}</CoverView>
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
      return <CoverView className="classWeek">{value}周</CoverView>;
    }
  }

  render() {
    return (
      <CoverView className="classCard">
        {this.state.list.map(item => {
          return (
            <CoverView key={item.id} className="row">
              {this.renderSpanWeek(
                item.Week.substring(0, this.state.list[0].Week.length - 2)
              )}
              {this.renderTime(item.Time)}
              <CoverView className="place"> @ {item.Place}</CoverView>
              {item.Week.substr(item.Week.length - 1, 1) == '1' && (
                <CoverView className="week">(单)</CoverView>
              )}
              {item.Week.substr(item.Week.length - 1, 1) == '2' && (
                <CoverView className="week">(双)</CoverView>
              )}
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}
ClassCard.defaultProps = {};

export default ClassCard;
