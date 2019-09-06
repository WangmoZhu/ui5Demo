/*消息控制器*/
sap.ui.define([
		'sap/m/MessagePopover',
		'sap/m/MessagePopoverItem',
		"sap/m/Button",
		"sap/m/Bar",
		"sap/m/MessageBox",
		"sap/m/MessageToast",
		"sap/ui/model/json/JSONModel",
		"./designMode"
], function(MessagePopover, MessagePopoverItem, Button, Bar, MessageBox, MessageToast, JSONModel, designMode) {
	"use strict";

	// 解析错误消息
	function fnParseError(oParameter) {
		var sMessage = "", sDetails = "", oParameters = null, oError = {};
		oParameters = oParameter.getParameters ? oParameter.getParameters() : oParameter;
		sMessage = oParameters.message || oParameters.response.message;
		sDetails = oParameters.responseText || oParameters.response.responseText;

		if (jQuery.sap.startsWith(sDetails || "", "{\"error\":")) {
			var oErrModel = new JSONModel();
			oErrModel.setJSON(sDetails);
			sMessage = oErrModel.getProperty("/error/message/value");
		}

		oError.sDetails = sDetails;
		oError.sMessage = sMessage;
		return oError;
	}

	// 创建左上角消息按钮
	function createMessagePopover(oContext, oEvent) {
		if (!oContext._MessagePopover) {
			var oMessageTemplate = new MessagePopoverItem({
				type : '{type}',
				title : '{title}',
				description : '{description}',
				subtitle : '{subtitle}' });

			oContext._MessagePopover = new MessagePopover({
				items : {
					path : '/messages/content',
					template : oMessageTemplate } });
		}
		oContext.getView().addDependent(oContext._MessagePopover);
		oContext._MessagePopover.setModel(oContext._JSONModel);
		oContext._MessagePopover.openBy(oEvent.getSource());

	}

	return {

		// 处理转换OData错误消息
		convertODataErrorMessage : function(oContext) {
			var aReturn = this.getODataReturns(oContext.oError);
			oContext._JSONModel.setProperty("/returns", aReturn, false);
			// 调用转换消息处理事件
			this.convertMessage(oContext, "/returns");
		},
		
		// 处理转换消息事件
		convertMessage : function(oContext, sPath) {

			var aMessageInData = oContext._JSONModel.getProperty(sPath);
			if (aMessageInData == null) {
				aMessageInData = [];
			}

			var aMessageItems = [];
			var iCounterE = 0;

			for (var i = 0; i < aMessageInData.length; i++) {
				var oMessageItem = {
					type : {
						"A" : sap.ui.core.MessageType.Error,
						"E" : sap.ui.core.MessageType.Error,
						"W" : sap.ui.core.MessageType.Warning,
						"S" : sap.ui.core.MessageType.Success,
						"I" : sap.ui.core.MessageType.Information }[aMessageInData[i].Type] || "",
					title : aMessageInData[i].Message,
					subtitle : aMessageInData[i].Parameter + aMessageInData[i].Field + aMessageInData[i].MessageV1,
					description : aMessageInData[i].Id + aMessageInData[i].Number + "-" + aMessageInData[i].MessageV2 };
				if (oMessageItem.type == "Error") {
					iCounterE = parseInt(iCounterE) + 1;
				}
				aMessageItems.push(oMessageItem);
			}

			var oMessage = {
				buttonWidth : aMessageItems.length > 0 ? "5em" : "0em",
				counter : aMessageItems.length,
				content : aMessageItems,
				counterE : iCounterE };
			oContext._JSONModel.setProperty("/messages", oMessage, false);

		},

		// 获取OData消息返回集
		getODataReturns : function(oParameter) {
			var oErrro = fnParseError(oParameter);
			var sDetails = oErrro.sDetails;
			var aErrorDetails = [];
			var oReturn = {
				Field : "",
				Id : "00",
				LogMsgNo : "000000",
				LogNo : "",
				Message : oErrro.sMessage,
				MessageV1 : "",
				MessageV2 : "",
				MessageV3 : "",
				MessageV4 : "",
				Number : "999",
				Parameter : "",
				Row : 0,
				System : "",
				Type : "E" };
			var sReturn, aReturn, oErrModel;
			if (jQuery.sap.startsWith(sDetails || "", "{\"error\":")) {
				oErrModel = new JSONModel();
				oErrModel.setJSON(sDetails);
				aErrorDetails = oErrModel.getProperty("/error/innererror/errordetails");
			}

			for (var i = 0; i < aErrorDetails.length; i++) {
				if (aErrorDetails[i].target == "exceptions") {
					sReturn = aErrorDetails[i].message;
					oErrModel.setJSON(sReturn);
					aReturn = oErrModel.getProperty("/EXCEPTIONS");
					return aReturn;
				}
			}

			if (!aReturn) {
				aReturn = [];
			}
			if (aReturn && aReturn.length == 0) {
				aReturn.push(oReturn);
				return aReturn;
			}

		},

		// 展示错误消息
		showODataError : function(oParameter, sTitle) {
			var oErrorDetails = fnParseError(oParameter);
			MessageBox.show(oErrorDetails.sMessage, {
				icon : MessageBox.Icon.ERROR,
				title : sTitle,
				details : oErrorDetails.sDetails,
				actions : MessageBox.Action.CLOSE,
				onClose : null,
				styleClass : designMode.getCompactCozyClass() });
		},

		// 消息文本及位置展示格式
		showODataErrorText : function(oError) {
			MessageToast.show(fnParseError(oError).sMessage, {
				width : "20em",
				my : sap.ui.core.Popup.Dock.CenterCenter,
				at : sap.ui.core.Popup.Dock.CenterCenter });
		},

		// 错误类信息弹框
		showError : function(sText) {
			MessageBox.error(sText, {
				styleClass : designMode.getCompactCozyClass() });
		},
		
		// 警告类信息弹框
		showWarning : function(sText) {
			MessageBox.warning(sText, {
				styleClass : designMode.getCompactCozyClass() });
		},

		// 信息类信息弹框类
		showInformation : function(sText) {
			MessageBox.information(sText, {
				styleClass : designMode.getCompactCozyClass() });
		},

		// Toast形式展示消息
		showText : function(sText) {
			MessageToast.show(sText, {
				width : "20em",
				my : sap.ui.core.Popup.Dock.Center,
				at : sap.ui.core.Popup.Dock.Center });
		},

		// 展示消息按钮
		showMessagePopover : function(oContext, oEvent) {
			createMessagePopover(oContext, oEvent);
		},

		// 创建消息按钮
		createMessageButton : function(oContext) {

			var oView = oContext.getView();
			if (oView.getMetadata()._sClassName != "sap.ui.core.mvc.XMLView") {
				return;
			}
			if (!oView.getContent() || oView.getContent().length == 0) {
				return;
			}
			if (oView.getContent()[0].getMetadata()._sClassName != "sap.m.Page") {
				return;
			}

			var oPage = oView.getContent()[0];
			var oBlankBar = new Bar();
			var oBlankButton = new Button({
				width : "0em" });

			if (oPage.getCustomHeader() == null) {
				oPage.addAggregation("customHeader", oBlankBar);
			}
			var oCustHeader = oPage.getCustomHeader();

			if (!oContext._MessageButton) {
				oContext._MessageButton = new Button({
					text : "{/messages/counter}",
					type : "Emphasized",
					icon : "sap-icon://message-popup",
					width : "{/messages/buttonWidth}",
					visible : true,
					press : function(oEvent) {
						createMessagePopover(oContext, oEvent);
					} });
				oCustHeader.insertContentLeft(oContext._MessageButton, 0);
				if (oCustHeader.getContentMiddle().length == 0) {
					oCustHeader.insertContentMiddle(oBlankButton, 0);
				}
			}

		},

		// 确认信息处理
		confirmAction : function(sTitle, sText, sChannelId, sEventId, oContext) {
			MessageBox.confirm(sText, {
				title : sTitle,
				icon : MessageBox.Icon.WARNING,
				actions : [
						MessageBox.Action.YES, MessageBox.Action.NO
				],
				onClose : function(sResult) {
					oContext._result = sResult;
					// 发布事件
					oContext.getEventBus().publish(sChannelId, sEventId, oContext);
				},
				styleClass : designMode.getCompactCozyClass() });
		} };
});