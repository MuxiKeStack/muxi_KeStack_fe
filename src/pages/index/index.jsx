import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import MxInput from '../../components/common/MxInput/MxInput'
import MxRate from '../../components/common/MxRate/MxRate'
import Ring from '../../components/page/Ring/Ring'
import MuxibuttonN from '../../components/common/nomalButton'
import MuxibuttonI from '../../components/common/imgButton'
import { MxCard } from "../../components/common/card";
import pic from '../../assets/png/good.png'

export default class Index extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      value: 2.5,
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
  //a
  render() {
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

        <MxCard>这里装的是卡片内容</MxCard>；
        <MxRate
          value={this.state.value}
        />
        <Ring
          type='成绩'
          percent1='13'
          percent2='76'
          percent3='11'
          name1='经常点名'
          name2='偶尔点名'
          name3='从不点名'
        />
        <MuxibuttonN />
        <MuxibuttonI src={pic}></MuxibuttonI>
      </View>
    )
  }
}
