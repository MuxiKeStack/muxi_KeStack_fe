import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { List } from '../../components/page/List';
import { Item } from '../../components/page/List/Item';
import image from '../../assets/svg/avatar-img.svg';
import './index.scss';
import Fetch from '../../service/fetch';
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   user: { avatar: image, username: 'amybiubiu', sid: '2018214877' }
    user:{}
    };
  }

  config = {
    navigationBarTitleText: '个人主页'
  };

  componentWillMount() {}

  componentDidMount() {
    /*       courseList().then(res => {
                    console.log(res);
                    this.setState({
                        course: res.info,
                    });
                });*/

    Fetch('api/v1/user/info', {}, 'GET').then(res => {
      if (res) {
        console.log(res);
        this.setState({
          // avatar: res.data.avatar,
          user: res.data
        });
      }
    });
  }

  ChangeTomycourse() {
    Taro.navigateTo({
      url: '/pages/mycourse/index'
    });
  }
  ChangeTocommentHistory() {
    Taro.navigateTo({
      url: '/pages/commentHistory/index'
    });
  }
  ChangeTocourseSelectionList() {
    Taro.navigateTo({
      url: '/pages/courseSelectionList/index'
    });
  }
  ChangeTomessage() {
    Taro.navigateTo({
      url: '/pages/message/index'
    });
  }
  handleLogin() {}
  componentWillUnmount() {}

  componentDidHide() {}
  render() {
    const { user } = this.state;
    const rootStyle = {
      // width: `${Taro.pxTransform(164)}`,
      // height: `${Taro.pxTransform(164)}`,
    };
    return (
      <View>
        <View className="home-page-user-info">
          <View className="user-avatar">
            <Image
              src={user.avatar}
              className="avatar-image"
              style={rootStyle}
            ></Image>
          </View>
          <View className="user-info">
            <View className="nickname" onClick={this.handleLogin.bind(this)}>
              {user.username}
            </View>
            <View className="sid">{user.sid}</View>
          </View>
        </View>
        <View className="home_page_list-title">MY PROJECT</View>
        <List className="main-page-list">
          <Item
            iconType="myCourse"
            title="我的课程"
            extraText="MY COURSE"
            onClick={this.ChangeTomycourse.bind(this)}
          ></Item>
          <Item
            iconType="history"
            title="评课历史"
            extraText="REVIEW HISTORY"
            onClick={this.ChangeTocommentHistory.bind(this)}
          ></Item>
          <Item
            iconType="courseList"
            title="选课清单"
            extraText="COURSE LIST"
            onClick={this.ChangeTocourseSelectionList.bind(this)}
          ></Item>
          <Item
            iconType="message"
            title="消息提醒"
            extraText="MESSAGE REMINDER"
            hasBgi ={true}
            onClick={this.ChangeTomessage.bind(this)}
          ></Item>
        </List>
        <View className="home_page_error-click">有问题？点此反馈给我们</View>
      </View>
    );
  }
}
