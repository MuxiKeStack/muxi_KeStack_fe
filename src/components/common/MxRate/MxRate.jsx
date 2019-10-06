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
            score,
            size,
            show,
            commont
        } = this.props

        const starIconStyle = {
            fontSize: size ? `${size}px` : '',
        }

        const classNameArr = []
        for (let i = 0; i < 5; i++) {
            if (value > i) {
                classNameArr.push('on')
            } else {
                classNameArr.push('off')
            }
        }

        return(
            <View style={starIconStyle}>
                {!commont && <View>
                    <View className='empty'>☆☆☆☆☆
                        <View className='full'>★★★★★</View>
                    </View>
                    {show && <View>{score}分</View>}
                </View>}
                {/* {commont && <View>
                        <View>☆</View>
                        <View>☆</View>
                        <View>☆</View>
                        <View>☆</View>
                        <View>☆</View>
                </View>} */}
                {commont && <View>
                    {
                        classNameArr.map((cls, i) => <View
                        className={cls}
                        key={i}
                        onClick={this.handleClick.bind(this, i + 1)}
                    >
                    ☆
                    </View>)
                    }
                </View>
                }
            </View>
            
        )
    }
}

MxRate.defaultProps = {
    value: '0',
    size: '',
    show: false,
    commont: false,
    onChange: () => {}
}

export default MxRate;