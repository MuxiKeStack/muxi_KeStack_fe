import Taro, { Component } from '@tarojs/taro'
import { View, Text, } from '@tarojs/components'
import { MxPicker } from '../../components/common/MxPicker'
import { MxIcon } from '../../components/common/MxIcon'
import './index.scss'
// import {isLogined} from 'utils/tools'
// import { courseList} from 'sevices/course'
// import { serverUrl } from  'utils/config'

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [
                { id: 1, courseName: '线性代数', teacherName: '(李书刚)', isComment: 'false' },
                { id: 2, courseName: '线性代数aaa', teacherName: '(李书刚bbb)', isComment: 'true' },
            ],
            selectorCheckedY: "选择学年",
            selectorCheckedT: "选择学期",
        }
        this.selectoryears=['2018-2019','2017-2018']
        this.selectorterms=['第一学期','第二学期']

    }
    componentWillUnmount() { }
    config = {
        navigationBarTitleText: "我的课程",
    };

    componentDidMount() {
        /*        courseList().then(res => {
                    console.log(res);
                    this.setState({
                        course: res.info,
                    });
                });*/
    }

    componentWillUnmount() { }

    componentDidHide() { }
    handleChangeY = e => {
        this.setState({
          selectorCheckedY: this.selectoryears[e.detail.value]
        });
      };
    handleChangeT = e => {
        this.setState({
          selectorCheckedT: this.selectorterms[e.detail.value]
        });
      };
     
    render() {
        const { courses } = this.state;
        const leftIcon = courses.isComment ? 'solidC' : 'hollowC'
        const rightIcon = courses.isComment ? 'check' : 'square'
        const hasComment = courses.isComment ? '已评课' : '未评课'
        return (
            <View className='index'>
                <View className='mycourse_page-picker-container'>
                    <View className='select-year'>
                        <MxPicker width='257' selector={this.selectoryears}
                          selectorChecked={this.state.selectorCheckedY}
                          onChange={this.handleChangeY.bind(this)}
                          className='iamdying'
                        />
                    </View>
                    <View  className='select-term'>
                        <MxPicker width='267' selector={this.selectorterms}
                          selectorChecked={this.state.selectorCheckedT}
                          onChange={this.handleChangeT.bind(this)}
                        />
                    </View>
                </View>
                {courses.map(course => {
                    return (
                        <View onClick={() =>
                            Taro.navigateTo({ url: '/pages/somename/index?id=' + course.id })
                        }
                          key={course.id}
                          className='mycourse_page-courselist-item'
                        >
                            <MxIcon className='left-icon' type={leftIcon}></MxIcon>
                            <Text className='course-name'>{course.courseName}</Text>
                            <Text className='teacher-name'>{course.teacherName}</Text>
                            <Text className='is-comment'>{hasComment}</Text>
                            <MxIcon className='right-icon' type={rightIcon}></MxIcon>
                         </View>
                    );
                })}
            </View>

        )
    }
}
