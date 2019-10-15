import Taro, {Component} from '@tarojs/taro'
import {Button, View, Text} from '@tarojs/components'
import './index.scss'

class MuxibuttonN extends Component{
    onClick = () => !this.props.editable && this.props.onClick()


    render(){
        const{
            content,
            buttonWidth,
            buttonHeight,
            buttonRadius,
            buttonBackground,
            
        } = this.props

        const buttonStyle={
            display: 'inline-block',
            width: `${buttonWidth}`,
            height: `${buttonHeight}`,
            background:`${buttonBackground}`,
            'border-radius':`${buttonRadius}`,
            'line-height':`${buttonHeight}`
        }

        return(
            <View>
                <Button 
                  style={buttonStyle}
                  onClick={this.onClick}
                >
                    <Text className='muxiText'>{content}</Text>
                </Button>
            </View>
        )
    }
}

MuxibuttonN.defaultProps = {
    buttonWidth: '513rpx',
    buttonHeight: '92rpx',
    buttonRadius:'46rpx',
    buttonBackground:'#9255B9',
    content:'',
    className: '',
    onClick:()=>{},
}

export default MuxibuttonN;