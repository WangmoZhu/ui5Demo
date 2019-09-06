sap.ui.define([
	"sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
	'util/app',
	'sap/vo/mengniu/controller/blocks/CustomerFormat'
], function (BlockContentBase, appUtil, CustomerFormat) {
	"use strict";
	var that;
	return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.KPIDetail", {
		onInit: function () {
			this.initCustomFormat();
			this.chartSelected = [];
			that = this;

			var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.vo.mengniu", "/json/MockData.json"));
			this.getView().setModel(oModel);
			this.oSF = that.getView().byId("SearchBtn");

			var oModelKPIFilter = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.vo.mengniu", "/json/KPIFilter.json"));
			this.getView().setModel(oModelKPIFilter, "KPIFilter");

			var oModelKPIPlant = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.vo.mengniu", "/json/KPIPlant.json"));
			oModelKPIPlant.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			this.getView().setModel(oModelKPIPlant, "KPIPlant");

			/*var oModelKPIConfig = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.vo.mengniu", "/json/KPIConfig.json"));
			// oModelKPIConfig.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			this.getView().setModel(oModelKPIConfig, "oModelKPIConfig");*/

			if (window.location.hash.indexOf("SPC") > 0 && this.getView().byId("NavButton") !== undefined) {
				this.getView().byId("NavButton").setVisible(false);
			} else if (window.location.hash.indexOf("singleView") > 0 && this.getView().byId("NavButton") !== undefined) {
				this.getView().byId("NavButton").setVisible(false);
			} else if (window.location.hash.indexOf("SPC") < 0 && this.getView().byId("NavButton") !== undefined) {
				this.getView().byId("NavButton").setVisible(true);
				/*}else if(window.location.hash === "" && this.getView().sViewName.indexOf("KPIDetail") > 0){
					this.getView().setVisible(false);
				}else if(this.getView().sViewName.indexOf("KPI") > 0 && this.getView().sViewName.indexOf("KPIDetail") < 0){
				  this.getView().setVisible(true);*/
			}
			/*var oPage1 = this.getView().getContent()[0];
			var oPage2 = this.getView().getContent()[1];
			oPage1.setVisible(true);
			oPage2.setVisible(false);*/

			var oModelKPI = sap.ui.getCore().getModel("KPI");
			var KPItext;
			if (oModelKPI !== undefined) {
				KPItext = oModelKPI.getData().KPI;
				oModelKPI.setData({
					"KPI": ""
				});
			}
			setTimeout(function () {
				var oModelMonth = that.getView().getModel();
				that.oDataAll = oModelMonth.getData().Small;
				that.oDataNormal = oModelMonth.getData().normal;
				that.oDataIce = oModelMonth.getData().ice;
				that.oDataMilk = oModelMonth.getData().milk;
				that.oDataLow = oModelMonth.getData().low;

				var oModelChart = new sap.ui.model.json.JSONModel();
				var oData = oModelMonth.getData().Small.Month;
				that.oDataPlant = that.getView().getModel("KPIPlant").oData.d.results;
				that.oDataPlant2 = that.getView().getModel("KPIPlant").oData.d.results2;
				that.oDataKPIConfig = sap.ui.getCore().getModel("oModelKPIConfig").getData().KPI;
				that.getView().setModel(sap.ui.getCore().getModel("oModelKPIConfig"), "oModelKPIConfig");

				oModelChart.setData(oData);
				that.chartInit(oModelChart, "1", "0.9", true);
				//				var flag = window.location.hash.split("/")[4];
				//				var flag = "CPZLFS";

				var flag = KPItext;
				if (flag !== undefined && flag !== "") {
					that.onSetKPIModel(flag);
				}

			}, 2000);
			//			this.getView().byId("c1").setModel(new sap.ui.model.json.JSONModel("json/QualityScoreMonth.json"));
			//			this.getView().byId("c2").setModel(new sap.ui.model.json.JSONModel("json/QualityScorePlant.json"));
		},
		onSetKPIModel: function (sKPIName) {
			var that = this;
			var oData = {};
			oData.KPIConfig = this.oDataKPIConfig;
			var KPIConfig = this.Jsonfilter(oData.KPIConfig, sKPIName);
			if (KPIConfig.length === 0) {
				return;
			}
			// 			that.initTimeAndFilter();
			that.sKPIName = sKPIName
			that.setOdataModel("init");

		},
		onFilter: function (oEvent) {
			this.getFilterModel();
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("sap.vo.mengniu.controller.blocks.KPIFilter", this);
				this.getView().addDependent(this._oDialog);
			}
			this._oDialog.open();
		},
		getFilterModel: function () {

			//			var oModelKPIFilter = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.vo.mengniu", "/json/KPIFilter.json"));

			var oData = {
				"KPIFilter": {
					"KPI": "",
					"Filter": {
						"filter_items": []
					}
				}
			};
			for (var i = 0; i < that.categoryAll.length; i++) {
				var data = that.categoryAll[i];
				data["ViewSettingsItem"] = that[that.categoryAll[i].id];
				oData.KPIFilter.Filter.filter_items.push(that.categoryAll[i]);

			}
			var oModelKPIFilter = this.getView().getModel("KPIFilter");
			oModelKPIFilter.setData(oData);
			this.getView().setModel(oModelKPIFilter, "KPIFilter");
		},
		onFilterTime: function (oEvent) {
			var that = this;
			var date = new Date();
			var year = date.getFullYear();
			var dateValue = new Date(year, 0, 1);
			var secondDateValue = new Date(year, 11, 31);
			var dialog = new sap.m.Dialog({
				title: '参数详情',
				type: 'Message',
				content: [
					new sap.m.DateRangeSelection({
						delimiter: " - ",
						dateValue: dateValue,
						secondDateValue: secondDateValue,
						displayFormat: "yyyy.MM.dd"
					})
				],
				beginButton: new sap.m.Button({
					text: '确认',
					press: function (oEvent) {
						that.handleChangeTime(oEvent);
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		onSearch: function (event) {
			var item = event.getParameter("suggestionItem");
			/*if (item) {
				sap.m.MessageToast.show("search for: " + item.getText());
			}*/
		},
		onSuggest: function (event) {
			var value = event.getParameter("suggestValue");
			var filters = [];
			if (value) {
				filters = [new sap.ui.model.Filter([
					new sap.ui.model.Filter("name", function (sDes) {
						return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					})
				], false)];
			}

			this.oSF.getBinding("suggestionItems").filter(filters);
			this.oSF.suggest();
		},
		onDownload: function (oEvent) {},
		onDrillDown: function (oEvent) {


			this.getView().byId("ChartContainer").switchChart(this.getView().byId("TableChart"));
			//			this.updateChart(oEvent);

		},
		updateChart: function (oEvent) {

			var oGroupySelector = this.getView().byId("GroupSelector");
			var aFilterAll = [],
				aFilter1 = [],
				aFilter2 = [];
			if (oGroupySelector.getSelectedKey() !== "000All") {
				var sText = oGroupySelector._getSelectedItemText();
				aFilter1.push(new sap.ui.model.Filter(that["GroupySelector"], "EQ", sText));
			}

			var oPlantSelector = this.getView().byId("PlantSelector");
			if (oPlantSelector.getSelectedKey() !== "000All") {
				var sText = oPlantSelector._getSelectedItemText();
				aFilter1.push(new sap.ui.model.Filter(that["PlantSelector"], "EQ", sText));
			}
			var oGeoSelector = this.getView().byId("GeoSelector");
			if (oGeoSelector.getSelectedKey() !== "000All") {
				var sText = oGeoSelector._getSelectedItemText();
				aFilter1.push(new sap.ui.model.Filter(that["GeoSelector"], "EQ", sText));
			}

			var oModelFilter = null;
			if (aFilter1.length >= 2) {
				oModelFilter = [];
				oModelFilter.push(new sap.ui.model.Filter(aFilter1, true));
			} else if (aFilter1.length === 1) {
				oModelFilter = aFilter1;

			}
			oGroupySelector.data("GroupSelector", oModelFilter);

			that.setOdataModel("");

		},
		getDates: function (sdate) {
			if (sdate === undefined) {
				var list = [];
				var now = new Date();
				var date = new Date(now.getTime());
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var Day = year + "" + (month < 10 ? ('0' + month) : month) + "" + (day < 10 ? ('0' + day) : day);

				var lastYear = year - 1;
				var lastYearFirstDay = lastYear + "0101";
				var lastYearLastDay = lastYear + "1231";
				var thisYearFirstDay = year + "0101";
				var thisYearLastDay = year + "1231";

				list.push(lastYearFirstDay); //0
				list.push(lastYearLastDay); //1
				list.push(thisYearFirstDay); //2
				list.push(Day); //3
				list.push(thisYearLastDay); //4
				list.push(year); //5
				list.push(lastYear); //6
				return list;
			} else {
				var year = sdate.getFullYear();
				var month = sdate.getMonth() + 1;
				var day = sdate.getDate();
				var Day = year + "" + (month < 10 ? ('0' + month) : month) + "" + (day < 10 ? ('0' + day) : day);
				return Day;
			}

		},
		setOdataModel: function (oFlag) {
			var aKPIConfigURL = that.changeODataURL(that.sKPIName);

			var sQuery = aKPIConfigURL[0];
			that.sQuery = sQuery;
			var mUrlParameter = aKPIConfigURL[1];
			var sKey = aKPIConfigURL[2];
			var aODataFilter = aKPIConfigURL[3];
			var key1, key2;
			var aDates = this.getDates();
			key1 = sKey.replace("$1", aDates[0]);
			key1 = key1.replace("$2", aDates[1]);
			key2 = sKey.replace("$1", aDates[2]);
			key2 = key2.replace("$2", aDates[3]);

			var oODataModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/" + sQuery + "_SRV/", {
				json: true,
				useBatch: false
			});
			/*oODataModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oODataModel, sQuery);*/
			var oModelFilter = that.builFilterData();


			if (oFlag === "init") {
				//			filter xmlfragment model();
				that.changeXmlfragmentModel(oODataModel, sQuery, key1);
				//			page Fix dashboard model
				that.changeFixDashboardModel(oODataModel, sQuery, key1, key2);
				//			page select PlantSet model
				that.changePlantSetModel();
				//			page Detail model
				that.changeDetailModel(oODataModel, sQuery, key1, key2, oModelFilter, mUrlParameter);

			} else {

				var category = "",
					value = "";
				category = this.getView().byId("CategorySelector").getSelectedKey();
				value = this.getView().byId("ValueSelector").getSelectedKey();
				if (that["reference"] && that["reference"]["id"] === value) {
					that["reference"]["falg"] = true;
				}
				that.category = category;
				that.value1 = value.replace(/_F/, "");
				var mUrlParameter = {
					"$select": category + "," + value + "," + that.value1
				};
				//			page Detail model
				that.changeDetailModel(oODataModel, sQuery, key1, key2, oModelFilter, mUrlParameter);

			}

		},
		builFilterData: function () {
			var oSearchBtn = this.getView().byId("SearchBtn");
			var aFilterAll1 = oSearchBtn.data("SearchBtn");

			var oTimeFilterBtn = this.getView().byId("TimeFilter");
			var aFilterAll2 = oTimeFilterBtn.data("TimeFilter");

			var GroupSelector = this.getView().byId("GroupSelector");
			var aFilterAll3 = GroupSelector.data("GroupSelector");


			var oModelFilter = null;
			var aFilter1 = [];
			if (aFilterAll1) {
				aFilter1.push(aFilterAll1);
			}
			if (aFilterAll2) {
				aFilter1.push(aFilterAll2);
			}
			if (aFilterAll3) {
				aFilter1.push(aFilterAll3);
			}
			if (aFilter1.length >= 2) {
				oModelFilter = [];
				oModelFilter.push(new sap.ui.model.Filter(aFilter1, true));
			} else if (aFilter1.length === 1) {
				if (aFilterAll1) {
					oModelFilter = aFilterAll1;
				}
				if (aFilterAll2) {
					oModelFilter = aFilterAll2;
				}
				if (aFilterAll3) {
					oModelFilter = aFilterAll3;
				}

			}
			return oModelFilter;
		},
		changePlantSetModel: function (oODataModel, sQuery, key1, key2, oModelFilter, mUrlParameter) {
			var oODataModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZMN_QM_DASHBOARD_SRV/", {
				json: true,
				useBatch: false
			});
			var mUrlParameterSCDQ = {
				"$select": "SCDQ,SCDQ_TXT"
			};
			var mUrlParameterPLANT = {
				"$select": "PLANT,PLANT_TXT"
			};
			var mUrlParameterYT = {
				"$select": "YT,YT_TXT"
			};
			oODataModel.read("/PlantSet", {
				urlParameters: mUrlParameterSCDQ,
				error: function (oData) {

				},
				success: function (oDataSCDQ) {
					oODataModel.read("/PlantSet", {
						urlParameters: mUrlParameterPLANT,
						error: function (oData) {

						},
						success: function (oDataPLANT) {
							oODataModel.read("/PlantSet", {
								urlParameters: mUrlParameterYT,
								error: function (oData) {

								},
								success: function (oDataYT) {
									var data = {
										"SCDQ": [],
										"PLANT": [],
										"YT": []
									};
									var oModel = new sap.ui.model.json.JSONModel();
									//			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
									oDataSCDQ.results.splice(0, 0, {
										"SCDQ": "000All",
										"SCDQ_TXT": "全部大区"
									});
									data.SCDQ.push(oDataSCDQ.results);
									oDataPLANT.results.splice(0, 0, {
										"PLANT": "000All",
										"PLANT_TXT": "全部工厂"
									});
									data.PLANT.push(oDataPLANT.results);
									oDataYT.results.splice(0, 0, {
										"YT": "000All",
										"YT_TXT": "集团"
									});
									data.YT.push(oDataYT.results);
									oModel.setData(data);
									that.getView().setModel(oModel, "PlantSet");
								}
							});
						}

					});
				}

			});
		},
		changeDetailModel: function (oODataModel, sQuery, key1, key2, oModelFilter, mUrlParameter) {
			oODataModel.read("/" + sQuery + key1 + "Results", {
				filters: oModelFilter,
				urlParameters: mUrlParameter,
				error: function (oData) {
					sap.m.MessageToast.show(JSON.parse(oData.responseText).error.message.value);
				},
				success: function (oData1) {

					oODataModel.read("/" + sQuery + key2 + "Results", {
						filters: null,
						urlParameters: mUrlParameter,
						error: function () {},
						success: function (oData2) {
							var complant = {
								"Data": []
							};
							for (var i = 0; i < oData1.results.length; i++) {
								var complantData = [];
								//								complantData["category"] = oData1[i].ZPLANT_T;
								//								complantData["thisYear"] = Number(oData1[i].A00O2TGTLVNX7CBNEGZRX9G0RY_F.replace(/%/, "")) / 100;
								complantData["category"] = oData1.results[i][that.category];
								complantData["thisYear"] = oData1.results[i][that.value1];
								for (var j = 0; j < oData2.results.length; j++) {

									if (oData1.results[i][that.category] === oData2.results[j][that.category]) {
										//										complantData["lastYear"] = Number(oData2[j].A00O2TGTLVNX7CBNEGZRX9G0RY_F.replace(/%/, "")) / 100;
										complantData["lastYear"] = oData2.results[j][that.value1];
										/*	if (complantData["lastYear"] !== 0) {
												complantData["thisYearTarget"] = (complantData["thisYear"] - complantData["lastYear"]) / complantData["lastYear"];

											} else {
												complantData["thisYearTarget"] = 0;

											}*/
									}

								}

								complant.Data.push(complantData);
							}
							// 							return complant;

							var oModel = new sap.ui.model.json.JSONModel();
							//			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
							oModel.setData(complant);
							that.getView().setModel(oModel);
							var ValueSelector = that.getView().byId("ValueSelector").getSelectedItem()
							var oflag = false,
								minValue, maxValue;
							if (ValueSelector) {
								var sTooltip = ValueSelector.getTooltip();
								minValue = sTooltip.split("~")[0];
								maxValue = sTooltip.split("~")[1];
								if (maxValue) {
									oflag = true;
								}
							}
							that.chartInit(oModel, maxValue, minValue, oflag);

							//							that.getView().getModel().refresh();

						}
					});
				}
			});

		},
		changeXmlfragmentModel: function (oODataModel, sQuery, key1) {
			for (var i = 0; i < that.categoryAll.length; i++) {
				var category1 = that.categoryAll[i].id;
				var mUrlParameter = {
					"$select": category1
				};
				var categoryAll = that.categoryAll[i].id;
				oODataModel.read("/" + sQuery + key1 + "Results", {
					urlParameters: mUrlParameter,
					error: function () {},
					success: function (oData) {
						var category1 = this.request.requestUri.split("?$select=")[1];
						var data = [];
						for (var i = 0; i < oData.results.length; i++) {
							/*{"name":"北京工厂",
		 					 "id":"zpalnt1"}*/
							var data1 = {};
							data1["id"] = oData.results[i][category1];
							data1["name"] = oData.results[i][category1];
							data.push(data1);
						}
						that[category1] = data;
					}
				});
			}
		},
		changeFixDashboardModel: function (oODataModel, sQuery, key1, key2) {

			var mUrlParameter = {
				"$select": that["categoryDefault1"] + "," + that["valuedefault1"].id + "," + that["valuedefault1"].id.replace(/_F/, "")
			};
			var oModelFilterThisYear = [],
				oFilter = [];
			var aDates = this.getDates();
			oFilter.push(new sap.ui.model.Filter(that.time[0].name, "Contains", aDates[5]));
			// oFilter.push(new sap.ui.model.Filter(that.time[0].name,"LT",aDates[4]));
			oModelFilterThisYear.push(new sap.ui.model.Filter(oFilter, false));

			var oModelFilterLastYear = [],
				oFilter = [];
			oFilter.push(new sap.ui.model.Filter(that.time[0].name, "Contains", aDates[6]));
			// oFilter.push(new sap.ui.model.Filter(that.time[0].name,"LT",aDates[1]));
			oModelFilterLastYear.push(new sap.ui.model.Filter(oFilter, false));

			oODataModel.read("/" + sQuery + key1 + "Results", {
				filters: oModelFilterThisYear,
				urlParameters: mUrlParameter,
				error: function (oData) {

				},
				success: function (oData1) {

					oODataModel.read("/" + sQuery + key2 + "Results", {
						filters: oModelFilterLastYear,
						urlParameters: mUrlParameter,
						error: function () {},
						success: function (oData2) {
							var complant = {
								"Data1": []
							};
							for (var i = 0; i < oData1.results.length; i++) {
								var complantData = [];
								var category = that["categoryDefault1"];
								var value1 = that["valuedefault1"].id.replace(/_F/, "");

								complantData["category"] = oData1.results[i][category];
								complantData["thisYear"] = oData1.results[i][value1];
								for (var j = 0; j < oData2.results.length; j++) {

									if (oData1.results[i][category] === oData2.results[j][category]) {
										complantData["lastYear"] = oData2.results[j][value1];
										/*if (complantData["lastYear"] !== 0) {
											complantData["thisYearTarget"] = (complantData["thisYear"] - complantData["lastYear"]) / complantData["lastYear"];

										} else {
											complantData["thisYearTarget"] = 0;

										}*/
									}

								}

								complant.Data1.push(complantData);
							}

							var oModel = new sap.ui.model.json.JSONModel();
							oModel.setData(complant);

							var oViz1 = that.getView().byId("c1");
							oViz1.setModel(oModel, "c1");

							var maxValue = that["valuedefault1"].maxValue,
								minValue = that["valuedefault1"].minValue,
								oFlag = false;
							if (maxValue) {
								oFlag = true;
							}
							that.setFixDashboardViz(oViz1, "产品质量分数月度变化趋势及同比数据", that.oProperties, maxValue, minValue, oFlag);

							/*that.getView().setModel(oModel);
							that.chartInit(oModel,false);*/

						}
					});
				}
			});

			var mUrlParameter2 = {
				"$select": that["categoryDefault2"] + "," + that["valuedefault2"].id + "," + that["valuedefault2"].id.replace(/_F/, "")
			};
			oODataModel.read("/" + sQuery + key1 + "Results", {
				filters: oModelFilterThisYear,
				urlParameters: mUrlParameter2,
				error: function (oData) {

				},
				success: function (oData1) {
					var complant1 = {
						"Data3": []
					};
					for (var i = 0; i < oData1.results.length; i++) {
						var complantData = [];
						var category = that["categoryDefault2"];
						var value1 = that["valuedefault2"].id.replace(/_F/, "");

						complantData["category"] = oData1.results[i][category];
						complantData["thisYear"] = oData1.results[i][value1];
						complant1.Data3.push(complantData);
					}

					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(complant1);

					var oViz2 = that.getView().byId("c2");
					oViz2.setModel(oModel, "c2");
					var maxValue = that["valuedefault2"].maxValue,
						minValue = that["valuedefault2"].minValue,
						oFlag = false;
					if (maxValue) {
						oFlag = true;
					}
					that.setFixDashboardViz(oViz2, "产品质量分数各个工厂对比数据", that.oProperties, maxValue, minValue, oFlag);

				}
			});
		},
		changeODataURL: function (sKPIName) {
			// sKPIName = "原料辅料合格率";

			var oData = {};
			oData.KPIConfig = this.oDataKPIConfig;
			var KPIConfig = this.Jsonfilter(oData.KPIConfig, sKPIName);

			var sData = oData.KPIConfig;
			var sData1 = {
				"KPI": []
			};
			for (var i = 0; i < sData.length; i++) {
				if (sData[i].id === sKPIName) {
					var index = i;
					that.categoryAll = sData[i].category;
					that.ValueAll = sData[i].Value;
					that.time = sData[i].time;
					that.timeFormat = that.changeTimeformat(sData[i].time[0].name, sData[i].time[0].format);
				}
			}
			var CategorySelector = this.getView().byId("CategorySelector");
			CategorySelector.unbindItems();
			CategorySelector.bindItems({
				path: 'oModelKPIConfig>/KPI/' + index + '/category',
				sorter: {
					path: 'name'
				},
				template: new sap.ui.core.Item({
					text: "{oModelKPIConfig>name}",
					key: "{oModelKPIConfig>id}"
				})
			});
			var ValueSelector = this.getView().byId("ValueSelector");
			ValueSelector.unbindItems();
			ValueSelector.bindItems({
				path: 'oModelKPIConfig>/KPI/' + index + '/Value',
				sorter: {
					path: 'name'
				},
				template: new sap.ui.core.Item({
					text: "{oModelKPIConfig>name}",
					tooltip: "{oModelKPIConfig>minValue}~{oModelKPIConfig>maxValue}",
					key: "{oModelKPIConfig>id}"
				})
			});

			// var sQuery = "/" + KPIConfig.query[0] + "_SRV/" + KPIConfig.query[0];
			var sQuery = KPIConfig.query[0];
			var key = "";
			if (KPIConfig.key.length !== 0) {
				key = "(";
				for (var i = 0; i < KPIConfig.key.length; i++) {
					if (!KPIConfig.key[i].value) {
						KPIConfig.key[i].value = "";
					}
					if (key === "(") {
						key = key + KPIConfig.key[i].name + "='" + KPIConfig.key[i].value + "'";
					} else {
						key = key + "," + KPIConfig.key[i].name + "='" + KPIConfig.key[i].value + "'";
					}
				}
				key = key + ")/";
			}
			//			var category = "",
			//				value = "";
			//			category = this.getView().byId("CategorySelector").getSelectedKey();
			//			value = this.getView().byId("ValueSelector").getSelectedKey();
			that.category = that.categoryAll[0].id;
			that.value = that.ValueAll[0].id;
			that.value1 = that.ValueAll[0].id.replace(/_F/, "");

			for (var i = 0; i < that.categoryAll.length; i++) {
				if (that.categoryAll[i]["categoryDefault1"]) {
					that["categoryDefault1"] = that.categoryAll[i].id;
				}
				if (that.categoryAll[i]["categoryDefault2"]) {
					that["categoryDefault2"] = that.categoryAll[i].id;
				}
				if (that.categoryAll[i]["GroupySelector"]) {
					that["GroupySelector"] = that.categoryAll[i].id;
				}
				if (that.categoryAll[i]["PlantSelector"]) {
					that["PlantSelector"] = that.categoryAll[i].id;
				}
				if (that.categoryAll[i]["GeoSelector"]) {
					that["GeoSelector"] = that.categoryAll[i].id;
				}
			}

			for (var i = 0; i < that.ValueAll.length; i++) {
				if (that.ValueAll[i]["valuedefault1"]) {
					that["valuedefault1"] = that.ValueAll[i];
				}
				if (that.ValueAll[i]["valuedefault2"]) {
					that["valuedefault2"] = that.ValueAll[i];
				}
				if (that.ValueAll[i]["reference"]) {
					that["reference"] = that.ValueAll[i]["reference"];
					that["reference"]["id"] = that.ValueAll[i].id;
					if (that.ValueAll[i].id === that.value) { // if selected
						that["reference"]["falg"] = true;
					} else {
						that["reference"]["falg"] = false;
					}
				}
			}

			var aFilter = [];
			/* var GroupSelector = this.getView().byId("ValueSelector").getSelectedKey();
			 var PlantSelector = this.getView().byId("PlantSelector").getSelectedKey();
			 aFilter.push(new sap.ui.model.Filter("ZPLANT_T","EQ",GroupSelector));
			 aFilter.push(new sap.ui.model.Filter("ZPLANT_T","EQ",PlantSelector));*/

			var aODataFilter = [];
			for (var i in aFilter) {
				if (aFilter[i] != undefined) {
					aODataFilter.push(aFilter[i]);
				}
			}

			/*for (var i = 0; i < KPIConfig.category.length; i++) {
				category += KPIConfig.category[i].id +",";
			}
			for (var i = 0; i < KPIConfig.Value.length; i++) {
				value += KPIConfig.Value[i].id +",";
			}*/

			var mUrlParameter = {
				"$select": that.category + "," + that.value + "," + that.value1
			};
			/**/
			var aKPIConfigURL = [];
			aKPIConfigURL.push(sQuery);
			aKPIConfigURL.push(mUrlParameter);
			aKPIConfigURL.push(key);
			aKPIConfigURL.push(aODataFilter);

			return aKPIConfigURL;
		},
		changeTimeformat: function (Stime, format) {
			if (format === "MM.YYYY") {
				/*name = "MM.YYYY";
				name.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1"); "YYYYMMDD" */
				Stime = Stime.replace(/(\w+)\s*.\s*(\w+)/, "$2$1");
				Stime = Stime + "00";
				return Stime;
			}

		},
		Jsonfilter: function (Json, sfilter) {

			var list = [];
			var filter = sfilter; //这里是过滤条件
			$.each(Json, function (i, item) {
				if (item.id.indexOf(filter) !== -1) {
					list = item;
				}
			});
			return list;
		},
		changeOData: function (oData) {
			var complant = {
				"Data": []
			};
			for (var i = 0; i < oData.plant.length; i++) {
				var complantData = [];
				complantData["category"] = oData.plant[i].ZPLANT_T;
				complantData["thisYear"] = Number(oData.plant[i].A00O2TGTLVNX7CBNEGZRX9G0RY_F.replace(/%/, "")) / 100;

				for (var j = 0; j < oData.plant2.length; j++) {

					if (oData.plant[i].ZPLANT_T === oData.plant2[j].ZPLANT_T) {
						complantData["lastYear"] = Number(oData.plant2[j].A00O2TGTLVNX7CBNEGZRX9G0RY_F.replace(/%/, "")) / 100;
						/*if (complantData["lastYear"] !== 0) {
							complantData["thisYearTarget"] = (complantData["thisYear"] - complantData["lastYear"]) / complantData["lastYear"];

						} else {
							complantData["thisYearTarget"] = 0;

						}*/
					}

				}

				complant.Data.push(complantData);
			}
			return complant;
		},
		initTimeAndFilter: function () {
			var oTimeFilterBtn = this.getView().byId("TimeFilter");
			var aFilterAll = [],
				aFilter1 = [],
				aFilter2 = [];
			aFilter1.push(new sap.ui.model.Filter("ZVUCADAY", "EQ", this.getDates()[0]));
			aFilter1.push(new sap.ui.model.Filter("ZVUCADAYTo", "EQ", this.getDates()[1]));
			aFilter2.push(new sap.ui.model.Filter(aFilter1, true));
			oTimeFilterBtn.data("TimeFilter", aFilter2);

			aFilter2 = [];
			var GroupSelector = this.getView().byId("ValueSelector").getSelectedKey();
			aFilter1 = [];
			aFilter1.push(new sap.ui.model.Filter("ZPLANT_T", "EQ", GroupSelector));
			aFilter2.push(new sap.ui.model.Filter(aFilter1, true));

			var oSearchBtn = this.getView().byId("SearchBtn");
			var PlantSelector = this.getView().byId("PlantSelector").getSelectedKey();
			aFilter1 = [];
			aFilter1.push(new sap.ui.model.Filter("ZPLANT_T", "EQ", PlantSelector));
			aFilter2.push(new sap.ui.model.Filter(aFilter1, true));

			aFilterAll.push(new sap.ui.model.Filter(aFilter2, true));
			oSearchBtn.data("SearchBtn", aFilterAll);

		},
		handleChangeTime: function (oEvent) {

			var oTimeFilterBtn = this.getView().byId("TimeFilter");
			var aFilter1 = [],
				aFilter2 = [];
			var value = oEvent.oSource.getParent().getContent()[0].mProperties;
			var beginDate = this.getDates(value.dateValue);
			var endDate = this.getDates(value.secondDateValue);
			aFilter1.push(new sap.ui.model.Filter("ZVUCADAY", "EQ", beginDate));
			aFilter1.push(new sap.ui.model.Filter("ZVUCADAYTo", "EQ", endDate));
			aFilter2.push(new sap.ui.model.Filter(aFilter1, true));
			oTimeFilterBtn.data("TimeFilter", aFilter2);
			this.onSetKPIModel(this.sKPIName);

		},
		handleConfirm: function (oEvent) {
			var sFilter = oEvent.getParameters().filterString;
			if (sFilter !== '') {
				this.getView().byId("SearchBtn").setPressed(true);
			} else {
				this.getView().byId("SearchBtn").setPressed(false);
			}
			this.getView().byId("SearchBtn").setTooltip(sFilter);

			var oSearchBtn = this.getView().byId("SearchBtn");

			var filterKeys = oEvent.getParameters().filterCompoundKeys;
			var aFilterAll = [],
				aFilter1 = [],
				aFilter2 = [];
			for (var i in filterKeys) {
				aFilter1 = [];
				for (var j in filterKeys[i]) {
					aFilter1.push(new sap.ui.model.Filter(i, "EQ", j));
				}
				aFilter2.push(new sap.ui.model.Filter(aFilter1, false));
			}
			if (aFilter2.length > 1) {
				aFilterAll.push(new sap.ui.model.Filter(aFilter2, true));
			} else {
				aFilterAll = aFilter2;
			}
			// 			aFilterAll.push(new sap.ui.model.Filter(aFilter2, true));
			oSearchBtn.data("SearchBtn", aFilterAll);
			this.updateChart();

		},
		onFilterDetailPageOpened: function (oEvent) {
			/*
						sap.ui.getCore().byId("ViewSettingsDialog").setVisible(false);
						sap.ui.getCore().byId("ViewSettingsDialog").setVisible(true);*/
		},
		onSelectData: function (oEvent) {
			var that = this;
			var that = this;
			this.chartSelected = [];
			var x = oEvent.getParameters().data[0];
			//x.data.省份
			that.chartSelected.push({
				provence: x.data['Store Name']
			});
			/*	oEvent.getParameters().data.forEach(function(x) {
					that.chartSelected.push(new sap.ui.model.Filter('department', "EQ", x.data[0]));
				});*/
		},
		onDeSelectData: function (oEvent) {
			/*var that = this;
						oPopOver.setActionItems([oActionItem1]);(var i = 0; i < oEvent.getParameters().data.length; i++) {
							for (var j = 0; j < that.chartSelected.length; j++) {
								if (that.chartSelected[j].sPath === oColumnKey && chartSelected[j].oValue1 === oEvent.getParameters().data[i].data[oColumn]) {
									var sIndex = j;
									that.chartSelected.splice(sIndex, 1);
								}
							}
						}*/
		},
		onPress: function (oEvent) {
			var KPItext = oEvent.getSource().mProperties.text;
			// var oNav  =	this.getView().getContent()[0];
			var oPage1 = this.getView().getContent()[0];
			var oPage2 = this.getView().getContent()[1];
			// oPage2.setTitle(KPItext);
			// this.getView().getParent().getParent().setTitle(KPItext);
			var oData = this.getView().getParent().getParent();
			if (oData.getId().indexOf("idChartContainer") > -1) {
				oData.setTitle(KPItext);
			}
			oPage1.setVisible(false);
			oPage2.setVisible(true);
			// oNav.to(oPage2.getId());
		},
		oNavButtonPress: function (oEvent) {
			// var oNav  =	this.getView().getContent()[0];
			var oContainer = this.getView().getParent().getParent();
			if (oContainer.getId().indexOf("idChartContainer") > -1) {
				var oPage1 = this.getView().getContent()[0];
				var oPage2 = this.getView().getContent()[1];
				// this.getView().getParent().getParent().setTitle('质量指标智能分析');
				var oData = this.getView().getParent().getParent();
				if (oData.getId().indexOf("idChartContainer") > -1) {
					oData.setTitle('质量指标智能分析');
				}
				oPage1.setVisible(true);
				oPage2.setVisible(false);
			} else {

				var sString = (window.location.hash.indexOf("/single/KPI/1") > 0 ? true : false);
				if (sString) {
					this.getRouter().navTo('home');
				} else {
					oContainer.getContent()[0].setVisible(true);
					oContainer.getContent()[1].setVisible(false);

				}

				/*oContainer.getContent()[0].setVisible(true);
				oContainer.getContent()[1].setVisible(false);*/

			}
			// oNav.to(oPage1.getId());
		},
		chartInit: function (oModel, maxValue, minValue, oFlag) {
			var that = this;
			// bar bar line
			var referenceFlag1 = false,
				referenceFlag2 = false,
				referenceValue1, referenceValue2, referenceText1, referenceText2;
			var oViz = this.getView().byId("combination");
			if (that["reference"] && that["reference"]["falg"] === true) {
				referenceValue1 = that["reference"].referenceValue1;
				if (referenceValue1) {
					referenceFlag1 = true;
				}
				referenceText1 = that["reference"].referenceText1;
				referenceValue2 = that["reference"].referenceValue2;
				if (referenceValue1) {
					referenceFlag2 = true;
				}
				referenceText2 = that["reference"].referenceText2;

			}
			oViz.setModel(oModel);
			var oProperties = {
				general: { //整个vizFrame区域 
					background: {
						color: "#000000" //"rgba(6, 25, 61, 0.35)"
					},
					layout: { //图形离边框线的距离，上下左右统一设定时用padding;也可单独设定某一边的距离
						//padding:60, 
						paddingBottom: 12,
						paddingLeft: 24,
						paddingRight: 12,
						paddingTop: 24
					}
				},
				categoryAxis: {
					title: {
						visible: false
					},
					color: "#757F89",
					label: {
						style: { //分类标签字体的样式
							color: "#C3CED9"
						}
					}
					//分类轴线及轴线的刻度颜色，还可用颜色的英文单词 
				},
				valueAxis: {
					color: "#757F89",
					label: {
						style: { //分类标签字体的样式
							color: "#C3CED9"
						},
						formatString: CustomerFormat.FIORI_PERCENTAGE_FORMAT_2
					},
					title: {
						visible: false
					}
				},
				valueAxis2: {
					label: {
						formatString: CustomerFormat.FIORI_PERCENTAGE_FORMAT_2
					},
					title: {
						visible: false
					}
				},
				legend: {
					isScrollable: false,
					label: {
						//图例标签字体样式 
						style: {
							color: "#C3CED9"
						}
					}
				},
				legendGroup: {
					layout: {
						alignment: "topLeft",
						position: "right"
					}
				},
				plotArea: {

					actualColor: ["#42BFF2"], //actualValues颜色
					forecastColor: ["#0765C2"], //forecastValues颜色
					target: {
						shadowColor: "",
						valueColor: "#F8C757" //目标值颜色
					},
					isFixedDataPointSize: true,
					//设置成true，会有滚动轴
					background: {
						color: "transparent" //矩形区域的背景色
					},
					dataLabel: {
						//bar上是否显示数值
						formatString: CustomerFormat.FIORI_PERCENTAGE_FORMAT_2,
						style: {
							//数值的字体样式
							color: "#C3CED9"
						},
						visible: true
					},
					referenceLine: {
						line: {
							valueAxis: [{
								value: referenceValue1,
								visible: referenceFlag1,
								size: 1,
								type: "dotted",
								color: "#FFF",
								label: {
									color: "#FFF",
									text: referenceText1,
									visible: true
								}
							}, {
								value: referenceValue2,
								visible: referenceFlag2,
								size: 1,
								type: "dotted",
								color: "#FFF",
								label: {
									color: "#FFF",
									text: referenceText2,
									visible: true
								}
							}]
						}
					},
					dataShape: {
						primaryAxis: ["bar", "bar", "line"] //数据显示形状
					},
					gridline: {
						//矩形区域中的网格线
						color: "#757F89",
						size: 1, // 网格线的宽度
						type: "solid", //网格线的样式,可选值:solid(实线), dash(虚线)
						visible: false
					},
					dataPoint: {
						savingMode: true,
						stroke: { //bar边框颜色/是否可见
							color: "#000",
							visible: true
						}
					},
					dataPointSize: { //只有当isFixedDataPointSize=true时，可调整bar的宽度;当isFixedDataPointSize=false时该属性不起作用
						max: 30,
						min: 5
					},
					primaryScale: {
						autoMaxValue: null,
						autoMinValue: null,
						fixedRange: oFlag,
						//当fixedRange=false时，设置maxValue和minValue的值无效
						maxValue: maxValue,
						//数值轴刻度的最大值
						minValue: minValue //数值轴刻度的最小值
					},
					primaryValuesColorPalette: ['#078ED2', '#4CD9A4', '#F8C757']
					/* ["#748CB2", "#9CC677", "#EACF5E", "#F9AD79", "#D16A7C", "#8873A2", "#3A95B3", "#B6D949", "#FDD36C",
											"#F47958", "#A65084", "#0063B1", "#0DA841", "#FCB71D", "#F05620", "#B22D6E", "#3C368E", "#8FB2CF", "#95D4AB", "#EAE98F",
											"#F9BE92", "#EC9A99", "#BC98BD", "#1EB7B2", "#73C03C", "#F48323", "#EB271B", "#D9B5CA", "#AED1DA", "#DFECB2", "#FCDAB0",
											"#F5BCB4"
										]*/
				},
				interaction: {
					selectability: {
						axisLabelSelection: true, //通过点击分类标签是否可以选择 
						legendSelection: true, //通过点击图例是否可以选择
						mode: "SINGLE", //可选值:INCLUSIVE, EXCLUSIVE(单一的选中值方式，点击分类标签/点击图例/点击数值点(marker)), SINGLE(只能选中一个值通过，通过点击分类标签和点击图例选中功能不可用), MULTIPLE, NONE(不能选中值)
						plotLassoSelection: true,
						plotStdSelection: true
					}
				},
				title: {
					alignment: "center",
					text: "投诉率前10名省份",
					style: {
						//标题的字体样式
						color: "#C3CED9",
						fontFamily: "'Open Sans', Arial, Helvetica, sans-serif",
						fontSize: "16px",
						fontStyle: "normal",
						fontWeight: "bold"
					},
					visible: false
				}
			};
			oViz.setVizProperties(oProperties);
			var oPopOver = this.getView().byId("PopOverCombination");
			var oActionItem1 = {
				type: 'action',
				text: '维度下钻',
				press: function (oEvent) {
					that.onDrillDown(oEvent);
					that.getView().byId("PopOverCombination").close();
				}
			};
			var oActionItem2 = {
				type: 'action',
				text: '返回',
				press: function (oEvent) {
					that.onDrillDown(oEvent);
					that.getView().byId("PopOverCombination").close();
				}
			};
			oPopOver.connect(oViz.getVizUid());
			oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_2);
			oPopOver.setActionItems([oActionItem1]);

			// line line line
			var oViz = this.getView().byId("line");
			oViz.setModel(oModel);
			oProperties.plotArea.dataShape = [];
			oViz.setVizProperties(oProperties);
			var oPopOver = this.getView().byId("PopOverLine");
			oPopOver.connect(oViz.getVizUid());
			oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_2);
			oPopOver.setActionItems([oActionItem1]);

			//bulletHorizontal
			var oViz = this.getView().byId("bulletHorizontal");
			oViz.setModel(oModel);
			oViz.setVizProperties(oProperties);
			var oPopOver = this.getView().byId("PopOverBulletHorizontal");
			oPopOver.connect(oViz.getVizUid());
			oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_2);
			oPopOver.setActionItems([oActionItem1]);

			//bulletVertical
			var oViz = this.getView().byId("bulletVertical");
			oViz.setModel(oModel);
			oViz.setVizProperties(oProperties);
			var oPopOver = this.getView().byId("PopOverBulletVertical");
			oPopOver.connect(oViz.getVizUid());
			oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_2);
			oPopOver.setActionItems([oActionItem1]);

			//pie
			var oViz = this.getView().byId("pie");
			oViz.setModel(oModel);
			oProperties.plotArea.dataLabel.visible = true;
			oViz.setVizProperties(oProperties);
			var oPopOver = this.getView().byId("PopOverPie");
			oPopOver.connect(oViz.getVizUid());
			oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_2);
			oPopOver.setActionItems([oActionItem1]);
			this.oProperties = oProperties;

			/*var maxValue =100.5,minValue =99;
			var oViz = this.getView().byId("c1");
			oViz.setModel(oModel);
			this.setFixDashboardViz(oViz,"产品质量分数月度变化趋势及同比数据",this.oProperties,maxValue,minValue,oFlag);
			
			var oViz = this.getView().byId("c2");
			oViz.setModel(oModel);
			this.setFixDashboardViz(oViz,"产品质量分数各个工厂对比数据",this.oProperties,maxValue,minValue,oFlag);
		*/
		},
		setFixDashboardViz: function (oViz, oTitle, oProperties, maxValue, minValue, oFlag) {
			//temp
			oProperties.plotArea.primaryScale.maxValue = maxValue;
			oProperties.plotArea.primaryScale.minValue = minValue;
			oProperties.plotArea.primaryScale.fixedRange = oFlag;
			/*delete oProperties.valueAxis.label.formatString;
			delete oProperties.plotArea.dataLabel.formatString;*/
			oProperties.plotArea.gridline.visible = false;
			oProperties.title.visible = true;
			oProperties.title.text = oTitle;
			oViz.setVizProperties(oProperties);

			/*	var oViz = this.getView().byId("c2");
				oViz.setModel(oModel);
				oProperties.title.text = "产品质量分数各个工厂对比数据";
				oViz.setVizProperties(oProperties);*/

		},
		onDetail: function () {
			this.getView().byId("Nav").to(this.getView().byId("Detail"));
		},
		// onClose: function(oPopOver) {
		// 		oPopOver.close();
		// },
		initCustomFormat: function () {
			CustomerFormat.registerCustomFormat();
		},
		formatter: function (num) {
			if (num <= 1) {
				var percentage = sap.ui.core.format.NumberFormat.getPercentInstance({
					style: 'precent',
					maxFractionDigits: 2
				});
				return percentage.format(num * 1);
			} else {
				var fixedFloat = sap.ui.core.format.NumberFormat.getFloatInstance({
					style: 'Standard',
					maxFractionDigits: 2
				});
				return fixedFloat.format(num * 1);
			}
		},
		_setFull: function () {
			console.log('f');
		},
		_setSmall: function () {
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