import Taro,{Component} from '@tarojs/taro';
import PropTypes from "prop-types";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";

import "./index.scss";

export default class Item extends Component {
    constructor() {
        super(...arguments)
    }
    handleClick = (...args) => {
        this.props.onClick(...args);
    };
    render() {
        const { title, extraText,hasBgi  } = this.props;
        const rootClass = classNames(
            "list-item",
            this.props.className
        );
        
        return (
            <View className={rootClass} onClick={this.handleClick} >
                {hasBgi &&(<View className='item-container'>
                    <Text className='item-title'>{title}</Text>
                    <Text className='item-extra'>{extraText}</Text>
                    <Text className='clear'></Text>
                </View>)}
                {!hasBgi &&(<View className='item-container' style='background-image: url(../../../../assets/svg/bgim.svg)'>
                    <Text className='item-title'>{title}</Text>
                    <Text className='item-extra'>{extraText}</Text>
                    <Text className='clear'></Text>
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
    hasBgi:false,
}
Item.propTypes = {
    className: PropTypes.array,
    title: PropTypes.array,
    extraText: PropTypes.array,
    customStyle: PropTypes.array,
    hasBgi: PropTypes.bool,
}