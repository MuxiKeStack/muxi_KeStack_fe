import Taro, { Component } from '@tarojs/taro'
import { View, Text, Textarea, ScrollView } from '@tarojs/components'
import './index.scss'
import MxCard from '../../components/common/MxCard'
import MxRate from '../../components/common/MxRate/MxRate'
import MxIcon from '../../components/common/MxIcon'
import Fetch from '../../service/fetch'
import MxReport from '../../components/common/MxReport'
import MxInput from '../../components/common/MxInput/MxInput'
import MxLike from '../../components/page/MxLike/MxLike';
import Octodex from '../../assets/png/octodex.jpg'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '评课广场',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  }

  constructor() {
    super(...arguments);
    this.state = {
      comments: [],
      sum: 0,
      lastId: 0,
      search: ''
    };
  }

  onPullDownRefresh() {
    this.setState({
      comments: [],
      sum: 0,
      lastId: 0
    },()=>{
      Taro.showNavigationBarLoading()
      this.getComments()
    })
    console.log(this.state.comments)
  }//下拉事件


  onReachBottom() {
    Taro.showNavigationBarLoading()
    this.getComments();
  }


  getComments() {
    var that = this;
    let newComments = this.state.comments
    if(this.state.lastId!=1){
    Fetch(
      'api/v1/evaluation',
      {
      limit: 3,
      last_id: this.state.lastId
      },
      'GET'
    ).then(data =>{
      if(data){
        console.log(data)
        newComments=newComments.concat(data.data.list)
        Taro.stopPullDownRefresh()
        Taro.hideNavigationBarLoading()
        that.setState({
          comments: newComments,
          sum: data.data.sum,
          lastId: data.data.list[data.data.sum-1].id
        })
      }
    })} else {
      Taro.showToast({
        title: '到底啦！',
        duration: 2000
      })
      Taro.stopPullDownRefresh()
      Taro.hideNavigationBarLoading()
    }
  }

  handleClickContent(event) {
    this.setState({
        search: event.detail.value
    })
}


  ChangeTosearch() {
    Taro.navigateTo({
      url: '/pages/search/index?searchInfo=' + this.state.search
    });
  }

  ChangeTopost() {
    Taro.navigateTo({
      url: '/pages/postReview/index'
    },
);
  }

  ChangeTodetails(value) {
    Taro.navigateTo({
      url: '/pages/courseDetails/courseDetails?courseId=' + value
    });
  }

  ChangeToCommentsDetails(value) {
    Taro.navigateTo({
      url: '/pages/courseCommentsDetails/courseCommentsDetails?id=' + value
    });
  }

  ChangeToReport() {
    console.log("我要举报！！！")
  }


  componentDidShow() {
    this.setState({
      comments: [],
      sum: 0,
      lastId: 0
    },()=>{
      Taro.showNavigationBarLoading()
      this.getComments()
    })
  }

  componentWillMount() {
    this.getComments();
  }

  normalTime(timestamp) {
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
    var bottomFlag = this.state.lastId-1;
    var isAnonymous = this.state.is_anonymous
    const content = (
      <View
        className='detailsBoxes'
      >
        {
          this.state.comments.map((comment) => {
            return (
              <View className='detailsBox'>
                <View className='detailsCard'>
                  <View className='detailsWrapper'>
                    <View className='detailsFirst'>
                      <View>
                       {!isAnonymous && <Image src={comment.user_info.avatar} className='detailsAvatar'></Image> }
                       {isAnonymous && <Image src={Octodex} className='detailsAvatar'></Image> }
                      </View>
                      <View className='detailsFirstInfo'>
                        {!isAnonymous && <View className='detailsFirstInfo1'>{comment.user_info.username}</View>}
                        {isAnonymous && <View className='detailsFirstInfo1'>匿名用户</View>}
                        <View className='detailsFirstInfo2'>{this.normalTime(comment.time)}</View>
                      </View>
                      <View className='detailsFirstIcon'>
                        <MxReport onClick={this.ChangeToReport.bind(this)}></MxReport>
                      </View>
                    </View>
                    <View className='detailsSecond'>
                      <View className='detailsSecondInfo1' onClick={this.ChangeTodetails.bind(this,comment.id)}>#{comment.course_name}({comment.teacher})</View>
                        <View className='detailsSecondInfo2'>评价星级：</View>
                        <View className='detailsRate'>
                        <MxRate value={comment.rate}></MxRate>
                        </View>
                    </View>
                    <View className='detailsThird'>
                      <View className='detailsThirdText' onClick={this.ChangeToCommentsDetails.bind(this,comment.id)}>{comment.content}</View>
                    </View>
                    <View className='detailsFourth'>
                      <View className='detailsFourthIcon1'>
                    <MxLike
                        theid={comment.id}
                        islike={comment.is_like}
                        likenum={comment.like_num}
                      />
                      </View>
                      <View onClick={this.ChangeToCommentsDetails.bind(this,comment.id)}>
                      <MxIcon type='cmmtBtn' className='detailsFourthIcon2'></MxIcon>
                      <View>{comment.comment_num}</View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )

    return (
      <View style='display: block'>
        {/* <View className='navigationBox'><View style='margin-top: 66rpx'>评课广场</View></View> */}
        <View className='chooseBox'>
          <View className='chooseInput'>
          <MxInput
          leftSrc='../../../assets/svg/searchicon.svg'leftSize='20px' width='670rpx' height='72rpx' background='rgba(241,240,245,1)'
          radius='36rpx'
          width='550rpx'
          onClick={this.ChangeTosearch.bind(this)}
          onInput={this.handleClickContent.bind(this)}
          > 
          </MxInput>
          </View>
          <View onClick={this.ChangeTopost.bind(this)} className='chooseAdd'>
            <MxIcon type='add'  width='40p2' width='40p2'></MxIcon>
          </View>
        </View>
        {content}    
        {!bottomFlag && <View className='bottomBox'>到底啦！</View>}
      </View>
    )
  }
}
