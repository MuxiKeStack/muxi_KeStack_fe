import Taro, { Component } from '@tarojs/taro';
import {
  View,
  Image,
  ScrollView,
  MovableArea,
  MovableView
} from '@tarojs/components';
import './index.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import MxIcon from '../../components/common/MxIcon';
import Fetch from '../../service/fetch';
import MxReport from '../../components/common/MxReport';
import MxLike from '../../components/page/MxLike/MxLike';
import Octodex from '../../assets/png/octodex.jpg';
import MxLoading from '../../components/common/MxLoading';
import MxGuide from '../../components/common/MxGuide/index';

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '评课广场',
    navigationBarTextStyle: 'black'
    // enablePullDownRefresh: true
    // onReachBottomDistance: 80
  };

  constructor() {
    super(...arguments);
    this.state = {
      comments: [],
      lastId: 0,
      x: 0,
      y: 43,
      bottomFlag: false,
      isStar: false,
      scrollY: true,
      scrollTop: 0
    };
  }

  onPullDownRefresh() {
    this.setState(
      {
        sum: 0,
        lastId: 0,
        bottomFlag: false
      },
      () => {
        Taro.showNavigationBarLoading();
        this.getComments();
      }
    );
  }



  getComments() {
    var that = this;
    let newComments = this.state.comments;
    Fetch(
      'api/v1/evaluation/',
      {
        limit: 4,
        last_id: this.state.lastId
      },
      'GET'
    ).then(data => {
      if (data.data.list != null) {
        if (this.state.lastId != 0) {
          newComments = newComments.concat(data.data.list);
          Taro.stopPullDownRefresh();
          Taro.hideNavigationBarLoading();
          that.setState({
            comments: newComments,
            sum: data.data.sum,
            lastId: data.data.list[data.data.sum - 1].id
          });
        } else {
          Taro.stopPullDownRefresh();
          Taro.hideNavigationBarLoading();
          that.setState({
            comments: data.data.list,
            sum: data.data.sum,
            lastId: data.data.list[data.data.sum - 1].id
          });
        }
      } else {
        Taro.showToast({
          title: '到底啦！',
          duration: 2000
        });
        Taro.stopPullDownRefresh();
        Taro.hideNavigationBarLoading();
        this.setState({
          bottomFlag: true
        });
      }
    });
  }

  ChangeTosearch() {
    Taro.navigateTo({
      url: '/pages/search/index'
    });
  }

  ChangeTopost() {
    Taro.navigateTo({
      url: '/pages/postReview/index'
    });
  }

  ChangeTodetails(value) {
    Taro.navigateTo({
      url: `/pages/courseDetails/courseDetails?courseId=${value}`
    });
  }

  ChangeToCommentsDetails(value) {
    Taro.navigateTo({
      url: '/pages/courseCommentsDetails/courseCommentsDetails?id=' + value
    });
  }



  componentDidShow() {
    this.setState(
      {
        bottomFlag: false,
        sum: 0,
        lastId: 0,
        scrollTop: Math.random()
      },
      () => {
        Taro.showNavigationBarLoading();
        this.getComments();
      }
    );
  }





  toEdge(e) {
    let windowHeight = Taro.getSystemInfoSync().windowHeight;
    if (e.detail.y != 43) {
      this.setState(
        {
          back: true
        },
        () => {
          if (e.detail.y >= windowHeight * 0.15) {
            this.setState(
              {
                sum: 0,
                lastId: 0,
                bottomFlag: false,
                isStar: true
              },
              () => {
                Taro.showNavigationBarLoading();
                this.getComments();
<<<<<<< HEAD
=======
                console.log(132);
>>>>>>> c0106bc1b479c21cbcbf65c75fce84d38c60dd6b
              }
            );
          } else if (e.detail.y == 0) {
            this.setState(
              {
                isStar: true
              },
              () => {
                Taro.showNavigationBarLoading();
                this.getComments();
<<<<<<< HEAD
=======
                console.log(132);
>>>>>>> c0106bc1b479c21cbcbf65c75fce84d38c60dd6b
              }
            );
          }
        }
      );
    }
  }
  scroll(e) {
    if (e.detail.scrollTop === 0 || e.detail.scrollTop === 216) {
      this.setState({
        scrollY: false
      });
    }
  }
  end() {
    if (this.state.back === true) {
<<<<<<< HEAD
      this.setState({
        y: Math.random() + 43,
        scrollY: true,
        isStar: false
      });
=======
      this.setState(
        {
          y: Math.random() + 43,
          scrollY: true,
          isStar: false
        },
        () => {
          console.log(456);
        }
      );
>>>>>>> c0106bc1b479c21cbcbf65c75fce84d38c60dd6b
    }
  }

  normalTime(timestamp) {
    var date = new Date(timestamp * 1000); //如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':';
    var s =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }

  render() {
<<<<<<< HEAD
=======
    let isFir = Taro.getStorageSync('isFir');
    let dragStyle = this.state.dragStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;
    let isStar = this.state.isStar;
>>>>>>> c0106bc1b479c21cbcbf65c75fce84d38c60dd6b
    const { bottomFlag } = this.state;
    const cardMap = (
      <View>
        {this.state.comments.map(comment => {
          return (
            // eslint-disable-next-line react/jsx-key
            <View className="detailsBox">
              <View className="detailsCard">
                <View className="detailsWrapper">
                  <View className="detailsFirst">
                    <View>
                      {!comment.is_anonymous && (
                        <Image
                          src={comment.user_info.avatar}
                          className="detailsAvatar"
                        />
                      )}
                      {comment.is_anonymous && (
                        <Image src={Octodex} className="detailsAvatar" />
                      )}
                    </View>
                    <View className="detailsFirstInfo">
                      {!comment.is_anonymous && (
                        <View className="detailsFirstInfo1">
                          {comment.user_info.username}
                        </View>
                      )}
                      {comment.is_anonymous && (
                        <View className="detailsFirstInfo1">匿名用户</View>
                      )}
                      <View className="detailsFirstInfo2">
                        {this.normalTime(comment.time)}
                      </View>
                    </View>
                    <View className="detailsFirstIcon">
                      <MxReport
                        ID={comment.id}
                        // onClick={this.ChangeToReport.bind(this, comment.id)}
                      />
                    </View>
                  </View>
                  <View className="detailsSecond">
                    <View
                      className="detailsSecondInfo1"
                      onClick={this.ChangeTodetails.bind(
                        this,
                        comment.course_id
                      )}
                    >
                      #{comment.course_name}({comment.teacher})
                    </View>
                    <View className="detailsSecondInfo2">评价星级：</View>
                    <View className="detailsRate">
                      <MxRate value={comment.rate} />
                    </View>
                  </View>
                  <View className="detailsThird">
                    {comment.content != '' && (
                      <View
                        className="detailsThirdText"
                        onClick={this.ChangeToCommentsDetails.bind(
                          this,
                          comment.id
                        )}
                      >
                        {comment.content}
                      </View>
                    )}
                    {comment.content == '' && (
                      <View
                        className="detailsThirdText"
                        onClick={this.ChangeToCommentsDetails.bind(
                          this,
                          comment.id
                        )}
                      >
                        该用户没有评论
                      </View>
                    )}
                  </View>
                  <View className="detailsFourth">
                    <View className="detailsFourthIcon1">
                      <MxLike
                        theid={comment.id}
                        islike={comment.is_like}
                        likenum={comment.like_num}
                      />
                    </View>
                    <View
                      onClick={this.ChangeToCommentsDetails.bind(
                        this,
                        comment.id
                      )}
                    >
                      <MxIcon type="cmmtBtn" className="detailsFourthIcon2" />
                      <View>{comment.comment_num}</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
    const content2 = (
      <View style="width: 100%;height: 100%;">
        <MovableArea style="width: 100%; height: 100%;">
          {/*<View style='background: lightgreen;z-index: 299; width:100%;height:50px; position: fixed; top: 50px'></View>*/}
          <MovableView
            damping={20}
            onTouchEnd={this.end}
            x={this.state.x}
            y={this.state.y}
            onChange={this.toEdge}
            direction="vertical"
            style=" width: 100%; height: 85%;"
          >
            <ScrollView
              scrollTop={this.state.scrollTop}
              scrollY={this.state.scrollY}
              style="height: 117%; width: 100%; margin-top: -75rpx;"
              onScroll={this.scroll}
            >
              <View className="MxLoading">
                <MxLoading isShow={this.state.isStar} />
              </View>
              {cardMap}
              {bottomFlag && <View className="bottomBox">到底啦！</View>}
            </ScrollView>
            <View className="MxLoading">
              <MxLoading isShow={this.state.isStar} />
            </View>
          </MovableView>
        </MovableArea>
      </View>
    );

    return (
      <View style="display: block; height: 100%">
        {isFir && <MxGuide type="square4"></MxGuide>}
        {isFir && <MxGuide type="square3"></MxGuide>}
        {isFir && <MxGuide type="square2"></MxGuide>}
        {isFir && <MxGuide type="square1"></MxGuide>}
        <View className="chooseBox">
          <View
            className="chooseSearchBack"
            onClick={this.ChangeTosearch.bind(this)}
          >
            <MxIcon
              type="search"
              className="chooseSearch"
              width="32px"
              height="32px"
            />
          </View>
          <View onClick={this.ChangeTopost.bind(this)}>
            <MxIcon type="add" className="chooseAdd" width="42px" />
          </View>
        </View>
        {content2}

      </View>
    );
  }
}
