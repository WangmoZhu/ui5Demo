sap.ui.define([
  "sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
  'sap/vo/mengniu/controller/blocks/CustomerFormat',
  "sap/m/MessageBox"
], function (BlockContentBase, CustomerFormat, MessageBox) {
  "use strict";

  return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.SPCFull", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf sap.vo.mengniu.view.SPC
     */
    onInit: function () {
      this.online = Boolean(sap.ui.getCore().getModel("Online"));
      this.getView().setModel(new sap.ui.model.json.JSONModel());
      this.getView().byId("StartDate").setValue(this.getDate("FDOLW"));
      this.getView().byId("EndDate").setValue(this.getDate("LDOLW"));
      if (this.online) {
        this.oDataModel = sap.ui.getCore().getModel("ZMN_QM_DASHBOARD");
        //if (!sap.ui.getCore().getModel("ZQM_MA06_Q002")) {
        //  sap.ui.getCore().setModel(new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZQM_MA06_Q002_SRV", {
        //    useBatch: false
        //  }), "ZQM_MA06_Q002");
        //}
        //this.oDetailModel = sap.ui.getCore().getModel("ZQM_MA06_Q002");
      }
      this.initYT();
      this.getView().byId("NormalityChart").onAfterRendering = function(oEvent){
        var iWidth = window.innerWidth - 48;
        var iImageWidth = $("#" + oEvent.srcControl.getId()).width();
        var iMargin = Math.min(( iWidth / 2 - iImageWidth ) / 2,48);
        $("#" + oEvent.srcControl.getId()).css("margin-left",iMargin + "px");
      };
    },
    onApply: function () {
      var oView = this.getView();
      if (this.online) {
        var iLSL = oView.byId("LSL").getValue();
        var iUSL = oView.byId("USL").getValue();
        var iTARGET = oView.byId("TARGET").getValue();
        if (!iLSL || !iUSL || !iTARGET) {
          sap.m.MessageToast.show("请输入基准值");
          return;
        }
        if (isNaN(iLSL) || isNaN(iUSL) || isNaN(iTARGET)) {
          sap.m.MessageToast.show("请输入数字作为基准值");
          return;
        }
        var sTable = "/BIC/AZ1QMOA1600";
        var sKF = "/BIC/ZCLLVALUK";
        oView.byId("KPI").getSelectedKey();
        var sPlant = oView.byId("Plant").getSelectedKey();
        var sProduct = oView.byId("Product").getSelectedKey();
        var sKPI = oView.byId("KPI").getSelectedKey();
        var sStartDate = oView.byId("StartDate").getValue();
        var sEndDate = oView.byId("EndDate").getValue();
        var sWHERE = "/BIC/ZPLANT = `" + sPlant + "` AND " +
          "/BIC/ZMATERIAL = `" + sProduct + "` AND " +
          "TXTMD = `" + sKPI + "` AND " +
          "CALDAY >= `" + sStartDate + "` AND " +
          "CALDAY <= `" + sEndDate + "`";
        this.oDataModel.read("/SPCSet", {
          filters: [
            new sap.ui.model.Filter("LSL", "EQ", iLSL),
            new sap.ui.model.Filter("USL", "EQ", iUSL),
            new sap.ui.model.Filter("TARGET", "EQ", iTARGET),
            new sap.ui.model.Filter("TABLE", "EQ", sTable),
            new sap.ui.model.Filter("KF", "EQ", sKF),
            new sap.ui.model.Filter("WHERE", "EQ", sWHERE)
          ],
          success: function (oData) {
            if (oData && oData.results && oData.results[0]) {
              if (oData.results[0].ERROR) {
                sap.m.MessageBox.error(oData.results[0].ERROR);
              } else {
                oView.getModel().setData(oData.results[0]);
                oView.byId("Type").setVisible(true);
              }
            }
          }
        });
      } else {
        oView.getModel().loadData("json/SPC.json", {}, false);
        oView.byId("Type").setVisible(true);
        oView.getModel().refresh();
      }
    },
    onSPCSelect: function (oEvent) {
      var oKey = oEvent.getSource().getSelectedKey();
      switch (oKey) {
        case "spc1":
          this.getView().byId("spc1").setVisible(true);
          this.getView().byId("spc2").setVisible(false);
          this.getView().byId("spc3").setVisible(false);
          break;
        case "spc2":
          this.getView().byId("spc1").setVisible(false);
          this.getView().byId("spc2").setVisible(true);
          this.getView().byId("spc3").setVisible(false);
          break;
        case "spc3":
          this.getView().byId("spc1").setVisible(false);
          this.getView().byId("spc2").setVisible(false);
          this.getView().byId("spc3").setVisible(true);
          break;
      }
    },
    initYT: function () {
      var that = this;
      var aPlantList = sap.ui.getCore().getModel("Plant").getData().results;
      if(!aPlantList){
        setTimeout(function(){
          that.initYT();
        },500);
        return;
      }
      var aYT = {},
        aSCDQ = {},
        aPlant = {};
      aPlantList.forEach(function (x) {
        aYT[x.YT] = {
          key: String(x.YT),
          text: String(x.YT_TXT)
        };
        aSCDQ[x.SCDQ] = {
          key: String(x.SCDQ),
          text: String(x.SCDQ_TXT)
        };
        aPlant[x.PLANT] = {
          key: String(x.PLANT),
          text: String(x.PLANT_TXT)
        };
      });
      var oYT = this.getView().byId("YT"),
        oSCDQ = this.getView().byId("SCDQ"),
        oPlant = this.getView().byId("Plant");
      oYT.removeAllItems();
      oSCDQ.removeAllItems();
      oPlant.removeAllItems();
      oYT.addItem(new sap.ui.core.Item({key:"",text:""}));
      oSCDQ.addItem(new sap.ui.core.Item({key:"",text:""}));
      oPlant.addItem(new sap.ui.core.Item({key:"",text:""}));
      for (var i in aYT) {
        oYT.addItem(new sap.ui.core.Item(aYT[i]));
      }
      for (var i in aSCDQ) {
        oSCDQ.addItem(new sap.ui.core.Item(aSCDQ[i]));
      }
      for (var i in aPlant) {
        oPlant.addItem(new sap.ui.core.Item(aPlant[i]));
      }
    },
    onChangeYT: function () {
      var aPlantList = sap.ui.getCore().getModel("Plant").getData().results;
      var aSCDQ = {},
        aPlant = {};
      var sYT = this.getView().byId("YT").getSelectedKey();
      aPlantList.forEach(function (x) {
        if (sYT === String(x.YT) || !sYT) {
          aSCDQ[x.SCDQ] = {
            key: String(x.SCDQ),
            text: String(x.SCDQ_TXT)
          };
          aPlant[x.PLANT] = {
            key: String(x.PLANT),
            text: String(x.PLANT_TXT)
          };
        }
      });
      var oSCDQ = this.getView().byId("SCDQ"),
        oPlant = this.getView().byId("Plant");
      oSCDQ.removeAllItems();
      oPlant.removeAllItems();
      oSCDQ.addItem(new sap.ui.core.Item({key:"",text:""}));
      oPlant.addItem(new sap.ui.core.Item({key:"",text:""}));
      for (var i in aSCDQ) {
        oSCDQ.addItem(new sap.ui.core.Item(aSCDQ[i]));
      }
      for (var i in aPlant) {
        oPlant.addItem(new sap.ui.core.Item(aPlant[i]));
      }
    },
    onChangeSCDQ: function (oEvent) {
      var aPlantList = sap.ui.getCore().getModel("Plant").getData().results;
      var aPlant = {};
      var sYT = this.getView().byId("YT").getSelectedKey();
      var sSCDQ = this.getView().byId("SCDQ").getSelectedKey();
      aPlantList.forEach(function (x) {
        if ((sSCDQ === String(x.SCDQ) || !sSCDQ) && (sYT === String(x.YT) || !sYT)) {
          aPlant[x.PLANT] = {
            key: String(x.PLANT),
            text: String(x.PLANT_TXT)
          };
        }
      });
      var oPlant = this.getView().byId("Plant");
      oPlant.removeAllItems();
      oPlant.addItem(new sap.ui.core.Item({key:"",text:""}));
      for (var i in aPlant) {
        oPlant.addItem(new sap.ui.core.Item(aPlant[i]));
      }
    },
    onChangePlant: function (oEvent) {
      var oControl = this.getView().byId("Product");
      oControl.setEnabled(true);
      if (this.oDataModel) {
        var sPlant = this.getView().byId("Plant").getSelectedKey();
        if (!sPlant) {
          oControl.setEnabled(false);
          return;
        }
        var sCurrent = oControl.getSelectedKey();
        oControl.removeAllItems();
        oControl.addItem(new sap.ui.core.Item({
          key: "",
          text: ""
        }));
        var sStartDate = this.getView().byId("StartDate").getValue();
        var sEndDate = this.getView().byId("EndDate").getValue();
        oControl.setBusy(true);
        /*this.oDetailModel.read("/ZQM_MA06_Q002(ZVUDAY01='" + sStartDate + "',ZVUDAY01To='" + sEndDate + "',ZVAPLANT='" + sPlant + "')/Results", {
          urlParameters:{
            "$select":"ZMATERIAL,ZMATERIAL_T,A00O2TGSVB59E517E76KXCFEVT,A00O2TGSVB59E517E76KXCFEVT_F",
            "$top":100
          },
          success: function (oData) {
            oControl.setBusy(false);
            if (oData && oData.results && oData.results[0]) {
              for (var i in oData.results) {
                oControl.addItem(new sap.ui.core.Item({
                  key: oData.results[i].ZMATERIAL,
                  text: oData.results[i].ZMATERIAL_T
                }));
              }
              oControl.setSelectedKey(sCurrent);
            }else{
              sap.m.MessageToast.show("未获取该工厂在本时间段内的产品信息。");
            }
          },
          error: function(oEvent){
            oControl.setBusy(false);
            sap.m.MessageToast.show("未获取该工厂在本时间段内的产品信息。");
          }
        });*/
        this.oDataModel.read("/MaterialSet", {
          urlParameters:{
            "$top":100
          },
          filters:[
            new sap.ui.model.Filter("Plant","EQ",sPlant),
            new sap.ui.model.Filter("Date","BT",sStartDate,sEndDate),
          ],
          success: function (oData) {
            oControl.setBusy(false);
            if (oData && oData.results && oData.results[0]) {
              for (var i in oData.results) {
                oControl.addItem(new sap.ui.core.Item({
                  key: oData.results[i].MaterialId,
                  text: oData.results[i].MaterialText
                }));
              }
              oControl.setSelectedKey(sCurrent);
            }else{
              sap.m.MessageToast.show("未获取该工厂在本时间段内的产品信息。");
            }
          },
          error: function(oEvent){
            oControl.setBusy(false);
            sap.m.MessageToast.show("未获取该工厂在本时间段内的产品信息。");
          }
        });
      } else {
        if (oControl.getItems().length === 0) {
          oControl.addItem(new sap.ui.core.Item({
            key: "1",
            text: "蒙牛纯牛奶利乐包"
          }));
          oControl.addItem(new sap.ui.core.Item({
            key: "2",
            text: "冰淇淋"
          }));
          oControl.addItem(new sap.ui.core.Item({
            key: "3",
            text: "特仑苏"
          }));
        }
      }
    },
    onHelp: function (oEvent) {
      var dialog = new sap.m.Dialog({
        title: '参数详情',
        type: 'Message',
        content: [
          new sap.ui.layout.HorizontalLayout({
            content: [
              new sap.ui.layout.VerticalLayout({
                width: '120px',
                content: [
                  new sap.m.Text({
                    text: 'Cp: '
                  }),
                  new sap.m.Text({
                    text: 'Cp_l:'
                  }),
                  new sap.m.Text({
                    text: 'Cp_u: '
                  }),
                  new sap.m.Text({
                    text: 'Cp_k: '
                  }),
                  new sap.m.Text({
                    text: 'Cpm: '
                  })
                ]
              }),
              new sap.ui.layout.VerticalLayout({
                content: [
                  new sap.m.Text({
                    text: '0.933；含义解释 XXXX '
                  }),
                  new sap.m.Text({
                    text: '1.21；含义解释 XXXX '
                  }),
                  new sap.m.Text({
                    text: '0.34；含义解释 XXXX '
                  }),
                  new sap.m.Text({
                    text: '0.53；含义解释 XXXX '
                  }),
                  new sap.m.Text({
                    text: '0.63；含义解释 XXXX '
                  })
                ]
              })
            ]
          })
        ],
        beginButton: new sap.m.Button({
          text: 'OK',
          press: function () {
            dialog.close();
          }
        }),
        afterClose: function () {
          dialog.destroy();
        }
      });

      dialog.open();
    }
  });

});