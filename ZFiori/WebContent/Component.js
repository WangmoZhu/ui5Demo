sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'sap/ui/Device',
        'sap/vo/mengniu/model/models',
        'util/app'
    ],
    function (UIComponent, Device, models, appUtil) {
        'use strict';
        return UIComponent.extend('sap.vo.mengniu.Component', {
            metadata: {
                manifest: 'json',
                dependencies: {
                    libs: ['sap.m']
                }
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // sap.ui
                //     .getCore()
                //     .setModel(new sap.ui.model.json.JSONModel(), 'Online');

                appUtil.createAppModels();
                this.setModel(appUtil.getAppModel(), 'app');

                // call the base components init function
                $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-core');
                $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-widget');
                $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-mouse');
                $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-sortable');

                $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-droppable');
                $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-draggable');
                sap.ui
                    .getCore()
                    .getConfiguration()
                    .setLanguage('zh-CN');

                jQuery.sap.require('lib/jquery-ui-touch-punch-min');

                // set the device model
                this.setModel(models.createDeviceModel(), 'device');

                // var oModelOnline = new sap.ui.model.json.JSONModel();
                // sap.ui.getCore().setModel(oModelOnline, 'MessageStatSet');

                sap.ui
                    .getCore()
                    .setModel(new sap.ui.model.json.JSONModel(), 'Plant');
                sap.ui
                    .getCore()
                    .setModel(new sap.ui.model.json.JSONModel(), 'User');
                sap.ui
                    .getCore()
                    .setModel(
                        new sap.ui.model.json.JSONModel('json/KPIConfig.json'),
                        'oModelKPIConfig'
                    );
                sap.ui
                    .getCore()
                    .setModel(new sap.ui.model.json.JSONModel(), 'AppSeq');
                if (sap.ui.getCore().getModel('Online')) {
                    var oDataModel = new sap.ui.model.odata.v2.ODataModel(
                        '/sap/opu/odata/sap/ZMN_QM_DASHBOARD_SRV',
                        { useBatch: false }
                    );
                    sap.ui.getCore().setModel(oDataModel, 'ZMN_QM_DASHBOARD');
                    oDataModel.read('/PlantSet', {
                        success: function (data) {
                            sap.ui
                                .getCore()
                                .getModel('Plant')
                                .setData(data);
                        }
                    });
                    oDataModel.read('/UserSet', {
                        success: function (data) {
                            var oData = data.results[0];
                            var oConfig = sap.ui
                                .getCore()
                                .getModel('oModelKPIConfig')
                                .getData();
                            // oData.Role = "Group";
                            oData.L1 =
                                oConfig.Role[oData.Role.toUpperCase()].L1;
                            oData.L2 =
                                oConfig.Role[oData.Role.toUpperCase()].L2;
                            oData.L3 =
                                oConfig.Role[oData.Role.toUpperCase()].L3;
                            oData.Other =
                                oConfig.Role[oData.Role.toUpperCase()].Other;
                            sap.ui
                                .getCore()
                                .getModel('User')
                                .setData(oData);
                        }
                    });
                } else {
                    sap.ui
                        .getCore()
                        .getModel('Plant')
                        .loadData('json/plantSet.json', null, false);
                    sap.ui
                        .getCore()
                        .getModel('User')
                        .setData({
                            UserName: '集团用户',
                            L1: [
                                'MN_QM_001',
                                'MN_QM_002',
                                'MN_QM_003',
                                'MN_QM_004'
                            ],
                            L2: [
                                'MN_QM_005',
                                'MN_QM_006',
                                'MN_QM_007',
                                'MN_QM_008'
                            ],
                            L3: ['MN_QM_009', 'MN_QM_010'],
                            Other: [
                                'MN_QM_005',
                                'MN_QM_006',
                                'MN_QM_007',
                                'MN_QM_008'
                            ],
                            Batfm: '4',
                            // 添加Avail属性 HANDZHH
                            Avail: [
                                'KPI',
                                'FOODSAFETY',
                                'TRACE',
                                'SPC',
                                'COMPLAINTS',
                                'SURVEILLANCE'
                            ]
                        });
                }
                UIComponent.prototype.init.apply(this, arguments);

                // create the views based on the url/hash
                this.getRouter().initialize();
            }
        });
    }
);
