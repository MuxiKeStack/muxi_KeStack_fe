import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class Course extends Component {

  constructor(props){
    super(props)
    this.state = {
      }
    }

  componentWillMount () { 
      this.props.course.times.map((item)=>{
              if(this.props.week==item.day){
                this.setState({
                  top:(item.start-1)*85+105
                })
              }
             }
          )
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render() {
    const { top , course, week} = this.props;
    const cardPosition={
      'top':`${
        // course.times.map((item)=>{
        //     if(week==item.day){
        //       return ((item.start-1)*85+105) ;
        //     }
        //    }
        // )
        this.state.top
      }rpx`
    }
    return (
      <View className='course' style={cardPosition}>
        <View className='content'>{this.props.children}</View>
      </View>
    );
  }
}
