import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import './index.scss';
import MxInput from '../../components/common/MxInput/MxInput';
import MxButton from '../../components/common/MxButton/index';
import image from '../../assets/png/navigation.png';
import Fetch from '../../service/fetch';

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '木犀课栈'
  };
  constructor() {
    super(...arguments);
    this.state = {
      userid: '',
      password: '',
      // eslint-disable-next-line react/no-unused-state
      value: 2.5,
      // eslint-disable-next-line react/no-unused-state
      username: '',
      // eslint-disable-next-line react/no-unused-state
      avatar: '',
      mask_name: 'unmask',
      mask_bg: 'mask_bg_show'
    };
  }

  handleSave() {
    this.setState({
      mask_name: 'mask',
      mask_bg: 'mask_bg_none'
    });
  }

  handleMask() {
    Taro.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setState({
            mask_name: 'mask',
            mask_bg: 'mask_bg_none'
          });
        }
      },
      fail: () => {
        this.setState({
          mask_name: 'unmask',
          mask_bg: 'mask_bg_show'
        });
      }
    });
  }

  ChangeTo() {
    Taro.switchTab({
      url: '/pages/commentSquare/index'
    });
    // success=()=>{
    //   var page = Taro.getCurrentPages().pop();
    //   if (page == undefined || page == null) return;
    //   page;
    // });
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  changeUserid(e) {
    let value = e.detail.value;
    this.setState({
      userid: value
    });
  }

  changePassword(e) {
    let value = e.detail.value;
    this.setState({
      password: value
    });
  }

  getUserInfo() {}
  //20101密码错误
  //0 成功
  //500服务器错误

  login() {
    const { userid, password } = this.state;
    if (userid && password) {
      Fetch(
        'api/v1/login',
        {
          sid: userid,
          password: password
        },
        'POST'
      ).then(res => {
        switch (res.code) {
          case 0:
            Taro.setStorage({
              key: 'token',
              data: res.data.token,
              success: function() {
                Taro.getSetting({
                  // eslint-disable-next-line no-shadow
                  success(res) {
                    if (res.authSetting['scope.userInfo']) {
                      Taro.getUserInfo({
                        // eslint-disable-next-line no-shadow
                        success: function(res) {
                          Fetch(
                            'api/v1/user/info',
                            {
                              avatar: res.userInfo.avatarUrl,
                              username: res.userInfo.nickName
                            },
                            'POST'
                          );
                          Taro.switchTab({
                            url: '/pages/commentSquare/index'
                          });
                        },
                        fail: function() {
                          Taro.showToast({
                            icon: 'none',
                            title: '获取用户信息失败'
                          });
                        }
                      });
                    } else {
                      Taro.showToast({
                        icon: 'none',
                        title: '请授权'
                      });
                    }
                  },
                  fail: function() {
                    Taro.showToast({
                      icon: 'none',
                      title: '请授权'
                    });
                  }
                });
              }
            });
            break;
          case 20101:
            Taro.showToast({
              icon: 'none',
              title: '账号或者密码错误'
            });
            break;
        }
      });
    } else {
      Taro.showToast({
        icon: 'none',
        title: '账号或密码不能为空'
      });
    }
  }

  render() {
    const ImageUrl = image;
    const { userid, password } = this.state;
    return (
      <View className="index">
        <Image className="head" src={ImageUrl}></Image>

        <MxInput
          width="480rpx"
          placeholder="学号/昵称"
          border="true"
          value={userid}
          onInput={this.changeUserid.bind(this)}
        ></MxInput>
        <View className="input">
          <MxInput
            width="480rpx"
            placeholder="密码"
            border="true"
            value={password}
            type="password"
            onInput={this.changePassword.bind(this)}
          ></MxInput>
        </View>
        <View className="login">
          <MxButton
            buttomWidth="513rpx"
            buttomHeight="92rpx"
            buttonBackground="#6868F8"
            border-radius="46rpx"
            onClick={this.login.bind(this)}
          >
            学号登录
          </MxButton>
        </View>

        <View className="visit">
          <Text className="visitor" onClick={this.ChangeTo.bind(this)}>
            游客登录
          </Text>
        </View>

        <View className="privacy">
          <Text className="secret">隐私条例</Text>
        </View>
        <View className={this.state.mask_bg}></View>
        <View className={this.state.mask_name}>
          <View>
            <Button
              class="bottom"
              open-type="getUserInfo"
              onGetUserInfo={this.getUserInfo.bind(this)}
              onClick={this.handleSave.bind(this)}
            >
              授权登陆
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
