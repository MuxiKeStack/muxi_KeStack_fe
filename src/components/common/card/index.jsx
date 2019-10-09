import Taro, {Component} from '@tarojs/taro'
// import classNames from 'classnames'
import { View } from '@tarojs/components'

import './index.scss'

export default class MxCard extends Component{
       render(){
           return(
               <View className='card'>
                   <View className='card-content'>
                       {this.props.children}
                   </View>
               </View>
           )
       }
}