sap.ui.define([
  "sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
  'sap/vo/mengniu/controller/blocks/CustomerFormat'
], function(BlockContentBase, CustomerFormat) {
  "use strict";

  return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.SPC", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf sap.vo.mengniu.view.SPC
     */
    onInit: function() {
      var that = this;
      this.online = Boolean(sap.ui.getCore().getModel("Online"));
      if(!sap.ui.getCore().getModel("QualityIssueConfig")){
        sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel("json/QualityIssueConfig.json"),"QualityIssueConfig");
      }

      this.initCustomFormat();
      this.EndDate = this.getDate();
      this.StartDate = this.getDate("FDOCM");
      this.getView().setModel(new sap.ui.model.json.JSONModel(), "ChartData");
      this.loadData();
      this.chartInit();
      setTimeout(function() {
        this.setViewIndex(1);
      }.bind(this), 300);
    },
    loadData: function() {
      var that = this;
      if (!this.online) {
        var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.vo.mengniu", "/json/accident.json"));
        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
        oModel.attachRequestCompleted(function(data) {
          that.getView().getModel("ChartData").setData(data.oSource.oData);
        });
      } else {
        var oKpiConfig = sap.ui.getCore().getModel("QualityIssueConfig").getData();
        if(!oKpiConfig.Query){
          setTimeout(function(){
            that.loadData();
          },500);
        }
        this.ChartData = {
          time: [],
          category: []
        };
        this.getView().getModel("ChartData").setData(this.ChartData);
        if(!sap.ui.getCore().getModel("ZQM_CA01_Q002")){
          sap.ui.getCore().setModel(new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZQM_CA01_Q002_SRV", {
          useBatch: false
        }),"ZQM_CA01_Q002");
        }
        var oDataModel = sap.ui.getCore().getModel("ZQM_CA01_Q002");
        oDataModel.read("/ZQM_CA01_Q002(ZVAPLANT='',ZVUDAY01='" + this.StartDate + "',ZVUDAY01To='" + this.EndDate +
          "')/Results", {
            urlParameters:{
              "$select":"ZPLANT_T,A00O2TGSVB59CBKIHRR3MHDPLL,A00O2TGSVB59CBKIHRR3MHDPLL_F",
              "$top":100
            },
            success: function(data) {
              var colId = "A00O2TGSVB59CBKIHRR3MHDPLL";
              var desc = function(x, y) {
                return (Number(x[colId]) < Number(y[colId])) ? 1 : -1;
              };
              data.results.sort(desc); //绛序排序
              for (var i = 0; i < Math.min(data.results.length,7); i++) {
                that.ChartData.time.push({
                  CreateDate: data.results[i].ZPLANT_T,
                  Value: Number(data.results[i][colId])
                });
              }
              that.getView().getModel("ChartData").refresh();
            },error: function(oEvent){
              var abc = oEvent;
            }
          });
        oDataModel.read("/ZQM_CA01_Q002(ZVAPLANT='',ZVUDAY01='" + this.StartDate + "',ZVUDAY01To='" + this.EndDate +
          "')/Results", {
            urlParameters:{
              "$select":"ZBP_CL_T,ZBP_CL,A00O2TGSVB59CBKIHRR3MHDPLL,A00O2TGSVB59CBKIHRR3MHDPLL_F",
              "$top":100
            },
            success: function(data) {
              var colId = "A00O2TGSVB59CBKIHRR3MHDPLL";
              var desc = function(x, y) {
                return (Number(x[colId]) < Number(y[colId])) ? 1 : -1;
              };
              data.results.sort(desc); //绛序排序
              var otherValue = 0;
              for (var i = 0; i < data.results.length; i++) {
                if (i < 7) {
                  that.ChartData.category.push({
                    Category: data.results[i].ZBP_CL_T,
                    Value: Number(data.results[i][colId])
                  });
                } else {
                  otherValue += Number(data.results[i][colId]);
                }
              }
              that.ChartData.category.push({
                Category: "其他",
                value: otherValue
              });
              that.getView().getModel("ChartData").refresh();
            }
          });

      }
    },
    chartInit: function() {

      var that = this;
      // bar bar line
      var oViz = this.getView().byId("line");
      //oViz.setModel(oModel);
      var oProperties = {
        general: { //整个vizFrame区域
          background: {
            color: "transparent"
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
            formatString: CustomerFormat.FIORI_LABEL_FORMAT_2
          },
          title: {
            visible: false
          }
        },
        valueAxis2: {
          label: {
            formatString: CustomerFormat.FIORI_LABEL_FORMAT_2
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
            // formatString: CustomerFormat.FIORI_PERCENTAGE_FORMAT_2,
            style: {
              //数值的字体样式
              color: "#C3CED9",
              fontSize: "15px"
            },
            type: "value",
            visible: true
          },
          dataShape: {
            primaryAxis: ["bar", "bar", "line"] //数据显示形状
          },
          gridline: {
            //矩形区域中的网格线
            color: "#757F89",
            size: 0, // 网格线的宽度
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
            autoMaxValue: null,
            autoMinValue: null,
            fixedRange: false,
            //当fixedRange=false时，设置maxValue和minValue的值无效
            maxValue: 1,
            //数值轴刻度的最大值
            minValue: 0.9 //数值轴刻度的最小值
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
          // text: "投诉率前10名省份",
          style: {
            //标题的字体样式
            color: "#fff",
            fontFamily: "'Open Sans', Arial, Helvetica, sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "normal",
            "letter-spacing": "1px"
          },
          visible: true
        }
      };
      oProperties.title.text = "本月质量问题 - 工厂 Top 7";
      oProperties.title.visible = true;
      oProperties.plotArea.dataLabel.typetype = "value"; //可选值:color(只显示度量名称), value(只显示数值), percentage(显示百分比), colorAndPercentage(显示度量名称和百分比)

      oViz.setVizProperties(oProperties);
      // oPopOver.connect(oViz.getVizUid());
      // oPopOver.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
      // oPopOver.setActionItems([oActionItem1]);
      // oPopOver.setActionItems([oActionItem2]);

      //pie
      var oViz = this.getView().byId("pie");
    //  oViz.setModel(oModel);
      oProperties.title.text = "本月质量问题 - 分类";
      oProperties.title.visible = true;
      oProperties.plotArea.dataLabel.typetype = "colorAndPercentage"; //可选值:color(只显示度量名称), value(只显示数值), percentage(显示百分比), colorAndPercentage(显示度量名称和百分比)

      oViz.setVizProperties(oProperties);
      var oPopOver = this.getView().byId("PopOverPie");
      oPopOver.connect(oViz.getVizUid());
      oPopOver.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
      // oPopOver.setActionItems([oActionItem1]);

    },
    onNavToSPC: function(oEvent) {
      var oKey = oEvent.getSource().getId();
      this.getRouter().navTo("single", {
        appId: 'SPC',
        viewIndex: '3'
      });
      return;
    },
    //  // var oNav = this.getView().byId("nav");
    //  // oNav.to(this.getView().byId(oKey));
    //  switch (oKey.split("--")[1]) {
    //    case "accident":
    //      this.getView().byId("accident").setVisible(true);
    //      this.getView().byId("audit").setVisible(false);
    //      this.getView().byId("spc").setVisible(false);
    //      // this.getView().byId("accidentDetail").setVisible(false);
    //      break;
    //    case "Buttonaudit":
    //      this.getView().byId("accident").setVisible(false);
    //      this.getView().byId("audit").setVisible(true);
    //      this.getView().byId("spc").setVisible(false);
    //      // this.getView().byId("accidentDetail").setVisible(false);
    //      break;
    //    case "Buttonspc":
    //      this.getView().byId("accident").setVisible(false);
    //      this.getView().byId("audit").setVisible(false);
    //      this.getView().byId("spc").setVisible(true);
    //      // this.getView().byId("accidentDetail").setVisible(false);
    //      break;
    //    default:

    //      break;
    //  }

    // },
    // onSPCSelect: function(oEvent) {
    //  var oKey = oEvent.getSource().getSelectedKey();
    //  switch (oKey) {
    //    case "spc1":
    //      this.getView().byId("spc1").setVisible(true);
    //      this.getView().byId("spc2").setVisible(false);
    //      this.getView().byId("spc3").setVisible(false);
    //      this.getView().byId("spc4").setVisible(false);
    //      break;
    //    case "spc2":
    //      this.getView().byId("spc1").setVisible(false);
    //      this.getView().byId("spc2").setVisible(true);
    //      this.getView().byId("spc3").setVisible(false);
    //      this.getView().byId("spc4").setVisible(false);
    //      break;
    //    case "spc3":
    //      this.getView().byId("spc1").setVisible(false);
    //      this.getView().byId("spc2").setVisible(false);
    //      this.getView().byId("spc3").setVisible(true);
    //      this.getView().byId("spc4").setVisible(false);
    //      break;
    //    default:
    //      this.getView().byId("spc1").setVisible(false);
    //      this.getView().byId("spc2").setVisible(false);
    //      this.getView().byId("spc3").setVisible(false);
    //      this.getView().byId("spc4").setVisible(true);
    //      break;
    //  }
    // },
    // onSelectData: function(oEvent) {
      // var oNav = this.getView().byId("nav");
      // oNav.to(this.getView().byId("accidentDetail"));
      /*  this.getView().byId("accident").setVisible(false);
        this.getView().byId("audit").setVisible(false);
        this.getView().byId("spc").setVisible(false);
        this.getView().byId("accidentDetail").setVisible(true);*/
    //  var that = this;
    //  if (!that._oDialog) {
    //    that._oDialog = sap.ui.xmlfragment("sap.vo.mengniu.controller.blocks.SPCFragment", that);
    //  }

    //  that.getView().addDependent(that._oDialog);
    //  that._oDialog.open();

    // },
    // onNavBack: function(oEvent) {
    //  // var oNav = this.getView().byId("nav");
    //  // oNav.back();
    //  this.getView().byId("accident").setVisible(true);
    //  // this.getView().byId("accidentDetail").setVisible(false);
    //  this.getView().byId("audit").setVisible(false);
    //  this.getView().byId("spc").setVisible(false);
    //  this.setViewIndex(1);
    // },
    // onHelp: function(oEvent) {

    //  var dialog = new sap.m.Dialog({
    //    title: '参数详情',
    //    type: 'Message',
    //    content: [
    //      new sap.ui.layout.HorizontalLayout({
    //        content: [
    //          new sap.ui.layout.VerticalLayout({
    //            width: '120px',
    //            content: [
    //              new sap.m.Text({
    //                text: 'Cp: '
    //              }),
    //              new sap.m.Text({
    //                text: 'Cp_l:'
    //              }),
    //              new sap.m.Text({
    //                text: 'Cp_u: '
    //              }),
    //              new sap.m.Text({
    //                text: 'Cp_k: '
    //              }),
    //              new sap.m.Text({
    //                text: 'Cpm: '
    //              })
    //            ]
    //          }),
    //          new sap.ui.layout.VerticalLayout({
    //            content: [
    //              new sap.m.Text({
    //                text: '0.933；含义解释 XXXX '
    //              }),
    //              new sap.m.Text({
    //                text: '1.21；含义解释 XXXX '
    //              }),
    //              new sap.m.Text({
    //                text: '0.34；含义解释 XXXX '
    //              }),
    //              new sap.m.Text({
    //                text: '0.53；含义解释 XXXX '
    //              }),
    //              new sap.m.Text({
    //                text: '0.63；含义解释 XXXX '
    //              })
    //            ]
    //          })
    //        ]
    //      })
    //    ],
    //    beginButton: new sap.m.Button({
    //      text: 'OK',
    //      press: function() {
    //        dialog.close();
    //      }
    //    }),
    //    afterClose: function() {
    //      dialog.destroy();
    //    }
    //  });

    //  dialog.open();
    // },
    // onFilterTime: function(oEvent) {
    //  var that = this;
    //  var date = new Date();
    //  var year = date.getFullYear();
    //  var dateValue = new Date(year, 0, 1);
    //  var secondDateValue = new Date(year, 11, 31);
    //  var dialog = new sap.m.Dialog({
    //    title: '参数详情',
    //    type: 'Message',
    //    content: [
    //      new sap.m.DateRangeSelection({
    //        delimiter: " - ",
    //        dateValue: dateValue,
    //        secondDateValue: secondDateValue,
    //        displayFormat: "yyyy/MM/dd"
    //      })
    //    ],
    //    beginButton: new sap.m.Button({
    //      text: '确认',
    //      press: function(oEvent) {
    //        that.handleChangeTime(oEvent);
    //        dialog.close();
    //      }
    //    }),
    //    afterClose: function() {
    //      dialog.destroy();
    //    }
    //  });

    //  dialog.open();
    // },
    // handleChangeTime: function(event) {},
    onSelectSalesforce: function() {
      window.open("https://login.salesforce.com");
    },
    initCustomFormat: function() {
      CustomerFormat.registerCustomFormat();
    }
  });

});