import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import MxInput from '../../components/common/MxInput/MxInput';

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      datas: [
        {
          text: '线性代数B',
          teacher: '张俊',
          people: '84',
          tag1: '偶尔点名',
          tag2: '期末闭卷',
          tag3: '期末闭卷',
          tag4: '期末闭卷'
        },
        {
          text: '线性代数B',
          teacher: '张俊',
          people: '84',
          tag1: '偶尔点名',
          tag2: '期末闭卷',
          tag3: '暂无课程特点评价',
          tag4: ''
        },
        {
          text: '线性代数B',
          teacher: '张俊',
          people: '84',
          tag1: '偶尔点名',
          tag2: '期末闭卷',
          tag3: '期末闭卷',
          tag4: '期末闭卷'
        }
      ],
      value: 4
    };
  }
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '木犀课栈'
  };

  state = {
    // eslint-disable-next-line react/no-unused-state
    animation: '',

    // eslint-disable-next-line react/no-unused-state
    startX: 0, //开始坐标
    // eslint-disable-next-line react/no-unused-state
    startY: 0
  };

  ChangeTodetails() {
    Taro.navigateTo({
      url: '/pages/courseDetails/courseDetails'
    });
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  // 滑动开始
  touchstart(e) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      startX: e.changedTouches[0].clientX,
      // eslint-disable-next-line react/no-unused-state
      startY: e.changedTouches[0].clientY
    });
  }

  //滑动事件处理 _index当前索引
  touchmove(e) {
    var that = this;

    var startX = that.state.startX; //开始X坐标
    var startY = that.state.startY; //开始Y坐标
    var touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标
    var touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标
    // var isLeft = _class.indexOf("leftMove") != -1; //往左滑的位置
    // var isRight = _class.indexOf("rightMove") != -1;//往右滑的位置
    //获取滑动角度
    var angle = that.angle(
      { X: startX, Y: startY },
      { X: touchMoveX, Y: touchMoveY }
    );
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) return;
    //右滑
    if (touchMoveX > startX) {
      console.log('右滑');
      //实例化一个动画
      let _animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'linear',
        delay: 100,
        transformOrigin: 'left top 0',
        success: function(res) {
          console.log(res);
        }
      });

      _animation.translateX(0).step();
      that.setState({
        //输出动画
        animation: _animation.export()
      });
    } else if (touchMoveX - startX < -10) {
      //左滑
      console.log('左滑');
      //实例化一个动画
      let _animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'linear',
        delay: 100,
        transformOrigin: 'left top 0',
        success: function(res) {
          console.log(res);
        }
      });
      _animation.translateX(-80).step();
      that.setState({
        //输出动画
        animation: _animation.export()
      });
    }
  }

  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y;
    //返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
  }

  componentWillMount() {
    console.log(this.$router.params);
  }

  componentDidMount() {
    let animation = Taro.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: 'left top 0',
      success: function(res) {
        console.log(res);
      }
    });

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      animation: animation
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const content = (
      <View className="detailsBoxes">
        {this.state.datas.map(data => {
          return (
            // eslint-disable-next-line react/jsx-key
            <View className="detailsBox">
              <View
                onTouchStart={this.touchstart.bind(this)}
                onTouchEnd={this.touchmove.bind(this)}
                animation={this.state.animation}
                className="mx-card"
                onClick={this.ChangeTodetails.bind(this)}
              >
                <View className="blue">
                  <View className="star">
                    <MxRate
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                      readOnly
                    />
                  </View>
                  <View className="word">评价人数：</View>
                  <View className="people">{data.people}</View>
                </View>
                <View className="user-info">
                  <View className="class">{data.text}</View>
                  <View className="teacher">{data.teacher}</View>
                </View>
                <View className="tag">
                  <View className="tag1">
                    <Text>{data.tag1}</Text>
                  </View>
                  <View className="tag2">
                    <Text>{data.tag2}</Text>
                  </View>
                  <View className="tag3">
                    <Text>{data.tag3}</Text>
                  </View>
                  <View className="tag4">
                    <Text>{data.tag4}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );

    return (
      <View style="display: block">
        <View className="chooseBox">
          <View className="search">
            <MxInput
              leftSrc="../../../assets/svg/searchicon.svg"
              leftSize="20px"
              width="670rpx"
              height="72rpx"
              background="rgba(241,240,245,1)"
              radius="36rpx"
            ></MxInput>
          </View>
        </View>
        {content}
      </View>
    );
  }
}
