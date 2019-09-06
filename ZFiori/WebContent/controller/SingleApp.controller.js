sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"util/app",
	"sap/ui/model/json/JSONModel"
], function(Controller,appUtil, JSONModel) {
	"use strict";

	return Controller.extend("sap.vo.mengniu.controller.SingleApp", {
		onInit: function() {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("mSingle").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("single").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("singleView").attachPatternMatched(this._onsingViewMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var appId = oEvent.getParameter("arguments").appId;
			var viewIndex = oEvent.getParameter("arguments").viewIndex;
			var sView = appUtil.getAppMapping()[appId].sView;
			viewIndex = parseInt(viewIndex);
			if(viewIndex > 0) {
				if(appUtil.getAppMapping()[appId]['viewList'][viewIndex]) {
					sView = appUtil.getAppMapping()[appId]['viewList'][viewIndex];
				}
			}
			if(appId === "SPC" && viewIndex === 1){
				sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel({"KPI":"MN_QM_020"}),"KPI");
			}
			var singlePageObj = this.byId("single");
			singlePageObj.removeAllContent();
			var oView = new sap.ui.xmlview({
				viewName: "sap.vo.mengniu.view.blocks."+sView
			});				
			var appInfo = new JSONModel({isSingleView:true})
			oView.setModel(appInfo,"appInfo");
			singlePageObj.addContent(oView);	
		},
		_onsingViewMatched: function (oEvent) {
			var sView = oEvent.getParameter("arguments").viewName;
			var singlePageObj = this.byId("single");
			singlePageObj.removeAllContent();
			var oView = new sap.ui.xmlview({
				viewName: "sap.vo.mengniu.view.blocks."+sView
			});				
			var appInfo = new JSONModel({isSingleView:true})
			oView.setModel(appInfo,"appInfo");
			singlePageObj.addContent(oView);	
		}


	});

});