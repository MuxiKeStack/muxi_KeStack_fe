import Taro, {Component} from '@tarojs/taro'
import {Button, View, Text , Image} from '@tarojs/components'
import './index.scss'

export default class MxButton extends Component{
    onClick = () => !this.props.editable && this.props.onClick()


    render(){
        const{
            buttonWidth,
            buttonHeight,
            buttonWidthI,
            buttonHeightI,
            buttonRadius,
            buttonBackground,
            imageWidth,
            imageHeight,
            padding,
            src
        } = this.props

        const buttonStyle={
            display: 'inline-block',
            width: `${buttonWidth}`,
            height: `${buttonHeight}`,
            background:`${buttonBackground}`,
            'border-radius':`${buttonRadius}`,
            'line-height':`${buttonHeight}`,
            'opacity':2,
        }
        const buttonStyleI={
            display: 'inline-block',
            width: `${buttonWidthI}`,
            height: `${buttonHeightI}`,
            padding: `${padding}`,
            'line-height':`0`,
            background:`${buttonBackground}`,
            'border-radius':`${buttonRadius}`,
        }


        const imageStyle={
            display: 'inline-block',
            width: `${imageWidth}`,
            height: `${imageHeight}`,
      }

        return(
            <View>
                <Button
                  style={src ? buttonStyleI : buttonStyle} 
                  onClick={this.onClick}
                >
                    <Text className='muxiText' >{this.props.children}</Text>
                    {src && <Image style={imageStyle} src={src}></Image> }
                </Button>
            </View>
        )
    }
}

MxButton.defaultProps = {
    buttonWidth: '513rpx',
    buttonHeight: '92rpx',
    buttonWidthI: '',
    buttonHeightI: '',
    buttonRadius:'46rpx',
    buttonBackground:'#9255B9',
    imageWidth: '30px',
    imageHeight: '30px',
    padding:'0',
    onClick:()=>{},
}
