sap.ui.define([
	"sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
	'sap/vo/mengniu/controller/blocks/CustomerFormat'
], function(BlockContentBase, CustomerFormat) {
	"use strict";

	return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.Setting", {
		onInit: function() {
			var that = this;
			var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.vo.mengniu", "/json/Setting.json"));
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			this.getView().setModel(oModel);

			setTimeout(function() {
				

			}, 2000);

		},
		onSearch : function(oEvt) {

		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("Title",
					sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		// update list binding
		var list = this.getView().byId("idList");
		var binding = list.getBinding("items");
		binding.filter(aFilters);
	},
	onListItemPress : function(oEvent) {	
		 var context = oEvent.getSource().getBindingContext();
		 this.getView().byId("idTable1").bindRows({ path: context.sPath+"/TableItems"});
	},
	onSave : function(oEvent) {	
		sap.m.MessageToast.show("保存成功");
		
	},
	
		_setFull: function() {
			console.log('f');
		},
		_setSmall: function() {
				console.log('m');
			} //	onBeforeRendering: function() {
			//
			//	},
			//	onAfterRendering: function() {
			//
			//	},

		//	onExit: function() {
		//
		//	}

	});

});