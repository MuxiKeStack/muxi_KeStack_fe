import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import MxInput from '../../components/common/MxInput/MxInput'
import MxRate from '../../components/common/MxRate/MxRate'
import Ring from '../../components/page/Ring/Ring'
import MxButton from '../../components/common/MxButton'
import  MxCard  from "../../components/common/MxCard";
import pic from '../../assets/png/good.png'

export default class Index extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      value: 0,
    }
  }
  onClick(data) {
    const { tagList } = this.state
    const findIndex = tagList.findIndex(item => item.name === data.name)
    const active = !tagList[findIndex].active

    tagList[findIndex].active = active
    this.setState({ tagList })

  }

  componentWillUnmount() { }
  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount() { }

  componentWillUnmount() { }

  handleChange(value) {
    this.setState({
      value,
    })
  }

  componentDidHide() { }

  test(){
    console.log("lalalla")
  }
  //a

  ChangeTo() {
    Taro.navigateTo({
      url: '/pages/list/index'
    })
  }
  ChangeToo() {
    Taro.navigateTo({
      url: '/pages/postReview/index'
    })
  }
  
  render() {
    return (
      <View className='index'>
        <Text>{this.state.name}</Text>
        <MxInput
          placeholder='this is placeholder'
          background='#F1F0F5'
          radius='52px'
        />
        <MxRate 
          readOnly={false}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <MxCard>这里装的是卡片内容</MxCard>
        <Ring
          type='成绩'
          percent1='13'
          percent2='76'
          percent3='11'
          name1='经常点名'
          name2='偶尔点名'
          name3='从不点名'
        />
        <View>
          <Ring 
            className='ring'
            type='成绩'
            name1='70以下'
            name2='70~85'
            name3='85以上'
            percent1='11'
            percent2='12'
            percent3='40'
          />
        </View>
        
        <MxButton  onClick={this.test.bind()}>lalala</MxButton>
        <MxButton src={pic} onClick={this.test.bind()}></MxButton>
        
        <View className='index'>
        <MxCard radius='25' className='Mxcard'>
        <MxButton src={pic} buttonWidthl='513rpx' buttonHeightl='92rpx' onClick={this.ChangeTo}></MxButton>
        <Text style="display:inline">选课清单</Text>
        </MxCard>
        <MxCard radius='25' className='Mxcard'>
        <MxButton src={pic} buttonWidthl='513rpx' buttonHeightl='92rpx' onClick={this.ChangeToo}></MxButton>
        <Text style="display:inline">发布评课</Text>
        </MxCard>
      </View>
      </View>
    )
  }
}
