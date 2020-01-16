import Taro, { Component } from '@tarojs/taro'
import { View ,Image} from '@tarojs/components'
import conflict from '../../assets/png/conflict.png'
import './index.scss'


var timecfli=new Array()
export default class Course extends Component {
  onClick = () => !this.props.editable && this.props.onClick()

  constructor(props){
    super(props)
    this.state = {
      colorArr: ['#FC807F','#FFCB7B','#94C8FA','#71D69D'],
      color:'',
      }
    }

  componentWillMount () { 
    const course=this.props.course
      this.props.course.times.map((item,i)=>{
              if(this.props.week==item.day){
                this.setState({
                  top:(item.start-1)*88+105
                })
                timecfli[i]=0
                this.props.COURSESData.map(e=>{
                  if(e.course_id!=course.course_id){
                      e.times.map(index=>{
                        if(index.start==item.start){
                          timecfli[i]=1
                        }console.log(index)
                        console.log(item)
                      })
                  }
                })
                
                // this.props.course.times.map((index,j)=>{
                //   if(j>i){
                //     if(index.start==item.start){
                //       timecfli[i]=1
                //     }
                //   }
                // })
               
                // for(var j=i;j++;j<=this.props.course.times.length){
                //   if(this.props.course.times[j].start==item.start){
                //     timecfli[i]=1
                //   }
                // }
                if(timecfli[i]==1){
                  this.setState({
                    imgPosition:(item.start-1)*88+97
                  })
                }
              }
            }
          )
          console.log(this.props.COURSESData)
          console.log(timecfli)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render() {
    var key;
    const { top , course, week} = this.props;
    const cardPosition={
      'top':`${this.state.top}rpx`,
      'background':`${
        this.state.colorArr[Math.floor(Math.random()*4)]
      }`
    }
    const imgPosition={
      'top':`${this.state.imgPosition}rpx`
    }
    return (
      <View>
        <View className='course'  style={cardPosition} onClick={this.props.onClick}>
          <View className='content'>{this.props.children}</View>
        </View>
        {
          timecfli.map(item=>{
            if(item==1) return<Image style={imgPosition} className='conImg' src={conflict}></Image>
          })
        }
      </View>
    );
  }
}
Course.defaultProps={
  onClick:()=>{},
}