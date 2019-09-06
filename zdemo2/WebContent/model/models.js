sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device",
		"sap/ui/model/odata/v2/ODataModel",
		"sap/ui/model/resource/ResourceModel"
], function(JSONModel, Device, ODataModel, ResourceModel) {
	"use strict";

	function extendMetadataUrlParameters(aUrlParametersToAdd, oMetadataUrlParams, sServiceUrl) {
		var oExtensionObject = {}, oServiceUri = new URI(sServiceUrl);

		aUrlParametersToAdd.forEach(function(sUrlParam) {
			var sLanguage, oUrlParameters, sParameterValue;

			// for sap-language we check if the launchpad can provide it.
			if (sUrlParam === "sap-language") {

				var fnGetuser = jQuery.sap.getObject("sap.ushell.Container.getUser");
				if (fnGetuser) {
					// for sap-language we check if the launchpad can provide it.
					sLanguage = fnGetuser().getLanguage();
				}

				if (sLanguage) {
					oMetadataUrlParams["sap-language"] = sLanguage;
					return;
				}
				// Continue searching in the url
			}

			oUrlParameters = jQuery.sap.getUriParameters();
			sParameterValue = oUrlParameters.get(sUrlParam);
			if (sParameterValue) {
				oMetadataUrlParams[sUrlParam] = sParameterValue;
				oServiceUri.addSearch(sUrlParam, sParameterValue);
			}
		});

		jQuery.extend(oMetadataUrlParams, oExtensionObject);
		return oServiceUri.toString();
	}

	return {
		
		// 创建OData模型
		createODataModel : function(oOptions) {
			var aUrlParametersForEveryRequest, oConfig, sUrl;

			oOptions = oOptions || {};

			if (!oOptions.url) {
				jQuery.sap.log.error("Please provide a url when you want to create an ODataModel", ".model.models.createODataModel");
				return null;
			}

			// create a copied instance since we modify the
			// config
			oConfig = jQuery.extend(true, {}, oOptions.config);

			aUrlParametersForEveryRequest = oOptions.urlParametersForEveryRequest || [];
			oConfig.metadataUrlParams = oConfig.metadataUrlParams || {};

			sUrl = extendMetadataUrlParameters(aUrlParametersForEveryRequest, oConfig.metadataUrlParams, oOptions.url);

			return this._createODataModel(sUrl, oConfig);

		},

		// 创建OData模型
		_createODataModel : function(sUrl, oConfig) {
			return new ODataModel(sUrl, oConfig);
		},

		// 初始化本地数据集
		_initialLocalData : function() {

			var localData = {
				// 公用属性
				appProperties : {
					busy : false,
					editable : false,
					title : "",
					bcode : "",
					fcode : "",
					tcode : "",
					scode : "",
					queryMaxhints : "9999",
					maxNumber : "",
					nextmaxNumber : "",
					type : "",
					URL : "",
					result : ""
						
				},
				// VER属性集
				verReturn : {},
				// 消息集
				messages : {
					buttonWidth : "0em",
					counter : 0,
					counterE : 0,
					content : []
				},
				// OData元数据集
				ODataMetadata : {},
				keySet : [],
				matnrSet : [],
				daySet : [],
				
				HeadSet : {
					Lgnum : "",
					Wave : "",
					Status : "",
					RouteId : "",
					Workday : "",
					CreateStart : "",
					CreateEnd : "",
					ReleasedBy : "",
					Urgent : "A",
					PartnerName : "",
					Salername : "",
					Coldchain : "A",
					Lgbkz : "",
					Urgentlogo : "A",
					np_2WaveRel : [],
					np_2Return : []
				},
				
				HeadDeepSet : {
					np_2WaveRel : [],
					np_2Return : []
				},
				FreeDeepSet : {
					np_2WaveDeatil : [],
					np_2Return : []
				},
				FreePostSet : {
					np_2WavePost : []
				},
				
				btSet : [],
				RouteIdSet : [],
				
				enterSet : {
					Wave : "",
					Action : "",
					ToReturn : []
				},
				
				EtBcSet : {
					Wave : "",
					WaveItm : "", 
					Action : "",
					ToReturn : []
				},
				
				bcHeadSet : [],
				
				
				LgnumSet : {
					Lgnum : "",
					Lnumt : "",
					lg_2np : []
				}
				
			};

			var uR = $.ajax({
				url : "/sap/bc/ui2/start_up",
				async : false
			});

			if (uR.status === 200) {
				localData.userSet = uR.responseJSON;
			};
			
			return localData;
		},

		// 创建设备模型
		createDeviceModel : function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		// 创建FLP模型
		createFLPModel : function() {
			var fnGetuser = jQuery.sap.getObject("sap.ushell.Container.getUser");
			var bIsShareInJamActive = fnGetuser ? fnGetuser().isJamActive() : false;
			var oModel = new JSONModel({
				isShareInJamActive : bIsShareInJamActive
			});
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		// 创建本地模型
		createLocalModel : function() {
			var oModel = new JSONModel(this._initialLocalData());
			oModel.setSizeLimit(9999);
			return oModel;
		},

		// 	创建资源模型
		createResourceModel : function(sRootPath, resourceBundle) {
			this._resourceModel = new ResourceModel({
				bundleUrl : [
						sRootPath,
						resourceBundle
				].join("/")
			});
			return this._resourceModel;
		}
	};

});