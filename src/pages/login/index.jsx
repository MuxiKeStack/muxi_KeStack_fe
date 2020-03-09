import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import './index.scss';
import MxInput from '../../components/common/MxInput/MxInput';
import MxButton from '../../components/common/MxButton/index';
import MxIcon from '../../components/common/MxIcon/index';
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
      isAnony: '',
      userid: '',
      password: '',
      // eslint-disable-next-line react/no-unused-state
      value: 2.5,
      // eslint-disable-next-line react/no-unused-state
      username: '',
      // eslint-disable-next-line react/no-unused-state
      avatar: '',
      mask_name: 'unmask',
      mask_bg: 'mask_bg_show',
      showModal: false,
      maskshow: 'maskshow',
      masklist: 'masklist'
    };
  }

  handleSave() {
    this.setState({
      mask_name: 'mask',
      mask_bg: 'mask_bg_none'
    });
  }

  handleCancel() {
    this.setState({
      maskshow: 'unmaskshow',
      masklist: 'unmasklist'
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
    const { userid, password, isAnony } = this.state;
    if (userid && password && isAnony) {
      Fetch(
        'api/v1/login/',
        {
          sid: userid,
          password: password
        },
        'POST'
      ).then(res => {
        console.log(res);
        switch (res.code) {
          case 0:
            Taro.setStorage({
              key: 'sid',
              data: userid
            });
            Taro.setStorage({
              key: 'password',
              data: password
            });
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
                            'api/v1/user/info/',
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
    }
    if (!userid || !password) {
      Taro.showToast({
        icon: 'none',
        title: '账号或密码不能为空'
      });
    }
    if (!isAnony) {
      Taro.showToast({
        icon: 'none',
        title: '请勾选同意隐私条例'
      });
    }
  }

  onAnony() {
    this.setState({
      isAnony: !this.state.isAnony
    });
  }

  ondialog() {
    this.setState({
      showModal: true,
      maskshow: 'maskshow',
      masklist: 'masklist'
    });
  }

  render() {
    const showModal = this.state.showModal;
    const isAnony = this.state.isAnony;
    const ImageUrl = image;
    const { userid, password } = this.state;
    return (
      <View className="index">
        {showModal && (
          <View
            className={this.state.maskshow}
            onClick={this.handleCancel.bind(this)}
          ></View>
        )}
        {showModal && (
          <View className={this.state.masklist}>
            {showModal && (
              <View className="list">
                <Text>
                  <Text className="name">《木犀课栈隐私条例》\n</Text>
                  作为华中师范大学学生自主运营的互联网技术团队，木犀一直高度重视隐私保护、郑重对待相应责任，并已将隐私保护的要求融入日常业务活动流程。
                  希望您仔细阅读本条例，详细了解我们对信息的收集、使用方式，以便您更好地了解我们的服务并作出适当的选择。若您使用木犀课栈的服务，即表示您认同我们在本条例中所述内容。
                  我们收集的信息\n
                  我们根据合法、正当、必要的原则，仅收集实现产品功能所必要的信息，并将竭力通过有效的信息安全技术及管理流程，防止您的信息泄露、损毁、丢失。\n
                  1、您在使用我们服务时主动提供的信息\n
                  （1）您在登录时填写的信息。木犀课栈将采用华中师范大学一站式门户的账号密码进行登录，以此获取您的课程信息。\n
                  （2）您在使用服务时填写的信息。例如您上传的头像。\n
                  （3）我们的部分服务可能需要您提供特定的个人敏感信息来实现特定功能。若您选择不提供该类信息，则可能无法正常使用服务中的特定功能，但不影响您使用服务中的其他功能。若您主动提供您的个人敏感信息，即表示您同意我们按本条例所述目的和方式来处理您的个人敏感信息。\n
                  2、我们在您使用服务时获取的信息\n
                  当您使用我们的服务时，我们可能会存储服务日志信息。例如搜索、查看的信息、服务故障信息等。\n
                  3、其他相关信息\n
                  （1）其他用户分享的信息中含有您的信息。例如，其他用户分享的截图中可能包含您的信息。\n
                  （2）从第三方合作伙伴获取的信息。例如，您使用QQ授权登录时，我们会获得您登录的名称、登录时间，方便您进行授权管理。请您仔细阅读第三方合作伙伴服务的用户协议或隐私政策。\n
                  我们如何使用收集的信息\n
                  我们严格遵守法律法规的规定及与用户的约定，将收集的信息用于以下用途。若我们超出以下用途使用您的信息，我们将再次向您进行说明，并征得您的同意。\n
                  1、向您提供服务\n
                  2、产品开发和服务优化。例如，当我们的系统发生故障时，我们会记录和分析系统故障时产生的信息，优化我们的服务。\n
                  3、为了确保服务的安全，帮助我们更好地了解我们应用程序的运行情况，我们可能记录相关信息，例如，您使用应用程序的频率、故障信息、总体使用情况、性能数据以及应用程序的来源。我们不会将我们存储在分析软件中的信息与您在应用程序中提供的个人身份信息相结合。\n
                  您分享的信息\n
                  您可以通过我们的服务与好友分享相关课程或评价信息。例如，在空间中公开分享课程评价和课表。\n
                  请注意，这其中可能包含您的个人身份信息、个人课程信息等敏感信息，请您谨慎考虑披露您的相关个人敏感信息，这些信息可能由其他用户或不受我们控制的非关联第三方独立保存。\n
                  我们可能向您发送的信息\n
                  1、信息推送：您在使用我们的服务时，我们会向您发送通知信息。\n
                  2、与服务有关的公告：我们可能在必要时（例如，因系统维护而暂停某一项服务时）向您发出与服务有关的公告。\n
                  联系我们 如您对本条例或其他相关事宜有疑问，\n
                  请通过QQ群：799651462与我们联系。\n 您也可以将问题发送至邮箱：
                  i@muxistudio.com\n
                  我们将在验证您的用户身份后，尽快审核所涉问题并予以回复。
                </Text>
              </View>
            )}
          </View>
        )}

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
        <View className="privacy">
          <View className="icon">
            {isAnony && (
              <MxIcon type="anony" onClick={this.onAnony.bind(this)}></MxIcon>
            )}
            {!isAnony && (
              <MxIcon type="unanony" onClick={this.onAnony.bind(this)}></MxIcon>
            )}
          </View>
          <Text className="agree">我已同意</Text>
          <Text className="secret" onClick={this.ondialog.bind(this)}>
            《木犀课栈隐私条例》
          </Text>
          <Text className="agree">中的所有内容</Text>
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
        <View className={this.state.mask_bg}></View>
        <View className={this.state.mask_name}>
          <View className="authrization">
            <View className="affirm">小程序授权确认</View>
            <View className="content">
              您需要将QQ账号信息授权给“木犀课栈”用以登录
            </View>
            <Button
              class="bottom"
              open-type="getUserInfo"
              onGetUserInfo={this.getUserInfo.bind(this)}
              onClick={this.handleSave.bind(this)}
            >
              授权登录
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
