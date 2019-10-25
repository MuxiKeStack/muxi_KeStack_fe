import Taro, { Component } from "@tarojs/taro";
import { View, Text, Canvas } from "@tarojs/components";
import "./index.scss";
import MxInput from "../../components/common/MxInput/MxInput";
import MxRate from "../../components/common/MxRate/MxRate";
import Ring from "../../components/page/Ring/Ring";
import MxButton from "../../components/common/MxButton";
import MxCard from "../../components/common/MxCard";
import pic from "../../assets/png/good.png";
import { List } from "../../components/page/List";
import { Item } from "../../components/page/List/Item";

// import bgim from '../../assets/svg/bgim.svg'


// 色板
const PALETTE = ["#9154B8", "#F9D57F", "#D8D8D8", "#FD817E"];

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: 2.5
    };
  }
  onClick(data) {
    const { tagList } = this.state;
    const findIndex = tagList.findIndex(item => item.name === data.name);
    const active = !tagList[findIndex].active;

    tagList[findIndex].active = active;
    this.setState({ tagList });
  }

  componentWillUnmount() {}
  config = {
    navigationBarTitleText: "首页"
  };

  componentDidMount() {
    this.drawCircle([70, 10, 15, 5], "grade", "成绩");
    this.drawCircle([10, 70, 20], "attendance", "考勤");
    this.drawCircle([60, 5, 5, 30], "exam", "考核");
  }

  componentWillUnmount() {}

  handleChange(value) {
    this.setState({
      value
    });
  }

  componentDidHide() {}

  drawCircle(data, id, title) {
    // 做一下检查，看 data 加起来是否大于 100

    // 常量
    const canvasSize = 102;
    const radiusSize = 45;

    const ctx = Taro.createCanvasContext(id);
    const res = Taro.getSystemInfoSync();
    const radio = res.screenWidth / 750; // device pixel radio

    let currentRadian = -radiusSize / 180; // 目前画到了哪个弧度，范围（0 - 2 π），这就是下一次绘制 arc 的起点。初始值为 -45deg，也就是时钟12点方向
    const centerX = (radio * canvasSize) / 2;
    const centerY = (radio * canvasSize) / 2;
    const outterRadius = radio * radiusSize; // 外圆的半径
    data.forEach((item, index) => {
      let radian = item / 100;

      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        outterRadius,
        currentRadian * 2 * Math.PI,
        (currentRadian + radian) * 2 * Math.PI
      );
      ctx.setLineWidth(3);
      ctx.strokeStyle = PALETTE[index % PALETTE.length];
      ctx.stroke();

      currentRadian = currentRadian + radian;
    });

    // 文字绘制
    ctx.fillStyle = "#9154B8"; // 字体颜色
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "14px Microsoft YaHei"; // 字号
    ctx.fillText(title, centerX, centerY);

    ctx.draw();
  }

  test() {
    console.log("lalalla");
  }
  //a

  ChangeTo() {
    Taro.navigateTo({
      url: "/pages/list/index"
    });
  }
  ChangeToo() {
    Taro.navigateTo({
      url: "/pages/postReview/index"
    });
  }

  render() {
    return (
      <View className="index">
        <Text>{this.state.name}</Text>
        <MxInput
          placeholder="this is placeholder"
          background="#F1F0F5"
          radius="52px"
        />
        <MxRate
          readOnly={false}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <MxCard>这里装的是卡片内容</MxCard>
        <Ring
          type="成绩"
          percent1="13"
          percent2="76"
          percent3="11"
          name1="经常点名"
          name2="偶尔点名"
          name3="从不点名"
        />
        <View>
          <Ring
            className="ring"
            type="成绩"
            name1="70以下"
            name2="70~85"
            name3="85以上"
            percent1="11"
            percent2="12"
            percent3="40"
          />
        </View>

        <MxButton onClick={this.test.bind()}>lalala</MxButton>

        {/* <MxRate 
          show={true}
          value={this.state.value2}
        /> */}
        <View className="canvas-container">
          <Canvas
            className="canvas"
            style="width: 102rpx; height: 102rpx;"
            canvasId="grade"
          ></Canvas>

          <Canvas
            className="canvas"
            style="width: 102rpx; height: 102rpx;"
            canvasId="attendance"
          ></Canvas>
          <Canvas
            className="canvas"
            style="width: 102rpx; height: 102rpx;"
            canvasId="exam"
          ></Canvas>
        </View>
        <MxButton onClick={this.test.bind()}>lalala</MxButton>
        <MxButton src={pic} onClick={this.test.bind()}></MxButton>

        <View className="index">
          <MxCard radius="25" className="Mxcard">
            <MxButton
              src={pic}
              buttonWidthl="513rpx"
              buttonHeightl="92rpx"
              onClick={this.ChangeTo}
            ></MxButton>
            <Text style="display:inline">选课清单</Text>
          </MxCard>
          <MxCard radius="25" className="Mxcard">
            <MxButton
              src={pic}
              buttonWidthl="513rpx"
              buttonHeightl="92rpx"
              onClick={this.ChangeToo}
            ></MxButton>
            <Text style="display:inline">发布评课</Text>
          </MxCard>
        </View>
        <List className="main-page-list">
          <Item title="我的课程" extraText="MY COURSE"></Item>
          <Item
            title="评课历史"
            extraText="REVIEW HISTORY"
            className="cat"
          ></Item>
          <Item title="我的课程" extraText="MY COURSE"></Item>
        </List>
      </View>
    );
  }
}
