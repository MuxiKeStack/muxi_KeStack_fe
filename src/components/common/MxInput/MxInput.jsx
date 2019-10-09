import Taro, {Component} from '@tarojs/taro'
import {Input, View, Image} from '@tarojs/components'
import './MxInput.scss'

class MxInput extends Component{
    onInput = event => this.props.onChange(event.target.value, event)
    onFocus = event => this.props.onFocus(event.target.value, event)
    onBlur = event => {
        this.props.onBlur(event.target.value, event)
        this.props.onChange(event.target.value, event)
    }
    onConfirm = event => this.props.onConfirm(event.target.value, event)
    onClick = () => !this.props.editable && this.props.onClick()


    render(){
        const{
            leftSrc,
            rightSrc,
            leftSize,
            rightSize,
            type,
            width,
            height,
            placeholder,
            border,
            background,
            radius
        } = this.props

        // 左右图标
        var left = leftSrc ? true : false;
        var right = rightSrc ? true : false;

        const leftStyle={
            width: `${leftSize}`,
            height: `${leftSize}`
        }
        const rightStyle={
            width: `${rightSize}`,
            height: `${rightSize}`,
            float: 'right'
        }

        const inputStyle={
            height: `${height}`,
        }
        const boxStyle={
            width: `${width}`,
            height: `${height}`,
            background: `${background}`
        }
        // 关于border-radius和border-bottom的问题没有解决
        var inputName = ''
        if(radius){
            inputName = 'haveRadius'
        }
        
        var boxName = ''
        if(border){
            boxName = 'haveBorder'
        }

        return(
            <View style={boxStyle} className={boxName}>
                {left && <Image style={leftStyle} src={leftSrc} onClick={this.onClick}></Image>}
                <Input
                    className={inputName}
                    style={inputStyle}
                    type={type}
                    placeholder={placeholder}
                    onInput={this.onInput}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onConfirm={this.onConfirm}
                />
                {right && <Image style={rightStyle} src={rightSrc} onClick={this.onClick}></Image>}
            </View>
        )
    }
}

MxInput.defaultProps = {
    leftSize: '30px',
    rightSize: '30px',
    leftSrc: '',
    rightSrc: '',
    type: 'text',
    width: '250px',
    height: '30px',
    placeholder: '',
    background: '#FFFFFF',
    radius: '0px',
    
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onConfirm: () => {}
}

export default MxInput;