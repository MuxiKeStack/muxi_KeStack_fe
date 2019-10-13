import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './Ring.scss'

function whetherSee (value){
    const see = [false, false, false];
    switch(Math.trunc(value / 90)){
        case 1: 
            see[0] = true
            break
        case 2: 
            see[0] = true
            see[1] = true
            break
        case 3: 
            see[0] = true
            see[1] = true
            see[2] = true
            break    
    }
    return see
}

class Ring extends Component{

    render(){
        const{
            type,
            percent1,
            percent2,
            percent3,
            name1,
            name2,
            name3
        } = this.props

        const value1 = parseInt(percent1) * 3.6
        const value2 = parseInt(percent2) * 3.6
        const sector1 = whetherSee(value1)
        const sector2 = whetherSee(value2)

        const css ={
            sectorA1:{
                transform: [`rotate(0deg)`]
            },
            sectorA2:{
                transform: [`rotate(90deg)`]
            },
            sectorA3:{
                transform: [`rotate(180deg)`]
            },
            sectorA:{
                transform: [`rotate(${String(Math.trunc(value1 / 90) * 90) + 'deg'}) skewY(${String(value1 % 90 - 90) + 'deg'})`]
            },
            sectorB1:{
                transform: [`rotate(${(value1 + 5) + 'deg'})`]
            },
            sectorB2:{
                transform: [`rotate(${String(value1 + 95) + 'deg'})`]
            },
            sectorB3:{
                transform: [`rotate(${String(value1 + 185) + 'deg'})`]
            },
            sectorB:{
                transform: [`rotate(${String(value1 + 5 + (Math.trunc(value2 / 90) * 90)) + 'deg'}) skewY(${String(value2 % 90 - 90) + 'deg'})`]
            }
        }
        return(
            <View className='box'>
                <View className='ring'>
                    {sector1[0] && <View className='sector1' style={css.sectorA1}></View>}
                    {sector1[1] && <View className='sector1' style={css.sectorA2}></View>}
                    {sector1[2] && <View className='sector1' style={css.sectorA3}></View>}
                    <View className='sector1' style={css.sectorA}></View>
                    {sector2[0] && <View className='sector2' style={css.sectorB1}></View>}
                    {sector2[1] && <View className='sector2' style={css.sectorB2}></View>}
                    {sector2[2] && <View className='sector2' style={css.sectorB3}></View>}
                    <View className='sector2' style={css.sectorB}></View>
                    <View className='border'></View>
                    <View className='type'>{type}</View>
                </View>
                <View className='levels'>
                    <View>
                        <View className='circle1'></View>
                        <View className='level'>{name1}:{percent1}%</View>
                    </View>
                    <View>
                        <View className='circle2'></View>
                        <View className='level'>{name2}:{percent2}%</View>
                    </View>
                    <View>
                        <View className='circle3'></View>
                        <View className='level'>{name3}:{percent3}%</View>
                    </View>
                </View>
            </View> 
        )
    }
}

Ring.defaultProps = {
    type: '成绩',
    percent1: '45',
    percent2: '20',
    percent3: '35',
    name1: '经常点名',
    name2: '偶尔点名',
    name3: '从不点名'
}

export default Ring;