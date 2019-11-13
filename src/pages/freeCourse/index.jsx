import Taro, { Component } from '@tarojs/taro'
import { View, Image ,Form ,ScrollView} from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
    constructor() {
        super(...arguments)
      }
    componentWillUnmount() { }
    config = {
        navigationBarTitleText: "自由排课"
    };
    onScrollToUpper(e){
        console.log(e.detail)
      }
      
      // or 使用箭头函数
      // onScrollToUpper = (e) => {
      //  console.log(e.detail)
      // }
      
      onScroll(e){
        console.log(e.detail)
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
                 {/* <table>
                <Tr>
                    <Th width="76"> </Th>
                    <Th width="86" height="50"> </Th>
                    <Th width="100">周一</Th>
                    <Th width="100">周二</Th>
                    <th width="100">周三</th>
                    <th width="100">周四</th>
                    <th width="100">周五</th>
                    <th width="100">周六</th>
                    <th width="108">周日</th>
                </Tr>
                <tr>
                    <td rowspan="4">上午</td>
                    <td>1</td>
                    <td rowspan="2">课程1</td>
                    <td rowspan="2">课程2</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程3</td>
                    <td rowspan="2">课程4</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2"> </td>
                </tr>
                <tr>
                    <td>2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td rowspan="2">课程5</td>
                    <td rowspan="2">课程6</td>
                    <td rowspan="2">课程7</td>
                    <td rowspan="2">课程8</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程9</td>
                    <td rowspan="2"> </td>
                    </tr>
                <tr>
                    <td>4</td>
                </tr>
                <tr>
                    <td colspan="9" align="center"><b>午休</b></td>
                </tr>
                <tr>
                    <td rowspan="4">下午</td>
                    <td>5</td>
                    <td rowspan="2">课程10</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程11</td>
                    <td rowspan="2">课程12</td>
                    <td rowspan="2">课程13</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2"> </td>
                </tr>
                <tr>
                    <td>6</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程14</td>
                    <td rowspan="2">课程15</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程16</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2"> </td>
                </tr>
                <tr>
                    <td>8</td>
                </tr>
            </table> */}
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
                        <View className='ListDe'>课表一</View>
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
                                <View className="courseF">2121</View>
                                <View className="courseF">1212</View>
                                <View className="courseF">5555</View>
                                <View className="courseF">555</View>
                                <View className="courseF">6666</View>
                                <View className="courseF">7777</View>
                        </View>
                        <View className='middle'>
                                <View className='week'>二</View>
                                <View className="courseF">2121</View>
                                <View className="courseF">1212</View>
                                <View className="courseF">5555</View>
                                <View className="courseF">555</View>
                                <View className="courseF">6666</View>
                                <View className="courseF">7777</View>
                        </View>
                        <View className='middle'>
                                <View className='week'>三</View>
                                <View className="courseF">2121</View>
                                <View className="courseF">1212</View>
                                <View className="courseF">5555</View>
                                <View className="courseF">555</View>
                                <View className="courseF">6666</View>
                                <View className="courseF">7777</View>
                        </View>
                        <View className='middle'>
                                <View className='week'>四</View>
                                <View className="courseF">2121</View>
                                <View className="courseF">1212</View>
                                <View className="courseF">5555</View>
                                <View className="courseF">555</View>
                                <View className="courseF">6666</View>
                                <View className="courseF">7777</View>
                        </View>
                        <View className='middle'>
                                <View className='week'>五</View>
                                <View className="courseF">2121</View>
                                <View className="courseF">1212</View>
                                <View className="courseF">5555</View>
                                <View className="courseF">555</View>
                                <View className="courseF">6666</View>
                                <View className="courseF">7777</View>
                        </View>
                        <View className='middle'>
                                <View className='week'>六</View>
                                <View className="courseF">2121</View>
                                <View className="courseF">1212</View>
                                <View className="courseF">5555</View>
                                <View className="courseF">555</View>
                                <View className="courseF">6666</View>
                                <View className="courseF">7777</View>
                        </View>
                        <View className='middle'>
                                <View className='week'>七</View>
                                <View className="courseF">2121</View>
                                <View className="courseF">1212</View>
                                <View className="courseF">5555</View>
                                <View className="courseF">555</View>
                                <View className="courseF">6666</View>
                                <View className="courseF">7777</View>
                        </View>
                    </View>
                </ScrollView>
               
            </View>

        )
    }
}
