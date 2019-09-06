/*eslint linebreak-style: ["error", "unix"]*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History"
], function(Controller,UIComponent,History) {
	"use strict";

	return Controller.extend("ZCT_MATQISET.controller.App", {
				/* =========================================================== */
		/* lifecycle methods 应用程序初始化                            */
		/* =========================================================== */
		 onInit : function() {
		 	// this.getView().addStyleClass(designMode.getCompactCozyClass());
		 },
		 onAfterRendering: function() {
		 	UIComponent.getRouterFor(this).navTo("View2");
		 },
		 
		 	//---获取Router(路由实例)
		getRouter: function() {
			return UIComponent.getRouterFor(this);
		},

		//---获取RouterId(路由Id)
		getRouterID: function() {
			var oHC = this.getRouter().oHashChanger;
			if (oHC.privgetCurrentShellHash) {
				var sHash = oHC.privgetCurrentShellHash().hash;
				var s = oHC.privstripLeadingHash(sHash).split("-")[0];
				s = s && s === "Shell-home" ? null : s;
				return s;
			}
		},

		//---跳转
		navTo: function(sName) {
			return sName == null ? null : this.getRouter().navTo(sName);
		}

	});

});