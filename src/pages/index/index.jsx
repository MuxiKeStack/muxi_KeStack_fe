import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import MuxiInput from '../../components/common/input/MuxiInput'
import MxRate from '../../components/common/MxRate/MxRate'
import MuxiTag from '../../components/common/MuxiTag/index'
import MuxiFab from '../../components/common/MuxiFab/index'
import MuxibuttonN from '../../components/common/nomalButton/index'
import MuxibuttonI from '../../components/common/imgButton/index'
import Dogood from '../../picture/good.png'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      fabtext:'评课',
      tagList: [
        { name: '简单易学', active: false },
        { name: '老师温柔', active: false },
        { name: '干货满满', active: true },
        { name: '作业量少', active: true },
        { name: '生动有趣', active: true },
        { name: '云课堂资料全', active: true }
      ],
      value: 2,
      fabtext:'',
    }
  }
  onClick(data) {
    const { tagList } = this.state
    const findIndex = tagList.findIndex(item => item.name === data.name)
    const active = !tagList[findIndex].active

    tagList[findIndex].active = active
    this.setState({ tagList })

  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide () { }
  //a
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
          commont
          size='28'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <View className='tag'>
          {this.state.tagList.map((item, index) => 
          <View className='subitem' >
            <MuxiTag name={item.name} type='primary' active={item.active} circle onClick={this.onClick.bind(this)}>
               {item.name}
            </MuxiTag>
          </View>
          )}
        </View>
        <MuxiFab
          size='normal'
          onClick={this.onClick.bind(this)}
        > 
            {this.state.fabtext}
        </MuxiFab>
        <MuxibuttonI onClick={this.test.bind(this)}  src={Dogood} />
        <MuxibuttonN content='学号登录' onClick={this.test.bind(this)} ></MuxibuttonN>
      </View>
    )
  }
}
