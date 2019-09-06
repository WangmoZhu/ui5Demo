sap.ui.define([
	"sap/ui/Device"
], function(Device) {
	"use strict";

	// 定义 设备支持的UI样式(舒适/紧密)类
	var sCompactCozyClass = Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";

	return {
		// 获取 设备UI样式类
		getCompactCozyClass : function() {
			return sCompactCozyClass;
		},
		
		// 引用jQuery.sap.syncStyleClass()方法
		syncStyleClass : function(oView, oControl) {
			jQuery.sap.syncStyleClass(sCompactCozyClass, oView, oControl);
		} };
});