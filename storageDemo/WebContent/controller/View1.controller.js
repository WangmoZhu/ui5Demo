sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("echart.controller.View1", {
		
		onAfterRendering: function(){
			
			var personInfo = this.getTextInfo();
			var oModel;
			if(!personInfo){
				oModel = new sap.ui.model.json.JSONModel({
					personInfo:{
						firstName: 'wangmo',
						lastName : 'zhu'
					}
				});
				
				
			}else{
				oModel = new sap.ui.model.json.JSONModel({
					personInfo
				});
			}
			
			this.getView().setModel(oModel,'json');
		},
		
		
		onPress: function(oEvent,firstName,lastName){
			
			var obj = {
				firstName : firstName,
				lastName  : lastName
			}
			jQuery.sap.require("jquery.sap.storage");
			
			if (jQuery.sap.storage.isSupported()) {
				
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

				oStorage.put('text',obj);
				
				var oStorage1 = jQuery.sap.storage(jQuery.sap.storage.Type.session);
				
				oStorage1.put('text1',obj);
			}
		},
		
		getTextInfo: function(){
			jQuery.sap.require("jquery.sap.storage");
			
			if (jQuery.sap.storage.isSupported()) {
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

				return oStorage.get("text");
			} else {
				return "";
			}
		}
	});
});