sap.ui.define(['sap/ui/model/json/JSONModel'], function (JSONModel) {
    'use strict';

    return {
        createAppModels: function () {
            var oModelApp = new JSONModel();
            oModelApp.loadData('json/app.json', null, false);
            oModelApp.setDefaultBindingMode('OneWay');
            sap.ui.getCore().setModel(oModelApp, 'app');

            var appList = oModelApp.getData()['list'];
            var mapping = {};
            appList.forEach(function (v) {
                var viewList = v['sView'].split(',');
                mapping[v.id] = v;
                v['sView'] = viewList[0];
                mapping[v.id]['viewList'] = viewList;
            });

            var oModelAppList = new JSONModel(appList);
            oModelAppList.setDefaultBindingMode('OneWay');
            sap.ui.getCore().setModel(oModelAppList, 'appList');

            var oModelAppMapping = new JSONModel(mapping);
            oModelAppMapping.setDefaultBindingMode('OneWay');
            sap.ui.getCore().setModel(oModelAppMapping, 'appMapping');
        },

        getAppModel: function () {
            return sap.ui.getCore().getModel('app');
        },

        getApp: function () {
            return sap.ui
                .getCore()
                .getModel('app')
                .getData();
        },

        getAppList: function () {
            return sap.ui
                .getCore()
                .getModel('appList')
                .getData();
        },

        getAppMapping: function () {
            return sap.ui
                .getCore()
                .getModel('appMapping')
                .getData();
        },

        repalceApp: function (oView, appId) {
            var mapping = this.getAppMapping();
            oView.removeAllContent();
            if (mapping[appId] && mapping[appId].bView) {
                var blockContainer = new sap.ui.xmlview({
                    viewName: 'sap.vo.mengniu.view.blocks.BlockContainer'
                });
                blockContainer.setModel(appId, 'appId');
                oView.addContent(blockContainer);
            }
        }
    };
});
