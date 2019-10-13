import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import MxInput from '../../components/common/MxInput/MxInput'
import MxRate from '../../components/common/MxRate/MxRate'
import Ring from '../../components/page/Ring/Ring'

export default class Index extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: 2.5,
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }
  config = {
    navigationBarTitleText: '首页'
  }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (value) {
    this.setState({
      value,
    })
  }

  render () {
    return (
      <View className='index'>
        <Text>{this.state.name}</Text>
        <MxInput
          placeholder='this is placeholder'
          background='#F1F0F5'
          radius='52px'
        />
        {/* <MxRate 
          commont={true}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        /> */}
        {/* <MxRate 
          show={true}
          value={this.state.value2}
        /> */}
        <MxRate
          value={this.state.value}
        />
        <Ring />
      </View>
    )
  }
}
