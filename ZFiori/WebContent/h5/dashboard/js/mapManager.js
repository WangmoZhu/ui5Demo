function mapManager(geoCoordMap, elementId) {
    this.geoCoordMap = geoCoordMap;
    this.echartMap = undefined;
    this.initMap(elementId)
}

mapManager.prototype = {

    constructor: mapManager,

    convertData: function(data) {
        var res = [];
        var geoCoordMap = this.geoCoordMap;
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
       return res.sort(function (a, b) {
                return a.value - b.value;
            });
    },

    getOption: function(data) {
        var data = this.convertData(data);
        var option = {
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(18,78,161,0.70)',
                        borderColor: '#2392D8'
                    },
                    emphasis: {
                        areaColor: 'rgba(0,107,255,0.70)'
                    }
                },
                top: 0,
                bottom: 0
            },
            visualMap: { //图例值控制
                min: 0,
                max: 10,
                calculable: true,
                color: ['#FC5050', '#F9D758',  '#13FFB2'],
                textStyle: {
                    color: '#fff'
                },
                top: '25%',
                bottom: 'auto',
                left: 0
            },
            series : [
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: data,
                    symbolSize: function (val) {
                        return 3 + val[2]*2;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 2,
                    roam:  true,
                    selectedMode: 'single',
                    rippleEffect: { //涟漪特效
                        period: 4, //动画时间，值越小速度越快
                        brushType: 'stroke', //波纹绘制方式 stroke, fill
                        scale: 4 //波纹圆环最大限制，值越大波纹越大
                    },
                    label: {
                        normal: {
                            color: '#000',
                            show: false,
                            position: 'right', //显示位置
                            offset: [5, 0], //偏移设置
                            formatter: '{b}' //圆环显示文字
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    symbol: 'circle',
                    animation: true,
                    animationDurationUpdate: 756,
                    animationEasing: 'cubicOut'
                }
            ]
        };
        return option;
    },

    initMap: function(elementId) {                
        this.echartMap = echarts.init(document.getElementById(elementId));
    },

    updateDate: function(data) {
        if(!this.echartMap) return; 
        var option = this.getOption(data);
        this.echartMap.setOption(option);
    }
}