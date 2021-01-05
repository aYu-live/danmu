const option = [
    ['速度',{
        key: 'speed',
        value: .6,
        max: 1,
        min: .2,
        step: .1,
        left: '快',
        right: '慢'
    }],
    ['字号', {
        key: 'fontSize',
        value: 300,
        max: 450,
        min: 150,
        step: 30,
        left: '小',
        right: '大'
    }],
    ['颜色', {
        key: 'color',
        value: '#ffffff',
        list: ['#d9e3f0', '#f47373', '#697689', '#ffffff', '#37d67a', '#2ccce4', '#555555',
        '#dce775', '#ff8a65', '#ba68c8', '#8ED1FC', '#F78DA7', '#EB144C', '#8bc34a']
    }],
    ['文字方式', {
        key: 'direction',
        value: 90,
        max: 360,
        min: 0,
        step: 10,
        left: '0°',
        right: '360°'
    }]
];
export const optionList = new Map(option)