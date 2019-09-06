sap.ui.define([
		"sap/ui/model/Filter",
		"../controller/messages",
		"./models",
		"./formatter"
], function(Filter, messages, models, formatter) {
	"use strict";

	return {

		doPost : function(oView, fnSuccess, fnError) {
			this._Controller = oView.getController();
			this._JSONModel = this._Controller.getModel();
			var sBCode = this._JSONModel.getProperty("/appProperties/bcode");

			var f1 = "postYD"; // 异动通知单数据交互处理函数
			var f2 = "postDF"; // 异动通知单数据交互处理函数

			var sFunction = {
				"YD" : f1,
				"DF" : f2,

			}[sBCode] || "";

			switch (sFunction) {
			case f1:
				this.postYD(oView, fnSuccess, fnError);
				break;
			case f2:
				this.postDF(oView, fnSuccess, fnError);
				break;

			}
		},

		

		// 异动通知单数据交互处理函数
		postYD : function(oView, fnSuccess, fnError) {
			this._Controller = oView.getController();
			this._ODataModel = this._Controller.getModel("OData");
			this._JSONModel = this._Controller.getModel();
			var sFCode = this._JSONModel.getProperty("/appProperties/fcode")
			this._Controller.setBusy(true);
			var oYD = this._JSONModel.getData().ydSet;
			var oRequest = this._Controller.clone(oYD);
			oRequest.Fcode = sFCode;
			var oUICBackup = oRequest.np_yd2uic;
			oRequest.np_yd2uic = [];
			oRequest.np_yd2bt = !oRequest.np_yd2bt ? [] : oRequest.np_yd2bt;
			var sUrl = "/ydSet";
			var mParameters = {
				success : function(oData, response) {
					var localData = this._JSONModel.getData();
					localData.ydSet = oData;
					localData.ydSet.np_yd2bt = oData.np_yd2bt != null ? oData.np_yd2bt.results : null;
					localData.ydSet.np_yd2uic = oData.np_yd2uic != null ? oData.np_yd2uic.results : oUICBackup;
					if (jQuery.isArray(localData.ydSet.np_yd2uic)) {
						localData.ydSet.np_yd2uic = formatter.convertUIC(localData.ydSet.np_yd2uic);
					}
					this._JSONModel.setProperty("/", localData, false);
					messages.convertMessage(this, "/ydSet/np_yd2bt");
					this._Controller.setBusy(false);
					if (fnSuccess) {
						fnSuccess(this._Controller);
					}
				}.bind(this),
				error : function(oError) {
					this._Controller.setBusy(false);
					this._Controller.oError = oError;
					messages.convertODataErrorMessage(this._Controller);
					this._Controller.updateObligatory();
					if (fnError) {
						fnError(this._Controller);
					}
				}.bind(this)
			};

			this._ODataModel.create(sUrl, oRequest, mParameters);
		},
		
	// 缺陷报表数据交互处理函数
		postDF : function(oView, fnSuccess, fnError) {

			this._Controller = oView.getController();
			this._ChartModel = this._Controller.getModel("Chart");
			this._JSONModel = this._Controller.getModel();
//			var sFCode = this._JSONModel.getProperty("/appProperties/fcode");

			this._Controller.setBusy(true);

			var oDF = this._JSONModel.getData()._chartSet;
			var oRequest = this._Controller.clone(oDF);
			oRequest.Fcode = sFCode;
//			var oUICBackup = oRequest.np_df2uic;
//			oRequest.np_df2uic = [];
//			oRequest.np_df2bt = !oRequest.np_df2bt ? [] : oRequest.np_df2bt;
//			oRequest.np_df2dfs = !oRequest.np_df2dfs ? [] : oRequest.np_df2dfs;

			var sUrl = "/chartSet";
			var mParameters = {
				success : function(oData, response) {
					var localData = this._JSONModel.getData();
					localData.dfSet = oData;
//					localData.dfSet.np_df2dfs = oData.np_df2dfs != null ? oData.np_df2dfs.results : null;
//					localData.dfSet.np_df2bt = oData.np_df2bt != null ? oData.np_df2bt.results : null;
//					localData.dfSet.np_df2uic = oData.np_df2uic != null ? oData.np_df2uic.results : oUICBackup;
//					if (jQuery.isArray(localData.dfSet.np_df2uic)) {
//						localData.dfSet.np_df2uic = formatter.convertUIC(localData.dfSet.np_df2uic);
//					}
					this._JSONModel.setProperty("/", localData, false);
//					messages.convertMessage(this, "/dfSet/np_df2bt");
					this._Controller.setBusy(false);
					if (fnSuccess) {
						fnSuccess(this._Controller);
					}
				}.bind(this),
				error : function(oError) {
					this._Controller.setBusy(false);
					this._Controller.oError = oError;
					messages.convertODataErrorMessage(this._Controller);
					this._Controller.updateObligatory();
					if (fnError) {
						fnError(this._Controller);
					}
				}.bind(this)
			};

			this._ChartModel.create(sUrl, oRequest, mParameters);

		},
		
		// 获取Domain值搜索帮助
		getDomainValueList : function(sDomainName, oContext, sLanguage) {
			var aFilters = [];
			aFilters.push(new Filter("Domname", sap.ui.model.FilterOperator.EQ, sDomainName));
			aFilters.push(new Filter("Ddlanguage", sap.ui.model.FilterOperator.EQ, sLanguage));
			this.callSearchHelp("ZSH_DOMAIN", oContext, aFilters);
		},

		// 搜索帮助交互函数
		callSearchHelp : function(sName, oController, aFilter, aSorter, fnSuccess, fnError) {

			this._Controller = oController;
			this._ODataModel = this._Controller.getModel("OData");
			this._JSONModel = this._Controller.getModel();

			this._Controller.setBusy(true);

			var sName = sName + "Set";
			var sUrl = "/" + sName;
			var iQueryMaxhints = this._JSONModel.getProperty("/appProperties/queryMaxhints");
			if (iQueryMaxhints == "" || iQueryMaxhints == 0) {
				iQueryMaxhints = 9999;
			}

			if (sName == "ZSH_DOMAINSet") {
				if (!aFilter || !aFilter.length || aFilter.length == 0) {
					return;
				}
				for (var i = 0; i < aFilter.length; i++) {
					if (aFilter[i].sPath == "Domname") {
						sName = aFilter[i].oValue1 + "Set";
					}
				}
			}

			var mParameters = {
				urlParameters : {
					$top : iQueryMaxhints,
					$skip : 0
				},
				filters : aFilter,
				sorters : aSorter,
				success : function(oData, response) {
					var localData = this._JSONModel.getData();
					localData[sName] = oData.results;
					this._JSONModel.setProperty("/", localData, false);
					this._Controller.setBusy(false);
					if (fnSuccess) {
						fnSuccess(this._Controller);
					}
				}.bind(this),
				error : function(oError) {
					this._Controller.setBusy(false);
					this._Controller.oError = oError;
					if (fnError) {
						fnError(this._Controller);
					}
				}.bind(this)
			};

			this._ODataModel.read(sUrl, mParameters);

		}




		
	};
});