import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import MxTag from '../../components/common/MxTag/index'
import MxFab from '../../components/common/MxFab/index'
import MxInput from '../../components/common/MxInput/MxInput'
import MxButton from '../../components/common/MxButton/index'



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
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Image className='head'></Image>
        <MxInput
          placeholder='学号/昵称'
          border='true'
        ></MxInput>
        <MxInput
          placeholder='密码'
          border='true'
        ></MxInput>
        <MxButton
          buttomWidth='513rpx'
          buttomHeight='92rpx'
          buttonBackground='#6868F8'
          border-radius='46rpx'
        >学号登录</MxButton>
        <MxButton
           buttomWidth=''
           buttomHeight=''
           buttonBackground=''
           border-radius=''
        ><Text className='visit'>游客登录</Text></MxButton>
        <MxButton
           buttomWidth=''
           buttomHeight=''
           buttonBackground=''
           border-radius=''
        ><Text className='secret'>隐私条例</Text></MxButton>
        
      </View>
    )
  }
}
