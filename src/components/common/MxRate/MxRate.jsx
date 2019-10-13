import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './MxRate.scss'


class MxRate extends Component{

    handleClick () {
        this.props.onChange(...arguments)
    }
    render(){
        const{
            value,
            show,
            commont
        } = this.props

        const classNameArr = []
        for (let i = 0; i < 5; i++) {
            if (value > i) {
                classNameArr.push('on')
            } else {
                classNameArr.push('off')
            }
        }
        const width = (parseFloat(value) * 43).toString() + 'rpx'
        const starStyle={
             width: `${width}`,
        }
        // ☆☆☆☆☆
        // ★★★★★
        return(
            <View>
                {!commont && <View>
                    <View className='empty'>
                        <View className='full' style={starStyle}></View>
                    </View>
                    {show && <View>{value}分</View>}
                </View>}
                {commont && <View>
                    {
                      classNameArr.map((cls, i) => <View
                        className={cls}
                        key={i}
                        onClick={this.handleClick.bind(this, i + 1)} 
                      />)
                    }
                </View>
                }
            </View>
            
        )
    }
}

MxRate.defaultProps = {
    value: '0',
    show: false,
    commont: false,
    onChange: () => {}
}

export default MxRate;