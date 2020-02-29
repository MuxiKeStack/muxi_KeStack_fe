import Taro, { Component } from '@tarojs/taro';
import { View, Image, Input } from '@tarojs/components';
import { MxIcon } from '../../components/common/MxIcon';
import MxRate from '../../components/common/MxRate/MxRate';
import MxLike from '../../components/page/MxLike/MxLike';
import Img from '../../assets/svg/avatar-img.svg';
import ClickUpdiv from '../../components/page/clickUpdiv';
import './index.scss';
import Fetch from '../../service/fetch';
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      last_id: 0
      // sum: 0,
    };
  }
  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '评课历史',
    onReachBottomDistance: 50
  };

  componentDidMount() {
    /*        courseList().then(res => {
                console.log(res);
                this.setState({
                    course: res.info,
                    });
                });*/

    Fetch(
      'api/v1/user/evaluations/',
      {
        limit: '20'
      },
      'GET'
    ).then(res => {
      if (res) {
        console.log(res.data.list);
        console.log(res.data.list[res.data.list.length - 1].id);
        this.setState({
          list: res.data.list,
          last_id: res.data.list[res.data.list.length - 1].id
        });
      }
    });
  }

  componentWillUnmount() {}

  componentDidHide() {}
  onReachBottom() {
    if (this.state.last_id) {
      Fetch(
        'api/v1/user/evaluations/',
        {
          limit: '10',
          last_id: this.state.last_id
        },
        'GET'
      ).then(res => {
        if (res) {
          console.log(res.data.list);
          this.setState({
            list: res.data.list,
            last_id: this.state.id
          });
          if (!res.data.list)
            Taro.showToast({
              title: '已经到底啦',
              icon: 'none'
            });
        }
      });
    }
  }

  toNormalTime(timestamp) {
    var date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes();
    if (m % 10 == 0) return Y + M + D + h + m + 0;
    else return Y + M + D + h + m;
  }

  render() {
    const { list } = this.state;
    return (
      <View className="index">
        {list.map((course, index) => {
          var deleteBackground = course.can_delete
            ? 'card-container'
            : 'card-container-delete';
          return (
            <View className={deleteBackground} key={list[index].id}>
              <View className="user-info">
                <View className="avatar-container">
                  <Image
                    src={course.user_info.avatar}
                    className="avatar-image"
                  ></Image>
                </View>
                <View className="name-time">
                  <View className="name">{course.user_info.username}</View>
                  <View className="time">{this.toNormalTime(course.time)}</View>
                </View>
                <View className="delete-cmmt">
                  {/* key={this.state.list[index].id} */}
                  {/* <MxIcon
                    type="arrowD"
                    className="arrow"
                    onClick={this.handleDelete.bind(this, index)}
                  ></MxIcon> */}
                  <ClickUpdiv courseId={course.id} className="sad"></ClickUpdiv>
                </View>
              </View>
              <View className="course-container">
                <View
                  className="course-name"
                  // onClick={this.ChangeTodetails.bind(this, index)}
                  onClick={() =>
                    Taro.navigateTo({
                      url: '/pages/postReview/index?id=' + course.id
                    })
                  }
                >
                  {'#' + course.course_name} {'(' + course.teacher + ')'}{' '}
                </View>
                <View className="course-rate">
                  <View className="rate-text">评价星级:</View>
                  <View className="rate-icon">
                    <MxRate value={course.rate}></MxRate>
                  </View>
                </View>
                <View className="course-comment">{course.content}</View>
              </View>
              <View className="like-and-comment">
                <MxLike
                  theid={course.id}
                  islike={course.is_like}
                  likenum={course.like_num}
                ></MxLike>
                <View className="icon-container">
                  <MxIcon type="cmmtBtn" className="comment-icon"></MxIcon>
                </View>
                <View className="number">{course.comment_num}</View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
