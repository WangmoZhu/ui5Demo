sap.ui.define([ "sap/ui/core/mvc/Controller", "../util/echarts",
		"../util/china", "../util/bmap.min", "../util/world",
		"../util/displayMap", 'sap/ui/model/json/JSONModel',
		'jquery.sap.global', ], function(Controller, echartsjs, china, bmap,
		world, displayMap, JSONModel, jQuery) {
	"use strict";
	
	var interval, h ,v;
	var myChart;
	var geoCoordMap = {
			'海门' : [ 121.15, 31.89 ],
			'鄂尔多斯' : [ 109.781327, 39.608266 ],
			'招远' : [ 120.38, 37.35 ],
			'舟山' : [ 122.207216, 29.985295 ],
			'齐齐哈尔' : [ 123.97, 47.33 ],
			'盐城' : [ 120.13, 33.38 ],
			'赤峰' : [ 118.87, 42.28 ],
			'青岛' : [ 120.33, 36.07 ],
			'乳山' : [ 121.52, 36.89 ],
			'金昌' : [ 102.188043, 38.520089 ],
			'泉州' : [ 118.58, 24.93 ],
			'莱西' : [ 120.53, 36.86 ],
			'日照' : [ 119.46, 35.42 ],
			'胶南' : [ 119.97, 35.88 ],
			'南通' : [ 121.05, 32.08 ],
			'拉萨' : [ 91.11, 29.97 ],
			'云浮' : [ 112.02, 22.93 ],
			'梅州' : [ 116.1, 24.55 ],
			'文登' : [ 122.05, 37.2 ],
			'上海' : [ 121.48, 31.22 ],
			'攀枝花' : [ 101.718637, 26.582347 ],
			'威海' : [ 122.1, 37.5 ],
			'承德' : [ 117.93, 40.97 ],
			'厦门' : [ 118.1, 24.46 ],
			'汕尾' : [ 115.375279, 22.786211 ],
			'潮州' : [ 116.63, 23.68 ],
			'丹东' : [ 124.37, 40.13 ],
			'太仓' : [ 121.1, 31.45 ],
			'曲靖' : [ 103.79, 25.51 ],
			'烟台' : [ 121.39, 37.52 ],
			'福州' : [ 119.3, 26.08 ],
			'瓦房店' : [ 121.979603, 39.627114 ],
			'即墨' : [ 120.45, 36.38 ],
			'抚顺' : [ 123.97, 41.97 ],
			'玉溪' : [ 102.52, 24.35 ],
			'张家口' : [ 114.87, 40.82 ],
			'阳泉' : [ 113.57, 37.85 ],
			'莱州' : [ 119.942327, 37.177017 ],
			'湖州' : [ 120.1, 30.86 ],
			'汕头' : [ 116.69, 23.39 ],
			'昆山' : [ 120.95, 31.39 ],
			'宁波' : [ 121.56, 29.86 ],
			'湛江' : [ 110.359377, 21.270708 ],
			'揭阳' : [ 116.35, 23.55 ],
			'荣成' : [ 122.41, 37.16 ],
			'连云港' : [ 119.16, 34.59 ],
			'葫芦岛' : [ 120.836932, 40.711052 ],
			'常熟' : [ 120.74, 31.64 ],
			'东莞' : [ 113.75, 23.04 ],
			'河源' : [ 114.68, 23.73 ],
			'淮安' : [ 119.15, 33.5 ],
			'泰州' : [ 119.9, 32.49 ],
			'南宁' : [ 108.33, 22.84 ],
			'营口' : [ 122.18, 40.65 ],
			'惠州' : [ 114.4, 23.09 ],
			'江阴' : [ 120.26, 31.91 ],
			'蓬莱' : [ 120.75, 37.8 ],
			'韶关' : [ 113.62, 24.84 ],
			'嘉峪关' : [ 98.289152, 39.77313 ],
			'广州' : [ 113.23, 23.16 ],
			'延安' : [ 109.47, 36.6 ],
			'太原' : [ 112.53, 37.87 ],
			'清远' : [ 113.01, 23.7 ],
			'中山' : [ 113.38, 22.52 ],
			'昆明' : [ 102.73, 25.04 ],
			'寿光' : [ 118.73, 36.86 ],
			'盘锦' : [ 122.070714, 41.119997 ],
			'长治' : [ 113.08, 36.18 ],
			'深圳' : [ 114.07, 22.62 ],
			'珠海' : [ 113.52, 22.3 ],
			'宿迁' : [ 118.3, 33.96 ],
			'咸阳' : [ 108.72, 34.36 ],
			'铜川' : [ 109.11, 35.09 ],
			'平度' : [ 119.97, 36.77 ],
			'佛山' : [ 113.11, 23.05 ],
			'海口' : [ 110.35, 20.02 ],
			'江门' : [ 113.06, 22.61 ],
			'章丘' : [ 117.53, 36.72 ],
			'肇庆' : [ 112.44, 23.05 ],
			'大连' : [ 121.62, 38.92 ],
			'临汾' : [ 111.5, 36.08 ],
			'吴江' : [ 120.63, 31.16 ],
			'石嘴山' : [ 106.39, 39.04 ],
			'沈阳' : [ 123.38, 41.8 ],
			'苏州' : [ 120.62, 31.32 ],
			'茂名' : [ 110.88, 21.68 ],
			'嘉兴' : [ 120.76, 30.77 ],
			'长春' : [ 125.35, 43.88 ],
			'胶州' : [ 120.03336, 36.264622 ],
			'银川' : [ 106.27, 38.47 ],
			'张家港' : [ 120.555821, 31.875428 ],
			'三门峡' : [ 111.19, 34.76 ],
			'锦州' : [ 121.15, 41.13 ],
			'南昌' : [ 115.89, 28.68 ],
			'柳州' : [ 109.4, 24.33 ],
			'三亚' : [ 109.511909, 18.252847 ],
			'自贡' : [ 104.778442, 29.33903 ],
			'吉林' : [ 126.57, 43.87 ],
			'阳江' : [ 111.95, 21.85 ],
			'泸州' : [ 105.39, 28.91 ],
			'西宁' : [ 101.74, 36.56 ],
			'宜宾' : [ 104.56, 29.77 ],
			'呼和浩特' : [ 111.65, 40.82 ],
			'成都' : [ 104.06, 30.67 ],
			'大同' : [ 113.3, 40.12 ],
			'镇江' : [ 119.44, 32.2 ],
			'桂林' : [ 110.28, 25.29 ],
			'张家界' : [ 110.479191, 29.117096 ],
			'宜兴' : [ 119.82, 31.36 ],
			'北海' : [ 109.12, 21.49 ],
			'西安' : [ 108.95, 34.27 ],
			'金坛' : [ 119.56, 31.74 ],
			'东营' : [ 118.49, 37.46 ],
			'牡丹江' : [ 129.58, 44.6 ],
			'遵义' : [ 106.9, 27.7 ],
			'绍兴' : [ 120.58, 30.01 ],
			'扬州' : [ 119.42, 32.39 ],
			'常州' : [ 119.95, 31.79 ],
			'潍坊' : [ 119.1, 36.62 ],
			'重庆' : [ 106.54, 29.59 ],
			'台州' : [ 121.420757, 28.656386 ],
			'南京' : [ 118.78, 32.04 ],
			'滨州' : [ 118.03, 37.36 ],
			'贵阳' : [ 106.71, 26.57 ],
			'无锡' : [ 120.29, 31.59 ],
			'本溪' : [ 123.73, 41.3 ],
			'克拉玛依' : [ 84.77, 45.59 ],
			'渭南' : [ 109.5, 34.52 ],
			'马鞍山' : [ 118.48, 31.56 ],
			'宝鸡' : [ 107.15, 34.38 ],
			'焦作' : [ 113.21, 35.24 ],
			'句容' : [ 119.16, 31.95 ],
			'北京' : [ 116.46, 39.92 ],
			'徐州' : [ 117.2, 34.26 ],
			'衡水' : [ 115.72, 37.72 ],
			'包头' : [ 110, 40.58 ],
			'绵阳' : [ 104.73, 31.48 ],
			'乌鲁木齐' : [ 87.68, 43.77 ],
			'枣庄' : [ 117.57, 34.86 ],
			'杭州' : [ 120.19, 30.26 ],
			'淄博' : [ 118.05, 36.78 ],
			'鞍山' : [ 122.85, 41.12 ],
			'溧阳' : [ 119.48, 31.43 ],
			'库尔勒' : [ 86.06, 41.68 ],
			'安阳' : [ 114.35, 36.1 ],
			'开封' : [ 114.35, 34.79 ],
			'济南' : [ 117, 36.65 ],
			'德阳' : [ 104.37, 31.13 ],
			'温州' : [ 120.65, 28.01 ],
			'九江' : [ 115.97, 29.71 ],
			'邯郸' : [ 114.47, 36.6 ],
			'临安' : [ 119.72, 30.23 ],
			'兰州' : [ 103.73, 36.03 ],
			'沧州' : [ 116.83, 38.33 ],
			'临沂' : [ 118.35, 35.05 ],
			'南充' : [ 106.110698, 30.837793 ],
			'天津' : [ 117.2, 39.13 ],
			'富阳' : [ 119.95, 30.07 ],
			'泰安' : [ 117.13, 36.18 ],
			'诸暨' : [ 120.23, 29.71 ],
			'郑州' : [ 113.65, 34.76 ],
			'哈尔滨' : [ 126.63, 45.75 ],
			'聊城' : [ 115.97, 36.45 ],
			'芜湖' : [ 118.38, 31.33 ],
			'唐山' : [ 118.02, 39.63 ],
			'平顶山' : [ 113.29, 33.75 ],
			'邢台' : [ 114.48, 37.05 ],
			'德州' : [ 116.29, 37.45 ],
			'济宁' : [ 116.59, 35.38 ],
			'荆州' : [ 112.239741, 30.335165 ],
			'宜昌' : [ 111.3, 30.7 ],
			'义乌' : [ 120.06, 29.32 ],
			'丽水' : [ 119.92, 28.45 ],
			'洛阳' : [ 112.44, 34.7 ],
			'秦皇岛' : [ 119.57, 39.95 ],
			'株洲' : [ 113.16, 27.83 ],
			'石家庄' : [ 114.48, 38.03 ],
			'莱芜' : [ 117.67, 36.19 ],
			'常德' : [ 111.69, 29.05 ],
			'保定' : [ 115.48, 38.85 ],
			'湘潭' : [ 112.91, 27.87 ],
			'金华' : [ 119.64, 29.12 ],
			'岳阳' : [ 113.09, 29.37 ],
			'长沙' : [ 113, 28.21 ],
			'衢州' : [ 118.88, 28.97 ],
			'廊坊' : [ 116.7, 39.53 ],
			'菏泽' : [ 115.480656, 35.23375 ],
			'合肥' : [ 117.27, 31.86 ],
			'武汉' : [ 114.31, 30.52 ],
			'大庆' : [ 125.03, 46.58 ]
		};
		
	var imageArr = [];
	var dataPosition = [];
	var page;

	return Controller.extend("echart.controller.View1", {
		onInit : function() {
			
			page = this.byId("page");
			console.log(page);
			var image1 = new sap.m.Image({
				src: 'image/ali.gif',
				width: "2rem",
				height: "2rem"
			});
			console.log(image1.getDomRef());
			var image2 = new sap.m.Image({
				src: 'image/ali.gif',
				width: "2rem",
				height: "2rem"
			});
			var image3 = new sap.m.Image({
				src: 'image/ali.gif',
				width: "2rem",
				height: "2rem"
			})
			imageArr.push(image1);
			imageArr.push(image2);
			imageArr.push(image3);
			for(let i=0 ; i<imageArr.length; i++){
				page.addContent(imageArr[i]);
			}

		},

		onAfterRendering : function() {
			
			var page = this.byId("page");
			console.log(page);

			var oModel = new JSONModel(jQuery.sap.getModulePath("echart.model",
					"/products.json"));
			this.getView().setModel(oModel);
			// 基于准备好的dom，初始化echarts实例
			this.getView().addStyleClass("style");
			this.id = this.createId("china");
			var oView = document.getElementById(this.id);
			var height = $(window).height();
			var width = $(window).width();
			$('#' + this.id).css('height', height * 0.6);
			$('#' + this.id).css('width', "70%");
			myChart = echarts.init(oView);

			var option = this.displayMap("china");

			// 世界地图
			this.id_world = this.createId("world");
			var oView_world = document.getElementById(this.id_world);
			var height_world = $(window).height();
			$('#' + this.id_world).css('height', 200);
			$('#' + this.id_world).css('width', "20%");
			$('#' + this.id_world).css('position', "absolute");
			$('#' + this.id_world).css('top', height * 0.6 - 200);
			$('#' + this.id_world).css('left', width * 0.5);
			var myChart_world = echarts.init(oView_world);

			var option_world = this.displayMap("world");

			// 其他部分
			this.id_influ = this.createId("influence");
			var oView_influ = document.getElementById(this.id_influ);
			$('#' + this.id_influ).css('height', height * 0.3);
			$('#' + this.id_influ).css('width', "70%");
			var myChart_influ = echarts.init(oView_influ);
			var option_influ = this.displayMap("inlu");

			// 使用制定的配置项和数据显示图表
			myChart.setOption(option_world);
			var a = myChart.convertToPixel({geoId: "zwm"},[ 115.89, 28.68 ])
			console.log(a);
			var b = myChart.convertToPixel({geoId: "zwm"},[ 108.95, 34.27 ]);
			var c = myChart.convertToPixel({geoId: "zwm"},[ 121.48, 31.22 ]);
			
			dataPosition.push(a,b,c);
			
			for(let j=0; j<imageArr.length; j++){
				imageArr[j].addStyleClass("gif");
				console.log(imageArr[j].getDomRef());
				imageArr[j].getDomRef().style.top = (dataPosition[j][1] + 10) + 'px';
				imageArr[j].getDomRef().style.left = (dataPosition[j][0] - 10) +  'px';
			}
			
			
			// myChart_world.setOption(option);
			myChart_influ.setOption(option_influ);

			// 4个table
			this.id_last = this.createId("last");
			$('#' + this.id_last).css('height', height * 0.9);
			$('#' + this.id_last).css('width', "30%");
			$('#' + this.id_last).css('backgroundColor', "white");
			$('#' + this.id_last).css('position', "absolute");
			$('#' + this.id_last).css('right', 0);
			$('#' + this.id_last).css('top', 0);

			// 第一个table
			this.id_tab1 = this.createId("tab1");
			$('#' + this.id_tab1).css('height', height * 0.9 * 0.15);
			$('#' + this.id_tab1).css('backgroundColor', "white");

			// 第一个table
			this.id_tab2 = this.createId("tab2");
			$('#' + this.id_tab2).css('height', height * 0.9 * 0.2);
			$('#' + this.id_tab2).css('backgroundColor', "white");

			// 第一个table
			this.id_tab3 = this.createId("tab3");
			$('#' + this.id_tab3).css('height', height * 0.9 * 0.4);
			$('#' + this.id_tab3).css('backgroundColor', "white");
			$('#' + this.id_tab3).css('overflow', "hidden");
			// $('#'+ this.id_tab3).find("li").css('height',"10%");

			// 第一个table
			this.id_tab4 = this.createId("tab4");
			$('#' + this.id_tab4).css('height', height * 0.9 * 0.25);
			$('#' + this.id_tab4).css('backgroundColor', "white");
			$('#' + this.id_tab4).css('word-wrap', "break-all");
			$('#' + this.id_tab4).css('overflow', "hidden");

			// table
			this.id_table = this.createId("table");
			// $('#'+ this.id_table).find("thead").hide();
			$('#' + this.id_table).find("tr").css('height', "1rem");

		},

		displayMap : function(level) {

			var option;

			if (level == "china") {

				// function randomData() {
				// return Math.round(Math.random()*500);
				// }
				//				
				// var mydata = [
				// {name: '北京',value: '100' },{name: '天津',value: randomData() },
				// {name: '上海',value: randomData() },{name: '重庆',value:
				// randomData() },
				// {name: '河北',value: randomData() },{name: '河南',value:
				// randomData() },
				// {name: '云南',value: randomData() },{name: '辽宁',value:
				// randomData() },
				// {name: '黑龙江',value: randomData() },{name: '湖南',value:
				// randomData() },
				// {name: '安徽',value: randomData() },{name: '山东',value:
				// randomData() },
				// {name: '新疆',value: randomData() },{name: '江苏',value:
				// randomData() },
				// {name: '浙江',value: randomData() },{name: '江西',value:
				// randomData() },
				// {name: '湖北',value: randomData() },{name: '广西',value:
				// randomData() },
				// {name: '甘肃',value: randomData() },{name: '山西',value:
				// randomData() },
				// {name: '内蒙古',value: randomData() },{name: '陕西',value:
				// randomData() },
				// {name: '吉林',value: randomData() },{name: '福建',value:
				// randomData() },
				// {name: '贵州',value: randomData() },{name: '广东',value:
				// randomData() },
				// {name: '青海',value: randomData() },{name: '西藏',value:
				// randomData() },
				// {name: '四川',value: randomData() },{name: '宁夏',value:
				// randomData() },
				// {name: '海南',value: randomData() },{name: '台湾',value:
				// randomData() },
				// {name: '香港',value: randomData() },{name: '澳门',value:
				// randomData() }
				// ];
				//				
				// option = {
				// backgroundColor: '#003366',
				// title: {
				// text: '全国地图大数据',
				// subtext: '',
				// x:'center'
				// },
				// tooltip : {
				// trigger: 'item'
				// },
				//			           
				// //左侧小导航图标
				// visualMap: {
				// type: 'continuous',
				// min: 0,
				// max: 1000000,
				// text:['High','Low'],
				// realtime: false,
				// calculable : true,
				// color: ['orangered','yellow','lightskyblue']
				// },
				//			           
				// //配置属性
				// series: [{
				// name: '数据',
				// type: 'map',
				// mapType: 'china',
				// roam: true,
				// label: {
				// normal: {
				// show: true //省份名称
				// },
				// emphasis: {
				// show: false
				// }
				// },
				// data:mydata //数据
				// }]
				// };
				var data = [ {
					name : '海门',
					value : 80
				},{
					name: '南昌',
					value: 100
				},{
					name: '上海',
					value: 50
				} ];

				
				function convertData(data) {
					var res = [];
					for (var i = 0; i < data.length; i++) {
						var geoCoord = geoCoordMap[data[i].name];
						if (geoCoord) {
							res.push({
								name : data[i].name,
								value : geoCoord.concat(data[i].value)
							});
						}
					}
					return res;
				}
				;

				function randomValue() {
					return Math.round(Math.random() * 1000);
				}

				option = {
					tooltip : {},
					visualMap : {
						min : 0,
						max : 1500,
						left : 'left',
						top : 'bottom',
						text : [ 'High', 'Low' ],
						seriesIndex : [ 1 ],
						inRange : {
							color : [ '#C0C0C0', '#006699' ]
						},
						calculable : true
					},
					geo : {
						map : 'china',
						roam : true,
						label : {
							normal : {
								show : true,
								textStyle : {
									color : 'rgba(0,0,0,0.4)'
								}
							}
						},
						itemStyle : {
							normal : {
								borderColor : 'rgba(0, 0, 0, 0.2)'
							},
							emphasis : {
								areaColor : null,
								shadowOffsetX : 0,
								shadowOffsetY : 0,
								shadowBlur : 20,
								borderWidth : 0,
								shadowColor : 'rgba(0, 0, 0, 0.5)'
							}
						}
					},
					series : [ {
						name : 'pm2.5',
						type : 'scatter',
						coordinateSystem : 'geo',
						data : convertData(data),
						encode : {
							value : 2
						},
						symbolSize : function(val) {
							return val[2] / 3;
						},
						label : {
							normal : {
								formatter : '{b}',
								position : 'right',
								show : false
							},
							emphasis : {
								show : true
							}
						},
						itemStyle : {
							normal : {
								color : 'yellow'
							}
						}
					},
					// {
					// name: 'Top 5',
					// type: 'effectScatter',
					// coordinateSystem: 'geo',
					// data: convertData(data.sort(function (a, b) {
					// return b.value - a.value;
					// }).slice(0, 6)),
					// encode: {
					// value: 2
					// },
					// symbolSize: function (val) {
					// return val[2] / 3;
					// },
					// showEffectOn: 'render',
					// rippleEffect: {
					// brushType: 'stroke'
					// },
					// hoverAnimation: true,
					// label: {
					// normal: {
					// formatter: '{b}',
					// position: 'right',
					// show: true
					// }
					// },
					// itemStyle: {
					// normal: {
					// color: 'yellow',
					// }
					// },
					// zlevel: 1
					// },
					{
						name : 'categoryA',
						type : 'map',
						geoIndex : 0,
						// tooltip: {show: false},
						data : [ {
							name : '北京',
							value : randomValue()
						}, {
							name : '天津',
							value : randomValue()
						}, {
							name : '上海',
							value : randomValue()
						}, {
							name : '重庆',
							value : randomValue()
						}, {
							name : '河北',
							value : randomValue()
						}, {
							name : '河南',
							value : randomValue()
						}, {
							name : '云南',
							value : randomValue()
						}, {
							name : '辽宁',
							value : randomValue()
						}, {
							name : '黑龙江',
							value : randomValue()
						}, {
							name : '湖南',
							value : randomValue()
						}, {
							name : '安徽',
							value : randomValue()
						}, {
							name : '山东',
							value : randomValue()
						}, {
							name : '新疆',
							value : randomValue()
						}, {
							name : '江苏',
							value : randomValue()
						}, {
							name : '浙江',
							value : randomValue()
						}, {
							name : '江西',
							value : randomValue()
						}, {
							name : '湖北',
							value : randomValue()
						}, {
							name : '广西',
							value : randomValue()
						}, {
							name : '甘肃',
							value : randomValue()
						}, {
							name : '山西',
							value : randomValue()
						}, {
							name : '内蒙古',
							value : randomValue()
						}, {
							name : '陕西',
							value : randomValue()
						}, {
							name : '吉林',
							value : randomValue()
						}, {
							name : '福建',
							value : randomValue()
						}, {
							name : '贵州',
							value : randomValue()
						}, {
							name : '广东',
							value : randomValue()
						}, {
							name : '青海',
							value : randomValue()
						}, {
							name : '西藏',
							value : randomValue()
						}, {
							name : '四川',
							value : randomValue()
						}, {
							name : '宁夏',
							value : randomValue()
						}, {
							name : '海南',
							value : randomValue()
						}, {
							name : '台湾',
							value : randomValue()
						}, {
							name : '香港',
							value : randomValue()
						}, {
							name : '澳门',
							value : randomValue()
						} ]
					} ]
				};

			} else if (level == "world") {
				var data = [ {
					name : '西安',
					value : 20
				},{
					name: '南昌',
					value: 20
				},{
					name: '上海',
					value: 20
				} ];
				
				function convertData(data) {
					var res = [];
					for (var i = 0; i < data.length; i++) {
						var geoCoord = geoCoordMap[data[i].name];
						if (geoCoord) {
							res.push({
								name : data[i].name,
								value : geoCoord.concat(data[i].value)
							});

						} else {
							res.push({
								name : data[i].name,
								value : 1212,
								itemStyle : {
									areaColor : "blue"
								},
							});

						}
					}
					return res;
				}
				;

				function randomValue() {
					return Math.round(Math.random() * 1000);
				}

				option = {
					backgroundColor : "white",
					// title : {
					// text: 'World Population (2010)',
					// subtext: 'from United Nations, Total population, both
					// sexes combined, as of 1 July (thousands)',
					// sublink :
					// 'http://esa.un.org/wpp/Excel-Data/population.htm',
					// left: 'center',
					// top: 'top'
					// },
					// tooltip : {
					// trigger: 'item',
					// formatter : function (params) {
					// var value = (params.value + '').split('.');
					// value =
					// value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
					// + '.' + value[1];
					// return params.seriesName + '<br/>' + params.name + ' : '
					// + value;
					// }
					// },
					// toolbox: {
					// show : true,
					// orient : 'vertical',
					// left: 'right',
					// top: 'center',
					// feature : {
					// mark : {show: true},
					// dataView : {show: true, readOnly: false},
					// restore : {show: true},
					// saveAsImage : {show: true}
					// }
					// },
					// visualMap: {
					// type: 'continuous',
					// min: 0,
					// max: 1000000,
					// text:['High','Low'],
					// realtime: false,
					// calculable : true,
					// color: ['orangered','yellow','lightskyblue']
					// },
					geo : {
						id: "zwm",
						map : 'world',
						zoom : 3.5,
						center : [ 100.97, 29.71 ],
						roam : true,
						// label: {
						// normal: {
						// show: true,
						// textStyle: {
						// color: 'rgba(0,0,0,0.4)'
						// }
						// }
						// },
						regions : [ {
							name : 'China',
							itemStyle : {
								areaColor : 'red',
								color : 'red'
							}
						}, {
							name : 'Japan',
							itemStyle : {
								areaColor : 'Yellow',
								color : 'red'
							}
						}, {
							name : 'India',
							itemStyle : {
								areaColor : 'Blue',
								color : 'red'
							}
						} ],
						itemStyle : {
						// normal:{
						// borderColor: 'rgba(0, 0, 0, 0.2)'
						// },
						// emphasis:{
						// areaColor: null,
						// shadowOffsetX: 0,
						// shadowOffsetY: 0,
						// shadowBlur: 20,
						// borderWidth: 0,
						// shadowColor: 'rgba(0, 0, 0, 0.5)'
						// }
						}
					},
					series : [ {
						name : 'pm2.5',
						type : 'effectScatter',
//						rippleEffect:{
//							scale: 1.5,
//						},
						
//						symbol:"image://image/ali.gif",
						coordinateSystem : 'geo',
						data : convertData(data),
						encode : {
							value : 2
						},
						symbolSize : function(val) {
							return val[2] / 3;
						},
						label : {
							normal : {
								formatter : '{b}',
								position : 'right',
								show : false
							},
							emphasis : {
								show : true
							}
						},
						itemStyle : {
							normal : {
								color : 'yellow'
							}
						}
					},
					// {
					// name: 'World Population (2010)',
					// type: 'map',
					// mapType: 'world',
					// // nameMap:{
					// // 'China' : '中国',
					// // 'India' : '印度',
					// // },
					// roam: true,
					// // itemStyle:{
					// // emphasis:{label:{show:true}},
					// // areaColor:"#C0C0C0"
					// // },
					// data:[
					// // {name : 'Afghanistan', value : 28397.812},
					// // {name : 'Angola', value : 19549.124},
					// // {name : 'Albania', value : 3150.143},
					// // {name : 'United Arab Emirates', value : 8441.537},
					// // {name : 'Argentina', value : 40374.224},
					// // {name : 'Armenia', value : 2963.496},
					// // {name : 'French Southern and Antarctic Lands', value :
					// 268.065},
					// // {name : 'Australia', value : 22404.488},
					// // {name : 'Austria', value : 8401.924},
					// // {name : 'Azerbaijan', value : 9094.718},
					// // {name : 'Burundi', value : 9232.753},
					// // {name : 'Belgium', value : 10941.288},
					// // {name : 'Benin', value : 9509.798},
					// // {name : 'Burkina Faso', value : 15540.284},
					// // {name : 'Bangladesh', value : 151125.475},
					// // {name : 'Bulgaria', value : 7389.175},
					// // {name : 'The Bahamas', value : 66402.316},
					// // {name : 'Bosnia and Herzegovina', value : 3845.929},
					// // {name : 'Belarus', value : 9491.07},
					// // {name : 'Belize', value : 308.595},
					// // {name : 'Bermuda', value : 64.951},
					// // {name : 'Bolivia', value : 716.939},
					// // {name : 'Brazil', value : 195210.154},
					// // {name : 'Brunei', value : 27.223},
					// // {name : 'Bhutan', value : 716.939},
					// // {name : 'Botswana', value : 1969.341},
					// // {name : 'Central African Republic', value : 4349.921},
					// // {name : 'Canada', value : 34126.24},
					// // {name : 'Switzerland', value : 7830.534},
					// // {name : 'Chile', value : 17150.76},
					// {name: 'China', value: 1000000,
					// itemStyle:{
					// areaColor:"blue"
					// },
					// },
					// // {name : 'Ivory Coast', value : 60508.978},
					// // {name : 'Cameroon', value : 20624.343},
					// // {name : 'Democratic Republic of the Congo', value :
					// 62191.161},
					// // {name : 'Republic of the Congo', value : 3573.024},
					// // {name : 'Colombia', value : 46444.798},
					// // {name : 'Costa Rica', value : 4669.685},
					// // {name : 'Cuba', value : 11281.768},
					// // {name : 'Northern Cyprus', value : 1.468},
					// // {name : 'Cyprus', value : 1103.685},
					// // {name : 'Czech Republic', value : 10553.701},
					// // {name : 'Germany', value : 83017.404},
					// // {name : 'Djibouti', value : 834.036},
					// // {name : 'Denmark', value : 5550.959},
					// // {name : 'Dominican Republic', value : 10016.797},
					// // {name : 'Algeria', value : 37062.82},
					// // {name : 'Ecuador', value : 15001.072},
					// // {name : 'Egypt', value : 78075.705},
					// // {name : 'Eritrea', value : 5741.159},
					// // {name : 'Spain', value : 46182.038},
					// // {name : 'Estonia', value : 1298.533},
					// // {name : 'Ethiopia', value : 87095.281},
					// // {name : 'Finland', value : 5367.693},
					// // {name : 'Fiji', value : 860.559},
					// // {name : 'Falkland Islands', value : 49.581},
					// // {name : 'France', value : 63230.866},
					// // {name : 'Gabon', value : 1556.222},
					// // {name : 'United Kingdom', value : 62066.35},
					// // {name : 'Georgia', value : 4388.674},
					// // {name : 'Ghana', value : 24262.901},
					// // {name : 'Guinea', value : 10876.033},
					// // {name : 'Gambia', value : 1680.64},
					// // {name : 'Guinea Bissau', value : 10876.033},
					// // {name : 'Equatorial Guinea', value : 696.167},
					// // {name : 'Greece', value : 11109.999},
					// // {name : 'Greenland', value : 56.546},
					// // {name : 'Guatemala', value : 14341.576},
					// // {name : 'French Guiana', value : 231.169},
					// // {name : 'Guyana', value : 786.126},
					// // {name : 'Honduras', value : 7621.204},
					// // {name : 'Croatia', value : 4338.027},
					// // {name : 'Haiti', value : 9896.4},
					// // {name : 'Hungary', value : 10014.633},
					// // {name : 'Indonesia', value : 240676.485},
					// // {name : 'India', value : 120562.648},
					// // {name : 'Ireland', value : 4467.561},
					// // {name : 'Iran', value : 240676.485},
					// // {name : 'Iraq', value : 30962.38},
					// // {name : 'Iceland', value : 318.042},
					// // {name : 'Israel', value : 7420.368},
					// // {name : 'Italy', value : 60508.978},
					// // {name : 'Jamaica', value : 2741.485},
					// // {name : 'Jordan', value : 6454.554},
					// {name : 'Japan', value : 127352.833,
					// itemStyle:{
					// areaColor:"blue"
					// },
					// },
					// // {name : 'Kazakhstan', value : 15921.127},
					// // {name : 'Kenya', value : 40909.194},
					// // {name : 'Kyrgyzstan', value : 5334.223},
					// // {name : 'Cambodia', value : 14364.931},
					// // {name : 'South Korea', value : 51452.352},
					// // {name : 'Kosovo', value : 97.743},
					// // {name : 'Kuwait', value : 2991.58},
					// // {name : 'Laos', value : 6395.713},
					// // {name : 'Lebanon', value : 4341.092},
					// // {name : 'Liberia', value : 3957.99},
					// // {name : 'Libya', value : 6040.612},
					// // {name : 'Sri Lanka', value : 20758.779},
					// // {name : 'Lesotho', value : 2008.921},
					// // {name : 'Lithuania', value : 3068.457},
					// // {name : 'Luxembourg', value : 507.885},
					// // {name : 'Latvia', value : 2090.519},
					// // {name : 'Morocco', value : 31642.36},
					// // {name : 'Moldova', value : 103.619},
					// // {name : 'Madagascar', value : 21079.532},
					// // {name : 'Mexico', value : 117886.404},
					// // {name : 'Macedonia', value : 507.885},
					// // {name : 'Mali', value : 13985.961},
					// // {name : 'Myanmar', value : 51931.231},
					// // {name : 'Montenegro', value : 620.078},
					// // {name : 'Mongolia', value : 2712.738},
					// // {name : 'Mozambique', value : 23967.265},
					// // {name : 'Mauritania', value : 3609.42},
					// // {name : 'Malawi', value : 15013.694},
					// // {name : 'Malaysia', value : 28275.835},
					// // {name : 'Namibia', value : 2178.967},
					// // {name : 'New Caledonia', value : 246.379},
					// // {name : 'Niger', value : 15893.746},
					// // {name : 'Nigeria', value : 159707.78},
					// // {name : 'Nicaragua', value : 5822.209},
					// // {name : 'Netherlands', value : 16615.243},
					// // {name : 'Norway', value : 4891.251},
					// // {name : 'Nepal', value : 26846.016},
					// // {name : 'New Zealand', value : 4368.136},
					// // {name : 'Oman', value : 2802.768},
					// // {name : 'Pakistan', value : 173149.306},
					// // {name : 'Panama', value : 3678.128},
					// // {name : 'Peru', value : 29262.83},
					// // {name : 'Philippines', value : 93444.322},
					// // {name : 'Papua New Guinea', value : 6858.945},
					// // {name : 'Poland', value : 38198.754},
					// // {name : 'Puerto Rico', value : 3709.671},
					// // {name : 'North Korea', value : 1.468},
					// // {name : 'Portugal', value : 10589.792},
					// // {name : 'Paraguay', value : 6459.721},
					// // {name : 'Qatar', value : 1749.713},
					// // {name : 'Romania', value : 21861.476},
					// // {name : 'Russia', value : 21861.476},
					// // {name : 'Rwanda', value : 10836.732},
					// // {name : 'Western Sahara', value : 514.648},
					// // {name : 'Saudi Arabia', value : 27258.387},
					// // {name : 'Sudan', value : 35652.002},
					// // {name : 'South Sudan', value : 9940.929},
					// // {name : 'Senegal', value : 12950.564},
					// // {name : 'Solomon Islands', value : 526.447},
					// // {name : 'Sierra Leone', value : 5751.976},
					// // {name : 'El Salvador', value : 6218.195},
					// // {name : 'Somaliland', value : 9636.173},
					// // {name : 'Somalia', value : 9636.173},
					// // {name : 'Republic of Serbia', value : 3573.024},
					// // {name : 'Suriname', value : 524.96},
					// // {name : 'Slovakia', value : 5433.437},
					// // {name : 'Slovenia', value : 2054.232},
					// // {name : 'Sweden', value : 9382.297},
					// // {name : 'Swaziland', value : 1193.148},
					// // {name : 'Syria', value : 7830.534},
					// // {name : 'Chad', value : 11720.781},
					// // {name : 'Togo', value : 6306.014},
					// // {name : 'Thailand', value : 66402.316},
					// // {name : 'Tajikistan', value : 7627.326},
					// // {name : 'Turkmenistan', value : 5041.995},
					// // {name : 'East Timor', value : 10016.797},
					// // {name : 'Trinidad and Tobago', value : 1328.095},
					// // {name : 'Tunisia', value : 10631.83},
					// // {name : 'Turkey', value : 72137.546},
					// // {name : 'United Republic of Tanzania', value :
					// 44973.33},
					// // {name : 'Uganda', value : 33987.213},
					// // {name : 'Ukraine', value : 46050.22},
					// // {name : 'Uruguay', value : 3371.982},
					// // {name : 'United States of America', value :
					// 312247.116},
					// // {name : 'Uzbekistan', value : 27769.27},
					// // {name : 'Venezuela', value : 236.299},
					// // {name : 'Vietnam', value : 89047.397},
					// // {name : 'Vanuatu', value : 236.299},
					// // {name : 'West Bank', value : 13.565},
					// // {name : 'Yemen', value : 22763.008},
					// // {name : 'South Africa', value : 51452.352},
					// // {name : 'Zambia', value : 13216.985},
					// // {name : 'Zimbabwe', value : 13076.978}
					// ]
					// }
					]
				};
				

			}else if(level == "world1"){

				var data = [ {
					name : '九江',
					value : 80
				},{
					name: '北京',
					value: 100
				},{
					name: '天津',
					value: 50
				} ];

				

				function convertData(data) {
					var res = [];
					for (var i = 0; i < data.length; i++) {
						var geoCoord = geoCoordMap[data[i].name];
						if (geoCoord) {
							res.push({
								name : data[i].name,
								value : geoCoord.concat(data[i].value)
							});

						} else {
							res.push({
								name : data[i].name,
								value : 1212,
								itemStyle : {
									areaColor : "blue"
								},
							});

						}
					}
					return res;
				}
				;

				function randomValue() {
					return Math.round(Math.random() * 1000);
				}

				option = {
					backgroundColor : "white",
					// title : {
					// text: 'World Population (2010)',
					// subtext: 'from United Nations, Total population, both
					// sexes combined, as of 1 July (thousands)',
					// sublink :
					// 'http://esa.un.org/wpp/Excel-Data/population.htm',
					// left: 'center',
					// top: 'top'
					// },
					// tooltip : {
					// trigger: 'item',
					// formatter : function (params) {
					// var value = (params.value + '').split('.');
					// value =
					// value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
					// + '.' + value[1];
					// return params.seriesName + '<br/>' + params.name + ' : '
					// + value;
					// }
					// },
					// toolbox: {
					// show : true,
					// orient : 'vertical',
					// left: 'right',
					// top: 'center',
					// feature : {
					// mark : {show: true},
					// dataView : {show: true, readOnly: false},
					// restore : {show: true},
					// saveAsImage : {show: true}
					// }
					// },
					// visualMap: {
					// type: 'continuous',
					// min: 0,
					// max: 1000000,
					// text:['High','Low'],
					// realtime: false,
					// calculable : true,
					// color: ['orangered','yellow','lightskyblue']
					// },
					geo : {
						map : 'world',
						zoom : 3.5,
						center : [ 100.97, 29.71 ],
						roam : true,
						// label: {
						// normal: {
						// show: true,
						// textStyle: {
						// color: 'rgba(0,0,0,0.4)'
						// }
						// }
						// },
						regions : [ {
							name : 'China',
							itemStyle : {
								areaColor : 'red',
								color : 'red'
							}
						}, {
							name : 'Japan',
							itemStyle : {
								areaColor : 'Yellow',
								color : 'red'
							}
						}, {
							name : 'India',
							itemStyle : {
								areaColor : 'Blue',
								color : 'red'
							}
						} ],
						itemStyle : {
						// normal:{
						// borderColor: 'rgba(0, 0, 0, 0.2)'
						// },
						// emphasis:{
						// areaColor: null,
						// shadowOffsetX: 0,
						// shadowOffsetY: 0,
						// shadowBlur: 20,
						// borderWidth: 0,
						// shadowColor: 'rgba(0, 0, 0, 0.5)'
						// }
						}
					},
					series : [ {
						name : 'pm2.5',
						type : 'scatter',
						symbol:"image://image/ali.gif",
						coordinateSystem : 'geo',
						data : convertData(data),
						encode : {
							value : 2
						},
						symbolSize : function(val) {
							return val[2] / 3;
						},
						label : {
							normal : {
								formatter : '{b}',
								position : 'right',
								show : false
							},
							emphasis : {
								show : true
							}
						},
						itemStyle : {
							normal : {
								color : 'yellow'
							}
						}
					},
					// {
					// name: 'World Population (2010)',
					// type: 'map',
					// mapType: 'world',
					// // nameMap:{
					// // 'China' : '中国',
					// // 'India' : '印度',
					// // },
					// roam: true,
					// // itemStyle:{
					// // emphasis:{label:{show:true}},
					// // areaColor:"#C0C0C0"
					// // },
					// data:[
					// // {name : 'Afghanistan', value : 28397.812},
					// // {name : 'Angola', value : 19549.124},
					// // {name : 'Albania', value : 3150.143},
					// // {name : 'United Arab Emirates', value : 8441.537},
					// // {name : 'Argentina', value : 40374.224},
					// // {name : 'Armenia', value : 2963.496},
					// // {name : 'French Southern and Antarctic Lands', value :
					// 268.065},
					// // {name : 'Australia', value : 22404.488},
					// // {name : 'Austria', value : 8401.924},
					// // {name : 'Azerbaijan', value : 9094.718},
					// // {name : 'Burundi', value : 9232.753},
					// // {name : 'Belgium', value : 10941.288},
					// // {name : 'Benin', value : 9509.798},
					// // {name : 'Burkina Faso', value : 15540.284},
					// // {name : 'Bangladesh', value : 151125.475},
					// // {name : 'Bulgaria', value : 7389.175},
					// // {name : 'The Bahamas', value : 66402.316},
					// // {name : 'Bosnia and Herzegovina', value : 3845.929},
					// // {name : 'Belarus', value : 9491.07},
					// // {name : 'Belize', value : 308.595},
					// // {name : 'Bermuda', value : 64.951},
					// // {name : 'Bolivia', value : 716.939},
					// // {name : 'Brazil', value : 195210.154},
					// // {name : 'Brunei', value : 27.223},
					// // {name : 'Bhutan', value : 716.939},
					// // {name : 'Botswana', value : 1969.341},
					// // {name : 'Central African Republic', value : 4349.921},
					// // {name : 'Canada', value : 34126.24},
					// // {name : 'Switzerland', value : 7830.534},
					// // {name : 'Chile', value : 17150.76},
					// {name: 'China', value: 1000000,
					// itemStyle:{
					// areaColor:"blue"
					// },
					// },
					// // {name : 'Ivory Coast', value : 60508.978},
					// // {name : 'Cameroon', value : 20624.343},
					// // {name : 'Democratic Republic of the Congo', value :
					// 62191.161},
					// // {name : 'Republic of the Congo', value : 3573.024},
					// // {name : 'Colombia', value : 46444.798},
					// // {name : 'Costa Rica', value : 4669.685},
					// // {name : 'Cuba', value : 11281.768},
					// // {name : 'Northern Cyprus', value : 1.468},
					// // {name : 'Cyprus', value : 1103.685},
					// // {name : 'Czech Republic', value : 10553.701},
					// // {name : 'Germany', value : 83017.404},
					// // {name : 'Djibouti', value : 834.036},
					// // {name : 'Denmark', value : 5550.959},
					// // {name : 'Dominican Republic', value : 10016.797},
					// // {name : 'Algeria', value : 37062.82},
					// // {name : 'Ecuador', value : 15001.072},
					// // {name : 'Egypt', value : 78075.705},
					// // {name : 'Eritrea', value : 5741.159},
					// // {name : 'Spain', value : 46182.038},
					// // {name : 'Estonia', value : 1298.533},
					// // {name : 'Ethiopia', value : 87095.281},
					// // {name : 'Finland', value : 5367.693},
					// // {name : 'Fiji', value : 860.559},
					// // {name : 'Falkland Islands', value : 49.581},
					// // {name : 'France', value : 63230.866},
					// // {name : 'Gabon', value : 1556.222},
					// // {name : 'United Kingdom', value : 62066.35},
					// // {name : 'Georgia', value : 4388.674},
					// // {name : 'Ghana', value : 24262.901},
					// // {name : 'Guinea', value : 10876.033},
					// // {name : 'Gambia', value : 1680.64},
					// // {name : 'Guinea Bissau', value : 10876.033},
					// // {name : 'Equatorial Guinea', value : 696.167},
					// // {name : 'Greece', value : 11109.999},
					// // {name : 'Greenland', value : 56.546},
					// // {name : 'Guatemala', value : 14341.576},
					// // {name : 'French Guiana', value : 231.169},
					// // {name : 'Guyana', value : 786.126},
					// // {name : 'Honduras', value : 7621.204},
					// // {name : 'Croatia', value : 4338.027},
					// // {name : 'Haiti', value : 9896.4},
					// // {name : 'Hungary', value : 10014.633},
					// // {name : 'Indonesia', value : 240676.485},
					// // {name : 'India', value : 120562.648},
					// // {name : 'Ireland', value : 4467.561},
					// // {name : 'Iran', value : 240676.485},
					// // {name : 'Iraq', value : 30962.38},
					// // {name : 'Iceland', value : 318.042},
					// // {name : 'Israel', value : 7420.368},
					// // {name : 'Italy', value : 60508.978},
					// // {name : 'Jamaica', value : 2741.485},
					// // {name : 'Jordan', value : 6454.554},
					// {name : 'Japan', value : 127352.833,
					// itemStyle:{
					// areaColor:"blue"
					// },
					// },
					// // {name : 'Kazakhstan', value : 15921.127},
					// // {name : 'Kenya', value : 40909.194},
					// // {name : 'Kyrgyzstan', value : 5334.223},
					// // {name : 'Cambodia', value : 14364.931},
					// // {name : 'South Korea', value : 51452.352},
					// // {name : 'Kosovo', value : 97.743},
					// // {name : 'Kuwait', value : 2991.58},
					// // {name : 'Laos', value : 6395.713},
					// // {name : 'Lebanon', value : 4341.092},
					// // {name : 'Liberia', value : 3957.99},
					// // {name : 'Libya', value : 6040.612},
					// // {name : 'Sri Lanka', value : 20758.779},
					// // {name : 'Lesotho', value : 2008.921},
					// // {name : 'Lithuania', value : 3068.457},
					// // {name : 'Luxembourg', value : 507.885},
					// // {name : 'Latvia', value : 2090.519},
					// // {name : 'Morocco', value : 31642.36},
					// // {name : 'Moldova', value : 103.619},
					// // {name : 'Madagascar', value : 21079.532},
					// // {name : 'Mexico', value : 117886.404},
					// // {name : 'Macedonia', value : 507.885},
					// // {name : 'Mali', value : 13985.961},
					// // {name : 'Myanmar', value : 51931.231},
					// // {name : 'Montenegro', value : 620.078},
					// // {name : 'Mongolia', value : 2712.738},
					// // {name : 'Mozambique', value : 23967.265},
					// // {name : 'Mauritania', value : 3609.42},
					// // {name : 'Malawi', value : 15013.694},
					// // {name : 'Malaysia', value : 28275.835},
					// // {name : 'Namibia', value : 2178.967},
					// // {name : 'New Caledonia', value : 246.379},
					// // {name : 'Niger', value : 15893.746},
					// // {name : 'Nigeria', value : 159707.78},
					// // {name : 'Nicaragua', value : 5822.209},
					// // {name : 'Netherlands', value : 16615.243},
					// // {name : 'Norway', value : 4891.251},
					// // {name : 'Nepal', value : 26846.016},
					// // {name : 'New Zealand', value : 4368.136},
					// // {name : 'Oman', value : 2802.768},
					// // {name : 'Pakistan', value : 173149.306},
					// // {name : 'Panama', value : 3678.128},
					// // {name : 'Peru', value : 29262.83},
					// // {name : 'Philippines', value : 93444.322},
					// // {name : 'Papua New Guinea', value : 6858.945},
					// // {name : 'Poland', value : 38198.754},
					// // {name : 'Puerto Rico', value : 3709.671},
					// // {name : 'North Korea', value : 1.468},
					// // {name : 'Portugal', value : 10589.792},
					// // {name : 'Paraguay', value : 6459.721},
					// // {name : 'Qatar', value : 1749.713},
					// // {name : 'Romania', value : 21861.476},
					// // {name : 'Russia', value : 21861.476},
					// // {name : 'Rwanda', value : 10836.732},
					// // {name : 'Western Sahara', value : 514.648},
					// // {name : 'Saudi Arabia', value : 27258.387},
					// // {name : 'Sudan', value : 35652.002},
					// // {name : 'South Sudan', value : 9940.929},
					// // {name : 'Senegal', value : 12950.564},
					// // {name : 'Solomon Islands', value : 526.447},
					// // {name : 'Sierra Leone', value : 5751.976},
					// // {name : 'El Salvador', value : 6218.195},
					// // {name : 'Somaliland', value : 9636.173},
					// // {name : 'Somalia', value : 9636.173},
					// // {name : 'Republic of Serbia', value : 3573.024},
					// // {name : 'Suriname', value : 524.96},
					// // {name : 'Slovakia', value : 5433.437},
					// // {name : 'Slovenia', value : 2054.232},
					// // {name : 'Sweden', value : 9382.297},
					// // {name : 'Swaziland', value : 1193.148},
					// // {name : 'Syria', value : 7830.534},
					// // {name : 'Chad', value : 11720.781},
					// // {name : 'Togo', value : 6306.014},
					// // {name : 'Thailand', value : 66402.316},
					// // {name : 'Tajikistan', value : 7627.326},
					// // {name : 'Turkmenistan', value : 5041.995},
					// // {name : 'East Timor', value : 10016.797},
					// // {name : 'Trinidad and Tobago', value : 1328.095},
					// // {name : 'Tunisia', value : 10631.83},
					// // {name : 'Turkey', value : 72137.546},
					// // {name : 'United Republic of Tanzania', value :
					// 44973.33},
					// // {name : 'Uganda', value : 33987.213},
					// // {name : 'Ukraine', value : 46050.22},
					// // {name : 'Uruguay', value : 3371.982},
					// // {name : 'United States of America', value :
					// 312247.116},
					// // {name : 'Uzbekistan', value : 27769.27},
					// // {name : 'Venezuela', value : 236.299},
					// // {name : 'Vietnam', value : 89047.397},
					// // {name : 'Vanuatu', value : 236.299},
					// // {name : 'West Bank', value : 13.565},
					// // {name : 'Yemen', value : 22763.008},
					// // {name : 'South Africa', value : 51452.352},
					// // {name : 'Zambia', value : 13216.985},
					// // {name : 'Zimbabwe', value : 13076.978}
					// ]
					// }
					]
				};

			
			} else if (level == "inlu") {
				option = {
					backgroundColor : "white",
					tooltip : {
						trigger : 'axis',
						axisPointer : { // 坐标轴指示器，坐标轴触发有效
							type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend : {
						data : [ '直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度',
								'谷歌', '必应', '其他' ]
					},
					grid : {
						left : '3%',
						right : '4%',
						bottom : '3%',
						containLabel : true
					},
					xAxis : [ {
						type : 'category',
						data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
					} ],
					yAxis : [ {
						type : 'value'
					} ],
					series : [ {
						name : '直接访问',
						type : 'bar',
						data : [ 320, 332, 301, 334, 390, 330, 320 ]
					}, {
						name : '邮件营销',
						type : 'bar',
						stack : '广告',
						data : [ 120, 132, 101, 134, 90, 230, 210 ]
					}, {
						name : '联盟广告',
						type : 'bar',
						stack : '广告',
						data : [ 220, 182, 191, 234, 290, 330, 310 ]
					}, {
						name : '视频广告',
						type : 'bar',
						stack : '广告',
						data : [ 150, 232, 201, 154, 190, 330, 410 ]
					}, {
						name : '搜索引擎',
						type : 'bar',
						data : [ 862, 1018, 964, 1026, 1679, 1600, 1570 ],
						markLine : {
							lineStyle : {
								normal : {
									type : 'dashed'
								}
							},
							data : [ [ {
								type : 'min'
							}, {
								type : 'max'
							} ] ]
						}
					}, {
						name : '百度',
						type : 'bar',
						barWidth : 5,
						stack : '搜索引擎',
						data : [ 620, 732, 701, 734, 1090, 1130, 1120 ]
					}, {
						name : '谷歌',
						type : 'bar',
						stack : '搜索引擎',
						data : [ 120, 132, 101, 134, 290, 230, 220 ]
					}, {
						name : '必应',
						type : 'bar',
						stack : '搜索引擎',
						data : [ 60, 72, 71, 74, 190, 130, 110 ]
					}, {
						name : '其他',
						type : 'bar',
						stack : '搜索引擎',
						data : [ 62, 82, 91, 84, 109, 110, 120 ]
					} ]
				};
			}
			return option;
		},
		
		changeData: function(option){
			
			function randomValue() {
				return Math.round(Math.random() * 100);
			}
			
			function randomName() {
				return Math.round(Math.random() * 20);
			}
			
			var data1 = ['广州',
				'延安',
				'太原',
				'清远',
				'中山',
				'昆明',
				'寿光',
				'盘锦',
				'长治',
				'深圳',
				'珠海',
				'宿迁',
				'咸阳',
				'铜川',
				'平度',
				'佛山',
				'海口',
				'江门',
				'章丘',
				'肇庆',
				'大连',
				'临汾',
				'吴江'];
			var data = [{
				name: data1[randomName()],
				value: randomValue()
			},{
				name: data1[randomName()],
				value: randomValue()
			},{
				name: data1[randomName()],
				value: randomValue()
			},{
				name: data1[randomName()],
				value: randomValue()
			},{
				name: data1[randomName()],
				value: randomValue()
			}];
			function convertData(data) {
				var res = [];
				for (var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					if (geoCoord) {
						res.push({
							name : data[i].name,
							value : geoCoord.concat(data[i].value)
						});

					} else {
						res.push({
							name : data[i].name,
							value : 1212,
							itemStyle : {
								areaColor : "blue"
							},
						});

					}
				}
				return res;
			}
			option.series[0].data = convertData(data);
			
			var count = data.length - imageArr.length;
			if(count > 0){
				for(let i = 0; i<count; i++){
					var image = new sap.m.Image({
						src:"image/ali.gif",
						width: "2rem",
						height: "2rem"
					})
					page.addContent(image);
					page.rerender();
					imageArr.push(image);
					
				}
			}else{
				
			};
			
			dataPosition = [];
			for(var i=0; i<data.length; i++){
				console.log(myChart.convertToPixel({geoId: "zwm"},geoCoordMap[data[i].name]));
				dataPosition.push(myChart.convertToPixel({geoId: "zwm"},geoCoordMap[data[i].name]));
			};
			
			for(var i=0; i<imageArr.length; i++){
				imageArr[i].addStyleClass("gif");
				imageArr[i].getDomRef().style.top = (dataPosition[i][1] + 10) + 'px';
				imageArr[i].getDomRef().style.left = (dataPosition[i][0] - 10) +  'px';
			}
			

		},

		onStart : function(oEvent) {
			
			h = 0, v = 0;
			interval = setInterval(function() {
				if (h == 8) {
					if (v == 1) {
						v = 0;
					} else {
						v = 1;
					}
					h = 0
				}

				h = h + 1;

				this.changeBox(h, v);
				
				

			}.bind(this), 2000)

		},

		onStop : function(oEvent) {
			var box = this.byId("box");
			var hbox = box.getAggregation("items");
			hbox[h].getAggregation("items")[v].removeStyleClass("present");
			//			$(".present").removeClass("present");
			clearInterval(interval);

		},

		changeBox : function(hIndex, vIndex) {
			var box = this.byId("box");
			var hbox = box.getAggregation("items");
			//			box.getAggregation("items")[1].getAggregation("items")[0].addStyleClass("present");
			hbox[hIndex].getAggregation("items")[vIndex]
					.addStyleClass("present");
			if (hIndex > 1) {
				hbox[hIndex - 1].getAggregation("items")[vIndex]
						.removeStyleClass("present");
			} else if (hIndex == 1 && vIndex == 1) {
				hbox[8].getAggregation("items")[0].removeStyleClass("present");
			} else if (hIndex == 1 && vIndex == 0) {
				hbox[8].getAggregation("items")[1].removeStyleClass("present");
			}
			var options = myChart.getOption();
			
			this.changeData(options);
			myChart.setOption(options);
		}

	});
});