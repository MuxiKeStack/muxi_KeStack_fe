import Taro, { Component } from '@tarojs/taro';
import { View, Input, Form, Button, Image } from '@tarojs/components';
import MxIcon from '../../components/common/MxIcon';
import Fetch from '../../service/fetch';
import './index.scss';

export default class index extends Component {
  config = {
    navigationBarTitleText: '个人信息'
  };
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      avatar: ''
      // onfocus: ''
    };
    this.targetUrl = '';
    this.token = '';
  }

  componentWillMount() {}

  componentDidMount() {
    Fetch('api/v1/user/info/', {}, 'GET').then(res => {
      if (res) {
        // console.log(res.data);
        this.setState({
          username: res.data.username,
          avatar: res.data.avatar
        });
      }
    });
    this.token = Taro.getStorageSync('token');
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  toLower(str) {
    var i = str.lastIndexOf('.');
    var res = str.substring(0, i) + str.substring(i, str.length).toLowerCase();
    return res;
  }

  toChangeName(e) {
    this.setState({
      username: e.target.value
    });
  }
  handleCross() {
    this.setState({
      username: ''
    });
  }
  handleLogout() {
    Taro.clearStorageSync();
    Taro.navigateTo({
      url: '/pages/login/index'
    });
  }
  toChangeAvatar() {
    const params = {};
    params.count = 1;
    params.sizeType = ['original', 'compressed'];
    params.sourceType = ['album', 'camera'];
    Taro.chooseImage(params)
      .then(res => {
        this.setState({
          avatar: res.tempFilePaths[0],
          username: this.state.username //本地临时路径,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  nameChangeHandle(val) {
    this.setState({
      username: val
    });
  }
  upload() {
    return new Promise(resolve => {
      Taro.uploadFile({
        url: 'https://kstack.test.muxixyz.com/api/v1/upload/image/', //上传头像的服务器接口
        filePath: this.state.avatar,
        name: 'image',
        formData: {
          // image: this.state.file
        },
        header: {
          token: Taro.getStorageSync('token')
          // 'content-type': 'multipart/form-data'
        },
        success(res) {
          if (res.data) {
            resolve(JSON.parse(res.data).data.url);
          }
        }
      });
    });
  }
  onSubmit() {
    if (this.state.username == '') {
      Taro.atMessage({
        message: '标题不能为空',
        type: 'warning'
      });
      return;
    }
    this.upload()
      .then(url => {
        Fetch(
          'api/v1/user/info/',
          {
            username: this.state.username,
            avatar: url
          },
          'POST'
        ).then(ress => {
          if (ress.message == 'OK')
            Taro.showToast({ title: '修改成功', icon: 'success' });
        });
      })
      .catch(err => {
        console.error(err);
        Taro.showToast({ title: '修改失败，请稍后重试', icon: 'fail' });
      });
  }
  onReset() {
    Fetch('api/v1/user/info/', {}, 'GET').then(res => {
      if (res) {
        this.setState({
          username: res.data.username,
          avatar: res.data.avatar
        });
      }
    });
  }

  render() {
    const { username, avatar } = this.state;
    return (
      <View className="index">
        <Form
          className="from"
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <View className="from-content">
            <View className="avatar">
              <View>修改头像</View>
              <Image
                src={avatar}
                // src="https://thirdqq.qlogo.cn/qqapp/1108100302/AEC7B0E25CBC86FC3098E2FC0FD5CD0D/100"
                onClick={this.toChangeAvatar.bind(this)}
                className="avatar-img"
              ></Image>
              <View className="icon-right">
                <MxIcon
                  type="arrowR"
                  onClick={this.toChangeAvatar.bind(this)}
                  className="avatar-icon"
                ></MxIcon>
              </View>
            </View>
            <View className="user-name">
              <View className="nick">昵称</View>
              <Input
                maxLength="8"
                className="nick-input"
                placeholder="昵称"
                placeholderClass="input-font"
                value={username}
                onChange={this.toChangeName.bind(this)}
                // onFocus={this.handleFocus.bind(this)}
                // onBlur={this.handleUnFocus.bind(this)}
                // focus
              />
              {/* {!onfocus && <MxIcon type="cross"></MxIcon>} */}
              <View className="icon-right">
                <MxIcon
                  type="cross"
                  onClick={this.handleCross.bind(this)}
                  className="deleteIcon"
                ></MxIcon>
              </View>
            </View>
          </View>
          <View className="from-button">
            <Button formType="reset" className="reset-button">
              取消
            </Button>
            <Button formType="submit" className="submit-button">
              保存
            </Button>
          </View>
        </Form>
        <View className="log-out" onClick={this.handleLogout.bind(this)}>
          退出登陆
        </View>
      </View>
    );
  }
}
