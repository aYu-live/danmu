import React, { useState, useCallback, useLayoutEffect  } from 'react';
import Taro, { useShareAppMessage, useShareTimeline  } from '@tarojs/taro';
import { View, Input, Image } from '@tarojs/components';
import { AtToast } from "taro-ui";
import __ from './utils';
import _ from 'lodash';
import Scroll from '../../components/ScrollComponent';
import homePng from '../../images/home.png';
import settingPng from '../../images/setting.png';
import logo from '../../images/logo.jpg';
import Option from './components/Option';
import {AppSecret} from '../../utils/index';
import { optionList } from './option';
import './style.scss';

const ScrollIndex = () => {
    const [words, setWord] = useState('应援滚动弹幕')
    const [showSetting, setShowSetting] = useState(false)
    const [showOption, setShowOption] = useState(true)
    const [ active, setActive ] = useState(Array.from(optionList.keys())[0])
    const [styleRotate, setStyleRotate] = useState({
        transform: 'translate(-50%, -50%) rotate(90deg)'
    })
    const [ option, setOption ] = useState(optionList);
    const [toast, setToast] = useState('')
    // 

    useShareAppMessage(res => {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
          }
        return {
          title: '手持应援弹幕',
          path: '/pages/scroll/index',
          imageUrl: logo
        }
      })
      useShareTimeline(() => {
        return {
          title: '手持应援弹幕',
          imageUrl: logo
        }
      })
    const blurInput = _.debounce((e) => {
        // Taro.cloud.init()
        e.stopPropagation()
        const { currentTarget: {value} } = e
        if (Taro.getEnv().toLowerCase() === 'alipay') {
            setWord(value)
        } else {
            Taro.cloud.callFunction({
                // 云函数名称
                name: 'checkWord',
                data: {
                    content: value
                },
                success: (res) => {
                    if (res.result === 0) {
                        setWord(value)
                    } else if (res.result === 87014){
                        setToast('内容含有违法违规内容，请重新输入！')
                        setTimeout(() => setToast(null), 3000)
                    } else {
                        setToast('内容错误，请重新输入！')
                        setTimeout(() => setToast(null), 3000)
                    }
                },
                fail: console.error
              })
        }
        
    }, 700)
    const changeOption = (obj) => {
        option.set(active, obj)
        const cloneOpt = _.cloneDeep(option)
        if (obj.key === 'direction') {
            setStyleRotate({
                transform: `translate(-50%, -50%) rotate(${obj.value}deg)`
            })
        }
        setOption(cloneOpt)
    }
    return (
        <View className='scroll-index' onClick={(e) => {
            e.stopPropagation()
            setShowOption(!showOption)
        }}
        >
            <View className='scroll-rotate' style={styleRotate}>
                <View className='scroll-component'>
                    <Scroll
                      words={words}
                      option={Array.from(option.values())}
                    />
                </View>
            </View>
            {showOption && <View className='scroll-tool' onClick={(e) => e.stopPropagation()}>
                {/* <View
                  className='scroll-ico'
                  onClick={() => {
                        Taro.navigateTo({
                            url: '/pages/index/index'
                        })
                    }}
                >
                    <Image
                      className='scroll-ico'
                      src={homePng}
                      mode='widthFix'
                    />
                </View> */}
                <Input
                  className='scroll-input'
                  type='text'
                  value={words}
                  placeholder='请输入内容'
                  placeholder-class='scroll-placeholder'
                  onInput={(e) => blurInput(e)}
                />
                <View
                  className='scroll-setting'
                  onClick={() => setShowSetting(!showSetting)}
                >
                    <Image
                      className='scroll-setting'
                      src={settingPng}
                      mode='widthFix'
                    />
                </View>
            </View>}
            {showOption && <View className='scroll-tool-tips'>
                点击空白区域可以弹出设置或退出全屏
            </View>}
            {showSetting && showOption
            && <View className='scroll-option' onClick={(e) => e.stopPropagation()}>
                <View className='scroll-option-top'>
                    {Array.from(optionList.keys()).map((item) => (
                        <View className={`scroll-option-key ${item === active ? 'scroll-option-active' : null}`} key={item} onClick={() => {
                            if(item === active) return;
                            setActive(item)
                        }}
                        >
                            {item}
                        </View>
                    ))}
                </View>
                <View className='scroll-option-bottom'>
                    <Option
                      active={active}
                      option={option}
                      setOption={changeOption}
                    />
                </View>
            </View>
            }
            <AtToast isOpened={!!toast} text={toast}></AtToast>
        </View>
    )
}

export default ScrollIndex;
