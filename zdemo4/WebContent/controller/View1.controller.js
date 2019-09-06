sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../util/echarts",
	"../util/china",
	"../util/bmap.min",
	"../util/world",
	"../util/displayMap",
	'sap/ui/model/json/JSONModel',
	'jquery.sap.global',
], function(Controller,echartsjs,china,bmap,world,displayMap,JSONModel,jQuery) {
	"use strict";

	return Controller.extend("echart.controller.View1", {
		onInit: function(){

		},
		
		onAfterRendering: function(){
			var sbm = this.byId("sbm");
			sbm.addStyleClass("tile");
			var tile = this.byId("tile");
			tile.addStyleClass("tile_height");
			var nc1 = this.createId("nc1");
//			console.log($('#'+ nc1).children("div.Loaded sapMNCIndScal").children("#*scale"));
			console.log("#"+nc1+"-scale");
			$("#"+nc1+"-scale").text("Pending");
		},
		
		
	});
});