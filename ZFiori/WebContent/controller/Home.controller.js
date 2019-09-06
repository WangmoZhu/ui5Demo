sap.ui.define(
    ['sap/ui/core/mvc/Controller', 'util/app', 'sap/m/MessageBox'],
    function (Controller, appUtil, MessageBox) {
        'use strict';
        return Controller.extend('sap.vo.mengniu.controller.Home', {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter
                    .getRoute('home')
                    .attachPatternMatched(this._onObjectMatched, this);

                // varmangemen
                var oDate = {
                    user: 'myUserId',
                    defaultKey: 'key-item1',
                    // defaultKey:"key-item1",
                    item: [
                        {
                            text: '灵活指标',
                            key: 'key-item1',
                            readOnly: 1,
                            author: 'myUserId',
                            variant: {
                                items: ['KPI', 'FoodSafety', 'Trace', 'SPC']
                            }
                        },
                        {
                            text: '地图监控',
                            key: 'key-item2',
                            readOnly: 1,
                            author: 'other',
                            variant: {
                                items: [
                                    'Surveillance',
                                    'FoodSafety',
                                    'Trace',
                                    'SPC'
                                ]
                            }
                        }
                    ]
                };
                var oModel = new sap.ui.model.json.JSONModel(oDate);
                this.vm = this.byId('vm');
                this.vm.setModel(oModel, 'VM');
            },
            onMenuPress: function () {
                var splitappId = this.createId('App');
                sap.ui
                    .getCore()
                    .byId(splitappId)
                    .showMaster();
            },
            onHomePress: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo('home');
            },
            _hideMaster: function () {
                var splitAppObj = this.byId('App');
                splitAppObj.hideMaster();
            },
            _onObjectMatched: function (oEvent) {
                var device = this.getView()
                    .getModel('device')
                    .getData();
                if (device.system.phone) {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo('mHome');
                    return;
                }
                this._hideMaster();
                // this.byId("vm").setVisible(true);
            },

            onSelect: function (e) {
                var that = this;
                var oData = sap.ui
                    .getCore()
                    .getModel('User')
                    .getData();
                if (!oData.UserName) {
                    setTimeout(function () {
                        that.onSelect(e);
                    }, 100);
                    return;
                }
                var sAvail = oData.Avail;
                var aTotal = [
                    'KPI',
                    'FoodSafety',
                    'Trace',
                    'SPC',
                    'Complaints',
                    'Surveillance'
                ];
                var aAvail = [];
                aTotal.forEach(function (x) {
                    if (
                        aAvail.length < 4 &&
                        sAvail.indexOf(x.toUpperCase()) >= 0
                    ) {
                        aAvail.push(x);
                    }
                });
                var oConfig = oData.Config || aAvail.join(',');
                var items = oConfig.split(',');
                // var items = e.getParameter('variant')['items'] || ['','','',''];
                var mapping = appUtil.getAppMapping();
                var appList = appUtil.getAppList();
                items.forEach(
                    function (v, i) {
                        appUtil.repalceApp(this.byId('blockContainer' + i), v);
                    }.bind(this)
                );
                sap.ui
                    .getCore()
                    .getModel('AppSeq')
                    .setData(items);
            },
            onSave: function (e) {
                console.log(e);
            },
            onCreate: function (e) {
                console.log(e);
            },
            onLogoff: function () {
                MessageBox.warning('您确认要注销您的登陆吗？', {
                    actions: [
                        sap.m.MessageBox.Action.OK,
                        sap.m.MessageBox.Action.CANCEL
                    ],
                    onClose: function (sAction) {
                        if (sAction === 'OK') {
                            window.location.href =
                                '/sap/public/bc/icf/logoff?redirectURL=/sap/bc/ui5_ui5/sap/zmn_quality_bi/webapp/index.html';
                        }
                    }
                });
            }
        });
    }
);
