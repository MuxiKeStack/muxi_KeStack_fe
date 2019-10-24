import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import './courseDetails.scss'
import MxRate from '../../components/common/MxRate/MxRate'
import Ring from '../../components/page/Ring/Ring'

export default class Coursedetails extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      courseName:'线性代数',
      teacherName:'张俊',
      courseCategory:'专业必修课',
      courseCredit:'2',
      rate:'4',
      starNumber:'23',
      attendance1:'37',
      attendance2:'63',
      attendance3:'0',
      inspection1:'99',
      inspection2:'1',
      inspection3:'0',
      inspection4:'0',
      courseTime1:'',
      courseTime2:'',
      courseTime3:'',
      coursePlace1:'',
      coursePlace2:'',
      coursePlace3:'',
      courseGrade70:'11',
      courseGrade7085:'76',
      courseGrade85:'13',
      courseGradeNumber:'89',
      totalGrade:'78.69',
      ordinaryGrade:'94.04'
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const{
      courseCategory,
      courseCredit,
      rate,
      starNumber,
      attendance1,
      attendance2,
      attendance3,
      inspection1,
      inspection2,
      inspection3,
      inspection4,
      courseTime1,
      courseTime2,
      courseTime3,
      coursePlace1,
      coursePlace2,
      coursePlace3,
      courseGrade70,
      courseGrade7085,
      courseGrade85,
      courseGradeNumber
    } = this.state
    return (
      <View className='courseDetails'>
        <View className='greybody'>  
          <View className='commentBox'>
            <View className='name'>综合评分：</View>
            <MxRate
              commont={false}
              value={rate}
            />
            <View className='commentNumber'>(共{starNumber}人评价)</View>
          </View>
          <View className='creditBox'>
            <View className='name'>基本信息：</View>
            <View className='courseCredit'>{courseCategory} {courseCredit}学分</View>
          </View>
          <View className='lookCourseBox'>
            <View className='name'>基本信息：</View>
            <View className='chooseCourse'>查看当前所有可选课堂</View>
          </View>
          <View className='ring'>
            <View className='ring1'>
              <Ring
                type='成绩'
                name1='70以下'
                name2='70~85'
                name3='85以上'
                percent1={courseGrade70}
                percent2={courseGrade7085}
                percent3={courseGrade85} 
              />
            </View>
            <View className='ring2'>
              <Ring
                type='考勤'
                name1='经常点名'
                name2='偶尔点名'
                name3='签到点名'
                percent1={attendance1}
                percent2={attendance2}
                percent3={attendance3} 
              />
            </View>
            <View className='ring3'>
              <Ring
                type='考核'
                name1='闭卷考试'
                name2='开卷考试'
                name3='论文考试'
                name4='无考试'
                percent1={inspection1}
                percent2={inspection2}
                percent3={inspection3}
                percent4={inspection4}
              />
            </View>
          </View>
        </View>
        <View className='sampleSize'>(成绩样本量：{courseGradeNumber})</View>
        <View className='averageBox'>
          <View className='averageSmallBox1'>
            <View className='averageName'>总平均分</View>
            <View className='averageGrade'>{this.state.totalGrade}</View>
          </View>
          <View className='averageSmallBox2'>
            <View className='averageName'>平时均分</View>
            <View className='averageGrade'>{this.state.ordinaryGrade}</View>
          </View>
        </View>
        <View className='feature'>课堂特点：</View> 
        <View className='tagBox'></View>
      </View>
    )
  }
}
