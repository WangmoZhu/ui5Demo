sap.ui.define([
	"sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
], function (BlockContentBase) {
	"use strict";

	return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.Trace", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.vo.mengniu.view.Trace
		 */
		onInit: function () {

		},
		onSearch: function (oEvent) {
			var component = sap.ui.getCore().getComponent('__component0');
			var oRouter = component.getRouter();
			oRouter.navTo("single", {
				appId: 'Trace'
			});
			return;


			var oWerksInput = new sap.m.Input();
			var oMatnrInput = new sap.m.Input();
			var oChargInput = new sap.m.Input();
			var oZhouzhuanInput = new sap.m.Input();
			var oXiangtiInput = new sap.m.Input();
			var oBaotiInput = new sap.m.Input();
			var oIconTabBar = new sap.m.IconTabBar({
				items: [
					new sap.m.IconTabFilter({
						icon: "sap-icon://customer-view",
						key: "B",
						text: "包体批次",
						content: [
							new sap.m.InputListItem({
								label: "包体批次",
								content: oBaotiInput
							})
						]
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://product",
						key: "X",
						text: "箱体批次",
						content: [
							new sap.m.InputListItem({
								label: "箱体批次",
								content: oXiangtiInput
							})
						]
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://shipping-status",
						key: "Z",
						text: "周转箱批次",
						content: [
							new sap.m.InputListItem({
								label: "周转箱批次",
								content: oZhouzhuanInput
							})
						]
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://factory",
						key: "G",
						text: "工厂内部批次",
						content: [
							new sap.m.InputListItem({
								label: "工厂",
								content: oWerksInput
							}),
							new sap.m.InputListItem({
								label: "物料",
								content: oMatnrInput
							}),
							new sap.m.InputListItem({
								label: "批次",
								content: oChargInput
							})
						]
					})
				]
			});
			// 工厂/物料/批次和周转箱/箱体/包体两套
			var dialog = new sap.m.Dialog({
				title: '请输入追溯批次',
				resizable: true,
				draggable: true,
				content: [
					oIconTabBar
				],
				beginButton: new sap.m.Button({
					text: '确定',
					press: function () {
						var oData = {};
						switch (oIconTabBar.getSelectedKey()) {
							case "X":
								oData.WA_CHARG_XT = oXiangtiInput.getValue();
								if (!oData.WA_CHARG_XT) {
									sap.m.MessageToast.show("请填写批次信息");
									return;
								}
								break;
							case "Z":
								oData.WA_CHARG_ZZX = oZhouzhuanInput.getValue();
								if (!oData.WA_CHARG_ZZX) {
									sap.m.MessageToast.show("请填写批次信息");
									return;
								}
								break;
							case "G":
								oData.WA_WERKS = oWerksInput.getValue();
								oData.WA_MATNR = oMatnrInput.getValue();
								oData.WA_CHARG = oChargInput.getValue();
								if (!oData.WA_CHARG || !oData.WA_MATNR || !oData.WA_WERKS) {
									sap.m.MessageToast.show("请填写批次信息");
									return;
								}
								break;
							case "B":
							default:
								oData.WA_CHARG_BT = oBaotiInput.getValue();
								if (!oData.WA_CHARG_BT) {
									sap.m.MessageToast.show("请填写批次信息");
									return;
								}
								break;
						}
						sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(oData), "Trace");
						var component = sap.ui.getCore().getComponent('__component0');
						var oRouter = component.getRouter();
						oRouter.navTo("single", {
							appId: 'Trace'
						});
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: '取消',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.addStyleClass("myDialog");

			dialog.open();

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.vo.mengniu.view.Trace
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.vo.mengniu.view.Trace
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.vo.mengniu.view.Trace
		 */
		//	onExit: function() {
		//
		//	}

	});

});