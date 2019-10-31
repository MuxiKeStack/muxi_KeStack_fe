import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { List } from '../../components/page/List'
import { Item } from '../../components/page/List/Item'
import { MxInput} from '../../components/common/MxInput'
// import bgim from '../../assets/svg/bgim.svg'
import './index.scss'

// 色板
const PALETTE = ["#9154B8", "#F9D57F", "#D8D8D8", "#FD817E"];

export default class Index extends Component {
  constructor() {
    super(...arguments);
  }
  componentWillUnmount() { }
  config = {
    navigationBarTitleText: "首页"
  };

  componentDidMount() {
    // this.drawCircle([70, 10, 15, 5], "grade", "成绩");
    // this.drawCircle([10, 70, 20], "attendance", "考勤");
    // this.drawCircle([60, 5, 5, 30], "exam", "考核");
  }

  componentWillUnmount() {}

  componentDidHide() { }
  render() {
    
    return (
      <View>
      hello world
      </View>

    )
  }
}
