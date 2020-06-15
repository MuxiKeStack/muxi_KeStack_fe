import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import MxInput from '../../components/common/MxInput/MxInput';
import image from '../../assets/png/navigation.png';

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      users: [
        {
          avatar: image,
          name: '123',
          time: '2019.8.23/11：04',
          text: '#线性代数B（张俊）',
          assess:
            '老师也太有意思了吧哈哈哈哈   简直是被数学埋没的相声演员，课上一言不合就开始作诗……'
        },
        {
          avatar: image,
          name: '123',
          time: '2019.8.23/11：04',
          text: '#线性代数B（张俊）',
          assess:
            '老师也太有意思了吧哈哈哈哈   简直是被数学埋没的相声演员，课上一言不合就开始作诗……'
        }
      ],
      value: 5
    };
  }
  config = {
    navigationBarTitleText: '评课广场'
  };
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }

  handleChange(value) {
    this.setState({
      value
    });
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}
  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { users } = this.state;
    return (
      <View className="index">
        <MxInput
          background="#F1F0F5"
          radius="36px"
          width="598px"
          height="72px"
          placeholder="搜索"
        ></MxInput>
        <View className="card">
          {users.map(user => {
            return (
              <View className="mx-card">
                <Image className="head" src={user.avatar}></Image>
                <View className="user-info">
                  <View className="name">{user.name}</View>
                  <View className="time">{user.time}</View>
                </View>
                <View className="blue">
                  <View className="class"> {user.text}</View>
                  <View className="rank">评价星级:</View>
                  <View className="star">
                    <MxRate
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                      readOnly
                    />
                  </View>
                </View>
                <View className="evaluate">
                  <Text>{user.assess}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
