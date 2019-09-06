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
], function(BaseController, JSONModel, Filter, FilterOperator, MessageToast, MessageBox, SimpleType, ValidateException, messages, echarts,jQuery) {
	"use strict";

	return BaseController.extend("ZAPI_VIEW.controller.view9", {

		onInit: function() {
			this.lineId = this.createId("line");
		},

		onAfterRendering: function() {
			this.lineInit();
		},

		lineInit: function() {
			var myChart = echarts.init(document.getElementById("main"));
			
			// 指定图表的配置项和数据
			var option = {
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					axisTick: {
						alignWithLabel: true
					}
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: '直接访问',
					type: 'bar',
					barWidth: '60%',
					data: [10, 52, 200, 334, 390, 330, 220]
				}]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		}
	});
});