sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.vo.mengniu.controller.blocks.vizBase", {
        initPopover: function(showFooter,showDrillUp,showDrillDown,fnDrillUp,fnDrillDown) {
		    if (this._oPopover) {
		        this._oPopover.destroy();
		        this._oPopover = null;
		    }
		    this._oPopover = sap.ui.xmlfragment("sap.vo.yijiajia.view.blocks.fragment.Popover", this);
            this.getView().addDependent(this._oPopover);
            if(showFooter){
                var oModel = new JSONModel({
                    showDrillUp: showDrillUp,
                    showDrillDown: showDrillDown
                });
                this._oPopover.setModel(oModel,'popover');
    		}
		    else {
		        var oFooter = this._oPopover.getAggregation('footer');
		        if(oFooter) {
		            oFooter.setVisible(false);
		        }
		    }
		    this._fnDrillUp = fnDrillUp;
		    this._fnDrillDown = fnDrillDown;
		},
		openPopover: function(oModel,target) {
		    if (this._oPopover) {
		        $('.v-m-tooltip').remove();
		        var oData = {};
		        if(this._oPopover.getModel('popover'))
		        {
		            oData = this._oPopover.getModel('popover').getData() || {};
		        }
		        oData = $.extend({},oData,oModel.getData());
		        var oModelNew = new JSONModel(oData);
    		    this._oPopover.setModel(oModelNew,'popover');
                this._oPopover.openBy(target);
		    }
		},
		handleClose: function() {
		    if (this._oPopover) {
		        this._oPopover.close();
		    }
		},
		handleDrillUp: function() {
		    this.handleClose();
		    if(this._fnDrillUp) {
		        this._fnDrillUp();
		    }
		},
		handleDrillDown: function() {
		    this.handleClose();
		    if(this._fnDrillDown) {
		        this._fnDrillDown();
		    }
		},

	});

});