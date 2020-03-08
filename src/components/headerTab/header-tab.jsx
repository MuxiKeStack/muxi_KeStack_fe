/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView ,Button,CoverView, Input} from '@tarojs/components'
import Fetch from '../../service/fetch'
import './header-tab.scss'

var newname;
export default class HeaderTab extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props){
    super(props)
    this.state = {
        currentTab:1,
        open:[],
        caninput:true,
        inputfocus:false,
        newname:'',
      }
    }
  switchNav (value,e){
    this.props.navList.map(nav=>{
      this.state.open[nav.key]=false
    })
      var cur = e.target.dataset.current;
      if(this.state.currentTab === cur){
        this.state.open[cur]=!this.state.open[cur]
    }
      else{
        this.setState({
          currentTab:cur
        })
      }
      this.props.onGetIndex(value);
  }
  componentWillMount(){
    this.setState({
      navList:this.props.navList,
      currentTab:this.props.navList[0].key
    })
    this.props.navList.map(nav=>{
      this.state.open[nav.key]=false
    })
  }
  newName(content){
    this.setState({
      caninput:!this.state.caninput,
      inputfocus:!this.state.inputfocus
    })
    newname=content
  }

  inputname(e){
    newname=e.detail.value
  }  
  pushnewName(id){
    Fetch(
      `api/v1/table/${id}/rename/`,
      {
        new_name:newname
      },
      'PUT'
    ).then(res=>{
      if(res.message=="OK"){
        this.props.OnGettable()
      }
    })
    this.setState({
      caninput:!this.state.caninput,
      inputfocus:!this.state.inputfocus
    })
  }
newtable(id){
  Fetch(
    `api/v1/table/?id=${id}`,
    {},
    'POST'
  ).then(res=>{
    if(res.message=="OK"){
      this.props.OnGettable()
    }
  })
}
deletetable(id){
  Fetch(
    `api/v1/table/${id}`,
    {},
    'DELETE'
  ).then(res=>{
    if(res.message=="OK"){
      this.props.OnGettable()
    }
  })
}
  render () {
    return (
      <View className='wrapper'>
            {this.props.navList.map((nav,i) =>
                <View className={this.state.currentTab===nav.key?'active':'normal'}  data-current={nav.key} onClick={this.switchNav.bind(this,nav.key)} key='0'>
                  { !this.state.caninput ?
                  <Input className='nameinput' value={nav.content} disabled={this.state.caninput} onInput={this.inputname.bind(this)} maxLength='5'onBlur={this.pushnewName.bind(this,nav.key)} ></Input>
                    :
                  nav.content
                  }
                      <View className={this.state.open[nav.key] ? 'menu_active':'menu_normal'}>
                          <CoverView >
                              <Button className='menuButton' onClick={this.newName.bind(this,nav.content)}>重命名</Button>
                              <Button className='menuButton' onClick={this.newtable.bind(this,nav.key)}>创建副本</Button>
                              <Button className='menuButton' onClick={this.deletetable.bind(this,nav.key)}>删除课表</Button>
                          </CoverView>
                      </View>
                </View>
            )}
    </View>
    )
  }
}


