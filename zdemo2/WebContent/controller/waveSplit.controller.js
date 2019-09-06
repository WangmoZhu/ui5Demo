//验货查询的控制器
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
		"./queryCondtionDialog",
		"sap/ui/model/odata/v2/ODataModel",
], function(BaseController, Sorter, designMode,Controller,Filter,models,
		   messages,MessageBox,formatter,FilterOperator,poster, queryCondtionDialog, ODataModel) {
	"use strict";
	return BaseController.extend("ZTM.controller.waveSplit", {
		
		//初始化
		
		onInit : function() {
			this._Controller = this;
			this._ODataModel = this.getModel("OData");//数据模型
			this._ResourceBundle = this.getModel("i18n").getResourceBundle();
			this._JSONModel = this.getModel();//model对象模型
			this.settcode("WAVE");
			this._Controller.setBusy(true);
			
//           监听事件
			this.getEventBus().subscribe("ZTM", "postSuccess", this.handlePost);
			this.getEventBus().subscribe("ZTM", "postError", this.handlePost);
			
			var oMenu = sap.ui.xmlfragment(this.getView().getId(), "ZTM.view.waveSplitmenu", this);
			if (designMode.getCompactCozyClass() === "sapUiSizeCozy") {
				this.getView().getContent()[0].setFooter(oMenu);
			}
			if (designMode.getCompactCozyClass() === "sapUiSizeCompact") {
				this.getView().getContent()[0].setSubHeader(oMenu);
			}
			designMode.syncStyleClass(this.getView(), oMenu);
			this._Controller.onAllLgnum();// all仓库号
			this._Controller.onGetLgnum(this);//get那仓库号
		},
		// 消息-按钮创建
		onAfterRendering : function() {
			this._Controller.setBusy(false);
			messages.createMessageButton(this);
			
			
			var aFilter = [];
			var lgnum = this._JSONModel.getProperty("/LgnumSet/Lgnum");
			aFilter.push(new Filter("Lgnum", "EQ", lgnum));
			poster.callSearchHelp("ZshLgbkz", this, aFilter);
			poster.callSearchHelp("ZshRoute", this, aFilter);
			
			poster.callSearchHelp("ZshMatnr",this);
			
		},
		onAllLgnum : function(){
			var localData = this._JSONModel.getData();
//			var tcode = this.getfcode(oEvent);
			var oData_Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEWM_DEFAULT_PARA_SRV/",true);
			var url = "/DefaultWhse?Action='ALL'&Lgnum=''&Tcode='ZWAVELG'"; 
			oData_Model.read(url, null, null, false, function(oData, response) {
				localData.LgnumSet.lg_2np = oData.results;
			}, function(oError) {
				messages.showText("服务异常");	
			});
		},
		onGetLgnum : function(){
			var localData = this._JSONModel.getData();
			var oData_Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEWM_DEFAULT_PARA_SRV/",true);
			var url = "/DefaultWhse?Action='GET'&Lgnum=''&Tcode='ZWAVELG'"; 
			oData_Model.read(url, null, null, false, function(oData, response) {
				if(oData.results.length == 0 ){
					messages.showText("请选择仓库");	
				}else{
					localData.LgnumSet.Lgnum = oData.results[0].Lgnum;
					localData.LgnumSet.Lnumt = oData.results[0].Lnumt;
				}
				
			}, function(oError) {
				messages.showText("服务异常");	
			});
		},
		
//		行选择事件
//		handleRowSlect : function(oEvent){
//			var localData = this._JSONModel.getData();
//			var spath = "";
//			if(oEvent.mParameters.rowContext){
//				spath = oEvent.mParameters.rowContext.sPath;
//				var index = spath.split("/")[2];
//				var selectWave = {
//						Wave : localData.WaveHeadSet[index].Wave
//				}
//				localData.selectSet.push(selectWave);
//			}
//			
//			this._JSONModel.setData(localData);
//		},
		
//		查询功能
		onQuery :function(oEvent){
			var oController = this;
			var fcode = this.getfcode(oEvent);
			this.setfcode(fcode);
			this._JSONModel.setProperty("/appProperties/title","查询条件");
			var localData = this._JSONModel.getData();
			if(localData.LgnumSet.Lgnum == ""){
				messages.showText("请选择仓库");
				return;
			}
			if (!this._oSubControllerForPost) {
				this._oSubControllerForPost = new queryCondtionDialog(this.getView());
			}
			this._oSubControllerForPost.openDialog(oEvent);
			
		},
//		仓库选择
		onSelect : function(oEvent){
			var fcode = this.getfcode(oEvent);
			this.setfcode(fcode);
			this._JSONModel.setProperty("/appProperties/title","仓库选择");
			if (!this._oSubControllerForPost) {
				this._oSubControllerForPost = new queryCondtionDialog(this.getView());
			}
			this._oSubControllerForPost.openDialog(oEvent);
		},

		
//		释放消息处理
		onloadRel : function(oEvent){
			var localData = this._JSONModel.getData();
			var val = localData.btSet;
			if(val.length <= 0){
				messages.showText("无消息");
				return;
			}
			localData.oModel = [];
			var aMockMessages = [];
			var typeVal ="";
			var Res = "";
			var color = "";
			for(var i = 0; i < val.length; i++){
				if(val[i].Type =="E"){
					typeVal ="错误";
					Res = "sap-icon://error";
					color = "red";
				}
				aMockMessages[i] = {
					color : color,	
					res : Res,
					type : typeVal,
					title : val[i].Wave,
					description : val[i].Message,
				}
				typeVal = "";
				Res ="";
				color ="";
			}
			localData.oModel = aMockMessages ;
			this._JSONModel.setData(localData);
			this.setbcode("BC");
//			var fcode = this.getfcode(oEvent);
			var fcode = "Msg";
			this.setfcode(fcode);
			this._JSONModel.setProperty("/appProperties/title","消息展示");
			if (!this._oSubControllerForPost) {
				this._oSubControllerForPost = new queryCondtionDialog(this.getView());
			}
			this._oSubControllerForPost.openDialog(this);
		},
		
//		释放
		onGet : function(oEvent){
			var oController = this;
			oController.setBusy(true);
			var localData = this._JSONModel.getData();
			localData.bcHeadSet = [];
			var oData_Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEWM_WAVE_SRV/",true);
			var selectArr = this.byId("tbItem").getBinding().oList;
			var indexArr = this.byId("tbItem").getSelectedIndices();
			var aIndices = this.byId("tbItem").mBindingInfos.rows.binding.aIndices;
			if(indexArr.length == 0){
				messages.showText("请选择目标");
				oController.setBusy(false);
				return;
			}
			localData.FreeDeepSet.np_2WaveDeatil = [];
			localData.btSet = [];//接受消息结构清空

			for(var i = 0 ; i<indexArr.length ; i++){
				var j = indexArr[i];
				var k = aIndices[j];
				var waveNew = {
						Wave : selectArr[k].Wave,
				}
				localData.FreeDeepSet.np_2WaveDeatil.push(waveNew);
				localData.bcHeadSet.push(waveNew);
			}
			
			oData_Model.create('/WaveFreeSet', localData.FreeDeepSet, null, function(oData, response) {
				if(oData.np_2Return){
					localData.btSet = oData.np_2Return.results;
					oController._JSONModel.setData(localData);
				}
				oController.setBusy(false);
				var numNo = localData.btSet.length;
				oController.byId("Msg").setText(numNo);
				if(numNo>0){
					oController.onloadRel(oEvent); //  消息展示处理
				}else{
					messages.showText("操作成功");
				}
				oController.Query(oEvent); //刷新数据
				oController.getView().byId("tbItem").setSelectedIndex(-1);   // 清除选中的行目标
				
			},function(oError) {
				messages.showText("系统服务异常");
				oController.setBusy(false);
				return;
			});
			
			
		},
		
//		拆分
		onSplit : function(oEvent){
			var oController = this;
			var localData = this._JSONModel.getData();
			localData.HeadDeepSet.np_2WaveRel = [];
			oController.setBusy(true);
			var oData_Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEWM_WAVE_SRV/",true);
			var selectBc = this.byId("tableBc").getBinding().oList;
			var indexBc = this.byId("tableBc").getSelectedIndices();
			if(indexBc.length <= 0){
				messages.showText("请选择目标");
				oController.setBusy(false);
				return;
			}
			for(var i = 0 ; i<indexBc.length ; i++){
				var j = indexBc[i];
				localData.HeadDeepSet.np_2WaveRel[i] = selectBc[j];
			}
			oData_Model.create('/WaveHeadSet', localData.HeadDeepSet, null, function(oData, response) {
				if(oData.np_2Return){
					localData.btSet = oData.np_2Return.results;
					oController._JSONModel.setData(localData);
				}
//				刷新结果和波次行项目
				oController.Query(oEvent);
				oController.onOpen(oEvent);
				
			},function(oError) {
				messages.showText("系统服务异常");
				oController.setBusy(false);
				return;
			});
			this._JSONModel.setData(localData);
			var numNo = localData.btSet.length;
			if(numNo>0){
				this.onload(oEvent); //  消息展示处理
				oController.setBusy(false);
			}else{
				messages.showText("操作成功");
				oController.setBusy(false);
				this.getView().byId("tableBc").setSelectedIndex(-1);
				this.getView().byId("tbItem").setSelectedIndex(-1);
			}
			this.byId("Msg").setText(numNo);
			this._JSONModel.setData(localData);
		},
		
//		link Open
		handelOpen : function(evt){
			var oController = this;
			var localData = this._JSONModel.getData();
			var context = evt.getSource().getBindingContext();
			var item = context.getProperty(context.sPath);
			var waveVal = item.Wave;
			var oData_Model = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEWM_WAVE_SRV/",{
				useBatch : false,
				json : true,
			});
			var oFilter_Wave = new sap.ui.model.Filter("Wave", sap.ui.model.FilterOperator.EQ,waveVal);
			localData.bcHeadSet[0] =  {
					Wave : item.Wave,
			}
			var aFilter = [oFilter_Wave];
			oData_Model.read("/WaveDetailSet",  {
				  filters : aFilter,
				  success : function(oData, response) {
						localData.WaveDeatilSet  = oData.results;
						localData.appProperties.nextmaxNumber = oData.results.length;
						oController._JSONModel.setData(localData);
				  },error : function(oError) {
						messages.showText("服务异常");	
						return;
				  } 
			 });
			
		},
//		获取波次详情
		onOpen : function(evt){
			var oController = this;
			oController.setBusy(true);
			var localData = this._JSONModel.getData();
			var oData_Model = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEWM_WAVE_SRV/",{
				useBatch : false,
				json : true,
				defaultCountMode : "None",
				disableSoftStateHeader : true,
			});
			var aFilter = [];
			var indexArr = this.byId("tbItem").getSelectedIndices();
			var aIndices = this.byId("tbItem").mBindingInfos.rows.binding.aIndices;
			if(indexArr.length == 0){ //判断是否选择了行项目 打开波次 还是拆分后的刷新  =0 是刷新
				if(localData.bcHeadSet.length == 0){
					messages.showText("请选择目标");
					return;
				}else{
//					判断是不是拆分后的刷新，不等于0  是刷新 跳过该步骤
					var selectArr = this.byId("tbItem").getBinding().oList;
					for (var i = 0; i < indexArr.length; i++) {
						var j = indexArr[i];
						var k = aIndices[j];
						localData.bcHeadSet[i] ={
								Wave : selectArr[k].Wave,
						}
					}
				}
			}else{
//				勾选行项目的
				localData.bcHeadSet = [];
				var selectArr = this.byId("tbItem").getBinding().oList;
				for (var i = 0; i < indexArr.length; i++) {
					var j = indexArr[i];
					var k = aIndices[j];
					localData.bcHeadSet[i] ={
						Wave : selectArr[k].Wave,
					}
				}
			}
			localData.FreePostSet.np_2WavePost =  localData.bcHeadSet;
			this._JSONModel.setData(localData);
			oData_Model.create('/WavePostSet', localData.FreePostSet,{
				success : function(oData,response){
					localData.WaveDeatilSet  = oData.np_2WavePost.results;
					localData.appProperties.nextmaxNumber = oData.np_2WavePost.results.length;
					oController._JSONModel.setData(localData);
					oController.setBusy(false);
				},error : function(oError){
					messages.showText("系统服务异常");
					oController.setBusy(false);
					return;
				},

			});
		},
		
////		获取波次详情
//		onOpen : function(evt){
//			var oController = this;
//			var localData = this._JSONModel.getData();
//			var oData_Model = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEWM_WAVE_SRV/",{
//				useBatch : false,
//				json : true,
//				defaultCountMode : "None",
//				disableSoftStateHeader : true,
//			});
//			var aFilter = [];
//			var indexArr = this.byId("tbItem").getSelectedIndices();
//			var aIndices = this.byId("tbItem").mBindingInfos.rows.binding.aIndices;
//			if(indexArr.length == 0){ //判断是否选择了行项目 打开波次 还是拆分后的刷新  =0 是刷新
//				if(localData.bcHeadSet.length == 0){
//					messages.showText("请选择目标");
//					return;
//				}else{
////					判断是不是拆分后的刷新，不等于0  是刷新 跳过该步骤
//					var selectArr = this.byId("tbItem").getBinding().oList;
//					for (var i = 0; i < indexArr.length; i++) {
//						var j = indexArr[i];
//						var k = aIndices[j];
//						localData.bcHeadSet[i] ={
//								Wave : selectArr[k].Wave,
//						}
//					}
//				}
//			}else{
////				勾选行项目的
//				localData.bcHeadSet = [];
//				var selectArr = this.byId("tbItem").getBinding().oList;
//				for (var i = 0; i < indexArr.length; i++) {
//					var j = indexArr[i];
//					var k = aIndices[j];
//					localData.bcHeadSet[i] ={
//						Wave : selectArr[k].Wave,
//					}
//				}
//			}
//			for(var i = 0; i < localData.bcHeadSet.length; i++){
//				var wave = localData.bcHeadSet[i].Wave;
//				var oFilter_wave = new sap.ui.model.Filter("Wave", sap.ui.model.FilterOperator.EQ,wave);
//				aFilter.push(oFilter_wave);
//			}
////			var oList = oData_Model.bindList("/WaveDetailSet", null, null, aFilter, null);
////			oData_Model.read(oList.sPath + "?" + oList.sFilterParams, null, null, false, function(oData, response) {
////				localData.WaveDeatilSet  = oData.results;
////				oController._JSONModel.setData(localData);
////			}, function(oError) {
////				messages.showText("服务异常");	
////				return;
////			});
//			oData_Model.read("/WaveDetailSet",  {
//				  filters : aFilter,
//				  success : function(oData, response) {
//						localData.WaveDeatilSet  = oData.results;
//						localData.appProperties.nextmaxNumber = oData.results.length;
//						oController._JSONModel.setData(localData);
//				  },error : function(oError) {
//						messages.showText("服务异常");	
//						return;
//				  } 
//			 });
//			
//			this._JSONModel.setData(localData);
//		},
		
//		预补货
		onAdd : function(oEvent){
			var oController = this;
			oController.setBusy(true);
			var localData = this._JSONModel.getData();
			var oData_Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEWM_WAVE_SRV/",true);
			var selectArr = this.byId("tbItem").getBinding().oList;
			var indexArr = this.byId("tbItem").getSelectedIndices();
			var aIndices = this.byId("tbItem").mBindingInfos.rows.binding.aIndices;
			var k = aIndices[j];
			if(indexArr.length == 0){
				messages.showText("请选择目标");
				oController.setBusy(false);
				return;
			}
			localData.btSet = [];//接受消息结构清空
			var arryData = [];
			for(var i = 0; i < indexArr.length; i++){
				var j = indexArr[i];
				var k = aIndices[j];
				localData.enterSet ={
						Wave : selectArr[k].Wave,
						Action : "BH",
						ToReturn : []
				},
				oData_Model.create('/WaveRelSet', localData.enterSet,{
					success : function(oData,response){
						if(oData.ToReturn){
							var Arr = oData.ToReturn.results;
							for(var i = 0; i<Arr.length; i++){
								localData.btSet.push(Arr[i]);
							}
						}
						oController._JSONModel.setData(localData);
					},
					error : function(oError){
						messages.showText("系统服务异常");
						oController.setBusy(false);
						return;
					},
					bRefreshAfterChange : true,
					batchRequestCompleted : function(){
						oController.onload(oEvent); //  消息展示处理
					}
				});
			}
			this._JSONModel.setData(localData);
			var numNo = localData.btSet.length;
			this.byId("Msg").setText(numNo);
			if(numNo>0){
				this.onload(oEvent); //  消息展示处理
				oController.setBusy(false);
			}else{
				messages.showText("操作成功");
				oController.setBusy(false);
				this.getView().byId("tbItem").setSelectedIndex(-1);
			}
			this._JSONModel.setData(localData);
			
		},
		
//		加急
		onUrgent : function(oEvent){
			var oController = this;
			oController.setBusy(true);
			var localData = this._JSONModel.getData();
			var oData_Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEWM_WAVE_SRV/",true);
			var selectArr = this.byId("tbItem").getBinding().oList;
			var indexArr = this.byId("tbItem").getSelectedIndices();
			var aIndices = this.byId("tbItem").mBindingInfos.rows.binding.aIndices;
			var k = aIndices[j];
			if(indexArr.length == 0){
				messages.showText("请选择目标");
				oController.setBusy(false);
				return;
			}
			localData.btSet = [];//接受消息结构清空
			for(var i = 0; i < indexArr.length; i++){
				var j = indexArr[i];
				var k = aIndices[j];
//				Obj.Wave = selectArr[j].Wave;
				localData.enterSet ={
						Wave : selectArr[k].Wave,
						Action : "AJ",
						ToReturn : []
				},
				oData_Model.create('/WaveRelSet', localData.enterSet,{
					success : function(oData,response){
						if(oData.ToReturn){
							var Arr = oData.ToReturn.results;
							for(var i = 0; i<Arr.length; i++){
								localData.btSet.push(Arr[i]);
							}
						}
						oController._JSONModel.setData(localData);
					},
					error : function(oError){
						messages.showText("系统服务异常");
						oController.setBusy(false);
						return;
					},
					bRefreshAfterChange : true,
					batchRequestCompleted : function(){
						oController.onload(oEvent); //  消息展示处理
					}
				});
			}
			this._JSONModel.setData(localData);
			var numNo = localData.btSet.length;
			this.byId("Msg").setText(numNo);
			if(numNo>0){
				this.onload(oEvent); //  消息展示处理
				oController.setBusy(false);
			}else{
				messages.showText("操作成功");
				oController.setBusy(false);
				this.onGet(oEvent);// 调用释放
				this.Query(oEvent);// 获取最新的结果
				this.getView().byId("tbItem").setSelectedIndex(-1);   // 清除选中的行目标
			}
			
			this._JSONModel.setData(localData);
			
		},
		
//		消息处理
		onload : function(oEvent){
			var localData = this._JSONModel.getData();
			var val = localData.btSet;
			if(val.length <= 0){
				messages.showText("无消息");
				return;
			}
			localData.oModel = [];
			var aMockMessages = [];
			var typeVal ="";
			var Res = "";
			var color = "";
			for(var i = 0; i < val.length; i++){
				if(val[i].Type =="S"){
					typeVal ="成功";
					Res = "sap-icon://message-success";
					color = "green";
				}
				if(val[i].Type =="E"){
					typeVal ="错误";
					Res = "sap-icon://error";
					color = "red";
				}
				if(val[i].Type =="W"){
					typeVal ="警告";
					Res = "sap-icon://message-warning";
					color = "yellow";
				}
				if(val[i].Type =="I"){
					typeVal ="信息";
					Res = "sap-icon://message-information";
					color = "gray";
				}
				if(val[i].Type =="A"){
					typeVal ="中断";
					Res = "sap-icon://question-mark";
					color = "blue";
				}
				
				aMockMessages[i] = {
					color : color,	
					res : Res,
					type : typeVal,
					title : val[i].Wave,
					description : val[i].Message,
					
				}
				typeVal = "";
				Res ="";
				color ="";
			}
			
			localData.oModel = aMockMessages ;
			this._JSONModel.setData(localData);
			this.setbcode("BC");
			var fcode = this.getfcode(oEvent);
			this.setfcode(fcode);
			this._JSONModel.setProperty("/appProperties/title","消息展示");
			if (!this._oSubControllerForPost) {
				this._oSubControllerForPost = new queryCondtionDialog(this.getView());
			}
			this._oSubControllerForPost.openDialog(oEvent);
		},
		

		Query : function(evt){
			var oController = this;
			this.setBusy(true);
			var localData = this._JSONModel.getData();
			var oData_Model = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEWM_WAVE_SRV/",{
				useBatch : false,
				json : true,
			});
			var Lgnum  = this._JSONModel.getProperty("/LgnumSet/Lgnum");
			var Status = this._JSONModel.getProperty("/HeadSet/Status");
			var Workday = this._JSONModel.getProperty("/HeadSet/Workday");
			var Wave = this._JSONModel.getProperty("/HeadSet/Wave");
			var CreateStart = this._JSONModel.getProperty("/HeadSet/CreateStart");
			var CreateEnd = this._JSONModel.getProperty("/HeadSet/CreateEnd");
			var ReleasedBy = this._JSONModel.getProperty("/HeadSet/ReleasedBy");
			var Urgent = this._JSONModel.getProperty("/HeadSet/Urgent");
			var PartnerName = this._JSONModel.getProperty("/HeadSet/PartnerName");
			var Salername = this._JSONModel.getProperty("/HeadSet/Salername");
			var Coldchain = this._JSONModel.getProperty("/HeadSet/Coldchain");
			var Urgentlogo = this._JSONModel.getProperty("/HeadSet/Urgentlogo");
			
			var oFilter_Lgnum = new sap.ui.model.Filter("Lgnum", sap.ui.model.FilterOperator.EQ,Lgnum);
			var oFilter_Status = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ,Status);
			var oFilter_Workday = new sap.ui.model.Filter("Workday", sap.ui.model.FilterOperator.EQ,Workday);
			var oFilter_Wave = new sap.ui.model.Filter("Wave", sap.ui.model.FilterOperator.EQ,Wave);
			var oFilter_CreateStart = new sap.ui.model.Filter("CreateStart", sap.ui.model.FilterOperator.EQ,CreateStart);
			var oFilter_CreateEnd = new sap.ui.model.Filter("CreateEnd", sap.ui.model.FilterOperator.EQ,CreateEnd);
			var oFilter_ReleasedBy = new sap.ui.model.Filter("ReleasedBy", sap.ui.model.FilterOperator.EQ,ReleasedBy);
			var oFilter_Urgent = new sap.ui.model.Filter("Urgent", sap.ui.model.FilterOperator.EQ,Urgent);
			var oFilter_PartnerName = new sap.ui.model.Filter("PartnerName", sap.ui.model.FilterOperator.EQ,PartnerName);
			var oFilter_Salername = new sap.ui.model.Filter("Salername", sap.ui.model.FilterOperator.EQ,Salername);
			var oFilter_Coldchain = new sap.ui.model.Filter("Coldchain", sap.ui.model.FilterOperator.EQ,Coldchain);
			
			var aFilter = [
				oFilter_Lgnum,
				oFilter_Status,
				oFilter_Workday,
				oFilter_Wave,
				oFilter_CreateStart,
				oFilter_CreateEnd,
				oFilter_ReleasedBy,
				oFilter_PartnerName,
				oFilter_Urgent,
				oFilter_Coldchain,
				oFilter_Salername,
			];
			
			if(Urgentlogo !== "A"){
				var oFilter_Urgentlogo = new sap.ui.model.Filter("Urgentlogo", sap.ui.model.FilterOperator.EQ,Urgentlogo);
				aFilter.push(oFilter_Urgentlogo);
			}
			
//			物料 传送多条值的字段处理
			if(localData.matnrSet.length > 0){
				for(var i = 0; i < localData.matnrSet.length; i++){
					var matnr = localData.matnrSet[i].Matnr;
					var oFilter_Matnr = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ,matnr);
					aFilter.push(oFilter_Matnr);
				}
			}else{
				var oFilter_Matnr = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ,"");
				aFilter.push(oFilter_Matnr);
			}
//			类别
			if(localData.keySet.length > 0){
				for(var i = 0; i < localData.keySet.length; i++){
					var Lgbkz = localData.keySet[i].Lgbkz;
					var oFilter_Lgbkz = new sap.ui.model.Filter("Lgbkz", sap.ui.model.FilterOperator.EQ,Lgbkz);
					aFilter.push(oFilter_Lgbkz);
				}
			}else{
				var oFilter_Lgbkz = new sap.ui.model.Filter("Lgbkz", sap.ui.model.FilterOperator.EQ,"");
				aFilter.push(oFilter_Lgbkz);
			}
//			工作日
			if(localData.daySet.length > 0){
				for(var i = 0; i < localData.daySet.length; i++){
					var Weekday = localData.daySet[i].Weekday;
					var oFilter_Weekday = new sap.ui.model.Filter("Weekday", sap.ui.model.FilterOperator.EQ,Weekday);
					aFilter.push(oFilter_Weekday);
				}
			}else{
				var oFilter_Weekday = new sap.ui.model.Filter("Weekday", sap.ui.model.FilterOperator.EQ,"");
				aFilter.push(oFilter_Weekday);
			}
//			线路
			if(localData.RouteIdSet.length > 0){
				for(var i = 0; i < localData.RouteIdSet.length; i++){
					var RouteId = localData.RouteIdSet[i].RouteId;
					var oFilter_RouteId = new sap.ui.model.Filter("RouteId", sap.ui.model.FilterOperator.EQ,RouteId);
					aFilter.push(oFilter_RouteId);
				}
			}else{
				var oFilter_RouteId = new sap.ui.model.Filter("RouteId", sap.ui.model.FilterOperator.EQ,"");
				aFilter.push(oFilter_RouteId);
			}
			
			oData_Model.read("/WaveHeadSet",  {
				  filters : aFilter,
				  success : function(oData, response) {
						localData.WaveHeadSet  = oData.results;
						oController._JSONModel.setData(localData);
						oController.setBusy(false);
				  },error : function(oError) {
						messages.showText("服务异常");	
						oController.setBusy(false);
						return;
				  } 
			 });
		},

		
		// 响应成功后的回调函数
		onPostSuccess : function(oContext) {
			oContext.getEventBus().publish("ZTM", "postSuccess", oContext);	
		},
		
	// 响应失败后的回调函数
		onPostError : function(oContext) {
			oContext.getEventBus().publish("ZTM", "postError", oContext);
		},
		
		confirmAction : function(sText,sTitle,oContext){
			MessageBox.confirm(sText,{
				title : sTitle,
				icon : MessageBox.Icon.WARNING,
				actions : [
					MessageBox.Action.YES, MessageBox.Action.NO
				],
				styleClass : designMode.getCompactCozyClass(),
				onClose : function(sResult) {
					
				}
			})
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