/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './CourseDetailCard.scss';

function getweek(x) {
  switch (x) {
    case '1':
      return '一';
    case '2':
      return '二';
    case '3':
      return '三';
    case '4':
      return '四';
    case '5':
      return '五';
    case '6':
      return '六';
    case '7':
      return '日';
  }
}

function courseLength(list) {
  const start = list[0].Week.slice(0, 2);
  const end = list[0].Week.slice(-4, -2);
  var flag = true;
  list.map(index => {
    if (index.Week.slice(0, 2) != start || index.Week.slice(-4, -2) != end) {
      flag = false;
    }
  });
  return flag;
}
class CourseDetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ''
    };
    const COLORBOX = ['#81CAE2', '#F9C895', '#FBC5D4', '#93D9D1'];
    this.setState({
      color: COLORBOX[this.props.courseInfo.id % 4]
    });
  }
  render() {
    const { courseInfo } = this.props;
    const cardStyle = {
      backgroundColor: this.state.color
    };
    return (
      <View className="card" style={cardStyle}>
        <View className="courseNumber">{courseInfo.id}课堂</View>
        <View>
          {courseInfo.list &&
            courseLength(courseInfo.list) &&
            courseInfo.list.map(index => {
              return (
                <View key={index.Id} className="row">
                  <View className="week">
                    {'周' +
                      getweek(index.Time.slice(-1)) +
                      ' ' +
                      index.Time.slice(0, -2) +
                      '节'}
                  </View>
                  <View className="place">{'@ ' + index.Place}</View>
                  {index.Week.slice(-1) == '0' && (
                    <View className="place">(双)</View>
                  )}
                  {index.Week.slice(-1) == '1' && (
                    <View className="place">(单)</View>
                  )}
                </View>
              );
            })}
          {courseLength(courseInfo.list) && (
            <View className="length">
              {courseInfo.list[0].Week.slice(0, -2) + '周'}
            </View>
          )}
          {courseInfo.list &&
            !courseLength(courseInfo.list) &&
            courseInfo.list.map(index => {
              return (
                <View key={index.Id}>
                  <View className="row">
                    <View className="week">
                      {'周' +
                        getweek(index.Time.slice(-1)) +
                        ' ' +
                        index.Time.slice(0, -2) +
                        '节'}
                    </View>
                    <View className="place">{'@ ' + index.Place}</View>
                    {index.Week.slice(-1) == '0' && (
                      <View className="place">(双)</View>
                    )}
                    {index.Week.slice(-1) == '1' && (
                      <View className="place">(单)</View>
                    )}
                  </View>
                  <View className="length">
                    {index.Week.slice(0, -2) + '周'}
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    );
  }
}

CourseDetailCard.defaultProps = {
  courseInfo: ''
};

export default CourseDetailCard;
