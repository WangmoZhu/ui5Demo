sap.ui.define([
	"sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
], function(BlockContentBase) {
	"use strict";

	return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.Surveillance", {
		onInit: function() {
		},
		onAfterRendering: function(){
			setTimeout(function(){				
				this.setViewIndex(0);
			}.bind(this),300);
		},
		onSelect:function(oEvent){
			var oKey = oEvent.getSource().getSelectedKey();
			if(oKey === "video"){
				this.getView().byId("video").setVisible(true);
				this.getView().byId("gps").setVisible(false);
			}else{
				this.getView().byId("video").setVisible(false);
				this.getView().byId("gps").setVisible(true);
			}
			// var oNav = this.getView().byId("nav");
			// oNav.to(this.getView().byId(oKey));
		},
		onPressPlants:function(oEvent){
			window.open("http://192.168.117.171");
		},
		onPressGPS:function(oEvent){
			// window.open("http://g7s.ucenter.huoyunren.com/login.html?referer=http%3A//g7s.huoyunren.com/");
			this.setViewIndex(1);
			var navCon = this.getView().byId("navCon");
			navCon.to(this.getView().byId("iframe"));
		},
		onNavBack:function(oEvent){
			this.setViewIndex(0);
			var navCon = this.getView().byId("navCon");
			navCon.back();
		},
		openFilter: function() {
			}
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf sap.vo.mengniu.view.CustomerAnalysis
			 */

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.vo.mengniu.view.CustomerAnalysis
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.vo.mengniu.view.CustomerAnalysis
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.vo.mengniu.view.CustomerAnalysis
		 */
		//	onExit: function() {
		//
		//	}

	});

});