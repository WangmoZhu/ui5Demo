sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./echarts",
	"sap/ui/model/json/JSONModel"
], function(Controller,echartsjs,JSONModel) {
	"use strict";

	return Controller.extend("ZCT_MATQISET.controller.View1", {
			onInit : function(){
			this.getView().addStyleClass("sapUiSizeCompact");
				
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
			onPressSearch : function() {
			var more = this.getView().byId("moreFilter").getVisible();
			if(more){
				this.getView().byId("moreFilter").setVisible(false);
				this.getView().byId("moreButton").setIcon("sap-icon://navigation-down-arrow");
				this.getView().byId("moreButton").setText("更多查询");
			}else{
				this.getView().byId("moreFilter").setVisible(true);
				this.getView().byId("moreButton").setIcon("sap-icon://navigation-up-arrow");
				this.getView().byId("moreButton").setText("收起更多");
			}
		},
			onPress : function(){
				this.id = this.createId("barChartsA");
			/*
			 * var oView =
			 * document.getElementById('__xmlview1--charts').childNodes[1];
			 */
				var oView = document.getElementById(this.id);
				var height = $(window).height();
				var width = $(window).width();
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;

			option = {
    				tooltip: {
    				trigger: 'item',
        			formatter: "{a} <br/>{b}: {c} ({d}%)"
    				},
    		legend: {
    			orient: 'vertical',
    			top:'30%',
        		left:'60%',
        		itemWidth:15,
        		itemHeight:15,
        		itemGap: 20,
        		textStyle:{
            	fontSize:15,
            	color:'rgb(24, 183, 142)'
    			},
        	data:[{name:'累积PO已推',icon : "rect",textStyle: {color: 'rgb(24, 183, 142)'}},
        		{name:'已交付总量',icon : "rect",textStyle: {color: 'rgb(1, 179, 238)'}},
        		{name:'在途数量',icon : "rect",textStyle: {color:'rgba(58,194,251,1)'}}
        	],
        	formatter:  function(name){
                  var value = '';
                  switch(name){
                      case '累积PO已推':
                          value = '累积PO已推   450k';
                          break;
                       case '已交付总量':
                          value = '已交付总量   400k';
                          break;
                       case '在途数量':
                          value = '在途数量   390k';
                          break;
                  }
                  
                    return value;
                },

			 },
		/*    color: [],*/
    		series: [
        		{
            	name:'访问来源',
            	type:'pie',
            	radius: ['65%', '75%'],
                center: ['30%','50%'],//控制环形图的位置
            	avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            color:function(params){
              var arr = ['rgb(24, 183, 142)','#e8ecef'];
              return   arr[params.dataIndex];
            },
            data:[
                {value:335, name:'累积PO已推'}
               
            ]
        },
        {
            name:'访问来源',
            type:'pie',
            radius: ['45%', '55%'],
              center: ['30%','50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
             color:function(params){
              var arr = ['rgb(1, 179, 238)','#e8ecef'];
              return   arr[params.dataIndex];
            },
            data:[
                {value:335,name:'已交付总量'},
                 {value:435},
                 
               
            ],
            /*barWidth: 14,
            itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 7
                    }
                }*/
            
        },
         {
            name:'访问来源',
            type:'pie',
            radius: ['25%', '35%'],
              center: ['30%','50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
           /* color:function(){
                                return colors[i++];                                
                            },*/
            color:function(params){
              var arr = ['rgba(58,194,251,1)','#e8ecef'];
              return   arr[params.dataIndex];
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335,name:'在途数量'},
                 {value:1535},

               
            		],}
    			]
			};

			
			    myChart.clear();
	            myChart.setOption(option);
			},
		onPress1 : function(){
				this.id = this.createId("lineChartsA");
			/*
			 * var oView =
			 * document.getElementById('__xmlview1--charts').childNodes[1];
			 */
				var oView = document.getElementById(this.id);
				var height = $(window).height();
				var width = $(window).width();
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;
				option = {
    				tooltip : {
        				trigger: 'axis',
    					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        				},
        				formatter: function (params, ticket, callback) {
            				return "范一杰";
        				},
					 },

    				legend: {
        			/*	data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']*/
    				},
    				grid: {
        				left: '3%',
    					right: '14%',
        				bottom: '13%',
        				top:0,
        				containLabel: true
    				},
					xAxis: { 
    					axisTick:{
        					show:false
    					},//y轴线刻度
    					// y 轴线
    					axisLine:{
        					show:false
    					}, 
        				splitLine:{
            				show:false
        				},
					max:450,
        			axisLabel:{ 
        				formatter:function(val) { 
            				return val +"K";
        				}
    				}  
				},
    			yAxis: {
    				type: 'category',
        			axisTick:{
        				show:false
    				},//y轴线刻度
    				// y 轴线
    				axisLine:{
        				show:false
    				},   
        			data : ['目标套数 ', '模切片 ', '电感/磁铁/23级管 ','声学组件 ', '驱动IC ','晶振/LED ', '滤波器/放大器 ','连接器 ', '电容 ','电阻/重力传感器 ','套片/IC ', '主板PCB '],
    				axisLabel: {
            			color:function(value){
                        	var valuearr=['#696969','#00BFFF','#00BFFF','#00BFFF','#00BFFF','#00BFFF','#00BFFF','#00BFFF','#00BFFF','#00BFFF','#00BFFF','#00BFFF'];//让series 中的文字进行换行  
                        		if(value == "目标套数 "){
                           			return '#696969';
                        		}else{
                        			return '#00BFFF';
                        		}
            			}
    				},
    			},
    			series: [{
            		/*name: '直接访问',*/
            		type: 'bar',
            		stack: '总量',
            		barWidth:15,
            		color: function(params) { 
                    	var colorList = [ '#5E7BD0','#1CD1A1','#0086FF','#0086FF',
                                      '#0086FF','#0086FF','#0086FF','#0086FF',
                                      '#0086FF' ,'#0086FF','#0086FF','#0086FF' 
                                    ]; 
                    	return colorList[params.dataIndex];
                	},
            		label: {
                		normal: {
                    	show: false,
                    	position: 'insideRight'
                	}
            		},
            	data: [ 430, 430,390,360,320,290,260,230,200,170,140,110]
    			 },
    			 {
            	/*name: '邮件营销',*/
            	type: 'bar',
            	stack: '总量',
            	barWidth:15,
            	color:'#EEF7FF',
            	data: [0, 0, 40, 70, 110, 140, 170,200,230,260,290,320],
            	itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                             var values=[' 430K',' 430K/0K',' 356K/-74K',' 356K/-74K',' 356K/-74K',' 356K/-74K',' 356K/-74K',' 356K/-74K',' 356K/-74K',' 356K/-74K',' 356K/-74K',' 356K/-74K'];//让series 中的文字进行换行  
                           return values[params.dataIndex];
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
        	}
        
    		]
			};
	
			    myChart.clear();
	            myChart.setOption(option);
	           /* myChart.on('click', function (params) {
        			console.log("单击了"+params.value+"x轴标签");
    			});*/
			},
			
		onPress2 : function(){
				this.id = this.createId("lineChartsB");
			/*	var valuesarr=[' ',' ',' ',' ',' ',' 150K/210K',' 180K/185K',' 125K/175K',' 119K/260K',' 160K/180K',' 130K/250K',' 100/200K'];//让series 中的文字进行换行  
				var valuesarr1=[' 330K/300K',' 270K/260K',' 240K/240K',' 170K/170K',' 205K/205K',' ',' ',' ',' ',' ',' ',' '];//让series 中的文字进行换行  
			*/	var oView = document.getElementById(this.id);
				var height = $(window).height();
				var width = $(window).width();
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;
 option = {
  //  title: {
  //         text: '齐套数/缺套数',
   //        right:'5%',
   //        textStyle:{
   //        /* color:'#ccc', */ //文字颜色
   //         fontStyle:'normal',  //字体风格,'normal','italic','oblique'
   //         fontWeight:'normal', //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
  //          fontFamily:'sans-serif', //字体系列
    //  fontSize:16 //字体大小
    //    },
   // },
    grid: {
       containLabel: true,
    	x:'5%',  //左留白
             y:'5%',   //上留白
             x2:'10%',  //右留白
             y2:'5%'  //下留白
      },
     /* legend: {
          show: true,
          itemWidth:15,
          itemHeight:15,
          icon:'rect',
          data: [' ','齐套数', 'FCST']
      },*/
      xAxis: { 
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
         splitLine:{
             show:false
         },
         interval:100,
   max:330,
         axisLabel:{ 
          formatter:function(val) { 
              return val +"K";
          },
          color:'#545454'
      }  
   },
      yAxis: {type: 'category',
          axisTick:{
           show:false
       },//y轴线刻度
       // y 轴线
       axisLabel: {
            		
            		
            			color:'#545454'
         },
       axisLine:{
        					show:true,
        					lineStyle:{
            				    color:'#E1E1E1'
            				}
    					},    
          data : ['紫色DECO ','蓝色DECO ','黑色DECO ','黑色电池盖 ','蓝色电池盖 ','紫色电池盖 ','紫色卡托 ','蓝色卡托 ','黑色卡托 ','蓝色中框 ','紫色中框 ','黑色中框 '],
      },
      series: [ {
            type: 'bar',
            barWidth: 15,
         name:'齐套数',
          /*   barGap:'60%',
             barCategoryGap:'30%',多个并排柱子设置柱子之间的间距*/
              color: '#0086FF',
             data:[
               {value: 330},
               {value: 270},
               {value: 240},
               {value: 170},
               {value: 205},
               {value: 150},
               {value:180},
               {value: 125},
               {value: 119},
               {value: 160},
               {value: 130},
                 {value: 100},
            ],
            itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                        	var	 data=[330,270,240,170,205,150,180,125,119,160,130,100];
                          return data[params.dataIndex] + "K";
                        }, 
                         position: 'right', 
                         textStyle: {  
                                    fontWeight:'normal',  
                                    fontSize : '12',  
                                    fontFamily : 'MicrosoftYaHei', 
                                    color: '#545454',
                         }  },        
            }        
            },
           
        },
          
        
    ]
};


			
			    myChart.clear();
	            myChart.setOption(option);
			},
			
	onPress3 : function(){
		var data = {
			ProductCollection : [
					{value1:"范一杰",value2:"主板PCB",value3:"-72003",value4:"355980",value5:"355.998"},
					{value1:"范一杰",value2:"主板PCB",value3:"-72003",value4:"355980",value5:"355.998"},
					{value1:"范一杰",value2:"主板PCB",value3:"-72003",value4:"355980",value5:"355.998"},
					{value1:"范一杰",value2:"主板PCB",value3:"-72003",value4:"355980",value5:"355.998"},
					{value1:"范一杰",value2:"主板PCB",value3:"-72003",value4:"355980",value5:"355.998"},
					{value1:"范一杰",value2:"主板PCB",value3:"-72003",value4:"355980",value5:"355.998"},
					{value1:"范一杰",value2:"主板PCB",value3:"-72003",value4:"355980",value5:"355.998"}
				/*	{value1:"范一杰",value2:"主板PCB",value3:"-72003",value4:"355980",value5:"355.998"},
					{value1:"范一杰",value2:"主板PCB",value3:"-72003",value4:"355980",value5:"355.998"}*/
				]
		};
		var jsonModel = new sap.ui.model.json.JSONModel();
		jsonModel.setData(data);
		this.getView().setModel(jsonModel);
	
	},
		onPress4 : function(){
				this.id = this.createId("barChartsC");
				var oView = document.getElementById(this.id);
				var height = $(window).height();
				var width = $(window).width();
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;
				option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
       show:false
    },
     grid: {
       containLabel: true,
       x:40,  //左留白
             y:20,   //上留白
             x2:0,  //右留白
             y2:0   //下留白
      },
    xAxis:  {
        type: 'value',
        show:false
        
    },
    yAxis: {
        type: 'category',
        	axisTick:{
        			show:false
    			},//y轴线刻度
    			// y 轴线
    			axisLine:{
        			show:false
    			},
    			data:["理论集结 430K"],
    			axisLabel:{ 
        		 position: 'right', 
                         textStyle: {  
                                 /*   fontWeight:'bolder',  */
                                    fontSize : '20',  
                                    fontFamily : '宋体', 
                                    color: '#000000',
                         }
    		}  
    },
    series: [
        {
            name: '当前集结',
            type: 'bar',
            barWidth: 35,
            stack: '总量',
            color:['#0086FF'] ,
            label: {
                normal: {
                    show: true,
                    formatter : function(params){
                        return "当前集结: 410" +"K";
                    },
                     fontSize : '18',  
                     fontFamily : '宋体', 
                    position: 'insideLeft'
                }
            },
            data: [410]
        },
        {
            name: '缺失集结',
            type: 'bar',
            color:['#9396FF'] ,
            barWidth:35,
            stack: '总量',
            label: {
                normal: {
                    show: true,
                       fontSize : '18',  
                        formatter : function(params){
                        return "GAP: 20" +"K";
                    },
                    position: 'insideRight',
                      fontFamily : '宋体', 
                }
            },
            data: [20]
        },

    ]
};
				  myChart.clear();
	            myChart.setOption(option);
	
	},
			onPress5 : function(){
				this.id = this.createId("lineChartsD");
				var oView = document.getElementById(this.id);
				var height = $(window).height();
				var width = $(window).width();
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;
			 option = {
   title: {
           text: 'E6-IN-SMT',
         top:'center',
           textStyle:{
           /* color:'#ccc', */ //文字颜色
            fontStyle:'normal',  //字体风格,'normal','italic','oblique'
            fontWeight:'normal', //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontFamily:'sans-serif', //字体系列
      fontSize:17//字体大小
        },
    },
    grid: {
       containLabel: true,
       x:100,  //左留白
             y:20,   //上留白
             x2:0,  //右留白
             y2:0   //下留白
      },
      xAxis: { 
      	show:false,
       axisTick:{
          show:false
       },//y轴线刻度w
       // y 轴线
       axisLine:{
           show:false
       }, 
         splitLine:{
             show:false
         },
		max:'230',
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
      data : ['430套 '],
      },
      series: [{
      name:'FCST',
            type: 'bar',
            barWidth: 25,
            barGap:'-100%',
         //    barCategoryGap:'30%',/*多个并排柱子设置柱子之间的间距*/
              color:['#F3FBFF'] ,
             data:[
              {value: 230},
            ],
             itemStyle : { 
                 normal: {
                     label :{
                         show: false, 
                         position: 'right', 
                         textStyle: {  
                                    fontWeight:'bolder',  
                                    fontSize : '12',  
                                    fontFamily : 'MicrosoftYaHei', 
                                    color: '#696969',
                         }  },        
            }        
            },

           
        },
        {
   
            type: 'bar',
            barWidth: 25,
            barGap:'-100%',
            label: {
                normal: {
                    show: true,
                    formatter : function(params){
                        return '60' +"套";
                    },
                    fontSize : '20',  
                    fontFamily : 'PingFangSC-Medium', 
                    position: 'insideLeft'
                }
            },
            color:['#3AC2FB'] ,
            data:[{value: 110},],
            itemStyle : { 
                normal: {
                    label :{
                        show: false, 
                         position: 'right', 
                         textStyle: {  
                                 
                                    fontSize : '12',  
                                    fontFamily : 'PingFangSC-Medium', 
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
		onPress6 : function(){
				this.id = this.createId("lineChartsE");
				var oView = document.getElementById(this.id);
				var height = $(window).height();
				var width = $(window).width();
			/*	$('#'+ this.id).css('height',height/5);
				$('#'+ this.id).css('width',width/5);*/
				var myChart = echarts.init(oView);
				var option;
			  option = {
   
     grid: {
       containLabel: true,
       x:0,  //左留白
              y:20,   //上留白
              x2:15,  //右留白
              y2:0   //下留白
       },
      xAxis: { 
      	show:false,
       axisTick:{
          show:false
       },//y轴线刻度
       // y 轴线
       axisLine:{
           show:false
       }, 
         splitLine:{
             show:false
         },
/*   max:330,*/
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
   /*   data : ['430套 '],*/
      },
      series: [{
      name:'FCST',
            type: 'bar',
            barWidth: 25,
              barGap:'-100%',
         //    barCategoryGap:'30%',/*多个并排柱子设置柱子之间的间距*/
              color:['#F3FBFF'] ,
             data:[
              {value: 130},
            ],
             itemStyle : { 
                 normal: {
                     label :{
                         show: true, 
                         formatter:function(params){
                            return '830' +"套";
                        }, 
                         position: 'right', 
                         textStyle: {  
                                  /*  fontWeight:'bolder',  */
                                    fontSize : '12',  
                                    fontFamily : 'PingFangSC-Medium', 
                                    color: '#696969',
                         }  },        
            }        
            },

           
        },
        {
   
            type: 'bar',
            barWidth: 25,
            barGap:'-100%',
            left:'50%',
            label: {
                normal: {
                    show: true,
                    formatter : function(params){
                        return '830' +"套";
                    },
                    fontSize : '20',  
                    fontFamily : 'PingFangSC-Medium', 
                    position: 'insideLeft'
                }
            },
            color:['#0086FF'] ,
            data:[{value: 100},],
            itemStyle : { 
                normal: {
                    label :{
                        show: true, 
                         position: 'right', 
                         textStyle: {  
                                   
                                    fontSize : '12',  
                                    fontFamily : 'MicrosoftYaHei', 
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

	});
	
});