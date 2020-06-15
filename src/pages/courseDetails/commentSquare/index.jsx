import Taro, { Component } from '@tarojs/taro'
import { View, Text, Textarea } from '@tarojs/components'
import './index.scss'
import MxCard from '../../components/common/MxCard'
import MxRate from '../../components/common/MxRate/MxRate'
import MxIcon from '../../components/common/MxIcon'
import octodex from '../../assets/png/octodex.jpg'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom',
    navigationBarTextStyle: 'black',
    disableScroll: true,
  }
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }

  constructor() {
    super(...arguments);
    this.state = {
      datas: [
        {
          userImg: '',
          userName: '用户昵称',
          commentTime: '2019.8.23/11：04',
          courseName: '线性代数B',
          courseTeacher: '张俊',
          starRate: 4,
          comment: '老师也太有意思了吧哈哈哈哈   简直是被数学埋没的相声演员，课上一言不合就开始作诗……',
          raiseNum: 17,
          commentNum: 5,
        },
        {
          userImg: '',
          userName: '我爱数学数学爱我',
          commentTime: '2019.6.23/10：58',
          courseName: '高等数学B',
          courseTeacher: '张圆',
          starRate: 4,
          comment: '高数太难了啊啊复习使人秃头',
          raiseNum: 13,
          commentNum: 2,
        },
        {
          userImg: '',
          userName: '哔哩吧啦魔仙变',
          commentTime: '2019.5.28/20：37',
          courseName: '创业项目科学技术',
          courseTeacher: '伍强贤',
          starRate: 1,
          comment: '真**是一门神仙课程呢~ 谁选谁后悔噢~',
          raiseNum: 26,
          commentNum: 9,
        },
        {
          userImg: '',
          userName: '哔哩吧啦魔仙变',
          commentTime: '2019.5.28/20：37',
          courseName: '创业项目',
          courseTeacher: '伍强贤',
          starRate: 1,
          comment: '真**是一门神仙课程呢~ 谁选谁后悔噢~',
          raiseNum: 26,
          commentNum: 9,
        },
      ]
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

  handleClick() {
  }

  handleChangeCourse = e => {
    this.setState({
      courseChecked: this.course[e.detail.value]
    });
  };
  handleChangeFilterA = e => {
    this.setState({
      filterAChecked: this.filterA[e.detail.value]
    });
  };
  handleChangeFilterB = e => {
    this.setState({
      filterBChecked: this.filterB[e.detail.value]
    });
  };

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const content = (
      <View className='detailsBoxes'>
        {
          this.state.datas.map((data) => {
            return (
              <View className='detailsBox'>
                <MxCard className='detailsCard'>
                  <View className='detailsWrapper'>
                  <View className='detailsFirst'>
                    <View>
                      <Image src={octodex} className='detailsAvatar'></Image>
                    </View>
                    <View className='detailsFirstInfo'>
                      <View className='detailsFirstInfo1'>{data.userName}</View>
                      <View className='detailsFirstInfo2'>{data.commentTime}</View>
                    </View>
                    <View className='detailsFirstIcon'>
                      <MxIcon type='triangle'></MxIcon>
                    </View>
                  </View>
                  <View className='detailsSecond'>
                    <View className='detailsSecondInfo1' onClick={this.ChangeTodetails.bind(this)}>#{data.courseName}({data.courseTeacher})</View>
                    <View style=''>
                      <View className='detailsSecondInfo2'>评价星级：</View>
                      <MxRate value={data.starRate} style='vertical-align: top'></MxRate>
                    </View>
                  </View>
                  <View className='detailsThird'>
                    <View className='detailsThirdText'>{data.comment}</View>
                  </View>
                  <View className='detailsFourth'>
                    <MxIcon type='likeBtn' className='detailsFourthIcon1'></MxIcon>
                    <View>{data.raiseNum}</View>
                    <MxIcon type='cmmtBtn' className='detailsFourthIcon2'></MxIcon>
                    <View>{data.commentNum}</View>
                  </View>
                  </View>
                </MxCard>
              </View>
            )
          })
        }
      </View>
    )

    return (
      <View style='display: block'>
        <View className='navigationBox'><View style='margin-top: 66rpx'>评课广场</View></View>
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