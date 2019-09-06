sap.ui.define([
	"sap/vo/mengniu/controller/blocks/BlockContentBase.controller"
], function(BlockContentBase) {
	"use strict";

	return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.GPS", {
		onPress: function() {
			this.getRouter().navTo("single", {
				appId: 'Surveillance',
				viewIndex: '0'
			});
		}

	});

});