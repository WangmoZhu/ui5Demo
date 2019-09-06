/* =========================================================== */
/* 设计模式                                                    */
/* =========================================================== */
sap.ui.define(["sap/ui/Device"], function(Device) {
	//---严格JS 模式
	"use strict";

	// 定义 设备支持的UI样式(舒适/紧密)类，特殊说明：此处所有设备设置为紧密型UI样式
	//	var sCompactCozyClass = Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
	var sCompactCozyClass = "sapUiSizeCompact";

	return {
		//---获取 设备UI样式类
		getCompactCozyClass: function() {
			return sCompactCozyClass;
		},

		//---引用jQuery.sap.syncStyleClass()方法
		syncStyleClass: function(oView, oControl) {
			jQuery.sap.syncStyleClass(sCompactCozyClass, oView, oControl);
		}
	};
});