/*App控制器*/
sap.ui.define([
		"./BaseController",
		"./designMode",
		"sap/ui/model/json/JSONModel"
], function(BaseController, designMode, JSONModel) {
	"use strict";

	return BaseController.extend("ZTM.controller.App", {

		onAfterRendering : function() {
//			本地运行注释下面的代码
			
			var oContext = this;
			this.navTo(this.getRouterID());
			var backBtn = sap.ui.getCore().byId("backBtn");
			backBtn.attachPress(function(evt){
				var url = window.location.hash;
				var s = url.split("-")[0];
				var a = s.substr(1,s.length-1);
				var str = url.split("/");
				var b = str[str.length-1];
				if (a == b) {
					var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
					oCrossAppNavigator.toExternal({
						target : {
							semanticObject : "#Shell-home"
						}
					});
				}	
			});
			
		},
		
		// 获取App容器
		getAppControl : function() {
			return this.byId("appNavContainer");
		}
	});
});