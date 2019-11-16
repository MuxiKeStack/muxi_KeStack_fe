import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import MxInput from '../../components/common/MxInput/MxInput'
import MxButton from '../../components/common/MxButton/index'
import image from '../../assets/png/navigation.png'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '木犀课栈'
  }
  constructor(){
    super(...arguments)
    this.state = {
      value: 2.5,
    }
  }

  ChangeTo(){
    Taro.switchTab({
      url:"/pages/commentSquare/index"
    });
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const ImageUrl=image;
    return (
      <View className='index'>
        <Image className='head' src={ImageUrl}></Image>
      
        <MxInput
          placeholder='学号/昵称'
          border='true'
        ></MxInput>
        <MxInput
          placeholder='密码'
          border='true'
        ></MxInput>
      <View className='login'>
        <MxButton
          buttomWidth='513rpx'
          buttomHeight='92rpx'
          buttonBackground='#6868F8'
          border-radius='46rpx'
          onClick={this.ChangeTo.bind(this)}
        >学号登录</MxButton>
      </View>
      
      <View
         className='visit'
      ><Text className='visitor'>游客登录</Text></View>
        <View
          className='privacy'
        ><Text className='secret'>隐私条例</Text></View>
        
      </View>
    )
  }
}
