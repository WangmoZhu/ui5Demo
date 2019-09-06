sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("sap.vo.mengniu.controller.blocks.TraceFull", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf sap.vo.mengniu.view.Trace
     */
    onInit: function () {
      this.online = Boolean(sap.ui.getCore().getModel("Online"));
      var oView = this.getView();
      oView.setModel(new sap.ui.model.json.JSONModel());
      oView.setModel(new sap.ui.model.json.JSONModel(), "origin");
      oView.setModel(new sap.ui.model.json.JSONModel(), "download");
      oView.getModel().setSizeLimit(100000);
      oView.getModel("origin").setSizeLimit(100000);
      oView.getModel("download").setSizeLimit(100000);
      oView.byId("processflow1").setZoomLevel("Two");
      var oViz = this.getView().byId("pie");
      var oProperties = {
        general: { //整个vizFrame区域
          background: {
            color: "#000000"
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
            alignment: "center",
            position: "right"
          }
        },
        plotArea: {
          isFixedDataPointSize: true,
          //设置成true，会有滚动轴
          background: {
            color: "transparent" //矩形区域的背景色
          },
          colorPalette: ["#EED257", "#00D5FF", "#009BE2", "#B4D651", "#0372D8", "#71DCE3"],
          dataLabel: {
            //bar上是否显示数值
            // formatString: CustomerFormat.FIORI_PERCENTAGE_FORMAT_2,
            style: {
              //数值的字体样式
              color: "#C3CED9"
            },
            type: "value",
            visible: true
          },
          gridline: {
            //矩形区域中的网格线
            color: "#899AAA",
            size: 1, // 网格线的宽度
            type: "solid", //网格线的样式,可选值:solid(实线), dash(虚线)
            visible: true
          }

        },
        interaction: {
          behaviorType: null,
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
        },
        tooltip: { //当鼠标悬浮在slice上时的弹窗
          background: {
            borderColor: "#cccccc", //tooltip的边框线颜色
            color: "#263552" //tooltip的填充色
          },
          bodyDimensionLabel: {
            color: "#c4ced9" //tooltip上维度标签的颜色
          },
          bodyDimensionValue: {
            color: "#FFFFFF" //tooltip上维度值的颜色
          },
          bodyMeasureLabel: {
            color: "#c4ced9" //tooltip上度量标签的颜色
          },
          bodyMeasureValue: {
            color: "#FFFFFF", //tooltip上度量值的颜色
            type: "valueAndPercentage" //value(只显示数值), percentage(只显示百分比), valueAndPercentage(显示数值和所占百分比)
          },
          visible: true
        }
      };
      oViz.setVizProperties(oProperties);
      this.oProperties = oProperties;
      this.bOptimized = false;
    },
    onAfterRendering: function () {
      var that = this;
      setTimeout(function () {
        if (!that._dialog || !that._dialog.isOpen()) {
          that.onSearch();
        }
      }, 1000);
    },
    loadData: function (oData, fCallback) {
      var oView = this.getView();
      var that = this;
      if (this.online && oData) {
        var aFilter = [];
        for (var i in oData) {
          aFilter.push(new sap.ui.model.Filter(i, "EQ", oData[i]));
        }
        var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZMN_QM_DASHBOARD_SRV", {
          useBatch: false
        });
        oModel.read("/TraceTreeSet", {
          filters: aFilter,
          success: function (oData) {
            if (oData && oData.results && oData.results[0]) {
              try {
                oView.getModel("download").setData(oData.results);
                oView.getModel("origin").setData(that.prepareDataSet(oData.results));
                that.oExpanded = {};
                that.reorgChart();
              } catch (error) {
                sap.m.MessageToast.show("追溯数据解析错误，请联系系统管理员或直接下载追溯数据进行查看。");
                if (fCallback) {
                  fCallback(false);
                }
                return;
              }
              if (fCallback) {
                fCallback(true);
              }
            } else if (fCallback) {
              fCallback(false);
            }
          },
          error: function (oEvent) {
            if (fCallback) {
              fCallback(false);
            }
          }
        })
      } else {
        var oModel = new sap.ui.model.json.JSONModel("json/traceOriginData3.json");
        oModel.attachRequestCompleted(function (e) {
          var oData = oModel.getData();
          oView.getModel("download").setData(oData.list);
          oView.getModel("origin").setData(that.prepareDataSet(oData.list));
          that.oExpanded = {};
          that.reorgChart();
        });
        if (fCallback) {
          fCallback(true);
        }
      }
    },
    loadIntroduction: function (oData) {
      this.getView().setModel(new sap.ui.model.json.JSONModel({
        Product: oData.MAKTX,
        Matnr: oData.MATNR,
        Batch: oData.CHARG,
        Amount: oData.MENGE,
        WERKS: oData.WERKS,
        ZZPRUEFLOS: oData.ZZPRUEFLOS,
        Unit: oData.ZZMSEHI_TXT,
        PlantTxt: oData.ZZWERKS_TXT,
        Stock: Number(oData.ZZCLABS) + Number(oData.ZZCUMLM) + Number(oData.ZZCINSM) + Number(oData.ZZCEINM) + Number(oData.ZZCSPEM)
      }), "Introduction");
      this.getView().byId("pie").setModel(new sap.ui.model.json.JSONModel({
        results: [{
          type: "非限制使用的库存",
          inventory: oData.ZZCLABS
        }, {
          type: "在运库存",
          inventory: oData.ZZCUMLM
        }, {
          type: "质量检验中的库存",
          inventory: oData.ZZCINSM
        }, {
          type: "限制批次的库存",
          inventory: oData.ZZCEINM
        }, {
          type: "冻结的库存",
          inventory: oData.ZZCSPEM
        }]
      }), "Introduction");
      this.getView().byId("SplitterLayoutDataProcessFlow").setSize("80%");
      this.getView().byId("FullScreen").setIcon("sap-icon://full-screen");
    },
    prepareDataSet: function (list) {
      var oCurrentLevelData = {
        "T": {},
        "B": {}
      };
      var iBestT = 0;
      var iBestB = 0;
      var oChild = {};
      var aChild = [];
      var i, j;
      var oStartT,
        iStartT,
        iStartB;
      // list.sort(function (a, b) {
      //  return parseInt(a.ID) - parseInt(b.ID);
      // });
      var iFarm = 80000;
      var iSupply = 90000;
      var oFarm = {};
      var oList = {};
      var oChargList = {};
      var oParentList = {};
      var oNodeList = {};
      for (i = 0; i < list.length; i++) {
        if (!list[i].LEVEL) {
          return [];
        }
        if (list[i].REDUN !== "X") {
          oList[list[i].MATNR + "-" + list[i].WERKS + "-" + list[i].CHARG] = list[i];
        }
        oChargList[list[i].ID] = list[i].CHARG;
        list[i].level = parseInt(list[i].LEVEL);
        list[i].title = list[i].MAKTX || list[i].MATNR || "";
        list[i].children = {};
        list[i].id = list[i].ID;
        list[i].lane = this.getCatalog(String(list[i].MATNR));
        list[i].type = "Single";
        list[i].state = "Positive";
        list[i].stateText = "批次：" + list[i].CHARG;
        list[i].matnr = list[i].MATNR;
        list[i].total = false;
        //"texts": ["工厂: 5004, 3005","总量：239 T"],
        //"stateText": "4个批次",
        if (isNaN(list[i].MENGE)) {
          list[i].MENGE = Number(list[i].MENGE.replace(",", ""));
        } else {
          list[i].MENGE = Number(list[i].MENGE);
        }
        list[i].texts = [list[i].ZZWERKS_TXT, "发货：" + list[i].MENGE + list[i].ZZMSEHI_TXT];
        if (list[i].level === 1 && list[i].EXPTP === "B") {
          oCurrentLevelData[list[i].EXPTP][list[i].level] = oStartT.ID;
          iStartB = i;
        } else {
          oCurrentLevelData[list[i].EXPTP][list[i].level] = list[i].ID;
        }
        if (list[i].level !== 1 && list[i].EXPTP === "T") {
          list[i].children[oCurrentLevelData.T[list[i].level - 1]] = true;
          oParentList[oCurrentLevelData.T[list[i].level - 1]] = true;
        } else if (list[i].level === 1 && list[i].EXPTP === "T") {
          oStartT = list[i];
          iStartT = i;
        } else if (list[i].level !== 1 && list[i].EXPTP === "B") {
          if (!oChild[oCurrentLevelData.B[list[i].level - 1]]) {
            oChild[oCurrentLevelData.B[list[i].level - 1]] = {};
          }
          oChild[oCurrentLevelData.B[list[i].level - 1]][list[i].ID] = true;
          list[i].parent = oCurrentLevelData.B[list[i].level - 1];
        }
        oNodeList[list[i].ID] = list[i];
      }
      list.splice(iStartB, 1);

      this.bHideAccessary = true;
      for (i = 0; i < list.length; i++) {
        if (list[i].EXPTP === "B" || list[i].ID === oStartT.ID) {
          list[i].children = oChild[list[i].ID];
          for (var j in list[i].children) {
            oParentList[j] = true;
          }
        }
        // if (list[i].ID === oStartT.ID) {
        //  list[i].children = {};
        //  list[i].children[sStartB] = true;
        //  this.bHideAccessary = (list[i].lane !== "11");
        // }
        if (list[i].REDUN === "X" && oList[list[i].MATNR + "-" + list[i].WERKS + "-" + list[i].CHARG]) {
          // change for 1A20180320CG01
          //if (!oList[list[i].MATNR + "-" + list[i].WERKS + "-" + list[i].CHARG].children) {
          //  oList[list[i].MATNR + "-" + list[i].WERKS + "-" + list[i].CHARG].children = {};
          //}
          // oList[list[i].MATNR + "-" + list[i].WERKS + "-" + list[i].CHARG].children[list[i].ID] = true;
          list[i].children = list[i].children || {};
          list[i].children[oList[list[i].MATNR + "-" + list[i].WERKS + "-" + list[i].CHARG].ID] = true;
        }
        if (list[i].level === 2 && list[i].EXPTP === "T") {
          this.loadIntroduction(list[i]);
        }
        if (list[i].children && list[i].children[oStartT.ID]) {
          for (var k in oStartT.children) {
            list[i].children[k] = true;
          }
          delete list[i].children[oStartT.ID];
        }
        // if (list[i].children) {
        //   for (var k in list[i].children) {
        //     if (oChargList[k] === list[i].CHARG && k !== list[i].ID) {
        //       oChargList[k] = "FH";
        //     }
        //   }
        // }
      }
      list.splice(iStartT, 1);
      var oAggKunnr = {};
      var oAggKunnrParent = {};
      for (i = 0; i < list.length;) {
        var x = list[i];
        for (var j in list[i].children) {
          if (oChargList[j] === list[i].CHARG && (x.lane !== "4" || x.AUFNR)) { //(list[i].lane !== "4" || list[i].lane !== "5" || (!list[i].ZZKUNNR_TXT && !list[i].EBELN))) {
            list[i].texts[1] = list[i].texts[1].replace("发货", "总量");
            list[i].total = true;
          }
        }

        if ((x.lane === "1" || x.lane === "11") && !oParentList[x.ID] && x.REDUN !== "X") { //x.ZZLIFNR_TXT &&
          x.lane = (x.lane === "1") ? "0" : "00";
          x.MATNR = "0";
          // x.texts.splice(0, 1);
          x.title = x.ZZLIFNR_TXT;
        }
        if (x.ZZKUNNR_TXT && x.lane === "4" && x.parent && (!x.children || Object.keys(x.children).length === 0)) {
          if (!oAggKunnr[x.parent]) {
            oAggKunnr[x.parent] = [];
          }
          oAggKunnr[x.parent].push(x);
          oAggKunnrParent[x.ID] = x.parent;
          // x.lane = "5";
          // x.MATNR = "5";
          // x.title = x.ZZKUNNR_TXT;
          // x.texts.splice(0, 1);
          // x.stateText = "销售订单：" + x.VBELN;
          list.splice(i, 1);
        } else {
          i++;
        }
      }
      for (i = 0; i < list.length; i++) {
        var x = list[i];
        for (var j in x.children) {
          if (oAggKunnrParent[j]) {
            delete x.children[j];
            x.children[oAggKunnrParent[j] + "_KUNNR"] = true;
          }
        }
      }
      for (var j in oAggKunnr) {
        var iAmount = 0,
          sUnit = "";
        oAggKunnr[j].forEach(function (x) {
          iAmount = iAmount + x.MENGE;
          sUnit = x.ZZMSEHI_TXT;
        });
        var oNode = {
          ID: j + "_KUNNR",
          id: j + "_KUNNR",
          lane: "5",
          MATNR: "5",
          type: "Single",
          state: "Positive",
          title: "销售终端",
          stateText: oAggKunnr[j].length + " 个经销商",
          texts: ["总量: " + iAmount + sUnit],
          content: oAggKunnr[j],
          MENGE: iAmount,
          total: true,
          ZZMSEHI_TXT: sUnit
        };
        list.push(oNode);
      }
      this.getView().byId("Hide").setSelected(this.bHideAccessary);
      return list;
    },
    getCatalog: function (matnr) {
      var oRawMilk = {
        "000000001100000000": true,
        "000000001100000001": true,
        "000000001100000002": true,
        "000000001100000003": true
      }
      var oMilkStore = {
        "000000140000000000": true,
        "000000140000000001": true,
        "000000140000000002": true,
        "000000140000000003": true
      }
      if (oRawMilk[matnr]) {
        return "1";
      } else if (oMilkStore[matnr]) {
        return "2";
      }
      var sMatnr = matnr;
      while (sMatnr.length > 1 && sMatnr.charAt(0) === "0") {
        sMatnr = sMatnr.substr(1);
      }
      if (sMatnr.substr(0, 2) === "11" || sMatnr.substr(0, 2) === "12") {
        return "11";
      } else if (sMatnr.substr(0, 3) === "140" && sMatnr.charAt(3) !== "0") {
        return "3";
      } else if (sMatnr.substr(0, 3) === "130" && sMatnr.charAt(3) !== "0") {
        return "4";
      } else {
        return sMatnr;
      }
    },
    reorgChart: function () {
      var oResult = {
        "nodes": [],
        "lanes": [{
          "id": "0",
          "icon": "sap-icon://basket",
          "label": "牧场 / 供应商",
          "position": 0
        }, {
          "id": "1",
          "icon": "sap-icon://basket",
          "label": "原料",
          "position": 1
        }, {
          "id": "2",
          "icon": "sap-icon://machine",
          "label": "原奶 - 奶仓",
          "position": 2
        }, {
          "id": "3",
          "icon": "sap-icon://cart",
          "label": "产成品 - 半成品",
          "position": 3
        }, {
          "id": "4",
          "icon": "sap-icon://crm-sales",
          "label": "产成品",
          "position": 4
        }, {
          "id": "5",
          "icon": "sap-icon://basket",
          "label": "销售终端",
          "position": 5
        }]
      };
      var aOriginNode = JSON.parse(JSON.stringify(this.getView().getModel("origin").getData()));
      var oAggregatedNode = {},
        oMapId = {};
      var i, j;

      for (i = 0; i < aOriginNode.length;) {
        if (this.bHideAccessary && (aOriginNode[i].lane === "11" || aOriginNode[i].lane === "00")) {
          aOriginNode.splice(i, 1);
        } else {
          if (aOriginNode[i].lane === "11") {
            aOriginNode[i].lane = "1";
          }
          if (aOriginNode[i].lane === "00") {
            aOriginNode[i].lane = "0";
          }
          i++;
        }
      }
      for (i = 0; i < aOriginNode.length; i++) {
        if (!this.oExpanded[aOriginNode[i].MATNR] && !this.oExpanded.All) {
          if (!oMapId[aOriginNode[i].ID]) {
            oMapId[aOriginNode[i].ID] = {};
          }
          oMapId[aOriginNode[i].ID] = aOriginNode[i].MATNR;
        }
      }
      for (i = 0; i < aOriginNode.length; i++) {
        for (j in aOriginNode[i].children) {
          if (oMapId[j]) {
            if (oMapId[j] !== aOriginNode[i].MATNR) {
              aOriginNode[i].children[oMapId[j]] = true;
            }
            delete aOriginNode[i].children[j];
          }
        }
        if (oMapId[aOriginNode[i].ID]) {
          if (!oAggregatedNode[oMapId[aOriginNode[i].ID]]) {
            oAggregatedNode[oMapId[aOriginNode[i].ID]] = {
              id: oMapId[aOriginNode[i].ID],
              title: aOriginNode[i].title,
              children: {},
              lane: aOriginNode[i].lane,
              type: "Aggregated",
              state: "Positive",
              texts: ["", ""],
              stateText: "",
              charg: {},
              werks: {},
              amount: 0,
              totalAmount: 0,
              unit: "",
              KUNNR_NUM: 0
            };
            if (aOriginNode[i].lane === "5") {
              oAggregatedNode[oMapId[aOriginNode[i].ID]].title = "销售终端";
            }
            if (aOriginNode[i].lane === "0") {
              oAggregatedNode[oMapId[aOriginNode[i].ID]].title = "供应商";
            }
          }
          for (j in aOriginNode[i].children) {
            oAggregatedNode[oMapId[aOriginNode[i].ID]].children[j] = true;
          }
          if (aOriginNode[i].lane === "5") {
            oAggregatedNode[oMapId[aOriginNode[i].ID]].KUNNR_NUM = oAggregatedNode[oMapId[aOriginNode[i].ID]].KUNNR_NUM + aOriginNode[i].content.length;
          }
          oAggregatedNode[oMapId[aOriginNode[i].ID]].charg[aOriginNode[i].CHARG] = true;
          oAggregatedNode[oMapId[aOriginNode[i].ID]].werks[aOriginNode[i].ZZWERKS_TXT] = true;
          oAggregatedNode[oMapId[aOriginNode[i].ID]].unit = aOriginNode[i].ZZMSEHI_TXT || "";
          if (aOriginNode[i].total) {
            oAggregatedNode[oMapId[aOriginNode[i].ID]].totalAmount = oAggregatedNode[oMapId[aOriginNode[i].ID]].totalAmount + aOriginNode[i].MENGE;
          } else {
            oAggregatedNode[oMapId[aOriginNode[i].ID]].amount = oAggregatedNode[oMapId[aOriginNode[i].ID]].amount + aOriginNode[i].MENGE;
          }
          if (aOriginNode[i].lane === "5") {
            oAggregatedNode[oMapId[aOriginNode[i].ID]].charg[aOriginNode[i].title] = true;
          }
        }
      }

      for (i = 0; i < aOriginNode.length; i++) {
        var x = aOriginNode[i];
        if (!oMapId[x.ID]) {
          oResult.nodes.push(x);
        }
      }
      for (j in oAggregatedNode) {
        oAggregatedNode[j].amount = Number(oAggregatedNode[j].amount);
        oAggregatedNode[j].totalAmount = Number(oAggregatedNode[j].totalAmount);
        if (oAggregatedNode[j].lane === "5") {
          oAggregatedNode[j].stateText = "" + oAggregatedNode[j].KUNNR_NUM + " 个经销商";
          oAggregatedNode[j].texts = ["总量: " + oAggregatedNode[j].totalAmount + " " + oAggregatedNode[j].unit];
        } else if (oAggregatedNode[j].lane === "0") {
          oAggregatedNode[j].stateText = "" + Object.keys(oAggregatedNode[j].charg).length + " 个供应商";
          if (this.bHideAccessary) {
            oAggregatedNode[j].texts = ["发货: " + (oAggregatedNode[j].amount + oAggregatedNode[j].totalAmount) + " " + oAggregatedNode[j].unit];
          }
        } else {
          oAggregatedNode[j].amount = Math.round(oAggregatedNode[j].amount * 100) / 100;
          oAggregatedNode[j].stateText = "" + Object.keys(oAggregatedNode[j].charg).length + " 个批次";
          oAggregatedNode[j].texts = [
            Object.keys(oAggregatedNode[j].werks).join(",")
          ];
          if (oAggregatedNode[j].totalAmount) {
            if (oAggregatedNode[j].amount && oAggregatedNode[j].lane !== "4" ) {
              oAggregatedNode[j].texts.push("总量: " + oAggregatedNode[j].totalAmount + " " + oAggregatedNode[j].unit);
              oAggregatedNode[j].texts.push("发货: " + oAggregatedNode[j].amount + " " + oAggregatedNode[j].unit);
            } else {
              oAggregatedNode[j].texts.push("总量: " + oAggregatedNode[j].totalAmount + " " + oAggregatedNode[j].unit);
            }
          } else {
            oAggregatedNode[j].texts.push("发货: " + oAggregatedNode[j].amount + " " + oAggregatedNode[j].unit);
          }
        }
        oResult.nodes.push(oAggregatedNode[j]);
      }
      for (i = 0; i < oResult.nodes.length; i++) {
        if (oResult.nodes[i].children) {
          oResult.nodes[i].children = Object.keys(oResult.nodes[i].children);
        }
      }
      // this.getView().getModel().setData();
      // this.getView().setModel(new sap.ui.model.json.JSONModel(oResult));
      this.getView().getModel().setData(oResult);
      // this.getView().getModel().refresh();
      this.getView().byId("processflow1").updateModel();
      var that = this;
      if (!this.bOptimized) {
        this.bOptimized = true;
        this.getView().byId("processflow1").optimizeLayout(true);
      }
      //this.getView().byId("processflow1").setZoomLevel("Two");
      // setTimeout(function () {
      //  that.getView().getParent().scrollTo(0, 0);
      // }, 500);
    },
    onOptimize: function () {
      this.getView().byId("processflow1").optimizeLayout(true);
    },
    onNodePress: function (oEvent) {
      var oItem = oEvent.getParameters();
      var oItemData = oItem.getBindingContext().getObject();
      if (oItem.getType() === "Single" && !oItemData.content) {
        var oData = oItem.getBindingContext().getObject();
        if (!this.QualityInfo) {
          this.QualityInfo = sap.ui.xmlfragment("sap.vo.mengniu.view.blocks.fragment.QualityInfo", this);
          this.getView().addDependent(this.QualityInfo);
        }
        if (!isNaN(oData.ZZPRUEFLOS)) {
          oData.ZZPRUEFLOS = Number(oData.ZZPRUEFLOS);
        }
        this.QualityInfo.setModel(new sap.ui.model.json.JSONModel({
          results: [{
            type: "非限制使用的库存",
            inventory: oData.ZZCLABS
          }, {
            type: "在运库存",
            inventory: oData.ZZCUMLM
          }, {
            type: "质量检验中的库存",
            inventory: oData.ZZCINSM
          }, {
            type: "限制批次的库存",
            inventory: oData.ZZCEINM
          }, {
            type: "冻结的库存",
            inventory: oData.ZZCSPEM
          }],
          data: oData,
          inventory: Number(oData.ZZCLABS) + Number(oData.ZZCUMLM) + Number(oData.ZZCINSM) + Number(oData.ZZCEINM) + Number(oData.ZZCSPEM)
        }), "CellDetail");
        sap.ui.getCore().byId("inventoryPie").setVizProperties({
          general: { //整个vizFrame区域
            background: {
              color: "transparent"
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
              alignment: "center",
              position: "bottom"
            }
          },
          plotArea: {
            isFixedDataPointSize: true,
            //设置成true，会有滚动轴
            background: {
              color: "transparent" //矩形区域的背景色
            },
            colorPalette: ["#EED257", "#00D5FF", "#009BE2", "#B4D651", "#0372D8", "#71DCE3"],
          },
          title: {
            visible: false
          }
        });
        var sFilters = [];
        sFilters.push(new sap.ui.model.Filter("plant", "EQ", oData.WERKS));
        sFilters.push(new sap.ui.model.Filter("charg", "EQ", oData.CHARG));
        sFilters.push(new sap.ui.model.Filter("material", "EQ", oData.matnr));
        this.loadQualityCheck(sFilters);
        this.QualityInfo.open();
      } else if (oItem.getType() === "Single" && oItemData.content) {
        var oTable = new sap.m.Table({
          fixedLayout: false,
          mode: "None",
          columns: [
            new sap.m.Column({
              header: new sap.m.Text({
                text: "经销商编号"
              })
            }),
            new sap.m.Column({
              header: new sap.m.Text({
                text: "经销商名称"
              })
            }),
            new sap.m.Column({
              header: new sap.m.Text({
                text: "发货数量"
              })
            }),
            new sap.m.Column({
              header: new sap.m.Text({
                text: "运送车辆"
              })
            }),
            new sap.m.Column({
              header: new sap.m.Text({
                text: "司机电话"
              })
            }),
            new sap.m.Column({
              header: new sap.m.Text({
                text: "销售订单"
              })
            }),
            new sap.m.Column({
              header: new sap.m.Text({
                text: "销售订单"
              })
            })
          ]
        });
        oTable.bindItems("/content", new sap.m.ColumnListItem({
          cells: [
            new sap.m.Text({
              text: "{KUNNR_WE}"
            }),
            new sap.m.Text({
              text: "{ZZKUNNR_TXT}"
            }),
            new sap.m.Text({
              text: "{MENGE} {ZZMSEHI_TXT}"
            }),
            new sap.m.Text({
              text: "{ZZEXTI1}"
            }),
            new sap.m.Text({
              text: "{ZZEXTI2}"
            }),
            new sap.m.Text({
              text: "{KDAUF} {KDPOS}"
            }),
            new sap.m.Text({
              text: "{VBELN} {POSNR}"
            })
          ]
        }))
        var oDialog = new sap.m.Dialog({
          title: "经销商清单",
          contentWidth: "70%",
          draggable: true,
          resizable: true,
          content: [
            oTable
          ],
          customHeader: new sap.m.Bar({
            contentMiddle: [
              new sap.m.Title({
                text: "经销商清单"
              })
            ],
            contentRight: [
              new sap.m.Button({
                icon: "sap-icon://undo",
                press: function () {
                  oDialog.close();
                }
              })
            ]
          }),
          afterClose: function () {
            oDialog.destroy();
          }
        });
        oDialog.setModel(new sap.ui.model.json.JSONModel(oItemData));
        oDialog.open();
      } else {
        var id = oItem.getNodeId();
        this.oExpanded[id] = true;
        var sLane = oItemData.lane;
        if (sLane === "4") {
          this.oExpanded["5"] = true;
        }
        try {
          this.reorgChart();
        } catch (error) {
          sap.m.MessageToast.show("追溯数据解析错误，请联系系统管理员或直接下载追溯数据进行查看。");
        }
      }
    },
    loadQualityCheck: function (aFilter) {
      var oView = this.getView();
      var that = this;
      if (this.online) {
        if (!sap.ui.getCore().getModel("ZMN_QM_DASHBOARD")) {
          sap.ui.getCore().setModel(new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZMN_QM_DASHBOARD_SRV", {
            useBatch: false
          }), "ZMN_QM_DASHBOARD");
        }
        sap.ui.getCore().byId("qualityCheckResult").setVisible(false);
        sap.ui.getCore().byId("qualityCheckSize2").setSize("0px");
        sap.ui.getCore().getModel("ZMN_QM_DASHBOARD").read("/QualityCheckSet", {
          filters: aFilter,
          success: function (oData) {
            if (oData && oData.results && oData.results[0]) {
              var oModel = new sap.ui.model.json.JSONModel();
              oModel.setData(oData);
              sap.ui.getCore().byId("table").setModel(oModel);
              sap.ui.getCore().byId("qualityCheckResult").setVisible(true);
              sap.ui.getCore().byId("qualityCheckSize2").setSize("700px");
              // sap.ui.getCore().byId("table").getBinding("rows").filter(new sap.ui.model.Filter(sFilters, true));
              // this.QualityInfo.openBy(oItem);
            } else {
              sap.ui.getCore().byId("table").setModel(new sap.ui.model.json.JSONModel());
            }
          },
          error: function (oEvent) {
            sap.ui.getCore().byId("table").setModel(new sap.ui.model.json.JSONModel());
          }
        });
      } else {
        // sap.ui.getCore().byId("table").setModel(new sap.ui.model.json.JSONModel("json/qualityDetail.json"));
        var oModel = new sap.ui.model.json.JSONModel("json/qualityDetail.json");
        oModel.attachRequestCompleted(function (e) {
          if (aFilter.length === 0) {
            sap.ui.getCore().byId("table").getBinding("rows").filter();
          } else {
            sap.ui.getCore().byId("table").getBinding("rows").filter(new sap.ui.model.Filter(aFilter, true));
          }
          sap.ui.getCore().byId("table").setModel(oModel);
        });
      }
    },
    onCollapse: function () {
      this.oExpanded = {};
      this.reorgChart();
    },
    onExpand: function () {
      this.oExpanded = {
        "All": true
      };
      this.reorgChart();
    },
    onZoomIn: function () {
      if (this.getView().byId("processflow1").getZoomLevel() !== "Two") {
        this.getView().byId("processflow1").zoomIn();
      }
    },
    onZoomOut: function () {
      if (this.getView().byId("processflow1").getZoomLevel() !== "Three") {
        this.getView().byId("processflow1").zoomOut();
      }
    },
    onSearch: function (oEvent) {
      var upper = function (oEvent) {
        oEvent.getSource().setValue(oEvent.getSource().getValue().toUpperCase());
      }
      var oWerksInput = new sap.m.Input({
        maxLength: 4,
        liveChange: upper
      });
      var oMatnrInput = new sap.m.Input({
        maxLength: 18,
        liveChange: upper
      });
      var oChargInput = new sap.m.Input({
        maxLength: 10,
        liveChange: upper
      });
      var oZhouzhuanInput = new sap.m.Input({
        maxLength: 20,
        liveChange: upper
      });
      var oXiangtiInput = new sap.m.Input({
        maxLength: 20,
        liveChange: upper
      });
      var oBaotiInput = new sap.m.Input({
        maxLength: 20,
        liveChange: upper
      });
      var oIconTabBar = new sap.m.IconTabBar({
        items: [
          new sap.m.IconTabFilter({
            icon: "sap-icon://customer-view",
            key: "B",
            text: "包体批次",
            content: [
              new sap.m.InputListItem({
                label: "包体批次",
                content: oBaotiInput
              })
            ]
          }),
          new sap.m.IconTabFilter({
            icon: "sap-icon://product",
            key: "X",
            text: "箱体批次",
            content: [
              new sap.m.InputListItem({
                label: "箱体批次",
                content: oXiangtiInput
              })
            ]
          }),
          new sap.m.IconTabFilter({
            icon: "sap-icon://shipping-status",
            key: "Z",
            text: "周转箱批次",
            content: [
              new sap.m.InputListItem({
                label: "周转箱批次",
                content: oZhouzhuanInput
              })
            ]
          }),
          new sap.m.IconTabFilter({
            icon: "sap-icon://factory",
            key: "G",
            text: "工厂内部批次",
            content: [
              new sap.m.InputListItem({
                label: "工厂",
                content: oWerksInput
              }),
              new sap.m.InputListItem({
                label: "物料",
                content: oMatnrInput
              }),
              new sap.m.InputListItem({
                label: "批次",
                content: oChargInput
              })
            ]
          })
        ]
      });
      // 工厂/物料/批次和周转箱/箱体/包体两套
      var that = this;
      var dialog = new sap.m.Dialog({
        title: '请输入追溯批次',
        resizable: true,
        draggable: true,
        content: [
          oIconTabBar
        ],
        beginButton: new sap.m.Button({
          text: '确定',
          press: function () {
            var oData = {};
            switch (oIconTabBar.getSelectedKey()) {
              case "X":
                oData.WA_CHARG_XT = oXiangtiInput.getValue();
                if (!oData.WA_CHARG_XT) {
                  sap.m.MessageToast.show("请填写批次信息");
                  return;
                }
                break;
              case "Z":
                oData.WA_CHARG_ZZX = oZhouzhuanInput.getValue();
                if (!oData.WA_CHARG_ZZX) {
                  sap.m.MessageToast.show("请填写批次信息");
                  return;
                }
                break;
              case "G":
                oData.WA_WERKS = oWerksInput.getValue();
                oData.WA_MATNR = oMatnrInput.getValue();
                oData.WA_CHARG = oChargInput.getValue();
                if (!oData.WA_CHARG || !oData.WA_MATNR || !oData.WA_WERKS) {
                  sap.m.MessageToast.show("请填写批次信息");
                  return;
                }
                break;
              case "B":
              default:
                oData.WA_CHARG_BT = oBaotiInput.getValue();
                if (!oData.WA_CHARG_BT) {
                  sap.m.MessageToast.show("请填写批次信息");
                  return;
                }
                break;
            }
            dialog.setBusy(true);
            that.loadData(oData, function (bCorrect) {
              dialog.setBusy(false);
              if (bCorrect) {
                dialog.close();
              } else {
                sap.m.MessageToast.show("批次信息有误，没有追溯信息。")
              }
            });
          }
        }),
        endButton: new sap.m.Button({
          text: '取消',
          press: function () {
            dialog.close();
          }
        }),
        afterClose: function () {
          dialog.destroy();
        }
      });
      dialog.addStyleClass("myDialog");
      this._dialog = dialog;
      dialog.open();
    },
    onHideAccessory: function (oEvent) {
      this.bHideAccessary = oEvent.getSource().getSelected();
      this.reorgChart();
    },
    onClose: function (oEvent) {
      this.QualityInfo.close();
    },
    onFullScreen: function (oEvent) {
      if (oEvent.getSource().getIcon() === "sap-icon://full-screen") {
        this.getView().byId("SplitterLayoutDataProcessFlow").setSize("100%");
        oEvent.getSource().setIcon("sap-icon://exit-full-screen");
      } else {
        this.getView().byId("SplitterLayoutDataProcessFlow").setSize("80%");
        oEvent.getSource().setIcon("sap-icon://full-screen");
      }
    },
    formatVisible: function (sValue) {
      return Boolean(sValue);
    },
    onDownload: function () {
      function _s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
      var wbout = this._genWorkbook("Sheet1");
      if (!wbout) {
        return;
      }
      var excelName = "追溯数据";

      /* the saveAs call downloads a file on the local machine */
      saveAs(new Blob([_s2ab(wbout)], {
        type: "application/octet-stream"
      }), excelName + ".xlsx");
    },
    _genWorkbook: function (sheetName) {
      var oTemplate = [
{"id":"EXPTP","name":"类型（T为自上而下，B为自下而上）"},
{"id":"ID","name":"编号"},
{"id":"LEVEL","name":"层级"},
{"id":"TYPE","name":"类型"},
{"id":"MATNR","name":"物料号"},
{"id":"MAKTX","name":"物料描述"},
{"id":"WERKS","name":"工厂"},
{"id":"ZZWERKS_TXT","name":"工厂描述"},
{"id":"CHARG","name":"批次"},
{"id":"ZUSTD","name":"限制使用库存中的批量"},
{"id":"LICHA","name":"供应商的批次"},
{"id":"MENGE","name":"数量"},
{"id":"ZZMSEHI_TXT","name":"单位"},
{"id":"MEINS","name":"单位"},
{"id":"AUFNR","name":"生产订单"},
{"id":"AUFPS","name":"行项目"},
{"id":"AUTYP","name":"生产订单类型"},
{"id":"EBELN","name":"采购订单"},
{"id":"EBELP","name":"采购凭证的项目编号"},
{"id":"PSTYP","name":"采购凭证中的项目类别"},
{"id":"KDAUF","name":"销售订单数"},
{"id":"KDPOS","name":"销售订单中的项目编号 "},
{"id":"VBELN","name":"交货"},
{"id":"POSNR","name":"交货项目"},
{"id":"KUNNR_WE","name":"售达方"},
{"id":"ZZKUNNR_TXT","name":"售达方描述"},
{"id":"UMMAT","name":"收货/发货物料"},
{"id":"UMWRK","name":"收货/发货工厂"},
{"id":"UMCHA","name":"收货/发货批量"},
{"id":"KZBEW","name":"移动标识"},
{"id":"LOTAL","name":"BWUL: 是否至少一个检验批已分配到批次的标识"},
{"id":"REDUN","name":"BWUL: 对象是多余的"},
{"id":"REKUR","name":"BWUL: 由于递归, 进一步展开被终止 "},
{"id":"STORNO","name":"复选框"},
{"id":"IND","name":"单一字符标识"},
{"id":"ORIGIN","name":"单一字符标识"},
{"id":"SORT_ALV","name":"内部表的索引"},
{"id":"ACT_SYSTEM","name":"逻辑系统"},
{"id":"SYS_LINK","name":"逻辑系统"},
{"id":"SYS_WERKS","name":"转储单的供应(发出)工厂"},
{"id":"UCHKZ","name":"初始批次管理的标识 "},
{"id":"AJAHR","name":"创建初始批量的年"},
{"id":"UCWRK","name":"初始批量的工厂 "},
{"id":"UCMAT","name":"初始批量物料"},
{"id":"UCCHA","name":"初始批次"},
{"id":"WIPB_EXIST","name":"复选框"},
{"id":"EXT_LEVEL","name":"外部批次使用处清单中的外部等级 "},
{"id":"VERSION","name":"外部批次使用的版本号"},
{"id":"CHVW_DUMMY","name":"长度 1 中的哑元函数"},
{"id":"TRIALID","name":"试验编号"},
{"id":"TRIALNAME","name":"试验名称"},
{"id":"SHIP2PARTY","name":"送达方 "},
{"id":"ZZUMWRK_TXT","name":"收货/发货工厂描述"},
{"id":"ZZLIFNR","name":"供应商"},
{"id":"ZZLIFNR_TXT","name":"供应商描述"},
{"id":"ZZPRUEFLOS","name":"检验批"},
{"id":"ZZKURZTEXT","name":"检验状态"},
{"id":"ZZTKNUM","name":"装运编号"},
{"id":"ZZEXTI1","name":"车牌号"},
{"id":"ZZEXTI2","name":"司机手机"},
{"id":"ZZVSART","name":"装运类型"},
{"id":"ZZSHIPPING_TYPE","name":"装运类型描述"},
{"id":"ZZCLABS","name":"非限制使用的估价的库存 "},
{"id":"ZZCUMLM","name":"在运库存 (从一库存地到另一库存地)"},
{"id":"ZZCINSM","name":"质量检验中的库存 "},
{"id":"ZZCEINM","name":"全部限制批次的总计库存"},
{"id":"ZZCSPEM","name":"冻结的库存 "},
{"id":"ZZCIQ","name":"CIQ"},
{"id":"ZZHSDAT","name":"生产日期"}
];
      var data = [];
      var r, c;
      var cell_ref = "";

      var sheets = {
        list: {}
      };
      for (c = 0; c < oTemplate.length; c++) {
        cell_ref = XLSX.utils.encode_cell({
          c: c,
          r: 0
        });
        sheets.list[cell_ref] = {
          t: "s",
          v: oTemplate[c].name
        };
      }

      data = this.getView().getModel("download").getData();
      for (r = 0; r < data.length; r++) {
        if(data[r].EXPTP){
          for (c = 0; c < oTemplate.length; c++) {
            cell_ref = XLSX.utils.encode_cell({
              c: c,
              r: r + 1
            });
            sheets.list[cell_ref] = {
              t: "s",
              v: data[r][oTemplate[c].id]
            };
          }
        }
      }

      sheets.list["!ref"] = "A1:" + cell_ref;
      var workbook = {
        SheetNames: ["list"],
        Sheets: sheets
      };

      /* bookType can be any supported output type */
      var wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      };

      var wbout = XLSX.write(workbook, wopts);

      return wbout;
    }

    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf sap.vo.mengniu.view.Trace
     */
    //  onBeforeRendering: function() {
    //
    //  },

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf sap.vo.mengniu.view.Trace
     */
    //  onAfterRendering: function() {
    //
    //  },

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf sap.vo.mengniu.view.Trace
     */
    //  onExit: function() {
    //
    //  }

  });

});