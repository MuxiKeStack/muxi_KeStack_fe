import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import MuxiInput from '../../components/common/input/MuxiInput'
import MxRate from '../../components/common/MxRate/MxRate'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: 2
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (value) {
    this.setState({
      value
    })
  }

  render () {
    return (
      <View className='index'>
        <Text>{this.state.name}</Text>
        <MuxiInput
          type='password'
          placeholder='this is placeholder'
          pre='true'
          post='true'
          imgWidth='30px'
          imgHeight='30px'
          inputWidth='280px'
        />
        <MxRate 
          commont={true} 
          size='28'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
      </View>
    )
  }
}
