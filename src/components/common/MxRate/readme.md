#### 组件名：MxRate
**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
value|当前评分|0|0-5|Number
readOnly|是否为只读状态| false | true & false | Bool
onChange|输入框值改变时触发的事件，开发者需要通过 onChange 事件来更新 value 值变化|||Function

### example:
```
import Taro from '@tarojs/taro'
import MxRate from '../../components/common/MxRate/MxRate'
export default class Index extends Taro.Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: 0
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
  render () {
    return (
      <MxRate
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        readOnly={false}
      />
    )
  }
}
```