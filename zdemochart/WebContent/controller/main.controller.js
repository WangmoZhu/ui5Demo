/* ======================================== */
/* helloWorld MVC 中control 实现            */
/* ======================================== */
sap.ui.define(["./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
	"./messages"
], function(BaseController, JSONModel, Filter, FilterOperator, MessageToast, MessageBox, SimpleType, ValidateException, messages) {
	"use strict";

	return BaseController.extend("ZAPI_VIEW.controller.main", {

		/* ======================================== */
		/* lifecycle methods                        */
		/* ======================================== */
		onInit: function() {
			this._ODataModel = this.getModel("OData");
			//this._ResourceBundle = this.getModel( "i18n" ).getResourceBundle();
			this._JSONModel = this.getModel();
			
		},

		onPress1: function() {
			var image1Set = {
				np_res: [],
				np_table: [{
					"Image": ""
				}]
			};
			this._JSONModel.setProperty("/image1Set", image1Set);
			this.getRouter().navTo("view1");
		},

		onPress2: function() {
			var image2Set = {
				np_res: [],
				np_table: [{
					"Image": ""
				}]
			};
			this._JSONModel.setProperty("/image2Set", image2Set);
			this.getRouter().navTo("view2");
		},

		onPress3: function() {
			var image3Set = {
				np_res: [],
				np_table: [{
					"Image": ""
				}]
			};
			this._JSONModel.setProperty("/image3Set", image3Set);
			this.getRouter().navTo("view3");
		},

		onPress4: function() {
			var image4Set = {
				np_table: [{
					"Image": ""
				}]
			};
			this._JSONModel.setProperty("/image4Set", image4Set);
			this.getRouter().navTo("view4");
		},

		onPress5: function() {
			var image5Set = {
				np_table: [{
					"Image": ""
				}]
			};
			this._JSONModel.setProperty("/image5Set", image5Set);
			this.getRouter().navTo("view5");
		},
		onPress6: function() {
			var image6Set = {
				np_table: [{
					"Image": ""
				}]
			};
			this._JSONModel.setProperty("/image6Set", image6Set);
			this._JSONModel.setProperty("/image6Set/visible1", true);
			this._JSONModel.setProperty("/image6Set/visible2", false);
			this.getRouter().navTo("view6");
		},
		onPress7: function() {
			this.getRouter().navTo("view7");
		},

		onPress8: function() {
			this.getRouter().navTo("view8");
		},

		onPress9: function() {
			this.getRouter().navTo("view9");
		},
		
		onPress10: function() {
			this.getRouter().navTo("view10");
		}

	});
});