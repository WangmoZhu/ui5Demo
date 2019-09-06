sap.ui.define([
	"sap/ui/core/Control",
	"sap/vo/mengniu/control/vendor/echarts-min"
], function(Control) {
	return Control.extend("sap.vo.mengniu.control.eChartUI5", {
		//private attribute
		_eChart: undefined,
		_option: undefined,
		_echartEventCallBack: undefined,
		_firstEchartRender: true,

		//metadata
		metadata: {
			properties: {
				width: {
					type: 'sap.ui.core.CSSSize',
					defaultValue: '100%'
				},
				height: {
					type: 'sap.ui.core.CSSSize',
					defaultValue: '100%'
				},
				responsive: {
					type: "boolean",
					defaultValue: true
				}
			}
		},

		//hook method
		init: function() {},
		renderer: function(oRm, oControl) {
			oRm.write("<div style='width:" + oControl.getWidth() + "; height:" + oControl.getHeight() + "'");
			oRm.writeControlData(oControl);
			oRm.addClass("eChartContainer");
			oRm.writeClasses();
			oRm.write('>');
			oRm.write("</div>");
		},
		onAfterRendering: function() {
			var that = this;
			jQuery.sap.delayedCall(0, this, function() {
				if (!echarts && !echarts instanceof Object) {
					console.log('echarts lib imported failed!');
					//echarts lib is missing
					return;
				}
				var id = this.getId();
				var eChartContainerDOM = document.getElementById(id)
				if (!eChartContainerDOM) {
					//DOM is not ready
					return;
				}
				if (this.getEChart()) {
					this._option = this.getEChart().getOption();
					this._eChart.dispose();
				}
				if (this.getResponsive()) {
					sap.ui.core.ResizeHandler.register(this, this.resizeEChart);
					// $(window).resize(function() {
					// 	that.resizeEChart();
					// });
				}

				this._eChart = echarts.init(eChartContainerDOM);
				this._firstEchartRender = true;
				this._delegateEChartRender();
			});
		},
		destroy: function() {
			this.clear();
			Control.prototype.destroy.apply(this, arguments);
		},

		//private method
		_delegateEChartRender: function() {
			if (!this._eChart) {
				//DOM is not ready
				return;
			}
			if (!this._option) {
				// Option is not ready
				return;
			}
			this._eChart.setOption(this._option);

			if (this._firstEchartRender) {
				this._firstEchartRender = false;
				this._echartEventCallBack && this._echartEventCallBack({
					data: {
						echart: this._eChart
					}
				});
			}
		},

		//public method
		setEChartProperties: function(option) {
			if (this._option !== option) {
				jQuery.sap.delayedCall(0, this, function() {
					this._option = option;
					this._delegateEChartRender();
				});
			}
		},
		getEChart: function() {
			if (!this._eChart || this._eChart.isDisposed === undefined || this._eChart.isDisposed()) {
				return null;
			}
			return this._eChart;
		},
		clear: function() {
			if (this.getEChart()) {
				this._eChart.dispose();
			}
			this._eChart = undefined;
			this._option = undefined;
			this._echartEventCallBack = undefined;
			this._firstEchartRender = true;
		},
		renew: function() {
			this.clear();
			var eChartContainerDOM = document.getElementById(this.getId());
			if (!eChartContainerDOM) {
				//DOM is not ready
				return;
			}
			this._eChart = echarts.init(eChartContainerDOM);
		},
		bindEchartEvent: function(callBack) {
			if (typeof(callBack) === 'function') {
				this._echartEventCallBack = callBack;
			}
		},
		attachBindEChartEvent: function(callBack) {
			this.bindEchartEvent(callBack);
		},
		resizeEChart: function(oEvent) {
			var echart = null;
			if (oEvent) {
				echart = oEvent.control.getEChart();
			} else {
				echart = this._eChart;
			}
			if (echart) {
				echart.resize(echart._dom.clientWidth, echart._dom.clientHeight);
			}
		}

	});
});