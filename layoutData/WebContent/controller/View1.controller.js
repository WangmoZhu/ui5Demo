sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("echart.controller.View1", {
		onInit:function(){
			var model = this.getView().getModel("device");
			console.log(model);
		},
		
		onPress: function(evt){
			var model = this.getView().getModel("device");
			console.log(model);
		}
	});
});