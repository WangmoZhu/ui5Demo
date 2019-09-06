sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/type/String",
	"sap/ui/model/type/Float",
	"sap/m/Input",
	"sap/m/Text",
	"sap/m/CheckBox"
], function(Controller, JSONModel, StringType, Float, Input, Text, CheckBox) {
	"use strict";

	return Controller.extend("echart.controller.View1", {
		
		onInit: function(){
			var oModel = new sap.ui.model.json.JSONModel();
			var data = {
				companies:{
					"revenue" : 'china',
					name: 'sss'
				}
			}
			oModel.setData(data);
			
			this.getView().setModel(oModel);
			
		},
		
		onAfterRendering: function(){
			console.log(this.getOwnerComponent().getModel("device"))
		},
		
		createContent: function(sId, oContext){
			var oRevenue = oContext.getProperty("/companies/revenue");
			switch(typeof oRevenue) {
				case "string":
					return new Text(sId, {
						text: {
							path: "/companies/revenue",
							type: new StringType()
						}
					});
  
				case "number":
					return new Input(sId, {
						value: {
							path: "revenue",
							type: new Float()
						}
					});
				
				case "boolean":
					return new Checkbox(sId, {
						checked: {
							path: "revenue"
						}
					});
			
			}
		}
	});
});