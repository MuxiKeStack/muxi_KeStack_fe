import Taro,{ Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import './index.scss'

export default class List extends Component {
       render(){
        const { className } = this.props
           return<View className={className}>{this.props.children}</View>
       }
}
List.defaultProps = {
    className: '',
}
List.propsTypes = {
    className: PropTypes.string,
}