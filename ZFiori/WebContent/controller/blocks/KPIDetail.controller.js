sap.ui.define([
  "sap/vo/mengniu/controller/blocks/BlockContentBase.controller",
  'util/app',
  'sap/vo/mengniu/controller/blocks/CustomerFormat',
  'sap/m/MessageBox'
], function (BlockContentBase, appUtil, CustomerFormat, MessageBox) {
  "use strict";
  var that;
  return BlockContentBase.extend("sap.vo.mengniu.controller.blocks.KPIDetail", {
    onInit: function () {
      this.online = Boolean(sap.ui.getCore().getModel("Online"));
      this.initCustomFormat();
      this.chartSelected = [];
      this.filterItem = [];
      var that = this;
      this.VizSort = {sort:"",limit:0};
      this.getView().setModel(new sap.ui.model.json.JSONModel(), "KPIFilter");
      this.getView().setModel(new sap.ui.model.json.JSONModel(), "Viz");

      if (window.location.hash.indexOf("SPC") > 0 && this.getView().byId("NavButton") !== undefined) {
        this.getView().byId("NavButton").setVisible(false);
      } else if (window.location.hash.indexOf("singleView") > 0 && this.getView().byId("NavButton") !== undefined) {
        this.getView().byId("NavButton").setVisible(false);
      } else if (window.location.hash.indexOf("SPC") < 0 && this.getView().byId("NavButton") !== undefined) {
        this.getView().byId("NavButton").setVisible(true);
      }

      var oModelKPI = sap.ui.getCore().getModel("KPI");
      this.KPI = "";
      if (oModelKPI !== undefined) {
        this.KPI = oModelKPI.getData().KPI;
        //if (oModelKPI.getData().checkDashboard) {
        //  this.getView().byId("Nav").to(this.getView().byId("Dashboard"));
        //}
        oModelKPI.setData({
          "KPI": ""
        });
      } else {
        this.getRouter().navTo("home");
        return;
      }
      this.kpiInit();
      var that = this;
      this.getView().byId("Dashboard").onAfterRendering = function (oEvent) {
        var that2 = that;
        var oControl = oEvent.srcControl;
        setTimeout(
          function () {
            that2.fixDashboardHeight = ($("#" + oControl.getId()).height() - 48) / 2 - 40;
            if (that2.fixDashboardHeight > 100) {
              that2.getView().byId("c0").setHeight((that2.fixDashboardHeight - 70) + "px");
              that2.getView().byId("c1").setHeight(that2.fixDashboardHeight + "px");
              that2.getView().byId("c2").setHeight(that2.fixDashboardHeight + "px");
              that2.getView().byId("c3").setHeight(that2.fixDashboardHeight + "px");
            }
          }, 0);
      };
    },
    kpiInit: function () {
      var that = this;
      var oUser = sap.ui.getCore().getModel("User").getData();
      var oConfig = sap.ui.getCore().getModel("oModelKPIConfig").getData();
      if (!oUser.UserName || !oConfig.KPI) {
        setTimeout(function () {
          that.kpiInit();
        }, 500);
        return;
      }
      if (oUser.L1.indexOf(this.KPI) < 0 &&
        oUser.L2.indexOf(this.KPI) < 0 &&
        oUser.L3.indexOf(this.KPI) < 0 &&
        oUser.Other.indexOf(this.KPI) < 0) {
        MessageBox.error("您没有访问该指标数据的权限，请联系系统管理员。");
        return;
      }
      oConfig.KPI.forEach(function (x) {
        if (x.id === that.KPI) {
          that.oConfig = x;
        }
      });
      this.oThreshold = this.oConfig.Threshold || oConfig.Threshold;

      //this.getView().byId("EndDate").setValue('20171231');
      //this.getView().byId("StartDate").setValue('20170101');
      this.getView().byId("EndDate").setDateValue(new Date());
      this.getView().byId("StartDate").setValue(this.getDate("FDOCY"));
      this.bDateChanged = true;
      this.chartInit();

      this.oConfig.ODataModel = this.oConfig.query[0] + "_SRV";
      if (!sap.ui.getCore().getModel(this.oConfig.query[0])) {
        sap.ui.getCore().setModel(new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/" + this.oConfig.ODataModel, {
          useBatch: false
        }), this.oConfig.query[0]);
      }
      this.ODataModel = sap.ui.getCore().getModel(this.oConfig.query[0]);

      var i;
      var CategorySelector = this.getView().byId("CategorySelector");
      CategorySelector.removeAllItems();
      for (i = 0; i < this.oConfig.category.length; i++) {
        if (!this.oConfig.category[i].filterOnly)
          var oCategoryItem = new sap.ui.core.Item({
            key: this.oConfig.category[i].id,
            text: this.oConfig.category[i].name
          });
          oCategoryItem.data("data",this.oConfig.category[i]);
          CategorySelector.addItem(oCategoryItem);
        // if (this.oConfig.category[i].PlantSelector) {
        //   this.oConfig.PlantSelector = this.oConfig.category[i].id;
        // }
      }
      CategorySelector.setSelectedKey(this.oConfig.category[0].id);

      //var ValueSelector = this.getView().byId("ValueSelector");
      //ValueSelector.removeAllItems();
      var MenuBtn = this.getView().byId("MenuButton");
      var Menu = this.getView().byId("Menu");
      var MenuItem;
      Menu.removeAllItems();
      for (i = 0; i < this.oConfig.value.length; i++) {
        //ValueSelector.addItem(new sap.ui.core.Item({
        //  key: this.oConfig.value[i].id,
        //  text: this.oConfig.value[i].name
        //}));
        MenuItem = new sap.m.MenuItem({
          key: this.oConfig.value[i].id,
          text: this.oConfig.value[i].name
        });
        if (this.oConfig.value[i].items) {
          this.oConfig.value[i].items.forEach(function (x) {
            MenuItem.addItem(new sap.m.MenuItem({
              key: x.id,
              text: x.name
            }));
          });
        }
        Menu.addItem(MenuItem);
        if (i === 0) {
          MenuBtn.setText(this.oConfig.value[i].name);
          MenuBtn.data("selected", { key: this.oConfig.value[i].id, text: this.oConfig.value[i].name });
        }
      }
      //ValueSelector.setSelectedKey(this.oConfig.value[0].id);

      setTimeout(function () {
        that.initFixDashboard();
        that.initPlant();
        that.updateChart();
        that.updateFilterModel();
      }, 0);
    },
    onMenuItemSelected: function (oEvent) {
      this.getView().byId("MenuButton").data("selected", { key: oEvent.getParameter("item").getKey(), text: oEvent.getParameter("item").getText() });
    },
    prepareKey: function (bLastYear, tableFlag) {
      if (!this.oConfig.key || !this.oConfig.key.length) {
        return "";
      }
      var sStartDate = this.getView().byId("StartDate").getValue();
      var sEndDate = this.getView().byId("EndDate").getValue();
      if (tableFlag) {
        var oStartDate = this.getView().byId("StartDate").getDateValue();
        var oEndDate = this.getView().byId("EndDate").getDateValue();
        var iDiff = oEndDate.valueOf() - oStartDate.valueOf();

        if (iDiff > 31 * 24 * 60 * 60 * 1000) {
          if (this.chartSelected.id == "A0CALMONTH") {
            var y,m;
            switch(sap.ui.getCore().getModel("User").getProperty("/Datfm")){
              case "1":
              case "2":
              case "3":
                m = this.chartSelected.StoreName.substr(0,2);
                y = this.chartSelected.StoreName.substr(3);
                break;
              case "4":
              case "5":
              case "6":
                m = this.chartSelected.StoreName.substr(5);
                y = this.chartSelected.StoreName.substr(0,4);
                break;
            }
            sEndDate = y + m + new Date(y, m, "0").getDate();
            sStartDate = sEndDate.substring(0, 6) + "01";
          } else {
            var oStar = new Date(oEndDate.setDate(oEndDate.getDate() - 30))
            sStartDate = oStar.getFullYear() + ("0" + (oStar.getMonth() + 1)).slice(-2) + ("0" + oStar.getDate()).slice(-2);
          }
        }

      }
      if (bLastYear) {
        var year = Number(sStartDate.substr(0, 4));
        year--;
        sStartDate = String(year) + sStartDate.substr(4);
        year = Number(sEndDate.substr(0, 4));
        year--;
        sEndDate = String(year) + sEndDate.substr(4);
      }
      var aKey = [];
      for (var i = 0; i < this.oConfig.key.length; i++) {
        if (this.oConfig.key[i].type === "StartDate") {
          aKey.push(this.oConfig.key[i].name + "='" + sStartDate + "'");
        } else if (this.oConfig.key[i].type === "EndDate") {
          aKey.push(this.oConfig.key[i].name + "='" + sEndDate + "'");
        } else if (this.oConfig.key[i].type === "StartMonth") {
          aKey.push(this.oConfig.key[i].name + "='" + this.getMonthDate(sStartDate) + "'");
        } else if (this.oConfig.key[i].type === "EndMonth") {
          aKey.push(this.oConfig.key[i].name + "='" + this.getMonthDate(sEndDate) + "'");
        } else {
          aKey.push(this.oConfig.key[i].name + "='" + this.oConfig.key[i].value + "'");
        }
      }
      return "(" + aKey.join(",") + ")/";
    },

    onFilter: function (oEvent) {
      // this.getFilterModel();
      var that = this;
      if (!this._oFilterDialog) {
        this._FilteroDialog = sap.ui.xmlfragment("sap.vo.mengniu.controller.blocks.KPIFilter", this);
        this.getView().addDependent(this._FilteroDialog);
      }
      //that.updateFilterModel();
      this._FilteroDialog.open();
    },
    onVizSort: function (oEvent) {
      var that = this;
      var SortLimit = 0;
      if (that.VizSort) {
        SortLimit = that.VizSort.limit
      }
      var oNumInput = new sap.m.Input({ width: "4rem", value: SortLimit });
      var InitSort = "asc";
      if (that.getView().byId("VizSortId").getText() === "倒序") {
        InitSort = "desc"
      }
      var oSegment = new sap.m.SegmentedButton({
        selectedKey: InitSort,
        items: [new sap.m.SegmentedButtonItem({ text: "正序", key: "asc" }),
        new sap.m.SegmentedButtonItem({ text: "倒序", key: "desc" })],
        width: "90%"
      });
      var oVizDialog = new sap.m.Dialog({
        title: "排序",
        content: [
          new sap.m.Toolbar({
            content: [
              oSegment,
              new sap.m.ToolbarSpacer({ width: "1rem" }),
              new sap.m.Label({ width: "4rem", textAlign: "End", text: "显示前" }),
              oNumInput,
              new sap.m.Label({ width: "6rem", text: "位（0为无限制）" })
            ]
          })
        ],
        beginButton: new sap.m.Button({
          text: '确认',
          press: function () {

            var sNum = oNumInput.getValue();
            var sort = oSegment.getSelectedKey();
            that.VizSort = {
              sort: sort,
              limit: sNum
            };
            var sText = "正序"
            if (sort === "desc") {
              sText = "倒序"
            }
            that.getView().byId("VizSortId").setText(sText);
            that.updateChart();
            oVizDialog.close();
          }
        }),
        endButton: new sap.m.Button({
          text: "取消",
          press: function () {
            oVizDialog.close();
          }
        })
      });
      oVizDialog.open();
    },
    // onSearch: function (event) {
    //   var item = event.getParameter("suggestionItem");
    //   if (item) {
    //     sap.m.MessageToast.show("search for: " + item.getText());
    //   }
    // },
    // onSuggest: function (event) {
    //   var value = event.getParameter("suggestValue");
    //   var filters = [];
    //   if (value) {
    //     filters = [new sap.ui.model.Filter([
    //       new sap.ui.model.Filter("name", function (sDes) {
    //         return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
    //       })
    //     ], false)];
    //   }

    //   this.oSF.getBinding("suggestionItems").filter(filters);
    //   this.oSF.suggest();
    // },
    // onDownload: function (oEvent) { },
    getMonthLastYear: function(sValue){
      switch(sap.ui.getCore().getModel("User").getProperty("/Datfm")){
        case "1":
        case "2":
        case "3":
          return sValue.substr(0,3) + String( Number(sValue.substr(3)) - 1 );
        case "4":
        case "5":
        case "6":
          return String( Number(sValue.substr(0,4)) - 1 ) + sValue.substr(4);
      }
    },
    onDrillDown: function (oEvent) {
      var that = this;
      var oStartDate = this.getView().byId("StartDate").getDateValue();
      var oEndDate = this.getView().byId("EndDate").getDateValue();
      var iDiff = oEndDate.valueOf() - oStartDate.valueOf();
      if (iDiff < 0) {
        sap.m.MessageToast.show("开始日期应在结束日期前。")
        return;
      }
      //  if (iDiff > 31 * 24 * 60 * 60 * 1000) {
      // sap.m.MessageToast.show("请避免查询31天以上的详情数据，避免数据量过大。")
      //return;
      //    }
      //   sap.m.MessageToast.show("为避免数据量过大，仅查询当前月的详情数据。")

      var StoreName = this.chartSelected.StoreName;
      var sYearDate = this.chartSelected.measureNames;
      var Id = this.chartSelected.id;
      var IdValue = this.chartSelected.idValue;
      var bLastYear = false;
      if (sYearDate === "同期") {
        bLastYear = true;
      }
      if (bLastYear && Id == "A0CALMONTH") {
         IdValue = this.getMonthLastYear(IdValue);
         //var aDate = IdValue.split(".");
         // var year = 0;
         // if(aDate[0].length > 2)
         // {
         //     year = Number(aDate[0]);
         //     year--;
         //      IdValue =  String(year)  + "." + aDate[1];
         // }else{
         //       year = Number(aDate[1]);
         //      year--;
         //       IdValue =   aDate[0]  + "." + String(year) ;
         // }
      }
      var ModelName = this.oConfig.ODataModel;
      var QueryName = this.oConfig.query[0];
      if (!that._oTable) {
        that._oTable = new sap.ui.table.Table({
          selectionMode: sap.ui.table.SelectionMode.None
        });
      }
      that._oTable.removeAllColumns();
      that._oTable.unbindRows();
      var aEntity = this.ODataModel.getServiceMetadata().dataServices.schema["0"].entityType;
      var Entity = [];
      for (var i in aEntity) {
        if (aEntity[i].name === QueryName + "Result") {
          Entity = aEntity[i].property
        }
      }
      var sSelect = "";
      for (var i = 0; i < Entity.length; i++) {
        if (( (Entity[i].name !== "ID" && Entity[i].name !== "TotaledProperties" && Entity[i].extensions[3] && Entity[i].extensions[3].name !== "text" && Entity[i].name.slice(-2) !== "_F") ||
           Entity[i].type === "Edm.Decimal" || Entity[i].name.indexOf("A4ZQM_CP01") !== -1) &&
         (!that.oConfig.excludeDetail || that.oConfig.excludeDetail.indexOf(Entity[i].name) < 0)) {
          var key = "",
            text = "";
          for (var j = 0; j < Entity[i].extensions.length; j++) {
            if (Entity[i].extensions[j].name === "label") {// && Entity[i].extensions[j].value.indexOf("CHAR") === -1
              key = Entity[i].name;
              text = Entity[i].extensions[j].value;
              if (text.split(".").length > 1) {
                text = text.split(".")[1];
              }
              if ( Entity[i].name === "A0CALDAY_T" || Entity[i].name === "A0CALMONTH_T") {
                continue;
             }

              sSelect += "," + key;

              var sBindingText = "{"+ key +"}";
              if(Entity[i].type === "Edm.Decimal"){
                sSelect += "," + key + "_F";
                sBindingText = "{path:'" + key + "',formatter:'.numericFormatter'}";
              }
              that._oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({
                  text: text
                }),
                template: new sap.m.Text({
                  text: "{"+ key +"}",
                  wrapping:false,
                  tooltip:{path:key,formatter:function(v){return String(v);}}
                }),
                sortProperty: key,
                filterProperty: key,
                width: "8rem"
              }));
            }
          }

        }
      }
      var oSearchBtn = this.getView().byId("SearchBtn");
    //  var aFilterAll = oSearchBtn.data("SearchBtn") || [];
    //  aFilterAll.push(new sap.ui.model.Filter(Id, "EQ", IdValue));
    //  if(this.getPlantFilter()){
    //    aFilterAll.push(this.getPlantFilter());
    //  }
      var aFilterAll = jQuery.extend([],oSearchBtn.data("SearchBtn"));
      aFilterAll.push(new sap.ui.model.Filter(Id, "EQ", IdValue));
      if(this.getPlantFilter()){
         aFilterAll.push(new sap.ui.model.Filter(this.getPlantFilter().aFilters,false));
      }
      var andFilter = new sap.ui.model.Filter(aFilterAll, true);
      var mUrlParameter = {
        "$select": sSelect.substring(1),
        "$top": 1000
      };
       that.ModelInfo = {
         urlParameters: mUrlParameter,
         path: "/" + QueryName + this.prepareKey(bLastYear, true) + "Results",
         filters: andFilter,
       };
      // that._oTable.bindRows({
      //   parameters: mUrlParameter,
      //   path: "/" + QueryName + this.prepareKey(bLastYear,true) + "Results",
      //   filters: filters
      // });
      var oTableModle = new sap.ui.model.json.JSONModel();
      this.getView().setModel(oTableModle, "TableData");
      that._oTable.setBusy(true);
      this.ODataModel.read("/" + QueryName + this.prepareKey(bLastYear, true) + "Results", {
        urlParameters: mUrlParameter,
        filters: [andFilter],
        success: function (oData) {
          that._oTable.setBusy(false);
          oData.results.forEach(function(x){
            for(var i in x){
              if(x[i] && !isNaN(x[i])){
                x[i] = Number(x[i]);
              }
            }
          });
          oTableModle.setData(oData);
          that._oTable.bindRows({
            path: "/results"
          });
          that._oTable.setModel(oTableModle);
        },
        error: function (oData) {
          that._oTable.setBusy(false);
          var sError = "";
          if(oData.responseText && typeof oData.responseText === "string"){
            try {
              var oError = JSON.parse(oData.responseText);
              sError = oError.error.code;
            } catch (error) {
            }
          }
          if(sError === "BW_BICS/011"){
            sap.m.MessageToast.show("您所指定的筛选条件未取到数据。");
          }else{
            sap.m.MessageToast.show("数据读取发生错误，可能由于数据量过大导致，请调整筛选条件至更小范围。如仍无法解决，请联系系统管理员。");
          }
        }
      });

      if (!that._oDetailDialog) {
        that._oDetailDialog = new sap.m.Dialog({
          content: [that._oTable],
          customHeader: new sap.m.Toolbar({
            content: [
              new sap.m.ToolbarSpacer(),
              new sap.m.Button({
                icon: "sap-icon://download",
                press: function () {
                  that.onDownloadExcel(that._oTable, that.ModelInfo);
                }
              }),
              new sap.m.Button({
                icon: "sap-icon://undo",
                press: function () {
                  that._oDetailDialog.close();
                }
              })
            ]
          })
        });
        that.getView().addDependent(that._oDetailDialog);
      }
      that._oDetailDialog.setTitle(StoreName + "(" + sYearDate + ")");
      that._oDetailDialog.open();
    },
    numericFormatter: function(v){
      if(isNaN(v)){
        return v;
      }else{
        return Number(v);
      }
    },
    updateChart: function (oEvent) {
      var that = this;
      var oSearchBtn = this.getView().byId("SearchBtn");
      var aFilterAll = jQuery.extend([],oSearchBtn.data("SearchBtn"));
      var aGroupSelector = this.getView().byId("GroupSelector").getSelectedKeys();
      var aGeoSelector = this.getView().byId("GeoSelector").getSelectedKeys();
      var aPlant = this.getView().byId("PlantSelector").getSelectedKeys();
      if (this.oConfig.PlantSelector && (aGroupSelector.length !== 0 || aGeoSelector.length !== 0 || aPlant.length !== 0)) {
        if (aPlant.length === 0) {
          this.getView().byId("PlantSelector").getItems().forEach(function (x) {
            aPlant.push(x.getKey());
          });
        }
        aPlant.forEach(function (x) {
          aFilterAll.push(new sap.ui.model.Filter(that.oConfig.PlantSelector, "EQ", String(x)))
        });
      }

      this.category = this.getView().byId("CategorySelector").getSelectedKey();
      // var oSelectedItem = this.getView().byId("ValueSelector").getSelectedItem();
      var oSelectedItem = this.getView().byId("MenuButton").data("selected");
      this.value = oSelectedItem.key;//oSelectedItem.getKey();

      this.getView().byId("Detail").setBusy(true);
      this.updateChartData(this.ODataModel, this.oConfig.query[0], this.prepareKey(), this.prepareKey(true), aFilterAll, {
        category: this.category,
        value: this.value
      }, function (oData, maxValue, minValue) {
        that.getView().byId("Detail").setBusy(false);
        that.getView().getModel("Viz").setData(oData);
        that.getView().getModel("Viz").refresh();
        that.updateChartProperty(maxValue, minValue, oSelectedItem.text);
        if (oData.Data.length >= 1000) {
          sap.m.MessageToast.show("数据过多，仅加载前1000条数据，请调整筛选条件后重新分析。");
        }
        that.VizDataSet = oData;
        that.mainChartMaxValue = maxValue;
        that.mainChartMinValue = minValue;
        that.mainChartTitle = oSelectedItem.text;
      });
    },
    updateFilterModel: function (callback) {
      var that = this;
      var oData = this.getView().getModel("KPIFilter").getData();
      if (!oData.list) {
        oData.list = [];
        for (var i = 0; i < this.oConfig.category.length; i++) {
          if (!this.oConfig.category[i].noFilter) {
            var id = this.oConfig.category[i].id;
            if (id.substr(-2) === "_T") {
              id = id.substr(0, id.length - 2);
            }
            oData.list.push({
              id: id,
              name: this.oConfig.category[i].name
            });
          }
        }
        this.getView().getModel("KPIFilter").refresh();
      }
      for (var i = 0; i < this.oConfig.category.length; i++) {
        var sCategory = this.oConfig.category[i].id;
        var sName = this.oConfig.category[i].name;
        var oItem;
        oData.list.forEach(function (x) {
          if (x.name === sName) {
            oItem = x;
          }
        });
        if (!this.oConfig.category[i].noFilter && (!oItem.data || this.oConfig.category[i].plantRelated)) {
          (function (oConfig, oItem, that) {
            var id = oConfig.id;
            if (id.substr(-2) === "_T") {
              id = id.substr(0, id.length - 2);
            }
            var aFilter = [];
            if(oConfig.plantRelated && that.getPlantFilter()){
              aFilter.push(that.getPlantFilter());
            }
            that.ODataModel.read("/" + that.oConfig.query[0] + that.prepareKey() + "Results", {
              urlParameters: {
                "$top": 1000,
                "$select": id + "," + oConfig.id
              },
              filters:aFilter,
              error: function (oResult) { },
              success: function (oResult) {
                oItem.data = [];
                for (var j = 0; j < oResult.results.length; j++) {
                  var data1 = {
                    id: oResult.results[j][id],
                    name: oResult.results[j][oConfig.id],
                    selected: false
                  };
                  oItem.data.push(data1);
                }
                that.getView().getModel("KPIFilter").refresh();
                if (oResult.results.length === 1000) {
                  sap.m.MessageToast.show("可筛选项过多，显示前1000条。")
                }
              }
            });
          })(this.oConfig.category[i], oItem, this);
        }
      }
    },
    onChangeDate: function () {
      this.bDateChanged = true;
    },
    onChangeYT: function () {
      var aPlantList = sap.ui.getCore().getModel("Plant").getData().results;
      var aSCDQ = {},
        aPlant = {};
      var aYT = this.getView().byId("GroupSelector").getSelectedKeys();
      aPlantList.forEach(function (x) {
        if (aYT.indexOf(String(x.YT)) >= 0 || aYT.length === 0) {
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
      var oSCDQ = this.getView().byId("GeoSelector"),
        oPlant = this.getView().byId("PlantSelector");
      var aSCDQselect = oSCDQ.getSelectedKeys(),
        aPlantselect = oPlant.getSelectedKeys();
      oSCDQ.removeAllItems();
      oPlant.removeAllItems();
      for (var i in aSCDQ) {
        oSCDQ.addItem(new sap.ui.core.Item(aSCDQ[i]));
      }
      for (var i in aPlant) {
        oPlant.addItem(new sap.ui.core.Item(aPlant[i]));
      }
      oSCDQ.setSelectedKeys(aSCDQselect);
      oPlant.setSelectedKeys(aPlantselect);
      this.updateFilterModel();
    },
    onChangeSCDQ: function () {
      var aPlantList = sap.ui.getCore().getModel("Plant").getData().results;
      var aPlant = {};
      var aYT = this.getView().byId("GroupSelector").getSelectedKeys();
      var aSCDQ = this.getView().byId("GeoSelector").getSelectedKeys();
      aPlantList.forEach(function (x) {
        if ((aSCDQ.indexOf(String(x.SCDQ)) >= 0 || aSCDQ.length === 0) && (aYT.indexOf(String(x.YT)) >= 0 || aYT.length === 0)) {
          aPlant[x.PLANT] = {
            key: String(x.PLANT),
            text: String(x.PLANT_TXT)
          };
        }
      });
      var oPlant = this.getView().byId("PlantSelector");
      var aPlantselect = oPlant.getSelectedKeys();
      oPlant.removeAllItems();
      for (var i in aPlant) {
        oPlant.addItem(new sap.ui.core.Item(aPlant[i]));
      }
      oPlant.setSelectedKeys(aPlantselect);
      this.updateFilterModel();
    },
    onChangePlant: function(oEvent){
      this.updateFilterModel();
    },
    getPlantFilter: function(){
      var aYT = this.getView().byId("GroupSelector").getSelectedKeys(),
        aSCDQ = this.getView().byId("GeoSelector").getSelectedKeys(),
        aPlant = this.getView().byId("PlantSelector").getSelectedKeys();
      var aFilter = [];
      var sPlant = this.oConfig.PlantSelector;
      if(!sPlant){
        return null;
      }
      if(aPlant.length > 0){
        aPlant.forEach(function(x){
          aFilter.push(new sap.ui.model.Filter(sPlant,"EQ",x));
        });
      }else if(aYT.length === 0 && aSCDQ.length === 0){
        return null;
      }else{
        this.getView().byId("PlantSelector").getItems().forEach(function(x){
          aFilter.push(new sap.ui.model.Filter(sPlant,"EQ",x.getKey()));
        });
      }
      if(aFilter.length === 1){
        return aFilter[0];
      }else{
        return new sap.ui.model.Filter(aFilter,false);
      }
    },
    initPlant: function () {
      var oYT = this.getView().byId("GroupSelector"),
        oSCDQ = this.getView().byId("GeoSelector"),
        oPlant = this.getView().byId("PlantSelector");
      if (!this.oConfig.PlantSelector) {
        oYT.setVisible(false);
        oSCDQ.setVisible(false);
        oPlant.setVisible(false);
        return;
      } else {
        oYT.setVisible(true);
        oSCDQ.setVisible(true);
        oPlant.setVisible(true);
      }
      var aPlantList = sap.ui.getCore().getModel("Plant").getData().results;
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
      oYT.removeAllItems();
      oSCDQ.removeAllItems();
      oPlant.removeAllItems();
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
    onChangeCategory: function(oEvent){
      var oItem = oEvent.getParameter("selectedItem");
      if(oItem.data("data").related){
        var MenuBtn = this.getView().byId("MenuButton");
        MenuBtn.setText(oItem.data("data").related.name);
        MenuBtn.data("selected", { key: oItem.data("data").related.id, text: oItem.data("data").related.name });
      }
    },
    deleteYearInfo: function (sValue) {
      var oYear = {};
      var sValueNew = sValue;
      oYear[this.getView().byId("StartDate").getValue().substr(0, 4)] = true;
      oYear[this.getView().byId("EndDate").getValue().substr(0, 4)] = true;
      oYear[String(Number(this.getView().byId("StartDate").getValue().substr(0, 4)) - 1)] = true;
      oYear[String(Number(this.getView().byId("EndDate").getValue().substr(0, 4)) - 1)] = true;
      if (sValueNew && sValueNew.replace) {
        for (var i in oYear) {
          sValueNew = sValueNew.replace(i, "");
        }
      }
      return sValueNew;
    },
    updateChartData: function (ODataModel, sQuery, sKeyThisYear, sKeyLastYear, oModelFilter, oConfig, callback) {
      var that = this;
      var sCategory = oConfig.category;
      var sValue = oConfig.value;
      var sCategory_T = sCategory;
      var sSort = oConfig.orderby || that.VizSort.sort
      var sTop = oConfig.top || that.VizSort.limit
      if (sCategory.substr(-2) === "_T") {
        sCategory_T = sCategory.substr(0, sCategory.length - 2);
      }
      if (this.online) {
        var mUrlParameter = {
          "$select": sCategory + "," + sCategory_T + "," + sValue + "," + sValue.replace(/_F/, ""),
          "$top": 1000
        };
        ODataModel.read("/" + sQuery + sKeyThisYear + "Results", {
          filters: oModelFilter,
          urlParameters: mUrlParameter,
          error: function (oData) {
            var sError = "";
            if(oData.responseText && typeof oData.responseText === "string"){
              try {
                var oError = JSON.parse(oData.responseText);
                sError = oError.error.code;
              } catch (error) {
              }
            }
            if(sError === "BW_BICS/011"){
              sap.m.MessageToast.show("您所指定的筛选条件未取到数据。");
            }else{
              sap.m.MessageToast.show("数据读取发生错误，可能由于数据量过大导致，请调整筛选条件至更小范围。如仍无法解决，请联系系统管理员。");
            }
            callback({
              Data: []
            });
          },
          success: function (oData1) {
            ODataModel.read("/" + sQuery + sKeyLastYear + "Results", {
              filters: oModelFilter,
              urlParameters: mUrlParameter,
              error: function (oData) {
                var complant = {
                  "Data": []
                };
                for (var i = 0; i < oData1.results.length; i++) {
                  var complantData = {
                    category: oData1.results[i][sCategory],
                    id: sCategory_T,//oData1.results[i][sCategory_T],
                    idValue: oData1.results[i][sCategory_T],
                    thisYear: oData1.results[i][sValue.replace(/_F/, "")],
                    max: oData1.results[i][sValue.replace(/_F/, "")],
                    min: oData1.results[i][sValue.replace(/_F/, "")]
                  };
                  if(Number(complantData.thisYear) !== 0){
                    complant.Data.push(complantData);
                  }
                }
                if (sSort) {
                  var colId = "thisYear";
                  var desc = function (x, y) {
                    return (Number(x[colId]) < Number(y[colId])) ? 1 : -1;
                  };
                  var asc = function (x, y) {
                    return (Number(x[colId]) > Number(y[colId])) ? 1 : -1;
                  };
                  if (sSort == "asc") {
                    complant.Data.sort(asc);
                  } else {
                    complant.Data.sort(desc);
                  }
                  if (sTop > 0) {
                    complant.Data = complant.Data.slice(0, sTop);
                  }
                }
                var iMax = 0,
                  iMin = 9999,
                  bPercentage = false;
                for (var i = 0; i < complant.Data.length; i++) {
                  var x = complant.Data[i];
                  if (x.max > iMax && x.max > 0) {
                    iMax = x.max;
                  }
                  if (x.min < iMin && x.min > 0) {
                    iMin = x.min;
                  }
                }
                if (bPercentage) {
                  iMax = iMax / 100;
                  iMin = iMin / 100;
                }
                var maxValue = Math.min(iMax * 1.5 - iMin / 2, iMax * 1.1);
                var minValue = Math.max(iMin * 1.5 - iMax / 2, iMin * 0.9);
                if (minValue < 10 && minValue > 0) {
                  minValue = 0;
                }
                callback(complant, maxValue, minValue);
              },
              success: function (oData2) {
                var oData2List = {};
                for (var j = 0; j < oData2.results.length; j++) {
                  oData2List[that.deleteYearInfo(oData2.results[j][sCategory])] = oData2.results[j][sValue.replace(/_F/, "")];
                }
                var complant = {
                  "Data": []
                };
                for (var i = 0; i < oData1.results.length; i++) {
                  var complantData = {
                    category: oData1.results[i][sCategory],
                    id: sCategory_T,//oData1.results[i][sCategory_T],
                    idValue: oData1.results[i][sCategory_T],
                    thisYear: oData1.results[i][sValue.replace(/_F/, "")],
                    lastYear: 0,
                    max: oData1.results[i][sValue.replace(/_F/, "")],
                    min: oData1.results[i][sValue.replace(/_F/, "")]
                  };
                  if (oData2List[that.deleteYearInfo(oData1.results[i][sCategory])]) {
                    complantData.lastYear = oData2List[that.deleteYearInfo(oData1.results[i][sCategory])];
                    complantData.max = Math.max(complantData.thisYear, complantData.lastYear);
                    complantData.min = Math.min(complantData.thisYear, complantData.lastYear);
                  }
                  if(Number(complantData.thisYear) !== 0 || Number(complantData.lastYear) !== 0){
                    complant.Data.push(complantData);
                  }
                }
                if (sSort) {
                  var colId = "thisYear";
                  var desc = function (x, y) {
                    return (Number(x[colId]) < Number(y[colId])) ? 1 : -1;
                  };
                  var asc = function (x, y) {
                    return (Number(x[colId]) > Number(y[colId])) ? 1 : -1;
                  };
                  if (sSort == "asc") {
                    complant.Data.sort(asc);
                  } else {
                    complant.Data.sort(desc);
                  }
                  if (sTop > 0) {
                    complant.Data = complant.Data.slice(0, sTop);
                  }
                }
                var iMax = 0,
                  iMin = 9999,
                  bPercentage = false;
                for (var i = 0; i < complant.Data.length; i++) {
                  var x = complant.Data[i];
                  if (x.max > iMax && x.max > 0) {
                    iMax = x.max;
                  }
                  if (x.min < iMin && x.min > 0) {
                    iMin = x.min;
                  }
                }
                if (bPercentage) {
                  iMax = iMax / 100;
                  iMin = iMin / 100;
                }
                var maxValue = Math.min(iMax * 1.5 - iMin / 2, iMax * 1.1);
                var minValue = Math.max(iMin * 1.5 - iMax / 2, iMin * 0.9);
                if (minValue < 10 && minValue > 0) {
                  minValue = 0;
                }
                callback(complant, maxValue, minValue);
              }
            });
          }
        });
      } else {
        callback({
          Data: []
        })
      }
    },
    initFixDashboard: function () {
      var that = this;
      var oView = this.getView();
      var aFrame = [];

      if (!this.oConfig.DefaultDashboard || !this.oConfig.DefaultDashboard.length) {
        // oView.byId("Nav").to(this.getView().byId("Detail"));
        this.getView().byId("Dashboard").setVisible(false);
        this.getView().byId("Detail").setVisible(true);
        this.bNoDashboard = true;
        return;
      } else if (this.oConfig.DefaultDashboard.length === 2) {
        oView.byId("size2").setSize("100%");
        oView.byId("c1").setVizType(this.oConfig.DefaultDashboard[0].type || "column");
        oView.byId("c2").setVizType(this.oConfig.DefaultDashboard[1].type || "column");
        aFrame = ["c1", "c2"];
      } else if (this.oConfig.DefaultDashboard.length === 3) {
        oView.byId("size2").setSize("65%");
        oView.byId("c1").setVizType(this.oConfig.DefaultDashboard[0].type || "column");
        oView.byId("c2").setVizType(this.oConfig.DefaultDashboard[1].type || "column");
        oView.byId("c3").setVizType(this.oConfig.DefaultDashboard[2].type || "column");
        aFrame = ["c1", "c2", "c3"];
      }
      // else if (this.oConfig.DefaultDashboard.length === 4) {
      //   oView.byId("size1").setSize("50%");
      //   oView.byId("size2").setSize("50%");
      //   oView.byId("c1").setVizType(this.oConfig.DefaultDashboard[0].type || "column");
      //   oView.byId("c2").setVizType(this.oConfig.DefaultDashboard[1].type || "column");
      //   oView.byId("c3").setVizType(this.oConfig.DefaultDashboard[2].type || "column");
      //   oView.byId("c4").setVizType(this.oConfig.DefaultDashboard[3].type || "column");
      //   oView.byId("c3").setHeight("25rem");
      //   aFrame = ["c1", "c2", "c3", "c4"];
      // }
      if (this.oConfig.DefaultDashboardAll) {
        oView.byId("size1").setSize("40%");
        var oAllData = {
          name1: this.oConfig.DefaultDashboardAll.name1,
          name2: this.oConfig.DefaultDashboardAll.name2,
          value1: "0",
          unit: this.oConfig.DefaultDashboardAll.unit,
          value2: "100",
          color: "Good",
          Data: [{
            category: this.oConfig.DefaultDashboardAll.category1,
            value: 0
          },
          {
            category: this.oConfig.DefaultDashboardAll.category2,
            value: 0
          }
          ]
        }
        if (this.online) {
          var sValid = this.oConfig.DefaultDashboardAll.合格;
          var sInvalid = this.oConfig.DefaultDashboardAll.不合格;
          var sAll = this.oConfig.DefaultDashboardAll.value;
          var aValue = {};
          if (sValid) {
            aValue[sValid] = true;
            aValue[sValid.replace("_F", "")] = true;
          }
          if (sInvalid) {
            aValue[sInvalid] = true;
            aValue[sInvalid.replace("_F", "")] = true;
          }
          if (sAll) {
            aValue[sAll] = true;
            aValue[sAll.replace("_F", "")] = true;
          }
          if (Object.keys(aValue).length === 0) {
            return;
          }
          this.ODataModel.read("/" + this.oConfig.query[0] + this.prepareKey() + "Results", {
            urlParameters: {
              "$select": Object.keys(aValue).join(",")
            },
            error: function (oEvent) {
              sap.m.MessageToast.show("未取到数据");
            },
            success: function (oData) {
              if (oData && oData.results && oData.results[0]) {
                var iValid, iInvalid, iAll;
                if (sValid) {
                  iValid = Number(oData.results[0][sValid.replace("_F", "")]);
                }
                if (sInvalid) {
                  iInvalid = Number(oData.results[0][sInvalid.replace("_F", "")]);
                }
                if (sAll) {
                  iAll = Number(oData.results[0][sAll.replace("_F", "")]);
                }
                if (iInvalid !== undefined && iValid === undefined) {
                  iValid = iAll - iInvalid;
                } else if (iInvalid === undefined && iValid !== undefined) {
                  iInvalid = iAll - iValid;
                }
                if(iAll >= 100000000){
                  oAllData.value1 = (Math.round(iAll / 100 / 10000) / 100).toFixed(2) + "亿";
                }else if(iAll >= 10000){
                  oAllData.value1 = (Math.round(iAll / 100) / 100).toFixed(2) + "万";
                }else{
                  oAllData.value1 = iAll;
                }
                oAllData.value2 = (Math.round(iValid * 10000 / iAll) / 100).toFixed(2);
                if(that.oThreshold.G2Y && oAllData.value2 <= that.oThreshold.G2Y){
                  oAllData.color = "Good";
                }else if(that.oThreshold.Y2R && oAllData.value2 <= that.oThreshold.Y2R){
                  oAllData.color = "Critical";
                }else if(that.oThreshold.R2Y && oAllData.value2 < that.oThreshold.R2Y){
                  oAllData.color = "Error";
                }else if(that.oThreshold.Y2G && oAllData.value2 < that.oThreshold.Y2G){
                  oAllData.color = "Critical";
                }else{
                  oAllData.color = "Good";
                }
                oAllData.Data[0].value = iValid;
                oAllData.Data[1].value = iInvalid;
                oView.setModel(new sap.ui.model.json.JSONModel(oAllData), "All");
              }
            }
          });
        } else {
          oView.setModel(new sap.ui.model.json.JSONModel(oAllData), "All");
        }
      } else {
        oView.byId("size1").setSize("0px");
      }
      this.getView().byId("Dashboard").setBusy(true);
      var i = 0;
      aFrame.forEach(function (x) {
        var j = i;
        that.updateChartData(that.ODataModel, that.oConfig.query[0], that.prepareKey(), that.prepareKey(true), [], that.oConfig.DefaultDashboard[j], function (oData, maxValue, minValue) {
          that.getView().byId("Dashboard").setBusy(false);
          if (oData.Data.length >= 1000) {
            sap.m.MessageToast.show("数据过多，仅加载前1000条数据，请调整筛选条件后重新分析。");
          }
          that.getView().byId(x).setModel(new sap.ui.model.json.JSONModel(oData));
          that.getView().byId(x).vizUpdate({
            properties: {
              plotArea: {
                primaryScale: {
                  maxValue: maxValue,
                  minValue: minValue,
                  fixedRange: true
                }
              },
              title: {
                text: that.oConfig.DefaultDashboard[j].name
              }
            }
          });
        });
        i++;
      });
    },
    // changeTimeformat: function (Stime, format) {
    //   if (format === "MM.YYYY") {
    //     /*name = "MM.YYYY";
    //     name.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1"); "YYYYMMDD" */
    //     Stime = Stime.replace(/(\w+)\s*.\s*(\w+)/, "$2$1");
    //     Stime = Stime + "00";
    //     return Stime;
    //   }
    // },
    // changeOData: function (oData) {
    //   var complant = {
    //     "Data": []
    //   };
    //   for (var i = 0; i < oData.plant.length; i++) {
    //     var complantData = [];
    //     complantData["category"] = oData.plant[i].ZPLANT_T;
    //     complantData["thisYear"] = Number(oData.plant[i].A00O2TGTLVNX7CBNEGZRX9G0RY_F.replace(/%/, "")) / 100;
    //     for (var j = 0; j < oData.plant2.length; j++) {
    //       if (oData.plant[i].ZPLANT_T === oData.plant2[j].ZPLANT_T) {
    //         complantData["lastYear"] = Number(oData.plant2[j].A00O2TGTLVNX7CBNEGZRX9G0RY_F.replace(/%/, "")) / 100;
    //       }
    //     }
    //     complant.Data.push(complantData);
    //   }
    //   return complant;
    // },
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
        var sField = i;
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
      oSearchBtn.data("SearchBtn", aFilterAll);
      this.updateChart();
    },
    // onFilterDetailPageOpened: function (oEvent) { },
    onSelectData: function (oEvent) {
      this.chartSelected = {};
      var x = oEvent.getParameters().data[0];
      this.chartSelected = {
        StoreName: x.data['Store Name'],
        measureNames: x.data['measureNames'],
          id: this.VizDataSet.Data[x.data['_context_row_number']].id,
          idValue: this.VizDataSet.Data[x.data['_context_row_number']].idValue
       };
      /*  oEvent.getParameters().data.forEach(function(x) {
          that.chartSelected.push(new sap.ui.model.Filter('department', "EQ", x.data[0]));
        });*/
    },
    // onDeSelectData: function (oEvent) {
      /*var that = this;
            oPopOver.setActionItems([oActionItem1]);(var i = 0; i < oEvent.getParameters().data.length; i++) {
              for (var j = 0; j < that.chartSelected.length; j++) {
                if (that.chartSelected[j].sPath === oColumnKey && chartSelected[j].oValue1 === oEvent.getParameters().data[i].data[oColumn]) {
                  var sIndex = j;
                  that.chartSelected.splice(sIndex, 1);
                }
              }
            }*/
    // },
    // onPress: function (oEvent) {
    //   var KPItext = oEvent.getSource().mProperties.text;
    //   // var oNav  =  this.getView().getContent()[0];
    //   var oPage1 = this.getView().getContent()[0];
    //   var oPage2 = this.getView().getContent()[1];
    //   // oPage2.setTitle(KPItext);
    //   // this.getView().getParent().getParent().setTitle(KPItext);
    //   var oData = this.getView().getParent().getParent();
    //   if (oData.getId().indexOf("idChartContainer") > -1) {
    //     oData.setTitle(KPItext);
    //   }
    //   oPage1.setVisible(false);
    //   oPage2.setVisible(true);
    //   // oNav.to(oPage2.getId());
    // },
    onNavButtonPressToDashboard: function (oEvent) {
      var that = this;
      if (this.bNoDashboard) {
        this.onNavButtonPress(oEvent);
      } else {
        this.getView().byId("Dashboard").setVisible(true);
        this.getView().byId("Detail").setVisible(false);
      }
    },
    onNavButtonPress: function (oEvent) {
      // var oNav  =  this.getView().getContent()[0];
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

        //var sString = (window.location.hash.indexOf("/single/KPI/1") > 0 ? true : false);
        //if (sString) {
        this.getRouter().navTo('single', { appId: "KPI" });
        //} else {
        //  oContainer.getContent()[0].setVisible(true);
        //  oContainer.getContent()[1].setVisible(false);

        //}

        /*oContainer.getContent()[0].setVisible(true);
        oContainer.getContent()[1].setVisible(false);*/

      }
      // oNav.to(oPage1.getId());
    },
    updateChartProperty: function (maxValue, minValue, sTitle) {
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
            },
            dataLabel: {
              visible: true
            }
          },
          title: {
            text: sTitle
          }
        }
      }
      this.getView().byId("combination").vizUpdate(oProperty);
      this.getView().byId("line").vizUpdate(oProperty);
      this.getView().byId("bulletHorizontal").vizUpdate(oProperty);
      this.getView().byId("bulletVertical").vizUpdate(oProperty);
      oProperty.properties.title.text = oProperty.properties.title.text + " 占比"
      this.getView().byId("pie").vizUpdate(oProperty);
    },
    chartInit: function () {
      var that = this;
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
            visible: true
          },
          color: "#FFFFFF",
          label: {
            style: { //分类标签字体的样式
              color: "#FFFFFF"
            }
          }
          //分类轴线及轴线的刻度颜色，还可用颜色的英文单词
        },
        valueAxis: {
          color: "#FFFFFF",
          label: {
            style: { //分类标签字体的样式
              color: "#FFFFFF"
            },
            formatString: CustomerFormat.FIORI_PERCENTAGE_FORMAT_2
          },
          title: {
            visible: true
          }
        },
        //valueAxis2: {
        //  label: {
        //    formatString: CustomerFormat.FIORI_PERCENTAGE_FORMAT_2
        //  },
        //  title: {
        //    visible: false
        //  }
        //},
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
            position: "top"
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
            visible: true,
            hideWhenOverlap:false
          },
          referenceLine: {
            line: {
              valueAxis: []
            }
          },
          //dataShape: {
          //  primaryAxis: ["bar", "bar", "line"] //数据显示形状
          //},
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
            fixedRange: false,
            //当fixedRange=false时，设置maxValue和minValue的值无效
            maxValue: 100,
            //数值轴刻度的最大值
            minValue: 90 //数值轴刻度的最小值
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
          text: "",
          style: {
            //标题的字体样式
            color: "#C3CED9",
            fontFamily: "'Open Sans', Arial, Helvetica, sans-serif",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "bold"
          },
          visible: true
        }
      };
      oProperties.title.text = this.oConfig.name;
      if (this.oConfig.reference) {
        for (var i = 0; i < this.oConfig.reference.length; i++) {
          oProperties.plotArea.referenceLine.line.valueAxis.push({
            value: this.oConfig.reference[i].value,
            visible: true,
            size: 1,
            type: "dotted",
            color: "#777",
            label: {
              color: "#DDD",
              text: this.oConfig.reference[i].text,
              visible: true
            }
          });
        }
      }
      var oModel = this.getView().getModel("Viz");
      var oViz = this.getView().byId("combination");
      oViz.setModel(oModel);
      oViz.setVizProperties(oProperties);
      var oPopOver = this.getView().byId("PopOverCombination");
      var oActionItem1 = {
        type: 'action',
        text: '查看详情数据',
        press: function (oEvent) {
          that.onDrillDown(oEvent);
          that.getView().byId("PopOverCombination").close();
        }
      };
      this.oProperties = oProperties;
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

      //TableChart
      var oViz = this.getView().byId("TableChart");
      oViz.setModel(oModel);

      var oViz = this.getView().byId("c1");
      oViz.setVizProperties(oProperties);
      var oPopOver = new sap.viz.ui5.controls.Popover();
      oPopOver.connect(oViz.getVizUid());
      oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_2);

      var oViz = this.getView().byId("c2");
      oViz.setVizProperties(oProperties);
      var oPopOver = new sap.viz.ui5.controls.Popover();
      oPopOver.connect(oViz.getVizUid());
      oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_2);

      //var oViz = this.getView().byId("c3");
      //oViz.setVizProperties(oProperties);

      //pie
      var oViz = this.getView().byId("pie");
      oViz.setModel(oModel);
      oProperties.plotArea.dataLabel.formatString = CustomerFormat.FIORI_PERCENTAGE_FORMAT_3;
      oViz.setVizProperties(oProperties);
      var oPopOver = this.getView().byId("PopOverPie");
      var that = this;
      oPopOver.setCustomDataControl(function(data){
            if(data.data.val && data.target.__extra_data__ && data.target.__extra_data__.decoras && data.target.__extra_data__.decoras.textContent ) {
                var category = data.data.val[0].value;
                var value = data.data.val[1].value;
                var perc = data.target.__extra_data__.decoras.textContent;
                var svg = "<svg width='10px' height='10px'><path d='M-5,-5L5,-5L5,5L-5,5Z' fill='" + data.data.color + "' transform='translate(5,5)'></path></svg>";
                var divStr = "<div style = 'color:white; margin: 15px 30px 0 10px'>"+ svg + "<b style='margin-left:10px'>" + category + "</b></div>";
                divStr = divStr + "<div style = 'color:white; margin: 5px 30px 0 30px'>数值<span style = 'float: right'>" + value + "</span></div>";
                divStr = divStr + "<div style = 'color:white; margin: 5px 30px 15px 30px'>占比<span style = 'float: right'>" + perc + "</span></div>";

                that.chartSelected = {
                  StoreName: category,
                  measureNames: data.data.val[1].name,
                    id: that.VizDataSet.Data[data.data.val[2].value].id,
                    idValue: that.VizDataSet.Data[data.data.val[2].value].idValue
                };
                return new sap.ui.core.HTML({content:divStr});
            }
        });
      oPopOver.connect(oViz.getVizUid());
      oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_3);
      oPopOver.setActionItems([oActionItem1]);

      var oViz = this.getView().byId("c3");
      oViz.setVizProperties(oProperties);
      var oPopOver = new sap.viz.ui5.controls.Popover({
          'customDataControl' : function(data){
            if(data.data.val && data.target.__extra_data__ && data.target.__extra_data__.decoras && data.target.__extra_data__.decoras.textContent ) {
                var category = data.data.val[0].value;
                var value = data.data.val[1].value;
                var perc = data.target.__extra_data__.decoras.textContent;
                var svg = "<svg width='10px' height='10px'><path d='M-5,-5L5,-5L5,5L-5,5Z' fill='" + data.data.color + "' transform='translate(5,5)'></path></svg>";
                var divStr = "<div style = 'color:white; margin: 15px 30px 0 10px'>"+ svg + "<b style='margin-left:10px'>" + category + "</b></div>";
                divStr = divStr + "<div style = 'color:white; margin: 5px 30px 0 30px'>数值<span style = 'float: right'>" + value + "</span></div>";
                divStr = divStr + "<div style = 'color:white; margin: 5px 30px 15px 30px'>占比<span style = 'float: right'>" + perc + "</span></div>";
                return new sap.ui.core.HTML({content:divStr});
           }
        }
      });
      oPopOver.connect(oViz.getVizUid());
      oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_3);

      oProperties.plotArea.dataLabel.type = "value";
      oProperties.title.visible = false;
      oProperties.plotArea.dataLabel.formatString = CustomerFormat.FIORI_PERCENTAGE_FORMAT_2;
      var oViz = this.getView().byId("c0");
      oViz.setVizProperties(oProperties);
      var oPopOver = new sap.viz.ui5.controls.Popover();
      oPopOver.connect(oViz.getVizUid());
      oPopOver.setFormatString(CustomerFormat.FIORI_PERCENTAGE_FORMAT_2);
    },
    // setFixDashboardViz: function (oViz, oTitle, oProperties, maxValue, minValue, oFlag) {
    //   //temp
    //   oProperties.plotArea.primaryScale.maxValue = maxValue;
    //   oProperties.plotArea.primaryScale.minValue = minValue;
    //   oProperties.plotArea.primaryScale.fixedRange = oFlag;
    //   /*delete oProperties.valueAxis.label.formatString;
    //   delete oProperties.plotArea.dataLabel.formatString;*/
    //   oProperties.plotArea.gridline.visible = false;
    //   oProperties.title.visible = true;
    //   oProperties.title.text = oTitle;
    //   oViz.setVizProperties(oProperties);

    //   /*  var oViz = this.getView().byId("c2");
    //     oViz.setModel(oModel);
    //     oProperties.title.text = "产品质量分数各个工厂对比数据";
    //     oViz.setVizProperties(oProperties);*/

    // },
    onDetail: function () {
      this.getView().byId("Dashboard").setVisible(false);
      this.getView().byId("Detail").setVisible(true);
      //this.getView().byId("Nav").to(this.getView().byId("Detail"));
      var that = this;
      setTimeout(function () {
        that.updateChartProperty(that.mainChartMaxValue, that.mainChartMinValue, that.mainChartTitle);
      }, 500);
    },
    // onClose: function(oPopOver) {
    //    oPopOver.close();
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
    }

  });

});