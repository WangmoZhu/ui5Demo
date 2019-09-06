sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("echart.controller.View1", {
		
		onDragStart: function(oEvent){
			
		},
		
		onDropTable2: function(oEvent){
			oEvent.getSource().getParent().addItem(oEvent.getParameter("draggedControl"));
		}
	});
});