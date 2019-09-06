sap.ui.define(
    ['sap/ui/core/mvc/Controller', 'util/app', 'sap/ui/model/json/JSONModel'],
    function (Controller, appUtil, JSONModel) {
        'use strict';

        return Controller.extend(
            'sap.vo.mengniu.controller.blocks.BlockContainer',
            {
                /**
                 * Called when a controller is instantiated and its View controls (if available) are already created.
                 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
                 * @memberOf sap.vo.mengniu.view.view1
                 */
                onInit: function () {
                    this._chartContainer = this.byId('idChartContainer');
                    this._chartContainer.setShowFullScreen(false);
                    this._chartContainer.setFullScreen(false);
                    this._viewIndex = 0;
                    // this._KPI ='';
                },

                /**
                 * Similar to onAfterRendering, but this hook is invoked before the controllers View is re-rendered
                 * (NOT before the first rendering! onInit() is used for that one!).
                 * @memberOf sap.vo.mengniu.view.view1
                 */
                onBeforeRendering: function () {
                    var appMapping = appUtil.getAppMapping();

                    this.appId = this.getView().getModel('appId');
                    this.byId('title').setText(appMapping[this.appId].title);
                    this.byId('customIcon').setSrc(appMapping[this.appId].icon);

                    var chartContainer = this.byId('idChartContainer');
                    var newAppView = new sap.ui.xmlview({
                        viewName:
                            'sap.vo.mengniu.view.blocks.' +
                            appMapping[this.appId].bView
                    });
                    var newAppController = newAppView.getController();
                    if (
                        newAppController &&
                        newAppController.setBlockContainer
                    ) {
                        newAppController.setBlockContainer(this);
                    }
                    var appInfo = new JSONModel({ isSingleView: true });
                    newAppView.setModel(appInfo, 'appInfo');
                    chartContainer.removeAllContent();
                    var ChartContainerContent = new sap.suite.ui.commons.ChartContainerContent(
                        {
                            icon: 'sap-icon://line-chart',
                            title: 'Line Chart',
                            height: '100%',
                            content: [newAppView]
                        }
                    );
                    chartContainer.insertContent(ChartContainerContent);
                },

                /**
                 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
                 * This hook is the same one that SAPUI5 controls get after being rendered.
                 * @memberOf sap.vo.mengniu.view.view1
                 */
                // onAfterRendering: function() {
                // },

                /**
                 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
                 * @memberOf sap.vo.mengniu.view.view1
                 */
                //  onExit: function() {
                //
                //  }

                setViewIndex: function (index) {
                    this._viewIndex = index;
                },
                getViewIndex: function () {
                    return this._viewIndex;
                },
                // setKPI: function(KPI) {
                //  this._KPI = KPI;
                // },
                // getKPI: function() {
                //  return this._KPI;
                // },
                onFullScreen: function () {
                    var appId = this.appId;
                    var component = sap.ui
                        .getCore()
                        .getComponent('__component0');
                    var oRouter = component.getRouter();
                    var viewIndex = this.getViewIndex();
                    viewIndex = parseInt(viewIndex);
                    // var KPI = this.getKPI();
                    var parameters = {
                        appId: appId
                    };
                    if (viewIndex > 0) {
                        parameters['viewIndex'] = viewIndex;
                    }
                    // if(KPI !==  "" ) {
                    //  parameters['KPI'] = KPI;
                    // }
                    oRouter.navTo('single', parameters);
                }
            }
        );
    }
);
