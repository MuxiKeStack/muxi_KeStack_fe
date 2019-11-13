import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './courseCommentsDetails.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import MxIcon from '../../components/common/MxIcon/index';
import Fetch from '../../service/fetch';

export default class Coursecommentsdetails extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      ancestor: {
        id: '',
        is_like: '',
        like_num: '',
        comment_num: ''
      }
    };
    var arr = [
      {
        id: 0,
        comment_id: 0,
        content:
          '真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？',
        like_num: 17,
        is_like: false,
        time: '2019.8.23/11:04',
        is_anonymous: true,
        user_info: {
          username: '用户1',
          avatar:
            'https://img-blog.csdnimg.cn/20190328192720764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
        },
        sub_comments_num: 7,
        sub_comments_list: [
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户1',
              avatar:
                'https://img-blog.csdnimg.cn/20190328192720764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户2',
              avatar: 'string'
            }
          }
        ]
      },
      {
        id: 0,
        comment_id: 0,
        content:
          '文院的可以选吗？文院的可以选吗？文院的可以选吗？文院的可以选吗？文院的可以选吗？',
        like_num: 17,
        is_like: false,
        time: '2019.8.23/11:04',
        is_anonymous: true,
        user_info: {
          username: '用户3',
          avatar:
            'https://img-blog.csdnimg.cn/20191029221050860.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
        },
        sub_comments_num: 2,
        sub_comments_list: [
          {
            id: 0,
            content: '你何必想不开',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户4',
              avatar:
                'https://img-blog.csdnimg.cn/20190409105622471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户3',
              avatar: 'string'
            }
          },
          {
            id: 0,
            content: '文院的咋就不能选',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户5',
              avatar:
                'https://img-blog.csdnimg.cn/20190526131401464.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户4',
              avatar: 'string'
            }
          }
        ]
      }
    ];
    arr.map(item => {
      if (item.sub_comments_num > 5) {
        var num = item.sub_comments_list.length - 5;
        item.sub_comments_list.splice(5, num);
      }
      return arr;
    });
    var arr2 = [
      {
        id: 0,
        comment_id: 0,
        content:
          '真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？',
        like_num: 17,
        is_like: false,
        time: '2019.8.23/11:04',
        is_anonymous: true,
        user_info: {
          username: '用户1',
          avatar:
            'https://img-blog.csdnimg.cn/20190328192720764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
        },
        sub_comments_num: 7,
        sub_comments_list: [
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户2',
              avatar:
                'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户1',
              avatar: ''
            }
          },
          {
            id: 0,
            content:
              '好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户1',
              avatar:
                'https://img-blog.csdnimg.cn/20190328192720764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户2',
              avatar: 'string'
            }
          }
        ]
      },
      {
        id: 0,
        comment_id: 0,
        content:
          '文院的可以选吗？文院的可以选吗？文院的可以选吗？文院的可以选吗？文院的可以选吗？',
        like_num: 17,
        is_like: false,
        time: '2019.8.23/11:04',
        is_anonymous: true,
        user_info: {
          username: '用户3',
          avatar:
            'https://img-blog.csdnimg.cn/20191029221050860.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
        },
        sub_comments_num: 2,
        sub_comments_list: [
          {
            id: 0,
            content: '你何必想不开',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户4',
              avatar:
                'https://img-blog.csdnimg.cn/20190409105622471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户3',
              avatar: 'string'
            }
          },
          {
            id: 0,
            content: '文院的咋就不能选',
            like_num: 4,
            is_like: false,
            time: '2019.8.23/18.33',
            is_anonymous: false,
            user_info: {
              username: '用户5',
              avatar:
                'https://img-blog.csdnimg.cn/20190526131401464.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            target_user_info: {
              username: '用户4',
              avatar: 'string'
            }
          }
        ]
      }
    ];
    this.state = {
      commentsList: arr,
      commentsListBefore: arr2
    };
  }
  componentWillMount() {}
  componentDidMount() {}

  componentWillUnmount() {}
  config = {
    navigationBarTitleText: '首页'
  };

  componentDidShow() {}

  componentDidHide() {}

  toShow() {
    this.setState({
      commentsList: this.state.commentsListBefore
    });
    console.log('toshow');
    console.log(this.state.commentsListBefore);
  }
  toLike(id, e) {
    var token;
    Taro.getStorage({ key: 'token' }).then(res => {
      token = res;
    });
    Fetch(
      '/like',
      {
        token: token,
        id: id,
        data: {
          is_like: true
        }
      },
      'PUT'
    )
      .then(data => {
        if (data) {
          Taro.showToast({
            title: '点赞成功'
          });
          this.setState({
            is_like: true,
            like_num: this.state.like_num + 1
          });
        }
      })
      .then(statusCode => {
        if (statusCode) {
          Taro.showToast({
            title: '网络错误，请重新尝试',
            icon: 'none'
          });
        }
      });
  }
  toDislike(id, e) {
    var token;
    Taro.getStorage({ key: 'token' }).then(res => {
      token = res;
    });
    Fetch(
      '/like',
      {
        token: token,
        id: id,
        data: {
          is_like: false
        }
      },
      'PUT'
    )
      .then(data => {
        if (data) {
          Taro.showToast({
            title: '取消点赞成功'
          });
          this.setState({
            is_like: false,
            like_num: this.state.like_num - 1
          });
        }
      })
      .then(statusCode => {
        if (statusCode) {
          Taro.showToast({
            title: '网络错误，请重新尝试',
            icon: 'none'
          });
        }
      });
  }

  render() {
    const {ancestor} = this.state
    var response1 = {
      code: 0,
      message: 'string',
      data: {
        id: 0,
        course_id: 'string',
        course_name: 'C语言程序设计教程',
        teacher: '张俊',
        rate: 4,
        tags: ['生动有趣', '干货满满', '老师温柔'],
        content:
          '老师也太有意思了吧哈哈哈哈哈哈，简直是被数学耽误的相声演员，上课一言不合就开始讲笑话，不过作业少一点就好啦',
        is_anonymous: true,
        like_num: 17,
        is_like: false,
        time: '2019.8.23/11:04',
        comment_num: 5,
        user_info: {
          username: '用户名称',
          avatar:
            'https://img-blog.csdnimg.cn/20190328192720764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
        }
      }
    };

    var response2 = {
      code: 0,
      message: 'string',
      data: {
        parent_comment_num: 0,
        parent_comments_list: [
          {
            id: 0,
            comment_id: 0,
            content:
              '真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？真这么有意思嘛？',
            like_num: 17,
            is_like: false,
            time: '2019.8.23/11:04',
            is_anonymous: true,
            user_info: {
              username: '用户1',
              avatar:
                'https://img-blog.csdnimg.cn/20190328192720764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            sub_comments_num: 7,
            sub_comments_list: [
              {
                id: 0,
                content:
                  '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
                like_num: 4,
                is_like: false,
                time: '2019.8.23/18.33',
                is_anonymous: false,
                user_info: {
                  username: '用户2',
                  avatar:
                    'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
                },
                target_user_info: {
                  username: '用户1',
                  avatar: ''
                }
              },
              {
                id: 0,
                content:
                  '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
                like_num: 4,
                is_like: false,
                time: '2019.8.23/18.33',
                is_anonymous: false,
                user_info: {
                  username: '用户2',
                  avatar:
                    'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
                },
                target_user_info: {
                  username: '用户1',
                  avatar: ''
                }
              },
              {
                id: 0,
                content:
                  '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
                like_num: 4,
                is_like: false,
                time: '2019.8.23/18.33',
                is_anonymous: false,
                user_info: {
                  username: '用户2',
                  avatar:
                    'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
                },
                target_user_info: {
                  username: '用户1',
                  avatar: ''
                }
              },
              {
                id: 0,
                content:
                  '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
                like_num: 4,
                is_like: false,
                time: '2019.8.23/18.33',
                is_anonymous: false,
                user_info: {
                  username: '用户2',
                  avatar:
                    'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
                },
                target_user_info: {
                  username: '用户1',
                  avatar: ''
                }
              },
              {
                id: 0,
                content:
                  '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
                like_num: 4,
                is_like: false,
                time: '2019.8.23/18.33',
                is_anonymous: false,
                user_info: {
                  username: '用户2',
                  avatar:
                    'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
                },
                target_user_info: {
                  username: '用户1',
                  avatar: ''
                }
              },
              {
                id: 0,
                content:
                  '哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的哈哈哈哈老师是挺搞笑的',
                like_num: 4,
                is_like: false,
                time: '2019.8.23/18.33',
                is_anonymous: false,
                user_info: {
                  username: '用户2',
                  avatar:
                    'https://img-blog.csdnimg.cn/20191006183428714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
                },
                target_user_info: {
                  username: '用户1',
                  avatar: ''
                }
              },
              {
                id: 0,
                content:
                  '好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课好勒准备选课',
                like_num: 4,
                is_like: false,
                time: '2019.8.23/18.33',
                is_anonymous: false,
                user_info: {
                  username: '用户1',
                  avatar:
                    'https://img-blog.csdnimg.cn/20190328192720764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
                },
                target_user_info: {
                  username: '用户2',
                  avatar: 'string'
                }
              }
            ]
          },
          {
            id: 0,
            comment_id: 0,
            content:
              '文院的可以选吗？文院的可以选吗？文院的可以选吗？文院的可以选吗？文院的可以选吗？',
            like_num: 17,
            is_like: false,
            time: '2019.8.23/11:04',
            is_anonymous: true,
            user_info: {
              username: '用户3',
              avatar:
                'https://img-blog.csdnimg.cn/20191029221050860.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
            },
            sub_comments_num: 2,
            sub_comments_list: [
              {
                id: 0,
                content: '你何必想不开',
                like_num: 4,
                is_like: false,
                time: '2019.8.23/18.33',
                is_anonymous: false,
                user_info: {
                  username: '用户4',
                  avatar:
                    'https://img-blog.csdnimg.cn/20190409105622471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
                },
                target_user_info: {
                  username: '用户3',
                  avatar: 'string'
                }
              },
              {
                id: 0,
                content: '文院的咋就不能选',
                like_num: 4,
                is_like: false,
                time: '2019.8.23/18.33',
                is_anonymous: false,
                user_info: {
                  username: '用户5',
                  avatar:
                    'https://img-blog.csdnimg.cn/20190526131401464.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg3MDEyNw==,size_16,color_FFFFFF,t_70'
                },
                target_user_info: {
                  username: '用户4',
                  avatar: 'string'
                }
              }
            ]
          }
        ]
      }
    };
    return (
      <View className="courseCommentsDetails">
        <View className="ancestorBox">
          <View className="informationBox">
            <View className="ancestorAvatar">
              <Image src={response1.data.user_info.avatar}></Image>
            </View>
            <View className="ancestorInformation">
              <View className="ancestorUsername">
                {response1.data.user_info.username}
              </View>
              <View className="ancestorTime">{response1.data.time}</View>
            </View>
          </View>
          <View className="courseInformationBox">
            <View className="courseInformation">
              #{response1.data.course_name} ({response1.data.teacher})
            </View>
            <View className="toRate">评价星级：</View>
            <MxRate
              value={response1.data.rate}
              readOnly="true"
              className="rate"
            />
          </View>
          <View className="tag"></View>
          <View className="ancestorComment">{response1.data.content}</View>
          <View className="iconsBox">
            <View className="like">
              {!ancestor.is_like && (
                <MxIcon
                  width="43"
                  height="43"
                  type="likeBtn"
                  className="likeIcon"
                  onClick={this.toLike.bind(this, response1.data.id)}
                />
              )}
              {ancestor.is_like && (
                <MxIcon
                  width="43"
                  height="43"
                  type="check"
                  className="likeIcon"
                  onClick="toLike"
                />
              )}
              {response1.data.like_num}
            </View>
            <View className="commentsNumber">
              <MxIcon width="43" type="cmmtBtn" className="commentIcon" />
              {response1.data.comment_num}
            </View>
          </View>
        </View>
        <View className="commentsList">
          {this.state.commentsList.map(item => {
            return (
              <View key={item.id}>
                <View className="parentCommentBox">
                  <View className="parentAvatar">
                    <Image src={item.user_info.avatar}></Image>
                  </View>
                  <View className="parentComment">
                    <View className="parentContainer">
                      <View className="parentContainerIn">
                        <View className="parentUsername">
                          {item.user_info.username}
                        </View>
                        <View className="parentCommentContent">
                          {item.content}
                        </View>
                      </View>
                    </View>
                    <View className="parentDetail">
                      <View className="time">{item.time}</View>
                      <View className="reply">回复</View>
                      <View className="like">
                        赞
                        {item.like_num != 0 && (
                          <View className="likeNum">({item.like_num})</View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
                <View className="subCommentListBox">
                  {item.sub_comments_list.map(x => {
                    return (
                      <View key={x.id} className="subCommentBox">
                        <View className="sonAvatar">
                          <Image src={x.user_info.avatar}></Image>
                        </View>
                        <View className="sonComment">
                          <View className="sonContainer">
                            <View className="sonContainerIn">
                              <View className="sonUsername">
                                {x.target_user_info.username ==
                                  item.user_info.username && (
                                  <View className="sonUsername">
                                    {x.user_info.username}
                                  </View>
                                )}
                                {x.target_user_info.username !=
                                  item.user_info.username && (
                                  <View className="sonUsername">
                                    {x.user_info.username}
                                    <View className="replyContext">回复</View>
                                    {x.target_user_info.username}
                                  </View>
                                )}
                              </View>
                              <View className="sonCommentContent">
                                {x.content}
                              </View>
                            </View>
                          </View>
                          <View className="sonDetail">
                            <View className="time">{x.time}</View>
                            <View className="reply">回复</View>
                            <View className="like">
                              赞
                              {x.like_num != 0 && (
                                <View className="likeNum">({x.like_num})</View>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                  {item.sub_comments_num > 5 &&
                    item.sub_comments_list.length <= 5 && (
                      <View onClick={this.toShow} className="remainComments">
                        产看剩余{item.sub_comments_num - 5}条评论
                      </View>
                    )}
                </View>
              </View>
            );
          })}
        </View>
        <View className="inputBox"></View>
      </View>
    );
  }
}
