import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import MuxiInput from '../../components/common/input/MuxiInput'
import MxRate from '../../components/common/MxRate/MxRate'
import MuxiTag from '../../components/common/MuxiTag/index'
import MuxiFab from '../../components/common/MuxiFab/index'

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
      value: 2
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

<<<<<<< HEAD
  componentDidHide () { }
  //a
  render () {
=======
  componentDidHide() { }

  handleChange(value) {
    this.setState({
      value
    })
  }

  render() {
>>>>>>> 3dbd9fa34ffe060432c6e273ec42084ba8231db4
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
          onClick={this.onClick.bind(this)}>
            {fabtext}
        </MuxiFab>
      </View>
    )
  }
}
