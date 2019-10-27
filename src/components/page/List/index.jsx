import Taro,{ Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class List extends Component {
       render(){
        const  className  = classNames( 'list-comp',this.props.className )
           return<View className={className}>{this.props.children}</View>
       }
}
List.defaultProps = {
    className: '',
}
List.propsTypes = {
    className: PropTypes.string,
}