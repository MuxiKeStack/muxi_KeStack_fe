/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView ,Button} from '@tarojs/components'
import AtAccordion from '../../components/common/MxAccordion'
import './header-tab.scss'


export default class HeaderTab extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props){
    super(props)
    this.state = {
      currentTab:1,
      open:false
      }
    }

    switchNav (value,e){
      var cur = e.target.dataset.current;
      if(this.state.currentTab === cur){
        this.setState({
          open: !this.state.open
      });
    }
      else{
        this.setState({
          currentTab:cur
        })
      }
      this.props.onGetIndex(value);
    }

    onScrollToUpper(e){
      console.log(e.detail)
    }
     
  onScroll(e){
      console.log(e.detail)
    }  
  render () {
    const scrollStyle = {
      height: '100%',
      width:'100%'
    }
    const scrollLeft = 0
        const scrollTop = 0
        const Threshold = 20
    return (
      <View>
          <ScrollView 
            className='swiper-tab'
            scrollY
            scrollX
            scrollWithAnimation
            scrollTop={scrollTop}
            scrollLeft={scrollLeft}
            style={scrollStyle}
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
            onScrollToUpper={this.onScrollToUpper.bind(this)}
            onScroll={this.onScroll}
          >
            {this.props.navList.map((nav) =>
                <View className={this.state.currentTab===nav.key?'active':'normal'} data-current={nav.key} onClick={this.switchNav.bind(this,nav.key)} key='0'>
                  {/* {nav.content} */}
                  <AtAccordion
                    open={this.state.open}
                    title={nav.content}
                    data-current={nav.key} onClick={this.switchNav.bind(this,nav.key)} key='0'
                  >
                    <View  className='menu'>
                            <Button className='menuButton'>重命名</Button>
                            <Button className='menuButton'>创建副本</Button>
                            <Button className='menuButton'>删除课表</Button>
                        </View>
                  </AtAccordion>
                </View>
            )}
          </ScrollView>
          {/* <View  className='menucard'>
            {this.props.navList.map((nav) =>
                  <View  className='menu' data-current={nav.key} onClick={this.switchNav.bind(this,nav.key)} key='0'>
                            <Button className='menuButton'>重命名</Button>
                            <Button className='menuButton'>创建副本</Button>
                            <Button className='menuButton'>删除课表</Button>
                  </View>
            )}
          </View> */}
    </View>
    )
  }
}


