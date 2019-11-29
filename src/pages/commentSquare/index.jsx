import Taro, { Component } from '@tarojs/taro'
import { View, Text, Textarea, ScrollView } from '@tarojs/components'
import './index.scss'
import MxCard from '../../components/common/MxCard'
import MxRate from '../../components/common/MxRate/MxRate'
import MxIcon from '../../components/common/MxIcon'
import octodex from '../../assets/png/octodex.jpg'
import Fetch from '../../service/fetch'
import MxReport from '../../components/common/MxReport'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '评课广场',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  }

  onPullDownRefresh() {
    Taro.showNavigationBarLoading()
    setTimeout(() => {
      Taro.hideNavigationBarLoading()
      Taro.stopPullDownRefresh()
    }, 3000)
    this.setState({})
  }//下拉事件

  onReachBottom() {
    this.getComments();
    Taro.showNavigationBarLoading()
    setTimeout(() => {
      Taro.hideNavigationBarLoading()
      Taro.stopPullDownRefresh()
    }, 500)
  }



  setData(time) {
    var data1 = {
      "list": [
        {
          "attendance_check_type": "",
          "comment_num": 5,
          "content": "老师也太有意思了吧哈哈哈哈哈，简直是被数学埋没的相声演员，课上一言不合就开始开始作诗......",
          "course_id": "string",
          "course_name": "线性代数B",
          "exam_check_type": "string",
          "id": 0,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 17,
          "rate": 0,
          "tags": [
            "string"
          ],
          "teacher": "张俊",
          "time": 201908231104,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "用户昵称"
          }
        },
        {
          "attendance_check_type": "string",
          "comment_num": 2,
          "content": "数学太难了啊啊啊复习使人秃头",
          "course_id": "string",
          "course_name": "高等数学B",
          "exam_check_type": "string",
          "id": 1,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 13,
          "rate": 4,
          "tags": [
            "string"
          ],
          "teacher": "张圆",
          "time": 201906231058,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "我爱数学数学爱我"
          }
        },
        {
          "attendance_check_type": "string",
          "comment_num": 9,
          "content": "真是一门神仙学科呢，谁选谁后悔",
          "course_id": "string",
          "course_name": "string",
          "exam_check_type": "string",
          "id": 2,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 26,
          "rate": 1,
          "tags": [
            "string"
          ],
          "teacher": "string",
          "time": 201905282037,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "伍强贤"
          }
        },
        {
          "attendance_check_type": "string",
          "comment_num": 4,
          "content": "啊啊啊 模电魔电魔电！！！课挺难进度挺快的，不过薛老师挺认真负责的。选她准没错",
          "course_id": "string",
          "course_name": "string",
          "exam_check_type": "string",
          "id": 3,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 20,
          "rate": 4,
          "tags": [
            "string"
          ],
          "teacher": "string",
          "time": 0,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "电信学子"
          }
        },
      ],
      "sum": 4
    }
    var data2 = {
      "list": [
        {
          "attendance_check_type": "",
          "comment_num": 5,
          "content": "老师也太有意思了吧哈哈哈哈哈，简直是被数学埋没的相声演员，课上一言不合就开始开始作诗......",
          "course_id": "string",
          "course_name": "线性代数B",
          "exam_check_type": "string",
          "id": 0,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 17,
          "rate": 0,
          "tags": [
            "string"
          ],
          "teacher": "张俊",
          "time": 201908231104,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "用户昵称"
          }
        },
        {
          "attendance_check_type": "string",
          "comment_num": 2,
          "content": "数学太难了啊啊啊复习使人秃头",
          "course_id": "string",
          "course_name": "高等数学B",
          "exam_check_type": "string",
          "id": 1,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 13,
          "rate": 4,
          "tags": [
            "string"
          ],
          "teacher": "张圆",
          "time": 201906231058,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "我爱数学数学爱我"
          }
        },
        {
          "attendance_check_type": "string",
          "comment_num": 9,
          "content": "真是一门神仙学科呢，谁选谁后悔",
          "course_id": "string",
          "course_name": "string",
          "exam_check_type": "string",
          "id": 2,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 26,
          "rate": 1,
          "tags": [
            "string"
          ],
          "teacher": "string",
          "time": 201905282037,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "伍强贤"
          }
        },
        {
          "attendance_check_type": "string",
          "comment_num": 4,
          "content": "啊啊啊 模电魔电魔电！！！课挺难进度挺快的，不过薛老师挺认真负责的。选她准没错",
          "course_id": "string",
          "course_name": "string",
          "exam_check_type": "string",
          "id": 4,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 20,
          "rate": 3,
          "tags": [
            "string"
          ],
          "teacher": "string",
          "time": 0,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "电信学子"
          }
        },
        {
          "attendance_check_type": "",
          "comment_num": 5,
          "content": "老师也太有意思了吧哈哈哈哈哈，简直是被数学埋没的相声演员，课上一言不合就开始开始作诗......",
          "course_id": "string",
          "course_name": "线性代数B",
          "exam_check_type": "string",
          "id": 4,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 17,
          "rate": 0,
          "tags": [
            "string"
          ],
          "teacher": "张俊",
          "time": 201908231104,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "用户昵称"
          }
        },
        {
          "attendance_check_type": "string",
          "comment_num": 2,
          "content": "数学太难了啊啊啊复习使人秃头",
          "course_id": "string",
          "course_name": "高等数学B",
          "exam_check_type": "string",
          "id": 5,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 13,
          "rate": 4,
          "tags": [
            "string"
          ],
          "teacher": "张圆",
          "time": 201906231058,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "我爱数学数学爱我"
          }
        },
        {
          "attendance_check_type": "string",
          "comment_num": 9,
          "content": "真是一门神仙学科呢，谁选谁后悔",
          "course_id": "string",
          "course_name": "string",
          "exam_check_type": "string",
          "id": 6,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 26,
          "rate": 1,
          "tags": [
            "string"
          ],
          "teacher": "string",
          "time": 201905282037,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "伍强贤"
          }
        },
        {
          "attendance_check_type": "string",
          "comment_num": 4,
          "content": "啊啊啊 模电魔电魔电！！！课挺难进度挺快的，不过薛老师挺认真负责的。选她准没错",
          "course_id": "string",
          "course_name": "string",
          "exam_check_type": "string",
          "id": 7,
          "is_anonymous": true,
          "is_like": true,
          "is_valid": true,
          "like_num": 20,
          "rate": 3,
          "tags": [
            "string"
          ],
          "teacher": "string",
          "time": 0,
          "user_info": {
            "avatar": octodex,
            "sid": "string",
            "username": "电信学子"
          }
        },
      ],
      "sum": 8
    }
    if (time == 0) {
      return data1
    } else {
      return data2
    }
  }

  getComments() {
    // var that = this;
    // var postData = {
    //   token: '123',
    //   limit: this.state.sum,
    //   lastId: this.state.lastId
    // }
    // Fetch(
    //   '/api/v1/evaluation',
    //   postData,
    //   'Get'
    // ).then(data =>{
    //   if(data){
    //     console.log('成功')
    //     // that.setState({
    //     //   comments: that.data.list,
    //     //   lastId: that.data.list[that.data.sum-1]
    //     // })
    //   }
    // })
    if (this.state.sum != 4) {
      var data = this.setData(0)
      this.setState({
        comments: data.list,
        lastId: data.list[data.sum - 1].id,
        sum: data.sum
      })
    } else {
      var data = this.setData(1)
      this.setState({
        comments: data.list,
        lastId: data.list[data.sum - 1].id,
        sum: data.sum
      })
    }
  }

  constructor() {
    super(...arguments);
    this.state = {
      comments: [],
      sum: 0,
      lastId: 0
    };
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

  ChangeTodetails() {
    Taro.navigateTo({
      url: '/pages/courseDetails/courseDetails'
    });
  }

  ChangeToReport() {
    console.log("我要举报！！！")
  }

  handleClick() {
  }

  componentWillMount() {
    console.log("开始加载")
    this.setState({})
    console.log(this.state.sum)
    this.getComments();
  }

  render() {
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
                        <Image src={comment.user_info.avatar} className='detailsAvatar'></Image>
                      </View>
                      <View className='detailsFirstInfo'>
                        <View className='detailsFirstInfo1'>{comment.user_info.username}</View>
                        <View className='detailsFirstInfo2'>{comment.comment}</View>
                      </View>
                      <View className='detailsFirstIcon'>
                        <MxReport onClick={this.ChangeToReport.bind(this)}></MxReport>
                      </View>
                    </View>
                    <View className='detailsSecond'>
                      <View className='detailsSecondInfo1' onClick={this.ChangeTodetails.bind(this)}>#{comment.course_name}({comment.teacher})</View>
                      <View style=''>
                        <View className='detailsSecondInfo2'>评价星级：</View>
                        <MxRate value={comment.rate} style='vertical-align: top'></MxRate>
                      </View>
                    </View>
                    <View className='detailsThird'>
                      <View className='detailsThirdText'>{comment.content}</View>
                    </View>
                    <View className='detailsFourth'>
                      <MxIcon type='likeBtn' className='detailsFourthIcon1'></MxIcon>
                      <View>{comment.like_num}</View>
                      <MxIcon type='cmmtBtn' className='detailsFourthIcon2'></MxIcon>
                      <View>{comment.comment_num}</View>
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
          <View className='chooseSearchBack' onClick={this.ChangeTosearch.bind(this)}>
            <MxIcon type='search' className='chooseSearch' width='32px' height='32px'></MxIcon>
          </View>
          <View onClick={this.ChangeTopost.bind(this)}>
            <MxIcon type='add' className='chooseAdd' width='40p2' width='40p2'></MxIcon>
          </View>
        </View>
        {content}
      </View>
    )
  }
}