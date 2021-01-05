import { Component } from 'react';
import Taro from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss'
import './app.scss'

class App extends Component {

  componentDidMount () {
    Taro.showShareMenu({
      withShareTicket: true,
      // menus: ['shareAppMessage', 'shareTimeline']
  })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
