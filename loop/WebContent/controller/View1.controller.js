sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	
	var interval, h ,v;
	return Controller.extend("echart.controller.View1", {
		
		onStart: function(oEvent){
			
			h = 0,v = 0;
			interval = setInterval(function(){
				if(h == 8){
					if(v == 1){
						v = 0;
					}else{
						v = 1;
					}
					h = 0
				}
				
				h = h + 1;
				
				this.changeBox(h,v);
				
				


			}.bind(this),1000)
			
			
		},
		
		onStop: function(oEvent){
			var box = this.byId("box");
			var hbox = box.getAggregation("items");
			hbox[h].getAggregation("items")[v].removeStyleClass("present");
//			$(".present").removeClass("present");
			clearInterval(interval);
			
		},
		
		changeBox: function(hIndex,vIndex){
			var box = this.byId("box");
			var hbox = box.getAggregation("items");
//			box.getAggregation("items")[1].getAggregation("items")[0].addStyleClass("present");
			hbox[hIndex].getAggregation("items")[vIndex].addStyleClass("present");
			if(hIndex > 1){
				hbox[hIndex - 1].getAggregation("items")[vIndex].removeStyleClass("present");
			}else if(hIndex == 1 && vIndex == 1){
				hbox[8].getAggregation("items")[0].removeStyleClass("present");
			}else if(hIndex == 1 && vIndex == 0){
				hbox[8].getAggregation("items")[1].removeStyleClass("present");
			}
		}
	});
});