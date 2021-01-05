import React, { Component } from 'react';
// import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import Scroll from '../../components/ScrollComponent';
import './index.scss'

export default class Index extends Component {
  state = {
    list: [
      { index: 1, name: '滚动的文字', type: 'scroll', path: '\/pages\/scroll\/index'},
      { index: 2, name: '静态文字', type: 'light'},
      { index:3, name: '闪屏文字', type: 'flash'},
      { index: 4, name: '单个文字', type: 'alone'}
    ]
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    const { list } = this.state;
    return (
      <View className='home'>
        {list.map(item => {
          return (
            <View className='home-item' onClick={() => wx.navigateTo({url: item.path})} key={item.index}>
              {item.type === 'scroll'
                ? <Scroll
                    option={{
                      width: '100%',
                      height: '100%'
                    }}
                    words={item.name}
                />
              : item.name}
            </View>
          )
        })}
        
      </View>
    )
  }
}
