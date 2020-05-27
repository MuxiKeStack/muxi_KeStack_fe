import classNames from "classnames";
import { View, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import AtComponent from '../../../common/component'
import './index.scss'




export default class MxLoading extends AtComponent {

  render() {
    // const canvas = Taro.createCanvasContext('myCanvas',this)
    // canvas.drawImage(
    //   'https://static.fotor.com.cn/assets/stickers/basic%20shapes_ccd29220-1d5d-4a62-a6f7-65dd67ba848f/bd18f93c-6e53-43e5-af8e-499e97fcd93c_medium_thumb.jpg'
    // ,0,0,30,30)
    // canvas.draw()
    const { color, size, isShow } = this.props
    const loadingSize = typeof size === 'string' ? size : String(size)
    const sizeStyle = {
      width: size ? `${Taro.pxTransform(parseInt(loadingSize))}` : '',
      height: size ? `${Taro.pxTransform(parseInt(loadingSize))}` : ''
    }
    const colorStyle = {
      border: color ? `1px solid ${color}` : '',
      'border-color': color
        ? `${color} transparent transparent transparent`
        : ''
    }
    const ringStyle = Object.assign({}, colorStyle, sizeStyle)
    const {className} = this.props

    return (
      <View className={classNames('loading-body', className)}>
      {/*<Image src={fourStar} className='fourStar' style={isShow ? 'visibility: visiable': 'visibility: hidden'}></Image>*/}
        <View className='pacman' style={isShow ? 'visibility: visiable': 'visibility: hidden'}></View>
        {/*<View className='heart' style={!isShow ? 'visibility: visiable': 'visibility: hidden'}></View>*/}
      <View className='at-loading' style={sizeStyle}>
        <View className='at-loading__ring' style={ringStyle}></View>
        <View className='at-loading__ring' style={ringStyle}></View>
        <View className='at-loading__ring' style={ringStyle}></View>
      </View>
      </View>
    )
  }
}

MxLoading.defaultProps = {
  size: 0,
  color: '',
  isShow: false,
  className: ''
}

