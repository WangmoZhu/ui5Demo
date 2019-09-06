/* =========================================================== */
/* 公用控制器（基础函数功能实现包）                            */
/* =========================================================== */
sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"../model/formatter"
], function(Controller, UIComponent, History, formatter) {
	//---JS 严格模式
	"use strict";

	return Controller.extend("ZAPI_VIEW.controller.BaseController", {

		//---格式  
		formatter: formatter,

		//---获取EventBus
		getEventBus: function() {
			return this.getOwnerComponent().getEventBus();
		},

		//---获取Router(路由实例)
		getRouter: function() {
			return UIComponent.getRouterFor(this);
		},

		//---获取RouterId(路由Id)
		getRouterID: function() {
			var oHC = this.getRouter().oHashChanger;
			if (oHC.privgetCurrentShellHash) {
				var sHash = oHC.privgetCurrentShellHash().hash;
				var s = oHC.privstripLeadingHash(sHash).split("-")[0];
				s = s && s === "Shell-home" ? null : s;
				return s;
			}
		},

		//---跳转
		navTo: function(sName) {
			return sName == null ? null : this.getRouter().navTo(sName);
		},

		//---获取模型
		getModel: function(sName) {
			return this.getView().getModel(sName) || this.getOwnerComponent().getModel(sName);
		},

		// 获取OData元数据
		getODataMetadata: function(sName) {
			if (sName == "") {
				return null;
			}
			var oMetaData = this.getModel().getProperty("/ODataMetadata");
			return oMetaData[sName];
		},

		//---获取OData服务EntityType
		getEntityTypeByName: function(sODataName, sEntityTypeName) {
			if (!this.getODataMetadata(sODataName)) {
				return null;
			}
			return this.getODataMetadata(sODataName)._getEntityTypeByName(sEntityTypeName);
		},

		//---设置模型
		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		//---获取资源包
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		//---设置busy状态
		setBusy: function(b) {
			this.getModel().setProperty("/appProperties/busy", b);
		},

		//---设置bcode的值(同步方式)
		setbcode: function(v) {
			this.getModel().setProperty("/appProperties/bcode", v, false);
		},

		//---获取bcode的值
		getbcode: function(v) {
			return this.getModel().getProperty("/appProperties/bcode");
		},

		//---设置fcode的值(同步方式)
		setfcode: function(v) {
			this.getModel().setProperty("/appProperties/fcode", v, false);
		},

		//---是否是E类型消息
		isError: function(oContext) {
			var iCounterE = oContext.getModel().getProperty("/messages/counterE");
			return iCounterE > 0 ? true : false;
		},

		//---页面左上角message按钮弹框
		openMessagePopover: function(oContext) {
			if (oContext._MessageButton && this.isError(oContext)) {
				oContext._MessageButton.firePress();
			}
		},

		//---返回消息处理
		updateObligatory: function() {
			var oObligatory = {};
			var aReturn = this.getModel().getProperty("/returns");
			for (var i = 0; i < aReturn.length; i++) {
				if (aReturn[i].MessageV1 != "" && aReturn[i].Type == "E") {

					var oR = {
						Id: aReturn[i].Id,
						LogMsgNo: aReturn[i].LogMsgNo,
						LogNo: aReturn[i].LogNo,
						Message: aReturn[i].Message,
						MessageV1: aReturn[i].MessageV1,
						MessageV2: aReturn[i].MessageV2,
						MessageV3: aReturn[i].MessageV3,
						MessageV4: aReturn[i].MessageV4,
						Number: aReturn[i].Number,
						Row: aReturn[i].Row,
						System: aReturn[i].System
					};

					if (aReturn[i].MessageV2 != "") {
						if (!oObligatory[aReturn[i].MessageV1]) {
							oObligatory[aReturn[i].MessageV1] = {};
						}
						oObligatory[aReturn[i].MessageV1][aReturn[i].MessageV2] = oR;
					}

					if (aReturn[i].MessageV2 == "") {
						oObligatory[aReturn[i].MessageV1] = oR;
					}

				}
			}
			this.getModel().setProperty("/verReturn", oObligatory, false);

		},

		//---清除组件上必输错误状态标记
		clearInputRequiredErrorStatus: function(oEvent) {
			var sRootPath = "/verReturn";
			var sPath = oEvent.getSource().getBinding("valueState").sPath;
			if (sPath == "") {
				var aBindings = oEvent.getSource().getBinding("valueState").aBindings;
				sPath = aBindings[0].sPath + "/" + aBindings[1].oValue;
			}
			var oVerReturn = this._JSONModel.getProperty(sRootPath);
			sPath = sPath.replace(sRootPath + "/", "");
			var aKey = sPath.split("/", 2);
			if (aKey.length == 1) {
				delete oVerReturn[aKey[0]];
			}
			if (aKey.length == 2) {
				delete oVerReturn[aKey[0]][aKey[1]];
				// 表格中错误状态无法自动置空，需强制清理
				oEvent.getSource().setValueState("None");
			}
			this._JSONModel.setProperty(sRootPath, oVerReturn, false);
		},

		//---获取页面的聚合内容
		getPage: function() {
			var oView = this.getView();
			if (oView.getMetadata()._sClassName != "sap.ui.core.mvc.XMLView") {
				return null;
			}
			if (!oView.getContent() || oView.getContent().length == 0) {
				return null;
			}
			if (oView.getContent()[0].getMetadata()._sClassName != "sap.m.Page") {
				return null;
			}
			return oView.getContent()[0];
		},

		//---生成32位随机数
		createGUID: function() {
			var g = "";
			var i = 32;
			while (i--) {
				g += Math.floor(Math.random() * 16.0).toString(16);
			}
			return g;
		},

		//---重写克隆方法
		clone: function(obj, sub) {
			var o;
			if (obj.constructor == Object) {
				o = new obj.constructor();
			} else {
				o = new obj.constructor(obj.valueOf());
			}
			for (var key in obj) {
				if (o[key] != obj[key]) {
					if (typeof(obj[key]) == 'object') {
						o[key] = this.clone(obj[key]);
					} else {
						o[key] = obj[key];
					}
				}
			}
			o.toString = obj.toString;
			o.valueOf = obj.valueOf;
			return o;
		},

		//---返回事件
		onNavBack: function() {
			if (History.getInstance().getPreviousHash() !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("", {}, true);
			}
		}
	});
});