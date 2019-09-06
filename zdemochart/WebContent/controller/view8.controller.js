/* ======================================== */
/*          */
/* ======================================== */
sap.ui.define(["./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
	"./messages",
	"echarts",
	"jQuery"
], function(BaseController, JSONModel, Filter, FilterOperator, MessageToast, MessageBox, SimpleType, ValidateException, messages,echarts,jQuery) {
	"use strict";

	return BaseController.extend("ZAPI_VIEW.controller.view8", {

		onInit: function() {
			 this.lineId = this.createId("line");
			 this.pieId = this.createId("pie");
			 this.columnId = this.createId("column");
		},

		onAfterRendering: function() {
			this.lineInit();
			this.pieInit();
			this.columnInit();
		},

		lineInit: function() {
			const clientHeight = $(window).height();
			$(`#${this.lineId}`).css("height", clientHeight / 2);
			$(`#${this.lineId}`).css("width", "90%");
			const chart = echarts.init(document.getElementById(this.lineId), "dark");
			const data = {
				data1: {
					name: "邮件营销",
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				data2: {
					name: "联盟广告",
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				data3: {
					name: "视频广告",
					data: [150, 232, 201, 154, 190, 330, 410]
				},
				data4: {
					name: "直接访问",
					data: [320, 332, 301, 334, 390, 330, 320]
				},
				data5: {
					name: "搜索引擎",
					data: [820, 932, 901, 934, 1290, 1330, 1320]
				}
			};
			chart.setOption({
				backgroundColor: "#2c343c",
				title: {
					text: "堆叠区域图"
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#6a7985"
						}
					}
				},
				legend: {
					data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true
				},
				xAxis: [{
					type: "category",
					boundaryGap: false,
					data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
				}],
				yAxis: [{
					type: "value"
				}],
				series: [{
					name: data.data1.name,
					type: "line",
					stack: "总量",
					areaStyle: {},
					data: data.data1.data
				}, {
					name: data.data2.name,
					type: "line",
					stack: "总量",
					areaStyle: {},
					data: data.data2.data
				}, {
					name: data.data3.name,
					type: "line",
					stack: "总量",
					areaStyle: {},
					data: data.data2.data
				}, {
					name: data.data4.name,
					type: "line",
					stack: "总量",
					areaStyle: {
						normal: {}
					},
					data: data.data2.data
				}, {
					name: data.data5.name,
					type: "line",
					stack: "总量",
					label: {
						normal: {
							show: true,
							position: "top"
						}
					},
					areaStyle: {
						normal: {}
					},
					data: data.data2.data
				}]
			});
		},
		pieInit: function() {
			const clientHeight = $(window).height();
			$(`#${this.pieId}`).css("height", clientHeight / 2 - 0.5);
			$(`#${this.pieId}`).css("width", "40%");
			const chart = echarts.init(document.getElementById(this.pieId), "dark");
			chart.setOption({
				backgroundColor: "#2c343c",

				title: {
					text: "Customized Pie",
					left: "center",
					top: 20,
					textStyle: {
						color: "#ccc"
					}
				},

				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},

				visualMap: {
					show: false,
					min: 80,
					max: 600,
					inRange: {
						colorLightness: [0, 1]
					}
				},
				series: [{
					name: "访问来源",
					type: "pie",
					radius: "55%",
					center: ["50%", "50%"],
					data: [{
						value: 335,
						name: "直接访问"
					}, {
						value: 310,
						name: "邮件营销"
					}, {
						value: 274,
						name: "联盟广告"
					}, {
						value: 235,
						name: "视频广告"
					}, {
						value: 400,
						name: "搜索引擎"
					}].sort((a, b) => a.value - b.value),
					roseType: "radius",
					label: {
						normal: {
							textStyle: {
								color: "rgba(255, 255, 255, 0.3)"
							}
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: "rgba(255, 255, 255, 0.3)"
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						}
					},
					itemStyle: {
						normal: {
							color: "#c23531",
							shadowBlur: 200,
							shadowColor: "rgba(0, 0, 0, 0.5)"
						}
					},

					animationType: "scale",
					animationEasing: "elasticOut",
					animationDelay: function() {
						return Math.random() * 200;
					}
				}]
			});
		},
		columnInit: function() {
			const clientHeight = $(window).height();
			$(`#${this.columnId}`).css("height", clientHeight / 2 - 0.5);
			$(`#${this.columnId}`).css("width", "52%");
			const chart = echarts.init(document.getElementById(this.columnId), "dark");
			chart.setOption({
				backgroundColor: "#2c343c",
				color: ["#3398DB"],
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true
				},
				xAxis: [{
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					axisTick: {
						alignWithLabel: true
					}
				}],
				yAxis: [{
					type: "value"
				}],
				series: [{
					name: "直接访问",
					type: "bar",
					barWidth: "60%",
					data: [10, 52, 200, 334, 390, 330, 220]
				}]
			});
		}
	});
});