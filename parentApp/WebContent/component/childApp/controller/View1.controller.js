sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("echart.component.childApp.controller.View1", {
		
		onPress: function(){
			sap.m.MessageToast.show("sssss");
		}
	});	
});