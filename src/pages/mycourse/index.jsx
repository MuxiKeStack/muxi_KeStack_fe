import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { List } from '../../components/page/List'
import { Item } from '../../components/page/List/Item'
// import bgim from '../../assets/svg/bgim.svg'
import './index.scss'

export default class Index extends Component {
    constructor() {
        super(...arguments);
    }
    componentWillUnmount() { }
    config = {
        navigationBarTitleText: "我的课程"
    };

    componentDidMount() {
    }

    componentWillUnmount() { }

    componentDidHide() { }
    render() {

        return (
            <View>
            </View>

        )
    }
}
