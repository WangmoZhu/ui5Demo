sap.ui.define(
    [
        'jquery.sap.global',
        'sap/m/Label',
        'sap/m/Link',
        'sap/m/MessageToast',
        'sap/m/Text',
        'sap/vo/mengniu/controller/blocks/Formatter',
        'sap/ui/core/Fragment',
        'sap/vo/mengniu/controller/blocks/BlockContentBase.controller',
        'sap/ui/model/json/JSONModel'
    ],
    function (
        jQuery,
        Label,
        Link,
        MessageToast,
        Text,
        Formatter,
        Fragment,
        BlockContentBase,
        JSONModel
    ) {
        'use strict';
        var that;
        return BlockContentBase.extend(
            'sap.vo.mengniu.controller.blocks.FoodSafety',
            {
                // Pull in the table row template fragment, grab
                // a reference to the table, work out the initial crumb path
                // and create the order model, setting it on the view

                onInit: function (oEvent) {
                    this.registerMap = false;
                    this.online = Boolean(sap.ui.getCore().getModel('Online'));
                    this.getView().setModel(
                        new sap.ui.model.json.JSONModel(),
                        'originData'
                    );

                    this.initChart();
                    this.SelectBU = 'group';
                    this.isChinaMap = 'china';
                },
                loadData: function () {
                    var that = this;

                    var oConfig = sap.ui
                        .getCore()
                        .getModel('oModelKPIConfig')
                        .getData();
                    if (!oConfig || !oConfig.FoodSafetyConfig) {
                        setTimeout(function () {
                            that.loadData();
                        }, 500);
                        return;
                    }

                    that.FSConfig = oConfig.FoodSafetyConfig;
                    if (!this.StartDate) {
                        // this.StartDate = this.getDate(that.FSConfig.LeadTime);
                        // this.EndDate = this.getDate();
                        // if (this.getView().byId("StartDate")) {
                        //   this.getView().byId("StartDate").setValue(this.StartDate);
                        //   this.getView().byId("EndDate").setValue(this.EndDate);
                        // }
                        this.StartDate = this.getDate(that.FSConfig.LeadTime);
                        this.EndDate = this.getDate();
                        if (this.getView().byId('StartDate')) {
                            this.getView()
                                .byId('StartDate')
                                .setDateValue(
                                    new Date(
                                        new Date().setDate(
                                            new Date().getDate() -
                                                that.FSConfig.LeadTime
                                        )
                                    )
                                );
                            this.getView()
                                .byId('EndDate')
                                .setDateValue(new Date());
                        }
                    }

                    if (this.getView().byId('StartDate')) {
                        this.StartDate = this.getView()
                            .byId('StartDate')
                            .getValue();
                        this.EndDate = this.getView()
                            .byId('EndDate')
                            .getValue();
                    }
                    if (this.getView().byId('BU')) {
                        this.SelectBU = this.getView()
                            .byId('BU')
                            .getSelectedKey();
                    }
                    if (this.online) {
                        var oPlant = sap.ui
                            .getCore()
                            .getModel('Plant')
                            .getData();
                        if (!oPlant || !oPlant.results) {
                            setTimeout(function () {
                                that.loadData();
                            }, 500);
                            return;
                        }

                        this.oPlant = {};

                        if (this.SelectBU !== 'group') {
                            for (var i in oPlant.results) {
                                if (oPlant.results[i].YT == this.SelectBU) {
                                    this.oPlant[oPlant.results[i].PLANT] =
                                        oPlant.results[i];
                                    this.oPlant[
                                        oPlant.results[i].PLANT
                                    ].LON = Number(
                                        this.oPlant[oPlant.results[i].PLANT].LON
                                    );
                                    this.oPlant[
                                        oPlant.results[i].PLANT
                                    ].LAN = Number(
                                        this.oPlant[oPlant.results[i].PLANT].LAN
                                    );
                                }
                            }
                        } else {
                            for (var i in oPlant.results) {
                                this.oPlant[oPlant.results[i].PLANT] =
                                    oPlant.results[i];
                                this.oPlant[
                                    oPlant.results[i].PLANT
                                ].LON = Number(
                                    this.oPlant[oPlant.results[i].PLANT].LON
                                );
                                this.oPlant[
                                    oPlant.results[i].PLANT
                                ].LAN = Number(
                                    this.oPlant[oPlant.results[i].PLANT].LAN
                                );
                            }
                        }
                        if (this.getView().byId('GeoSelector')) {
                            var oSCDQ = this.getView().byId('GeoSelector');
                            oSCDQ.removeAllItems();
                            this.AllSCDQ = [];
                            for (var key in this.oPlant) {
                                if (
                                    this.AllSCDQ.indexOf(
                                        this.oPlant[key].SCDQ
                                    ) === -1
                                ) {
                                    oSCDQ.addItem(
                                        new sap.ui.core.Item({
                                            key: String(this.oPlant[key].SCDQ),
                                            text: String(
                                                this.oPlant[key].SCDQ_TXT
                                            )
                                        })
                                    );
                                }
                                this.AllSCDQ.push(this.oPlant[key].SCDQ);
                            }
                        }

                        var oModel = sap.ui
                            .getCore()
                            .getModel('ZMN_QM_DASHBOARD');
                        this.getView().setBusy(true);
                        oModel.read('/MessageStatSet', {
                            filters: [
                                new sap.ui.model.Filter(
                                    'STAT_DATE',
                                    'GE',
                                    this.StartDate
                                ),
                                new sap.ui.model.Filter(
                                    'STAT_DATE',
                                    'LE',
                                    this.EndDate
                                )
                            ],
                            success: function (oData) {
                                that.getView().setBusy(false);
                                if (oData && oData.results) {
                                    that.getView()
                                        .getModel('originData')
                                        .setData(oData);
                                    that.refreshPage();
                                }
                            },
                            error: function () {
                                that.getView().setBusy(false);
                            }
                        });
                    } else {
                        this.getView().setModel(
                            new sap.ui.model.json.JSONModel(),
                            'offlinePlant'
                        );
                        this.getView()
                            .getModel('offlinePlant')
                            .loadData('json/plantSet.json', {}, false);

                        this.getView().setModel(
                            new sap.ui.model.json.JSONModel(),
                            'offlineData'
                        );
                        this.getView()
                            .getModel('offlineData')
                            .loadData('json/MessageStatSet.json', {}, false);

                        var oPlant = this.getView()
                            .getModel('offlinePlant')
                            .getData();

                        this.oPlant = {};
                        if (this.SelectBU !== 'group') {
                            for (var i in oPlant.results) {
                                if (oPlant.results[i].YT == this.SelectBU) {
                                    this.oPlant[oPlant.results[i].PLANT] =
                                        oPlant.results[i];
                                    this.oPlant[
                                        oPlant.results[i].PLANT
                                    ].LON = Number(
                                        this.oPlant[oPlant.results[i].PLANT].LON
                                    );
                                    this.oPlant[
                                        oPlant.results[i].PLANT
                                    ].LAN = Number(
                                        this.oPlant[oPlant.results[i].PLANT].LAN
                                    );
                                }
                            }
                        } else {
                            for (var i in oPlant.results) {
                                this.oPlant[oPlant.results[i].PLANT] =
                                    oPlant.results[i];
                                this.oPlant[
                                    oPlant.results[i].PLANT
                                ].LON = Number(
                                    this.oPlant[oPlant.results[i].PLANT].LON
                                );
                                this.oPlant[
                                    oPlant.results[i].PLANT
                                ].LAN = Number(
                                    this.oPlant[oPlant.results[i].PLANT].LAN
                                );
                            }
                        }
                        if (this.getView().byId('GeoSelector')) {
                            var oSCDQ = this.getView().byId('GeoSelector');
                            oSCDQ.removeAllItems();
                            this.AllSCDQ = [];
                            for (var key in this.oPlant) {
                                if (
                                    this.AllSCDQ.indexOf(
                                        this.oPlant[key].SCDQ
                                    ) === -1
                                ) {
                                    oSCDQ.addItem(
                                        new sap.ui.core.Item({
                                            key: String(this.oPlant[key].SCDQ),
                                            text: String(
                                                this.oPlant[key].SCDQ_TXT
                                            )
                                        })
                                    );
                                }
                                this.AllSCDQ.push(this.oPlant[key].SCDQ);
                            }
                        }

                        var oNewData = this.getView()
                            .getModel('offlineData')
                            .getData();
                        var sCurrentDate = '';
                        for (var i = 0; i < oNewData.results.length;) {
                            sCurrentDate = oNewData.results[i].STAT_DATE;
                            if (
                                sCurrentDate > this.EndDate ||
                                sCurrentDate < this.StartDate
                            ) {
                                oNewData.results.splice(i, 1);
                            } else {
                                i++;
                            }
                        }

                        this.getView()
                            .getModel('originData')
                            .setData(oNewData);
                        this.refreshPage();
                    }

                    if (!this.registerMap) {
                        this.registerMap = true;
                        //    var AreaJson = {
                        //  "华北大区": ["北京", "辽宁", "河北", "四川", "内蒙古"],
                        //  "基地大区": ["山西", "内蒙古"],
                        //  "东北大区": ["黑龙江", "内蒙古", "辽宁"],
                        //  "中部大区": ["山西", "江苏", "山东", "河南"],
                        //  "华中大区": ["天津", "内蒙古", "宁夏", "山东", "河南"],
                        //  "华南大区": ["浙江", "安徽", "湖北", "广东"],
                        //  "南部大区": ["广东", "浙江", "安徽", "河南", "湖北"],
                        //  "新疆大区": ["新疆"],
                        //  "生产北区": ["天津", "内蒙古", "山东", "辽宁", "河南", "宁夏"],
                        //  "生产南区": ["安徽", "湖北", "广东", "四川"],
                        //  "西部大区": ["内蒙古", "四川", "云南", "陕西", "宁夏"],
                        //  "鲁冀大区": ["山东"]
                        // };
                        var AreaJson = {};
                        for (var key in this.oPlant) {
                            if (
                                !AreaJson[
                                    this.oPlant[key].SYB.replace(/事业部/, '')
                                ]
                            ) {
                                AreaJson[
                                    this.oPlant[key].SYB.replace(/事业部/, '')
                                ] = [];
                            }
                            var newProv = this.formatProv(
                                this.oPlant[key].PROV_TXT
                            );
                            if (
                                AreaJson[
                                    this.oPlant[key].SYB.replace(/事业部/, '')
                                ].indexOf(newProv) === -1 &&
                                newProv !== undefined
                            ) {
                                AreaJson[
                                    this.oPlant[key].SYB.replace(/事业部/, '')
                                ].push(newProv);
                            }
                        }
                        for (var key in AreaJson) {
                            var Prov = echarts.getMap(AreaJson[key][0]);
                            var SCDQJson = JSON.parse(JSON.stringify(Prov));

                            for (var i = 1; i < AreaJson[key].length; i++) {
                                var ProvNext = echarts.getMap(AreaJson[key][i]);
                                if (ProvNext) {
                                    SCDQJson.geoJson.features = SCDQJson.geoJson.features.concat(
                                        ProvNext.geoJson.features
                                    );
                                }
                            }
                            var SCDQJsonStr = JSON.stringify(SCDQJson.geoJson);
                            echarts.registerMap(key, SCDQJsonStr);
                        }
                    }
                },
                formatProv: function (prov) {
                    var AllArea = [
                        '上海',
                        '浙江',
                        '安徽',
                        '江苏',
                        '北京',
                        '天津',
                        '河北',
                        '广东',
                        '香港',
                        '重庆',
                        '福建',
                        '甘肃',
                        '广西',
                        '贵州',
                        '海南',
                        '黑龙江',
                        '河南',
                        '湖南',
                        '江西',
                        '吉林',
                        '辽宁',
                        '内蒙古',
                        '宁夏',
                        '青海',
                        '山东',
                        '山西',
                        '陕西',
                        '四川',
                        '新疆',
                        '西藏',
                        '云南',
                        '湖北'
                    ];

                    for (var i = 0; i < AllArea.length; i++) {
                        if (prov.indexOf(AllArea[i]) !== -1) {
                            return AllArea[i];
                        }
                    }
                },
                refreshPage: function () {
                    var that = this;
                    var oOriginData = this.getView()
                        .getModel('originData')
                        .getData();
                    var oData = {
                        results: []
                    };
                    for (var i = 0; i < oOriginData.results.length; i++) {
                        var oEntry = {};
                        oEntry = oOriginData.results[i];
                        oData.results.push(oEntry);
                    }

                    for (var i = 0; i < oData.results.length;) {
                        if (this.oPlant[oData.results[i].FAC_CODE]) {
                            if (
                                this.SelectBU !== 'group' &&
                                this.oPlant[oData.results[i].FAC_CODE].YT !=
                                    this.SelectBU
                            ) {
                                oData.results.splice(i, 1);
                            } else {
                                oData.results[i].SCDQ = this.oPlant[
                                    oData.results[i].FAC_CODE
                                ].SCDQ;
                                oData.results[i].SCDQ_TXT = this.oPlant[
                                    oData.results[i].FAC_CODE
                                ].SCDQ_TXT;
                                oData.results[i].PROV = this.oPlant[
                                    oData.results[i].FAC_CODE
                                ].PROV;
                                oData.results[i].PROV_TXT = this.oPlant[
                                    oData.results[i].FAC_CODE
                                ].PROV_TXT;
                                oData.results[i].LON = this.oPlant[
                                    oData.results[i].FAC_CODE
                                ].LON; // 经度
                                oData.results[i].LAN = this.oPlant[
                                    oData.results[i].FAC_CODE
                                ].LAN; // 纬度
                                oData.results[i].SYB = this.oPlant[
                                    oData.results[i].FAC_CODE
                                ].SYB.replace(/事业部/, '');

                                i++;
                            }
                        } else {
                            oData.results.splice(i, 1);
                        }
                    }

                    if (this.getView().byId('GeoSelector')) {
                        this.SelectGeo = this.getView()
                            .byId('GeoSelector')
                            .getSelectedKeys();
                        if (this.SelectGeo.length !== 0) {
                            for (var i = 0; i < oData.results.length;) {
                                if (
                                    this.SelectGeo.indexOf(
                                        this.oPlant[oData.results[i].FAC_CODE]
                                            .SCDQ
                                    ) !== -1 &&
                                    this.oPlant[oData.results[i].FAC_CODE]
                                        .SYB !== undefined
                                ) {
                                    i++;
                                } else {
                                    oData.results.splice(i, 1);
                                }
                            }
                        }
                    }
                    if (this.getView().byId('CategoryId')) {
                        this.SelectCtg = this.getView()
                            .byId('CategoryId')
                            .getSelectedKey();
                        if (this.SelectCtg.length !== 0) {
                            for (var i = 0; i < oData.results.length;) {
                                if (
                                    this.SelectCtg !== '所有种类' &&
                                    this.SelectCtg !== oData.results[i].ATTR9
                                ) {
                                    oData.results.splice(i, 1);
                                } else {
                                    i++;
                                }
                            }
                        }
                    }

                    var FullSYB = this.groupBy(this.oPlant, 'SYB');
                    this.AllSYB = [];
                    for (var key in FullSYB) {
                        this.AllSYB[key.replace(/事业部/, '')] = 0;
                    }

                    this.FactoryData = this.groupBy(oData.results, 'FAC_NAME'); // count
                    this.AreaData = this.groupBy(oData.results, 'SCDQ_TXT');
                    this.SourceData = oData;

                    var FactoryStatusData = {}; // alertvlaue

                    // compare:function(o1, o2, aField){
                    //  for(var i in aField){
                    //    if(o1[aField[i]] !== o2[aField[i]]){
                    //      return false;
                    //    }
                    //  }
                    //  return true;
                    // }
                    var aField = [];
                    for (var key in that.FSConfig.Field) {
                        if (that.FSConfig.Field[key]) {
                            aField.push(key);
                        }
                    }

                    for (var i = 0; i < oData.results.length; i++) {
                        if (FactoryStatusData[oData.results[i].FAC_NAME]) {
                            for (var x in FactoryStatusData[
                                oData.results[i].FAC_NAME
                            ]) {
                                if (
                                    x !== 'AlertValue' &&
                                    that.compare(
                                        oData.results[i],
                                        FactoryStatusData[
                                            oData.results[i].FAC_NAME
                                        ][x],
                                        aField
                                    )
                                ) {
                                    FactoryStatusData[
                                        oData.results[i].FAC_NAME
                                    ][x].AlertValue++;
                                    if (
                                        FactoryStatusData[
                                            oData.results[i].FAC_NAME
                                        ].AlertValue <
                                        FactoryStatusData[
                                            oData.results[i].FAC_NAME
                                        ][x].AlertValue
                                    ) {
                                        FactoryStatusData[
                                            oData.results[i].FAC_NAME
                                        ].AlertValue =
                                            FactoryStatusData[
                                                oData.results[i].FAC_NAME
                                            ][x].AlertValue;
                                    }
                                }
                            }
                        } else {
                            FactoryStatusData[oData.results[i].FAC_NAME] = {
                                AlertValue: 1
                            };
                            FactoryStatusData[oData.results[i].FAC_NAME][
                                oData.results[i][aField[0]]
                            ] = { AlertValue: 1 };
                            for (var key in aField) {
                                FactoryStatusData[oData.results[i].FAC_NAME][
                                    oData.results[i][aField[0]]
                                ][aField[key]] = oData.results[i][aField[key]];
                            }
                        }
                    }
                    // for (var key in this.FactoryData) {
                    //  var count = 0;
                    //  var oEntry = {}; // {SUP_NO:{PG1:1,PG2:2}};
                    //  for (var i = 0; i < oData.results.length; i++)
                    //    if (oData.results[i].FAC_NAME === key) {

                    //    if (oData.results[i][oData.results[i].SUP_NO] in oEntry && oData.results[i][oData.results[i].PG] in oEntry[oData.results[i].SUP_NO]) {
                    //      oEntry[oData.results[i].SUP_NO][oData.results[i].PG]++;
                    //      if (oEntry.AlertValue < oEntry[oData.results[i].SUP_NO][oData.results[i].PG]) {
                    //      // if (oEntry[oData.results[i].SUP_NO][oData.results[i].PG] > 3) {
                    //      //  oEntry.AlertValue = 3;
                    //      // } else {
                    //        oEntry.AlertValue = oEntry[oData.results[i].SUP_NO][oData.results[i].PG];
                    //      //}
                    //      }
                    //    } else {
                    //      oEntry[oData.results[i].SUP_NO] = {};
                    //      oEntry[oData.results[i].SUP_NO][oData.results[i].PG] = 1;
                    //      oEntry.AlertValue = 1;
                    //    }
                    //    }
                    //  FactoryStatusData[key] = oEntry;
                    //   }

                    var EnrichFactoryData = [];
                    for (var key in this.oPlant) {
                        var oEntry = {};
                        oEntry.name = this.oPlant[key].SCDQ_TXT;
                        oEntry.provence = this.oPlant[key].PROV_TXT;
                        oEntry.SYB = this.oPlant[key].SYB.replace(/事业部/, '');
                        oEntry.factory = {
                            name: this.oPlant[key].PLANT_TXT,
                            value: [
                                this.oPlant[key].LON,
                                this.oPlant[key].LAN,
                                0,
                                0
                            ] // 经度 维度 count alertValue
                        };
                        if (this.oPlant[key].PLANT_TXT in this.FactoryData) {
                            oEntry.factory.value[2] = this.FactoryData[
                                this.oPlant[key].PLANT_TXT
                            ];
                        }
                        if (this.oPlant[key].PLANT_TXT in FactoryStatusData) {
                            oEntry.factory.value[3] =
                                FactoryStatusData[
                                    this.oPlant[key].PLANT_TXT
                                ].AlertValue;
                        }
                        EnrichFactoryData.push(oEntry);
                    }

                    var BUArr = [];
                    for (var key in this.AllSYB) {
                        var oEntry = {
                            name: '',
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
                                oEntry.factory.push(
                                    EnrichFactoryData[i].factory
                                );
                                LONValue +=
                                    EnrichFactoryData[i].factory.value[0];
                                LANValue +=
                                    EnrichFactoryData[i].factory.value[1];
                                TotalValue +=
                                    EnrichFactoryData[i].factory.value[2];
                                AlertValue =
                                    AlertValue <
                                    EnrichFactoryData[i].factory.value[3]
                                        ? EnrichFactoryData[i].factory.value[3]
                                        : AlertValue;
                                count++;
                            }
                        }
                        if (count !== 0) {
                            oEntry.value = [
                                LONValue / count,
                                LANValue / count,
                                TotalValue,
                                AlertValue
                            ];
                            BUArr.push(oEntry);
                        }
                    }
                    this.BU = BUArr;

                    if (that.isChinaMap == 'china') {
                        that.echartsMap('group');
                    } else {
                        var newParams = {
                            data: {
                                provence: that.chinaOption.series[0].map,
                                name: that.chinaOption.series[0].map
                            },
                            name: that.chinaOption.series[0].map
                        };
                        that.showProvincesMap(that.chinaOption, newParams);
                    }
                    that.chengeViz();
                },
                onAfterRendering: function () {
                    var that = this;
                    this.id = this.createId('FoodSafetyMap');
                    setTimeout(function () {
                        var h1 = $('#' + that.createId('idPage2')).height();
                        var h2 = $(
                            '#' + that.createId('idPage2') + ' .sapUiHLayout'
                        ).height();
                        var h3 =
                            window.location.hash.indexOf('single') > 0
                                ? 100
                                : 0;
                        $('#' + that.id).outerHeight(h1 - h2 - h3 - 6);
                    }, 1500);

                    if (!this.bRendered) {
                        this.bRendered = true;
                        this.loadData();
                    }

                    // setTimeout(function () {
                    //  if (that.isChinaMap === 'china') {
                    //    that.refreshPage();
                    //  }
                    // }, 300000);
                    if (this.resizeEventId) {
                        sap.ui.core.ResizeHandler.deregister(
                            this.resizeEventId
                        );
                    }
                    this.resizeEventId = sap.ui.core.ResizeHandler.register(
                        $('#' + this.id)[0],
                        function () {
                            setTimeout(function () {
                                if (!that.myChart) return;
                                that.myChart.resize();
                                that.myChart.setOption({
                                    geo: {
                                        center: null,
                                        zoom: 1.2
                                    },
                                    series: [
                                        {
                                            center: null,
                                            zoom: 1.2
                                        }
                                    ]
                                });
                            }, 0);
                        }
                    );
                },
                initChart: function () {
                    var oProperties = {
                        general: {
                            // 整个vizFrame区域
                            background: {
                                color: 'transparent'
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            },
                            color: '#757F89',
                            label: {
                                style: {
                                    // 分类标签字体的样式
                                    color: '#FFFFFF' // "#C3CED9"
                                }
                            }
                            // 分类轴线及轴线的刻度颜色，还可用颜色的英文单词
                        },
                        valueAxis: {
                            label: {
                                style: {
                                    // 分类标签字体的样式
                                    color: '#FFFFFF' // "#C3CED9"
                                }
                            },
                            title: {
                                visible: false
                            }
                        },
                        valueAxis2: {
                            label: {
                                style: {
                                    // 分类标签字体的样式
                                    color: '#FFFFFF' // "#C3CED9"
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
                                    color: '#FFFFFF' // "#C3CED9"
                                }
                            },
                            visible: false
                        },
                        legendGroup: {
                            layout: {
                                alignment: 'center',
                                position: 'right'
                            },
                            visible: false
                        },
                        plotArea: {
                            isFixedDataPointSize: false,
                            // 设置成true，会有滚动轴
                            background: {
                                color: 'transparent' // 矩形区域的背景色
                            },
                            dataLabel: {
                                style: {
                                    // 数值的字体样式
                                    color: '#FFFFFF' // "#C3CED9"
                                },
                                visible: true,
                                position: 'outside'
                            },
                            dataPoint: {
                                savingMode: true,
                                stroke: {
                                    // bar边框颜色/是否可见
                                    color: '#000000',
                                    visible: false
                                }
                            },
                            gridline: {
                                // 矩形区域中的网格线
                                color: '#757F89',
                                size: 0 // 网格线的宽度
                            },
                            dataPointSize: {
                                // 只有当isFixedDataPointSize=true时，可调整bar的宽度;当isFixedDataPointSize=false时该属性不起作用
                                max: 28,
                                min: 5
                            },
                            dataShape: {
                                primaryAxis: [
                                    'bar',
                                    'bar',
                                    'bar',
                                    'bar',
                                    'bar'
                                ],
                                secondaryAxis: ['line', 'line', 'line']
                            },
                            primaryValuesColorPalette: [
                                '#748CB2',
                                '#9CC677',
                                '#EACF5E',
                                '#F9AD79',
                                '#D16A7C',
                                '#8873A2',
                                '#3A95B3',
                                '#B6D949',
                                '#FDD36C',
                                '#F47958',
                                '#A65084',
                                '#0063B1',
                                '#0DA841',
                                '#FCB71D',
                                '#F05620',
                                '#B22D6E',
                                '#3C368E',
                                '#8FB2CF',
                                '#95D4AB',
                                '#EAE98F',
                                '#F9BE92',
                                '#EC9A99',
                                '#BC98BD',
                                '#1EB7B2',
                                '#73C03C',
                                '#F48323',
                                '#EB271B',
                                '#D9B5CA',
                                '#AED1DA',
                                '#DFECB2',
                                '#FCDAB0',
                                '#F5BCB4'
                            ]
                        },
                        interaction: {
                            selectability: {
                                axisLabelSelection: true, // 通过点击分类标签是否可以选择
                                legendSelection: true, // 通过点击图例是否可以选择
                                mode: 'SINGLE',
                                /* //可选值:INCLUSIVE, EXCLUSIVE(单一的选中值方式，
            点击分类标签/点击图例/点击数值点(marker)), SINGLE(只能选中一个值通过，
            通过点击分类标签和点击图例选中功能不可用), MULTIPLE, NONE(不能选中值) */
                                plotLassoSelection: true,
                                plotStdSelection: true
                            }
                        },
                        title: {
                            alignment: 'center',
                            text: '食品安全质量问题前10名',
                            style: {
                                // 标题的字体样式
                                color: '#FFFFFF', // "#C3CED9",
                                fontFamily:
                                    "'Open Sans', Arial, Helvetica, sans-serif",
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 'normal'
                            },
                            visible: true
                        }
                    };
                    var oViz1 = this.getView().byId('VizFrame1');
                    oViz1.setVizProperties(oProperties);

                    var oViz2 = this.getView().byId('VizFrame2');
                    var sString =
                        window.location.hash.indexOf('single') > 0;
                    oViz2.setVisible(sString);
                    oProperties.title.text = '食品安全质量分类';
                    oProperties.legend.visible = true;
                    oProperties.legend.legendGroup = true;
                    oViz2.setVizProperties(oProperties);
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

                echartsMap: function (oMaptype) {
                    var that = this;
                    this.isChinaMap = 'china';
                    this.myChart = echarts.init($('#' + this.id)[0]);
                    var oMapData = [];
                    if (oMaptype === 'group') {
                        oMapData = this.BU;
                    }

                    var color = ['#a6c84c', '#ffa022', '#46bee9'];
                    var oLabel = {};
                    var symbolSize = 6;
                    if (window.location.hash.indexOf('single/FoodSafety') > 0) {
                        oLabel = {
                            normal: {
                                color: '#fac364',
                                show: true,
                                position: 'right', // 显示位置
                                offset: [5, 0], // 偏移设置
                                formatter: '{b}', // 圆环显示文字
                                fontSize: 8
                            },
                            emphasis: {
                                show: true
                            }
                        };
                        symbolSize = 10;
                    } else {
                        oLabel = {
                            normal: {
                                color: '#fac364',
                                show: false,
                                position: 'right', // 显示位置
                                offset: [5, 0], // 偏移设置
                                formatter: '{b}', // 圆环不显示文字
                                fontSize: 8
                            },
                            emphasis: {
                                show: true
                            }
                        };
                    }

                    var series = [];
                    [['天津', oMapData]].forEach(function (item, i) {
                        series.push({
                            // coordinateSystem: 'bmap',// series坐标系类型 bmap
                            coordinateSystem: 'geo', // series坐标系类型 json map
                            // type: 'scatter',
                            name: '中国',
                            map: 'china',
                            zoom: 1.2,
                            center: null,
                            type: 'effectScatter', // series图表类型
                            zlevel: 2,
                            roam: true,
                            selectedMode: 'single',
                            rippleEffect: {
                                // 涟漪特效
                                period: 4, // 动画时间，值越小速度越快
                                brushType: 'stroke', // 波纹绘制方式 stroke, fill
                                scale: 4 // 波纹圆环最大限制，值越大波纹越大
                            },
                            label: oLabel,
                            symbol: 'circle',
                            symbolSize: symbolSize, // 圆环大小
                            data: item[1].map(function (dataItem) {
                                var itemColor = '#2ae379';
                                if (
                                    dataItem.value[3] >=
                                    Number(that.FSConfig.RedNo)
                                ) {
                                    itemColor = '#ff3333';
                                } else if (
                                    dataItem.value[3] <
                                        Number(that.FSConfig.RedNo) &&
                                    dataItem.value[3] >=
                                        Number(that.FSConfig.YellowNo)
                                ) {
                                    itemColor = 'yellow';
                                } else {
                                    itemColor = '#2ae379';
                                }
                                return {
                                    name: dataItem.name, // 数据项名称，在这里指地区名称
                                    //  complex: dataItem.complex, //  是否为复合事业部
                                    //  provence: dataItem.provence, // 属于哪个省
                                    factory: dataItem.factory,
                                    value: dataItem.value, // 数据项值 // 地理坐标，经度 // 地理坐标，纬度 // 北京地区的数值
                                    itemStyle: {
                                        normal: {
                                            color: itemColor,
                                            shadowBlur: 10,
                                            shadowColor: itemColor
                                        }
                                    }
                                };
                            }),
                            animation: true,
                            animationDurationUpdate: 756,
                            animationEasing: 'cubicOut'
                        });
                    });

                    this.chinaOption = {
                        backgroundColor: 'transparent', // '#2c3644', // 图表背景色
                        // backgroundColor: '',
                        title: {
                            text: '食品安全质量实时监控总体概况',
                            subtext: '食品安全质量问题情况分布',
                            left: 'center',
                            textStyle: {
                                color: '#FFFFFF', // "#C3CED9",
                                fontSize: 14,
                                fontStyle: 'normal',
                                fontWeight: 'normal'
                            },
                            show: true
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
                                var res = '';
                                var name = params.name;
                                var value = params.value;
                                if (value) {
                                    res =
                                        "<span '>" +
                                        name +
                                        '</span><br/>值：' +
                                        value[2] +
                                        '</span>';
                                }
                                return res;
                            }
                        },
                        // visualMap: { //图例值控制
                        //  min: 0,
                        //  max: 100,
                        //  calculable: true,
                        // color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
                        //  textStyle: {
                        //    color: '#fff'
                        //  }
                        // },
                        // itemStyle: { // 定义样式
                        //   normal: { // 普通状态下的样式
                        //     areaColor: '#596472',
                        //     borderColor: '#111'
                        //   },
                        //   emphasis: { // 高亮状态下的样式
                        //     areaColor: '#2a333d'
                        //   }
                        // },
                        geo: {
                            map: 'china',
                            zoom: 1.2,
                            scaleLimit: {
                                min: 1,
                                max: 4
                            },
                            label: {
                                emphasis: {
                                    show: false
                                }
                            },
                            roam: true, // 是否允许缩放
                            layoutCenter: ['50%', '53%'], // 地图位置
                            layoutSize: '108%',
                            itemStyle: {
                                normal: {
                                    areaColor: '#327ABA', // 地图背景色
                                    borderColor: '#5CBAE6' // 省市边界线
                                },
                                emphasis: {
                                    areaColor: 'rgba(0,107,255,1)'
                                }
                            }
                        },
                        series: series
                    };

                    this.loadMap(this.chinaOption);
                    var that = this;
                    setTimeout(function () {
                        that.myChart.resize();
                    }, 500);
                },
                checkClosePos: function (params) {
                    var prov = params.name;
                    var x = params.event.offsetX;
                    var y = params.event.offsetY;
                    var oIdList = this.myChart
                        .getModel()
                        .getSeries()[0]
                        .getData()._idList;
                    var oLayoutList = this.myChart
                        .getModel()
                        .getSeries()[0]
                        .getData()._itemLayouts;
                    var iMin = 400;
                    var sMin = '';
                    var iDis = 0;
                    for (var i = 0; i < oLayoutList.length; i++) {
                        iDis =
                            (oLayoutList[i][0] - x) * (oLayoutList[i][0] - x) +
                            (oLayoutList[i][1] - y) * (oLayoutList[i][1] - y);
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
                    var that = this;
                    this.myChart.setOption(option);

                    this.myChart.on('click', function (params) {
                        // openPopupDialog(params);

                        if (window.location.hash.indexOf('single') < 0) {
                            that.getRouter().navTo('single', {
                                appId: 'FoodSafety',
                                viewIndex: '1'
                            });
                        } else {
                            if (
                                (params.data !== undefined &&
                                    params.data.factory !== undefined) ||
                                (that.checkClosePos(params) &&
                                    that.isChinaMap === 'china')
                            ) {
                                that.myChart.off('click');
                                if (
                                    that.getView().byId('NavToMapButton') !==
                                    undefined
                                ) {
                                    that.getView()
                                        .byId('NavToMapButton')
                                        .setVisible(false);
                                }
                                /* $('#btnShowChina').hide(500); */
                                //  params.data.name = that.SYBProMap[params.data.name];
                                that.showProvincesMap(option, params);
                                that.chengeViz();
                            } else {
                                if (
                                    params.componentType === 'series' ||
                                    (that.checkClosePos(params) &&
                                        that.isChinaMap !== 'china')
                                ) {
                                    var filter = new sap.ui.model.Filter(
                                        'FAC_NAME',
                                        sap.ui.model.FilterOperator.EQ,
                                        params.data.name
                                    );
                                    var TableParams = {
                                        name: params.data.name,
                                        filters: [filter]
                                    };
                                    that.popOverTable(TableParams);
                                    // if (!that._oTable) {
                                    //   that._oTable = sap.ui.xmlfragment("sap.vo.mengniu.controller.blocks.FoodSafetyTable", that);
                                    // }
                                    // var filter = new sap.ui.model.Filter("FAC_NAME", sap.ui.model.FilterOperator.EQ, params.data.name);
                                    // if (!that._oDialog) {
                                    //   that._oDialog = new sap.m.Dialog({
                                    //     title: params.data.name,
                                    //     content: [that._oTable]
                                    //   });
                                    //   that._oDialog._header.mAggregations.contentRight = [
                                    //     new sap.m.Button({
                                    //       icon: "sap-icon://download",
                                    //       press: function () {
                                    //         that.onDownloadExcel(that._oTable);
                                    //       }
                                    //     }),new sap.m.Button({
                                    //     icon: "sap-icon://undo",
                                    //     press: function () {
                                    //       that._oDialog.close();
                                    //     }
                                    //   })];
                                    // }
                                    // that.getView().addDependent(that._oDialog);
                                    // that._oDialog.open();
                                    // that._oDialog.setTitle(params.data.name);
                                    // that._oTable.setModel(sap.ui.getCore().getModel("originData"), "originData");
                                    // that._oTable.getBinding("rows").filter(filter);
                                }
                            }
                        }
                    });
                },
                showProvincesMap: function (chinaOption, params) {
                    var that = this;
                    this.isChinaMap = params.data.name;
                    // console.log(params);
                    // 全国地图触发 mapselectchanged 事件后，重置地图中心位置
                    this.chinaOption.series[0].center = null;
                    chinaOption.series[0].zoom = 1.2;
                    // this.myChart.setOption(this.chinaOption);
                    // 通过地图实例的 setOption 方法重置地图位置，这样可以避免接下来载入地图时导致位置偏移

                    //* ******start echart json map ***********
                    delete this.chinaOption.bmap;
                    this.chinaOption.geo = {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true, // 是否允许缩放
                        layoutCenter: ['50%', '53%'], // 地图位置
                        layoutSize: '108%',
                        itemStyle: {
                            normal: {
                                // areaColor: '#323c48',//地图背景色
                                borderColor: '#404a59' // 省市边界线
                            },
                            emphasis: {
                                // areaColor: '#2a333d'//悬浮背景
                            }
                        }
                    };
                    this.chinaOption.geo.map = params.data.name;
                    this.chinaOption.geo.center = null;
                    this.chinaOption.geo.zoom = 1.2;

                    this.chinaOption.title.text = params.data.name; //  XX 事业部
                    this.chinaOption.title.show = true;

                    var oLabel = {
                        normal: {
                            color: '#fac364',
                            show: true,
                            position: 'right', // 显示位置
                            offset: [5, 0], // 偏移设置
                            formatter: '{b}', // 圆环显示文字
                            fontSize: 8
                        },
                        emphasis: {
                            show: true
                        }
                    };

                    var series = [];
                    [['天津', that.BU]].forEach(function (item, i) {
                        series.push({
                            // coordinateSystem: 'bmap',// series坐标系类型 bmap
                            coordinateSystem: 'geo', // series坐标系类型 json map
                            // type: 'scatter',
                            name: '中国',
                            map: 'china',
                            zoom: 1.2,
                            center: null,
                            type: 'effectScatter', // series图表类型
                            zlevel: 2,
                            roam: true,
                            selectedMode: 'single',
                            rippleEffect: {
                                // 涟漪特效
                                period: 4, // 动画时间，值越小速度越快
                                brushType: 'stroke', // 波纹绘制方式 stroke, fill
                                scale: 4 // 波纹圆环最大限制，值越大波纹越大
                            },
                            label: oLabel,
                            symbol: 'circle',
                            symbolSize: 10, // 圆环大小
                            data: item[1].map(function (dataItem) {
                                var itemColor = '#2ae379';
                                if (
                                    dataItem.value[3] >=
                                    Number(that.FSConfig.RedNo)
                                ) {
                                    itemColor = '#ff3333';
                                } else if (
                                    dataItem.value[3] <
                                        Number(that.FSConfig.RedNo) &&
                                    dataItem.value[3] >=
                                        Number(that.FSConfig.YellowNo)
                                ) {
                                    itemColor = 'yellow';
                                } else {
                                    itemColor = '#2ae379';
                                }
                                return {
                                    name: dataItem.name, // 数据项名称，在这里指地区名称
                                    //  complex: dataItem.complex, //  是否为复合事业部
                                    //  provence: dataItem.provence, // 属于哪个省
                                    factory: dataItem.factory,
                                    value: dataItem.value, // 数据项值 // 地理坐标，经度 // 地理坐标，纬度 // 北京地区的数值
                                    itemStyle: {
                                        normal: {
                                            color: itemColor,
                                            shadowBlur: 10,
                                            shadowColor: itemColor
                                        }
                                    }
                                };
                            }),
                            animation: true,
                            animationDurationUpdate: 756,
                            animationEasing: 'cubicOut'
                        });
                    });
                    this.chinaOption.series = series;
                    this.chinaOption.series[0].mapType = params.data.name;
                    this.chinaOption.series[0].map = params.data.name;
                    // this.chinaOption.series[0].map = params.data.provence;
                    this.chinaOption.series[0].center = null;
                    this.chinaOption.series[0].label.normal.show = true;
                    //* ******end echart json map ***********

                    var oData = this.chinaOption.series[0].data;
                    for (var i = 0; i < oData.length; i++) {
                        if (oData[i].name === params.name) {
                            for (var j = 0; j < oData[i].factory.length; j++) {
                                var itemColor = '#2ae379';
                                if (
                                    oData[i].factory[j].value[3] >=
                                    Number(that.FSConfig.RedNo)
                                ) {
                                    itemColor = '#ff3333';
                                } else if (
                                    oData[i].factory[j].value[3] <
                                        Number(that.FSConfig.RedNo) &&
                                    oData[i].factory[j].value[3] >=
                                        Number(that.FSConfig.YellowNo)
                                ) {
                                    itemColor = 'yellow';
                                } else {
                                    itemColor = '#2ae379';
                                }
                                oData[i].factory[j].itemStyle = {
                                    normal: {
                                        color: itemColor,
                                        shadowBlur: 10,
                                        shadowColor: itemColor
                                    }
                                };
                            }
                            this.chinaOption.series[0].data = oData[i].factory;
                        }
                    }

                    this.loadMap(this.chinaOption);
                    if (this.getView().byId('NavToMapButton')) {
                        if (
                            this.getView()
                                .byId('NavToMapButton')
                                .getVisible() === false
                        ) {
                            this.getView()
                                .byId('NavToMapButton')
                                .setVisible(true);
                        }
                    }
                    /* if (document.getElementById('btnShowChina')) {
        $('#btnShowChina').show(500);
      } else {
        $('#' + this.id).append("<button id='btnShowChina' type='button' class='btn btn-default'><img src='./image/china.svg'/></button>");
        $('#btnShowChina').on('click', function() {
          this.isChinaMap = true;
          this.echartsMap('group');
        });
      } */
                },
                chengeViz: function () {
                    var AllPlant = this.oPlant;
                    var PlantBar = {};
                    for (var i = 0; i < this.BU.length; i++) {
                        if (!PlantBar[this.BU[i].name]) {
                            PlantBar[this.BU[i].name] = {
                                factory: {}
                            };
                        }
                        PlantBar[this.BU[i].name].value = this.BU[i].value[2];
                        for (var j = 0; j < this.BU[i].factory.length; j++) {
                            PlantBar[this.BU[i].name].factory[
                                this.BU[i].factory[j].name
                            ] = this.BU[i].factory[j].value[2];
                        }
                    }

                    var oViz1 = this.getView().byId('VizFrame1');
                    var oViz2 = this.getView().byId('VizFrame2');

                    var data = {
                        results1: [],
                        results2: []
                    };
                    if (this.isChinaMap == 'china') {
                        for (var key in PlantBar) {
                            if (PlantBar[key].value != 0) {
                                var aArray = {};
                                aArray.market = key;
                                aArray.value = PlantBar[key].value;
                                data.results1.push(aArray);
                            }
                        }
                        this.CategoryData = this.groupBy(
                            this.SourceData.results,
                            'PG'
                        );
                    } else {
                        for (var key in PlantBar[this.isChinaMap].factory) {
                            if (PlantBar[this.isChinaMap].factory[key] != 0) {
                                var aArray = {};
                                aArray.market = key;
                                aArray.value =
                                    PlantBar[this.isChinaMap].factory[key];
                                data.results1.push(aArray);
                            }
                        }

                        var newCategoryData = {
                            results: []
                        };
                        for (
                            var i = 0;
                            i < this.SourceData.results.length;
                            i++
                        ) {
                            var oEntry = {};
                            if (
                                this.isChinaMap ==
                                this.SourceData.results[i].SYB
                            ) {
                                oEntry = this.SourceData.results[i];
                                newCategoryData.results.push(oEntry);
                            }
                        }
                        this.CategoryData = this.groupBy(
                            newCategoryData.results,
                            'PG'
                        );
                    }
                    // 对json进行降序排序函数
                    var colId = 'value';
                    var desc = function (x, y) {
                        return x[colId] < y[colId] ? 1 : -1;
                    };
                    data.results1.sort(desc); // 绛序排序
                    data.results1 = data.results1.slice(0, 10);

                    var oModel1 = new sap.ui.model.json.JSONModel();

                    for (var key in this.CategoryData) {
                        var aArray = {};
                        aArray.Category = key;
                        aArray.value = this.CategoryData[key];
                        data.results2.push(aArray);
                    }

                    oModel1.setData(data);
                    oViz1.setModel(oModel1, 'VizFrameModel');
                    oViz2.setModel(oModel1, 'VizFrameModel');
                },
                onNavToMap: function (oEvent) {
                    var that = this;
                    this.isChinaMap = 'china';
                    // this.echartsMap('group');
                    this.getView()
                        .byId('NavToMapButton')
                        .setVisible(false);
                    // this.onFilterChange();
                    // setTimeout(function () {
                    this.refreshPage();
                    // }, 1500);
                },
                selectData: function (oEvent) {
                    var that = this;
                    if (window.location.hash.indexOf('single') > 0) {
                        var x = oEvent.getParameters().data[0].data;
                        var filterField = '';
                        var filterKey = '';
                        var FilterOperator = sap.ui.model.FilterOperator.EQ;
                        var aFilters = [];
                        if (x.市场) {
                            if (that.isChinaMap !== 'china') {
                                aFilters = [
                                    new sap.ui.model.Filter(
                                        'FAC_NAME',
                                        sap.ui.model.FilterOperator.EQ,
                                        x.市场
                                    )
                                ];
                            } else {
                                aFilters = [
                                    new sap.ui.model.Filter(
                                        'SYB',
                                        sap.ui.model.FilterOperator.EQ,
                                        x.市场
                                    )
                                ];
                            }
                        } else {
                            if (that.isChinaMap !== 'china') {
                                aFilters = [
                                    new sap.ui.model.Filter(
                                        'PG',
                                        sap.ui.model.FilterOperator.EQ,
                                        x.投诉分类
                                    ),
                                    new sap.ui.model.Filter(
                                        'SYB',
                                        sap.ui.model.FilterOperator.EQ,
                                        that.isChinaMap
                                    )
                                ];
                            } else {
                                aFilters = [
                                    new sap.ui.model.Filter(
                                        'PG',
                                        sap.ui.model.FilterOperator.EQ,
                                        x.投诉分类
                                    )
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
                popOverTable: function (params) {
                    var that = this;
                    if (!that._oTable) {
                        that._oTable = sap.ui.xmlfragment(
                            'sap.vo.mengniu.controller.blocks.FoodSafetyTable',
                            that
                        );
                    }

                    if (!that._oDialog) {
                        that._oDialog = new sap.m.Dialog({
                            title: params.name,
                            content: [that._oTable]
                        });
                        that._oDialog._header.mAggregations.contentRight = [
                            new sap.m.Button({
                                icon: 'sap-icon://download',
                                press: function () {
                                    that.onDownloadExcel(that._oTable);
                                }
                            }),
                            new sap.m.Button({
                                icon: 'sap-icon://undo',
                                press: function () {
                                    that._oDialog.close();
                                }
                            })
                        ];
                    }
                    that.getView().addDependent(that._oDialog);
                    that._oDialog.open();
                    that._oDialog.setTitle(params.name);
                    // that._oTable.setModel(that.getView().getModel("originData"));
                    // var filter = new sap.ui.model.Filter("A4ZQM_CP01TS007", sap.ui.model.FilterOperator.EQ, params.name);
                    that._oTable.getBinding('rows').filter(params.filters);
                },
                compare: function (o1, o2, aField) {
                    for (var i in aField) {
                        if (o1[aField[i]] !== o2[aField[i]]) {
                            return false;
                        }
                    }
                    return true;
                },
                onDownLoad: function () {
                    var that = this;
                    var sData = this.getView()
                        .getModel('originData')
                        .getData().results;
                    var tmpDown, type;
                    var keyMap = []; // 获取键
                    for (var k in sData[0]) {
                        if (k !== '__metadata') {
                            keyMap.push(k);
                        }
                    }
                    var HeadStr = '{';
                    for (var ii = 0; ii < keyMap.length; ii++) {
                        if (ii === keyMap.length - 1) {
                            HeadStr +=
                                '"' +
                                keyMap[ii] +
                                '"' +
                                ':' +
                                '"' +
                                keyMap[ii] +
                                '"' +
                                '}';
                        } else {
                            HeadStr +=
                                '"' +
                                keyMap[ii] +
                                '"' +
                                ':' +
                                '"' +
                                keyMap[ii] +
                                '"' +
                                ',';
                        }
                    }

                    var HeadObj = JSON.parse(HeadStr);

                    sData.unshift(HeadObj);
                    var _extends =
                        Object.assign ||
                        function (target) {
                            for (var i = 1; i < arguments.length; i++) {
                                var source = arguments[i];
                                for (var key in source) {
                                    if (
                                        Object.prototype.hasOwnProperty.call(
                                            source,
                                            key
                                        )
                                    ) {
                                        target[key] = source[key];
                                    }
                                }
                            }
                            return target;
                        };
                    var tmpdata = []; // 用来保存转换好的json
                    sData
                        .map(function (v, i) {
                            return keyMap.map(function (k, j) {
                                return _extends(
                                    {},
                                    {
                                        v: v[k],
                                        position:
                                            (j > 25
                                                ? that.getCharCol(j)
                                                : String.fromCharCode(65 + j)) +
                                            (i + 1)
                                    }
                                );
                            });
                        })
                        .reduce(function (prev, next) {
                            return prev.concat(next);
                        })
                        .forEach(function (v, i) {
                            return (tmpdata[v.position] = {
                                v: v.v
                            });
                        });
                    var outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
                    var tmpWB = {
                        SheetNames: ['Sheet1'], // 保存的表标题
                        Sheets: {
                            Sheet1: _extends(
                                {},
                                tmpdata, // 内容
                                {
                                    '!ref':
                                        outputPos[0] +
                                        ':' +
                                        outputPos[outputPos.length - 1] // 设置填充区域
                                }
                            )
                        }
                    };
                    tmpDown = new Blob(
                        [
                            that.s2ab(
                                XLSX.write(
                                    tmpWB,
                                    {
                                        bookType:
                                            type == undefined ? 'xlsx' : type,
                                        bookSST: false,
                                        type: 'binary'
                                    } // 这里的数据是用来定义导出的格式类型
                                )
                            )
                        ],
                        {
                            type: ''
                        }
                    ); // 创建二进制对象写入转换好的字节流

                    saveAs(tmpDown, '样本数据.xlsx');
                }
            }
        );
    }
);
