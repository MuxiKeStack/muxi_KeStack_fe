import Taro, { Component } from '@tarojs/taro'
import { View, Text, Textarea } from '@tarojs/components'
import './index.scss'
import MxCard from '../../components/common/MxCard'
import MxRate from '../../components/common/MxRate/MxRate'
import MxIcon from '../../components/common/MxIcon'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
  }

  constructor() {
    super(...arguments);
    this.state = {
      courseChecked: "(只能评价自己上过的课程哦)",
      filterAChecked: "(考勤方式)",
      filterBChecked: "(考核方式)",
    };
    this.course = ["高等数学B1（张圆）", "经济学（池毛毛）"];
    this.filterA = ["经常点名", "偶尔点名", "手机签到"];
    this.filterB = ["闭卷考试", "开卷考试", "论文考核", "无考核"];
  }

  handleClick() {
  }

  handleChangeCourse = e => {
    this.setState({
      courseChecked: this.course[e.detail.value]
    });
  };
  handleChangeFilterA = e => {
    this.setState({
      filterAChecked: this.filterA[e.detail.value]
    });
  };
  handleChangeFilterB = e => {
    this.setState({
      filterBChecked: this.filterB[e.detail.value]
    });
  };

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const rate = 3
    return (
      <View style='display:block'>
        <View className='chooseBox'>
          <View>
            <MxIcon type='triangle' className='chooseTri' />
            <View className='chooseText'>选课清单</View>
          </View>
        </View>

        <View className='detailsBoxes'>

          <View className='detailsBox'>
            <MxCard className='detailsCard'>
              <View className='detailsLeft'>
                <View>线性代数B</View>
                <View style='display: block'>张俊</View>
              </View>
              <View className='detailsRight'>
                <View>
                  <MxRate
                    comment={false}
                    value={rate}>
                  </MxRate>
                  <View>评价人数：23</View>
                </View>
                <View className='detailsRightDown'>
                  <View style='display:block'>
                    <View className='detailsText'>偶尔点名</View>
                    <View className='detailsText'>期末闭卷</View>
                  </View>
                  <View style='display:block'>
                    <View className='detailsText'>生动有趣</View>
                    <View className='detailsText'>干货满满</View>
                  </View>
                </View>
              </View>
            </MxCard>
          </View>


          <View className='detailsBox'>
            <MxCard className='detailsCard'>
              <View className='detailsLeft'>
                <View>线性代数B</View>
                <View style='display: block'>张俊</View>
              </View>
              <View className='detailsRight'>
                <View>
                  <MxRate
                    comment={false}
                    value={rate}>
                  </MxRate>
                  <View>评价人数：23</View>
                </View>
                <View className='detailsRightDown'>
                  <View style='display:block'>
                    <View className='detailsText'>偶尔点名</View>
                    <View className='detailsText'>期末闭卷</View>
                  </View>
                  <View style='display:block'>
                    <View className='detailsText'>生动有趣</View>
                    <View className='detailsText'>干货满满</View>
                  </View>
                </View>
              </View>
            </MxCard>
          </View>

          <View className='detailsBox'>
            <MxCard className='detailsCard'>
              <View className='detailsLeft'>
                <View>线性代数B</View>
                <View style='display: block'>张俊</View>
              </View>
              <View className='detailsRight'>
                <View>
                  <MxRate
                    comment={false}
                    value={rate}>
                  </MxRate>
                  <View>评价人数：23</View>
                </View>
                <View className='detailsRightDown'>
                  <View style='display:block'>
                    <View className='detailsText'>偶尔点名</View>
                    <View className='detailsText'>期末闭卷</View>
                  </View>
                  <View style='display:block'>
                    <View className='detailsText'>生动有趣</View>
                    <View className='detailsText'>干货满满</View>
                  </View>
                </View>
              </View>
            </MxCard>
          </View>

          <View className='detailsBox'>
            <MxCard className='detailsCard'>
              <View className='detailsLeft'>
                <View>线性代数B</View>
                <View style='display: block'>张俊</View>
              </View>
              <View className='detailsRight'>
                <View>
                  <MxRate
                    comment={false}
                    value={rate}>
                  </MxRate>
                  <View>评价人数：23</View>
                </View>
                <View className='detailsRightDown'>
                  <View style='display:block'>
                    <View className='detailsText'>偶尔点名</View>
                    <View className='detailsText'>期末闭卷</View>
                  </View>
                  <View style='display:block'>
                    <View className='detailsText'>生动有趣</View>
                    <View className='detailsText'>干货满满</View>
                  </View>
                </View>
              </View>
            </MxCard>
          </View>

          <View className='detailsBox'>
            <MxCard className='detailsCard'>
              <View className='detailsLeft'>
                <View>线性代数B</View>
                <View style='display: block'>张俊</View>
              </View>
              <View className='detailsRight'>
                <View>
                  <MxRate
                    comment={false}
                    value={rate}>
                  </MxRate>
                  <View>评价人数：23</View>
                </View>
                <View className='detailsRightDown'>
                  <View style='display:block'>
                    <View className='detailsText'>偶尔点名</View>
                    <View className='detailsText'>期末闭卷</View>
                  </View>
                  <View style='display:block'>
                    <View className='detailsText'>生动有趣</View>
                    <View className='detailsText'>干货满满</View>
                  </View>
                </View>
              </View>
            </MxCard>
          </View>

          <View className='detailsBox'>
            <MxCard className='detailsCard'>
              <View className='detailsLeft'>
                <View>线性代数B</View>
                <View style='display: block'>张俊</View>
              </View>
              <View className='detailsRight'>
                <View>
                  <MxRate
                    comment={false}
                    value={rate}>
                  </MxRate>
                  <View>评价人数：23</View>
                </View>
                <View className='detailsRightDown'>
                  <View style='display:block'>
                    <View className='detailsText'>偶尔点名</View>
                    <View className='detailsText'>期末闭卷</View>
                  </View>
                  <View style='display:block'>
                    <View className='detailsText'>生动有趣</View>
                    <View className='detailsText'>干货满满</View>
                  </View>
                </View>
              </View>
            </MxCard>
          </View>
        </View>
      </View>
    )
  }
}
