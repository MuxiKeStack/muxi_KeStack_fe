import Taro, { Component } from '@tarojs/taro';
import PropTypes from "prop-types";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import { MxIcon } from '../../../common/MxIcon';
import "./index.scss";

export default class Item extends Component {
    constructor() {
        super(...arguments)
    }
    handleClick = (...args) => {
        this.props.onClick(...args);
    };
    render() {
        const { title, extraText, hasBgi, iconType } = this.props;
        const rootClass = classNames(
            "list-item",
            this.props.className
        );
        const setIconCenter={
            display: 'flex',
            'align-items': 'center',
        }

        return (
            <View className={rootClass} onClick={this.handleClick} >
                {!hasBgi && (<View className='item-container '>
                    <View className='icon'> 
                        <MxIcon type={iconType} width='44' height='45' className='item-icon' outerStyle={setIconCenter}></MxIcon>
                    </View>
                    <Text className='item-title'>{title}</Text>
                    <Text className='item-extra'>{extraText}</Text>
                </View>)}
                {hasBgi && (<View className='item-container background-img'>
                    <View className='icon'>
                        <MxIcon type={iconType} width='44' height='45' className='item-icon' outerStyle={setIconCenter}></MxIcon>
                    </View>
                    <Text className='item-title'>{title}</Text>
                    <Text className='item-extra'>{extraText}</Text>
                </View>)}
            </View>
        );
    }
}
Item.defaultProps = {
    className: '',
    title: '',
    extraText: '',
    customStyle: '',
    hasBgi: false,
    iconType: '',
}
Item.propTypes = {
    className: PropTypes.array,
    title: PropTypes.array,
    extraText: PropTypes.array,
    customStyle: PropTypes.array,
    hasBgi: PropTypes.bool,
    iconType: PropTypes.string,
}