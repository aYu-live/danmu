import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { AtSlider } from 'taro-ui'
import _ from 'lodash';
import './style.scss'

const RenderOption = (props) => {
    const { active, option, setOption } = props;
    const options = _.cloneDeep(option.get(active))
    const [obj, setObj] = useState(options)
    useEffect(() => {
        setObj(options)
    }, [active])
    return (
        <View style={{padding: '0 5px', width: '100%'}}>
            {obj?.key === 'color' ?
                <View className='option-color'>
                    {obj.list.map(i => {
                        const style = {
                            background: i,
                            border: obj.value === i ? '3px solid rgba(255, 255, 255, .8)' : null
                        }
                        return (
                            <View
                              key={i}
                              className='option-color-item'
                              style={style}
                              onClick={() => {
                                obj.value = i
                                setObj({
                                    ...obj,
                                })
                                setOption(obj)
                              }}
                            >
                            </View>
                    )})}
                </View>
            : (
                <RenderSlider
                  obj={obj}
                  active={active}
                  setObj={setObj}
                  option={option}
                  setOption={setOption}
                />
            )}
        </View>
    )
}
const RenderSlider = (props) => {
    const { obj, active, setObj, setOption } = props
    return (
        <View>
                <AtSlider
                  min={obj.min}
                  max={obj.max}
                  step={obj.step}
                  value={obj.value}
                  activeColor='#E7E8E8'
                  backgroundColor='#BDBDBD'
                  blockColor='#E7E8E8'
                  blockSize={24}
                  onChanging={_.throttle((e) => {
                        if (obj.key === 'speed') {
                            const v = Number(e.toFixed(1))
                            obj.value = v
                        } else {
                            obj.value = e
                        }
                        setObj({
                            ...obj,
                        })
                        setOption(obj)
                    }, 550)}
                  onChange={(e) => {
                      if (obj.key === 'speed') {
                          const v = Number(e.toFixed(1))
                          obj.value = v
                      } else {
                          obj.value = e
                      }
                      setObj({
                          ...obj,
                      })
                      setOption(obj)
                  }}
                ></AtSlider>
                <View className='slider-show'>
                    <Text>{obj.left}</Text>
                    {active === '速度'
                        ? (obj.value * 10) - 1
                        : active === '字号'
                            ? obj.value / 30 - 5
                            :active === '文字方式' ?
                                `${obj.value}°` : null}
                    <Text>{obj.right}</Text>
                </View>
            </View>
    )
}
export default RenderOption;