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
            radius,
        } = this.props

        var left = leftSrc ? true : false;
        var right = rightSrc ? true : false;
        const borderBottom = border ? '1px solid #707070' : ''

        const css={
            left:{
                width: `${leftSize}`,
                height: `${leftSize}`
            },
            right:{
                width: `${rightSize}`,
                height: `${rightSize}`,
                float: 'right'
            },
            input:{
                height: `${height}`
            },
            box:{
                width: `${width}`,
                height: `${height}`,
                background: `${background}`,
                borderBottom: `${borderBottom}`,
                borderRadius: `${radius}`
            }
        }
        return(
            <View style={css.box} className='box'>
                {left && <Image style={css.left} src={leftSrc} onClick={this.onClick}></Image>}
                <Input
                  style={css.input}
                  type={type}
                  placeholder={placeholder}
                  onInput={this.onInput}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onConfirm={this.onConfirm}
                />
                {right && <Image style={css.right} src={rightSrc} onClick={this.onClick}></Image>}
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
    background: '#ffffff',
    radius: '52px',
    
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onConfirm: () => {}
}

export default MxInput;