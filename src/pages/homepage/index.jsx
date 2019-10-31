import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { List } from '../../components/page/List'
import { Item } from '../../components/page/List/Item'
import image from '../../assets/svg/avatar-img.svg'
import './index.scss'
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { avatar: image, nickname: 'amybiubiu', sid: '2018214877' }
        }
    }
    componentWillUnmount() { }
    config = {
        navigationBarTitleText: "个人主页"
    };

    componentDidMount() {
 /*       courseList().then(res => {
             console.log(res);
             this.setState({
                 course: res.info,
             });
         });*/
    }

    componentWillUnmount() { }

    componentDidHide() { }
    render() {
        const { user } = this.state;
        const rootStyle = {
            // width: `${Taro.pxTransform(164)}`,
            // height: `${Taro.pxTransform(164)}`,
        }
        return (
            <View>
                <View className='home-page-user-info'>
                    <View className='user-avatar'><Image src={user.avatar} className='avatar-image' style={rootStyle}></Image></View>
                    <View className='user-info'>
                        <View className='nickname'>{user.nickname}</View>
                        <View className='sid'>{user.sid}</View>
                    </View>
                </View>
                <View className='home_page_list-title'>MY PROJECT</View>
                <List className='main-page-list'>
                    <Item iconType='myCourse' title='我的课程' extraText='MY COURSE' ></Item>
                    <Item iconType='history' title='评课历史' extraText='REVIEW HISTORY'></Item>
                    <Item iconType='courseList' title='选课清单' extraText='COURSE LIST' ></Item>
                    <Item iconType='message' title='消息提醒' extraText='MESSAGE REMINDER' hasBgi='true'></Item>
                </List>
                <View className='home_page_error-click'>有问题？点此反馈给我们</View>
            </View>

        )
    }
}
