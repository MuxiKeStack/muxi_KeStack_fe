import Taro, { Component } from '@tarojs/taro'
import { View, Image ,Form ,ScrollView,Button,  Swiper, SwiperItem,Checkbox,CheckboxGroup,Label} from '@tarojs/components'
import MxButton from '../../components/common/MxButton' 
import HeaderTab from '../../components/headerTab/header-tab'
import FloatLayout from '../../components/layout'
import MxModal from '../../components/common/MxModal'
import MxCard from '../../components/common/MxCard'
import AtAccordion from '../../components/common/MxAccordion'
import './index.scss'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
          showMenu:true,
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
        };
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
    
    getIndex(index){
        this.setState({
          index:index
        })
        if(index===2){
          this.getOrderCarList(1);
        }else if(index !== 1){
          index = index - 1;
          this.getOrderBuyList(index,1);
      }else{
        this.getOrderBuyList(1,1);
      }
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
                   
                    {/* <View className='courseList'>
                        <Button className='List_one'>
                            <Text>课表一</Text>
                        </Button>
                        <View hidden={this.state.showMenu} className='menu'>
                            <Button className='menuButton'>重命名</Button>
                            <Button className='menuButton'>创建副本</Button>
                            <Button className='menuButton'>删除课表</Button>
                        </View>
                        <Button className='List_two' onClick={this.CshowMenu}>
                            <Text>课表二</Text>
                        </Button>
                    </View> */}
                    
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
                                    <Text className='grayN'>8:00</Text>
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
                                    <Text className='grayN'>8:00</Text>
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
                                    <Text className='grayN'>8:00</Text>
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
                                    <Text className='grayN'>8:00</Text>
                                </View>
                            </View><View className="timeS">
                                <View className='number'>
                                    <Text>10</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View>
                                    <Text className='number'>11</Text>
                                    <Text className='grayN'>8:00</Text>
                                </View>
                            </View>
                            <View className="timeS">
                                <View className='number'>
                                    <Text>12</Text>
                                </View>
                            </View>
                        </View>
                        <View className='middle'>
                                <View className='week'>一</View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                        </View>
                        <View className='middle'>
                                <View className='week'>二</View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                        </View>
                        <View className='middle'>
                                <View className='week'>三</View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                        </View>
                        <View className='middle'>
                                <View className='week'>四</View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                        </View>
                        <View className='middle'>
                                <View className='week'>五</View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                        </View>
                        <View className='middle'>
                                <View className='week'>六</View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                        </View>
                        <View className='middle'>
                                <View className='week'>七</View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                                <View className="courseF"></View>
                        </View>
                    </View>
                </ScrollView>
                <View className='collect'>
                    <MxButton buttonRadius='50%'
                                buttonWidth='120rpx'
                                buttonHeight='120rpx'
                                buttonBackground='#6E66EE'  
                                onClick={this.showList.bind(this)}      
                    >
                        课
                    </MxButton>
                </View>
                <FloatLayout isOpened={this.state.showList} title='课程清单' >
                    <MxCard className="muxi-card">这里装的是卡片内容</MxCard>
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