sap.ui.define([
    "sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
    'sap/vo/mengniu/controller/blocks/CustomerFormat'
], function (BlockContentBase, CustomerFormat) {
    "use strict";
    var that;
    return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.Complaints", {

        /**
         * Called when a controller is instantiated and its View controls (if available) are already created.
         * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
         * @memberOf sap.vo.mengniu.view.Complaints
         */
        onInit: function () {
            that = this;
            that.isChinaMap = 'china';
            this.SelectBU = 'group';
            this.calType = "2";
            this.mapType = "1";
            that.id = that.createId('ComplaintsMapHeat');
            this.online = Boolean(sap.ui.getCore().getModel("Online"));
            this.getView().setModel(new sap.ui.model.json.JSONModel(), "originData");
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'PageData');
            this.initVizChart();
        },
        loadData: function () {
            var that = this;
            var oConfig = sap.ui.getCore().getModel("oModelKPIConfig").getData();
            if (!oConfig || !oConfig.ComplainConfig) {
                setTimeout(function () {
                    that.loadData();
                }, 500);
                return;
            }
            that.ComConfig = oConfig.ComplainConfig;
            if (!this.StartDate) {
                this.StartDate = this.getDate(that.ComConfig.LeadTime);
                this.EndDate = this.getDate();
                if (this.getView().byId("StartDate")) {
                    this.getView().byId("StartDate").setDateValue(new Date(new Date().valueOf() - Number(that.ComConfig.LeadTime) * 24 * 60 * 60 * 1000));
                    this.getView().byId("EndDate").setDateValue(new Date());
                }
            }

            if (this.getView().byId("StartDate")) {
                this.StartDate = this.getView().byId("StartDate").getValue();
                this.EndDate = this.getView().byId("EndDate").getValue();
            }
            if (this.getView().byId("BU")) {
                this.SelectBU = this.getView().byId("BU").getSelectedKey();
            }
            if (this.getView().byId("CalTypeId")) {
                this.calType = this.getView().byId("CalTypeId").getSelectedKey();
            }
            if (this.online) {
                var oPlant = sap.ui.getCore().getModel("Plant").getData();
                if (!oPlant || !oPlant.results) {
                    setTimeout(function () {
                        that.loadData();
                    }, 500);
                    return;
                }
                this.oPlant = {};
                if (this.SelectBU !== "group") {
                    for (var i in oPlant.results) {
                        if (oPlant.results[i].YT == this.SelectBU) {
                            this.oPlant[oPlant.results[i].PLANT] = oPlant.results[i];
                            this.oPlant[oPlant.results[i].PLANT].LON = Number(this.oPlant[oPlant.results[i].PLANT].LON);
                            this.oPlant[oPlant.results[i].PLANT].LAN = Number(this.oPlant[oPlant.results[i].PLANT].LAN);
                        }
                    }
                } else {
                    for (var i in oPlant.results) {
                        this.oPlant[oPlant.results[i].PLANT] = oPlant.results[i];
                        this.oPlant[oPlant.results[i].PLANT].LON = Number(this.oPlant[oPlant.results[i].PLANT].LON);
                        this.oPlant[oPlant.results[i].PLANT].LAN = Number(this.oPlant[oPlant.results[i].PLANT].LAN);
                    }
                }
                if (this.getView().byId("GeoSelector")) {
                    var oSCDQ = this.getView().byId("GeoSelector");
                    oSCDQ.removeAllItems();
                    this.AllSCDQ = [];
                    for (var key in this.oPlant) {
                        if (this.AllSCDQ.indexOf(this.oPlant[key].SCDQ) === -1) {
                            oSCDQ.addItem(new sap.ui.core.Item({
                                key: String(this.oPlant[key].SCDQ),
                                text: String(this.oPlant[key].SCDQ_TXT)
                            }));
                        }
                        this.AllSCDQ.push(this.oPlant[key].SCDQ);
                    }
                }
                if (this.getView().byId("PlantSelector")) {
                    var oPlant = this.getView().byId("PlantSelector");
                    oPlant.removeAllItems();
                    for (var key in this.oPlant) {
                        oPlant.addItem(new sap.ui.core.Item({
                            key: String(this.oPlant[key].PLANT),
                            text: String(this.oPlant[key].PLANT_TXT)
                        }));
                    }
                }

                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZQM_CP01_Q001_SRV", {
                    useBatch: false
                });
                this.getView().setBusy(true);
                var StartMonth = this.StartDate.substring(4, 6) + "." + this.StartDate.substring(0, 4);
                var EndMonth = this.EndDate.substring(4, 6) + "." + this.EndDate.substring(0, 4);
                var mUrlParameter = {
                    "$select":
                        "ZMATERIAL,ZMATERIAL_T,A4ZQM_CP01TS006,A4ZQM_CP01TS007,A4ZQM_CP01TS018,A4ZQM_CP01TS020,A4ZQM_CP01TS028,A4ZQM_CP01TS029,A4ZQM_CP01TS030," +
                        "A4ZQM_CP01TS041,A4ZQM_CP01TS045,A4ZQM_CP01TS047,A4ZQM_CP01TS048,A4ZQM_CP01TS054,ZPLANT,ZPLANT_T,A00O2TGSVB59E1S8IV0SSUUYUZ_F,A00O2TGSVB59E1S8IV0SSUUYUZ"
                };
                oModel.read("/ZQM_CP01_Q001(ZVUDAY01='" + this.StartDate + "',ZVUDAY01To='" + this.EndDate + "',ZVAPLANT='')/Results", {
                    urlParameters: mUrlParameter,
                    success: function (oData) {
                        if (oData && oData.results) {
                            that.ComplaintTypeAll = {};

                            for (var i = 0; i < oData.results.length; i++) {
                                if (oData.results[i].A4ZQM_CP01TS028 in that.ComplaintTypeAll) {
                                    if (oData.results[i].A4ZQM_CP01TS029 in that.ComplaintTypeAll[oData.results[i].A4ZQM_CP01TS028]) {
                                        if (oData.results[i].A4ZQM_CP01TS030 in that.ComplaintTypeAll[oData.results[i].A4ZQM_CP01TS028][oData.results[i].A4ZQM_CP01TS029]) {
                                            continue;
                                        } else {
                                            that.ComplaintTypeAll[oData.results[i].A4ZQM_CP01TS028][oData.results[i].A4ZQM_CP01TS029][oData.results[i].A4ZQM_CP01TS030] = {};
                                        }
                                    } else {
                                        that.ComplaintTypeAll[oData.results[i].A4ZQM_CP01TS028][oData.results[i].A4ZQM_CP01TS029] = {};
                                    }
                                } else {
                                    that.ComplaintTypeAll[oData.results[i].A4ZQM_CP01TS028] = {};
                                }
                            }
                            if (that.getView().byId("ComplaintId3")) {
                                that.ComplaintType1 = that.groupBy(oData.results, "A4ZQM_CP01TS028");// 投诉类型 一级分类
                                that.ComplaintType2 = that.groupBy(oData.results, "A4ZQM_CP01TS029");// 投诉类型 二级分类
                                that.ComplaintType3 = that.groupBy(oData.results, "A4ZQM_CP01TS030");// 投诉类型 三级分类

                                var oComplaint1 = that.getView().byId("ComplaintId1");
                                var aOldeCKeys1 = oComplaint1.getSelectedKeys();
                                var aNewCkeys1 = [];
                                oComplaint1.removeAllItems();
                                for (var key in that.ComplaintType1) {
                                    oComplaint1.addItem(new sap.ui.core.Item({
                                        key: key,
                                        text: key
                                    }));
                                    if (aOldeCKeys1.indexOf(key) !== -1 || key === "质量投诉") {
                                        aNewCkeys1.push(key);
                                    }
                                }
                                oComplaint1.setSelectedKeys(aNewCkeys1);

                                var oComplaint2 = that.getView().byId("ComplaintId2");
                                var aOldeCKeys2 = oComplaint2.getSelectedKeys();
                                var aNewCkeys2 = [];
                                oComplaint2.removeAllItems();
                                for (key in that.ComplaintTypeAll["质量投诉"]) {
                                    oComplaint2.addItem(new sap.ui.core.Item({
                                        key: key,
                                        text: key
                                    }));
                                    if (aOldeCKeys2.indexOf(key) !== -1) {
                                        aNewCkeys2.push(key);
                                    }
                                }
                                oComplaint2.setSelectedKeys(aNewCkeys2);

                                var oComplaint3 = that.getView().byId("ComplaintId3");
                                var aOldeCKeys3 = oComplaint3.getSelectedKeys();
                                var aNewCkeys3 = [];
                                var aKey3 = [];
                                oComplaint3.removeAllItems();
                                for (i in that.ComplaintTypeAll["质量投诉"]) {
                                    for (key in that.ComplaintTypeAll["质量投诉"][i]) {
                                        if (aKey3.indexOf(key) === -1) {
                                            oComplaint3.addItem(new sap.ui.core.Item({
                                                key: key,
                                                text: key
                                            }));
                                            if (aOldeCKeys3.indexOf(key) !== -1) {
                                                aNewCkeys3.push(key);
                                            }
                                            aKey3.push(key);
                                        }
                                    }
                                }
                                oComplaint3.setSelectedKeys(aNewCkeys3);
                            }

                            that.getView().getModel("originData").setData(oData);
                            that.AllMAT = that.groupBy(oData.results, "ZMATERIAL");
                            if (that.calType == "2") {
                                that.loadPercentData();
                            } else {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        }
                    },
                    error: function () {
                        var oData = {
                            "results": []
                        };
                        that.ComplaintTypeAll = {};
                        that.AllMAT = that.groupBy(oData.results, "ZMATERIAL");
                        that.getView().getModel("originData").setData(oData);
                        if (that.calType == "2") {
                            that.loadPercentData();
                        } else {
                            that.getView().setBusy(false);
                            that.refreshPage();
                        }
                    }
                });
            } else {
                this.getView().getModel("originData").loadData("json/ComplainData.json", {}, false);
                var ComData = this.getView().getModel("originData").getData();
                that.AllMAT = that.groupBy(ComData.results, "ZMATERIAL");
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "offlinePlant");
                this.getView().getModel("offlinePlant").loadData("json/plantSet.json", {}, false);
                var oPlant = this.getView().getModel("offlinePlant").getData();
                this.oPlant = {};
                if (this.SelectBU !== "group") {
                    for (var i in oPlant.results) {
                        if (oPlant.results[i].YT == this.SelectBU) {
                            this.oPlant[oPlant.results[i].PLANT] = oPlant.results[i];
                            this.oPlant[oPlant.results[i].PLANT].LON = Number(this.oPlant[oPlant.results[i].PLANT].LON);
                            this.oPlant[oPlant.results[i].PLANT].LAN = Number(this.oPlant[oPlant.results[i].PLANT].LAN);
                        }
                    }
                } else {
                    for (var i in oPlant.results) {
                        this.oPlant[oPlant.results[i].PLANT] = oPlant.results[i];
                        this.oPlant[oPlant.results[i].PLANT].LON = Number(this.oPlant[oPlant.results[i].PLANT].LON);
                        this.oPlant[oPlant.results[i].PLANT].LAN = Number(this.oPlant[oPlant.results[i].PLANT].LAN);
                    }
                }
                if (this.getView().byId("GeoSelector")) {
                    var oSCDQ = this.getView().byId("GeoSelector");
                    oSCDQ.removeAllItems();
                    this.AllSCDQ = [];
                    for (var key in this.oPlant) {
                        if (this.AllSCDQ.indexOf(this.oPlant[key].SCDQ) === -1) {
                            oSCDQ.addItem(new sap.ui.core.Item({
                                key: String(this.oPlant[key].SCDQ),
                                text: String(this.oPlant[key].SCDQ_TXT)
                            }));
                        }
                        this.AllSCDQ.push(this.oPlant[key].SCDQ);
                    }
                }
                if (this.getView().byId("PlantSelector")) {
                    var oPlant = this.getView().byId("PlantSelector");
                    oPlant.removeAllItems();
                    for (var key in this.oPlant) {
                        oPlant.addItem(new sap.ui.core.Item({
                            key: String(this.oPlant[key].PLANT),
                            text: String(this.oPlant[key].PLANT_TXT)
                        }));
                    }
                }
                if (that.calType == "2") {
                    that.loadPercentData();
                } else {
                    that.refreshPage();
                }
                // var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.vo.mengniu", "/json/Products1.json"));
                // this.getView().setModel(oModel, 'Products');
            }
            if (!this.registerMap) {
                this.registerMap = true;
                var AreaJson = {};
                for (var key in this.oPlant) {
                    if (!AreaJson[this.oPlant[key].SYB.replace(/事业部/, "")]) {
                        AreaJson[this.oPlant[key].SYB.replace(/事业部/, "")] = [];
                    }
                    var newProv = this.formatProv(this.oPlant[key].PROV_TXT);
                    if (AreaJson[this.oPlant[key].SYB.replace(/事业部/, "")].indexOf(newProv) === -1 && newProv !== undefined) {
                        AreaJson[this.oPlant[key].SYB.replace(/事业部/, "")].push(newProv);
                    }
                }
                for (var key in AreaJson) {
                    var Prov = echarts.getMap(AreaJson[key][0]);
                    var SCDQJson = JSON.parse(JSON.stringify(Prov));

                    for (var i = 1; i < AreaJson[key].length; i++) {
                        var ProvNext = echarts.getMap(AreaJson[key][i]);
                        if (ProvNext) {
                            SCDQJson.geoJson.features = SCDQJson.geoJson.features.concat(ProvNext.geoJson.features);
                        }
                    }
                    var SCDQJsonStr = JSON.stringify(SCDQJson.geoJson);
                    echarts.registerMap(key, SCDQJsonStr);
                }
            }
        },
        formatProv: function (prov) {
            var AllArea = ["上海", "浙江", "安徽", "江苏", "北京", "天津", "河北", "广东", "香港", "重庆", "福建", "甘肃", "广西", "贵州", "海南", "黑龙江", "河南", "湖南", "江西",
                "吉林", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "四川", "新疆", "西藏", "云南", "湖北"
            ];

            for (var i = 0; i < AllArea.length; i++) {
                if (prov.indexOf(AllArea[i]) !== -1) {
                    return AllArea[i];
                }
            }
        },
        loadPercentData: function () {
            var that = this;
            if (this.getView().byId("CalTypeId")) {
                this.calType = this.getView().byId("CalTypeId").getSelectedKey();
            }
            that.oPercentData = { PROV: [], City: [], MAT: [], PrvMAT: [], Plant: [] };
            var Count = 0;
            var Total = 5;
            // var aFilters = [];
            // for (var key in that.AllMAT) {
            //     aFilters.push(new sap.ui.model.Filter("ZMATERIAL__0MATL_TYPE", "EQ", key));
            // }
            this.getView().setBusy(true);
            if (this.online) {
                if (this.calType == "2") {
                    var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZQM_CP01_Q001_SRV", {
                        useBatch: false
                    });
                    oModel.read("/ZQM_CP01_Q001(ZVUDAY01='" + this.StartDate + "',ZVUDAY01To='" + this.EndDate + "',ZVAPLANT='')/Results", {
                        urlParameters: {
                            "$select":
                            "A4ZQM_CP01TS006,A00O2TGSVB59CBOEK1T2YBR5ZA_F,A00O2TGSVB59CBOEK1T2YBR5ZA"
                        },
                        // filters: [
                        //     new sap.ui.model.Filter("ZMATERIAL__0MATL_TYPE", "EQ", "Z005")
                        // ],
                        success: function (oData) {
                            Count++;
                            if (oData && oData.results) {
                                that.oPercentData.PROV = oData.results;
                            }
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        },
                        error: function () {
                            Count++;
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        }
                    });
                    oModel.read("/ZQM_CP01_Q001(ZVUDAY01='" + this.StartDate + "',ZVUDAY01To='" + this.EndDate + "',ZVAPLANT='')/Results", {
                        urlParameters: {
                            "$select":
                            "A4ZQM_CP01TS006,A4ZQM_CP01TS007,A00O2TGSVB59CBOEK1T2YBR5ZA_F,A00O2TGSVB59CBOEK1T2YBR5ZA"
                        },
                        // filters: [
                        //     new sap.ui.model.Filter("ZMATERIAL__0MATL_TYPE", "EQ", "Z005")
                        // ],
                        success: function (oData) {
                            Count++;
                            if (oData && oData.results) {
                                that.oPercentData.City = oData.results;
                            }
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        },
                        error: function () {
                            Count++;
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        }
                    });
                    oModel.read("/ZQM_CP01_Q001(ZVUDAY01='" + this.StartDate + "',ZVUDAY01To='" + this.EndDate + "',ZVAPLANT='')/Results", {
                        urlParameters: {
                            "$select":
                            "ZMATERIAL,A00O2TGSVB59CBOEK1T2YBR5ZA_F,A00O2TGSVB59CBOEK1T2YBR5ZA"
                        },
                        // filters: [
                        //     new sap.ui.model.Filter("ZMATERIAL__0MATL_TYPE", "EQ", "Z005")
                        // ],
                        success: function (oData) {
                            Count++;
                            if (oData && oData.results) {
                                that.oPercentData.MAT = oData.results;
                            }
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        },
                        error: function () {
                            Count++;
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        }
                    });
                    oModel.read("/ZQM_CP01_Q001(ZVUDAY01='" + this.StartDate + "',ZVUDAY01To='" + this.EndDate + "',ZVAPLANT='')/Results", {
                        urlParameters: {
                            "$select":
                            "A4ZQM_CP01TS006,ZMATERIAL,A00O2TGSVB59CBOEK1T2YBR5ZA_F,A00O2TGSVB59CBOEK1T2YBR5ZA"
                        },
                        // filters: [
                        //     new sap.ui.model.Filter("ZMATERIAL__0MATL_TYPE", "EQ", "Z005")
                        // ],
                        success: function (oData) {
                            Count++;
                            if (oData && oData.results) {
                                that.oPercentData.PrvMAT = oData.results;
                            }
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        },
                        error: function () {
                            Count++;
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        }
                    });

                    oModel.read("/ZQM_CP01_Q001(ZVUDAY01='" + this.StartDate + "',ZVUDAY01To='" + this.EndDate + "',ZVAPLANT='')/Results", {
                        urlParameters: {
                            "$select":
                            "ZPLANT,ZPLANT_T,A00O2TGSVB59E1X0IWFANEXLG5,A00O2TGSVB59E1X0IWFANEXLG5_F"
                        },
                        success: function (oData) {
                            Count++;
                            if (oData && oData.results) {
                                that.oPercentData.Plant = oData.results;
                            }
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        },
                        error: function () {
                            Count++;
                            if (Count >= Total) {
                                that.getView().setBusy(false);
                                that.refreshPage();
                            }
                        }
                    });
                } else {
                    that.refreshPage();
                    that.getView().setBusy(false);
                }
            } else {
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "Prov");
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "City");
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "MAT");
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "PrvMAT");
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "ComPlant");
                this.getView().getModel("Prov").loadData("json/ComProv.json", {}, false);
                this.getView().getModel("City").loadData("json/ComCity.json", {}, false);
                this.getView().getModel("MAT").loadData("json/ComMAT.json", {}, false);
                this.getView().getModel("PrvMAT").loadData("json/ComPrvMAT.json", {}, false);
                this.getView().getModel("ComPlant").loadData("json/ComPlant.json", {}, false);

                this.oPercentData.PROV = this.getView().getModel("Prov").getData().results;
                this.oPercentData.City = this.getView().getModel("City").getData().results;
                this.oPercentData.MAT = this.getView().getModel("MAT").getData().results;
                this.oPercentData.PrvMAT = this.getView().getModel("PrvMAT").getData().results;
                this.oPercentData.Plant = this.getView().getModel("ComPlant").getData().results;
                that.refreshPage();
                this.getView().setBusy(false);
            }
        },
        onComplaint1: function () {
            var oComplaint1 = this.getView().byId("ComplaintId1");
            var aCKeys1 = oComplaint1.getSelectedKeys();
            var oComplaint2 = this.getView().byId("ComplaintId2");
            var aOldCKeys2 = oComplaint2.getSelectedKeys();
            oComplaint2.removeAllItems();
            var aNewCkeys2 = [];
            var aKey2 = [];
            if (aCKeys1.length === 0) {
                for (var k in that.ComplaintType1) {
                    aCKeys1.push(k);
                }
            }
            for (var i = 0; i < aCKeys1.length; i++) {
                for (var key in that.ComplaintTypeAll[aCKeys1[i]]) {
                    if (aKey2.indexOf(key) === -1) {
                        oComplaint2.addItem(new sap.ui.core.Item({
                            key: key,
                            text: key
                        }));
                        aKey2.push(key);
                        if (aOldCKeys2.indexOf(key) !== -1) {
                            aNewCkeys2.push(key);
                        }
                    }
                }
            }
            oComplaint2.setSelectedKeys(aNewCkeys2);

            this.onComplaint2();
        },
        onComplaint2: function () {
            var oComplaint1 = this.getView().byId("ComplaintId1");
            var aCKeys1 = oComplaint1.getSelectedKeys();
            var oComplaint2 = this.getView().byId("ComplaintId2");
            var aCKeys2 = oComplaint2.getSelectedKeys();
            var oComplaint3 = this.getView().byId("ComplaintId3");
            var aOldCKeys3 = oComplaint3.getSelectedKeys();
            oComplaint3.removeAllItems();
            var aNewCkeys3 = [];
            var aKey3 = [];
            if (aCKeys2.length === 0 && aCKeys1.length === 0) {
                for (var k in that.ComplaintType2) {
                    aCKeys2.push(k);
                }
            } else if (aCKeys2.length === 0 && aCKeys1.length !== 0) {
                for (var i in aCKeys1) {
                    for (var k in that.ComplaintTypeAll[aCKeys1[i]]) {
                        aCKeys2.push(k);
                    }
                }
            }
            for (var i = 0; i < aCKeys1.length; i++) {
                for (var j = 0; j < aCKeys2.length; j++) {
                    for (var key in that.ComplaintTypeAll[aCKeys1[i]][aCKeys2[j]]) {
                        if (aKey3.indexOf(key) === -1) {
                            oComplaint3.addItem(new sap.ui.core.Item({
                                key: key,
                                text: key
                            }));
                            aKey3.push(key);
                            if (aOldCKeys3.indexOf(key) !== -1) {
                                aNewCkeys3.push(key);
                            }
                        }
                    }
                }
            }
            oComplaint3.setSelectedKeys(aNewCkeys3);
        },
        refreshPage: function () {
            var oOriginData = this.getView().getModel("originData").getData();
            var oData = {
                results: []
            };
            for (var i = 0; i < oOriginData.results.length; i++) {
                var oEntry = {};
                oEntry = oOriginData.results[i];
                oData.results.push(oEntry);
            }
            if (window.location.hash.indexOf("single") < 0) {
                for (var i = 0; i < oData.results.length;) {
                    if (oData.results[i].A4ZQM_CP01TS028 !== "质量投诉") {
                        oData.results.splice(i, 1);
                    } else {
                        i++;
                    }
                }
            }
            this.Products = this.groupBy(oData.results, "A4ZQM_CP01TS018");// 产品名称
            if (this.getView().byId("mapTypeId")) {
                this.mapType = this.getView().byId("mapTypeId").getSelectedKey();
            }

            if (this.mapType == "1") {
                for (var i = 0; i < oData.results.length;) {
                    if (oData.results[i].A4ZQM_CP01TS006 === "#") {
                        oData.results.splice(i, 1);
                    } else {
                        i++;
                    }
                }
            } else {
                for (var i = 0; i < oData.results.length;) {
                    if (!this.oPlant[oData.results[i].ZPLANT]) {
                        oData.results.splice(i, 1);
                    } else {
                        oData.results[i].SCDQ = this.oPlant[oData.results[i].ZPLANT].SCDQ;
                        oData.results[i].SCDQ_TXT = this.oPlant[oData.results[i].ZPLANT].SCDQ_TXT;
                        oData.results[i].PROV = this.oPlant[oData.results[i].ZPLANT].PROV;
                        oData.results[i].PROV_TXT = this.oPlant[oData.results[i].ZPLANT].PROV_TXT;
                        oData.results[i].LON = this.oPlant[oData.results[i].ZPLANT].LON; // 经度
                        oData.results[i].LAN = this.oPlant[oData.results[i].ZPLANT].LAN; // 纬度
                        oData.results[i].SYB = this.oPlant[oData.results[i].ZPLANT].SYB.replace(/事业部/, "");
                        i++;
                    }
                }
            }

            if (this.getView().byId("ComplaintId3")) {
                var aNewCKeys1 = this.getView().byId("ComplaintId1").getSelectedKeys();
                var aNewCKeys2 = this.getView().byId("ComplaintId2").getSelectedKeys();
                var aNewCKeys3 = this.getView().byId("ComplaintId3").getSelectedKeys();

                var oProduct = this.getView().byId("ProductId");
                var aOldPKeys = oProduct.getSelectedKeys();
                var aNewPKeys = [];
                oProduct.removeAllItems();
                for (var key in this.Products) {
                    oProduct.addItem(new sap.ui.core.Item({
                        key: key,
                        text: key
                    }));
                    if (aOldPKeys.indexOf(key) !== -1) {
                        aNewPKeys.push(key);
                    }
                }
                oProduct.setSelectedKeys(aNewPKeys);
                for (var i = 0; i < oData.results.length;) {
                    if (aNewCKeys1.length !== 0 && aNewCKeys1.indexOf(oData.results[i].A4ZQM_CP01TS028) == -1) //
                    {
                        oData.results.splice(i, 1);
                    } else {
                        i++;
                    }
                }
                for (var i = 0; i < oData.results.length;) {
                    if (aNewCKeys2.length !== 0 && aNewCKeys2.indexOf(oData.results[i].A4ZQM_CP01TS029) == -1) //
                    {
                        oData.results.splice(i, 1);
                    } else {
                        i++;
                    }
                }
                for (var i = 0; i < oData.results.length;) {
                    if (aNewCKeys3.length !== 0 && aNewCKeys3.indexOf(oData.results[i].A4ZQM_CP01TS030) == -1) // 三级分类
                    {
                        oData.results.splice(i, 1);
                    } else {
                        i++;
                    }
                }

                if (this.getView().byId("BU")) {
                    this.SelectBU = this.getView().byId("BU").getSelectedKey();
                }
                for (var i = 0; i < oData.results.length;) {
                    if (this.oPlant[oData.results[i].ZPLANT]) {
                        if (this.SelectBU !== "group" && this.oPlant[oData.results[i].ZPLANT].YT != this.SelectBU) {
                            oData.results.splice(i, 1);
                        } else {
                            i++;
                        }
                    } else {
                        i++;
                    }
                }
                if (this.getView().byId("GeoSelector")) {
                    this.SelectGeo = this.getView().byId("GeoSelector").getSelectedKeys();
                    if (this.SelectGeo.length !== 0) {
                        for (var i = 0; i < oData.results.length;) {
                            if (this.SelectGeo.indexOf(this.oPlant[oData.results[i].ZPLANT].SCDQ) !== -1 && this.oPlant[oData.results[i].ZPLANT].SYB !==
                                undefined) {
                                i++;
                            } else {
                                oData.results.splice(i, 1);
                            }
                        }
                    }
                }
                if (aNewPKeys.length !== 0) {
                    for (var i = 0; i < oData.results.length;) {
                        if (aNewPKeys.indexOf(oData.results[i].A4ZQM_CP01TS018) == -1) // 产品类型一级
                        {
                            oData.results.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                }

                var aPlant = this.getView().byId("PlantSelector").getSelectedKeys();
                if (aPlant.length !== 0) {
                    for (var i = 0; i < oData.results.length;) {
                        if (aPlant.indexOf(oData.results[i].ZPLANT) == -1) // 生产厂
                        {
                            oData.results.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                }
            }
            // alert only, in 10 days.
            var oAlertData = {
                results: []
            };
            for (var i = 0; i < oData.results.length; i++) {
                var oEntry = {};
                oEntry = oData.results[i];
                oAlertData.results.push(oEntry);
            }

            if (this.EndDate) {
                var b = this.EndDate.substring(0, 4) + "-" + this.EndDate.substring(4, 6) + "-" + this.EndDate.substring(6, 8);
                var oStartDate = new Date(new Date(b).valueOf() - Number(that.ComConfig.AlertTime) * 24 * 60 * 60 * 1000);
                var sStartDate = oStartDate.getFullYear() + ("0" + (oStartDate.getMonth() + 1)).slice(-2) + ("0" + oStartDate.getDate()).slice(-2);

                for (var i = 0; i < oAlertData.results.length;) {
                    if (oAlertData.results[i].A4ZQM_CP01TS048 < sStartDate || oAlertData.results[i].A4ZQM_CP01TS048 > this.EndDate) // "A4ZQM_CP01TS048": "20171212289997",
                    {
                        oAlertData.results.splice(i, 1);
                    } else {
                        i++;
                    }
                }
            }

            this.getView().getModel("PageData").setData(oData);

            if (that.mapType == "2") {
                // update alert data
                var FullSYB = this.groupBy(this.oPlant, "SYB");
                this.AllSYB = [];
                for (var key in FullSYB) {
                    this.AllSYB[key.replace(/事业部/, "")] = 0;
                }
                this.FactoryData = {};
                for (var i = 0; i < oAlertData.results.length; i++) {
                    if (oAlertData.results[i].ZPLANT in this.FactoryData) {
                        this.FactoryData[oAlertData.results[i].ZPLANT] += Number(oAlertData.results[i].A00O2TGSVB59E1S8IV0SSUUYUZ_F);// 包数
                    } else {
                        this.FactoryData[oAlertData.results[i].ZPLANT] = Number(oAlertData.results[i].A00O2TGSVB59E1S8IV0SSUUYUZ_F);
                    }
                }
                this.AreaData = this.groupBy(oAlertData.results, "SCDQ_TXT");
                var FactoryStatusData = {}; // alertvlaue
                var aField = [];
                for (var key in that.ComConfig.Field) {
                    if (that.ComConfig.Field[key]) {
                        aField.push(key);
                    }
                }

                // aField = ["ZPLANT", "A4ZQM_CP01TS020", "A4ZQM_CP01TS029", "A4ZQM_CP01TS018"];
                for (var i = 0; i < oAlertData.results.length; i++) {
                    if (FactoryStatusData[oAlertData.results[i].ZPLANT]) {
                        for (var x in FactoryStatusData[oAlertData.results[i].ZPLANT]) {
                            if (x !== "AlertValue" && that.compare(oAlertData.results[i], FactoryStatusData[oAlertData.results[i].ZPLANT][x], aField)) {
                                FactoryStatusData[oAlertData.results[i].ZPLANT][x].AlertValue++;
                                if (FactoryStatusData[oAlertData.results[i].ZPLANT].AlertValue < FactoryStatusData[oAlertData.results[i].ZPLANT][x].AlertValue) {
                                    FactoryStatusData[oAlertData.results[i].ZPLANT].AlertValue = FactoryStatusData[oAlertData.results[i].ZPLANT][x].AlertValue;
                                }
                            }
                        }
                    } else {
                        FactoryStatusData[oAlertData.results[i].ZPLANT] = { AlertValue: 1 };
                        FactoryStatusData[oAlertData.results[i].ZPLANT][oAlertData.results[i][aField[0]]] = { AlertValue: 1 };
                        for (var key in aField) {
                            FactoryStatusData[oAlertData.results[i].ZPLANT][oAlertData.results[i][aField[0]]][aField[key]] = oAlertData.results[i][aField[key]];
                        }
                    }
                }
                var EnrichFactoryData = [];
                for (var key in this.oPlant) {
                    var oEntry = {};
                    oEntry.name = this.oPlant[key].SCDQ_TXT;
                    oEntry.provence = this.oPlant[key].PROV_TXT;
                    oEntry.SYB = this.oPlant[key].SYB.replace(/事业部/, "");
                    oEntry.factory = {
                        name: this.oPlant[key].PLANT_TXT,
                        value: [this.oPlant[key].LON, this.oPlant[key].LAN, 0, 0] // 经度 维度 count alertValue
                    };
                    if (this.oPlant[key].PLANT in this.FactoryData) {
                        oEntry.factory.value[2] = this.FactoryData[this.oPlant[key].PLANT];
                    }
                    if (this.oPlant[key].PLANT_TXT in FactoryStatusData) {
                        oEntry.factory.value[3] = FactoryStatusData[this.oPlant[key].PLANT_TXT].AlertValue;
                    }
                    EnrichFactoryData.push(oEntry);
                }

                var BUArr = [];
                for (var key in this.AllSYB) {
                    var oEntry = {
                        name: "",
                        factory: [],
                        value: []
                    };
                    var LANValue = 0;
                    var LONValue = 0;
                    var TotalValue = 0;
                    var AlertValue = 1; // 1,2,3
                    var count = 0;
                    oEntry.name = key;
                    for (var i = 0; i < EnrichFactoryData.length; i++) {
                        if (key === EnrichFactoryData[i].SYB) {
                            oEntry.factory.push(EnrichFactoryData[i].factory);
                            LONValue += EnrichFactoryData[i].factory.value[0];
                            LANValue += EnrichFactoryData[i].factory.value[1];
                            TotalValue += EnrichFactoryData[i].factory.value[2];
                            AlertValue = AlertValue < EnrichFactoryData[i].factory.value[3] ? EnrichFactoryData[i].factory.value[3] : AlertValue;
                            count++;
                        }
                    }
                    if (count !== 0) {
                        oEntry.value = [LONValue / count, LANValue / count, TotalValue, AlertValue];
                        BUArr.push(oEntry);
                    }
                }
                this.BU = BUArr;
            } else {
                // update hot map data

                // this.ProvValue = this.groupBy(oData.results, "A4ZQM_CP01TS006"); //省 rep => this.NewProvValue
                // this.CityValue = this.groupBy(oData.results, "A4ZQM_CP01TS007"); //市 // 条数
                this.ProvValue = {};
                for (var i = 0; i < oData.results.length; i++) {
                    if (oData.results[i].A4ZQM_CP01TS006 in this.ProvValue) {
                        this.ProvValue[oData.results[i].A4ZQM_CP01TS006] += Number(oData.results[i].A00O2TGSVB59E1S8IV0SSUUYUZ_F);// 包数
                    } else {
                        this.ProvValue[oData.results[i].A4ZQM_CP01TS006] = Number(oData.results[i].A00O2TGSVB59E1S8IV0SSUUYUZ_F);
                    }
                }
                this.CityValue = {};
                for (var i = 0; i < oData.results.length; i++) {
                    if (oData.results[i].A4ZQM_CP01TS007 in this.CityValue) {
                        this.CityValue[oData.results[i].A4ZQM_CP01TS007] += Number(oData.results[i].A00O2TGSVB59E1S8IV0SSUUYUZ_F);// 包数
                    } else {
                        this.CityValue[oData.results[i].A4ZQM_CP01TS007] = Number(oData.results[i].A00O2TGSVB59E1S8IV0SSUUYUZ_F);
                    }
                }

                that.MapValue = {
                    china: []
                };
                var provArr = echarts.getMap('china').geoJson.features;
                this.NewProvValue = {}; // map=》 黑龙江省 = 黑龙江
                for (var i = 0; i < provArr.length; i++) {
                    this.NewProvValue[provArr[i].properties.name] = 0;
                    for (var key in this.ProvValue) {
                        if (key.indexOf(provArr[i].properties.name) !== -1 || provArr[i].properties.name.indexOf(key) !== -1) {
                            this.NewProvValue[provArr[i].properties.name] = this.ProvValue[key];
                            delete this.ProvValue[key];
                            break;
                        }
                    }
                }
                for (var i = 0; i < provArr.length; i++) {
                    if (!echarts.getMap(provArr[i].properties.name)) {
                        continue;
                    }
                    var oProvEntry = {
                        name: provArr[i].properties.name,
                        value: [provArr[i].properties.cp[0], provArr[i].properties.cp[1], this.NewProvValue[provArr[i].properties.name]]

                    };
                    that.MapValue.china.push(oProvEntry);

                    var cityArr = echarts.getMap(provArr[i].properties.name).geoJson.features;
                    that.MapValue[provArr[i].properties.name] = [];
                    for (var j = 0; j < cityArr.length; j++) {
                        var oEntry = {
                            name: cityArr[j].properties.name,
                            value: [cityArr[j].properties.cp[0], cityArr[j].properties.cp[1], 0]
                        };
                        if (cityArr[j].properties.name in this.CityValue) {
                            oEntry.value[2] = this.CityValue[cityArr[j].properties.name];
                        }

                        that.MapValue[provArr[i].properties.name].push(oEntry);
                    }
                }
            }

            if (that.isChinaMap == 'china') {
                that.echartsMap();
            } else {
                that.showProvincesMap(that.isChinaMap);
            }
            this.chengeViz();
        },
        onUpdatePage: function () {
            if (this.StartDate !== this.getView().byId("StartDate").getValue() || this.EndDate !== this.getView().byId("EndDate").getValue() || this.SelectBU != this.getView().byId("BU").getSelectedKey()) {
                this.StartDate = this.getView().byId("StartDate").getValue();
                this.EndDate = this.getView().byId("EndDate").getValue();
                this.SelectBU = this.getView().byId("BU").getSelectedKey();
                this.loadData();
            } else {
                this.getView().setBusy(true);
                this.refreshPage();
                this.getView().setBusy(false);
            }
        },
        compare: function (o1, o2, aField) {
            for (var i in aField) {
                if (o1[aField[i]] !== o2[aField[i]]) {
                    return false;
                }
            }
            return true;
        },
        onAfterRendering: function () {
            that = this;
            setTimeout(function () {
                var h1 = $('#' + that.createId('idPage2')).height();
                var h2 = $('#' + that.createId('idPage2') + " .sapUiHLayout").height();
                var h3 = (window.location.hash.indexOf("single") > 0 ? 100 : 0);
                $('#' + that.id).outerHeight(h1 - h2 - h3 - 6);
            }, 1500);
            if (!this.bRendered) {
                this.bRendered = true;
                this.loadData();
            }

            // setTimeout(function() {
            //  that.refreshPage();
            // }, 300000);

            if (that.resizeEventId) {
                sap.ui.core.ResizeHandler.deregister(that.resizeEventId);
            }

            that.resizeEventId = sap.ui.core.ResizeHandler.register($('#' + that.id)[0], function () {
                setTimeout(function () {
                    if (!that.myChart) return;
                    that.myChart.resize();
                    /* that.myChart.setOption({
                      geo: {
                        center: null,
                        zoom: 1
                      },
                      series: [{
                        center: null,
                        zoom: 1
                      }]
                    }); */
                }, 0);
            });
        },
        groupBy: function (data, field) {
            var res = {};
            for (var i in data) {
                if (data[i][field] in res) {
                    res[data[i][field]]++;
                } else {
                    res[data[i][field]] = 1;
                }
            }
            return res;
        },
        initVizChart: function () {
            var oProperties = {
                general: { // 整个vizFrame区域
                    background: {
                        color: "transparent"
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    },
                    color: "#757F89",
                    label: {
                        style: { // 分类标签字体的样式
                            color: "#FFFFFF" // "#C3CED9"
                        }
                    }
                    // 分类轴线及轴线的刻度颜色，还可用颜色的英文单词
                },
                valueAxis: {
                    label: {
                        style: { // 分类标签字体的样式
                            color: "#FFFFFF" // "#C3CED9"
                        }
                    },
                    title: {
                        visible: false
                    }
                },
                valueAxis2: {
                    label: {
                        style: { // 分类标签字体的样式
                            color: "#FFFFFF" // "#C3CED9"
                        }
                    },
                    title: {
                        visible: false
                    }
                },
                legend: {
                    isScrollable: false,
                    label: {
                        // 图例标签字体样式
                        style: {
                            color: "#FFFFFF" // "#C3CED9"
                        }
                    },
                    visible: false
                },
                legendGroup: {
                    layout: {
                        alignment: "center",
                        position: "right"
                    },
                    visible: false
                },
                plotArea: {
                    isFixedDataPointSize: false,
                    // 设置成true，会有滚动轴
                    background: {
                        color: "transparent" // 矩形区域的背景色
                    },
                    dataLabel: {
                        style: {
                            // 数值的字体样式
                            color: "#FFFFFF" // "#C3CED9"
                        },
                        visible: true,
                        position: "outside"
                    },
                    dataPoint: {
                        savingMode: true,
                        stroke: { // bar边框颜色/是否可见
                            color: "#000000",
                            visible: false
                        }
                    },
                    gridline: {
                        // 矩形区域中的网格线
                        size: 0, // 网格线的宽度
                        color: "#757F89"
                    },
                    dataPointSize: { // 只有当isFixedDataPointSize=true时，可调整bar的宽度;当isFixedDataPointSize=false时该属性不起作用
                        max: 25,
                        min: 5
                    },
                    dataShape: {
                        primaryAxis: ["bar", "bar", "bar", "bar", "bar"],
                        secondaryAxis: ["line", "line", "line"]
                    },
                    primaryValuesColorPalette: ["#748CB2", "#9CC677", "#EACF5E", "#F9AD79", "#D16A7C", "#8873A2", "#3A95B3", "#B6D949", "#FDD36C",
                        "#F47958", "#A65084", "#0063B1", "#0DA841", "#FCB71D", "#F05620", "#B22D6E", "#3C368E", "#8FB2CF", "#95D4AB", "#EAE98F",
                        "#F9BE92", "#EC9A99", "#BC98BD", "#1EB7B2", "#73C03C", "#F48323", "#EB271B", "#D9B5CA", "#AED1DA", "#DFECB2", "#FCDAB0",
                        "#F5BCB4"
                    ]
                },
                interaction: {
                    selectability: {
                        axisLabelSelection: true, // 通过点击分类标签是否可以选择
                        legendSelection: true, // 通过点击图例是否可以选择
                        mode: "SINGLE", //
                        /* 可选值:INCLUSIVE, EXCLUSIVE(单一的选中值方式，点击分类标签/点击图例/点击数值点(marker)),
                        SINGLE(只能选中一个值通过，通过点击分类标签和点击图例选中功能不可用),
                        MULTIPLE, NONE(不能选中值) */
                        plotLassoSelection: true,
                        plotStdSelection: true
                    }
                },
                title: {
                    alignment: "center",
                    text: "投诉率前10名市场",
                    style: {
                        // 标题的字体样式
                        color: "#FFFFFF", // "#C3CED9",
                        fontFamily: "'Open Sans', Arial, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                    visible: true
                }
            };
            var oViz1 = this.getView().byId("VizFrame1");
            oViz1.setVizProperties(oProperties);
            if (this.getView().byId("VizFrame2")) {
                var oViz2 = this.getView().byId("VizFrame2");
                var oViz3 = this.getView().byId("VizFrame3");
                var oViz4 = this.getView().byId("VizFrame4");
                // oProperties.title.text = "投诉率前10名工厂";
                oViz2.setVizProperties(oProperties);
                // oProperties.title.text = "投诉率前10名产品";
                oViz3.setVizProperties(oProperties);
                // oProperties.title.text = "投诉率前10名类型";
                oViz4.setVizProperties(oProperties);
            }
        },
        initCustomFormat: function () {
            CustomerFormat.registerCustomFormat();
        },
        chengeViz: function () {
            if (that.calType == "2") {
                this.getView().byId("VizFrame1").setVizProperties({
                    title: {
                        text: "投诉率前10名市场（ppm）"
                    }
                });
                if (this.getView().byId("VizFrame2")) {
                    this.getView().byId("VizFrame2").setVizProperties({
                        title: {
                            text: "投诉率前10名工厂（ppm）"
                        }
                    });
                    this.getView().byId("VizFrame3").setVizProperties({
                        title: {
                            text: "投诉率前10名产品（ppm）"
                        }
                    });
                    this.getView().byId("VizFrame4").setVizProperties({
                        title: {
                            text: "投诉率前10名类型（ppm）"
                        }
                    });
                }
            } else {
                this.getView().byId("VizFrame1").setVizProperties({
                    title: {
                        text: "投诉量前10名市场（包数）"
                    }
                });
                if (this.getView().byId("VizFrame2")) {
                    this.getView().byId("VizFrame2").setVizProperties({
                        title: {
                            text: "投诉量前10名工厂（包数）"
                        }
                    });
                    this.getView().byId("VizFrame3").setVizProperties({
                        title: {
                            text: "投诉量前10名产品（包数）"
                        }
                    });
                    this.getView().byId("VizFrame4").setVizProperties({
                        title: {
                            text: "投诉量前10名类型（包数）"
                        }
                    });
                }
            }
            var aData = this.getView().getModel("PageData").getData().results;
            var res1 = {};

            var res2 = {};

            var res3 = {};

            var res4 = {};

            var ChartData = {
                results1: [], // 市场 省 "6" 、市  "7"
                results2: [], // 工厂, "20" 生产厂
                results3: [], // 产品 ,"15" 产品类型一级
                results4: [] // 投诉类型,  "27" 一级分类
            };

            if (that.oPercentData && that.oPercentData.MAT) {
                for (var i = 0; i < aData.length; i++) {
                    for (var j = 0; j < that.oPercentData.MAT.length; j++) {
                        if (that.oPercentData.MAT[j].ZMATERIAL === aData[i].ZMATERIAL) {
                            that.oPercentData.MAT[j].A4ZQM_CP01TS018 = aData[i].A4ZQM_CP01TS018;
                            break;
                        }
                    }
                    for (var k = 0; k < that.oPercentData.PrvMAT.length; k++) {
                        if (that.oPercentData.PrvMAT[k].ZMATERIAL === aData[i].ZMATERIAL && that.oPercentData.PrvMAT[k].A4ZQM_CP01TS006 === aData[i].A4ZQM_CP01TS006) {
                            that.oPercentData.PrvMAT[k].A4ZQM_CP01TS018 = aData[i].A4ZQM_CP01TS018;
                            break;
                        }
                    }
                }
                var MATSales = {};
                for (var i = 0; i < that.oPercentData.MAT.length; i++) {
                    if (that.oPercentData.MAT[i].A4ZQM_CP01TS018) {
                        if (that.oPercentData.MAT[i].A4ZQM_CP01TS018 in MATSales) {
                            MATSales[that.oPercentData.MAT[i].A4ZQM_CP01TS018] += Number(that.oPercentData.MAT[i].A00O2TGSVB59CBOEK1T2YBR5ZA);
                        } else {
                            MATSales[that.oPercentData.MAT[i].A4ZQM_CP01TS018] = Number(that.oPercentData.MAT[i].A00O2TGSVB59CBOEK1T2YBR5ZA);
                        }
                    }
                }
                var PrvMatSales = {};
                for (var i = 0; i < that.oPercentData.PrvMAT.length; i++) {
                    if (that.oPercentData.PrvMAT[i].A4ZQM_CP01TS018) {
                        if (that.oPercentData.PrvMAT[i].A4ZQM_CP01TS006 in PrvMatSales) {
                            if (that.oPercentData.PrvMAT[i].A4ZQM_CP01TS018 in PrvMatSales[that.oPercentData.PrvMAT[i].A4ZQM_CP01TS006]) {
                                PrvMatSales[that.oPercentData.PrvMAT[i].A4ZQM_CP01TS006][that.oPercentData.PrvMAT[i].A4ZQM_CP01TS018] += Number(that.oPercentData.PrvMAT[i].A00O2TGSVB59CBOEK1T2YBR5ZA);
                            } else {
                                PrvMatSales[that.oPercentData.PrvMAT[i].A4ZQM_CP01TS006][that.oPercentData.PrvMAT[i].A4ZQM_CP01TS018] = Number(that.oPercentData.PrvMAT[i].A00O2TGSVB59CBOEK1T2YBR5ZA);
                            }
                        } else {
                            PrvMatSales[that.oPercentData.PrvMAT[i].A4ZQM_CP01TS006] = {};
                            PrvMatSales[that.oPercentData.PrvMAT[i].A4ZQM_CP01TS006][that.oPercentData.PrvMAT[i].A4ZQM_CP01TS018] = Number(that.oPercentData.PrvMAT[i].A00O2TGSVB59CBOEK1T2YBR5ZA);
                        }
                    }
                }
            }

            if (this.isChinaMap == 'china') {
                // res2 = this.groupBy(aData, "ZPLANT_T"); //生产厂
                // res3 = this.groupBy(aData, "A4ZQM_CP01TS018"); //产品类型一级
                // res4 = this.groupBy(aData, "A4ZQM_CP01TS029"); //二级分类
                for (var i = 0; i < aData.length; i++) {
                    var value = Number(aData[i].A00O2TGSVB59E1S8IV0SSUUYUZ_F);
                    if (aData[i].A4ZQM_CP01TS006 in res1) {
                        res1[aData[i].A4ZQM_CP01TS006] += value;
                    } else {
                        res1[aData[i].A4ZQM_CP01TS006] = value;
                    }
                    if (aData[i].ZPLANT_T in res2) {
                        res2[aData[i].ZPLANT_T] += value;
                    } else {
                        res2[aData[i].ZPLANT_T] = value;
                    }
                    if (aData[i].A4ZQM_CP01TS018 in res3) {
                        res3[aData[i].A4ZQM_CP01TS018] += value;
                    } else {
                        res3[aData[i].A4ZQM_CP01TS018] = value;
                    }
                    if (aData[i].A4ZQM_CP01TS029 in res4) {
                        res4[aData[i].A4ZQM_CP01TS029] += value;
                    } else {
                        res4[aData[i].A4ZQM_CP01TS029] = value;
                    }
                }
            } else {
                if (that.mapType == 2) {
                    for (var i = 0; i < aData.length; i++) {
                        var value = Number(aData[i].A00O2TGSVB59E1S8IV0SSUUYUZ_F);
                        if (aData[i].SYB == this.isChinaMap) {
                            if (aData[i].A4ZQM_CP01TS006 in res1) {
                                res1[aData[i].A4ZQM_CP01TS006] += value;
                            } else {
                                res1[aData[i].A4ZQM_CP01TS006] = value;
                            }
                            if (aData[i].ZPLANT_T in res2) {
                                res2[aData[i].ZPLANT_T] += value;
                            } else {
                                res2[aData[i].ZPLANT_T] = value;
                            }
                            if (aData[i].A4ZQM_CP01TS018 in res3) {
                                res3[aData[i].A4ZQM_CP01TS018] += value;
                            } else {
                                res3[aData[i].A4ZQM_CP01TS018] = value;
                            }
                            if (aData[i].A4ZQM_CP01TS029 in res4) {
                                res4[aData[i].A4ZQM_CP01TS029] += value;
                            } else {
                                res4[aData[i].A4ZQM_CP01TS029] = value;
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < aData.length; i++) {
                        var value = Number(aData[i].A00O2TGSVB59E1S8IV0SSUUYUZ_F);
                        if (aData[i].A4ZQM_CP01TS006.indexOf(this.isChinaMap) !== -1) {
                            if (aData[i].A4ZQM_CP01TS007 in res1) {
                                res1[aData[i].A4ZQM_CP01TS007] += value;
                            } else {
                                res1[aData[i].A4ZQM_CP01TS007] = value;
                            }
                            if (aData[i].ZPLANT_T in res2) {
                                res2[aData[i].ZPLANT_T] += value;
                            } else {
                                res2[aData[i].ZPLANT_T] = value;
                            }
                            if (aData[i].A4ZQM_CP01TS018 in res3) {
                                res3[aData[i].A4ZQM_CP01TS018] += value;
                            } else {
                                res3[aData[i].A4ZQM_CP01TS018] = value;
                            }
                            if (aData[i].A4ZQM_CP01TS029 in res4) {
                                res4[aData[i].A4ZQM_CP01TS029] += value;
                            } else {
                                res4[aData[i].A4ZQM_CP01TS029] = value;
                            }
                        }
                    }
                }
            }

            var TotalProdunction = 0;
            var sSYBMat = {};
            if (that.calType == "2" && that.mapType == "2") {
                if (that.isChinaMap == "china") {
                    for (var j = 0; j < that.oPercentData.Plant.length; j++) {
                        TotalProdunction += Number(that.oPercentData.Plant[j].A00O2TGSVB59E1X0IWFANEXLG5);
                    }
                } else {
                    var sFactory = [];
                    for (var i = 0; i < that.BU.length; i++) {
                        if (that.BU[i].name == that.isChinaMap) {
                            for (var k = 0; k < that.BU[i].factory.length; k++) {
                                sFactory.push(that.BU[i].factory[k].name);
                            }
                            break;
                        }
                    }
                    for (var j = 0; j < that.oPercentData.Plant.length; j++) {
                        if (sFactory.indexOf(that.oPercentData.Plant[j].ZPLANT_T) !== -1) {
                            TotalProdunction += Number(that.oPercentData.Plant[j].A00O2TGSVB59E1X0IWFANEXLG5);
                        }
                    }
                }
            }

            for (var key in res1) {
                if (that.calType == "2") {
                    if (that.mapType == "1") {
                        if (that.isChinaMap == 'china') {
                            if (that.oPercentData.PROV.length) {
                                for (var j = 0; j < that.oPercentData.PROV.length; j++) {
                                    if (that.oPercentData.PROV[j].A4ZQM_CP01TS006.indexOf(key) !== -1) {
                                        if (Number(that.oPercentData.PROV[j].A00O2TGSVB59CBOEK1T2YBR5ZA) !== 0) {
                                            res1[key] = res1[key] / Number(that.oPercentData.PROV[j].A00O2TGSVB59CBOEK1T2YBR5ZA) * 1000000;
                                            TotalProdunction += Number(that.oPercentData.PROV[j].A00O2TGSVB59CBOEK1T2YBR5ZA);
                                        } else {
                                            res1[key] = 0;
                                        }
                                        break;
                                    }
                                }
                            } else {
                                res1[key] = 0;
                            }
                        } else {
                            if (that.oPercentData.City.length) {
                                for (var j = 0; j < that.oPercentData.City.length; j++) {
                                    if (that.oPercentData.City[j].A4ZQM_CP01TS006.indexOf(that.isChinaMap) !== -1) {
                                        if (Number(that.oPercentData.City[j].A00O2TGSVB59CBOEK1T2YBR5ZA) !== 0) {
                                            res1[key] = res1[key] / Number(that.oPercentData.City[j].A00O2TGSVB59CBOEK1T2YBR5ZA) * 1000000;
                                            TotalProdunction += Number(that.oPercentData.City[j].A00O2TGSVB59CBOEK1T2YBR5ZA);
                                        } else {
                                            res1[key] = 0;
                                        }
                                        break;
                                    }
                                }
                            } else {
                                res1[key] = 0;
                            }
                        }
                    } else {
                        if (TotalProdunction !== 0) {
                            res1[key] = res1[key] / TotalProdunction * 1000000;
                        } else {
                            res1[key] = 0;
                        }
                    }

                    ChartData.results1.push({
                        market: key,
                        value: Number(Number(res1[key]).toFixed(3))
                    });
                } else {
                    ChartData.results1.push({
                        market: key,
                        value: res1[key]
                    });
                }
            }

            for (var key in res2) {
                if (that.calType == "2") {
                    if (that.oPercentData.Plant.length) {
                        for (var j = 0; j < that.oPercentData.Plant.length; j++) {
                            if (that.oPercentData.Plant[j].ZPLANT_T == key) {
                                if (Number(that.oPercentData.Plant[j].A00O2TGSVB59E1X0IWFANEXLG5) !== 0) {
                                    res2[key] = res2[key] / Number(that.oPercentData.Plant[j].A00O2TGSVB59E1X0IWFANEXLG5) * 1000000;
                                } else {
                                    res2[key] = 0;
                                }
                                break;
                            }
                            if (that.oPercentData.Plant.length - 1 === j) { res2[key] = 0; }
                        }
                    } else {
                        res2[key] = 0;
                    }
                    ChartData.results2.push({
                        market: key,
                        value: Number(Number(res2[key]).toFixed(3))
                    });
                } else {
                    ChartData.results2.push({
                        market: key,
                        value: res2[key]
                    });
                }
            }
            for (var key in res3) {
                if (that.calType == "2") {
                    if (that.isChinaMap == 'china') {
                        if (MATSales[key]) {
                            res3[key] = res3[key] / MATSales[key] * 1000000;
                        } else {
                            res3[key] = 0;
                        }
                        ChartData.results3.push({
                            market: key,
                            value: Number(Number(res3[key]).toFixed(3))
                        });
                    } else {
                        if (that.mapType == "1") {
                            for (var j in PrvMatSales) {
                                if (j.indexOf(that.isChinaMap) !== -1) {
                                    if (PrvMatSales[j][key]) {
                                        res3[key] = res3[key] / PrvMatSales[j][key] * 1000000;
                                    } else {
                                        res3[key] = 0;
                                    }
                                    break;
                                }
                            }
                        } else {
                            if (TotalProdunction !== 0) {
                                res3[key] = res3[key] / TotalProdunction * 1000000;
                            } else {
                                res3[key] = 0;
                            }
                        }

                        ChartData.results3.push({
                            market: key,
                            value: Number(Number(res3[key]).toFixed(3))
                        });
                    }
                } else {
                    ChartData.results3.push({
                        market: key,
                        value: res3[key]
                    });
                }
            }

            for (var key in res4) {
                if (that.calType == "2") {
                    if (TotalProdunction !== 0) {
                        res4[key] = res4[key] / TotalProdunction * 1000000;
                    } else {
                        res4[key] = 0;
                    }
                    ChartData.results4.push({
                        market: key,
                        value: Number(Number(res4[key]).toFixed(3))
                    });
                } else {
                    ChartData.results4.push({
                        market: key,
                        value: res4[key]
                    });
                }
            }

            var colId = "value";
            var desc = function (x, y) {
                return (x[colId] < y[colId]) ? 1 : -1;
            };
            ChartData.results1.sort(desc);
            ChartData.results1 = ChartData.results1.slice(0, 10);
            ChartData.results2.sort(desc);
            ChartData.results2 = ChartData.results2.slice(0, 10);
            ChartData.results3.sort(desc);
            ChartData.results3 = ChartData.results3.slice(0, 10);
            ChartData.results4.sort(desc);
            ChartData.results4 = ChartData.results4.slice(0, 10);

            for (var key in ChartData) {
                if (ChartData[key].length === 0) {
                    ChartData[key].push({
                        market: "无数据",
                        value: 0
                    });
                }
            }
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData(ChartData);
            var oViz1 = this.getView().byId("VizFrame1");
            oViz1.setModel(oModel, "ChartData");
            if (this.getView().byId("VizFrame2")) {
                var oViz2 = this.getView().byId("VizFrame2");
                var oViz3 = this.getView().byId("VizFrame3");
                var oViz4 = this.getView().byId("VizFrame4");
                oViz2.setModel(oModel, "ChartData");
                oViz3.setModel(oModel, "ChartData");
                oViz4.setModel(oModel, "ChartData");
            }
        },

        selectData: function (oEvent) {
            if (window.location.hash.indexOf("single") > 0) {
                var x = oEvent.getParameters().data[0].data;
                var filterField = "";
                var filterKey = "";
                var FilterOperator = sap.ui.model.FilterOperator.EQ;
                var aFilters = [];
                if (x.market) {
                    if (that.isChinaMap !== 'china') {
                        if (that.mapType == "2") {
                            aFilters = [
                                new sap.ui.model.Filter("A4ZQM_CP01TS006", sap.ui.model.FilterOperator.Contains, x.market),
                                new sap.ui.model.Filter("SYB", sap.ui.model.FilterOperator.Contains, that.isChinaMap)
                            ];
                        } else {
                            aFilters = [
                                new sap.ui.model.Filter("A4ZQM_CP01TS006", sap.ui.model.FilterOperator.Contains, that.isChinaMap),
                                new sap.ui.model.Filter("A4ZQM_CP01TS007", sap.ui.model.FilterOperator.Contains, x.market)
                            ];
                        }
                    } else {
                        aFilters = [
                            new sap.ui.model.Filter("A4ZQM_CP01TS006", sap.ui.model.FilterOperator.Contains, x.market)
                        ];
                    }
                } else if (x.plant) {
                    filterField = "ZPLANT_T";
                    if (that.isChinaMap !== 'china') {
                        if (that.mapType == "2") {
                            aFilters = [
                                new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, x.plant),
                                new sap.ui.model.Filter("SYB", sap.ui.model.FilterOperator.EQ, that.isChinaMap)
                            ];
                        } else {
                            aFilters = [
                                new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, x.plant),
                                new sap.ui.model.Filter("A4ZQM_CP01TS006", sap.ui.model.FilterOperator.Contains, that.isChinaMap)
                            ];
                        }
                    } else {
                        aFilters = [
                            new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, x.plant)
                        ];
                    }
                } else if (x.product) {
                    filterField = "A4ZQM_CP01TS018";

                    if (that.isChinaMap !== 'china') {
                        if (that.mapType == "2") {
                            aFilters = [
                                new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, x.product),
                                new sap.ui.model.Filter("SYB", sap.ui.model.FilterOperator.EQ, that.isChinaMap)
                            ];
                        } else {
                            aFilters = [
                                new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, x.product),
                                new sap.ui.model.Filter("A4ZQM_CP01TS006", sap.ui.model.FilterOperator.Contains, that.isChinaMap)
                            ];
                        }
                    } else {
                        aFilters = [
                            new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, x.product)
                        ];
                    }
                } else if (x.category) {
                    filterField = "A4ZQM_CP01TS029";
                    if (that.isChinaMap !== 'china') {
                        if (that.mapType == "2") {
                            aFilters = [
                                new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, x.category),
                                new sap.ui.model.Filter("SYB", sap.ui.model.FilterOperator.EQ, that.isChinaMap)
                            ];
                        } else {
                            aFilters = [
                                new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, x.category),
                                new sap.ui.model.Filter("A4ZQM_CP01TS006", sap.ui.model.FilterOperator.Contains, that.isChinaMap)
                            ];
                        }
                    } else {
                        aFilters = [
                            new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, x.category)
                        ];
                    }
                }
                var params = {
                    name: filterKey,
                    filters: aFilters
                };
                that.popOverTable(params);
            }
        },
        echartsMap: function () {
            that.isChinaMap = 'china';
            this.myChart = echarts.init($('#' + that.id)[0]);
            that.chinaOption = {
                backgroundColor: "transparent", // '#021133', //1F2525
                title: {
                    text: '市场投诉实时监控总体概况',
                    subtext: '各省市场投诉分布',
                    left: 'center',
                    textStyle: {
                        color: "#FFFFFF", // "#C3CED9",
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    hideDelay: 0,
                    enterable: true,
                    transitionDuration: 0,
                    extraCssText: 'z-index:100',
                    formatter: function (params, ticket, callback) {
                        // 根据业务自己拓展要显示的内容
                        var res = "";
                        var name = params.name;
                        var value = params.value;
                        var ValueType = "投诉包数";
                        if (that.mapType == "2") {
                            ValueType = "近10天投诉包数";
                        } else {
                            ValueType = "投诉包数";
                        }
                        if (that.calType == "2") {
                            ValueType = "投诉率(ppm)";
                        }
                        if (value) {
                            if (value[2] !== undefined) {
                                res = "<span '>" + name + "</span><br/>" + ValueType + "：" + Number(Number(value[2]).toFixed(3)) + "</span>";
                            } else {
                                res = "<span '>" + name + "</span><br/>" + ValueType + "：" + Number(Number(value).toFixed(3)) + "</span>";
                            }
                            return res;
                        }
                    }
                },
                visualMap: [{ // 图例值控制
                    min: 0,
                    max: 100,
                    calculable: true,
                    color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
                    text: ['投诉量高', '投诉量低'],
                    textStyle: {
                        color: '#fff'
                    },
                    seriesIndex: 0
                }],
                series: [{
                    coordinateSystem: 'geo',
                    zoom: 1.2,
                    center: null,
                    name: '中国',
                    map: 'china',
                    type: 'map',
                    roam: true,
                    selectedMode: 'single',
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: 'aqua', // 地图背景色
                            borderColor: '#5CBAE6' // 省市边界线
                        },
                        emphasis: {
                            areaColor: 'rgba(0,107,255,1)'
                        }
                    },
                    data: [],
                    scaleLimit: {
                        min: 1,
                        max: 15
                    },
                    animation: true,
                    animationDurationUpdate: 756,
                    animationEasing: 'cubicOut'
                }
                ]
            };
            that.loadMap(that.chinaOption);
        },
        checkClosePos: function (params) {
            var prov = params.name;
            var x = params.event.offsetX;
            var y = params.event.offsetY;
            var oIdList = this.myChart.getModel().getSeries()[0].getData()._idList;
            var oLayoutList = this.myChart.getModel().getSeries()[0].getData()._itemLayouts;
            var iMin = 400;
            var sMin = "";
            var iDis = 0;
            for (var i = 0; i < oLayoutList.length; i++) {
                iDis = (oLayoutList[i][0] - x) * (oLayoutList[i][0] - x) + (oLayoutList[i][1] - y) * (oLayoutList[i][1] - y);
                if (iDis < iMin) {
                    sMin = oIdList[i];
                }
            }
            if (sMin) {
                params.name = sMin;
                params.data = {
                    name: sMin
                };
                return true;
            } else {
                return false;
            }
        },
        loadMap: function (option) {
            var MapMin = 0; var MapMax = 10;

            if (that.mapType == "2") {
                var rateMockData = [];
                if (that.isChinaMap === 'china') {
                    for (var i = 0; i < that.BU.length; i++) {
                        var itemColor = '#2ae379';
                        if (that.BU[i].value[3] > that.ComConfig.RedNo) { itemColor = '#ff3333'; } else {
                            itemColor = '#2ae379';
                        }
                        var oEntry = {
                            name: that.BU[i].name,
                            value: that.BU[i].value,
                            itemStyle: {
                                normal: {
                                    color: itemColor,
                                    shadowBlur: 10,
                                    shadowColor: itemColor
                                }
                            }

                        };
                        if (MapMin > that.BU[i].value[2]) {
                            MapMin = that.BU[i].value[2];
                        }
                        if (MapMax < that.BU[i].value[2]) {
                            MapMax = that.BU[i].value[2];
                        }
                        rateMockData.push(oEntry);
                    }
                    if (that.calType == "2") {
                        // add totalProduct into BU
                        var TotalSYB = {};
                        for (var j = 0; j < that.oPercentData.Plant.length; j++) {
                            if (this.oPlant[that.oPercentData.Plant[j].ZPLANT]) {
                                if (this.oPlant[that.oPercentData.Plant[j].ZPLANT].SYB.replace(/事业部/, "") in TotalSYB) {
                                    TotalSYB[this.oPlant[that.oPercentData.Plant[j].ZPLANT].SYB.replace(/事业部/, "")] += Number(that.oPercentData.Plant[j].A00O2TGSVB59E1X0IWFANEXLG5);
                                } else {
                                    TotalSYB[this.oPlant[that.oPercentData.Plant[j].ZPLANT].SYB.replace(/事业部/, "")] = 0;
                                }
                            }
                        }
                        for (var k = 0; k < rateMockData.length; k++) {
                            if (rateMockData[k].name in TotalSYB && TotalSYB[rateMockData[k].name]) {
                                rateMockData[k].value[2] = rateMockData[k].value[2] / TotalSYB[rateMockData[k].name] * 1000000;
                            } else {
                                rateMockData[k].value[2] = 0;
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < that.BU.length; i++) {
                        if (that.BU[i].name === that.isChinaMap) {
                            for (var j = 0; j < that.BU[i].factory.length; j++) {
                                var itemColor = '#2ae379';
                                if (that.BU[i].value[3] > that.ComConfig.RedNo) { itemColor = '#ff3333'; } else {
                                    itemColor = '#2ae379';
                                }
                                var oEntry = {
                                    name: that.BU[i].factory[j].name,
                                    value: that.BU[i].factory[j].value,
                                    itemStyle: {
                                        normal: {
                                            color: itemColor,
                                            shadowBlur: 10,
                                            shadowColor: itemColor
                                        }
                                    }

                                };
                                if (MapMin > that.BU[i].factory[j].value[2]) {
                                    MapMin = that.BU[i].factory[j].value[2];
                                }
                                if (MapMax < that.BU[i].factory[j].value[2]) {
                                    MapMax = that.BU[i].factory[j].value[2];
                                }
                                rateMockData.push(oEntry);
                            }
                            break;
                        }
                    }
                    if (that.calType == "2") {
                        // add totalProduct into BU
                        var TotalPlant = {};
                        for (var j = 0; j < that.oPercentData.Plant.length; j++) {
                            TotalPlant[that.oPercentData.Plant[j].ZPLANT_T] = Number(that.oPercentData.Plant[j].A00O2TGSVB59E1X0IWFANEXLG5);
                        }
                        for (var k = 0; k < rateMockData.length; k++) {
                            if (rateMockData[k].name in TotalPlant && TotalPlant[rateMockData[k].name]) {
                                rateMockData[k].value[2] = rateMockData[k].value[2] / TotalPlant[rateMockData[k].name] * 1000000;
                            } else {
                                rateMockData[k].value[2] = 0;
                            }
                        }
                    }
                }

                var AlertSeries = {
                    zoom: 1,
                    center: null,
                    name: '增长率',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    // showEffectOn: 'render',
                    selectedMode: 'single',
                    hoverAnimation: true,
                    rippleEffect: {
                        period: 4, // 动画时间，值越小速度越快
                        brushType: 'stroke', // 波纹绘制方式 stroke, fill
                        scale: 4 // 波纹圆环最大限制，值越大波纹越大
                    },
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                        normal: {
                            color: '#fac364',
                            formatter: '{b}',
                            position: 'right',
                            show: true,
                            textStyle: {
                                fontSize: 10
                            }
                        }
                    },

                    data: rateMockData,
                    animation: true,
                    animationDurationUpdate: 756,
                    animationEasing: 'cubicOut',
                    animationEasingUpdate: 'quinticInOut',
                    z: 3
                };
                option.geo = {
                    map: that.isChinaMap,
                    zoom: 1,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true, // 是否允许缩放
                    layoutCenter: ['50%', '53%'], // 地图位置
                    layoutSize: "108%",
                    itemStyle: {
                        normal: {
                            areaColor: '#327ABA', // 地图背景色
                            borderColor: '#5CBAE6' // 省市边界线
                        },
                        emphasis: {
                            areaColor: 'rgba(0,107,255,1)'
                        }
                    },
                    scaleLimit: {
                        min: 1,
                        max: 15
                    }
                };
                option.series[0] = AlertSeries;
                option.visualMap = [];
            } else {
                var HotValueArr = [];
                for (var i = 0; i < that.MapValue[that.isChinaMap].length; i++) {
                    HotValueArr.push({
                        name: that.MapValue[that.isChinaMap][i].name,
                        value: that.MapValue[that.isChinaMap][i].value[2]
                    });
                    if (MapMin > that.MapValue[that.isChinaMap][i].value[2]) {
                        MapMin = that.MapValue[that.isChinaMap][i].value[2];
                    }
                    if (MapMax < that.MapValue[that.isChinaMap][i].value[2]) {
                        MapMax = that.MapValue[that.isChinaMap][i].value[2];
                    }
                }

                if (that.calType == "2") {
                    MapMin = 0, MapMax = 1;
                    for (var i = 0; i < HotValueArr.length; i++) {
                        if (that.oPercentData.PROV.length) {
                            if (that.isChinaMap == 'china') {
                                for (var j = 0; j < that.oPercentData.PROV.length; j++) {
                                    if (that.oPercentData.PROV[j].A4ZQM_CP01TS006.indexOf(HotValueArr[i].name) !== -1) {
                                        if (Number(that.oPercentData.PROV[j].A00O2TGSVB59CBOEK1T2YBR5ZA) !== 0) {
                                            HotValueArr[i].value = HotValueArr[i].value / Number(that.oPercentData.PROV[j].A00O2TGSVB59CBOEK1T2YBR5ZA) * 1000000;
                                        } else {
                                            HotValueArr[i].value = 0;
                                        }
                                        break;
                                    }
                                    if (that.oPercentData.PROV.length - 1 === j) { HotValueArr[i].value = 0; }
                                }
                            } else {
                                for (var j = 0; j < that.oPercentData.City.length; j++) {
                                    if (that.oPercentData.City[j].A4ZQM_CP01TS006.indexOf(that.isChinaMap) !== -1) {
                                        if (Number(that.oPercentData.City[j].A00O2TGSVB59CBOEK1T2YBR5ZA) !== 0) {
                                            HotValueArr[i].value = HotValueArr[i].value / Number(that.oPercentData.City[j].A00O2TGSVB59CBOEK1T2YBR5ZA) * 1000000;
                                        } else {
                                            HotValueArr[i].value = 0;
                                        }
                                        break;
                                    }
                                    if (that.oPercentData.City.length - 1 === j) { HotValueArr[i].value = 0; }
                                }
                            }
                        } else {
                            HotValueArr[i].value = 0;
                        }

                        if (MapMin > HotValueArr[i].value) {
                            MapMin = HotValueArr[i].value;
                        }
                        if (MapMax < HotValueArr[i].value) {
                            MapMax = HotValueArr[i].value;
                        }
                    }
                    option.visualMap[0].text = ['投诉率（PPm）高', '投诉率低'];
                }

                option.visualMap[0].min = MapMin;
                option.visualMap[0].max = MapMax;
                option.series[0].data = HotValueArr;
            }

            // option.series = [option.series[0],AlertSeries];

            that.myChart.clear();
            that.myChart.setOption(option);
            // mapselectchanged

            that.myChart.on('click', function (params) {
                if (window.location.hash.indexOf("single") < 0) {
                    that.getRouter().navTo('single', {
                        appId: 'Complaints',
                        viewIndex: '1'
                    });
                } else {
                    if (that.mapType == 1) {
                        if (that.isChinaMap !== 'china' && params.name !== that.isChinaMap) {
                            var filterField = "A4ZQM_CP01TS007";
                            if (that.mapType == "2") {
                                filterField = "ZPLANT_T";
                            }
                            var tableParam = {
                                name: params.name,
                                filters: [
                                    new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, params.name)
                                ]
                            };
                            that.popOverTable(tableParam);
                        } else {
                            that.myChart.off('click'); // 谨防重复注册事件
                            that.getView().byId("mapTypeId").setVisible(false);
                            that.isChinaMap = params.name;
                            that.showProvincesMap(that.isChinaMap);
                            that.chengeViz();
                        }
                    } else if (that.mapType == 2 && params.componentType == "series" || that.checkClosePos(params)) {
                        if (that.isChinaMap !== 'china' && params.name !== that.isChinaMap) {
                            var filterField = "A4ZQM_CP01TS007";
                            if (that.mapType == "2") {
                                filterField = "ZPLANT_T";
                            }
                            var tableParam = {
                                name: params.name,
                                filters: [
                                    new sap.ui.model.Filter(filterField, sap.ui.model.FilterOperator.EQ, params.name)
                                ]
                            };
                            that.popOverTable(tableParam);
                        } else {
                            if (that.checkClosePos(params) && that.isChinaMap === 'china') {
                                that.myChart.off('click'); // 谨防重复注册事件
                                that.getView().byId("mapTypeId").setVisible(false);
                                that.isChinaMap = params.name;
                                that.showProvincesMap(that.isChinaMap);
                                that.chengeViz();
                            }
                        }
                    }
                }
            });
            // setTimeout(function() {
            //  that.myChart.resize();
            // }, 2000);
        },
        popOverTable: function (params) {
            var that = this;
            if (!that._oTable) {
                that._oTable = sap.ui.xmlfragment("sap.vo.mengniu.controller.blocks.ComplaintsFragment", that);
            }
            if (!that._oDialog) {
                that._oDialog = new sap.m.Dialog({
                    title: params.name,
                    content: [that._oTable]
                });
                that._oDialog._header.mAggregations.contentRight = [new sap.m.Button({
                    icon: "sap-icon://download",
                    press: function () {
                        that.onDownloadExcel(that._oTable);
                    }
                }), new sap.m.Button({
                    icon: "sap-icon://undo",
                    press: function () {
                        that._oDialog.close();
                    }
                })];
            }
            that.getView().addDependent(that._oDialog);
            that._oDialog.open();
            that._oDialog.setTitle(params.name);
            that._oTable.setModel(that.getView().getModel("PageData"));
            // var filter = new sap.ui.model.Filter("A4ZQM_CP01TS007", sap.ui.model.FilterOperator.EQ, params.name);
            that._oTable.getBinding("rows").filter(params.filters);
        },
        showProvincesMap: function (inputProvinces) {
            that.isChinaMap = inputProvinces;
            // console.log(params);
            // 全国地图触发 mapselectchanged 事件后，重置地图中心位置
            that.chinaOption.series[0].center = null;
            // chinaOption.series[0].zoom = 1;
            // that.myChart.setOption(that.chinaOption);
            // 通过地图实例的 setOption 方法重置地图位置，这样可以避免接下来载入地图时导致位置偏移

            that.chinaOption.title.subtext = inputProvinces + '市场投诉率分布';
            // that.chinaOption.geo.map = paramsname;
            that.chinaOption.series[0].map = inputProvinces;
            that.loadMap(that.chinaOption);
            if (that.getView().byId('NavToMapButton').getVisible() === false) {
                that.getView().byId('NavToMapButton').setVisible(true);
            }
        },
        onNavToMap: function (oEvent) {
            this.isChinaMap = 'china';
            this.echartsMap();
            this.chengeViz();
            this.getView().byId('NavToMapButton').setVisible(false);
            this.getView().byId("mapTypeId").setVisible(true);
        },
        onTimeFormat: function (sText) {
            if (sText && typeof sText === "string") {
                return sText.substring(0, 8);
            } else {
                return sText;
            }
        },
        onDownLoad: function () {
            var that = this;
            var sData = this.getView().getModel("originData").getData().results;
            var tmpDown, type;
            var keyMap = []; // 获取键
            for (var k in sData[0]) {
                if (k !== "__metadata") {
                    keyMap.push(k);
                }
            }
            var HeadStr = "{";
            for (var ii = 0; ii < keyMap.length; ii++) {
                if (ii === keyMap.length - 1) {
                    HeadStr += '"' + keyMap[ii] + '"' + ":" + '"' + keyMap[ii] + '"' + "}";
                } else {
                    HeadStr += '"' + keyMap[ii] + '"' + ":" + '"' + keyMap[ii] + '"' + ",";
                }
            }
            var HeadObj = JSON.parse(HeadStr);
            sData.unshift(HeadObj);
            var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
                return target;
            };
            var tmpdata = []; // 用来保存转换好的json
            sData.map(function (v, i) {
                return keyMap.map(function (k, j) {
                    return _extends({}, {
                        v: v[k],
                        position: (j > 25 ? that.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
                    });
                });
            }).reduce(function (prev, next) {
                return prev.concat(next);
            }).forEach(function (v, i) {
                return tmpdata[v.position] = {
                    v: v.v
                };
            });
            var outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
            var tmpWB = {
                SheetNames: ['Sheet1'], // 保存的表标题
                Sheets: {
                    'Sheet1': _extends({}, tmpdata, // 内容
                        {
                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
                        })
                }
            };
            tmpDown = new Blob([that.s2ab(XLSX.write(tmpWB, {
                bookType: type == undefined ? 'xlsx' : type,
                bookSST: false,
                type: 'binary'
            } // 这里的数据是用来定义导出的格式类型
            ))], {
                type: ""
            }); // 创建二进制对象写入转换好的字节流
            saveAs(tmpDown, "样本数据.xlsx");
        }

        /**
         * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
         * (NOT before the first rendering! onInit() is used for that one!).
         * @memberOf sap.vo.mengniu.view.MapE
         */
        //  onBeforeRendering: function() {
        //
        //  },

        /**
         * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
         * This hook is the same one that SAPUI5 controls get after being rendered.
         * @memberOf sap.vo.mengniu.view.MapE
         */

        /**
         * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
         * @memberOf sap.vo.mengniu.view.MapE
         */
        //  onExit: function() {
        //
        //  }

    });
});
