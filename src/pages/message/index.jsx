import Taro, { Component } from '@tarojs/taro'
import { View,Image,Input } from '@tarojs/components'
import { MxIcon } from '../../components/common/MxIcon'
import  Img from '../../assets/svg/avatar-img.svg'
import './index.scss'
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {   id: 0, 
                    userInfo:{
                        userName:'我是一个小丸子',
                        avatar:Img,
                        time:'2019.8.23/11: 04',//暂时这样，到时候再该成时间格式？
                    },
                    commentInfo:{
                        commentCourseId: 0,
                        courseName:'线性代数',
                        teacherName:'李书刚',
                        comment: '在晚上上课，经常很困，书上的证明难，但是考的很简单，经常要交作业，不怎么点名，老师很有个性。在晚上上课，经常很困，书上的证明难，但是考的很简单，经常要交作业，不怎么点名，老师很有个性',
                    },
                    isLike: true,
                    isComment: true,
                    reply: '哈哈哈，怎么有个性了',
                    isRead:false,
                },
                {   id: 1, 
                    userInfo:{
                        userName:'我是一个小丸子',
                        avatar:Img,
                        time:'2019.8.23/11: 04',
                    },
                    commentInfo:{
                        commentCourseId: 1,
                        courseName:'诗苑经典的芳菲世界',
                        teacherName:'苏云',
                        comment:'上课经常要用手机操作和答题，总之事情有点多，每次上课都要手势签到或者拍旁边人的照片，很难逃课',
                    },
                    isLike: false,
                    isComment: true,
                    reply: '这真的有点惨',
                    isRead:false,
                },
                {   id: 2, 
                    userInfo:{
                        userName:'系统消息',
                        avatar:Img,
                        time:'2019.8.23/11: 04',
                    },
                    commentInfo:{
                        commentCourseId: 1,
                        courseName:'诗苑经典的芳菲世界',
                        teacherName:'苏云',
                        comment:'未评课！',
                    },
                    isLike: false,
                    isComment: false,
                    reply: '',
                    isRead:false,
                }

            ],
        }
    }
    componentWillUnmount() { }
    config = {
        navigationBarTitleText: "消息提醒",
    };

    componentDidMount() {
/*        courseList().then(res => {
                console.log(res);
                this.setState({
                    course: res.info,
                    });
                });*/
    }

    componentWillUnmount() { }

    componentDidHide() { }
   
     
    render() {
        const { messages } = this.state;
        return (
            <View className='index'>
                {messages.map(message =>{
                    var isComment = (message.reply =='')?false:true;
                    return(
                        <View >
                            <View className='card-container'>
                                <View className='user-info'>
                                    <View className='avatar-container'><Image src={message.userInfo.avatar} className='avatar-image'></Image></View>
                                    <View className='name-time'>
                                        <View className='name'>{message.userInfo.userName}</View>
                                        <View className='time'>{message.userInfo.time}</View>
                                    </View>
                                </View>
                                {message.isLike &&(<View className='message-text'>
                                    <View ><MxIcon type='likeBtn'></MxIcon></View>
                                    <View className='detail-text'>赞了我</View>
                                </View>)}
                                {isComment&&(<View className='message-text'>
                                    <MxIcon type='cmmtBtn'></MxIcon>
                                    <View className='detail-text'>回复我</View>
                                    <View className='reply-text'>{message.reply}</View>
                                    {/* <Input placeholder='回复：' placeholderClass='placeholder' className='reply-input'/> */}
                                </View>)}
                                <View className='course-container'>
                                    <View className='course-name'>{message.commentInfo.courseName}</View>
                                    <View className='teacher-name'>{message.commentInfo.teacherName}</View>
                                    <View className='course-comment'>{message.commentInfo.comment}</View>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>

        )
    }
}
