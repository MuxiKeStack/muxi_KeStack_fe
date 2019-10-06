import Taro, {Component} from '@tarojs/taro'
import {Input, View, Image} from '@tarojs/components'
import './MuxiInput.scss'

function getInputProps(props){
    const actualProps = {
        pre: props.pre,
        post: props.post
    }
    switch(actualProps.pre){
        case 'true':
            actualProps.pre = 'inline-block'
            break
        case 'false':
            actualProps.pre = 'none'
            break
        default:
            actualProps.pre = 'none'
            break
    }
    switch(actualProps.post){
        case 'true':
            actualProps.post = 'inline-block'
            break
        case 'false':
            actualProps.post = 'none'
            break
        default:
            actualProps.post = 'none'
            break
    }
    return actualProps
}


class MuxiInput extends Component{
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
            placeholder,
            type,
            imgHeight,
            imgWidth,
            border,
            inputWidth,
            inputHeight,
            presrc,
            postsrc,
        } = this.props

        const {
            pre,
            post
        } = getInputProps(this.props)

        const preImgStyle={
            width: `${imgWidth}`,
            height: `${imgHeight}`,
            display: `${pre}`
        }
        const postImgStyle={
            width: `${imgWidth}`,
            height: `${imgHeight}`,
            display: `${post}`,
            float: 'right'
        }
        const inputStyle={
            display: 'inline-block',
        }
        const boxStyle={
            border: `${border}`,
            width: `${inputWidth}`,
            height: `${inputHeight}`,
        }

        return(
            <View style={boxStyle}>
                <Image style={preImgStyle} src={presrc} onClick={this.onClick}></Image>
                <Input
                    style={inputStyle}
                    type={type}
                    placeholder={placeholder}
                    onInput={this.onInput}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onConfirm={this.onConfirm}
                />
                <Image style={postImgStyle} src={postsrc} onClick={this.onClick}></Image>
            </View>
        )
    }
}

MuxiInput.defaultProps = {
    border: '1px solid black',
    inputWidth: '250px',
    inputHeight: '30px',
    imgHeight: '30px',
    imgWidth: '30px',
    pre: 'none',
    post: 'none',
    presrc: '',
    postsrc: '',
    className: '',
    placeholder: '',
    type: 'text',
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onConfirm: () => {}
}

export default MuxiInput;