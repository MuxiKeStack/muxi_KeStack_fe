import Taro,{Component} from '@tarojs/taro';
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
        const { title, extraText,hasBgi,iconType  } = this.props;
        const rootClass = classNames(
            "list-item",
            this.props.className
        );
        
        return (
            <View className={rootClass} onClick={this.handleClick} >
                {!hasBgi &&(<View className='item-container '>
                    <MxIcon type={iconType} width='44' height='45' className='item-icon'></MxIcon>
                    <Text className='item-title'>{title}</Text>
                    <Text className='item-extra'>{extraText}</Text>
                    <Text className='clear'></Text>
                </View>)}
                {hasBgi &&(<View className='item-container background-img'>
                    <MxIcon type={iconType} width='44' height='45' className='item-icon'></MxIcon>
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