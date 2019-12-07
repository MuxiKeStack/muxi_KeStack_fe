import Taro, { Component } from '@tarojs/taro'
import { View, Text, Textarea } from '@tarojs/components'
import './index.scss'
import MxCard from '../../components/common/MxCard'
import MxRate from '../../components/common/MxRate/MxRate'
import MxIcon from '../../components/common/MxIcon'
import Fetch from '../../service/fetch'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '选课清单',
  }

  constructor() {
    super(...arguments);
    this.state = {
      datas: [
        {
          courseName: '线性代数B',
          name: '张俊',
          starRate: 4,
          numOfCommenters: 23,
          tag1: '偶尔点名' ,
          tag2: '期末闭卷' ,
          tag3: '生动有趣' ,
          tag4: '干货满满' 
        },
        {
          courseName: '也许是马基主义基本原理',
          name: 'xxx',
          starRate: 3,
          numOfCommenters: 59,
          tag1: '经常点名' ,
          tag2: '期末开卷' ,
          tag3: '简单易学' ,
          tag4: '云课堂资料全' 
          
        },
        {
          courseName: '不知是啥课',
          name: 'xxx',
          starRate: 2,
          numOfCommenters: 11,
          tag1: '偶尔点名' ,
          tag2: '论文考核' ,
          tag3: '生动有趣' ,
          tag4: '干货满满' 
        },
        {
          courseName: '神仙课程',
          name: 'xxxxx',
          starRate: 5,
          numOfCommenters: 47,
          tag1: '很少点名' ,
          tag2: '没有考核' ,
          tag3: '生动有趣' ,
          tag4: '作业量少' 
          
        },
      ]
    };
  }

  handleClick() {
  }

  getLists() {
    // var that = this;
    // let newComments = this.state.comments
    // if(this.state.lastId!=1){
      console.log('你好')
    Fetch(
      'api/v1/course/using/favoritelist',
      {},
      'GET'
    ).then(data =>{
      if(data){
        console.log(data)
      }
    })
    // .then(data =>{
    //   if(data){
    //     newComments=newComments.concat(data.data.list)
    //     Taro.stopPullDownRefresh()
    //     Taro.hideNavigationBarLoading()
    //     that.setState({
    //       comments: newComments,
    //       sum: data.data.sum,
    //       lastId: data.data.list[data.data.sum-1].id
    //     })
    //   }
    // })} else {
    //   Taro.showToast({
    //     title: '到底啦！',
    //     duration: 2000
    //   })
    //   Taro.stopPullDownRefresh()
    //   Taro.hideNavigationBarLoading()
    // }
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

  componentWillMount() {
    this.getLists()
   }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const rate = 3
    const content = (
    <View className='detailsBoxes'>
      {
      this.state.datas.map((data) => {
        return(
          <View className='detailsBox'>
        <View className='detailsCard'>
          <View className='detailsLeft'>
            <View>{data.courseName}</View>
            <View style='display: block'>{data.name}</View>
          </View>
          <View className='detailsRight'>
            <View>
              <MxRate
                comment={false}
                value={rate}>
              </MxRate>
              <View>评价人数：{data.numOfCommenters}</View>
            </View>
            <View className='detailsRightDown'>
              <View style='display:block'>
                <View className='detailsText'>{data.tag1}</View>
                <View className='detailsText'>{data.tag2}</View>
              </View>
              <View style='display:block'>
                <View className='detailsText'>{data.tag3}</View>
                <View className='detailsText'>{data.tag4}</View>
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
      <View style='display:block'>
          {content}
      </View>
    )
  }
}

