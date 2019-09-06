sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"util/app"
], function(Controller,appUtil) {
	"use strict";

	return Controller.extend("sap.vo.mengniu.controller.SFrame", {
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("single").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("singleView").attachPatternMatched(this._onsingViewMatched, this);
		},
		onMenuPress: function() {
			var splitappId = this.createId("App");
			sap.ui.getCore().byId(splitappId).showMaster();
		},
		onHomePress: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");
		},
		_hideMaster: function() {
			var splitAppObj = this.byId("App");
			splitAppObj.hideMaster();
		},
		_onObjectMatched: function(oEvent) {
			// var titleObj = this.byId('title'); 
			var titleObj = this.byId('singleTitle');
			var appId = oEvent.getParameter("arguments").appId;
			var appMapping = appUtil.getAppMapping();
			titleObj.setText(appMapping[appId].title || "");
			this._hideMaster();	
		},
		_onsingViewMatched: function(oEvent) {
			var titleObj = this.byId('singleTitle');
			titleObj.setText("");
			this._hideMaster();	
		}
	});

});