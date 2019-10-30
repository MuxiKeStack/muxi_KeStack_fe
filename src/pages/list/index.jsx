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
      datas: [
        {
          courseName: '线性代数B',
          name: '张俊',
          starRate: 4,
          numOfCommenters: 23,
          tag1: '偶尔点名' ,
          tag2: '期末闭卷' ,
          tag3: '生动有趣' ,
          tag4: '干货满满' 
        },
        {
          courseName: '也许是马基',
          name: 'xxx',
          starRate: 3,
          numOfCommenters: 59,
          tag1: '经常点名' ,
          tag2: '期末开卷' ,
          tag3: '简单易学' ,
          tag4: '云课堂资料全' 
          
        },
        {
          courseName: '不知是啥课',
          name: 'xxx',
          starRate: 2,
          numOfCommenters: 11,
          tag1: '偶尔点名' ,
          tag2: '论文考核' ,
          tag3: '生动有趣' ,
          tag4: '干货满满' 
        },
        {
          courseName: '神仙课程',
          name: 'xxxxx',
          starRate: 5,
          numOfCommenters: 47,
          tag1: '很少点名' ,
          tag2: '没有考核' ,
          tag3: '生动有趣' ,
          tag4: '作业量少' 
          
        },
      ]
    };
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
    const temp=<View>你好</View>
    const content = (
    <View className='detailsBoxes'>
      {
      this.state.datas.map((data) => {
        return(
          <View className='detailsBox'>
        <MxCard className='detailsCard'>
          <View className='detailsLeft'>
            <View>{data.courseName}</View>
            <View style='display: block'>{data.name}</View>
          </View>
          <View className='detailsRight'>
            <View>
              <MxRate
                comment={false}
                value={rate}>
              </MxRate>
              <View>评价人数：{data.numOfCommenters}</View>
            </View>
            <View className='detailsRightDown'>
              <View style='display:block'>
                <View className='detailsText'>{data.tag1}</View>
                <View className='detailsText'>{data.tag2}</View>
              </View>
              <View style='display:block'>
                <View className='detailsText'>{data.tag3}</View>
                <View className='detailsText'>{data.tag4}</View>
              </View>
            </View>
          </View>
        </MxCard>
      </View>
        )
      })
      }
      </View>
    )
      
    return (
      <View style='display:block'>
        <View className='chooseBox'>
          <View>
            <MxIcon type='triangle' className='chooseTri' />
            <View className='chooseText'>选课清单</View>
          </View>
        </View>
        
        <View className='detailsBoxes'>
        {/* {temp} */}
          {content}
          {/* <View>你好</View> */}
        </View>
      </View>
    )
  }
}

{/* <View className='detailsBox'>
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
          </View> */}





{/* 
this.state.datas.map((data) =>{
      this.render(
        <View className='detailsBox'>
        <MxCard className='detailsCard'>
          <View className='detailsLeft'>
            <View>{data.courseName}</View>
            <View style='display: block'>{data.name}</View>
          </View>
          <View className='detailsRight'>
            <View>
              <MxRate
                comment={false}
                value={rate}>
              </MxRate>
              <View>评价人数：{data.numOfCommenters}</View>
            </View>
            <View className='detailsRightDown'>
              <View style='display:block'>
                <View className='detailsText'>{data.tags.tag1}</View>
                <View className='detailsText'>{data.tags.tag2}</View>
              </View>
              <View style='display:block'>
                <View className='detailsText'>{data.tags.tag3}</View>
                <View className='detailsText'>{data.tags.tag4}</View>
              </View>
            </View>
          </View>
        </MxCard>
      </View>
      )
    } */}