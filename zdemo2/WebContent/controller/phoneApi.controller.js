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
	return BaseController.extend("ZTM.controller.phoneApi", {
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
		
		handleMap : function(){
			
//			var val1  = "西安";
//			var val2  = "北京";
//			var  URL = "http://api.map.baidu.com/marker?location=40.047669,116.313082&title="+ val1 +"&content="+ val2 +"&output=html&src=webapp.baidu.openAPIdemo"; 
//			var  URL ="http://api.map.baidu.com/geocoder?address="+ val1+"&output=html&src=webapp.baidu.openAPIdemo";
//			window.open(URL);
			
			var map = new BMap.Map("allmap");    // 创建Map实例p
			alert("aaa");
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
			//添加地图类型控件
			map.addControl(new BMap.MapTypeControl({
				mapTypes:[
		            BMAP_NORMAL_MAP,
		            BMAP_HYBRID_MAP
		        ]}));	  
			map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true);
			

			
		},
		
		handleBluetooth : function(evt){
			var localData = this._JSONModel.getData();
//			window.print(); //web页面打印功能
			
//			cordova.plugins.BluetoothPrint.connectDevice(address,function (data) {
//				messages.showText(data);
//			}, function (error) {
//				messages.showText("失败");
//			});
			
			cordova.plugins.BluetoothPrint.getPairedDevices(function (data) {
				messages.showText(data);
			}, function (error) {
				messages.showText("失败");
			});
			
			var a = cordova.plugins;
			localData.appProperties.result = a;
			this._JSONModel.setData(localData);
		},
		
		
		
		
		
		
		
		
		
//		cordova扫码
		handlescan : function(evt){
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					messages.showText("We got a barcode\n" +
			                "ResultCordova111: " + result.text + "\n" +
			                "Format: " + result.format + "\n" +
			                "Cancelled: " + result.cancelled);
			      },function (error) {
			    	  messages.showText("Scanning failed: " + error);
			      }
		
			);
		},
//		cordova 调用相机
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
				messages.showText("调用成功");
//				messages.showText(imageURI);
			}

			function onCameraError(message) {
//			  alert('Failed because: ' + message);
				messages.showText("调用失败");
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
		// 消息-按钮创建
		onAfterRendering : function() {},
		
		
	});
});