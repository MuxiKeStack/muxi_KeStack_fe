import Taro, { Component } from '@tarojs/taro'
import { View, Image ,Form ,ScrollView,Button} from '@tarojs/components'
import MxButton from '../../components/common/MxButton' 
import MxPicker  from '../../components/common/MxPicker' 
import './index.scss'

export default class Index extends Component {
    constructor() {
        super(...arguments);
        this.state = {
          showMenu:true
        };
      }
    componentWillUnmount() { }
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
    
    componentDidMount() {}

    componentWillUnmount() { }

    componentDidHide() { }
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
                    <View className='courseList'>
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
                    </View>
                    
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
                    >
                        课
                    </MxButton>
                </View>
            </View>

        )
    }
}
