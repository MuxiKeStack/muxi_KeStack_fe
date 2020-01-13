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
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  }

  constructor() {
    super(...arguments);
    this.state = {
      Lists: [],
      sum: 0,
      lastId: 0,

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
    console.log('拉取数据')
    let newLists= this.state.Lists
    Fetch(
      'api/v1/collection',
      {
      limit: 4,
      last_id: this.state.lastId
      },
      'GET'
    ).then(data =>{
      console.log(data)
      console.log(this.state.lastId)
      if(data.data.list!=null){
        if(this.state.lastId!=0){
          newLists = newLists.concat(data.data.list)
          Taro.stopPullDownRefresh()
          Taro.hideNavigationBarLoading()
          this.setState({
            Lists: newLists,
            sum: data.data.sum,
            lastId: data.data.list[data.data.sum-1].id
          })
        } else {
          Taro.stopPullDownRefresh()
          Taro.hideNavigationBarLoading()
          this.setState({
            Lists: data.data.list,
            sum: data.data.sum,
            lastId: data.data.list[data.data.sum-1].id
          })
        }
        }else {
          Taro.showToast({
            title: '到底啦！',
            duration: 2000
          })
          Taro.stopPullDownRefresh()
          Taro.hideNavigationBarLoading()
        }
      }
    )
}

  onPullDownRefresh() {
    this.setState({
      sum: 0,
      lastId: 0
    }, ()=>{
      Taro.showNavigationBarLoading()
      this.getLists()
    })
  }

  onReachBottom() {
    Taro.showNavigationBarLoading()
    this.getLists()
  }



  componentWillMount() {
    console.log("啦啦啦")
    this.getLists()
   }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const content = (
    <View className='detailsBoxes'>
      {
      this.state.Lists.map((data) => {
        return(
          <View className='detailsBox'>
        <View className='detailsCard'>
          <View className='detailsLeft'>
            <View>{data.course_name}</View>
            <View style='display: block'>{data.teacher}</View>
          </View>
          <View className='detailsRight'>
            <View>
              <MxRate
                comment={false}
                value={data.rate}>
              </MxRate>
              <View>评价人数：{data.evaluation_num}</View>
            </View>
            <View className='detailsRightDown'>
              <View style='display:block'>
                <View className='detailsText'>{data.tags[0]}</View>
                <View className='detailsText'>{data.tags[1]}</View>
              </View>
              <View style='display:block'>
                <View className='detailsText'>{data.tags[2]}</View>
                <View className='detailsText'>{data.tags[3]}</View>
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

