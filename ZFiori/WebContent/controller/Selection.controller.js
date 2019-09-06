sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "util/app"
], function (Controller, appUtil) {

  return Controller.extend("sap.vo.mengniu.controller.Selection", {
    _firstLoad: true,
    _isHome: true,
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("home").attachPatternMatched(this._onObjectMatched, this);
      oRouter.getRoute("single").attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched: function (oEvent) {
      if (oEvent.getParameters().name == 'home') {
        this._isHome = true;
      } else {
        this._isHome = false;
      }
    },
    onBeforeRendering: function () {
      var that = this;
      var oData = sap.ui.getCore().getModel("User").getData();
      if(!oData.UserName){
        setTimeout(function(){that.onBeforeRendering();},500);
        return;
      }
      var sAvail = oData.Avail;
      if (this._firstLoad) {
        this._firstLoad = false;
      } else {
        return;
      }
      this.mapping = appUtil.getAppMapping();

      var listObj = this.byId('master');
      var appList = appUtil.getAppList();

      appList.forEach(function (v) {
        if(sAvail.indexOf(v.id.toUpperCase()) < 0){
          return;
        }
        var text = new sap.m.Text({
          text: v.title
        })
        listObj.addContent(text);
        var image = new sap.m.Image(this.createId(v.id), {
          densityAware: false,
          src: './image/' + v.img,
          width: '17rem',
          height: '7rem'
        })
        image.addStyleClass('drag sapUiTinyMarginTop')
        listObj.addContent(image);
      }.bind(this));
      var image = new sap.m.Image(this.createId('last'), {
        width: '17rem',
        height: '7rem'
      })
      listObj.addContent(image);
    },

    onAfterRendering: function () {
      var that = this;
      if(this._firstLoad || $(".drag").length === 0){
        setTimeout(function(){
          that.onAfterRendering();
        },500);
        return;
      }
      var oId = [];
      var appId = "";
      var mapping = this.mapping;
      var bView = "";

      $(".drag").on('click', function (event) {
        var fullId = this.id;
        var appId = fullId.split("--")[2];
        var sView = mapping[appId].sView;
        that._redirect(appId);
      });
      if (!this._isHome) {
        return;
      }
      $(".drag").draggable({
        appendTo: "body",
        helper: 'clone',
        start: function (event, ui) {
          oId = event.target.id.split("--");
          appId = oId[2];
          bView = mapping[appId].bView;
        },
        drag: function (event, ui) {
          var tId = [
            oId[0] + "--blockContainer0",
            oId[0] + "--blockContainer1",
            oId[0] + "--blockContainer2",
            oId[0] + "--blockContainer3",
          ];
          for (var i = 0; i < tId.length; i++) {
            //匿名function 控制作用域 形参
            (function (i) {
              $("#" + tId[i]).droppable({
                accept: ".drag",
                drop: function (event, ui) {
                  var l = ui.helper.offset();
                  var widthLimit = $(".getWidth").width();
                  if (l.left > widthLimit) {
                    appUtil.repalceApp(sap.ui.getCore().byId(tId[i]), appId);
                    var oList = sap.ui.getCore().getModel("AppSeq").getData();
                    oList[i] = appId;
                    sap.ui.getCore().getModel("AppSeq").setData(oList);
                    sap.ui.getCore().getModel("ZMN_QM_DASHBOARD").create("/UserSet", {
                      Config: oList.join(",")
                    });
                  } else {
                    var oriPos = ui.draggable.offset();
                    var newPos = ui.helper.offset();
                    var minOffset = 5;
                    if (Math.abs(oriPos.left - newPos.left) < 5 && Math.abs(oriPos.top - newPos.top) < 5) {
                      that._redirect(appId);
                    } else {
                      sap.m.MessageToast.show("请拖拽到页面对应位置");
                    }
                  }
                }
              });
            })(i); //for循环 i真实值
          }
        }
      });
    },
    _redirect: function (appId) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("single", {
        appId: appId
      });
    }
  });
});