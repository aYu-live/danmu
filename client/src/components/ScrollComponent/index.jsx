import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { getStringLength } from '../../utils/index';
import './style.scss';

const Scroll = (props) => {
    const { words = '滚动的文字滚动的文字', option = [] } = props;
    const [scrollStyle, setScrollStyle] = useState({})
    useEffect(() => {
        const speed = option.find( i => i.key === 'speed')?.value
        const fontSize = option.find( i => i.key === 'fontSize')?.value
        const color = option.find( i => i.key === 'color')?.value
        const wordsLength =getStringLength(words);
        const styles = {
            left: '100%',
            transform: 'translateX(0)'
        }
        if (wordsLength < 6) {
            return  setScrollStyle({
                ...styles,
                animationDuration: `${6 * speed}s`,
                fontSize: `${fontSize}px`,
                color
            })
        }
        return setScrollStyle({
            ...styles,
            animationDuration: `${(wordsLength - 2) * speed}s`,
            fontSize,
            color
        })
    }, [option])
    return (
        <View className='scroll' style={{ width: '100%', height: '100%' }}>
            <View className='scroll-words' style={scrollStyle}>
                {words}
            </View>
        </View>
    )
}

export default Scroll;
