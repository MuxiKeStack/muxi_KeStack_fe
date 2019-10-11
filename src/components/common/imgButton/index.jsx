import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Button ,Image} from '@tarojs/components'
import './index.scss'

export default class Muxi1buttonI extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
      }
      onClick = () => !this.props.editable && this.props.onClick()
      
    render () {
        const { 
            imageWidth,
            imageHeight,
            buttonWidth,
            buttonHeight,
            src
        } = this.props

        const imageStyle={
              display: 'inline-block',
              width: `${imageWidth}`,
              height: `${imageHeight}`,
        }

        const buttonStyle={
          display: 'inline-block',
          width: `${buttonWidth}`,
          height: `${buttonHeight}`
      }
        return (
          <View>
            <Button style={buttonStyle}>
               <Image style={imageStyle} src={src} onClick={this.onClick}></Image>
            </Button>
          </View>
        )
      }
}
Muxi1buttonI.defaultProps = {
  imageWidth: '45rpx',
  imageHeight: '45rpx',
  buttonWidth:'80rpx',
  buttonHeight:'65rpx',
  className: '',
  onClick:()=>{},
}