import Taro from "@tarojs/taro";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { Image, View } from "@tarojs/components";
import MxComponent from "../../../common/component";
import add from "../../../assets/svg/add.svg";
import avatar from "../../../assets/svg/avatar-img.svg";
import check from "../../../assets/svg/check.svg";
import cmmtBtn from "../../../assets/svg/cmmt-btn.svg";
import cmmtSq from "../../../assets/svg/cmmt-squa.svg";
import cmmtSqG from "../../../assets/svg/cmmt-squaG.svg";
import cross from "../../../assets/svg/cross.svg";
import hollowC from "../../../assets/svg/hollow-circle.svg";
import largeC from "../../../assets/svg/large-circle.svg";
import likeBtn from "../../../assets/svg/like-btn.svg";
import search from "../../../assets/svg/searchicon.svg";
import sHelper from "../../../assets/svg/shelper.svg";
import sHelperG from "../../../assets/svg/shelperG.svg";
import solidC from "../../../assets/svg/solid-circle.svg";
import solidS from "../../../assets/svg/solid-star.svg";
import square from "../../../assets/svg/square.svg";
import triangle from "../../../assets/svg/triangle.svg";
import userInf from "../../../assets/svg/user-info.svg";
import userInfG from "../../../assets/svg/user-infoG.svg";
import courseList from '../../../assets/svg/courseList.svg';
import history from '../../../assets/svg/history.svg';
import message from '../../../assets/svg/message.svg';
import myCourse from '../../../assets/svg/myCourse.svg';

import "./index.scss";

export default class MxIcon extends MxComponent {
  constructor() {
    super(...arguments);
    if (process.env.NODE_ENV === "test") {
      Taro.initPxTransform({ designWidth: 750 });
    }
  }

  handleClick() {
    this.props.onClick(...arguments);
  }

  render() {
    const {
      className,
      width,
      height,
      type,
    } = this.props;
    const map = new Map([
        ['add', add],
        ['avatar',avatar],
        ['check',check],
        ['cmmtBtn',cmmtBtn],
        ['cmmtSq',cmmtSq],
        ['cmmtSqG',cmmtSqG],
        ['cross',cross],
        ['hollowC',hollowC],
        ['largeC',largeC],
        ['likeBtn',likeBtn],
        ['search',search],
        ['sHelper',sHelper],
        ['sHelperG',sHelperG],
        ['solidC',solidC],
        ['solidS',solidS],
        ['square',square],
        ['triangle',triangle],
        ['userInf',userInf],
        ['userInfG',userInfG],
        ['courseList',courseList],
        ['history',history],
        ['message',message],
        ['myCourse',myCourse],
      ]);
      

    const rootStyle = {
      width: `${Taro.pxTransform(parseInt(width))}`,
      height: `${Taro.pxTransform(parseInt(height))}`,
    };
    const rootClass = classNames('icon-container',this.props.className);
    return (
      <View className={rootClass} >
      <Image
        className='image-icon'
        style={rootStyle}
        src={map.get(type)}
        onClick={this.handleClick.bind(this)}
      ></Image>
      </View>
    );
  }
}
MxIcon.defaultProps = {
  className: "",
  width: 40,
  height: 40,
  type: "",
  onClick: () => {}
};

MxIcon.propTypes = {
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  onChange: PropTypes.func,
}
