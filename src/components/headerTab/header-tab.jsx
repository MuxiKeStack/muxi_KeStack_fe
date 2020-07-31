/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Input } from '@tarojs/components';
import Fetch from '../../service/fetch';
import './header-tab.scss';

var newname;
export default class HeaderTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
      open: [],
      caninput: true,
      inputfocus: false
    };
  }

  componentWillMount() {
    this.setState({
      currentTab: this.props.navList[0].id
    });
    this.props.navList.map(nav => {
      this.state.open[nav.id] = false;
    });
  }
  config = {
    navigationBarTitleText: '首页'
  };
  switchNav(value, e) {
    this.props.navList.map(nav => {
      this.state.open[nav.id] = false;
    });
    var cur = e;
    if (this.state.currentTab === cur) {
      const open = [...this.state.open];
      open[cur] = !open[cur];
      this.setState({
        open: open
      });
    } else {
      this.setState({
        currentTab: cur
      });
      this.props.onGetIndex(value);
    }
  }
  newName(content) {
    this.setState({
      caninput: !this.state.caninput,
      inputfocus: !this.state.inputfocus
    });
    newname = content;
  }

  inputname(e) {
    newname = e.detail.value;
  }
  pushnewName(id) {
    Fetch(
      `api/v1/table/${id}/rename/`,
      {
        new_name: newname
      },
      'PUT'
    ).then(res => {
      if (res.message == 'OK') {
        this.props.onGettable();
      }
    });
    this.setState({
      caninput: !this.state.caninput,
      inputfocus: !this.state.inputfocus
    });
  }
  newtable(id) {
    if (this.props.table_num < 3) {
      Fetch(`api/v1/table/?id=${id}`, {}, 'POST').then(res => {
        if (res.message == 'OK') {
          this.props.onGettable();
        }
      });
    }
  }
  deletetable(id, key) {
    Fetch(`api/v1/table/${id}/`, {}, 'DELETE').then(res => {
      if (res.message == 'OK') {
        this.props.onGettable();
        this.state.open[key] = false;
      }
    });
  }
  render() {
    return (
      <View className="wrapper">
        {this.props.navList.map(nav => (
          <View
            className={this.state.currentTab === nav.id ? 'active' : 'normal'}
            data-current={nav.key}
            onClick={this.switchNav.bind(this, nav.key, nav.id)}
            key="0"
          >
            {!this.state.caninput ? (
              <Input
                className="nameinput"
                value={nav.content}
                disabled={this.state.caninput}
                onInput={this.inputname.bind(this)}
                maxLength="5"
                onBlur={this.pushnewName.bind(this, nav.key)}
              ></Input>
            ) : (
              nav.content
            )}
            <View
              className={
                this.state.open[nav.id] ? 'menu_active' : 'menu_normal'
              }
            >
              <Button
                className="menuButton"
                onClick={this.newName.bind(this, nav.content)}
              >
                重命名
              </Button>
              <Button
                className="menuButton"
                onClick={this.newtable.bind(this, nav.key)}
              >
                创建副本
              </Button>
              <Button
                className="menuButton"
                onClick={this.deletetable.bind(this, nav.key, nav.id)}
              >
                删除课表
              </Button>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
