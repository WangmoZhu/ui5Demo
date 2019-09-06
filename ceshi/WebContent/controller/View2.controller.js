/*eslint linebreak-style: ["error", "unix"]*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./echarts",
	"sap/ui/model/json/JSONModel"
], function(Controller,echartsjs,JSONModel) {
	"use strict";

	return Controller.extend("ZCT_MATQISET.controller.View2", {

			onInit : function(){
				this.getView().addStyleClass("sapUiSizeCompact");
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			},
			navtoView : function(){
				this.oRouter.navTo("View1");
			},
			onAfterRendering : function(){
				this.onPress();
					this.onPress1();
						this.onPress2();
							this.onPress3();
								this.onPress4();
								this.onPress5();
									this.onPress6();
			},
			onPress : function(){
				this.id = this.createId("lineChartsI");
			/*
			 * var oView =
			 * document.getElementById('__xmlview1--charts').childNodes[1];
			 */
				var oView = document.getElementById(this.id);
				var height = $('#'+ this.id).height()/2.8;
				var width = $('#'+ this.id).width()/21.3;
				var width1 =$('#'+ this.id).width()/10.5;
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;

			

option = {
    backgroundColor:'#fff',
    /*tooltip: {
        show: true,
        trigger: "item",
       formatter: "{a}<br>{b}:{c}({d}%)"
    },
    color: ['#FF8700', '#ffc300', '#00e473', '#009DFF'],*/
    grid: {
        top: '86%',
        bottom: '37%',
        left: "28%",
        containLabel: false
    },
    yAxis: [{
        type: 'category',
        inverse: false,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
         z:3,
        axisLabel: {
            interval: 0,
            rotate:-20,
            inside: true,
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            show: true
        },
    
      data: ["400K套","3000套"]
    }],
    xAxis: [{
        show: false
    }],
    series: [{

		type: 'pie',
		startAngle: 270,
		color: function(params) { 
                    	var colorList = [ '#0086FF','#EEF7FF']; 
                    	return colorList[params.dataIndex];
                	},
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
			radius: ['80%','60%'],
		center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value:10,
			name: '22',
			
		}, {
			value: 10,
			name: '',
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	},
	{

		type: 'pie',
		silent: true,
		startAngle: 270,
		color: function(params) { 
                    	var colorList = [ '#EEF7FF','#ffffff']; 
                    	return colorList[params.dataIndex];
                	},
		z: 1,
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['80%','60%'],
		center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value: 7.5,
			itemStyle: {
			    color:"#EEF7FF",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}, {
			value: 2.5,
			name: '',
			label: { //标签的位置
			
            normal: {
                show: true,
                padding:[0,0,0,width],
                position: 'inside', //标签的位置
                formatter:function(){
                    return "当月累计FCST：2425套";
                },
                textStyle: {
                    color: '#000',
                    fontSize:12
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontWeight: 'bold'
                }
        
            },
        },
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	},
	{

		type: 'pie',
		startAngle: 270,
		color: function(params) { 
                var colorList = [ '#3AC2FB','#F3FBFF']; 
                return colorList[params.dataIndex];
            },
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['60%','40%'],
			center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value:6,
			name: '11'
		}, {
			value: 6,
			name: '',
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	},
	{

		type: 'pie',
		silent: true,
		startAngle: 270,
		z: 1,
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['60%','40%'],
		center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value: 7.5,
			itemStyle: {
				color: "#F3FBFF",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}, {
			value: 2.5,
			label: { //标签的位置
			
            normal: {
                show: true,
                 padding:[height,0,0,width1],
                position: 'inside', //标签的位置
                formatter:function(){
                    return "累计FCST：619K套";
                },
                textStyle: {
                    color: '#000',
                    fontSize:12
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontWeight: 'bold'
                }
        
            },
        },
			name: '',
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	}
]
};

			
			    myChart.clear();
	            myChart.setOption(option);
			},
			
			onPress1 : function(){
				this.id = this.createId("lineChartsK");
			/*
			 * var oView =
			 * document.getElementById('__xmlview1--charts').childNodes[1];
			 */
				var oView = document.getElementById(this.id);
				var height = $('#'+ this.id).height()/10.4;
				var width = $('#'+ this.id).width()/6.8;
				var height1=$('#'+ this.id).height()/2.4;
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;

			

option = {
    backgroundColor:'#fff',
    /*tooltip: {
        show: true,
        trigger: "item",
       formatter: "{a}<br>{b}:{c}({d}%)"
    },
    color: ['#FF8700', '#ffc300', '#00e473', '#009DFF'],*/
    grid: {
        top: '87%',
        bottom: '43%',
        left: "27%",
        containLabel: false
    },
    yAxis: [{
        type: 'category',
        inverse: false,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
         z:3,
        axisLabel: {
            interval: 0,
            rotate:-20,
            inside: true,
            textStyle: {
                color: "#fff",
                fontSize: 10,
            },
            show: true
        },
    
      data: ["400K套","3000套"]
    }],
    xAxis: [{
        show: false
    }],
    series: [{

		type: 'pie',
		startAngle: 270,
		color: function(params) { 
                    	var colorList = [ '#0086FF','#EEF7FF']; 
                    	return colorList[params.dataIndex];
                	},
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['90%','60%'],
		center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value:10,
			name: '22',
			
		}, {
			value: 10,
			name: '',
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	},
	{

		type: 'pie',
		silent: true,
		startAngle: 270,
		color: function(params) { 
                    	var colorList = [ '#EEF7FF','#ffffff']; 
                    	return colorList[params.dataIndex];
                	},
		z: 1,
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['90%','60%'],
		center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value: 7.5,
			itemStyle: {
			    color:"#EEF7FF",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}, {
			value: 2.5,
			name: '',
			label: { //标签的位置
			
            normal: {
                show: true,
                padding:[0,width,height,0],
                position: 'inside', //标签的位置
                formatter:function(){
                    return "2425套";
                },
                textStyle: {
                    color: '#000',
                    fontSize:10
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontWeight: 'bold'
                }
        
            },
        },
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	},
	{

		type: 'pie',
		startAngle: 270,
		color: function(params) { 
                var colorList = [ '#3AC2FB','#F3FBFF']; 
                return colorList[params.dataIndex];
            },
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['60%','30%'],
			center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value:6,
			name: '11'
		}, {
			value: 6,
			name: '',
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	},
	{

		type: 'pie',
		silent: true,
		startAngle: 270,
		z: 1,
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['60%','30%'],
		center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value: 7.5,
			itemStyle: {
				color: "#F3FBFF",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}, {
			value: 2.5,
			label: { //标签的位置
			
            normal: {
                show: true,
                 padding:[height1,0,0,0],
                position: 'inside', //标签的位置
                formatter:function(){
                    return "619K套";
                },
                textStyle: {
                    color: '#000',
                    fontSize:10
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontWeight: 'bold'
                }
        
            },
        },
			name: '',
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	}
]
};

			
			    myChart.clear();
	            myChart.setOption(option);
			},
			onPress2   : function(){
				this.id = this.createId("lineChartsN");
			/*
			 * var oView =
			 * document.getElementById('__xmlview1--charts').childNodes[1];
			 */
				var oView = document.getElementById(this.id);
				var height = $('#'+ this.id).height()/10.4;
				var width = $('#'+ this.id).width()/6.8;
				var height1=$('#'+ this.id).height()/2.4;
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;

			

option = {
    backgroundColor:'#fff',
    /*tooltip: {
        show: true,
        trigger: "item",
       formatter: "{a}<br>{b}:{c}({d}%)"
    },
    color: ['#FF8700', '#ffc300', '#00e473', '#009DFF'],*/
    grid: {
        top: '87%',
        bottom: '43%',
        left: "27%",
        containLabel: false
    },
    yAxis: [{
        type: 'category',
        inverse: false,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
         z:3,
        axisLabel: {
            interval: 0,
            rotate:-20,
            inside: true,
            textStyle: {
                color: "#fff",
                fontSize: 10,
            },
            show: true
        },
    
      data: ["400K套","3000套"]
    }],
    xAxis: [{
        show: false
    }],
    series: [{

		type: 'pie',
		startAngle: 270,
		color: function(params) { 
                    	var colorList = [ '#0086FF','#EEF7FF']; 
                    	return colorList[params.dataIndex];
                	},
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['90%','60%'],
		center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value:10,
			name: '22',
			
		}, {
			value: 10,
			name: '',
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	},
	{

		type: 'pie',
		silent: true,
		color: function(params) { 
                    	var colorList = [ '#EEF7FF','#ffffff']; 
                    	return colorList[params.dataIndex];
                	},
		startAngle: 270,
		z: 1,
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['90%','60%'],
		center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value: 7.5,
			itemStyle: {
			    color:"#EEF7FF",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}, {
			value: 2.5,
			name: '',
			label: { //标签的位置
			
            normal: {
                show: true,
                padding:[0,width,height,0],
                position: 'inside', //标签的位置
                formatter:function(){
                    return "2425套";
                },
                textStyle: {
                    color: '#000',
                    fontSize:10
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontWeight: 'bold'
                }
        
            },
        },
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	},
	{

		type: 'pie',
		startAngle: 270,
		color: function(params) { 
                var colorList = [ '#3AC2FB','#F3FBFF']; 
                return colorList[params.dataIndex];
            },
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['60%','30%'],
			center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value:6,
			name: '11'
		}, {
			value: 6,
			name: '',
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	},
	{

		type: 'pie',
		silent: true,
		startAngle: 270,
		z: 1,
		clockWise: true, //顺时加载
		hoverAnimation: false, //鼠标移入变大
		radius: ['60%','30%'],
		center: ["45%", "50%"],
		label: {
			show: false
		},
		itemStyle: {
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			borderWidth: 5,
		},
		data: [{
			value: 7.5,
			itemStyle: {
				color: "#F3FBFF",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}, {
			value: 2.5,
			label: { //标签的位置
			
            normal: {
                show: true,
                 padding:[height1,0,0,0],
                position: 'inside', //标签的位置
                formatter:function(){
                    return "619K套";
                },
                textStyle: {
                    color: '#000',
                    fontSize:10
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontWeight: 'bold'
                }
        
            },
        },
			name: '',
			itemStyle: {
				color: "rgba(0,0,0,0)",
				borderWidth: 0
			},
			tooltip: {
				show: false
			},
			hoverAnimation: false
		}]
	}
]
};

			
			    myChart.clear();
	            myChart.setOption(option);
			},
			onPress3 : function(){
				this.id = this.createId("barChartsY");
				var oView = document.getElementById(this.id);
				var height = $(window).height();
				var width = $(window).width();
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;


			
option = {
    title: {
           text: '当月',
          left:'center',
           textStyle:{
           /* color:'#ccc', */ //文字颜色
            fontStyle:'normal',  //字体风格,'normal','italic','oblique'
            fontWeight:'normal', //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontFamily:'sans-serif', //字体系列
      fontSize:14 //字体大小
        },
    },
    grid: {
       containLabel: true,
    		x:10,  //左留白
             y:30,   //上留白
             x2:0,  //右留白
             y2:0   //下留白
      },
    //   legend: {
    //       show: true,
    //       itemWidth:15,
    //       itemHeight:15,
    //       icon:'rect',
    //       data: [' ','齐套数', 'FCST']
    //   },
      xAxis: { 
       axisTick:{
          show:false
       },//y轴线刻度
       // y 轴线
       axisLine:{
           show:false
       }, 
       	max:120,
         splitLine:{
             show:false
         },
  triggerEvent:true,
   show:false,
         axisLabel:{ 
          formatter:function(val) { 
              return val +"K";
          }
      }  
   },
      yAxis: {type: 'category',
          axisTick:{
           show:false
       },//y轴线刻度
       // y 轴线
       axisLine:{
           show:false
       },   
         axisLabel: {
             margin:30,
             fontSize:20,
             color:'#0086FF'
         },
         triggerEvent:true,
          data : ['F1A-IN ','F2A-IN ','F9B-IN ','F9A-IN ','E7-IN ','F8A-IN ','EA-IN ','F7A-IN '],
      },
      series: [{
      name:'FCST',
            type: 'bar',
            barWidth: 20,
              barGap:'-100%',
         //    barCategoryGap:'30%',/*多个并排柱子设置柱子之间的间距*/
              color:['#F3FBFF'] ,
             data:[
              {value: 120},
              {value: 120},
              {value:120},
              {value: 120},
              {value: 120},
              {value: 120},
              {value: 120},
                {value: 120},
            ],
             itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                          return params.dataValue;
                        }, 
                         position: 'left', 
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },        
            }        
            },

           
        }, {
            type: 'bar',
            barWidth: 20,
         name:'齐套数',
          /*   barGap:'60%',
             barCategoryGap:'30%',多个并排柱子设置柱子之间的间距*/
              color: '#3AC2FB',
             data:[
           
               {value: 30},
               {value: 50},
               {value:80},
               {value: 25},
               {value: 19},
               {value: 60},
               {value: 100},
                 {value: 120},
            ],
            itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                          return params.dataValue;
                        }, 
                         position: 'insideLeft', 
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#ffffff',
                         }  },        
            }        
            },
           
        },
          
        
    ]
};

var oContext = this;
			
			    myChart.clear();
	            if (option && typeof option === "object") {
					 myChart.setOption(option, true);
    				myChart.on('click', function (params) {
    					console.log(params);
        			/*	alert("单击了"+params.value+"x轴标签");*/
        				oContext.navtoView();
				 });
				}
			},
			
				onPress4   : function(){
				this.id = this.createId("barChartsZ");
				var oView = document.getElementById(this.id);
				var height = $(window).height();
				var width = $(window).width();
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;


			
option = {
    title: {
           text: '累计',
          left:'center',
           textStyle:{
           /* color:'#ccc', */ //文字颜色
            fontStyle:'normal',  //字体风格,'normal','italic','oblique'
            fontWeight:'normal', //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontFamily:'sans-serif', //字体系列
      fontSize:14 //字体大小
        },
    },
    grid: {
       containLabel: true,
    		x:0,  //左留白
             y:30,   //上留白
             x2:50,  //右留白
             y2:0   //下留白
      },
    //   legend: {
    //       show: true,
    //       itemWidth:15,
    //       itemHeight:15,
    //       icon:'rect',
    //       data: [' ','齐套数', 'FCST']
    //   },
      xAxis: { 
       axisTick:{
          show:false
       },//y轴线刻度
       // y 轴线
       axisLine:{
           show:false
       }, 
       	max:120,
         splitLine:{
             show:false
         },
  
   show:false,
         axisLabel:{ 
          formatter:function(val) { 
              return val +"K";
          }
      }  
   },
      yAxis: {type: 'category',
          axisTick:{
           show:false
       },//y轴线刻度
       // y 轴线
       axisLine:{
           show:false
       },   
         axisLabel: {
  /*           margin:30,*/
             fontSize:20,
             color:'#0086FF'
         },
         /* data : ['F1A-IN ','F2A-IN ','F9B-IN ','F9A-IN ','E7-IN ','F8A-IN ','EA-IN ','F7A-IN '],*/
      },
      series: [{
      name:'FCST',
            type: 'bar',
            barWidth: 20,
              barGap:'-100%',
         //    barCategoryGap:'30%',/*多个并排柱子设置柱子之间的间距*/
              color:['#EEF7FF'] ,
             data:[
              {value: 120},
              {value: 120},
              {value:120},
              {value: 120},
              {value: 120},
              {value: 120},
              {value: 120},
                {value: 120},
            ],
             itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                          return params.dataValue;
                        }, 
                         position: 'right', 
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },        
            }        
            },

           
        }, {
            type: 'bar',
            barWidth: 20,
         name:'齐套数',
          /*   barGap:'60%',
             barCategoryGap:'30%',多个并排柱子设置柱子之间的间距*/
              color: '#0086FF',
             data:[
           
               {value: 30},
               {value: 50},
               {value:80},
               {value: 25},
               {value: 19},
               {value: 60},
               {value: 100},
                 {value: 120},
            ],
            itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                          return params.dataValue;
                        }, 
                         position: 'insideLeft', 
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#ffffff',
                         }  },        
            }        
            },
           
        },
          
        
    ]
};


			
			    myChart.clear();
	            myChart.setOption(option);
			},
			
						onPress5   : function(){
				this.id = this.createId("lineChartsB");
				var oView = document.getElementById(this.id);
				var height = $(window).height();
				var width = $(window).width();
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;


			var tipData = [[1,2,3],[4,5,6]];
		

				option = {
				    backgroundColor:'#fff',
    				tooltip: {
        show: true,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: {
            color: '#3c3c3c',
            fontSize: 16
        },
        formatter: function(p) {
            console.log(p);
            var _arr = p.seriesName.split('/'),
            idx = p.seriesIndex;//1，2，3
            if(idx == 0){
            return '累计FCST：'+ tipData[0][0] +'<br>累计齐套数：'+ tipData[0][1] +'<br>缺套数：'+ tipData[0][1]  ;
            }else{
             return '累计FCST：'+ tipData[1][0] +'<br>累计齐套数：'+ tipData[1][1] +'<br>缺套数：'+ tipData[1][1]  ;
            }
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)'
    },
			/*	color:['#E1E1E1','#57EBC4','#FE5578'],
    			legend: {
    				selectedMode: false,
    			  itemWidth:15,
        		  itemHeight:15,
        		  icon:'rect',
        		  bottom: 15,
        		left: "center",
        	data:[{name:'月初余量套数',textStyle: {color: '#A0A0A0'}},
        		{name:'达到累计FCST套数',textStyle: {color: '#A0A0A0'}},
        		{name:'未达到累计FCST套数',textStyle: {color:'#A0A0A0'}}
        	]},*/
    				grid: {
        				left: '1%',
    					right: 0,
        				bottom: '5%',
        				top:'5%',
        				containLabel: true
    				},
					xAxis: [{ 
    					axisTick:{
        					show:false
    					},//y轴线刻度
    					// y 轴线
    					axisLine:{
        					show:true,
        					lineStyle:{
            				    color:'#E1E1E1'
            				}
    					}, 
                        interval:10,
                        z:3,
    				    axisLabel:{
    				        show:false
    				    },
        				splitLine:{
            				show:true,
            				lineStyle:{
            				    type:'dashed'
            				}
        				},
        			
					max:80,
					},{ 
    					axisTick:{
        					show:false
    					},
    					position: 'top',
    					axisLine:{
        					show:false
    					}, 
    				    axisLabel:{
    				        show:true,
    				        
    				    },
    				    data:["月初余量套数","WK13","WK14","WK15","WK16","WK17","WK18","WK19"],
        				splitLine:{
            				show:false,
        				},
					}],
    			yAxis: {
    				type: 'category',
    		
        			axisTick:{
        				show:false
    				},//y轴线刻度
    				// y 轴线
    				 z:4,
    				axisLine:{
        				show:true,
        				lineStyle:{
            				    color:'#E1E1E1'
            				}
    				},   
    				axisLabel: {
            		
            		
            			color:'#545454'
         },
        			data : ['3+32 ', '摄像头 ','电池 '],
    			},
    			series: [{
            name: '月初余量套数',
            		type: 'bar',
            		stack: '总量',
            		barWidth:30,
            			color: function(params) { 
                   
                    		var colorList = ["#E1E1E1","#E1E1E1","#E1E1E1"];
                    	return colorList[params.dataIndex];
                	},
            		itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                             var values=[' 100K',' 0K',' 300K'];//让series 中的文字进行换行  
                           return values[params.dataIndex];
                        }, 
                        position: 'inside',
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },
            		}        
            	},
            	data: [  10,10,10]
    			 },
    			 {
            	name: '月初余量套数',
            		type: 'bar',
            		stack: '总量',
            		barWidth:30,
            		color: function(params) { 
                     	var colorList = ["#1AD2BF","#1AD2BF","#FE5578"];
                    	return colorList[params.dataIndex];
                	},
            		itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                             var values=[' 100K',' 0K',' 300K'];//让series 中的文字进行换行  
                           return values[params.dataIndex];
                        }, 
                        position: 'inside',
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },
            		}        
            	},
            		data: [  10,10,10]
    			 
    			 },
    			 {
           name: '月初余量套数',
            		type: 'bar',
            		stack: '总量',
            		barWidth:30,
            			color: function(params) { 
                    var colorList = ["#FE5578","#1AD2BF","#1AD2BF"];
                    	return colorList[params.dataIndex];
                	},
            		itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                             var values=[' 100K',' 0K',' 300K'];//让series 中的文字进行换行  
                           return values[params.dataIndex];
                        }, 
                        position: 'inside',
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },
            		}        
            	},
           	data: [  10,10,10]
    			 },
    			 {
            	name: '达到累计FCST套数',
            		type: 'bar',
            		stack: '总量',
            		barWidth:30,
            			color: function(params) { 
                    	  var colorList = ["#1AD2BF","#1AD2BF","#1AD2BF"];
                    	return colorList[params.dataIndex];
                	},
            		itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                             var values=[' 100K',' 0K',' 300K'];//让series 中的文字进行换行  
                           return values[params.dataIndex];
                        }, 
                        position: 'inside',
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },
            		}        
            	},
            	data: [  10,10,10]
    			 },
    			 {
            	name: '达到累计FCST套数',
            		type: 'bar',
            		stack: '总量',
            		barWidth:30,
            			color: function(params) { 
                    	  var colorList = ["#FE5578","#1AD2BF","#FE5578"];
                    	return colorList[params.dataIndex];
                	},
            		itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                             var values=[' 100K',' 0K',' 300K'];//让series 中的文字进行换行  
                           return values[params.dataIndex];
                        }, 
                        position: 'inside',
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },
            		}        
            	},
            	data: [  10,10,10]
    			 },
    			 {
            	name: '未达到累计FCST套数',
            		type: 'bar',
            		stack: '总量',
            		barWidth:30,
            			color: function(params) { 
                     var colorList = ["#FE5578","#1AD2BF","#FE5578"];
                    	return colorList[params.dataIndex];
                	},
            		itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                             var values=[' 100K',' 0K',' 300K'];//让series 中的文字进行换行  
                           return values[params.dataIndex];
                        }, 
                        position: 'inside',
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },
            		}        
            	},
            	data: [  10,10,10]
    			 },
    			 {
            	name: '未达到累计FCST套数',
            		type: 'bar',
            		stack: '总量',
            		barWidth:30,
            		color: function(params) { 
                     var colorList = ["#FE5578","#1AD2BF","#1AD2BF"];
                    	return colorList[params.dataIndex];
                	},
            		itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                             var values=[' 100K',' 0K',' 300K'];//让series 中的文字进行换行  
                           return values[params.dataIndex];
                        }, 
                        position: 'inside',
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },
            		}        
            	},
            	data: [  10,10,10]
    			 },
    			 {
            		name: '未达到累计FCST套数',
            		type: 'bar',
            		stack: '总量',
            		barWidth:30,
            		color: function(params) { 
                      var colorList = ["#FE5578","#1AD2BF","#FE5578"];
                    	return colorList[params.dataIndex];
                	},
            		itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                             var values=[' 200K',' 0K',' 100K'];//让series 中的文字进行换行  
                           return values[params.dataIndex];
                        }, 
                        position: 'inside',
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : '宋体', 
                                    color: '#696969',
                         }  },
            		}        
            	},
           	data: [  10,10,10]
    			 }]
			};


			
			    myChart.clear();
	            myChart.setOption(option);
			},
			onPress6 : function(){
		var data = {
			ProductCollection : [
					{value1:"3+32",value2:"三星/镁光",value3:"0",value4:"0",value5:"4月缺套数94K，国内需每天供给10K国际已满足",value6:"采购：李成",value7:"4月"},
						{value1:"3+32",value2:"三星/镁光",value3:"0",value4:"0",value5:"4月缺套数94K，国内需每天供给10K国际已满足",value6:"采购：李成",value7:"4月"},
							{value1:"3+32",value2:"三星/镁光",value3:"0",value4:"0",value5:"4月缺套数94K，国内需每天供给10K国际已满足",value6:"采购：李成",value7:"4月"},
								{value1:"3+32",value2:"三星/镁光",value3:"0",value4:"0",value5:"4月缺套数94K，国内需每天供给10K国际已满足",value6:"采购：李成",value7:"4月"},
								{value1:"3+32",value2:"三星/镁光",value3:"0",value4:"0",value5:"4月缺套数94K，国内需每天供给10K国际已满足",value6:"采购：李成",value7:"4月"},
									{value1:"3+32",value2:"三星/镁光",value3:"0",value4:"0",value5:"4月缺套数94K，国内需每天供给10K国际已满足",value6:"采购：李成",value7:"4月"},
										{value1:"3+32",value2:"三星/镁光",value3:"0",value4:"0",value5:"4月缺套数94K，国内需每天供给10K国际已满足",value6:"采购：李成",value7:"4月"},
											{value1:"3+32",value2:"三星/镁光",value3:"0",value4:"0",value5:"4月缺套数94K，国内需每天供给10K国际已满足",value6:"采购：李成",value7:"4月"}
				]
		};
		var jsonModel = new sap.ui.model.json.JSONModel();
		jsonModel.setData(data);
		this.getView().setModel(jsonModel);
	
	},
	});

});