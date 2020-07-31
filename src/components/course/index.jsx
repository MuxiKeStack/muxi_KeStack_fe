import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import conflict from '../../assets/png/conflict.png';
import './index.scss';

var timecfli = new Array();
export default class Course extends Component {
  onClick = () => !this.props.editable && this.props.onClick();

  constructor(props) {
    super(props);
    this.state = {
      color: '',
      top: '',
      imgPosition: ''
    };
  }
  componentWillMount() {
    timecfli = new Array();
    const course = this.props.course;
    switch (course.type) {
      case 0:
        this.setState({
          color: '#71D69D'
        });
        break;
      case 1:
        this.setState({
          color: '#FC807F'
        });
        break;
      case 2:
        this.setState({
          color: '#FC807F'
        });
        break;
      case 3:
        this.setState({
          color: '#71D69D'
        });
        break;
      case 4:
        this.setState({
          color: '#FC807F'
        });
        break;
      case 5:
        this.setState({
          color: '#71D69D'
        });
        break;
      default:
        break;
    }
    this.props.course.times.map((item, i) => {
      timecfli[i] = 0;
      if (this.props.week == item.day) {
        this.setState({
          top: (item.start - 1) * 87 + 105
        });
        this.props.COURSESData.map(e => {
          if (e.course_id != course.course_id) {
            e.times.map(index => {
              if (index.start == item.start && index.day == item.day) {
                timecfli[i] = 1;
                this.setState({
                  imgPosition: (item.start - 1) * 88 + 92
                });
                this.props.onConflict(e);
              }
            });
          }
        });
      }
    });
  }

  shouldComponentUpdate() {
    timecfli = new Array();
    const course = this.props.course;
    switch (course.type) {
      case 0:
        this.setState({
          color: '#71D69D'
        });
        break;
      case 1:
        this.setState({
          color: '#FC807F'
        });
        break;
      case 2:
        this.setState({
          color: '#FC807F'
        });
        break;
      case 3:
        this.setState({
          color: '#71D69D'
        });
        break;
      case 4:
        this.setState({
          color: '#FC807F'
        });
        break;
      case 5:
        this.setState({
          color: '#71D69D'
        });
        break;
      default:
        break;
    }
    this.props.course.times.map((item, i) => {
      timecfli[i] = 0;
      if (this.props.week == item.day) {
        this.props.COURSESData.map(e => {
          if (e.course_id != course.course_id) {
            e.times.map(index => {
              if (index.start == item.start && index.day == item.day) {
                timecfli[i] = 1;
                this.setState({
                  imgPosition: (item.start - 1) * 88 + 92
                });
              }
            });
          }
        });
      }
    });
  }

  render() {
    const cardPosition = {
      top: `${this.state.top}rpx`,
      background: `${this.state.color}`
    };
    const onimgPosition = {
      top: `${this.state.imgPosition}rpx`
    };
    return (
      <View>
        <View
          className="course"
          style={cardPosition}
          onClick={this.props.onClick}
        >
          <View className="content">{this.props.children}</View>
        </View>
        {timecfli.map((item, i) => {
          if (item == 1 && this.state.imgPosition)
            return (
              <Image
                key={i}
                style={onimgPosition}
                className="conImg"
                src={conflict}
              ></Image>
            );
        })}
      </View>
    );
  }
}
Course.defaultProps = {
  onClick: () => {}
};
