$(function(){
    // map
    initMap();
    // counter
    initCounter();
    // kpi group series
    initKPIGroup1();
    initKPIGroup2();
    initKPIGroup3();
    initKPIGroup4();
    // kpi1
    initKPITopLeft();
    // kpi2
    initKPITopRight();
    // kpi3
    initKPIMiddle();
    // kpi4
    initKPIBottom();
})


function initMap() {
    $.getJSON("../../json/factoryConf.json",function(result){
        var factoryGeoCoordMap = result;        
        var echartMap = new mapManager(factoryGeoCoordMap,'map');

        var fakeFactoryDataGenegator = function() {
            var fakeFactoryData = [];
            for(var key in factoryGeoCoordMap) {
                fakeFactoryData.push({name:key,value:Math.round(Math.random() * 10)});
            }
            return fakeFactoryData;
        }
        var data = fakeFactoryDataGenegator();
        echartMap.updateDate(data);
        setInterval(function(){
            var data = fakeFactoryDataGenegator();
            echartMap.updateDate(data)
        }, 1000*5)
    });
}

function initCounter() {        
    var $numberGroup = $('.numberGroup');
    var lastArray = [];
    
    function counterUpdate($numberGroup, nubmer, lastArray) {        
        var numberString = nubmer.toString();
        var numberArray = numberString.replace(/(.)(?=[^$])/g,"$1,").split(",");
        if(lastArray.length === 0) {
            for(var i=0; i<numberArray.length;i++) {
                lastArray.push(0);
            }            
            $numberGroup.empty();
            numberArray.forEach(function(v,i){
                $numberGroup.append('<li id="number-'+ i + '">' + v + '</li>');
            });
        }
        if(numberArray.length != lastArray.length) {
            $numberGroup.empty();
            numberArray.forEach(function(v,i){
                $numberGroup.append('<li id="number-'+ i + '">' + v + '</li>');
            });
        }
        else {
            numberArray.forEach(function(v,i){
                var numAnim = new CountUp("number-"+i, lastArray[i], numberArray[i]);
                if (!numAnim.error) {
                    numAnim.start();
                } else {
                    console.error(numAnim.error);
                }
            });
        }
        return numberArray;
    }
    
    var number = 100000 * (1 + Math.round(Math.random() * 8)) + Math.round(Math.random() * 100000);
    lastArray = counterUpdate($numberGroup, number,lastArray);

    setInterval(function(){
        var number = 100000 * (1 + Math.round(Math.random() * 8)) + Math.round(Math.random() * 100000);
        lastArray = counterUpdate($numberGroup, number,lastArray);
    }, 1000*5)
}

function initKPIGroup1() {

    var data1 = 90.2;
    var data2 = 9.8;

    var dataStyle = {
            normal: {
                color: '#17A5FF',
                shadowColor: '#17A5FF',
                shadowBlur: 10
            }
        };
    var placeHolderStyle = {
        normal: {
            color: '#0B356F', // 未完成的圆环的颜色
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: '#0B356F' // 未完成的圆环的颜色
        }
    };

    var kpiGroup1Option = {
        series: [{
            type: 'pie',
            clockWise: false,
            radius: ['65%', '80%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: data1,
                label: {
                    normal: {
                        formatter: '{d}%',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '24',
                            fontWeight: 'normal'
                        }
                    }
                },
                itemStyle: dataStyle
            }, 
            {
                value: data2,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]            
        }]
    }

    var kpiGroup1 = new kpiManager("kpiGroup1",kpiGroup1Option);
    setInterval(function(){
            kpiGroup1.updateDate(function(echartObj){
                var option = echartObj.getOption();
                var fakeData1 = 5 + Math.random() * 10;
                option.series[0].data[0].value = 100 - fakeData1;
                option.series[0].data[1].value = fakeData1;
                echartObj.setOption(option);
            });
    }, 1000*5)   
}

function initKPIGroup2() {
    var lastNumber = 0;

    function counterUpdate(nubmer, lastNumber) {        
        if(nubmer != lastNumber) {
            var numAnim = new CountUp("kpiGroup2", lastNumber, nubmer);
                if (!numAnim.error) {
                    numAnim.start();
                } else {
                    console.error(numAnim.error);
            }
        }
        return nubmer;
    }    
    
    var number = Math.round(Math.random() * 5);
    lastNumber = counterUpdate(number,lastNumber);

    setInterval(function(){
        var number = Math.round(Math.random() * 10);
        lastNumber = counterUpdate(number,lastNumber);
    }, 1000*5)
}

function initKPIGroup3() {
    var data1 = 3.4;
    var data2 = 96.5;

    var dataStyle = {
            normal: {
                color: '#FF7849',
                shadowColor: '#FF7849',
                shadowBlur: 10
            }
        };
    var placeHolderStyle = {
        normal: {
            color: '#0B356F', // 未完成的圆环的颜色
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: '#0B356F' // 未完成的圆环的颜色
        }
    };

    var kpiGroup3Option = {
        series: [{
            type: 'pie',
            clockWise: false,
            radius: ['65%', '80%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: data1,
                label: {
                    normal: {
                        formatter: '{d}%',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '24',
                            fontWeight: 'normal'
                        }
                    }
                },
                itemStyle: dataStyle
            }, 
            {
                value: data2,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]            
        }]
    }

    var kpiGroup3 = new kpiManager("kpiGroup3",kpiGroup3Option);
    setInterval(function(){
            kpiGroup3.updateDate(function(echartObj){
                var option = echartObj.getOption();
                var fakeData1 = 5 + Math.random() * 10;
                option.series[0].data[0].value = fakeData1;
                option.series[0].data[1].value = 100-fakeData1;
                echartObj.setOption(option);
            });
    }, 1000*5)   
}

function initKPIGroup4() {

    var data1 = 98.7;
    var data2 = 1.3;

    var dataStyle = {
            normal: {
                color: '#50C4E3',
                shadowColor: '#50C4E3',
                shadowBlur: 10
            }
        };
    var placeHolderStyle = {
        normal: {
            color: '#0B356F', // 未完成的圆环的颜色
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: '#0B356F' // 未完成的圆环的颜色
        }
    };

    var kpiGroup4Option = {
        series: [{
            type: 'pie',
            clockWise: false,
            radius: ['65%', '80%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: data1,
                label: {
                    normal: {
                        formatter: '{d}%',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '24',
                            fontWeight: 'normal'
                        }
                    }
                },
                itemStyle: dataStyle
            }, 
            {
                value: data2,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]            
        }]
    }

    var kpiGroup4 = new kpiManager("kpiGroup4",kpiGroup4Option);
    setInterval(function(){
            kpiGroup4.updateDate(function(echartObj){
                var option = echartObj.getOption();
                var fakeData1 = 5 + Math.random() * 10;
                option.series[0].data[0].value = 100 - fakeData1;
                option.series[0].data[1].value = fakeData1;
                echartObj.setOption(option);
            });
    }, 1000*5)   
}

function initKPITopLeft() {
    var categoryData = ['广州','武汉','南京','北京','上海'];
    var data1 = [100,100,100,100,100];
    var data2 = [75,65,55,50,40];
    var kpiTopLeftOption = {
        grid: {            
            top: '15%',
            left: '20%',
            right: '10%',
            bottom: '5%',
            containLabel: true
        },
        yAxis:  {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: 'transparent'
                }                
            },
            axisLabel: {
                textStyle: {
                    color: '#C3CED9',
                    fontSize: 14
                },
                interval: 0,
                showMinLabel: true,
                showMaxLabel: true 
            },
            axisTick: {
                show: false
            },          
            inverse: true,  
            data: categoryData
        },
        xAxis: {
            type: 'value',
            axisLine: {
                show: false    
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: '投诉',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 1,
                        borderColor: '#17A5FF'
                    }
                },
                data: data1
            },
            {
                name: '总计',
                type: 'bar',
                data: data2,
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{   
                                offset: 0, color: '#2FC2FF' // 0% 处的颜色
                            },  {
                                offset: 1, color: '#276DD1' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        borderWidth: 0                       
                    }
                },
                barGap: '-100%',
                barCategoryGap: '50%'
            }
        ]
    };
    var kpiTopLeft = new kpiManager("kpiTopLeft",kpiTopLeftOption);
    setInterval(function(){
            kpiTopLeft.updateDate(function(echartObj){
                var option = echartObj.getOption();
                var fakeData = [
                        75 + Math.round(Math.random() * 10),
                        65 + Math.round(Math.random() * 10),
                        55 + Math.round(Math.random() * 10),
                        50 + Math.round(Math.random() * 10),
                        40 + Math.round(Math.random() * 10)
                ];
                option.series[1].data = fakeData;
                echartObj.setOption(option);
            });
    }, 1000*5)   
}

function initKPITopRight() {
    var data = [
        {value:335, name:'异物'},
        {value:310, name:'包装污损'},
        {value:234, name:'规格不符'},
        {value:135, name:'异味'},
        {value:350, name:'发霉'},
        {value:330, name:'过期'}
    ];
    var kpiTopRightOption = {
        color:["#FFD247","#A3E16B","#4677EE","#FF7849","#17A5FF","#54EDE2"],
        series: [
            {
                type: 'pie',
                radius: ['45%', '70%'],
                center: ['50%', '50%'],
                data: data,
                label: {
                    normal: {
                        textStyle: {
                            color: '#C3CED9'
                        },
                        padding: 10
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                           // color: '#073764'
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    var kpiTopRight = new kpiManager("kpiTopRight",kpiTopRightOption);
    setInterval(function(){
            kpiTopRight.updateDate(function(echartObj){
                var option = echartObj.getOption();
                var fakeData = [
                            {value:Math.round(Math.random() * 400), name:'异物'},
                            {value:Math.round(Math.random() * 400), name:'包装污损'},
                            {value:Math.round(Math.random() * 400), name:'规格不符'},
                            {value:Math.round(Math.random() * 400), name:'异味'},
                            {value:Math.round(Math.random() * 400), name:'发霉'},
                            {value:Math.round(Math.random() * 400), name:'过期'}
                        ];
                option.series[0].data = fakeData;
                echartObj.setOption(option);
            });
    }, 1000*5)   
}

function initKPIMiddle() {
    var categoryData = ['一月','二月','三月','四月','五月','六月'];
    var data1 = [32, 38, 19, 13, 31, 39];
    var data2 = [13, 29, 10, 40, 22, 9];
    var kpiMiddleOption = {
        grid: {            
            top: '20%',
            left: '8%',
            right: '8%',
            bottom: '10%',
            containLabel: true
        },
        xAxis:  {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: ' #073764'
                }                
            },
            axisLabel: {
                textStyle: {
                    color: '#C3CED9',
                    fontSize: 14
                }
            },
            axisTick: {
                show: false
            },
            data: categoryData
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'transparent'
                }                
            },
            axisLabel: {
                textStyle: {
                    color: '#BFCAD5',
                    fontSize: 16
                },
                interval: 0,
                showMinLabel: true,
                showMaxLabel: true 

            },
            splitLine: {
                lineStyle: {
                    color: '#073764'
                }
            }
        },
        series: [
            {
                name:'2016',
                type:'line',
                lineStyle: {
                    normal: {
                        color: '#17A5FF',
                        borderWidth: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#17A5FF'
                    }
                },
                symbol: 'circle',
                symbolSize: 8,
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{   
                                offset: 0, color: 'rgba(23,165,255,0.60)' // 0% 处的颜色
                            },  {
                                offset: 1, color: 'rgba(23,165,252,0.00)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }
                },
                markPoint: {
                     data: [{
                        coord: [5, 39],
                        symbol: 'rect',
                        symbolOffset:[45,0],
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },                        
                        label: {
                            normal: {                                
                                textStyle: {
                                    color: '#17A5FF',
                                    fontSize: 18
                                },
                                formatter: '2016'
                            }
                        }
                    }]
                },
                data: data1
            },
            {
                name:'2017',
                type:'line',
                lineStyle: {
                    normal: {
                        color: '#2DFFFC'
                    }
                },
                itemStyle : {
                    normal: {
                        color: '#2DFFFC'
                    }
                },
                symbol: 'circle',
                symbolSize: 8,
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{   
                                offset: 0, color: 'rgba(89,255,254,0.60)' // 0% 处的颜色
                            }, {
                                offset: 0.52, color: 'rgba(66,255,253,0.15)' // 52% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(45,255,252,0.00)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }
                },
                markPoint: {
                     data: [{
                        coord: [5, 9],
                        symbol: 'rect',
                        symbolOffset:[45,0],
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },                        
                        label: {
                            normal: {                                
                                textStyle: {
                                    color: '#2DFFFC',
                                    fontSize: 18
                                },
                                formatter: '2017'
                            }
                        }
                    }]
                },
                data: data2
            }
        ]
    };
    var kpiMiddle = new kpiManager("kpiMiddle",kpiMiddleOption);
    setInterval(function(){
            kpiMiddle.updateDate(function(echartObj){
                var option = echartObj.getOption();
                var fakeData1 = [
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40)
                ];
                var fakeData2= [
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40),
                        Math.round(Math.random() * 40)
                ];
                option.series[0].data = fakeData1;
                option.series[0].markPoint.data[0].coord = [5,fakeData1[5]];
                option.series[1].data = fakeData2;
                option.series[1].markPoint.data[0].coord = [5,fakeData2[5]];
                echartObj.setOption(option);
            });
    }, 1000*5)   
}

function initKPIBottom() {
    var categoryData = ['特仑苏','真果粒','冠益乳','未来星','新养道','优益C','纯甄','奶特','酸酸乳','早餐奶'];
    var data1 = [750, 750, 750, 600, 500, 700, 500, 400, 300, 250];
    var data2 = [500, 475, 450, 450, 450, 150, 150, 175, 100, 75];
    var kpiBottomOption = {
        color: ['#338DFD','#FFD247'],
        grid: {            
            top: '20%',
            left: '6%',
            right: '12%',
            bottom: '10%',
            containLabel: true
        },
        xAxis:  {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: ' #073764'
                }                
            },
            axisLabel: {
                textStyle: {
                    color: '#C3CED9',
                    fontSize: 12
                }
            },
            axisTick: {
                show: false
            },
            data: categoryData
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'transparent'
                }                
            },
            axisLabel: {
                textStyle: {
                    color: '#C3CED9',
                    fontSize: 14
                },
                interval: 0,
                showMinLabel: true,
                showMaxLabel: true 
            },
            splitLine: {
                lineStyle: {
                    color: '#073764'
                }
            }
        },
        series: [
            {
                name: '2016',
                type: 'bar',
                stack: '总量',
                data: data1
            },
            {
                name: '2017',
                type: 'bar',
                stack: '总量',
                data: data2,
                barCategoryGap: '60%'
            }
        ]
    };
    var kpiBottom = new kpiManager("kpiBottom",kpiBottomOption);
    setInterval(function(){
            kpiBottom.updateDate(function(echartObj){
                var option = echartObj.getOption();
                var fakeData1 = [
                        Math.round(Math.random() * 750),
                        Math.round(Math.random() * 750),
                        Math.round(Math.random() * 750),
                        Math.round(Math.random() * 600),
                        Math.round(Math.random() * 500),
                        Math.round(Math.random() * 500),
                        Math.round(Math.random() * 400),
                        Math.round(Math.random() * 300),
                        Math.round(Math.random() * 300),
                        Math.round(Math.random() * 250)
                ];
                var fakeData2= [
                        Math.round(Math.random() * 500),
                        Math.round(Math.random() * 500),
                        Math.round(Math.random() * 500),
                        Math.round(Math.random() * 400),
                        Math.round(Math.random() * 350),
                        Math.round(Math.random() * 350),
                        Math.round(Math.random() * 300),
                        Math.round(Math.random() * 200),
                        Math.round(Math.random() * 150),
                        Math.round(Math.random() * 100)
                ];
                option.series[0].data = fakeData1;
                option.series[1].data = fakeData2;
                echartObj.setOption(option);
            });
    }, 1000*5)   
}