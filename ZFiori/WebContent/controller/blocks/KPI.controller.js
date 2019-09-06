sap.ui.define([
    "sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
    'util/app',
    'sap/vo/mengniu/controller/blocks/CustomerFormat'
  ],
  function (BlockContentBase, appUtil, CustomerFormat) {
    "use strict";
    var that;
    return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.KPI", {
      onInit: function (oEvent) {
        this.online = Boolean(sap.ui.getCore().getModel("Online"));
        var that = this;
        setTimeout(function () {
          that.loadData();
        }, 0);
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
        var oKPI = {};
        oConfig.KPI.forEach(function (x) {
          oKPI[x.id] = x;
        });
        this.oKPI = oKPI;
        var oHBoxL1 = this.getView().byId("L1");
        var i, oItem, oTextLink;
        var iMax = Math.max(oUser.L1.length, oUser.L2.length, oUser.L3.length);
        for (i = 0; i < oUser.L1.length; i++) {
          oItem = new sap.m.VBox({
            width: "100%",
            justifyContent: "Center",
            alignContent: "Center",
            alignItems: "Center"
          });
          if (oUser.L1[i]) {
            var x = oUser.L1[i];
            var oNumberItem = new sap.suite.ui.microchart.RadialMicroChart({
              size: "M",
              percentage: Number(oKPI[x].OfflinePercentage || oKPI[x].OfflineValue),
              total: 100
            });
            oNumberItem.addStyleClass("sapUiSmallMarginBottom");
            oNumberItem.data("id", x);
            oItem.addItem(oNumberItem);
            if (oKPI[x].AlwaysOffline) {
              oNumberItem.setValueColor("Good");
              oNumberItem.setPercentage(100);
            }
            for (var j in oKPI[x].text) {
              oTextLink = new sap.m.Link({
                width: "100%",
                press: this.onPress.bind(this),
                text: oKPI[x].text[j],
                subtle: true
              });
              if (!oKPI[x].AlwaysOffline) {
                oTextLink.setTooltip(x);
              }
              oItem.addItem(oTextLink);
            }
            if (this.online && !oKPI[x].AlwaysOffline) {
              this.loadDataKPI(x, oNumberItem, function (oNumberItem, oNumber) {
                oNumberItem.setPercentage(parseFloat(oNumber));
                var oThreshold = oKPI[oNumberItem.data("id")].Threshold || oConfig.Threshold;
                if(oThreshold.G2Y && oNumber <= oThreshold.G2Y){
                  oNumberItem.setValueColor("Good");
                }else if(oThreshold.Y2R && oNumber <= oThreshold.Y2R){
                  oNumberItem.setValueColor("Critical");
                }else if(oThreshold.R2Y && oNumber < oThreshold.R2Y){
                  oNumberItem.setValueColor("Error");
                }else if(oThreshold.Y2G && oNumber < oThreshold.Y2G){
                  oNumberItem.setValueColor("Critical");
                }else{
                  oNumberItem.setValueColor("Good");
                }
                if (oKPI[oNumberItem.data("id")].AfterRendering) {
                  oNumberItem.onAfterRendering = function (oEvent) {
                    sap.suite.ui.microchart.RadialMicroChart.prototype.onAfterRendering.apply(this, arguments);
                    $("#" + oNumberItem.getId() + " .sapSuiteRMCFont").text(oNumber);
                  }
                }
              });
            } else if (oKPI[x].AfterRendering) {
              oNumberItem.onAfterRendering = function (oEvent) {
                sap.suite.ui.microchart.RadialMicroChart.prototype.onAfterRendering.apply(this, arguments);
                $("#" + oEvent.srcControl.getId() + " .sapSuiteRMCFont").text(oKPI[oEvent.srcControl.data("id")].OfflineValue);
              }
            }
          }
          oHBoxL1.addItem(oItem);
        }
        var oHBox, oTextLinkLayout, oNumberItemLayout;
        for (var k in {
            "L2": true,
            "L3": true
          }) {
          oHBox = this.getView().byId(k);
          for (i = 0; i < iMax; i++) {
            oItem = new sap.m.HBox({
              width: "100%",
              justifyContent: "Center",
              alignContent: "Center",
              alignItems: "Center"
            });
            if (oUser[k][i]) {
              var x = oUser[k][i];
              oTextLinkLayout = new sap.m.VBox({
                width: "45%",
                wrap: "Wrap",
                alignContent: "Center",
                justifyContent: "Center",
                alignItems: "Center"
              });
              for (var j in oKPI[x].text) {
                oTextLink = new sap.m.Link({
                  press: this.onPress.bind(this),
                  text: oKPI[x].text[j],
                  tooltip: x,
                  subtle: true
                })
                oTextLinkLayout.addItem(oTextLink);
              }
              var oNumberItem = new sap.ui.core.HTML({
                content: '<div class="KPIgauge" style="height:90%;width:90%;background-color: #000;"></html:div>',
                afterRendering: function (oEvent) {
                  var oEChart = echarts.init($('#' + oEvent.getSource().getId())[0]);
                  var id = oEvent.getSource().data("id");

                   if(oKPI[id].ValueType){
                    that.loadMap(oEChart, Number(oKPI[id].OfflineValue), oKPI[id].ValueType);
                    }else{
                    that.loadMap(oEChart, Number(oKPI[id].OfflineValue));
                    }
                  if (that.online && !oKPI[id].AlwaysOffline) {
                    that.loadDataKPI(id, oEChart, function (oEChart, oNumber) {
                    if(oKPI[id].ValueType){
                    that.loadMap(oEChart, oNumber, oKPI[id].ValueType);
                    }else{
                    that.loadMap(oEChart, oNumber);
                    }

                    });
                  }
                }
              });
              oNumberItem.data("id", x);
              oNumberItem.data("threshold", oKPI[x].Threshold || oConfig.Threshold);
              oNumberItemLayout = new sap.m.HBox({
                width: "50%",
                wrap: "Wrap",
                alignContent: "Center",
                justifyContent: "Center",
                alignItems: "Center",
                items: [oNumberItem],
                layoutData: new sap.m.FlexItemData({
                  growFactor: 1
                })
              });
              oItem.addItem(oTextLinkLayout);
              oItem.addItem(oNumberItemLayout);

            }
            oHBox.addItem(oItem);
          }
        }
      },
      loadDataKPI: function (id, oControl, callback) {

        var that = this;
        var KPIConfig = this.oKPI[id];
        var sQuery = KPIConfig.query[0];

        var sStartDate = this.getDate("FDOCY");
        var sEndDate = this.getDate();
        var key = "";
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
          key = "(" + aKey.join(",") + ")/";
        }
        var sValue = "";
        for (var i = 0; i < KPIConfig.value.length; i++) {
          if (KPIConfig.value[i].valueSmal) {
            sValue = KPIConfig.value[i].id;
          }
        }

        var mUrlParameter = {
          "$select": sValue + "," + sValue.replace(/_F/, "")
        };

        if (!sap.ui.getCore().getModel(sQuery)) {
          sap.ui.getCore().setModel(new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/" + sQuery + "_SRV/", {
            useBatch: false
          }), sQuery);
        }
        sap.ui.getCore().getModel(sQuery).read("/" + sQuery + key + "Results", {
          urlParameters: mUrlParameter,
          error: function (oData) {
            // sap.m.MessageToast.show("指标" + KPIConfig.name + "无数据");
            callback(oControl, 0);
          },
          success: function (oData) {
            if (oData && oData.results && oData.results[0]) {
              var result = Math.round(oData.results[0][sValue.replace(/_F/, "")] * 100) / 100
              callback(oControl, result);
            }
          }
        });
      },
      onLoadColor: function (value,oThreshold) {
        var color;
      // if (value >= 95) {
      //  color = "#10e410";// "#00FF00";
      //} else if (value >= 90 && value < 95) {
      //  color = "#e6a92a";// "#F6BB41";
      //} else {
      //  color = "#da162c";// "#D14352";
      //}
        if(oThreshold.G2Y && value <= oThreshold.G2Y){
          color = "#10e410";
        }else if(oThreshold.Y2R && value <= oThreshold.Y2R){
          color = "#e6a92a";
        }else if(oThreshold.R2Y && value < oThreshold.R2Y){
          color = "#da162c";
        }else if(oThreshold.Y2G && value < oThreshold.Y2G){
          color = "#e6a92a";
        }else{
          color = "#10e410";
        }
        return color
      },
      loadMap: function (chart, value1,valueType) {
        var oThreshold = sap.ui.getCore().byId(chart.getDom().id).data("threshold");
        var color = this.onLoadColor(value1,oThreshold);
        var sfontSize = 14;
        var option = {
          backgroundColor: 'transparent',
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
          },
          series: [{
            type: 'gauge',
            radius: '90%',
            startAngle: '180',
            endAngle: '0',
            splitNumber: '6',
            detail: {
              show: true,
              fontSize: sfontSize,
              offsetCenter: [0, 13],
              formatter: '{value}%'
              // color:'#002c5d'
            },
            data: [{
              value: value1,
              name: value1 + '%'
            }],
            pointer: {
              width: 2, //指针的宽度
              length: "80%", //指针长度，按照半圆半径的百分比
              color: "#2d99e2",
              show: true
            },
            title: {
              show: false,
              offsetCenter: [0, '10px'],
              textStyle: {
                color: '#002c5d',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 5
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [0, color],
                  [0.999, color],
                  [1, color]
                ],
                width: 5,
                shadowBlur: 1,
                shadowColor: color,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 25,
              lineStyle: {
                color: '#00377a',
                width: 2,
                type: 'solid',
                shadowColor: '#00377a',
                shadowBlur: 1,
                shadowOffsetX: 1,
                shadowOffsetY: 1,
                opacity: 0.7
              }
            },
            axisLabel: {
              show: false
            }
          }]
        };
        if(valueType){
        option.series[0].detail.formatter = '{value}';
        option.series[0].data[0].name = value1;
        }
        chart.setOption(option);
        setTimeout(function () {
          chart.resize();
        }, 2000);
      },
      onPress: function (oEvent) {
        // var KPItext = oEvent.getSource().mProperties.text;
        var KPItext = oEvent.getSource().getTooltip();
        if (!KPItext) {
          return;
        }
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
        // that.request["KPI"] = KPItext;

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
      //  onBeforeRendering: function() {
      //
      //  },
      //  onAfterRendering: function() {
      //
      //  },

      //  onExit: function() {
      //
      //  }

    });

  });