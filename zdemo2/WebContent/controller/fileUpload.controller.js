//验货查询的控制器
jQuery.sap.require("sap.ndc.BarcodeScanner");
sap.ui.define([
		"./BaseController",
		"sap/ui/model/Sorter",
		"./designMode",
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/Filter",
		"ZTM/model/models",
		"ZTM/controller/messages",
		"sap/m/MessageBox",
		"ZTM/model/formatter",
		"sap/ui/model/FilterOperator",
		"ZTM/model/poster",
		"sap/m/MessageToast",
		"sap/ui/model/odata/v2/ODataModel",
		"sap/ndc/BarcodeScanner",
		
], function(BaseController, Sorter, designMode,Controller,Filter,models,
		   messages,MessageBox,formatter,FilterOperator,poster,MessageToast, ODataModel,BarcodeScanner) {
	"use strict";
	return BaseController.extend("ZTM.controller.fileUpload", {
		//初始化
		onInit : function() {
			this._Controller = this;
			this._ODataModel = this.getModel("OData");//数据模型
			this._SDataModel = this.getModel("SData");
			this._ResourceBundle = this.getModel("i18n").getResourceBundle();
			this._JSONModel = this.getModel();//model对象模型
			this._device = this.getModel("device");
//           监听事件
			this.getEventBus().subscribe("ZTM", "postSuccess", this.handlePost);
			this.getEventBus().subscribe("ZTM", "postError", this.handlePost);
			this.guid;
			
		
		},
		handlescan : function(evt){
			cordova.plugins.barcodeScanner.scan(
				function (result) {
			          alert("We got a barcode\n" +
			                "ResultCordova111: " + result.text + "\n" +
			                "Format: " + result.format + "\n" +
			                "Cancelled: " + result.cancelled);
			      },function (error) {
			          alert("Scanning failed: " + error);
			      }
		
			);
		},
		// 消息-按钮创建
		onAfterRendering : function() {},
		handlePress : function(evt){
			var cameraOptions= {
				    quality : 75,
				    destinationType : Camera.DestinationType.DATA_URL,
				    sourceType : Camera.PictureSourceType.CAMERA,
				    allowEdit : false,
				    encodingType : Camera.EncodingType.JPEG,
				    targetWdith : 200,
				    targetHeight : 200,
				    popoverOptions : CameraPopoverOptions,
				    saveToPhotoAlbum : false
				};
			navigator.camera.getPicture(onCameraSuccess, onCameraError, cameraOptions);

			function onCameraSuccess(imageURI){   
//			   $('#img_pic').attr("src","data:image/jpeg;base64," + imageURI);
				alert("调用成功");
			}

			function onCameraError(message) {
//			  alert('Failed because: ' + message);
				alert("调用失败");
			}
			
		},
		
		
//		Ui5 扫码组建 ios 不支持
		handlePress1: function (evt) {
			var oController = this;
			var localData = this._JSONModel.getData();
			navigator.getMedia = navigator.getUserMedia || navagator.webkitGetUserMedia || 
			navigator.mozGetUserMedia || navigator.msGetUserMedia;
			BarcodeScanner.scan(
					   function (mResult) {
//						      alert("We got a bar code\n" + 
//						            "Result: " + mResult.text + "\n" +
//						            "Format: " + mResult.format + "\n" +
//						            "Cancelled: " + mResult.cancelled);
						  MessageToast.show(mResult.text);
//					      localData.appProperties.URL = mResult.text;
//					      oController._JSONModel.setData(localData);
//						      var URL = mResult.text.slice(0,4);
//							   if(mResult.text.slice(0,4) == "http:"){
//								   window.open(URL);
//							   }
						   },
						   
						   function (Error) {
						      alert("Scanning failed: " + Error);
						   }
//						   function (mParams) {
//						      alert("Value entered: " + mParams.newValue);
//						   }
						);
			var moel = sap.ndc.BarcodeScanner.getStatusModel();
			
		},
		onChange : function(oEvent) {
			var localData = this._JSONModel.getData();
			var oUploadCollection = oEvent.getSource();
			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZFILE_UPDOWN_SRV/fileSet");
			var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({  // Header Token
				name : "x-csrf-token",
				value : oModel.getSecurityToken()
			});
//			var guid = this.byId("pernrNo").getValue();
			localData.appProperties.type = oEvent.mParameters.files[0].type;
			this._JSONModel.setData(localData);
			oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
		},
		onBeforeUploadStarts : function(oEvent) {  // Header Slug
			var localData = this._JSONModel.getData();
			var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
				name : "slug",
				value : oEvent.getParameter("fileName")
			});
			var oCustomerHeaderGUID = new sap.m.UploadCollectionParameter({   // 添加主键
				name : "GUID",
				value : this.guid
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderGUID);
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
		},
		onStartUpload : function() {
			var oUploadCollection = this.getView().byId("UploadCollection");
			var cFiles = oUploadCollection.getItems().length;
			if(cFiles>0){
				oUploadCollection.upload();
			}
		},
		onUploadComplete: function(oEvent) { //上传完成触发事件
			var sUploadedFileName = oEvent.getParameter("files")[0].fileName;
			setTimeout(function() {
				this.setBusy(false);
				MessageToast.show("文件上传完成");
			}, 4000);
		},
		
		onStarpress : function(evt){
			var localData = this._JSONModel.getData();
			localData.pernerSet = [];
			var guid = this.byId("pernrNo").getValue();
			localData.pernerSet.push(guid);
			this._JSONModel.setData(localData);
			
			for(var i=0;i<localData.pernerSet.length;i++){
				this.guid = localData.pernerSet[i];
				this.onStartUpload();
			}
			
		},
		
		
//		下载
		downLoad : function(evt){
			
			var oController = this;
//			this.setBusy(true);
			var localData = this._JSONModel.getData();
			
			var Guid  = this.getView().byId("downGuid").getValue();
			var oFilter_Guid = new sap.ui.model.Filter("Guid", sap.ui.model.FilterOperator.EQ,Guid);
			
			var aFilter = [
				oFilter_Guid
			];
			
			this._SDataModel.read("/querySet",{
				  filters : aFilter,
				  success : function(oData, response) {
						localData.resultSet  = oData.results;
						oController.setBusy(false);
						localData.itemsBase = [];
						localData.itemsPdf = [];
						for(var i=0;i<localData.resultSet.length; i++){
							
							var sUrl = "/sap/opu/odata/SAP/ZFILE_UPDOWN_SRV/fileSet('"+ oController.getView().byId("downGuid").getValue()+ "&"+ localData.resultSet[i].Filename +"')/$value";
							window.open(sUrl);  //等同于上面的步骤
							
						}
						
						oController._JSONModel.setData(localData);
				  },error : function(oError) {
						messages.showText("服务异常");	
						oController.setBusy(false);
						return;
				  } 
			 });
			
		},
		
		
		
		
		
		
		
		onStartUpload1 : function(){
			var localData = this._JSONModel.getData();
            var Headers = {
                      "x-csrf-token": localData.fileSet.token,
                      "slug": localData.fileSet.slug,
                      "Content-Type" : localData.fileSet.type
            	}; 
            var data = {
            		Znomber : "123456",
            		Filename : localData.fileSet.slug,
            	};
            $.ajax({
                      type: 'POST',
                      url: "/sap/opu/odata/SAP/ZFILE_UPDOWN_SRV/fileSet",
                      headers: Headers,
                      dataType: "application/json",
                      cache : false,
                      data: JSON.stringify(data),
//                      data: data,
                      async: true,
                      success: function(Data,oResponse){
                    	  messages.showText("上传成功");
                      },error: function(error){
                    	  messages.showText("服务异常");
                      }
            });
            
		},
		handleAdd : function(oEvent){
			var oController = this;
			this.setBusy(true);
			var localData = this._JSONModel.getData();
			var saveSet = localData.saveSet;
			saveSet.Fcode= "SAVE";
			saveSet.Gender = this.byId("gender").getSelectedKey();
			this._ODataModel.create('/saveSet', saveSet,{
				success : function(oData,response){
					oController.setBusy(false);
					var msg = oData.Message;
					messages.showText(msg);
				},error : function(oError){
					messages.showText("系统服务异常");
					oController.setBusy(false);
					return;
				}
			});
		
		},
		
//		查询功能
		handleQuery : function(oEvent){
			var oController = this;
			this.setBusy(true);
			var localData = this._JSONModel.getData();
			var Jobno  = this._JSONModel.getProperty("/saveSet/Jobno");
			var oFilter_Jobno = new sap.ui.model.Filter("Jobno", sap.ui.model.FilterOperator.EQ,Jobno);
			
			var Gender  = this.byId("gender").getSelectedKey();
			var oFilter_Gender = new sap.ui.model.Filter("Gender", sap.ui.model.FilterOperator.EQ,Gender);
			
			var aFilter = [
				oFilter_Jobno,
				oFilter_Gender
			];
			this._ODataModel.read("/querySet",{
				  filters : aFilter,
				  success : function(oData, response) {
						localData.resultSet  = oData.results;
						oController.setBusy(false);
						oController._JSONModel.setData(localData);
				  },error : function(oError) {
						messages.showText("服务异常");	
						oController.setBusy(false);
						return;
				  } 
			 });
			
		},
		
//		跳转页面
		handEnter : function(oEvent){
			var oController = this;
			oController.setBusy(true);
			var localData = this._JSONModel.getData();
			var fcode = this.getfcode(oEvent);
			this.setfcode(fcode);
			
			oController.setBusy(false);
			this.navTo("deliveryDetail");
		},
		
		
//		open Dialog
		handleOperation : function(oEvent) {
			var fcode = this.getfcode(oEvent);
			this.setfcode(fcode);
			var aFilter = [];
			if(fcode=="Doctype"){
				aFilter.push(new Filter("Category", "EQ", "PDI"));
				poster.callSearchHelp("ZshDoctype",this,aFilter);
			}
			
			this._JSONModel.setProperty("/appProperties/title","搜索帮组");
			
			if (!this._oSubControllerForPost) {
				this._oSubControllerForPost = new SHDialog(this.getView());
			}
			this._oSubControllerForPost.openDialog(oEvent);
		},
		
		
		
		// 响应成功后的回调函数
		onPostSuccess : function(oContext) {
			oContext.getEventBus().publish("ZTM", "postSuccess", oContext);	
		},
	// 响应失败后的回调函数
		onPostError : function(oContext) {
			oContext.getEventBus().publish("ZTM", "postError", oContext);
		},
		//获取字段的ID
		getfcode : function(oEvent) {
			var sButId = oEvent.getParameter("id");
			var aButId = sButId.split("-");
			var iLast = parseInt(aButId.length) - 1;
			var sOP = aButId[iLast];
			return sOP;
		},

		
		
	});
});