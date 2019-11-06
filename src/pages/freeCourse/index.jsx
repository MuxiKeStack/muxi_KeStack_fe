import Taro, { Component } from '@tarojs/taro'
import { View, Image ,Form} from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillUnmount() { }
    config = {
        navigationBarTitleText: "自由排课"
    };

    componentDidMount() {}

    componentWillUnmount() { }

    componentDidHide() { }
    render() {
        return (
            <View>
                {/* <Table>
                <tr>
                    <th width="76"> </th>
                    <th width="86" height="50"> </th>
                    <th width="100">周一</th>
                    <th width="100">周二</th>
                    <th width="100">周三</th>
                    <th width="100">周四</th>
                    <th width="100">周五</th>
                    <th width="100">周六</th>
                    <th width="108">周日</th>
                </tr>
                <tr>
                    <td rowspan="4">上午</td>
                    <td>1</td>
                    <td rowspan="2">课程1</td>
                    <td rowspan="2">课程2</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程3</td>
                    <td rowspan="2">课程4</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2"> </td>
                </tr>
                <tr>
                    <td>2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td rowspan="2">课程5</td>
                    <td rowspan="2">课程6</td>
                    <td rowspan="2">课程7</td>
                    <td rowspan="2">课程8</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程9</td>
                    <td rowspan="2"> </td>
                    </tr>
                <tr>
                    <td>4</td>
                </tr>
                <tr>
                    <td colspan="9" align="center"><b>午休</b></td>
                </tr>
                <tr>
                    <td rowspan="4">下午</td>
                    <td>5</td>
                    <td rowspan="2">课程10</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程11</td>
                    <td rowspan="2">课程12</td>
                    <td rowspan="2">课程13</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2"> </td>
                </tr>
                <tr>
                    <td>6</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程14</td>
                    <td rowspan="2">课程15</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2">课程16</td>
                    <td rowspan="2"> </td>
                    <td rowspan="2"> </td>
                </tr>
                <tr>
                    <td>8</td>
                </tr>
            </Table> */}
            <Form>11</Form>
            </View>

        )
    }
}
