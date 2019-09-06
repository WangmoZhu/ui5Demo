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
//			sap.ui.loader.config({
//			    baseUrl: "/ztree"
//			  });
//			var oModel = new JSONModel(sap.ui.require.toUrl("model/products.json"));
			
			
		},
		
		onAfterRendering: function(){
//			var model = new JSONModel("model/products.json");
			var model = new JSONModel(jQuery.sap.getModulePath("echart.model","/products.json"));
			var oModel1 ;
			model.attachRequestCompleted(function(){
				oModel1 = this.parseToTree(model);
				this.getView().setModel(oModel1);
			}.bind(this));
//			var model = this.getOwnerComponent().getModel();
			
		},
		
		parseToTree: function(oModel){
			var nodeSet = [];
			var data = oModel.getData();
//			var sortBy=function (filed,rev,primer){
//				  rev = (rev) ? -1 : 1;
//				  return function (a, b) {
//				    a = a[filed];
//				    b = b[filed];
//				    if (typeof (primer) != 'undefined') {
//				      a = primer(a);
//				      b = primer(b);
//				    }
//				    if (a < b) { return rev * -1; }
//				    if (a > b) { return rev * 1; }
//				    return 1;
//				  }
//				};
//			console.log(data);
//			data.sort(sortBy('parentNode',false,parseInt));
//			console.log(data);
			for(var i=0; i<data.length; i++){
				data[i].children = [];
				for(var j=0; j<data.length; j++){
					if(data[i].node === data[j].parentNode){
						data[i].children.push(data[j]);
					}
				}
				if(data[i].parentNode == 0){
					nodeSet.push(data[i]);
				}
			}
			console.log(nodeSet);
			oModel.setData(nodeSet);
			return oModel;
		}
		
	});
});