/* eslint-disable taro/duplicate-name-of-state-and-props */
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'child'
    };
  }
  tochange(text) {
    this.props.onItemChange(text);
  }
  render() {
    return (
      <View onClick={this.tochange.bind(this, this.state.test)}>点我</View>
    );
  }
}

Test.defaultProps = {
  value: '',
  onItemChange: () => {}
};

export default Test;
