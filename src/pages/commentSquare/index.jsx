import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import './index.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import MxIcon from '../../components/common/MxIcon';
import Fetch from '../../service/fetch';
import MxReport from '../../components/common/MxReport';
import MxLike from '../../components/page/MxLike/MxLike';
import Octodex from '../../assets/png/octodex.jpg';

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '评课广场',
    navigationBarTextStyle: 'black',
    // enablePullDownRefresh: true
    // onReachBottomDistance: 80
  };

  constructor() {
    super(...arguments);
    this.state = {
      comments: [],
      sum: 0,
      lastId: 0,
      bottomFlag: false,
      dragStyle: {
        //下拉框的样式
        top: 0 + 'px'
      },
      downDragStyle: {
        //下拉图标的样式
        height: 0 + 'px'
      },
      downText: '下拉刷新',
      upDragStyle: {
        //上拉图标样式
        height: 0 + 'px'
      },
      pullText: '上拉加载更多',
      start_p: {},
      scrollY: true,
      dragState: 0, //刷新状态 0不做操作 1刷新 -1加载更多
      scrollTop: 0
    };
    this.touchEnd = this.touchEnd.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchmove = this.touchmove.bind(this);
    this.ScrollToUpper = this.ScrollToUpper.bind(this);
    this.ScrollToLower = this.ScrollToLower.bind(this);
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

  // onReachBottom() {
  //   Taro.showNavigationBarLoading();
  //   this.getComments();
  // }

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

  ChangeToReport(id) {
    console.log('id: ' + id);
    // Fetch(`api/v1/evaluation/${id}/report/`, {}, 'POST').then(data => {
    //   if (data.data.fail === true) {
    //     if (data.data.reason === 'You have been reported this evaluation!') {
    //       Taro.showToast({
    //         title: '不要重复举报哟!',
    //         icon: 'none'
    //       });
    //     }
    //   } else {
    //     Taro.showToast({
    //       title: '举报成功！',
    //       icon: 'success'
    //     });
    //   }
    // });
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
        // Taro.pageScrollTo({
        //   scrollTop: 0,
        //   duration: 0
        // });
        Taro.showNavigationBarLoading();
        this.getComments();
      }
    );
  }

  reduction() {
    //还原初始设置
    const time = 0.5;
    this.setState({
      upDragStyle: {
        //上拉图标样式
        height: 0 + 'px',
        transition: `all ${time}s`
      },
      dragState: 0,
      dragStyle: {
        top: 0 + 'px',
        transition: `all ${time}s`
      },
      downDragStyle: {
        height: 0 + 'px',
        transition: `all ${time}s`
      },
      scrollY: true
    });
    setTimeout(() => {
      this.setState({
        dragStyle: {
          top: 0 + 'px'
        },
        upDragStyle: {
          //上拉图标样式
          height: 0 + 'px'
        },
        pullText: '上拉加载更多',
        downText: '下拉刷新'
      });
    }, time * 1000);
  }
  touchStart(e) {
    this.setState({
      start_p: e.touches[0]
    });
  }
  touchmove(e) {
    let that = this;
    let move_p = e.touches[0], //移动时的位置
      deviationX = 0.3, //左右偏移量(超过这个偏移量不执行下拉操作)
      deviationY = 70, //拉动长度（低于这个值的时候不执行）
      maxY = 50; //拉动的最大高度

    let start_x = this.state.start_p.clientX,
      start_y = this.state.start_p.clientY,
      move_x = move_p.clientX,
      move_y = move_p.clientY;

    //得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    if (dev < deviationX) {
      //当偏移数值大于设置的偏移数值时则不执行操作
      let pY = Math.abs(move_y - start_y) / 3.5; //拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
      if (move_y - start_y > 0) {
        //下拉操作
        if (pY >= deviationY) {
          this.setState({ dragState: 1, downText: '释放刷新' });
        } else {
          this.setState({ dragState: 0, downText: '下拉刷新' });
        }
        if (pY >= maxY) {
          pY = maxY;
        }
        this.setState({
          dragStyle: {
            top: pY + 'px'
          },
          downDragStyle: {
            height: pY + 'px'
          },
          scrollY: false //拖动的时候禁用
        });
      }
      if (start_y - move_y > 0) {
        //上拉操作
        // console.log('上拉操作');
        if (pY >= deviationY) {
          this.setState({ dragState: -1, pullText: '释放加载更多' });
        } else {
          this.setState({ dragState: 0, pullText: '上拉加载更多' });
        }
        if (pY >= maxY) {
          pY = maxY;
        }
        this.setState({
          dragStyle: {
            top: -pY + 'px'
          },
          upDragStyle: {
            height: pY + 'px'
          },
          scrollY: false //拖动的时候禁用
        });
      }
    }
  }
  touchEnd(e) {
    if (this.state.dragState === 1) {
      this.down();
    } else if (this.state.dragState === -1) {
      this.pull();
    }
    setTimeout(() => {
      this.reduction();
    }, 1000);
    // this.reduction()
  }

  pull() {
    //上拉
    Taro.showNavigationBarLoading();
    this.getComments();
    console.log('上拉');
    // this.props.onPull()
  }
  down() {
    //下拉
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
    console.log('下拉');
    // this.props.onDown()
  }
  ScrollToUpper() {
    //滚动到顶部事件
    console.log('滚动到顶部事件');
    // this.props.Upper()
  }
  ScrollToLower() {
    //滚动到底部事件
    console.log('滚动到底部事件');
    // this.props.Lower()
  }
  // componentWillMount() {
  //
  // }

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
    let dragStyle = this.state.dragStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;
    const { bottomFlag } = this.state;
    const content = (
      <View className="dragUpdataPage" style={{height: Taro.getSystemInfoSync().windowHeight *2 - 100 + 'rpx'}}>
        <View className="downDragBox" style={downDragStyle}>
          <Text className="downText">{this.state.downText}</Text>
        </View>
        <ScrollView
          style={dragStyle}
          onTouchMove={this.touchmove}
          onTouchEnd={this.touchEnd}
          onTouchStart={this.touchStart}
          onScrollToUpper={this.ScrollToUpper}
          onScrollToLower={this.ScrollToLower}
          className="detailsBoxes"
          scrollTop={this.state.scrollTop}
          scrollY={this.state.scrollY}
          // scrollWithAnimation
        >
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
        </ScrollView>
        <View className="upDragBox" style={upDragStyle}>
          <Text className="downText">{this.state.pullText}</Text>
        </View>
      </View>
    );
    return (
      <View style="display: block">
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
        {content}
        {bottomFlag && <View className="bottomBox">到底啦！</View>}
      </View>
    );
  }
}
