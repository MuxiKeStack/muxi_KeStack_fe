import Taro, { Component } from '@tarojs/taro'
import { View, Text , Image} from '@tarojs/components'
import './index.scss'
import MxInput from '../../components/common/MxInput/MxInput'
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
        <MxInput
          placeholder='this is placeholder'
          background='#F1F0F5'
          border={true}
          radius='52px'
        />
        <MxRate 
          commont={true} 
          size='28'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <Image 
          style='width: 30px; height: 30px'
          src='../../assets/png/starFill.png'
        />
      </View>
    )
  }
}
