#### 组件名：MxPicker

**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
selector|可选选项|-|-|string
selectorChecked|选中选项|array
width|选择框的宽度|232|-|string
onChange|选择改变时触发的事件|-|fn
className|

#### 示例代码

```js
// pages/index/index.jsx
import { MxPicker } from "../../components/common/picker";
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      selectorChecked: "选择国家"
    };
    this.selector = ["美国", "中国", "法国", "日本"];
  }
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange = e => {
    this.setState({
      selectorChecked: this.selector[e.detail.value]
    });
  };
  render() {
    return (
      <View className='index'>
        <MxPicker
          selectorChecked={this.state.selectorChecked}
          selector={this.selector}
          width='200'
          onChange={this.handleChange.bind(this)}
        />
      </View>
    );
  }
}
```
