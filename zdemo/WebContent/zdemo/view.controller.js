sap.ui.define([ "sap/ui/core/mvc/Controller" ], function(Controller) {
	"use strict";

	return Controller.extend("zdemo.view", {
		onInit : function() {
			var oBook = this.byId("myBook");
			
			oBook.addEventDelegate({
				onAfterRendering : function() {
					//called after the instance has been rendered (it's in the DOM)
				}
			});
		},
		onBuy : function(oEvent) {
			var oBook = oEvent.getSource();
			alert("Buy event received: '" + oBook.getTitle() + "' by "
					+ oBook.getAuthor());
		},
		onChange : function(evt){
			var ipt = evt.getSource();
			alert(ipt.getTitle())
		},
		onAfterRendering : function() {
			//called after the view has been rendered (it's in the DOM)
		}
	});
});