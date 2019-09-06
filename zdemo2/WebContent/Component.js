sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/model/odata/v2/ODataModel",  //odata现在不需要
		"sap/ui/Device",
		"./controller/messages",
		"./model/models"
		
], function(UIComponent, ResourceModel, ODataModel, Device, messages, models) {
	"use strict";
	return UIComponent.extend("ZTM.Component", {
		metadata : {
			name : "xtit.shellTitle",
			version : "${project.version}",
			includes : [
				"css/style.css"
			],
			dependencies : {
				libs : [],
				components : []
			},
			
			rootView : "ZTM.view.App",
			config : {
				
				fullWidth : true, //全屏显示
				
				"resourceBundle" : "i18n/i18n.properties",  //绑定i18n资源
				
				
//		 添加odata服务路径		
				"serviceConfig" : [
					{
						"name" : "OData",
						"url" : "/sap/opu/odata/sap/ZEWM_WAVE_SRV/"
					},
					{
						"name" : "ODataS",
						"url" : "/sap/opu/odata/sap/ZEWM_WAVE_SRV/"
					}
				]
				
			},
			
			routing : {
				config : {
					routerClass : "sap.m.routing.Router",
					viewType : "XML",
					viewPath : "ZTM.view",
					controlId : "appNavContainer",   //App页面的容器ID
					targetAggregation : "pages",
					clearTarget : true
				},
				routes : [
						{
							pattern : "waveSplit", //本地运行为空
							name : "waveSplit",
							view : "waveSplit"
						},{
							pattern : "fileUpload", //本地运行为空
							name : "fileUpload",
							view : "fileUpload"
						},{
							pattern : "phoneApi", //本地运行为空
							name : "phoneApi",
							view : "phoneApi"
						},

				]
				
			}
			
		},

		init : function() {
			var oContext = this;
			var mConfig = this.getMetadata().getConfig();
			var aServiceUrl = mConfig.serviceConfig;
			var localModel = models.createLocalModel();
			this.setModel(localModel);
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.createFLPModel(), "FLP");
			
			// 循环加载服务配置
			for (var i = 0; i < aServiceUrl.length; i++) {

				var name = aServiceUrl[i].name;
				var url = aServiceUrl[i].url;

				this.setModel(models.createODataModel({
					urlParametersForEveryRequest : [
							"sap-server",
							"sap-client",
							"sap-language"
					],
					url : url,
					config : {
						useBatch : false,
						defaultCountMode : "None",
						disableSoftStateHeader : true,
						headers : {
							"ODataName" : name
						},
						json : true
					}
				}).attachMetadataLoaded(function(oEvent) {
					var oMetaData = oContext.getModel().getProperty("/ODataMetadata");
					var name = oEvent.getParameters().metadata.mHeaders.ODataName;
					oMetaData[name] = oEvent.getParameters().metadata;
					oContext.getModel().setProperty("/ODataMetadata", oMetaData, false)
				}).attachMetadataFailed(function(oEvent) {
					var sResponseText = oEvent.getParameters().responseText;
					var oResponseText = $.parseXML(sResponseText);
					var $ResponseText = $(oResponseText);
					var $message = $ResponseText.find("message");
					messages.showError($message.text());
				}), name);
			}
			
			
			var sRootPath = jQuery.sap.getModulePath("ZTM");
			this.setModel(models.createResourceModel(sRootPath, mConfig.resourceBundle), "i18n");
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},
		
		
		destroy : function() {
			this.getModel().destroy();
			this.getModel("i18n").destroy();
			this.getModel("FLP").destroy();
			this.getModel("device").destroy();
			this.getModel("OData").destroy();
			UIComponent.prototype.destroy.apply(this, arguments);
		}
	});
});
