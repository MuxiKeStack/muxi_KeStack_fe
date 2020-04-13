import Taro, { Component } from '@tarojs/taro'
import { View, Button,ScrollView,Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'
import PropTypes from 'prop-types'

export default class MxModal extends Component {
  constructor (props){
    super(props);
    this.state = {
      _isOpened:this.props.isOpened
    }
  }

  componentWillReceiveProps(nextProps){
    const {_isOpened} = this.state;

    if(_isOpened != nextProps.isOpened){
      this.setState({
        _isOpened:nextProps.isOpened
      });
    }
  }
  
  onClose = (e) => {
    if(this.props.closeOnClickOverlay){
      this.onCancel();
    }
  }

  onCancel = (e) =>{
    this.setState({
      _isOpened:false
    },
    this.props.onCancel())
  }
  
  onConfirm = (e) =>{
      this.props.onConfirm();
  }

  handleTouchMove = (e) =>{
    e.stopPropagation()
  }

  render () {
    const {_isOpened} = this.state;
    const {content,title,cancelText,confirmText,popup, animationType, height} = this.props;

    const rootClass = classNames('mp-modal',{
      'mp-modal--active':_isOpened
    });


    let isPopUp = false;

    if (popup) {
      isPopUp = true
      // eslint-disable-next-line no-unused-expressions
      animationType === 'slide-up' ? 'slide-up' : 'slide-down'
    }

    let contentHeight = `height:${height}px`;

    const popUpClass = classNames(
      {
        'mp-modal__container': !isPopUp,
        'mp-modal__popup': isPopUp,
        [`mp-modal__popup-${animationType}`]: isPopUp && animationType
      }
    );

    const isRenderFooter = cancelText || confirmText;

    return (
      <View className={rootClass} onTouchMove={this.handleTouchMove}>

            <View className='mp-modal__overlay' onClick={this.onClose}> </View>
            <View className={popUpClass}>
               {
                  title && <View className='mp-modal__title'>{title}</View>
               }
               <Text className='mp-icon mp-icon-closemodal' style='position:absolute;top:-11px;right:-9px;'  onClick={this.onClose}></Text>
               <View className='mp-modal__content' >
                {/* <ScrollView
                  scrollY
                >
                  { this.props.children }
                </ScrollView> */}
                { this.props.children }
               </View>
               {
                  isRenderFooter && (
                      <View  className='mp-modal__footer'>
                          <View className='mp-modal__action'>
                              {
                                cancelText && <Button onClick={this.onCancel}>{cancelText}</Button>
                              }
                              {
                                confirmText && <Button onClick={this.onConfirm}>{confirmText}</Button>
                              }
                          </View>
                     </View>
                  )
               }
            </View>
      </View>
    )
  }
}

MxModal.defaultProps = {
  closeOnClickOverlay:true,
  height:82
}

MxModal.propTypes = {
  title:PropTypes.string,
  isOpened:PropTypes.bool,
  onClose:PropTypes.func,
  onCancel:PropTypes.func,
  onConfirm:PropTypes.func,
  cancelText:PropTypes.string,
  confirmText:PropTypes.string
}
