import Taro, { Component } from '@tarojs/taro';
import { View,Text,Form,Button,Image } from '@tarojs/components';
import MxInput from '../../components/common/MxInput/MxInput';
import MxButton from '../../components/common/MxButton';
import MxIcon from '../../components/common/MxIcon';
import Fetch from '../../service/fetch';

export default class index extends Component {
  config = {
    navigationBarTitleText: '木犀课栈',
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      username: '',
      avatar:'',
      onfocus:false,
    };
  }

  componentWillMount() {}

  componentDidMount() {
    Fetch('api/v1/user/info',{},'GET').then(
        res=> {
          if(res){
              this.setState({
                username:res.data.username,
                avatar:res.data.avatr,
              })
            }
          }
      );
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onBlur(){
      this.setState({
          onFocus:false,
      })
  }
  toChangeName(e){
     this.setState({
         username:e.target.value,
     })
  }
  toChangeAvatar(){
      Taro.chooseImage({
        count: 1,
        sizeType:'compressed',
        success: (res) => {
          this.setState({
              avatar: res.tempFilePaths[0],//本地临时路径
          })
        //   this.uploadImage(res.tempFilePaths)
        },
        complete: () => {
        }     
      })
  }
//   nameChangeHandle(val) {
//     this.setState({
//       username: val,
//     });
//   }


  onSubmit() {
    if (this.state.name == '') {
      Taro.atMessage({
        message: '标题不能为空',
        type: 'warning',
      });
      return;
    }
    //上传数据
    Fetch()
    Taro.uploadFile({
      url:'http://kstack.test.muxi-tech.xyz/api/v1/user/info/',//上传头像的服务器接口
      filePath: this.state.avatar,
      name:'file',
      formData:{
        username:this.state.username,
        'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzUyMDg3MDIsImlkIjoxLCJuYmYiOjE1NzUyMDg3MDJ9.erNdOrNTLCD56D2UW0RmuYGGdfrPuO7hLZdtMtj1CdY'
      },
      success(res){
        console.log(res.data)
      }
    })
  }

  render() {
    const { files,username,avtar } = this.state;
    const inputclassname = onfocus?'input-start':'input-end';
    return (
      <View className='index'>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <View className='user-name'>
             <View>{昵称}</View>
             <Input
             className= {inputclassname}
             placeholder='你的昵称'
             placeholderClass='input-font'
             value={username}
             onChange={this.toChangeName.bind(this)}
             onFocus={this.handleFocus.bind(this)}
             onBlur={this.handleUnFocus.bind(this)}
             />
            {!onfocus&&(<MxIcon type='arrowR'></MxIcon>)}
          </View>
          <View className='avatar'>
              <Image src={avtar} onClick={this.toChangeAvatar.bind(this)} className='avatar'></Image>
              <MxIcon type='arrowR'></MxIcon>
          </View>
          <AtImagePicker files={files} onChange={this.filesChange.bind(this)} />
          <Button type='primary' formType='submit' size='200px' className='submit-button'>
            提交
          </Button>
        </Form>
      </View>
    );
  }
}
