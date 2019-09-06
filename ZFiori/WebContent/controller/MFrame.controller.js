sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"util/app"
], function(Controller, appUtil) {
	"use strict";

	return Controller.extend("sap.vo.mengniu.controller.MFrame", {
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("mHome").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("mSingle").attachPatternMatched(this._onObjectMatched, this);
		},
		onHomePress: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("mHome");
		},
		_onObjectMatched:function(oEvent) {
			var titleObj = this.byId('title');
			var title = appUtil.getApp()['title'];
			var appId = oEvent.getParameter("arguments").appId || '';
			var appMapping =  appUtil.getAppMapping();
			if(appMapping[appId] && appMapping[appId].title) {
				title = appMapping[appId].title;
			}
			titleObj.setText(title);
		}
	});

});