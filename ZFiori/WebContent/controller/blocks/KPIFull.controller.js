sap.ui.define([
  "sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
  'sap/vo/mengniu/controller/blocks/CustomerFormat'
], function (BlockContentBase, CustomerFormat) {
  "use strict";
  var that;
  return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.KPIFull", {
    onInit: function () {
      this.online = Boolean(sap.ui.getCore().getModel("Online"));
      //this.initChart();
      this.loadData();
    },

    loadData: function () {
      var that = this;
      var oUser = sap.ui.getCore().getModel("User").getData();
      var oConfig = sap.ui.getCore().getModel("oModelKPIConfig").getData();
      if (!oUser.UserName || !oConfig.KPI) {
        setTimeout(function () {
          that.loadData();
        }, 500);
        return;
      }
      var aKPIList = oUser.L1.concat(oUser.L2, oUser.L3, oUser.Other);
      var oKPI = {},
        oData = {
          rows: []
        },
        oRow = {
          cells: []
        },
        oCell = {};
      oConfig.KPI.forEach(function (x) {
        oKPI[x.id] = x;
      });
      this.oKPI = oKPI;
      for (var i = 0; i < aKPIList.length; i++) {
        if (aKPIList[i] && oKPI[aKPIList[i]] && !oKPI[aKPIList[i]].AlwaysOffline) {
          oCell = {
            name: oKPI[aKPIList[i]].name,
            id: aKPIList[i],
            visible: true,
            data: [],
            type: (i + oData.rows.length) % 2 === 0 ? "column" : "line",
            property: this.getVizProperty()
          }
          // if(this.online){
          this.loadDataKPI(oCell);
          oRow.cells.push(oCell);
          if (oRow.cells.length === 4) {
            oData.rows.push(oRow);
            oRow = {
              cells: []
            };
          }
        }
      }
      if (oRow.cells.length > 0) {
        while (oRow.cells.length < 4) {
          oRow.cells.push({
            visible: false
          });
        }
        oData.rows.push(oRow);
      }
      this.getView().setModel(new sap.ui.model.json.JSONModel(oData));
    },
    getRandomData: function () {
      return Math.round((0.9 + 0.1 * Math.random()) * 100) / 100;
    },
    loadDataKPI: function (oCell) {
      if (!this.online) {
        oCell.data = [{
          Month: "1",
          KPI: this.getRandomData()
        }, {
          Month: "2",
          KPI: this.getRandomData()
        }, {
          Month: "3",
          KPI: this.getRandomData()
        }, {
          Month: "4",
          KPI: this.getRandomData()
        }, {
          Month: "5",
          KPI: this.getRandomData()
        }, {
          Month: "6",
          KPI: this.getRandomData()
        }, {
          Month: "7",
          KPI: this.getRandomData()
        }, {
          Month: "8",
          KPI: this.getRandomData()
        }, {
          Month: "9",
          KPI: this.getRandomData()
        }, {
          Month: "10",
          KPI: this.getRandomData()
        }, {
          Month: "11",
          KPI: this.getRandomData()
        }, {
          Month: "12",
          KPI: this.getRandomData()
        }];
        return;
      }

      var that = this;
      var KPIConfig = this.oKPI[oCell.id];

      var sQuery = KPIConfig.query;

      var key = "";
      var sStartDate = this.getDate("FDOCY");
      var sEndDate = this.getDate();
      if (KPIConfig.key && KPIConfig.key.length > 0) {
        var aKey = [];
        for (var i = 0; i < KPIConfig.key.length; i++) {
          if (KPIConfig.key[i].type === "StartDate") {
            aKey.push(KPIConfig.key[i].name + "='" + sStartDate + "'");
          } else if (KPIConfig.key[i].type === "EndDate") {
            aKey.push(KPIConfig.key[i].name + "='" + sEndDate + "'");
          } else if (KPIConfig.key[i].type === "StartMonth") {
            aKey.push(KPIConfig.key[i].name + "='" + this.getMonthDate(sStartDate) + "'");
          } else if (KPIConfig.key[i].type === "EndMonth") {
            aKey.push(KPIConfig.key[i].name + "='" + this.getMonthDate(sEndDate) + "'");
          } else {
            aKey.push(KPIConfig.key[i].name + "='" + KPIConfig.key[i].value + "'");
          }
        }
        var key = "(" + aKey.join(",") + ")/";
      }

      var sCategory = "",
        sValue = "",
        sTop = 30,
        sOrderby = "";
      for (var i = 0; i < KPIConfig.category.length; i++) {
        if (KPIConfig.category[i].categoryBig) {
          sCategory = KPIConfig.category[i].id;
          sTop = KPIConfig.category[i].top || 30;
          sOrderby = KPIConfig.category[i].orderby || "";
        }
      }
      for (var i = 0; i < KPIConfig.value.length; i++) {
        if (KPIConfig.value[i].valueBig) {
          sValue = KPIConfig.value[i].id;
        }
      }

      var mUrlParameter = {
        "$select": sCategory + "," + sValue + "," + sValue.replace(/_F/, ""),
        "$top": sTop || 30
      };
      if(sOrderby){
        mUrlParameter.$orderby = sOrderby;
      }
      // that.sQuery = sQuery;
      // var sKey = key;
      // var key1;
      if (!sap.ui.getCore().getModel(sQuery)) {
        sap.ui.getCore().setModel(new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/" + sQuery + "_SRV/", {
          useBatch: false
        }), sQuery);
      }
      sap.ui.getCore().getModel(sQuery).read("/" + sQuery + key + "Results", {
        // filters: aODataFilter,
        urlParameters: mUrlParameter,
        error: function (oData) {
          sap.m.MessageToast.show("指标" + KPIConfig.name + "无数据");
          //sap.m.MessageToast.show(JSON.parse(oData.responseText).error.message.value);
        },
        success: function (oData1) {
          if (oData1 && oData1.results && oData1.results[0]) {
            var iMax = 0,
              iMin = 99999999;
            for (var i = 0; i < oData1.results.length; i++) {
              var sKPI = Math.round(oData1.results[i][sValue.replace(/_F/, "")] * 100) / 100;
              oCell.data.push({
                Month: oData1.results[i][sCategory],
                KPI: sKPI
              });
              if (sKPI > iMax) {
                iMax = sKPI;
              }
              if (sKPI < iMin) {
                iMin = sKPI;
              }
            }
            oCell.property = that.getVizProperty();
            oCell.property.plotArea.primaryScale.maxValue = iMax * 1.5 - iMin * 0.5;
            oCell.property.plotArea.primaryScale.minValue = iMin * 1.5 - iMax * 0.5;
            oCell.max = iMax ;
            oCell.min = iMin;
            that.getView().getModel().refresh();
          }
          // var valueSmal = that.value1;
          // that.getView().byId(sKPIName).setValue(oData1.results[0][valueSmal]);
        }
      });
    },
    onRenderComplete: function (oEvent) {
      var oControl = oEvent.getSource();
      var oCell = oControl.getBindingContext().getObject();
      var oProperty = oControl.getVizProperties();
      var bChanged = false;
      var oPlotArea = {};
      if (oCell.max && oCell.min) {
        if (oProperty && oProperty.plotArea && oProperty.plotArea.primaryScale) {
          var maxValue = oCell.max * 1.5 - oCell.min * 0.5;
          var minValue = oCell.min * 1.5 - oCell.max * 0.5;
          if (oProperty.plotArea.primaryScale.maxValue !== maxValue || oProperty.plotArea.primaryScale.minValue !== minValue) {
            oPlotArea.primaryScale = {
              maxValue: maxValue,
              minValue: minValue
            }
            bChanged = true;
          }
        }
      }
      if (oCell.reference && oCell.reference.length > 0) {
        if (oProperty && oProperty.plotArea && oProperty.plotArea.referenceLine && (!oProperty.plotArea.referenceLine.line || oProperty.plotArea.referenceLine.line.length < oCell.reference.length)) {
          oPlotArea.referenceLine = {
            line: oCell.reference
          };
          bChanged = true;
        }
      }
      if (bChanged) {
        oControl.vizUpdate({
          properties: {
            plotArea: oPlotArea
          }
        })
      }
    },
    getVizProperty: function () {
      return {
        general: { //整个vizFrame区域
          background: {
            color: "transparent"
          },
          layout: { //图形离边框线的距离，上下左右统一设定时用padding;也可单独设定某一边的距离
            //padding:24,
            paddingBottom: 12,
            paddingLeft: 12,
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
            }
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
          },
          visible: false
        },
        legendGroup: {
          layout: {
            alignment: "topLeft",
            position: "right"
          }
        },
        plotArea: {
          isFixedDataPointSize: true,
          //设置成true，会有滚动轴
          background: {
            color: "transparent" //矩形区域的背景色
          },
          dataLabel: {
            //bar上是否显示数值
            // formatString: CustomerFormat.FIORI_PERCENTAGE_FORMAT_2,
            style: {
              //数值的字体样式
              color: "#C3CED9"
            },
            visible: true,
            hideWhenOverlap:false
          },
          gridline: {
            //矩形区域中的网格线
            color: "#333",
            size: 1, // 网格线的宽度
            type: "solid", //网格线的样式,可选值:solid(实线), dash(虚线)
            visible: true
          },
          dataPoint: {
            savingMode: true,
            stroke: { //bar边框颜色/是否可见
              color: "#000000",
              visible: false
            }
          },
          dataPointSize: { //只有当isFixedDataPointSize=true时，可调整bar的宽度;当isFixedDataPointSize=false时该属性不起作用
            max: 30,
            min: 5
          },
          primaryScale: {
            fixedRange: true,
            //当fixedRange=false时，设置maxValue和minValue的值无效
            maxValue: 1.05,
            //数值轴刻度的最大值
            minValue: 0.90 //数值轴刻度的最小值
          },
          colorPalette: ['#009BE2', '#EED257', '#00D5FF', '#B4D651', '#0372D8', '#71DCE3'],
          primaryValuesColorPalette: ['#078ED2', '#47C79A', '#F8C757']
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
          visible: false
        }
      };
    },

    updateChartMaxMinValue: function (maxValue, minValue) {
      var iMax = maxValue,
        iMin = minValue;
      if (iMax && !iMin) {
        iMin = 0;
      }
      var oProperty = {
        properties: {
          plotArea: {
            primaryScale: {
              maxValue: iMax,
              minValue: iMin,
              fixedRange: Boolean(maxValue !== undefined)
            }
          }
        }
      }
      this.getView().byId("combination").vizUpdate(oProperty);
      this.getView().byId("line").vizUpdate(oProperty);
      this.getView().byId("bulletHorizontal").vizUpdate(oProperty);
      this.getView().byId("bulletVertical").vizUpdate(oProperty);
      this.getView().byId("pie").vizUpdate(oProperty);
    },
    onPress: function (oEvent) {
      var KPItext = oEvent.getSource().getTooltip();
      var oModelKPI = new sap.ui.model.json.JSONModel();
      oModelKPI.setData({
        "KPI": KPItext
      });
      sap.ui.getCore().setModel(oModelKPI, "KPI");
      this.getRouter().navTo('single', {
        appId: 'KPI',
        viewIndex: '1'
        // KPI:KPItext
      });
    },
    initCustomFormat: function () {
      CustomerFormat.registerCustomFormat();
    },
    _setFull: function () {
      console.log('f');
    },
    _setSmall: function () {
      console.log('m');
    }
  });

});