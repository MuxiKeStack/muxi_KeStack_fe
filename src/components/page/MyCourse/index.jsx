import Taro,{ Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import { View,Text } from '@tarojs/components'
import MxIcon from '../../common/MxIcon'
import './index.scss'

export default class MyCourse extends Component
{
    render(){
        const {className,isComment,courseName,teacherName} = this.props;
        const leftIcon= isComment?'solidC':'hollowC'
        const rightIcon= isComment?'check':'square'
        const hasComment= isComment?'已评课':'未评课'
        return<View onClick={this.handleClick} className={className}>
            <MxIcon className='left-icon' type={leftIcon}></MxIcon>
            <Text className='course-name'>{courseName}</Text>
            <Text className='teacher-name'>{teacherName}</Text>
            <Text className='is-comment'>{hasComment}</Text>
            <MxIcon className='right-icon' type={rightIcon}></MxIcon>

        </View>
    }
}
MyCourse.defaultProps={
    className:'',

}
MyCourse.propsTypes = {
    className: PropTypes.string,
}