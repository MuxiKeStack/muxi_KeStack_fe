import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import MuxiInput from '../../components/common/input/MuxiInput'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { 
    this.setState({
      name:"hello"
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  //a
  render () {
    return (
      <View className='index'>
        <Text>{this.state.name}</Text>
        <MuxiInput
          type='text'
          placeholder='this is placeholder'
          pre='true'
          post='true'
          imgWidth='30px'
          imgHeight='30px'
          inputWidth='280px'
        />
      </View>
    )
  }
}
