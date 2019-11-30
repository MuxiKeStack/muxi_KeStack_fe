import Taro, { Component } from '@tarojs/taro'
import { View, Image ,Form ,ScrollView,Button,  Swiper, SwiperItem,Checkbox,CheckboxGroup,Label} from '@tarojs/components'
import MxButton from '../../components/common/MxButton' 
import HeaderTab from '../../components/headerTab/header-tab'
import FloatLayout from '../../components/layout'
import MxModal from '../../components/common/MxModal'
import Course from '../../components/course'
import './index.scss'

var COURSESData = new Array();

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
          showMenu:true,
          WEEKS:[1,2,3,4,5,6,7],
          COURSES:[1,2,3,4,5,6],
          showList:false,
          index: 1,
          open: false,
          list: [
            {
              value: '周二9-10节@9401',
              text: '周二9-10节@9401',
              checked: false
            },
            {
              value: '周二9-10节@9401',
              text: '周二9-10节@9401',
              checked: true
            },
            {
              value: '周二9-10节@9401',
              text: '周二9-10节@9401',
              checked: false
            }
          ],
          classlist:[
              {
                  class_id:1,
                  class_name:'啦啦啦啦啦啦啦啦绿绿绿',
                  times:[
                      {
                          day:1,
                          duration:2,
                          start:1,
                          week_state:1,
                          weeks:1
                      }
                  ]
              },
              {
                class_id:2,
                class_name:'啦啦啦啦啦啦啦啦绿绿绿',
                times:[
                    {
                        day:1,
                        duration:2,
                        start:3,
                        week_state:1,
                        weeks:1
                    },
                    {
                        day:2,
                        duration:2,
                        start:3,
                        week_state:1,
                        weeks:1
                    }
                ]
            },
            {
                class_id:3,
                class_name:'啦啦啦啦啦啦啦啦绿绿绿',
                times:[
                    {
                        day:1,
                        duration:2,
                        start:5,
                        week_state:1,
                        weeks:1
                    }
                ]
            }
          ],
          COURSESData:[],
        }
      }

    componentWillMount(){
        // fetch(
        //     'api/v1/table/',
        //     {
        //     },
        //     'GET'
        // ).then(data=>{
        //     if(data){
        //         this.setState({
        //             COURSESData:data.table_list
        //         })
        //     }
        // })
        for(var i=0;i<7;i++){       
            COURSESData[i] = new Array();
        }
    const list =this.state.classlist;
    list.map((item)=>{
        item.times.map((key)=>{
                if(key.day===1){
                    COURSESData[0].push(item);
                }
                if(key.day===2){
                    COURSESData[1].push(item);
                }
                if(key.day===3){
                    COURSESData[2].push(item);
                }
                if(key.day===4){
                    COURSESData[3].push(item);
                }
                if(key.day===5){
                    COURSESData[4].push(item);
                }
                if(key.day===6){
                    COURSESData[5].push(item);
                }
                if(key.day===7){
                    COURSESData[6].push(item);
                }
        })
    })
    this.setState({
        COURSESData:COURSESData
    })
    console.log(COURSESData)
    }


    config = {
        navigationBarTitleText: "自由排课"
    };
    onScrollToUpper(e){
        console.log(e.detail)
      }
       
    onScroll(e){
        console.log(e.detail)
      }  
    
    CshowMenu(){
          if(this.state.showMenu==true){
            this.setState({
                showMenu:false
            })
        }
        if(this.state.showMenu==false){
            this.setState({
                showMenu:true
            })
        }
      }
    divideDay(){
        
        //     for(var i=0;i<7;i++){       
        //         COURSESData[i] = new Array();
        //     }
        // const list =this.state.classlist;
        // list.map((item)=>{
        //     item.times.map((key)=>{
        //             if(key.day===1){
        //                 COURSESData[0].push(item);
        //             }
        //             if(key.day===2){
        //                 COURSESData[1].push(item);
        //             }
        //             if(key.day===3){
        //                 COURSESData[2].push(item);
        //             }
        //             if(key.day===4){
        //                 COURSESData[3].push(item);
        //             }
        //             if(key.day===5){
        //                 COURSESData[4].push(item);
        //             }
        //             if(key.day===6){
        //                 COURSESData[5].push(item);
        //             }
        //             if(key.day===7){
        //                 COURSESData[6].push(item);
        //             }
        //     })
        // })
        // this.setState({
        //     COURSESData:COURSESData
        // })
        // console.log(COURSESData)
        
    }

    getIndex(index){
        this.setState({
          index:index
        })
    }

    showList(){
        console.log("kk");
        if(this.state.showList==true){
            this.setState({
                showList:false
            })
        }
        if(this.state.showList==false){
            this.setState({
                showList:true
            })
        }
    }

    handleClick (value) {
        this.setState({
          open: value
        })
      }

    render() {
        const {WEEKS,COURSES,COURSESData}=this.state;
        const scrollStyle = {
            height: '100%',
            width:'100%'
          }
          const scrollLeft = 0
          const scrollTop = 0
          const Threshold = 20
        return (
            <View>
                <HeaderTab navList={[{key:1,content:'课表一'},{key:2,content:'课表二'}]} onGetIndex={this.getIndex.bind(this)} /> 
                <ScrollView
                    className='scrollview'
                    scrollY
                    scrollX
                    scrollWithAnimation
                    scrollTop={scrollTop}
                    scrollLeft={scrollLeft}
                    style={scrollStyle}
                    lowerThreshold={Threshold}
                    upperThreshold={Threshold}
                    onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
                    onScroll={this.onScroll}
                >
                    <View className='course'>
                        <View className='left'>
                            <View className="timeS">\</View>
                            <View className="timeS">
                                <View>
                                    <Text className='number'>1</Text>
                                    <Text className='grayN'>8:00</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View className='number'>
                                    <Text>2</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View>
                                    <Text className='number'>3</Text>
                                    <Text className='grayN'>10:10</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View className='number'>
                                    <Text>4</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View>
                                    <Text className='number'>5</Text>
                                    <Text className='grayN'>14:00</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View className='number'>
                                    <Text>6</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View>
                                    <Text className='number'>7</Text>
                                    <Text className='grayN'>16:10</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View className='number'>
                                    <Text>8</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View>
                                    <Text className='number'>9</Text>
                                    <Text className='grayN'>18:30</Text>
                                </View>
                            </View><View className="timeS">
                                <View className='number'>
                                    <Text>10</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View>
                                    <Text className='number'>11</Text>
                                    <Text className='grayN'>20:15</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View className='number'>
                                    <Text>12</Text>
                                </View>
                            </View>
                        </View>
                        {WEEKS.map((week)=>{
                            return   <View className='middle'>
                                <View className='week'>{WEEKS[week-1]}</View>
                                {COURSES.map(()=>
                                    <View className="courseF"></View>
                                )}
                                {COURSESData[week-1].map((course)=>
                                    // console.log(course)
                                   <Course className="muxi-card" course={course} week={week}>{course.class_name}</Course> 
                                )
                                }
                                </View>
                        })}
                    </View>
                </ScrollView>
                <View className='collect'>
                    <MxButton buttonRadius='50%'
                                buttonWidth='120rpx'
                                buttonHeight='120rpx'
                                buttonBackground='#6E66EE'  
                                // onClick={this.showList.bind(this)}
                                onClick={this.divideDay.bind(this)}      
                    >
                        课
                    </MxButton>
                </View>
                <FloatLayout isOpened={this.state.showList} title='课程清单' >
                    <MxCard className="muxicard">这里装的是卡片内容</MxCard>
                </FloatLayout>
                {/* <MxModal isOpened={this.state.showList} title='创业项目的选择与执行'>
                    <CheckboxGroup>
                        {this.state.list.map((item, i) => {
                            return (
                            <Label className='checkbox-list__label' for={i} key={i}>
                                <Checkbox className='checkbox-list__checkbox' value={item.value} checked={item.checked}>{item.text}</Checkbox>
                            </Label>
                            )
                        })}
                    </CheckboxGroup>
                </MxModal> */}
            </View>
        )
    }
}

// Accordion 手风琴
// SegmentedControl 分段器