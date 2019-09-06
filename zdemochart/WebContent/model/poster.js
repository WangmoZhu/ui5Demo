/* =========================================================== */
/* 主要 函数方法 实现                                                                               */
/* =========================================================== */
sap.ui.define([ "sap/ui/model/Filter",
				 "../controller/messages",
				 "./models",
				 "./formatter"
], function(Filter, messages, models, formatter) {
				"use strict";

				return {
					// 前后台交互通用函数
					doPost : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._JSONModel = this._Controller.getModel();
						var sBCode = this._JSONModel.getProperty("/appProperties/bcode");

						var f1 = "postEAMWT"; // 工作票数据交互处理函数
						var f2 = "postBEIJIAN"; // 备件需求提报数据交互处理函数
						var f4 = "postDEFECT"; // 缺陷登记数据交互处理函数
						var f5 = "postSHA"; // 交接班日志数据交互处理函数
						var f6 = "postPTH"; // 光伏工作票数据交互处理函数
						var f7 = "postSHTH"; // 日志排班数据交互处理函数
						var f8 = "postWCP"; // 定期工作计划数据交互处理函数
						var f9 = "postWCPA"; // 定期工作任务数据交互处理函数
						var fA = "postMTPM"; // 维修作业许可数据交互处理函数
						var fB = "postTKH"; // 工作票报表数据交互处理函数
						var fC = "postOPH"; // 运行记录数据交互处理函数
						var fD = "postTTN"; // 保护投退功能增强数据交互处理函数
						var fE = "postDF"; // 缺陷报表数据交互处理函数
						var fF = "postTEA"; // 临时用电数据交互处理函数
						var fG = "postOPT"; // 操作票数据交互处理函数
						var fH = "postXG"; // 巡更管理数据交互处理函数
						var fI = "postTR"; // 设备试运行数据交互处理函数
						var fJ = "postTW"; // 临时用水、压缩空气申请单数据交互处理函数
						var fK = "postTF"; // 设备停复役数据交互处理函数
						var fL = "postSCN"; // 停送电联系单数据交互处理函数
						var fM = "postOPQ"; // 操作票查询报表数据交互处理函数
						var fN = "postQM"; // 综合报表查询数据交互处理函数
						var fO = "postYD"; // 异动通知单数据交互处理函数
						var fP = "postOPSR";// 操作票状态报告数据交互处理函数
						var fQ = "postFL"; // 功能位置数据交互处理函数
						var fR = "postDT"; // 值班管理数据交互处理函数
						var fS = "postSP"; // 备件需求提报报表处理函数
						var fT = "postRR"; // 试运转单报表处理函数
						
						var sFunction = {
							"WT" : f1,
							"BJ" : f2,
							"DH" : f4,
							"RL" : f5,
							"PT" : f6,
							"SH" : f7,
							"WP" : f8,
							"WA" : f9,
							"MT" : fA,
							"TK" : fB,
							"OP" : fC,
							"TN" : fD,
							"DF" : fE,
							"TE" : fF,
							"OPT" : fG,
							"XG" : fH,
							"TR" : fI,
							"TW" : fJ,
							"TF" : fK,
							"SC" : fL,
							"OPQ" : fM,
							"QM" : fN,
							"YD" : fO,
							"OPSR" : fP,
							"FL" : fQ,
							"DT" : fR,
							"SP" : fS,
							"RR" : fT
							
						}[sBCode] || "";

						switch (sFunction) {
						case f1:
							this.postEAMWT(oView, fnSuccess, fnError);
							break;
						case f2:
							this.postBEIJIAN(oView, fnSuccess, fnError);
							break;
						case f4:
							this.postDEFECT(oView, fnSuccess, fnError);
							break;
						case f5:
							this.postSHA(oView, fnSuccess, fnError);
							break;
						case f6:
							this.postPTH(oView, fnSuccess, fnError);
							break;
						case f7:
							this.postSHTH(oView, fnSuccess, fnError);
							break;
						case f8:
							this.postWCP(oView, fnSuccess, fnError);
							break;
						case f9:
							this.postWCPA(oView, fnSuccess, fnError);
							break;
						case fA:
							this.postMTPM(oView, fnSuccess, fnError);
							break;
						case fB:
							this.postTKH(oView, fnSuccess, fnError);
							break;
						case fC:
							this.postOPH(oView, fnSuccess, fnError);
							break;
						case fD:
							this.postTTN(oView, fnSuccess, fnError);
							break;
						case fE:
							this.postDF(oView, fnSuccess, fnError);
							break;
						case fF:
							this.postTEA(oView, fnSuccess, fnError);
							break;
						case fG:
							this.postOPT(oView, fnSuccess, fnError);
							break;
						case fH:
							this.postXG(oView, fnSuccess, fnError);
							break;
						case fI:
							this.postTR(oView, fnSuccess, fnError);
							break;
						case fJ:
							this.postTW(oView, fnSuccess, fnError);
							break;
						case fK:
							this.postTF(oView, fnSuccess, fnError);
							break;
						case fL:
							this.postSCN(oView, fnSuccess, fnError);
							break;
						case fM:
							this.postOPQ(oView, fnSuccess, fnError);
							break;
						case fN:
							this.postQM(oView, fnSuccess, fnError);
							break;
						case fO:
							this.postYD(oView, fnSuccess, fnError);
							break;
						case fP:
							this.postOPSR(oView, fnSuccess, fnError);
							break;
						case fQ:
							this.postFL(oView, fnSuccess, fnError);
							break;
						case fR:
							this.postDT(oView, fnSuccess, fnError);
							break;
						case fS:
							this.postSP(oView, fnSuccess, fnError);
							break;
						case fT:
							this.postRR(oView, fnSuccess, fnError);
							break;
						default:
							break;
						}
					},

					// 工作票数据交互处理函数
					postEAMWT : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用fcode
						this._Controller.setBusy(true);

						// 工作票数据集
						var oWT = this._JSONModel.getData().wtSet;
						var oRequest = this._Controller.clone(oWT);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_wt2uic;
						// 相关行项目
						oRequest.np_wt2uic = [];
						oRequest.np_wt2it = !oRequest.np_wt2it ? [] : oRequest.np_wt2it;
						oRequest.np_wt2da = !oRequest.np_wt2da ? [] : oRequest.np_wt2da;
						oRequest.np_wt2sm01 = !oRequest.np_wt2sm01 ? [] : oRequest.np_wt2sm01;
						oRequest.np_wt2sm02 = !oRequest.np_wt2sm02 ? [] : oRequest.np_wt2sm02;
						oRequest.np_wt2sm03 = !oRequest.np_wt2sm03 ? [] : oRequest.np_wt2sm03;
						oRequest.np_wt2sm04 = !oRequest.np_wt2sm04 ? [] : oRequest.np_wt2sm04;
						oRequest.np_wt2sm05 = !oRequest.np_wt2sm05 ? [] : oRequest.np_wt2sm05;
						oRequest.np_wt2sm06 = !oRequest.np_wt2sm06 ? [] : oRequest.np_wt2sm06;
						oRequest.np_wt2ro = !oRequest.np_wt2ro ? [] : oRequest.np_wt2ro;
						oRequest.np_wt2cf = !oRequest.np_wt2cf ? [] : oRequest.np_wt2cf;
						oRequest.np_wt2hl = !oRequest.np_wt2hl ? [] : oRequest.np_wt2hl;
						oRequest.np_wt2bt = !oRequest.np_wt2bt ? [] : oRequest.np_wt2bt;
						oRequest.np_wt2s = !oRequest.np_wt2s ? [] : oRequest.np_wt2s;
						oRequest.np_wt2a = !oRequest.np_wt2a ? [] : oRequest.np_wt2a;
						oRequest.np_wt2t = !oRequest.np_wt2t ? [] : oRequest.np_wt2t;

						var sUrl = "/wtSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.wtSet = oData;
								localData.wtSet.np_wt2it = oData.np_wt2it != null ? oData.np_wt2it.results : null;
								localData.wtSet.np_wt2ro = oData.np_wt2ro != null ? oData.np_wt2ro.results : null;
								localData.wtSet.np_wt2sm01 = oData.np_wt2sm01 != null ? oData.np_wt2sm01.results : null;
								localData.wtSet.np_wt2sm02 = oData.np_wt2sm02 != null ? oData.np_wt2sm02.results : null;
								localData.wtSet.np_wt2sm03 = oData.np_wt2sm03 != null ? oData.np_wt2sm03.results : null;
								localData.wtSet.np_wt2sm04 = oData.np_wt2sm04 != null ? oData.np_wt2sm04.results : null;
								localData.wtSet.np_wt2sm05 = oData.np_wt2sm05 != null ? oData.np_wt2sm05.results : null;
								localData.wtSet.np_wt2sm06 = oData.np_wt2sm06 != null ? oData.np_wt2sm06.results : null;
								localData.wtSet.np_wt2da = oData.np_wt2da != null ? oData.np_wt2da.results : null;
								localData.wtSet.np_wt2hl = oData.np_wt2hl != null ? oData.np_wt2hl.results : null;
								localData.wtSet.np_wt2cf = oData.np_wt2cf != null ? oData.np_wt2cf.results : null;
								localData.wtSet.np_wt2bt = oData.np_wt2bt != null ? oData.np_wt2bt.results : null;
								localData.wtSet.np_wt2s = oData.np_wt2s != null ? oData.np_wt2s.results : null;
								localData.wtSet.np_wt2a = oData.np_wt2a != null ? oData.np_wt2a.results : null;
								localData.wtSet.np_wt2t = oData.np_wt2t != null ? oData.np_wt2t.results : null;
								localData.wtSet.np_wt2uic = oData.np_wt2uic != null ? oData.np_wt2uic.results : oUICBackup;
								if (jQuery.isArray(localData.wtSet.np_wt2uic)) {
									localData.wtSet.np_wt2uic = formatter.convertUIC(localData.wtSet.np_wt2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/wtSet/np_wt2bt");
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

					// 备件需求提报数据交互处理函数
					postBEIJIAN : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode

						this._Controller.setBusy(true);
					// 数据集
						var oBJH = this._JSONModel.getData().bjhSet;
						var oRequest = this._Controller.clone(oBJH);
						oRequest.Fcode = sFCode;
					// 相关行项目
						oRequest.np_bjh2bt = !oRequest.np_bjh2bt ? [] : oRequest.np_bjh2bt;
						oRequest.np_bjh2i = !oRequest.np_bjh2i ? [] : oRequest.np_bjh2i;
						oRequest.np_bjh2s = !oRequest.np_bjh2s ? [] : oRequest.np_bjh2s;
						oRequest.np_bjh2a = !oRequest.np_bjh2a ? [] : oRequest.np_bjh2a;
						oRequest.np_bjh2t = !oRequest.np_bjh2t ? [] : oRequest.np_bjh2t;

						var sUrl = "/bjhSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.bjhSet = oData;
								localData.bjhSet.np_bjh2bt = oData.np_bjh2bt != null ? oData.np_bjh2bt.results : null;
								localData.bjhSet.np_bjh2i = oData.np_bjh2i != null ? oData.np_bjh2i.results : null;
								localData.bjhSet.np_bjh2s = oData.np_bjh2s != null ? oData.np_bjh2s.results : null;
								localData.bjhSet.np_bjh2a = oData.np_bjh2a != null ? oData.np_bjh2a.results : null;
								localData.bjhSet.np_bjh2t = oData.np_bjh2t != null ? oData.np_bjh2t.results : null;
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/bjhSet/np_bjh2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};

						this._ODataModel.create(sUrl, oRequest, mParameters);

					},

					// 缺陷登记数据交互处理函数
					postDEFECT : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode
						this._Controller.setBusy(true);
					// 数据集
						var oDH = this._JSONModel.getData().dhSet;
						var oRequest = this._Controller.clone(oDH);
						oRequest.Fcode = sFCode;
					// UIC备份
						var oUICBackup = oRequest.np_dh2uic;
					// 相关行项目
						oRequest.np_dh2uic = [];
						oRequest.np_dh2ro = !oRequest.np_dh2ro ? [] : oRequest.np_dh2ro;
						oRequest.np_dh2bt = !oRequest.np_dh2bt ? [] : oRequest.np_dh2bt;
						oRequest.np_dh2hn = !oRequest.np_dh2hn ? [] : oRequest.np_dh2hn;
						oRequest.np_dh2s = !oRequest.np_dh2s ? [] : oRequest.np_dh2s;
						oRequest.np_dh2a = !oRequest.np_dh2a ? [] : oRequest.np_dh2a;
						oRequest.np_dh2t = !oRequest.np_dh2t ? [] : oRequest.np_dh2t;

						var sUrl = "/dhSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.dhSet = oData;
								localData.dhSet.np_dh2ro = oData.np_dh2ro != null ? oData.np_dh2ro.results : null;
								localData.dhSet.np_dh2bt = oData.np_dh2bt != null ? oData.np_dh2bt.results : null;
								localData.dhSet.np_dh2hn = oData.np_dh2hn != null ? oData.np_dh2hn.results : null;
								localData.dhSet.np_dh2s = oData.np_dh2s != null ? oData.np_dh2s.results : null;
								localData.dhSet.np_dh2a = oData.np_dh2a != null ? oData.np_dh2a.results : null;
								localData.dhSet.np_dh2t = oData.np_dh2t != null ? oData.np_dh2t.results : null;
								localData.dhSet.np_dh2uic = oData.np_dh2uic != null ? oData.np_dh2uic.results : oUICBackup;
								if (jQuery.isArray(localData.dhSet.np_dh2uic)) {
									localData.dhSet.np_dh2uic = formatter.convertUIC(localData.dhSet.np_dh2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/dhSet/np_dh2bt");
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

					// 交接班日志数据交互处理函数
					postSHA : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode
						this._Controller.setBusy(true);
					// 数据集
						var oSHA = this._JSONModel.getData().shaSet;
						var oRequest = this._Controller.clone(oSHA);
						oRequest.Fcode = sFCode;
					// UIC备份
						var oUICBackup = oRequest.np_sha2uic;
					// 相关行项目
						oRequest.np_sha2uic = [];
						oRequest.np_sha2bt = !oRequest.np_sha2bt ? [] : oRequest.np_sha2bt;
						oRequest.np_sha2as = !oRequest.np_sha2as ? [] : oRequest.np_sha2as;
						oRequest.np_sha2j = !oRequest.np_sha2j ? [] : oRequest.np_sha2j;
						oRequest.np_sha2es = !oRequest.np_sha2es ? [] : oRequest.np_sha2es;
						oRequest.np_sha2gs = !oRequest.np_sha2gs ? [] : oRequest.np_sha2gs;
						oRequest.np_sha2r = !oRequest.np_sha2r ? [] : oRequest.np_sha2r;
						oRequest.np_sha2rc = !oRequest.np_sha2rc ? [] : oRequest.np_sha2rc;
						oRequest.np_sha2l = !oRequest.np_sha2l ? [] : oRequest.np_sha2l;
						oRequest.np_sha2rl = !oRequest.np_sha2rl ? [] : oRequest.np_sha2rl;
						oRequest.np_sha2pc = !oRequest.np_sha2pc ? [] : oRequest.np_sha2pc;
						oRequest.np_sha2wka = !oRequest.np_sha2wka ? [] : oRequest.np_sha2wka;
						oRequest.np_sha2wkq = !oRequest.np_sha2wkq ? [] : oRequest.np_sha2wkq;
						oRequest.np_sha2grdl = !oRequest.np_sha2grdl ? [] : oRequest.np_sha2grdl;
						oRequest.np_sha2gsw = !oRequest.np_sha2gsw ? [] : oRequest.np_sha2gsw;
						oRequest.np_sha2rdoc = !oRequest.np_sha2rdoc ? [] : oRequest.np_sha2rdoc;
						oRequest.np_sha2grdq = !oRequest.np_sha2grdq ? [] : oRequest.np_sha2grdq;
						oRequest.np_sha2gswq = !oRequest.np_sha2gswq ? [] : oRequest.np_sha2gswq;
						oRequest.np_sha2opr = !oRequest.np_sha2opr ? [] : oRequest.np_sha2opr;
						oRequest.np_sha2oph = !oRequest.np_sha2oph ? [] : oRequest.np_sha2oph;
						oRequest.np_sha2oprq = !oRequest.np_sha2oprq ? [] : oRequest.np_sha2oprq;
						oRequest.np_sha2tt = !oRequest.np_sha2tt ? [] : oRequest.np_sha2tt;
						oRequest.np_sha2ttq = !oRequest.np_sha2ttq ? [] : oRequest.np_sha2ttq;
						oRequest.np_sha2tth = !oRequest.np_sha2tth ? [] : oRequest.np_sha2tth;
						oRequest.np_sha2tti = !oRequest.np_sha2tti ? [] : oRequest.np_sha2tti;
						oRequest.np_sha2df = !oRequest.np_sha2df ? [] : oRequest.np_sha2df;
						oRequest.np_sha2dfq = !oRequest.np_sha2dfq ? [] : oRequest.np_sha2dfq;
						oRequest.np_sha2dfh = !oRequest.np_sha2dfh ? [] : oRequest.np_sha2dfh;
						oRequest.np_sha2hn = !oRequest.np_sha2hn ? [] : oRequest.np_sha2hn;
						oRequest.np_sha2wt = !oRequest.np_sha2wt ? [] : oRequest.np_sha2wt;
						oRequest.np_sha2wtq = !oRequest.np_sha2wtq ? [] : oRequest.np_sha2wtq;
						oRequest.np_sha2wth = !oRequest.np_sha2wth ? [] : oRequest.np_sha2wth;
						oRequest.np_sha2wti = !oRequest.np_sha2wti ? [] : oRequest.np_sha2wti;
						oRequest.np_sha2wtd = !oRequest.np_sha2wtd ? [] : oRequest.np_sha2wtd;
						oRequest.np_sha2wts = !oRequest.np_sha2wts ? [] : oRequest.np_sha2wts;
						oRequest.np_sha2cz = !oRequest.np_sha2cz ? [] : oRequest.np_sha2cz;
						oRequest.np_sha2czq = !oRequest.np_sha2czq ? [] : oRequest.np_sha2czq;
						oRequest.np_sha2czh = !oRequest.np_sha2czh ? [] : oRequest.np_sha2czh;
						oRequest.np_sha2czi = !oRequest.np_sha2czi ? [] : oRequest.np_sha2czi;
						oRequest.np_sha2czd = !oRequest.np_sha2czd ? [] : oRequest.np_sha2czd;
						oRequest.np_sha2uic = !oRequest.np_sha2uic ? [] : oRequest.np_sha2uic;

						var sUrl = "/shaSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.shaSet = oData;
								localData.shaSet.np_sha2bt = oData.np_sha2bt != null ? oData.np_sha2bt.results : null;
								localData.shaSet.np_sha2as = oData.np_sha2as != null ? oData.np_sha2as.results : null;
								localData.shaSet.np_sha2j = oData.np_sha2j != null ? oData.np_sha2j.results : null;
								localData.shaSet.np_sha2es = oData.np_sha2es != null ? oData.np_sha2es.results : null;
								localData.shaSet.np_sha2gs = oData.np_sha2gs != null ? oData.np_sha2gs.results : null;
								localData.shaSet.np_sha2r = oData.np_sha2r != null ? oData.np_sha2r.results : null;
								localData.shaSet.np_sha2rc = oData.np_sha2rc != null ? oData.np_sha2rc.results : null;
								localData.shaSet.np_sha2l = oData.np_sha2l != null ? oData.np_sha2l.results : null;
								localData.shaSet.np_sha2rl = oData.np_sha2rl != null ? oData.np_sha2rl.results : null;
								localData.shaSet.np_sha2pc = oData.np_sha2pc != null ? oData.np_sha2pc.results : null;
								localData.shaSet.np_sha2wka = oData.np_sha2wka != null ? oData.np_sha2wka.results : null;
								localData.shaSet.np_sha2wkq = oData.np_sha2wkq != null ? oData.np_sha2wkq.results : null;
								localData.shaSet.np_sha2grdl = oData.np_sha2grdl != null ? oData.np_sha2grdl.results : null;
								localData.shaSet.np_sha2gsw = oData.np_sha2gsw != null ? oData.np_sha2gsw.results : null;
								localData.shaSet.np_sha2rdoc = oData.np_sha2rdoc != null ? oData.np_sha2rdoc.results : null;
								localData.shaSet.np_sha2grdq = oData.np_sha2grdq != null ? oData.np_sha2grdq.results : null;
								localData.shaSet.np_sha2gswq = oData.np_sha2gswq != null ? oData.np_sha2gswq.results : null;
								localData.shaSet.np_sha2opr = oData.np_sha2opr != null ? oData.np_sha2opr.results : null;
								localData.shaSet.np_sha2oph = oData.np_sha2oph != null ? oData.np_sha2oph.results : null;
								localData.shaSet.np_sha2oprq = oData.np_sha2oprq != null ? oData.np_sha2oprq.results : null;
								localData.shaSet.np_sha2tt = oData.np_sha2tt != null ? oData.np_sha2tt.results : null;
								localData.shaSet.np_sha2ttq = oData.np_sha2ttq != null ? oData.np_sha2ttq.results : null;
								localData.shaSet.np_sha2tth = oData.np_sha2tth != null ? oData.np_sha2tth.results : null;
								localData.shaSet.np_sha2tti = oData.np_sha2tti != null ? oData.np_sha2tti.results : null;
								localData.shaSet.np_sha2df = oData.np_sha2df != null ? oData.np_sha2df.results : null;
								localData.shaSet.np_sha2dfq = oData.np_sha2dfq != null ? oData.np_sha2dfq.results : null;
								localData.shaSet.np_sha2dfh = oData.np_sha2dfh != null ? oData.np_sha2dfh.results : null;
								localData.shaSet.np_sha2hn = oData.np_sha2hn != null ? oData.np_sha2hn.results : null;
								localData.shaSet.np_sha2wt = oData.np_sha2wt != null ? oData.np_sha2wt.results : null;
								localData.shaSet.np_sha2wtq = oData.np_sha2wtq != null ? oData.np_sha2wtq.results : null;
								localData.shaSet.np_sha2wth = oData.np_sha2wth != null ? oData.np_sha2wth.results : null;
								localData.shaSet.np_sha2wti = oData.np_sha2wti != null ? oData.np_sha2wti.results : null;
								localData.shaSet.np_sha2wtd = oData.np_sha2wtd != null ? oData.np_sha2wtd.results : null;
								localData.shaSet.np_sha2wts = oData.np_sha2wts != null ? oData.np_sha2wts.results : null;
								localData.shaSet.np_sha2cz = oData.np_sha2cz != null ? oData.np_sha2cz.results : null;
								localData.shaSet.np_sha2czq = oData.np_sha2czq != null ? oData.np_sha2czq.results : null;
								localData.shaSet.np_sha2czh = oData.np_sha2czh != null ? oData.np_sha2czh.results : null;
								localData.shaSet.np_sha2czi = oData.np_sha2czi != null ? oData.np_sha2czi.results : null;
								localData.shaSet.np_sha2czd = oData.np_sha2czd != null ? oData.np_sha2czd.results : null;
								localData.shaSet.np_sha2uic = oData.np_sha2uic != null ? oData.np_sha2uic.results : oUICBackup;
								if (jQuery.isArray(localData.shaSet.np_sha2uic)) {
									localData.shaSet.np_sha2uic = formatter.convertUIC(localData.shaSet.np_sha2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/shaSet/np_sha2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};
						this._ODataModel.create(sUrl, oRequest, mParameters);

					},

					// 光伏工作票数据交互处理函数
					postPTH : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode
						this._Controller.setBusy(true);
					// 数据集
						var oPTH = this._JSONModel.getData().pthSet;
						var oRequest = this._Controller.clone(oPTH);
						oRequest.Fcode = sFCode;
					// UIC备份
						var oUICBackup = oRequest.np_pth2uic;
					// 相关行项目
						oRequest.np_pth2uic = [];
						oRequest.np_pth2f = !oRequest.np_pth2f ? [] : oRequest.np_pth2f;
						oRequest.np_pth2bpo = !oRequest.np_pth2bpo ? [] : oRequest.np_pth2bpo;
						oRequest.np_pth2da = !oRequest.np_pth2da ? [] : oRequest.np_pth2da;
						oRequest.np_pth2dac = !oRequest.np_pth2dac ? [] : oRequest.np_pth2dac;
						oRequest.np_pth2gd = !oRequest.np_pth2gd ? [] : oRequest.np_pth2gd;
						oRequest.np_pth2ap = !oRequest.np_pth2ap ? [] : oRequest.np_pth2ap;
						oRequest.np_pth2f4 = !oRequest.np_pth2f4 ? [] : oRequest.np_pth2f4;
						oRequest.np_pth2bt = !oRequest.np_pth2bt ? [] : oRequest.np_pth2bt;
						oRequest.np_pth2uic = !oRequest.np_pth2uic ? [] : oRequest.np_pth2uic;

						var sUrl = "/pthSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.pthSet = oData;
								localData.pthSet.np_pth2f = oData.np_pth2f != null ? oData.np_pth2f.results : null;
								localData.pthSet.np_pth2bpo = oData.np_pth2bpo != null ? oData.np_pth2bpo.results : null;
								localData.pthSet.np_pth2da = oData.np_pth2da != null ? oData.np_pth2da.results : null;
								localData.pthSet.np_pth2dac = oData.np_pth2dac != null ? oData.np_pth2dac.results : null;
								localData.pthSet.np_pth2gd = oData.np_pth2gd != null ? oData.np_pth2gd.results : null;
								localData.pthSet.np_pth2ap = oData.np_pth2ap != null ? oData.np_pth2ap.results : null;
								localData.pthSet.np_pth2f4 = oData.np_pth2f4 != null ? oData.np_pth2f4.results : null;
								localData.pthSet.np_pth2bt = oData.np_pth2bt != null ? oData.np_pth2bt.results : null;
								localData.pthSet.np_pth2uic = oData.np_pth2uic != null ? oData.np_pth2uic.results : oUICBackup;
								if (jQuery.isArray(localData.pthSet.np_pth2uic)) {
									localData.pthSet.np_pth2uic = formatter.convertUIC(localData.pthSet.np_pth2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/pthSet/np_pth2bt");
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

					// 日志排班数据交互处理函数
					postSHTH : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode
						this._Controller.setBusy(true);
					// 数据集
						var oSHTH = this._JSONModel.getData().shthSet;
						var oRequest = this._Controller.clone(oSHTH);
						oRequest.Fcode = sFCode;
					// 相关行项目
						oRequest.np_shth2bt = !oRequest.np_shth2bt ? [] : oRequest.np_shth2bt;
						oRequest.np_shth2sc = !oRequest.np_shth2sc ? [] : oRequest.np_shth2sc;
						oRequest.np_shth2s = !oRequest.np_shth2s ? [] : oRequest.np_shth2s;
						oRequest.np_shth2hs = !oRequest.np_shth2hs ? [] : oRequest.np_shth2hs;

						var sUrl = "/shthSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.shthSet = oData;
								localData.shthSet.np_shth2sc = oData.np_shth2sc != null ? oData.np_shth2sc.results : null;
								localData.shthSet.np_shth2s = oData.np_shth2s != null ? oData.np_shth2s.results : null;
								localData.shthSet.np_shth2hs = oData.np_shth2hs != null ? oData.np_shth2hs.results : null;
								localData.shthSet.np_shth2bt = oData.np_shth2bt != null ? oData.np_shth2bt.results : null;
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/shthSet/np_shth2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};
						this._ODataModel.create(sUrl, oRequest, mParameters);

					},

					// 定期工作计划数据交互处理函数
					postWCP : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 数据集
						this._Controller.setBusy(true);
					// 数据集
						var oWCP = this._JSONModel.getData().wcpSet;
						var oRequest = this._Controller.clone(oWCP);
						oRequest.Fcode = sFCode;
					// 相关行项目
						oRequest.np_wcp2kd = !oRequest.np_wcp2kd ? [] : oRequest.np_wcp2kd;
						oRequest.np_wcp2hs = !oRequest.np_wcp2hs ? [] : oRequest.np_wcp2hs;
						oRequest.np_wcp2bt = !oRequest.np_wcp2bt ? [] : oRequest.np_wcp2bt;
						oRequest.np_wcp2sl = !oRequest.np_wcp2sl ? [] : oRequest.np_wcp2sl;

						var sUrl = "/wcpSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.wcpSet = oData;
								localData.wcpSet.np_wcp2bt = oData.np_wcp2bt != null ? oData.np_wcp2bt.results : null;
								localData.wcpSet.np_wcp2kd = oData.np_wcp2kd != null ? oData.np_wcp2kd.results : null;
								localData.wcpSet.np_wcp2hs = oData.np_wcp2hs != null ? oData.np_wcp2hs.results : null;
								localData.wcpSet.np_wcp2sl = oData.np_wcp2sl != null ? oData.np_wcp2sl.results : null;
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/wcpSet/np_wcp2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};
						this._ODataModel.create(sUrl, oRequest, mParameters);

					},

					// 定期工作任务数据交互处理函数
					postWCPA : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode
						this._Controller.setBusy(true);
					// 数据集
						var oWCPA = this._JSONModel.getData().wcpaSet;
						var oRequest = this._Controller.clone(oWCPA);
						oRequest.Fcode = sFCode;
					// 相关行项目
						oRequest.np_wcpa2bt = !oRequest.np_sha2bt ? [] : oRequest.np_sha2bt;
						oRequest.np_wcpa2hs = !oRequest.np_wcpa2hs ? [] : oRequest.np_wcpa2hs;
						oRequest.np_wcpa2sl = !oRequest.np_wcpa2sl ? [] : oRequest.np_wcpa2sl;
						oRequest.np_wcpa2opr = !oRequest.np_wcpa2opr ? [] : oRequest.np_wcpa2opr;

						var sUrl = "/wcpaSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.wcpaSet = oData;
								localData.wcpaSet.np_wcpa2bt = oData.np_wcpa2bt != null ? oData.np_wcpa2bt.results : null;
								localData.wcpaSet.np_wcpa2hs = oData.np_wcpa2hs != null ? oData.np_wcpa2hs.results : null;
								localData.wcpaSet.np_wcpa2sl = oData.np_wcpa2sl != null ? oData.np_wcpa2sl.results : null;
								localData.wcpaSet.np_wcpa2opr = oData.np_wcpa2opr != null ? oData.np_wcpa2opr.results : null;
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/wcpaSet/np_wcpa2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};
						this._ODataModel.create(sUrl, oRequest, mParameters);

					},

					// 维修作业许可数据交互处理函数
					postMTPM : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode
						this._Controller.setBusy(true);
					// 数据集
						var oMTPMH = this._JSONModel.getData().mtpmhSet;
						var oRequest = this._Controller.clone(oMTPMH);
						oRequest.Fcode = sFCode;
					// UIC备份
						var oUICBackup = oRequest.np_mtpmh2uic;
					// 相关行项目
						oRequest.np_mtpmh2uic = [];
						oRequest.np_mtpmh2bt = !oRequest.np_mtpmh2bt ? [] : oRequest.np_mtpmh2bt;
						oRequest.np_mtpmh2ptf = !oRequest.np_mtpmh2ptf ? [] : oRequest.np_mtpmh2ptf;
						oRequest.np_mtpmh2da = !oRequest.np_mtpmh2da ? [] : oRequest.np_mtpmh2da;
						oRequest.np_mtpmh2da2 = !oRequest.np_mtpmh2da2 ? [] : oRequest.np_mtpmh2da2;
						var sUrl = "/mtpmhSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.mtpmhSet = oData;
								localData.mtpmhSet.np_mtpmh2da = oData.np_mtpmh2da != null ? oData.np_mtpmh2da.results : null;
								localData.mtpmhSet.np_mtpmh2da2 = oData.np_mtpmh2da2 != null ? oData.np_mtpmh2da2.results : null;
								localData.mtpmhSet.np_mtpmh2ptf = oData.np_mtpmh2ptf != null ? oData.np_mtpmh2ptf.results : null;
								localData.mtpmhSet.np_mtpmh2bt = oData.np_mtpmh2bt != null ? oData.np_mtpmh2bt.results : null;
								localData.mtpmhSet.np_mtpmh2uic = oData.np_mtpmh2uic != null ? oData.np_mtpmh2uic.results : oUICBackup;
								if (jQuery.isArray(localData.mtpmhSet.np_mtpmh2uic)) {
									localData.mtpmhSet.np_mtpmh2uic = formatter.convertUIC(localData.mtpmhSet.np_mtpmh2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/mtpmhSet/np_mtpmh2bt");
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

					// 工作票报表数据交互处理函数
					postTKH : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode

						this._Controller.setBusy(true);
					// 数据集
						var oTKH = this._JSONModel.getData().tkhSet;
						var oRequest = this._Controller.clone(oTKH);
						oRequest.Fcode = sFCode;
					// UIC备份
						var oUICBackup = oRequest.np_tkh2uic;
					// 相关行项目
						oRequest.np_tkh2uic = [];
						oRequest.np_tkh2la = !oRequest.np_tkh2la ? [] : oRequest.np_tkh2la;
						oRequest.np_tkh2q = !oRequest.np_tkh2q ? [] : oRequest.np_tkh2q;
						oRequest.np_tkh2bt = !oRequest.np_tkh2bt ? [] : oRequest.np_tkh2bt;

						var sUrl = "/tkhSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.tkhSet = oData;
								localData.tkhSet.np_tkh2la = oData.np_tkh2la != null ? oData.np_tkh2la.results : null;
								localData.tkhSet.np_tkh2q = oData.np_tkh2q != null ? oData.np_tkh2q.results : null;
								localData.tkhSet.np_tkh2bt = oData.np_tkh2bt != null ? oData.np_tkh2bt.results : null;
								localData.tkhSet.np_tkh2uic = oData.np_tkh2uic != null ? oData.np_tkh2uic.results : oUICBackup;
								if (jQuery.isArray(localData.tkhSet.np_tkh2uic)) {
									localData.tkhSet.np_tkh2uic = formatter.convertUIC(localData.tkhSet.np_tkh2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/bjhSet/np_tkh2bt");
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

					// 运行通知数据交互处理函数
					postOPH : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode
						this._Controller.setBusy(true);
					// 数据集
						var oOPH = this._JSONModel.getData().ophSet;
						var oRequest = this._Controller.clone(oOPH);
						oRequest.Fcode = sFCode;
					// UIC备份
						var oUICBackup = oRequest.np_oph2uic;
					// 相关行项目
						oRequest.np_oph2uic = [];
						oRequest.np_oph2hs = !oRequest.np_oph2hs ? [] : oRequest.np_oph2hs;
						oRequest.np_oph2c = !oRequest.np_oph2c ? [] : oRequest.np_oph2c;
						oRequest.np_oph2g = !oRequest.np_oph2g ? [] : oRequest.np_oph2g;
						oRequest.np_oph2s = !oRequest.np_oph2s ? [] : oRequest.np_oph2s;
						oRequest.np_oph2o = !oRequest.np_oph2o ? [] : oRequest.np_oph2o;
						oRequest.np_oph2bt = !oRequest.np_oph2bt ? [] : oRequest.np_oph2bt;

						var sUrl = "/ophSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.ophSet = oData;
								localData.ophSet.np_oph2hs = oData.np_oph2hs != null ? oData.np_oph2hs.results : null;
								localData.ophSet.np_oph2c = oData.np_oph2c != null ? oData.np_oph2c.results : null;
								localData.ophSet.np_oph2g = oData.np_oph2g != null ? oData.np_oph2g.results : null;
								localData.ophSet.np_oph2s = oData.np_oph2s != null ? oData.np_oph2s.results : null;
								localData.ophSet.np_oph2o = oData.np_oph2o != null ? oData.np_oph2o.results : null;
								localData.ophSet.np_oph2bt = oData.np_oph2bt != null ? oData.np_oph2bt.results : null;
								localData.ophSet.np_oph2uic = oData.np_oph2uic != null ? oData.np_oph2uic.results : oUICBackup;
								if (jQuery.isArray(localData.ophSet.np_oph2uic)) {
									localData.ophSet.np_oph2uic = formatter.convertUIC(localData.ophSet.np_oph2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/ophSet/np_oph2bt");
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

					// 保护投退功能增强数据交互处理函数
					postTTN : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode

						this._Controller.setBusy(true);
					// 数据集
						var oTTN = this._JSONModel.getData().ttnSet;
						var oRequest = this._Controller.clone(oTTN);
						oRequest.Fcode = sFCode;
					// UIC备份
						var oUICBackup = oRequest.np_ttn2uic;
					// 相关行项目
						oRequest.np_ttn2uic = [];
						oRequest.np_ttn2bt = !oRequest.np_ttn2bt ? [] : oRequest.np_ttn2bt;
						oRequest.np_ttn2ta = !oRequest.np_ttn2ta ? [] : oRequest.np_ttn2ta;
						oRequest.np_ttn2s = !oRequest.np_ttn2s ? [] : oRequest.np_ttn2s;
						oRequest.np_ttn2a = !oRequest.np_ttn2a ? [] : oRequest.np_ttn2a;
						oRequest.np_ttn2t = !oRequest.np_ttn2t ? [] : oRequest.np_ttn2t;

						var sUrl = "/ttnSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.ttnSet = oData;
								localData.ttnSet.np_ttn2bt = oData.np_ttn2bt != null ? oData.np_ttn2bt.results : null;
								localData.ttnSet.np_ttn2ta = oData.np_ttn2ta != null ? oData.np_ttn2ta.results : null;
								localData.ttnSet.np_ttn2s = oData.np_ttn2s != null ? oData.np_ttn2s.results : null;
								localData.ttnSet.np_ttn2a = oData.np_ttn2a != null ? oData.np_ttn2a.results : null;
								localData.ttnSet.np_ttn2t = oData.np_ttn2t != null ? oData.np_ttn2t.results : null;
								localData.ttnSet.np_ttn2uic = oData.np_ttn2uic != null ? oData.np_ttn2uic.results : oUICBackup;
								if (jQuery.isArray(localData.ttnSet.np_ttn2uic)) {
									localData.ttnSet.np_ttn2uic = formatter.convertUIC(localData.ttnSet.np_ttn2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/ttnSet/np_ttn2bt");
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
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");//公用属性fcode

						this._Controller.setBusy(true);
					// 数据集
						var oDF = this._JSONModel.getData().dfSet;
						var oRequest = this._Controller.clone(oDF);
						oRequest.Fcode = sFCode;
					// UIC备份
						var oUICBackup = oRequest.np_df2uic;
					// 相关行项目
						oRequest.np_df2uic = [];
						oRequest.np_df2bt = !oRequest.np_df2bt ? [] : oRequest.np_df2bt;
						oRequest.np_df2dfs = !oRequest.np_df2dfs ? [] : oRequest.np_df2dfs;

						var sUrl = "/dfSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.dfSet = oData;
								localData.dfSet.np_df2dfs = oData.np_df2dfs != null ? oData.np_df2dfs.results : null;
								localData.dfSet.np_df2bt = oData.np_df2bt != null ? oData.np_df2bt.results : null;
								localData.dfSet.np_df2uic = oData.np_df2uic != null ? oData.np_df2uic.results : oUICBackup;
								if (jQuery.isArray(localData.dfSet.np_df2uic)) {
									localData.dfSet.np_df2uic = formatter.convertUIC(localData.dfSet.np_df2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/dfSet/np_df2bt");
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

					// 临时用电数据交互处理函数
					postTEA : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 数据集
						var oTE = this._JSONModel.getData().teahSet;
						var oRequest = this._Controller.clone(oTE);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_teah2uic;
						// 相关行项目
						oRequest.np_teah2uic = [];
						oRequest.np_teah2bt = !oRequest.np_teah2bt ? [] : oRequest.np_teah2bt;
						oRequest.np_teah2i = !oRequest.np_teah2i ? [] : oRequest.np_teah2i;

						var sUrl = "/teahSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.teahSet = oData;
								localData.teahSet.np_teah2i = oData.np_teah2i != null ? oData.np_teah2i.results : null;
								localData.teahSet.np_teah2bt = oData.np_teah2bt != null ? oData.np_teah2bt.results : null;
								localData.teahSet.np_teah2uic = oData.np_teah2uic != null ? oData.np_teah2uic.results : oUICBackup;
								if (jQuery.isArray(localData.teahSet.np_teah2uic)) {
									localData.teahSet.np_teah2uic = formatter.convertUIC(localData.teahSet.np_teah2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/teahSet/np_teah2bt");
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

					// 操作票数据交互处理函数
					postOPT : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 数据集
						var oOPT = this._JSONModel.getData().opthSet;
						var oRequest = this._Controller.clone(oOPT);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_opth2uic;
						// 相关行项目
						oRequest.np_opth2uic = [];
						oRequest.np_opth2bt = !oRequest.np_opth2bt ? [] : oRequest.np_opth2bt;
						oRequest.np_opth2da = !oRequest.np_opth2da ? [] : oRequest.np_opth2da;
						oRequest.np_opth2s = !oRequest.np_opth2s ? [] : oRequest.np_opth2s;
						oRequest.np_opth2ro = !oRequest.np_opth2ro ? [] : oRequest.np_opth2ro;
						oRequest.np_opth2i = !oRequest.np_opth2i ? [] : oRequest.np_opth2i;
						oRequest.np_opth2st = !oRequest.np_opth2st ? [] : oRequest.np_opth2st;
						oRequest.np_opth2a = !oRequest.np_opth2a ? [] : oRequest.np_opth2a;
						oRequest.np_opth2t = !oRequest.np_opth2t ? [] : oRequest.np_opth2t;

						var sUrl = "/opthSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.opthSet = oData;
								localData.opthSet.np_opth2i = oData.np_opth2i != null ? oData.np_opth2i.results : null;
								localData.opthSet.np_opth2bt = oData.np_opth2bt != null ? oData.np_opth2bt.results : null;
								localData.opthSet.np_opth2s = oData.np_opth2s != null ? oData.np_opth2s.results : null;
								localData.opthSet.np_opth2ro = oData.np_opth2ro != null ? oData.np_opth2ro.results : null;
								localData.opthSet.np_opth2da = oData.np_opth2da != null ? oData.np_opth2da.results : null;
								localData.opthSet.np_opth2st = oData.np_opth2st != null ? oData.np_opth2st.results : null;
								localData.opthSet.np_opth2a = oData.np_opth2a != null ? oData.np_opth2a.results : null;
								localData.opthSet.np_opth2t = oData.np_opth2t != null ? oData.np_opth2t.results : null;
								localData.opthSet.np_opth2uic = oData.np_opth2uic != null ? oData.np_opth2uic.results : oUICBackup;
								if (jQuery.isArray(localData.opthSet.np_opth2uic)) {
									localData.opthSet.np_opth2uic = formatter.convertUIC(localData.opthSet.np_opth2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/opthSet/np_opth2bt");
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

					// 设备试运行数据交互处理函数
					postTR : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 数据集
						var oTR = this._JSONModel.getData().trSet;
						var oRequest = this._Controller.clone(oTR);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_tr2uic;
						// 相关行项目
						oRequest.np_tr2uic = [];
						oRequest.np_tr2bt = !oRequest.np_tr2bt ? [] : oRequest.np_tr2bt;
						oRequest.np_tr2c = !oRequest.np_tr2c ? [] : oRequest.np_tr2c;
						oRequest.np_tr2s = !oRequest.np_tr2s ? [] : oRequest.np_tr2s;
						oRequest.np_tr2d = !oRequest.np_tr2d ? [] : oRequest.np_tr2d;

						var sUrl = "/trSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.trSet = oData;
								localData.trSet.np_tr2bt = oData.np_tr2bt != null ? oData.np_tr2bt.results : null;
								localData.trSet.np_tr2uic = oData.np_tr2uic != null ? oData.np_tr2uic.results : oUICBackup;
								localData.trSet.np_tr2c = oData.np_tr2c != null ? oData.np_tr2c.results : null;
								localData.trSet.np_tr2s = oData.np_tr2s != null ? oData.np_tr2s.results : null;
								localData.trSet.np_tr2d = oData.np_tr2d != null ? oData.np_tr2d.results : null;
								if (jQuery.isArray(localData.trSet.np_tr2uic)) {
									localData.trSet.np_tr2uic = formatter.convertUIC(localData.trSet.np_tr2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/trSet/np_tr2bt");
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

					// 巡更管理数据交互处理函数
					postXG : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 数据集
						var oXG = this._JSONModel.getData().xgSet;
						var oRequest = this._Controller.clone(oXG);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_xg2uic;
						// 相关行项目
						oRequest.np_xg2uic = [];
						oRequest.np_xg2i = !oRequest.np_xg2i ? [] : oRequest.np_xg2i;
						oRequest.np_xg2bt = !oRequest.np_xg2bt ? [] : oRequest.np_xg2bt;
						oRequest.np_xg2bc = !oRequest.np_xg2bc ? [] : oRequest.np_xg2bc;
						oRequest.np_xg2rw = !oRequest.np_xg2rw ? [] : oRequest.np_xg2rw;

						var sUrl = "/xgSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.xgSet = oData;
								localData.xgSet.np_xg2i = oData.np_xg2i != null ? oData.np_xg2i.results : null;
								localData.xgSet.np_xg2bt = oData.np_xg2bt != null ? oData.np_xg2bt.results : null;
								localData.xgSet.np_xg2bc = oData.np_xg2bc != null ? oData.np_xg2bc.results : null;
								localData.xgSet.np_xg2rw = oData.np_xg2rw != null ? oData.np_xg2rw.results : null;
								localData.xgSet.np_xg2uic = oData.np_xg2uic != null ? oData.np_xg2uic.results : oUICBackup;
								if (jQuery.isArray(localData.xgSet.np_xg2uic)) {
									localData.xgSet.np_xg2uic = formatter.convertUIC(localData.xgSet.np_xg2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/xgSet/np_xg2bt");
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

					// 临时用水、压缩空气申请单数据交互处理函数
					postTW : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 数据集
						var oTW = this._JSONModel.getData().tuwaSet;
						var oRequest = this._Controller.clone(oTW);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_tuwa2uic;
						// 相关行项目
						oRequest.np_tuwa2uic = [];
						oRequest.np_tuwa2bt = !oRequest.np_tuwa2bt ? [] : oRequest.np_tuwa2bt;
						oRequest.np_tuwa2it = !oRequest.np_tuwa2it ? [] : oRequest.np_tuwa2it;

						var sUrl = "/tuwaSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.tuwaSet = oData;
								localData.tuwaSet.np_tuwa2bt = oData.np_tuwa2bt != null ? oData.np_tuwa2bt.results : null;
								localData.tuwaSet.np_tuwa2it = oData.np_tuwa2it != null ? oData.np_tuwa2it.results : null;
								localData.tuwaSet.np_tuwa2uic = oData.np_tuwa2uic != null ? oData.np_tuwa2uic.results : oUICBackup;
								if (jQuery.isArray(localData.tuwaSet.np_tuwa2uic)) {
									localData.tuwaSet.np_tuwa2uic = formatter.convertUIC(localData.tuwaSet.np_tuwa2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/tuwaSet/np_tuwa2bt");
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

					// 设备停复役数据交互处理函数
					postTF : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 数据集
						var oTF = this._JSONModel.getData().tfSet;
						var oRequest = this._Controller.clone(oTF);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_tf2uic;
						// 相关行项目
						oRequest.np_tf2uic = [];
						oRequest.np_tf2bt = !oRequest.np_tf2bt ? [] : oRequest.np_tf2bt;
						oRequest.np_tf2s = !oRequest.np_tf2s ? [] : oRequest.np_tf2s;
						oRequest.np_tf2a = !oRequest.np_tf2a ? [] : oRequest.np_tf2a;
						oRequest.np_tf2t = !oRequest.np_tf2t ? [] : oRequest.np_tf2t;


						var sUrl = "/tfSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.tfSet = oData;
								localData.tfSet.np_tf2bt = oData.np_tf2bt != null ? oData.np_tf2bt.results : null;
								localData.tfSet.np_tf2uic = oData.np_tf2uic != null ? oData.np_tf2uic.results : oUICBackup;
								localData.tfSet.np_tf2s = oData.np_tf2s != null ? oData.np_tf2s.results : null;
								localData.tfSet.np_tf2a = oData.np_tf2a != null ? oData.np_tf2a.results : null;
								localData.tfSet.np_tf2t = oData.np_tf2t != null ? oData.np_tf2t.results : null;
								if (jQuery.isArray(localData.tfSet.np_tf2uic)) {
									localData.tfSet.np_tf2uic = formatter.convertUIC(localData.tfSet.np_tf2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/tfSet/np_tf2bt");
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

					// 停送电联系单数据交互处理函数
					postSCN : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 数据集
						var oSC = this._JSONModel.getData().scnSet;
						var oRequest = this._Controller.clone(oSC);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_scn2uic;
						oRequest.np_scn2uic = [];
						// 相关行项目
						oRequest.np_scn2bt = !oRequest.np_scn2bt ? [] : oRequest.np_scn2bt;
						oRequest.np_scn2it = !oRequest.np_scn2it ? [] : oRequest.np_scn2it;

						var sUrl = "/scnSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.scnSet = oData;
								localData.scnSet.np_scn2bt = oData.np_scn2bt != null ? oData.np_scn2bt.results : null;
								localData.scnSet.np_scn2it = oData.np_scn2it != null ? oData.np_scn2it.results : null;
								localData.scnSet.np_scn2uic = oData.np_scn2uic != null ? oData.np_scn2uic.results : oUICBackup;
								if (jQuery.isArray(localData.scnSet.np_scn2uic)) {
									localData.scnSet.np_scn2uic = formatter.convertUIC(localData.scnSet.np_scn2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/scnSet/np_scn2bt");
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

					// 操作票查询报表数据交互处理函数
					postOPQ : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 数据集
						var oOPQ = this._JSONModel.getData().opqSet;
						var oRequest = this._Controller.clone(oOPQ);
						oRequest.Fcode = sFCode;
						// 相关行项目
						oRequest.np_opq2bt = !oRequest.np_opq2bt ? [] : oRequest.np_opq2bt;
						oRequest.np_opq2r = !oRequest.np_opq2r ? [] : oRequest.np_opq2r;

						var sUrl = "/opqSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.opqSet = oData;
								localData.opqSet.np_opq2bt = oData.np_opq2bt != null ? oData.np_opq2bt.results : null;
								localData.opqSet.np_opq2r = oData.np_opq2r != null ? oData.np_opq2r.results : null;

								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/opqSet/np_opq2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};
						this._ODataModel.create(sUrl, oRequest, mParameters);
					},

					// 操作票状态报告数据交互处理函数
					postOPSR : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 数据集
						var oOPSR = this._JSONModel.getData().opsrSet;
						var oRequest = this._Controller.clone(oOPSR);
						oRequest.Fcode = sFCode;
						// 相关行项目
						oRequest.np_opsr2bt = !oRequest.np_opsr2bt ? [] : oRequest.np_opsr2bt;
						oRequest.np_opsr2s = !oRequest.np_opsr2s ? [] : oRequest.np_opsr2s;
						oRequest.np_opsr2l = !oRequest.np_opsr2l ? [] : oRequest.np_opsr2l;

						var sUrl = "/opsrSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.opsrSet = oData;
								localData.opsrSet.np_opsr2bt = oData.np_opsr2bt != null ? oData.np_opsr2bt.results : null;
								localData.opsrSet.np_opsr2s = oData.np_opsr2s != null ? oData.np_opsr2s.results : null;
								localData.opsrSet.np_opsr2l = oData.np_opsr2l != null ? oData.np_opsr2l.results : null;
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/opsrSet/np_opsr2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};
						this._ODataModel.create(sUrl, oRequest, mParameters);
					},

					// 功能位置数据交互处理函数
					postFL : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 功能位置数据集
						var oFL = this._JSONModel.getData().flSet;
						var oRequest = this._Controller.clone(oFL);
						oRequest.Fcode = sFCode;
						// 相关行项目
						oRequest.np_fl2bt = !oRequest.np_fl2bt ? [] : oRequest.np_fl2bt;
						oRequest.np_fl2rf = !oRequest.np_fl2rf ? [] : oRequest.np_fl2rf;
						oRequest.np_fl2pf = !oRequest.np_fl2pf ? [] : oRequest.np_fl2pf;
						oRequest.np_fl2re = !oRequest.np_fl2re ? [] : oRequest.np_fl2re;

						var sUrl = "/flSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.flSet = oData;
								localData.flSet.np_fl2bt = oData.np_fl2bt != null ? oData.np_fl2bt.results : null;
								localData.flSet.np_fl2rf = oData.np_fl2rf != null ? oData.np_fl2rf.results : null;
								localData.flSet.np_fl2pf = oData.np_fl2pf != null ? oData.np_fl2pf.results : null;
								localData.flSet.np_fl2re = oData.np_fl2re != null ? oData.np_fl2re.results : null;
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/flSet/np_fl2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};
						this._JSONModel.setProperty("/flSet/np_fl2re",null,false);
						this._ODataModel.create(sUrl, oRequest, mParameters);
					},

					// 备件需求提报报表数据交互处理函数
					postSP : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 功能位置数据集
						var oSP = this._JSONModel.getData().spSet;
						var oRequest = this._Controller.clone(oSP);
						oRequest.Fcode = sFCode;
						// 相关行项目
						oRequest.np_sp2bt = !oRequest.np_sp2bt ? [] : oRequest.np_sp2bt;
						oRequest.np_sp2i = !oRequest.np_sp2i ? [] : oRequest.np_sp2i;
						
						var sUrl = "/spSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.spSet = oData;
								localData.spSet.np_sp2bt = oData.np_sp2bt != null ? oData.np_sp2bt.results : null;
								localData.spSet.np_sp2i = oData.np_sp2i != null ? oData.np_sp2i.results : null;
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/spSet/np_sp2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};
						this._ODataModel.create(sUrl, oRequest, mParameters);
					},

				// 试运转单报表数据交互处理函数
					postRR : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 功能位置数据集
						var oRR = this._JSONModel.getData().rrSet;
						var oRequest = this._Controller.clone(oRR);
						oRequest.Fcode = sFCode;
						// 相关行项目
						oRequest.np_rr2bt = !oRequest.np_rr2bt ? [] : oRequest.np_rr2bt;
						oRequest.np_rr2rl = !oRequest.np_rr2rl ? [] : oRequest.np_rr2rl;
						
						var sUrl = "/rrSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.rrSet = oData;
								localData.rrSet.np_rr2bt = oData.np_rr2bt != null ? oData.np_rr2bt.results : null;
								localData.rrSet.np_rr2rl = oData.np_rr2rl != null ? oData.np_rr2rl.results : null;
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/rrSet/np_rr2bt");
								this._Controller.setBusy(false);
								if (fnSuccess) {
									fnSuccess(this._Controller);
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								this._Controller.oError = oError;
								messages.convertODataErrorMessage(this._Controller);
								if (fnError) {
									fnError(this._Controller);
								}
							}.bind(this)
						};
						this._ODataModel.create(sUrl, oRequest, mParameters);
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

						sName = sName + "Set";
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

					},

					// 综合报表查询数据交互处理函数
					postQM : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");

						this._Controller.setBusy(true);
						// 综合报表数据集
						var oQM = this._JSONModel.getData().qmSet;
						var oRequest = this._Controller.clone(oQM);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_qm2uic;
						// 相关行项目
						oRequest.np_qm2uic = [];
						oRequest.np_qm2bt = !oRequest.np_qm2bt ? [] : oRequest.np_qm2bt;
						oRequest.np_qm2df = !oRequest.np_qm2df ? [] : oRequest.np_qm2df;
						oRequest.np_qm2dh = !oRequest.np_qm2dh ? [] : oRequest.np_qm2dh;
						oRequest.np_qm2yd = !oRequest.np_qm2yd ? [] : oRequest.np_qm2yd;
						oRequest.np_qm2tf = !oRequest.np_qm2tf ? [] : oRequest.np_qm2tf;
						oRequest.np_qm2tn = !oRequest.np_qm2tn ? [] : oRequest.np_qm2tn;

						var sUrl = "/qmSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.qmSet = oData;
								localData.qmSet.np_qm2df = oData.np_qm2df != null ? oData.np_qm2df.results : null;
								localData.qmSet.np_qm2dh = oData.np_qm2dh != null ? oData.np_qm2dh.results : null;
								localData.qmSet.np_qm2yd = oData.np_qm2yd != null ? oData.np_qm2yd.results : null;
								localData.qmSet.np_qm2tf = oData.np_qm2tf != null ? oData.np_qm2tf.results : null;
								localData.qmSet.np_qm2tn = oData.np_qm2tn != null ? oData.np_qm2tn.results : null;
								localData.qmSet.np_qm2bt = oData.np_qm2bt != null ? oData.np_qm2bt.results : null;
								localData.qmSet.np_qm2uic = oData.np_qm2uic != null ? oData.np_qm2uic.results : oUICBackup;

								if (jQuery.isArray(localData.qmSet.np_qm2uic)) {
									localData.qmSet.np_qm2uic = formatter.convertUIC(localData.qmSet.np_qm2uic);
								}
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/qmSet/np_qm2bt");
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

					// 异动通知单数据交互处理函数
					postYD : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 异动数据集
						var oYD = this._JSONModel.getData().ydSet;
						var oRequest = this._Controller.clone(oYD);
						oRequest.Fcode = sFCode;
						// UIC备份
						var oUICBackup = oRequest.np_yd2uic;
						// 相关行项目
						oRequest.np_yd2uic = [];
						oRequest.np_yd2bt = !oRequest.np_yd2bt ? [] : oRequest.np_yd2bt;
						oRequest.np_yd2s = !oRequest.np_yd2s ? [] : oRequest.np_yd2s;
						oRequest.np_yd2a = !oRequest.np_yd2a ? [] : oRequest.np_yd2a;
						oRequest.np_yd2t = !oRequest.np_yd2t ? [] : oRequest.np_yd2t;

						var sUrl = "/ydSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.ydSet = oData;
								localData.ydSet.np_yd2bt = oData.np_yd2bt != null ? oData.np_yd2bt.results : null;
								localData.ydSet.np_yd2s = oData.np_yd2s != null ? oData.np_yd2s.results : null;
								localData.ydSet.np_yd2a = oData.np_yd2a != null ? oData.np_yd2a.results : null;
								localData.ydSet.np_yd2t = oData.np_yd2t != null ? oData.np_yd2t.results : null;
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

					// 值班管理数据交互处理函数
					postDT : function(oView, fnSuccess, fnError) {

						this._Controller = oView.getController();
						this._ODataModel = this._Controller.getModel("OData");
						this._JSONModel = this._Controller.getModel();
						var sFCode = this._JSONModel.getProperty("/appProperties/fcode");// 公用属性fcode

						this._Controller.setBusy(true);
						// 值班管理数据集
						var oDT = this._JSONModel.getData().dtSet;
						var oRequest = this._Controller.clone(oDT);
						oRequest.Fcode = sFCode;
						// 相关行项目
						oRequest.np_dt2di = !oRequest.np_dt2di ? [] : oRequest.np_dt2di;
						oRequest.np_dt2bt = !oRequest.np_dt2bt ? [] : oRequest.np_dt2bt;

						var sUrl = "/dtSet";
						var mParameters = {
							success : function(oData, response) {
								var localData = this._JSONModel.getData();
								localData.dtSet = oData;
								localData.dtSet.np_dt2bt = oData.np_dt2bt != null ? oData.np_dt2bt.results : null;
								localData.dtSet.np_dt2di = oData.np_dt2di != null ? oData.np_dt2di.results : null;
								this._JSONModel.setProperty("/", localData, false);
								messages.convertMessage(this, "/dtSet/np_dt2bt");
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

					// 附件上传数据交互处理函数
					postAttachment : function(oView, fnSuccess, fnError) {
						this._Controller = oView.getController();
						this._JSONModel = this._Controller.getModel();
						this._ResourceBundle = this._Controller.getModel("i18n").getResourceBundle();

						// this.setBusy(true);

						if (this.atODataModel == undefined) {
							this.atODataModel = models.createODataModel({
								urlParametersForEveryRequest : [
										"sap-server",
										"sap-client",
										"sap-language"
								],
								url : "/sap/opu/odata/sap/ZXXFILE01_SRV/",
								config : {
									// metadataUrlParams: {
									// "sap-documentation": "heading"
									// },
									// defaultBindingMode: "OneWay",
									useBatch : false,
									defaultCountMode : "None",
									// loadMetadataAsync: true,
									json : true
								}
							});
						}

						var oRequest = this._JSONModel.getData().filelistSet;

						for ( var o in oRequest) {
							if (oRequest[o] == null) {
								oRequest[o] = [];
							}
						}

						if (oRequest.np_filelist2h.length == 0) {
							var np_attah = {
								Docid : "",
								Filename : "",
								Mimetype : "",
								Url : "",
								np_attah2a : []
							};
							oRequest.np_filelist2h.push(np_attah);
						}

						this._Controller.setBusy(true);

						var sUrl = "/filelistSet";
						var mParameters = {
							success : function(oData, response) {
								this._Controller.setBusy(false);
								var localData = this._JSONModel.getData();
								localData.filelistSet = oData;
								localData.filelistSet.np_filelist2bt = oData.np_filelist2bt != null ? oData.np_filelist2bt.results : null;
								localData.filelistSet.np_filelist2h = oData.np_filelist2h != null ? oData.np_filelist2h.results : null;
								if (localData.filelistSet.np_filelist2h != null) {
									for (var i = 0; i < localData.filelistSet.np_filelist2h.length; i++) {
										localData.filelistSet.np_filelist2h[i].np_attah2a = localData.filelistSet.np_filelist2h[i].np_attah2a != null ? localData.filelistSet.np_filelist2h[i].np_attah2a.results : null;
									}
								}
								this._JSONModel.setProperty("/", localData, false);

								if (oRequest.Fcode == "DELETE") {
									messages.showText(this._ResourceBundle.getText("fileDel.Ok"));
								}
							}.bind(this),
							error : function(oError) {
								this._Controller.setBusy(false);
								if (oRequest.Fcode == "DELETE") {
									messages.showText(this._ResourceBundle.getText("fileDel.Error"));
								}
								this._JSONModel.setProperty("/filelistSet/Fcode", "SELECT");
								this.postAttachment(oView);

							}.bind(this)
						};
						this.atODataModel.create(sUrl, oRequest, mParameters);
					},
				};
			});