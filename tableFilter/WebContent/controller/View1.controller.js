sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/type/String'
], function(Controller,typeString) {
	"use strict";

	return Controller.extend("echart.controller.View1", {
		
		tokenFilter:{
		   'EQ' : '=',
		   'BT' : '...',
		   'LT' : '<',
		   'LE' : '<=',
		   'GT' : '>',
		   'GE' : '>=',
		   'Contains' : '2',
		   'StartsWith' : '1',
		   'EndsWith' : '-1'
		},
		
		onInit: function(){
			this.oProductsModel = this.initSampleProductsModel();
			this.getView().setModel(this.oProductsModel);
		},
		
		config: {
			initialRank: 0,
			defaultRank: 1024,
			rankAlgorithm: {
				Before: function(iRank) {
					return iRank + 1024;
				},
				Between: function(iRank1, iRank2) {
					// limited to 53 rows
					return (iRank1 + iRank2) / 2;
				},
				After: function(iRank) {
					return iRank / 2;
				}
			}
		},

		initSampleProductsModel: function() {
			var oData = jQuery.sap.sjax({
				url: sap.ui.require.toUrl("echart/model") + "/products.json",
				dataType: "json"
			}).data;
			
			var i = 0;
			// prepare and initialize the rank property
			oData.ProductCollection.forEach(function(oProduct) {
				oProduct.Rank = i++;
			}, this);

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(oData);
			return oModel;
		},
		
		onAfterRendering: function(){
			this._JSONModel = new sap.ui.model.json.JSONModel({
				vAble: false
			});
			
			this.getView().setModel(this._JSONModel,"filter");
		},
		
		onColumn: function(oEvent){
			var oColumn = oEvent.getParameter("column");
			if (oColumn != this.byId("quantity")) {
				return;
			}
			console.log(oEvent);
			if(!this._dialog){
				this._dialog = new sap.ui.xmlfragment("echart.dialog.dialog",this);
				this._dialog.setRangeKeyFields([{
					label: "Quantity",
					key: "Name",
					type: "string"

				}]);
			}
			this.getView().addDependent(this._dialog);
			this._dialog.open();
		},
		
		onValueHelpOkPress: function(oEvent){
			var tableBinding   = this.byId('table').getBinding('rows');
			var aTokens = oEvent.getParameter("tokens");
			var text, aFilter = [];
			for(let i=0; i<aTokens.length; i++){
				text = aTokens[i].getText();
				if(text.indexOf('<') === 0){
					aFilter.push(new sap.ui.model.Filter({
						path: "Quantity",
					    operator: 'LT',
					    value1: text.replace('<','')
					}))
				}else if(text.indexOf('=') === 0){
					aFilter.push(new sap.ui.model.Filter({
						path: "Quantity",
					    operator: 'EQ',
					    value1: text.replace('=','')
					}))
				}
			}
			
			var aFilters = new sap.ui.model.Filter({
				filters : aFilter,
				and: true
			})
			tableBinding.filter(aFilters);
			
			if(aFilter.length === 0){
				this._JSONModel.setProperty("/vAble",false,false);
			}else{
				this._JSONModel.setProperty("/vAble",true,false);
			}
			
			this._dialog.close();
		},
		
		onValueHelpCancelPress: function(oEvent){
			this._dialog.close();
		},
		
		onDragStart: function(oEvent) {
			var oDraggedRow = oEvent.getParameter("target");
			var oDragSession = oEvent.getParameter("dragSession");

			// keep the dragged row context for the drop action
			oDragSession.setComplexData("draggedRowContext", oDraggedRow.getBindingContext());
		},
		
		onDropTable2: function(oEvent) {
			var oDragSession = oEvent.getParameter("dragSession");
			var oDraggedRowContext = oDragSession.getComplexData("draggedRowContext");
			if (!oDraggedRowContext) {
				return;
			}

			var oConfig = this.config;
			var iNewRank = oConfig.defaultRank;
			var oDroppedRow = oEvent.getParameter("droppedControl");

			if (oDroppedRow && oDroppedRow instanceof sap.ui.table.Row) {
				// get the dropped row data
				var sDropPosition = oEvent.getParameter("dropPosition");
				var oDroppedRowContext = oDroppedRow.getBindingContext();
				var iDroppedRowRank = oDroppedRowContext.getProperty("Rank");
				var iDroppedRowIndex = oDroppedRow.getIndex();
				var oDroppedTable = oDroppedRow.getParent();

				// find the new index of the dragged row depending on the drop position
				var iNewRowIndex = iDroppedRowIndex + (sDropPosition === "After" ? 1 : -1);
				var oNewRowContext = oDroppedTable.getContextByIndex(iNewRowIndex);
				if (!oNewRowContext) {
					// dropped before the first row or after the last row
					iNewRank = oConfig.rankAlgorithm[sDropPosition](iDroppedRowRank);
				} else {
					// dropped between first and the last row
					iNewRank = oConfig.rankAlgorithm.Between(iDroppedRowRank, oNewRowContext.getProperty("Rank"));
				}
			}

			// set the rank property and update the model to refresh the bindings
			this.oProductsModel.setProperty("Rank", iNewRank, oDraggedRowContext);
			this.oProductsModel.refresh(true);
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		

	});
});