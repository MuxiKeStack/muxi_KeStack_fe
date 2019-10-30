import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {  Picker, View } from '@tarojs/components'
import { MxIcon } from '../MxIcon'
import MxComponent from '../../../common/component'
import './index.scss'

export default class MxPicker extends MxComponent {

constructor(){
  super(...arguments)
} 
handleChange (){
  this.props.onChange(...arguments)
}
render () {
    const {
      selectorChecked,
      selector,
      width,
      className,
    } = this.props
    const rootStyle = {
      width: `${Taro.pxTransform(parseInt(width)-25)}`,
    }

    return (
      <View className={classNames('container',className)} >
        <View className='page-body'>
          <View className='page-section'>
            <View>
              <Picker mode='selector' range={selector} onChange={this.handleChange.bind(this)} className='picker-mini'>
                <View className='picker' style={rootStyle}>
                  { selectorChecked }
                </View>
                <MxIcon type='triangle' width='25' height='28' className='icon-container'></MxIcon>
              </Picker>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
MxPicker.defaultProps = {
  selector: [],
  selectorChecked: '',
  width: '232',
  className: '',
  onChange () {},
}

MxPicker.propTypes = {
  selector: PropTypes.array,
  selectorChecked: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
}