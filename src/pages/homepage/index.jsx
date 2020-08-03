import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { List } from '../../components/page/List';
import { Item } from '../../components/page/List/Item';
import image from '../../assets/svg/avatar-img.svg';
import './index.scss';
import Fetch from '../../service/fetch';
import MxIcon from '../../components/common/MxIcon';
import image1 from '../../assets/png/home1.png';
import image2 from '../../assets/png/home2.png';
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { avatar: image, username: 'null', sid: 'null' },
      readAll: true,
      openModal: false,
      isFir: false,
      to1: true,
      to2: false
    };
  }

  config = {
    navigationBarTitleText: '个人主页'
  };

  componentDidMount() {
    if (!Taro.getStorageSync('sid')) {
      Taro.navigateTo({
        url: '/pages/login/index'
      });
    }
  }

  componentDidShow() {
    let isFir = Taro.getStorageSync('isnew');
    if (isFir == 0) {
      this.setState({
        isFir: true
      });
    }
    if (!Taro.getStorageSync('sid')) {
      Taro.navigateTo({
        url: '/pages/login/index'
      });
    }
    Fetch('api/v1/message/count/', {}, 'GET').then(res => {
      if (res) {
        // console.log(res.data);
        if (res.data.count != 0) {
          this.setState({
            readAll: false
          });
        }
      }
    });
    Fetch('api/v1/user/info/', {}, 'GET').then(res => {
      if (res) {
        // console.log(res);
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

    Fetch('api/v1/message/readall/', {}, 'POST').then(res => {
      if (res) {
        this.setState({
          readAll: true
        });
      }
    });
  }
  componentWillUnmount() {}

  componentDidHide() {}

  onClick1() {
    this.setState({
      to1: false,
      to2: true
    });
  }
  onClick2() {
    this.setState({
      isFir: true
    });
  }

  render() {
    const isFir = this.state.isFir;
    const to1 = this.state.to1;
    const to2 = this.state.to2;
    const ImageUrl1 = image1;
    const ImageUrl2 = image2;
    const { user, readAll, openModal } = this.state;
    const rootStyle = {
      // width: `${Taro.pxTransform(164)}`,
      // height: `${Taro.pxTransform(164)}`,
    };
    const modalStyle = openModal ? { display: 'block' } : { display: 'none' };
    return (
      <View>
        {!isFir && <View className="mask"></View>}
        {!isFir && to1 && (
          <View>
            <Image
              className="img1"
              src={ImageUrl1}
              onClick={this.onClick1.bind(this)}
            ></Image>
          </View>
        )}
        {!isFir && to2 && (
          <View>
            <Image
              className="img2"
              src={ImageUrl2}
              onClick={this.onClick2.bind(this)}
            ></Image>
          </View>
        )}
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
              {user.username.slice(0, 7)}
            </View>
            <View className="sid">{user.sid}</View>
          </View>
          <View
            className="change-user-info"
            onClick={() =>
              Taro.navigateTo({ url: '/pages/changeUserInfo/index' })
            }
          >
            <MxIcon type="arrowR" width="50" height="50"></MxIcon>
          </View>
        </View>
        {/* <View className="home_page_list-title">MY PROJECT</View> */}
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
            hasNew={!readAll}
            iconType="message"
            title="消息提醒"
            extraText="MESSAGE REMINDER"
            hasBgi
            onClick={this.ChangeTomessage.bind(this)}
          ></Item>
        </List>
        <View
          className="home_page_error-click"
          // onClick={this.handleFeedBack.bind(this)}
          onClick={() => {
            this.setState({ openModal: true });
          }}
        >
          <View className="text">有问题？点此反馈给我们</View>
        </View>
        <View className="modal" style={modalStyle}>
          <View className="modal-backdrop"></View>
          <View className="modal-body">
            <View className="modal-title">反馈</View>
            <Text className="modal-content" selectable="true">
              QQ群：799651462\n
              {/* </Text>
            <Text className="modal-content" selectable="true"> */}
              邮箱：i@muxistudio.com
            </Text>
            <View
              className="confirm"
              onClick={() => {
                this.setState({ openModal: false });
              }}
            >
              确定
            </View>
          </View>
        </View>
      </View>
    );
  }
}
