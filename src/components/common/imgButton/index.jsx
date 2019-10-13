import Taro, { Component } from '@tarojs/taro'
import { View, Button ,Image} from '@tarojs/components'
import './index.scss'

export default class MuxibuttonI extends Component {
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
            padding,
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
          height: `${buttonHeight}`,
          padding: `${padding}`
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
MuxibuttonI.defaultProps = {
  imageWidth: '30px',
  imageHeight: '30px',
  buttonWidth:'',
  buttonHeight:'',
  padding:'0',
  className: '',
  onClick:()=>{},
}