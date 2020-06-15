import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import MxRate from '../../components/common/MxRate/MxRate'
import MxInput from '../../components/common/MxInput/MxInput'
import MxTag from '../../components/common/MxTag'
import image from '../../assets/png/navigation.png'

export default class Index extends Component {
  
  constructor(){
    super(...arguments)
    this.state = {
      datas:[
        { text:'线性代数B', teacher: '张俊', people: '84', tag1: '偶尔点名',tag2:'期末闭卷',tag3:'期末闭卷',tag4:'期末闭卷' },
        { text:'线性代数B', teacher: '张俊', people: '84', tag1: '偶尔点名',tag2:'期末闭卷',tag3:'暂无课程特点评价',tag4:'' },
        { text:'线性代数B', teacher: '张俊', people: '84', tag1: '偶尔点名',tag2:'期末闭卷' ,tag3:'期末闭卷',tag4:'期末闭卷'},
      ],
      value: 4,  
    }
  }
  config = {
    navigationBarTitleText: '木犀课栈'
  };
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }
  ChangeTodetails() {
    Taro.navigateTo({
        url: '/pages/courseDetails/courseDetails'
    });
  }

  handleChange (value) {
    this.setState({
      value
    })
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () {}
  componentDidShow () { }

  componentDidHide () { }

  render () {
    const content = (
      <View className='detailsBoxes'>
        {
          this.state.datas.map((data) => {
            return (
          <View className='detailsBox'>
          <View className='mx-card' onClick={this.ChangeTodetails.bind(this)}>
          <View className='blue'>
              <View className='star'>
                 <MxRate value={this.state.value} onChange={this.handleChange.bind(this)} readOnly={true}/>
              </View>
              <View className='word'>评价人数：</View>
             <View className='people'>{data.people}</View>
          </View>
        <View className='user-info'>
            <View className='class'>{data.text}</View>
             <View className='teacher'>{data.teacher}</View>
        </View>
        <View className='tag'> 
          <View className='tag1'>
              <Text>{data.tag1}</Text>
          </View>
          <View className='tag2'>
              <Text>{data.tag2}</Text>
          </View>
          <View className='tag3'>
              <Text>{data.tag3}</Text>
          </View>
          <View className='tag4'>
              <Text>{data.tag4}</Text>
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
        <View className='chooseBox'>
          <View className='search'>
          <MxInput
          leftSrc='../../../assets/svg/searchicon.svg'leftSize='20px' width='670rpx' height='72rpx' background='rgba(241,240,245,1)'
          radius='36rpx'
          > 
          </MxInput>
          </View>
        </View>
        {content}
      </View>
    )
  }
}
