import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import {  Picker, View } from '@tarojs/components'
import { MxIcon } from './icon'
import MxComponent from '../../common/component'
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
    } = this.props

    return (
      <View className='container'>
        <View className='page-body'>
          <View className='page-section'>
            <View>
              <Picker mode='selector' range={selector} onChange={this.handleChange.bind(this)}>
                <View className='picker'>
                  { selectorChecked }
                </View>
                <MxIcon value='arrow-up' className='icon'></MxIcon>
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
  onChange () {},
}

MxPicker.propTypes = {
  selector: PropTypes.array,
  selectorChecked: PropTypes.string,
  onChange: PropTypes.func,
}