/* =========================================================== */
/* App MVC中 control 实现（App 控制器实现）                    */
/* =========================================================== */
sap.ui.define(["./BaseController",
	"./designMode",
	"sap/ui/model/json/JSONModel"
], function(BaseController, designMode, JSONModel) {
	//---JS 严格模式
	"use strict";
	//--- 基于BaseController 扩展
	return BaseController.extend("ZAPI_VIEW.controller.App", {

		/* =========================================================== */
		/* lifecycle methods 应用程序初始化                            */
		/* =========================================================== */
		 onInit : function() {
		 	 this.getView().addStyleClass(designMode.getCompactCozyClass());
		 }
		// onBeforeRendering: function() {
		// 	this.navTo(this.getRouterID());
		// }
	});
});