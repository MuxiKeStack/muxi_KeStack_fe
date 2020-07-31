/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Taro, { Component } from '@tarojs/taro';
import {
  View,
  ScrollView,
  Label,
  RadioGroup,
  Radio,
  Text
} from '@tarojs/components';
import MxButton from '../../components/common/MxButton';
import HeaderTab from '../../components/headerTab/header-tab';
import FloatLayout from '../../components/layout';
import MxModal from '../../components/common/MxModall';
import Course from '../../components/course';
import add from '../../assets/svg/add1.svg';
import Fetch from '../../service/fetch';
import './index.scss';
import Modal from '../../components/common/Modal';
import MxGuide from '../../components/common/MxGuide/index';

var COURSESData = new Array(),
  conflictCourse = new Array(),
  coursedetail = new Array();
var title, teacher, color;
var times = new Array(),
  detailtimes = new Array();
var table_id, course_id, index;
var table_num;
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
      WEEKS: [1, 2, 3, 4, 5, 6, 7],
      COURSES: [1, 2, 3, 4, 5, 6],
      showList: false,
      list: [],
      data: {},
      COURSESData: [],
      navList: [],
      favoritelist: [],
      showList1: false,
      open_coursedetail: false,
      class_id: [],
      isclick: true,
      isFir: true
    };
  }
  onShareAppMessage() {
    Taro.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
  }
  componentDidShow() {
    let isFir = Taro.getStorageSync('isnew');
    if (isFir == 0) {
      this.setState({
        isFir: false
      });
    }
    Fetch('api/v1/table/', {}, 'GET').then(data => {
      if (data) {
        this.setState({
          data: data.data
        });
        for (var i = 0; i < 7; i++) {
          COURSESData[i] = new Array();
        }
        table_id = data.data.table_list[0].table_id;
        this.getfavorite(data.data.table_list[0].table_id);
        const tablelist = data.data.table_list;
        const list = data.data.table_list[0].class_list;
        table_num = data.data.table_num;
        tablelist.map((item, i) => {
          this.state.navList.push({
            key: item.table_id,
            id: i,
            content: item.table_name
          });
        });
        if (list) {
          list.map((item, i) => {
            item.times.map(key => {
              if (key.day === 1) {
                COURSESData[0].push(item);
              }
              if (key.day === 2) {
                COURSESData[1].push(item);
              }
              if (key.day === 3) {
                COURSESData[2].push(item);
              }
              if (key.day === 4) {
                COURSESData[3].push(item);
              }
              if (key.day === 5) {
                COURSESData[4].push(item);
              }
              if (key.day === 6) {
                COURSESData[5].push(item);
              }
              if (key.day === 7) {
                COURSESData[6].push(item);
              }
            });
          });
        }
        this.setState({
          COURSESData: COURSESData
        });
      }
    });
  }

  config = {
    navigationBarTitleText: '自由排课'
  };

  dividetable(index) {
    conflictCourse = new Array();
    Fetch('api/v1/table/', {}, 'GET').then(data => {
      if (data) {
        this.setState({
          data: data.data
        });
        for (var i = 0; i < 7; i++) {
          COURSESData[i] = new Array();
        }
        var list;
        data.data.table_list.map((item, i) => {
          if (item.table_id == index) {
            list = item.class_list;
          }
        });
        if (list) {
          list.map((item, i) => {
            item.times.map((key, i) => {
              if (key.day === 1) {
                COURSESData[0].push(item);
              }
              if (key.day === 2) {
                COURSESData[1].push(item);
              }
              if (key.day === 3) {
                COURSESData[2].push(item);
              }
              if (key.day === 4) {
                COURSESData[3].push(item);
              }
              if (key.day === 5) {
                COURSESData[4].push(item);
              }
              if (key.day === 6) {
                COURSESData[5].push(item);
              }
              if (key.day === 7) {
                COURSESData[6].push(item);
              }
            });
          });
        }
        this.setState({
          COURSESData: COURSESData
        });
      }
    });
  }

  CshowMenu() {
    if (this.state.showMenu == true) {
      this.setState({
        showMenu: false
      });
    }
    if (this.state.showMenu == false) {
      this.setState({
        showMenu: true
      });
    }
  }

  getIndex(index) {
    this.setState({
      index: index
    });
    this.state.data.table_list.map(table => {
      if (table.table_id == index) {
        this.getfavorite(index);
        table_id = index;
        this.dividetable(index);
      }
    });
  }

  getfavorite(index) {
    Fetch(`api/v1/collection/table/${index}/`, {}, 'GET').then(data => {
      if (data) {
        this.setState({
          favorite: data.data,
          favoritelist: data.data.course_list
        });
      }
    });
  }

  addfavorite(item) {
    this.setState({
      showList1: !this.state.showList1
    });

    Fetch(
      `api/v1/table/${table_id}/class/?course_id=${course_id}&class_id=${times[index].class_id}`,
      {},
      'POST'
    ).then(res => {
      if (res.message == 'OK') {
        this.dividetable(table_id);
        this.getfavorite(table_id);
      }
    });
  }

  closeColloction() {
    this.setState({
      showList1: !this.state.showList1
    });
  }
  chooseCourse(e) {
    index = e;
  }

  divideClass(item) {
    this.setState({
      showList1: !this.state.showList1
    });
    times = new Array();
    this.divideClass2(item);
    this.setState({
      list: times
    });
  }
  divideClass2(item) {
    var j = 0,
      state;
    title = item.classes[0].class_name;
    teacher = item.classes[0].teacher;
    course_id = item.course_id;
    item.classes.map((index, a) => {
      var i = 0,
        day;
      index.times.map((p, a) => {
        if (p.week_state == 1) state = '单';
        if (p.week_state == 2) state = '双';
        if (p.week_state == 0) state = '全';
        switch (p.day) {
          case 1:
            day = '一';
            break;
          case 2:
            day = '二';
            break;
          case 3:
            day = '三';
            break;
          case 4:
            day = '四';
            break;
          case 5:
            day = '五';
            break;
          case 6:
            day = '六';
            break;
          case 7:
            day = '日';
            break;
        }
        times.push({
          text: `周${day} ${p.time}节@`,
          checked: false,
          class_id: index.class_id,
          week_state: state
        });
      });
      times.map((p, a) => {
        if (j >= 1) {
          if (p.text.length < times[0].text.length) {
            p.text += index.places[i];
            i = i + 1;
          }
        } else {
          p.text += index.places[i];
          i = i + 1;
        }
      });
      j = j + 1;
    });
  }
  showList() {
    this.setState({
      showList: !this.state.showList
    });
  }

  handleClick(value) {
    this.setState({
      open: value
    });
  }

  addtable() {
    if (this.state.isclick) {
      this.setState({
        isclick: false
      });
      if (table_num < 3) {
        Fetch(`api/v1/table/?id=${0}`, {}, 'POST').then(res => {
          if (res.message == 'OK') {
            this.gettable();
          }
        });
      }
      setTimeout(() => {
        this.setState({
          isclick: true
        });
      }, 500);
    }
  }

  gettable() {
    Fetch('api/v1/table/', {}, 'GET').then(data => {
      if (data) {
        this.setState({
          data: data.data
        });
        table_num = data.data.table_num;
        const tablelist = data.data.table_list;
        this.state.navList = new Array();
        tablelist.map((item,i) => {
          this.state.navList.push({
            key: item.table_id,
            id: i,
            content: item.table_name
          });
        });
      }
    });
  }
  // eslint-disable-next-line no-shadow
  coursedetail(course, COURSESData) {
    conflictCourse = new Array();
    this.state.class_id = new Array();
    conflictCourse.push(course);
    this.state.class_id.push(course.class_id + '(课堂号）');
    course.times.map((p, i) => {
      COURSESData.map((e, j) => {
        if (e.course_id != course.course_id) {
          e.times.map(index => {
            if (index.start == p.start && index.day == p.day) {
              conflictCourse.push(e);
              this.state.class_id.push(e.class_id + '(课堂号）');
            }
          });
        }
      });
    });
    this.setState({
      open_coursedetail: !this.state.open_coursedetail
    });
    // this.setState({
    //     class_id:item.class_id+'(课堂号)'
    // })
    detailtimes = new Array();

    conflictCourse.map((item, k) => {
      var i = 0,
        j = 0,
        state,
        day;
      coursedetail.push(item);
      detailtimes[k] = new Array();
      item.times.map((p, i) => {
        if (p.week_state == 1) state = '单';
        if (p.week_state == 2) state = '双';
        if (p.week_state == 0) state = '全';
        switch (p.day) {
          case 1:
            day = '一';
            break;
          case 2:
            day = '二';
            break;
          case 3:
            day = '三';
            break;
          case 4:
            day = '四';
            break;
          case 5:
            day = '五';
            break;
          case 6:
            day = '六';
            break;
          case 7:
            day = '日';
            break;
        }
        detailtimes[k].push({
          text: `周${day} ${p.start}-${p.start + p.duration - 1}节@`,
          week_state: state
        });
      });
      detailtimes[k].map((p, i) => {
        if (j >= 1) {
          // console.log(times);
          if (p.text.length < times[0].text.length) {
            p.text += item.places[i];
            i = i + 1;
          }
        } else {
          p.text += item.places[i];
          i = i + 1;
        }
      });
      j = j + 1;
    });
  }

  conflictdetail() {
    console.log(this.state.conflictCourse);
    this.setState({
      open_coursedetail: !this.state.open_coursedetail
    });
    this.state.conflictCourse.map((item, i) => {
      this.coursedetail(item, i);
    });
  }

  // eslint-disable-next-line no-shadow
  deleteCourse(coursedetail, i) {
    this.setState({
      open_coursedetail: !this.state.open_coursedetail
    });
    Fetch(
      `api/v1/table/${table_id}/class/?course_id=${coursedetail.course_id}`,
      {},
      'DELETE'
    ).then(res => {
      if (res.message == 'OK') {
        this.dividetable(table_id);
        this.getfavorite(table_id);
        conflictCourse.splice(i + 1, 1);
      }
    });
  }
  closedetail() {
    this.setState({
      open_coursedetail: !this.state.open_coursedetail
    });
  }
  divideConflict(e) {
    conflictCourse.push(e);
  }
  courseColor(course) {
    switch (course) {
      case 0:
        return '#71D69D';
        break;
      case 1:
        return '#FC807F';
        break;
      case 2:
        return '#94C8FA';
        break;
      case 3:
        return '#71D69D';
        break;
      case 4:
        return '#FC807F';
        break;
      case 5:
        return '#71D69D';
        break;
    } //第四位判断
  }
  render() {
    const isFir = this.state.isFir;
    // eslint-disable-next-line no-shadow
    const { WEEKS, COURSES, COURSESData } = this.state;
    const scrollStyle = {
      height: '100%',
      width: '100%'
    };
    const scrollLeft = 0;
    const scrollTop = 0;
    const Threshold = 20;
    return (
      <View>
        {isFir && <MxGuide type="free1"></MxGuide>}
        {isFir && <MxGuide type="free2"></MxGuide>}
        <HeaderTab
          navList={this.state.navList}
          table_num={table_num}
          onGetIndex={this.getIndex.bind(this)}
          onGettable={this.gettable.bind(this)}
        ></HeaderTab>
        <View className="addtable">
          <MxButton
            src={add}
            buttonWidthI="33px"
            buttonHeightI="33px"
            buttonRadius="50%"
            buttonBackground="#6E66EE"
            imageWidth="18px"
            imageHeight="32px"
            onClick={this.addtable.bind(this)}
          ></MxButton>
        </View>
        <ScrollView
          className="scrollview"
          scrollY
          scrollX
          scrollWithAnimation
          scrollTop={scrollTop}
          scrollLeft={scrollLeft}
          style={scrollStyle}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
        >
          <View className="course">
            <View className="left">
              <View className="timeS">\</View>
              <View className="timeS">
                <View>
                  <Text className="number">1</Text>
                  <Text className="grayN">8:00</Text>
                </View>
              </View>
              <View className="timeS">
                <View className="number">
                  <Text>2</Text>
                </View>
              </View>
              <View className="timeS">
                <View>
                  <Text className="number">3</Text>
                  <Text className="grayN">10:10</Text>
                </View>
              </View>
              <View className="timeS">
                <View className="number">
                  <Text>4</Text>
                </View>
              </View>
              <View className="timeS">
                <View>
                  <Text className="number">5</Text>
                  <Text className="grayN">14:00</Text>
                </View>
              </View>
              <View className="timeS">
                <View className="number">
                  <Text>6</Text>
                </View>
              </View>
              <View className="timeS">
                <View>
                  <Text className="number">7</Text>
                  <Text className="grayN">16:10</Text>
                </View>
              </View>
              <View className="timeS">
                <View className="number">
                  <Text>8</Text>
                </View>
              </View>
              <View className="timeS">
                <View>
                  <Text className="number">9</Text>
                  <Text className="grayN">18:30</Text>
                </View>
              </View>
              <View className="timeS">
                <View className="number">
                  <Text>10</Text>
                </View>
              </View>
              <View className="timeS">
                <View>
                  <Text className="number">11</Text>
                  <Text className="grayN">20:15</Text>
                </View>
              </View>
              <View className="timeS">
                <View className="number">
                  <Text>12</Text>
                </View>
              </View>
            </View>
            {WEEKS.map(week => {
              return (
                <View className="middle" key={i}>
                  <View className="week">{WEEKS[week - 1]}</View>
                  {COURSES.map(i => (
                    <View className="courseF" key={i}></View>
                  ))}

                  {COURSESData[week - 1].map(course => (
                    <Course
                      className="muxi-card"
                      key={i}
                      course={course}
                      onConflict={this.divideConflict.bind(this)}
                      COURSESData={COURSESData[week - 1]}
                      week={week}
                      onClick={this.coursedetail.bind(
                        this,
                        course,
                        COURSESData[week - 1]
                      )}
                    >
                      {course.class_name}
                    </Course>
                  ))}
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View className="collect">
          <MxButton
            buttonRadius="50%"
            buttonWidth="120rpx"
            buttonHeight="120rpx"
            buttonBackground="#6E66EE"
            onClick={this.showList.bind(this)}
          >
            课
          </MxButton>
        </View>
        <FloatLayout
          isOpened={this.state.showList}
          title="课程清单"
          height="120"
        >
          {this.state.favoritelist ? (
            this.state.favoritelist.map(item => {
              switch (item.type) {
                case 0:
                  color = 'background:#71D69D';
                  break;
                case 1:
                  color = 'background:#94C8FA';
                  break;
                case 2:
                  color = 'background:#FC807F';
                  break;
                case 3:
                  color = 'background:#71D69D';
                  break;
                case 4:
                  color = 'background:#FC807F';
                  break;
                case 5:
                  color = 'background:#FFCB7B';
                  break;
              }
              return (
                <View
                  className="card"
                  style={color}
                  key={i}
                  onClick={this.divideClass.bind(this, item)}
                >
                  <View id="card-content">{item.classes[0].class_name}</View>
                </View>
              );
            })
          ) : (
            <View></View>
          )}
        </FloatLayout>
        <MxModal
          isOpened={this.state.showList1}
          top="50"
          title={title}
          teacher={teacher}
          onCancel={this.closeColloction.bind(this)}
          confirmText="加入课表"
          onConfirm={this.addfavorite.bind(this)}
        >
          <RadioGroup className="radioG">
            <ScrollView scrollY style={scrollStyle} scrollTop={scrollTop}>
              {this.state.list.map((item, i) => {
                return (
                  <Label className="checkbox-list__label" for={i} key={i}>
                    <Radio
                      className="checkbox-list__checkbox"
                      color="#6E66EE"
                      onClick={this.chooseCourse.bind(this, i)}
                      value={item.value}
                      checked={item.checked}
                    >
                      ({item.class_id}){item.text}({item.week_state})
                    </Radio>
                  </Label>
                );
              })}
            </ScrollView>
          </RadioGroup>
        </MxModal>
        <View
          className={this.state.open_coursedetail ? 'overlay' : 'hidoverlay'}
        >
          <ScrollView
            className="scroll"
            scrollY
            style={
              this.state.open_coursedetail
                ? 'height: 1000rpx;margin-top:200rpx'
                : ''
            }
            scrollTop={scrollTop}
          >
            {conflictCourse.map((item, i) => {
              return (
                <Modal
                  key={i}
                  isOpened={this.state.open_coursedetail}
                  cancelText="保留课程"
                  height="472"
                  contentHeight="315"
                  titleHeight="140"
                  confirmText="删除课程"
                  onCancel={this.closedetail.bind(this)}
                  onConfirm={this.deleteCourse.bind(this, item, i)}
                  title={item.class_name}
                  teacher={item.teacher}
                  class_id={this.state.class_id[i]}
                  top={50 * (i + 1)}
                >
                  <ScrollView
                    scrollY
                    style="height: 178rpx;"
                    scrollTop={scrollTop}
                  >
                    <View>
                      <View className="coursedetail">
                        <View className="detailbox">
                          {detailtimes[i].map(p => {
                            return (
                              <View key className="detailText">
                                {p.text}
                              </View>
                            );
                          })}
                        </View>
                      </View>
                      <View className="coursedetail">
                        <View>
                          {item.times.map(p => {
                            return (
                              <View key className="detailText">
                                {p.weeks}周{' '}
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </Modal>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
