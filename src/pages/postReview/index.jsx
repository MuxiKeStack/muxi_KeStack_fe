import Taro, { Component } from '@tarojs/taro'
import { View, Textarea, CheckboxGroup, Checkbox } from '@tarojs/components'
import './index.scss'
import MxButton from '../../components/common/MxButton/index'
import MxRate from '../../components/common/MxRate/MxRate'
import MxIcon from '../../components/common/MxIcon'
import MxPicker from '../../components/common/MxPicker'
import MxTag from '../../components/common/MxTag'
import Fetch from '../../service/fetch'
import MxCheckbox from '../../components/common/MxCheckbox'

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
            value: 5,
            checkedList: [],
            tagsReceive: [],
            tagsState: [-1,-1,-1,-1,-1,-1],
            "course_id": "string",
            "course_name": "(只能评价自己上过的课程哦)",
            "rate": 0,
            "attendance_check_type": 0,
            "exam_check_type": 0,
            "tags": new Array(),
            "content": "啦啦啦",
            "is_anonymous": false,
        };
        this.course = ["高等数学B1（张圆）", "经济学（池毛毛）"];
        this.filterA = ["经常点名", "偶尔点名", "手机签到"];
        this.filterB = ["闭卷考试", "开卷考试", "论文考核", "无考核"];
        this.checkboxOption = [{
            value: 'true',
            label: '匿名评价',
        }]
    }

    handleChangeCheck(value) {
        if(value=='ture'){
        this.setState({
            checkedList: value,
            is_anonymous: true
        })} else {
            this.setState({
                checkedList: value,
                is_anonymous: false
            })
        }
    }

    handleClickTag(num) {
        var local = this.state.tagsState[num]
        var States = this.state.tagsState
        var lists = this.state.tags;
        if(local==-1){
        local=lists.push(this.state.tagsReceive[num].Id)-1
        States[num] = local
        this.setState({
            tags: lists,
            tagsState: States
        })} else {
            States[num]=-1
            lists.splice(local,1)
            this.setState({
                tags: lists,
                tagsState: States
            })
        }
    }



    handleClickRate(value) {
        this.setState({
            value
        })
    }

    handleClickContent(event) {
        this.setState({
            content: event.detail.value
        })
    }
    onClickCheckbox(event) {
        if (event.detail.value == "true") {
            this.setState({
                is_anonymous: true
            })
        } else {
            this.setState({
                is_anonymous: false
            })
        }
    }

    handleChangeCourse = e => {
        this.setState({
            courseChecked: this.course[e.detail.value]
        });
    };
    handleChangeFilterA = e => {
        var attendlist=['经常点名','偶尔点名','手机签到']
        this.setState({
            filterAChecked: this.filterA[e.detail.value],
            attendance_check_type: attendlist.indexOf(this.filterA[e.detail.value])
        });
    };
    handleChangeFilterB = e => {
        var testlist = ['闭卷考试','开卷考试','论文考核','无考核']
        this.setState({
            filterBChecked: this.filterB[e.detail.value],
            exam_check_type: testlist.indexOf(this.filterB[e.detail.value])
        });
    };

    ChangeTosquare() {
        var post = {
            "attendance_check_type": this.state.attendance_check_type,
            "content": this.state.content,
            "course_id": "112d34testsvggase",
            "course_name": "高等数学A",
            "exam_check_type": this.state.exam_check_type,
            "is_anonymous": this.state.is_anonymous,
            "rate": this.state.value,
            "tags": this.state.tags
        }
            Fetch(
                'api/v1/evaluation',
                post,
                'POST'
                ).then(data =>{
                if(data){
                    console.log(data)
                }
            }) 
        Taro.switchTab({
                url: '/pages/commentSquare/index'
            });
    }

    componentWillMount() {
        Fetch(
            'api/v1/tags',
            {},
            'GET'
        ).then(data => {
            if (data) {
                this.setState({
                    tagsReceive: data.data.list
                })
            }
        })

    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        const rate = 3
        return (
            <View style='display:block'>
                <View className='choiceBox' >
                    <View>
                        <View className='nameText'>选择课程：</View>
                    </View>
                    <View className='pickerStyle'>
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
                    <View className='nameText'>评价星级：</View>
                    <View className='commentRate'>
                        <MxRate
                            className='commentRate'
                            value={this.state.value}
                            onChange={this.handleClickRate.bind(this)}
                        ></MxRate>
                    </View>
                    <View className='clickText'>(点选)</View>
                </View>
                <View className='filterBox' >
                    <View>
                        <View className='nameText'>筛选标签：</View>
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
                    <View className='nameText'>选择课程：</View>
                </View>
                <View className='tagsBox'>
                    <View>
                        <MxTag
                            onClick={this.handleClickTag.bind(this,0)}
                            font='28rpx'
                            checkable={true}
                            padding='1rpx 44rpx 1rpx 44rpx'
                        >{this.state.tagsReceive[0].Name}</MxTag>
                        <View className='featureTagLev'>
                            <MxTag
                                onClick={this.handleClickTag.bind(this,1)}
                                font='28rpx'
                                checkable={true}
                                padding='1rpx 44rpx 1rpx 44rpx'
                            >{this.state.tagsReceive[1].Name}</MxTag>
                        </View>
                        <View className='featureTagLev'>
                            <MxTag
                                onClick={this.handleClickTag.bind(this,2)}
                                font='28rpx'
                                checkable={true}
                                padding='1rpx 44rpx 1rpx 44rpx'
                            >{this.state.tagsReceive[2].Name}</MxTag>
                        </View>
                    </View>
                    <View className='featureTagVer'>
                        <MxTag
                            onClick={this.handleClickTag.bind(this,3)}
                            font='28rpx'
                            checkable={true}
                            padding='1rpx 44rpx 1rpx 44rpx'
                        >{this.state.tagsReceive[3].Name}</MxTag>
                        <View className='featureTagLev'>
                            <MxTag
                                onClick={this.handleClickTag.bind(this,4)}
                                font='28rpx'
                                checkable={true}
                                padding='1rpx 44rpx 1rpx 44rpx'
                            >{this.state.tagsReceive[4].Name}</MxTag>
                            <View className='featureTagLev'>
                                <MxTag
                                    onClick={this.handleClickTag.bind(this,5)}
                                    font='28rpx'
                                    checkable={true}
                                    padding='1rpx 16rpx 1rpx 16rpx'
                                >{this.state.tagsReceive[5].Name}</MxTag></View>
                        </View>
                    </View>
                </View>
                <View className='evaluateBox' >
                    <Textarea
                        autoFocus={true}
                        placeholder='输入课程评价：'
                        placeholderClass='evalutatePlaceholder'
                        className='evaluateTextarea'
                        onInput={this.handleClickContent.bind(this)}></Textarea>
                    <MxCheckbox
                        options={this.checkboxOption}
                        selectedList={this.state.checkedList}
                        onChange={this.handleChangeCheck.bind(this)}
                    />
                </View>
                <View className='submitBox' onClick={this.ChangeTosquare.bind(this)}>
                        <View className='button'>发布</View>
                </View>
            </View>
        )
    }
}