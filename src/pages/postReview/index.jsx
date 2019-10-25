import Taro, { Component } from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import './index.scss'
import MxButton from '../../components/common/MxButton/index'
import MxRate from '../../components/common/MxRate/MxRate'
import MxIcon from '../../components/common/MxIcon'
import MxPicker from '../../components/common/MxPicker'
import MxTag from '../../components/common/MxTag'

export default class Index extends Component {

    config = {
        navigationBarTitleText: '首页',
    }

    constructor() {
        super(...arguments);
        this.state = {
            courseChecked: "(只能评价自己上过的课程哦)",
            filterAChecked: "(考勤方式)",
            filterBChecked: "(考核方式)",
        };
        this.course = ["高等数学B1（张圆）", "经济学（池毛毛）"];
        this.filterA = ["经常点名", "偶尔点名", "手机签到"];
        this.filterB = ["闭卷考试", "开卷考试", "论文考核", "无考核"];
    }

    handleClick() {
    }

    handleChangeCourse = e => {
        this.setState({
            courseChecked: this.course[e.detail.value]
        });
    };
    handleChangeFilterA = e => {
        this.setState({
            filterAChecked: this.filterA[e.detail.value]
        });
    };
    handleChangeFilterB = e => {
        this.setState({
            filterBChecked: this.filterB[e.detail.value]
        });
    };

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        const rate = 3
        return (
            <View style='display:block'>
                <View className='releaseBox'>
                    <View>
                        <MxIcon type='triangle' className='releaseTri' />
                        <View className='releaseText'>发布评课</View>
                    </View>
                </View>
                <View className='choiceBox' >
                    <View>
                        <View style='color:red'>*</View>
                        <View>选择课程:</View>
                    </View>
                    <View>
                        <MxPicker
                            selectorChecked={this.state.courseChecked}
                            selector={this.course}
                            width='430'
                            onChange={this.handleChangeCourse.bind(this)}
                            className='choicePicker'
                        />
                    </View>
                </View>
                <View className='commentBox'>
                    <View style='color:red'>*</View>
                    <View>评价星级: </View>
                    <View className='commentRate'>
                        <MxRate
                            comment={false}
                            value={rate}
                        />
                    </View>
                </View>
                <View className='filterBox' >
                    <View>
                        <View>筛选标签:</View>
                    </View>
                    <View>
                        <MxPicker
                            selectorChecked={this.state.filterAChecked}
                            selector={this.filterA}
                            width='180'
                            onChange={this.handleChangeFilterA.bind(this)}
                            className='filterPickerA'
                        />
                        <MxPicker
                            selectorChecked={this.state.filterBChecked}
                            selector={this.filterB}
                            width='180'
                            onChange={this.handleChangeFilterB.bind(this)}
                            className='filterPickerB'
                        />
                    </View>
                </View>
                <View className='featureBox' >
                    <View>
                        <View className='featureChoice'>选择课程:</View>
                    </View>
                    <View className='featureTags'>
                        <View>
                            <MxTag width='80px' borderRadius='12px' height='25px' font='12px'>简单易学</MxTag>
                            <View className='featureTagLev'><MxTag width='80px' borderRadius='12px' height='24px' font='12px'>干货满满</MxTag></View>
                        </View>
                        <View className='featureTagVer'>
                            <MxTag width='80px' borderRadius='12px' height='25px' font='12px'>生动有趣</MxTag>
                            <View className='featureTagLev'><MxTag width='80px' borderRadius='12px' height='24px' font='12px'>作业量少</MxTag></View>
                        </View>
                        <View className='featureTagVer'>
                            <MxTag width='80px' borderRadius='12px' height='25px' font='12px'>老师温柔</MxTag>
                            <View className='featureTagLev'><MxTag width='80px' borderRadius='12px' height='24px' font='12px'>云课堂资料全</MxTag></View>
                        </View>
                    </View>
                </View>
                <View className='evaluateBox' >
                    <Textarea placeholder='输入课程评价：' className='evaluateTextarea'></Textarea>
                    <Checkbox value='选中' >匿名发布</Checkbox>
                </View>
                <View className='submitBox'>
                    <MxButton>发布</MxButton>
                </View>
            </View>
        )
    }
}
