//搜索帮助控制器
sap.ui.define([
		"./BaseController",
		"sap/ui/base/Object",
		"ZTM/controller/messages",
		'sap/ui/core/Fragment',
		'sap/ui/model/Filter',
		"sap/ui/Device",
		"./designMode",
		'sap/m/Token',
		"ZTM/model/poster",
		"ZTM/model/formatter"
], function(BaseController,Object, messages, Fragment, Filter, Device, designMode, Token, poster, formatter) {
	"use strict";
	return Object.extend("ZTM.controller.queryCondtionDialog", {
		
//		生成对象
		
		formatter : formatter,
		constructor : function(oParentView) {
			this._oParentView = oParentView;
			this._oViewModel = this._oParentView.getModel();
			this._oController = this._oParentView.getController();
			this._ResourceBundle = this._oParentView.getModel("i18n").getResourceBundle();
		},
		
//		打开搜索帮助弹窗
		openDialog : function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this._oParentView.getId(), "ZTM.view.queryCondtionDialog", this);
				designMode.syncStyleClass(this._oParentView, this._oDialog);
				this._oParentView.addDependent(this._oDialog);
			}
			this._oDialog.open();
			
//			手动填写生成一个token start
			var oMultiInput3 = this._oParentView.byId("multiInput4");
			var fValidator = function(args){
				window.setTimeout(function(){
					args.asyncCallback(new Token({text: args.text}));
				},200);
				return sap.m.MultiInput.WaitForAsyncValidation;
			};
			oMultiInput3.addValidator(fValidator);
//			手动填写生成一个token end
		},
		
		
		/* 手动填写搜索功能,Input search功能 */
		onSearch : function(evt){
			var aFilters = [];
			var query = evt.getSource().getValue();
			var queryId = evt.getParameter("id");
			queryId = queryId.split("--")[1];
			var QueryValue = queryId.split("-");
			if(query && query.length > 0){
				var afilter = [];
				for(var i=0;i<QueryValue.length;i++){
					afilter.push(new Filter(QueryValue[i], sap.ui.model.FilterOperator.Contains, query));				
				}
				var allFilters = new Filter(afilter, false);// false为并集
				aFilters.push(allFilters);
			}
			var TabId = QueryValue[0] + "Table";
			var binding = this._oParentView.byId(TabId).getBinding("items");
			binding.filter(aFilters);
		},
		
//		手动填写的搜索帮助功能
		handleSearch : function(evt){
			var aFilters = [];
			var query = evt.getSource().getValue();
			var queryId = evt.getParameter("id");
			queryId = queryId.split("--")[1];
			var QueryValue = queryId.split("_");
			if(query && query.length > 0){
				var afilter = [];
				for(var i=0;i<QueryValue.length;i++){
					afilter.push(new Filter(QueryValue[i], sap.ui.model.FilterOperator.Contains, query));				
				}
				var allFilters = new Filter(afilter, false);// false为并集
				aFilters.push(allFilters);
			}
			var TabId = QueryValue[0] + "Tab";
			var binding = this._oParentView.byId(TabId).getBinding("items");
			binding.filter(aFilters);
		},
		
//		物料 多选完成后触发
		handleSelectLA : function(evt){
			var localData = this._oViewModel.getData();
			var items = {
					Matnr : "",
				}
			var addToken =evt.getParameters().addedTokens; //获取增加
			var removedTokens = evt.getParameters().removedTokens; //获取删除的
//			add to Arr
			if(addToken.length > 0){
				items = {Matnr : addToken[0].mProperties.text,}
				localData.matnrSet.push(items);
				this._oParentView.getController()._JSONModel.setData(localData);
			}
//			remove from Arr
			if(removedTokens.length > 0){
				var removeKey = removedTokens[0].mProperties.text
				for(var i = 0 ; i < localData.matnrSet.length ; i++){
					if( localData.matnrSet[i].Matnr == removeKey){
						localData.matnrSet.splice(i , 1); 
					}
				}
				this._oParentView.getController()._JSONModel.setData(localData);
			}
			
		},
//		类别 多选完成后触发
		handleSelectLB : function(evt){
			var localData = this._oViewModel.getData();
			localData.keySet = [];
			var selectedItems = evt.getParameter("selectedItems");
			for (var i = 0; i < selectedItems.length; i++) {
				localData.keySet[i] = {
						Lgbkz : selectedItems[i].mProperties.key,
				}
			}
			this._oParentView.getController()._JSONModel.setData(localData);

		},
		handleSelectLC : function(evt){  //线路
			var localData = this._oViewModel.getData();
			localData.RouteIdSet = [];
			var selectedItems = evt.getParameter("selectedItems");
			for (var i = 0; i < selectedItems.length; i++) {
				localData.RouteIdSet[i] = {
						RouteId : selectedItems[i].mProperties.key,
				}
			}
			this._oParentView.getController()._JSONModel.setData(localData);

		},
//		工作日多选触发事件
		handleSelectDay : function(evt){
			var localData = this._oViewModel.getData();
			localData.daySet = [];
			var selectedItems = evt.getParameter("selectedItems");
			if(selectedItems.length == 0){
				return;
			}
			for (var i = 0; i < selectedItems.length; i++) {
				localData.daySet[i] = {
						Weekday : selectedItems[i].mProperties.key,
				}
			}
			this._oParentView.getController()._JSONModel.setData(localData);

		},
		
		
//		  帮助的可见性控制
//		仓库
		setFC1Visible : function(f) {
			if(f == "lgnum" )  {  
				return true;
			}
			return false;
		},
		
		// 查询
		setFC2Visible : function(f) {
			if(f == "query" )  {  
				return true;
			}
			return false;
		},
		setFC3Visible : function(f) {
			if(f == "lgbkzSH" )  {  
				return true;
			}
			return false;
		},
		
//		展示消息panel
		setRun1Visible : function(f) {
			if(f == "Msg" || f == "get" || f == "split" || f == "add" || f == "urgent")  {  
				return true;
			}
			return false;
		},
//		隐藏执行按钮
		 setBtVisible : function(f) {
			if(f == "Msg" || f == "get" || f == "split" || f == "add" || f == "urgent" || f == "lgbkzSH")  {  
				return false;
			}
			return true;
		},
		pressItem : function(evt){
			this._oDialog.close();
			var fcode = this._oViewModel.getProperty("/appProperties/fcode");
			var context = evt.getSource().getBindingContext();
			var item = context.getProperty(context.sPath);
			var sText = "" ;
			if(fcode == "workType"){
				if(item.Type) {	
					this._oViewModel.setProperty("/tkhSet/Gzplx",item.Type,false);
					this._oViewModel.setProperty("/describe/Gtext",item.Typtxt,false);
				}
			}
			if (fcode == "Relty") {
				if (item.Werks) {
					this._oViewModel.setProperty("/yxSet/Gzplx", item.Type, false);
				}
				var localData = this._oViewModel.getData();
				var scode = localData.TrappProperties.fcode;
				// 返回 新建/打开弹框
				this._oController.setfcode(scode);
				this._oController.setlocalfcode(scode);
				// 确定按钮的显现
				this.openDialog();
			}
			
		},
		
		// dialog行项目点击赋值事件
		pressEvent : function(evt){
			this._oDialog.close();
			var fcode = this._oViewModel.getProperty("/appProperties/fcode");
			var context = evt.getSource().getBindingContext();
			var item = context.getProperty(context.sPath);
			var sText = "" ;
			
//			点击选中的值并赋值给字段
			
			// 工作票报表
			if(fcode == "begfactory"){
					if(item.Werks) {	
						this._oViewModel.setProperty("/tkhSet/Werks",item.Werks,false);
						this._oViewModel.setProperty("/describe/Ztext",item.Name1,false);
						this._oViewModel.setProperty("/tkhSet/Bumms","",false);

					}
			}else if(fcode == "workType"){
				if(item.Type) {	
					this._oViewModel.setProperty("/tkhSet/Gzplx",item.Type,false);
					this._oViewModel.setProperty("/describe/Gtext",item.Typtxt,false);
				}
			}
			
			
		},

		
	// dialog中再打开dialog，通过fcode与scode转换控制dialog的显示
		handleOperation : function(oEvent) {
			var scode = this.getscode(oEvent);
			var fcode = this._oViewModel.getProperty("/appProperties/fcode");
			// 预处理fcode事件
			this.preHandleFcode(scode);
			// fcode 赋值给 scode ,scode 赋值给 fcode
			this._oViewModel.setProperty("/appProperties/scode", fcode, false);
			this._oViewModel.setProperty("/appProperties/fcode", scode, false);
			// 当前dialog关闭
			this._oDialog.close();
			// 弹出scode(此时转为了fcode)对应的弹窗
			this.openDialog();
		},
		
		
	// 预处理fcode事件
		preHandleFcode : function(scode) {
			var aFilter = [];
			var lgnum = this._oViewModel.getProperty("/LgnumSet/Lgnum");
			if (scode == "lgbkzSH") {
				if (lgnum) {
					aFilter.push(new Filter("Lgnum", "EQ", lgnum));
					poster.callSearchHelp("ZshLgbkz", this._oController, aFilter);
				}
			}
		},
		
	// 搜素幫助的点击事件
		handleListItem : function(evt) {
			var oController = this._oParentView.getController();
			var localData = this._oViewModel.getData();
			var scode = localData.appProperties.scode;
			var fcode = localData.appProperties.fcode;
			var context = evt.getSource().getBindingContext();
			var item = context.getProperty(context.sPath);
			this._oDialog.close();
			if (fcode == "lgbkzSH") {
				if (item.Lgbkz) {
					localData.HeadSet.Lgbkz = item.Lgbkz;
					oController._JSONModel.setData(localData);
//					this._oParentView.setProperty("/HeadSet/Lgbkz", item.Lgbkz, false);
				}
			}
			// 返回 新建/打开弹框
			oController.setfcode(scode);
			// 确定按钮的显现
			this.openDialog();
		},
		
	// 获取scode
		getscode : function(oEvent) {
			var sButId = oEvent.getParameter("id");
			var aButId = sButId.split("-");
			var iLast = parseInt(aButId.length) - 1;
			var sOP = aButId[iLast].replace("ipt", "");
			return sOP;
		},
		
//	点击确定和取消时关闭弹窗
		onComnutAction : function(evt){
			var oController = this;
			var localData = this._oViewModel.getData();
			if(localData.TrappProperties){
				var scode = localData.TrappProperties.fcode;
			}
			var fcode = this._oViewModel.getProperty("/appProperties/fcode");
			if (fcode == "Relty") {
				this._oController.setfcode(scode);
				this._oDialog.close();
				this.openDialog();
			} else {
				this._oDialog.close();
			}	
			
			// 实行查询功能
			var  fcode = this._oViewModel.getProperty("/appProperties/fcode");
			if(fcode == "query"){
				this.handleQuery(evt);
			}
//			设置仓库
			if(fcode == "lgnum"){
				var lgnum = this._oViewModel.getProperty("/LgnumSet/Lgnum");
				var oData_Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEWM_DEFAULT_PARA_SRV/",true);
				var url = "/DefaultWhse?Action='SET'&Lgnum=\'" + lgnum +  "\'&Tcode='ZWAVELG'"; 
				oData_Model.read(url, null, null, false, function(oData, response) {
					var status = response.statusCode;
					if(status == "200"){
						messages.showText("更新成功");
						oController._oViewModel.setProperty("/HeadSet/Lgnum",lgnum,false);
						window.location.reload();//刷新当前页面
					}
				}, function(oError) {
					messages.showText("服务异常");	
				});
			}
			
		},
		
		handleQuery : function(evt){
			var Contro = this._oParentView;
			Contro.setBusy(true);
			var localData = this._oViewModel.getData();
			var oData_Model = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEWM_WAVE_SRV/",{
				useBatch : false,
				json : true,
			});
			var Lgnum  = this._oViewModel.getProperty("/LgnumSet/Lgnum");
			var Status = this._oViewModel.getProperty("/HeadSet/Status");
//			var RouteId = this._oViewModel.getProperty("/HeadSet/RouteId");
			var Wave = this._oViewModel.getProperty("/HeadSet/Wave");
			var CreateStart = this._oViewModel.getProperty("/HeadSet/CreateStart");
			var CreateEnd = this._oViewModel.getProperty("/HeadSet/CreateEnd");
			var ReleasedBy = this._oViewModel.getProperty("/HeadSet/ReleasedBy");
			var Urgent = this._oViewModel.getProperty("/HeadSet/Urgent");
			var PartnerName = this._oViewModel.getProperty("/HeadSet/PartnerName");
			var Salername = this._oViewModel.getProperty("/HeadSet/Salername");
			var Coldchain = this._oViewModel.getProperty("/HeadSet/Coldchain");
			var Urgentlogo = this._oViewModel.getProperty("/HeadSet/Urgentlogo");
			
			var oFilter_Lgnum = new sap.ui.model.Filter("Lgnum", sap.ui.model.FilterOperator.EQ,Lgnum);
			var oFilter_Status = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ,Status);
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
			
			oData_Model.read("/WaveHeadSet",  {
				  filters : aFilter,
				  success : function(oData, response) {
					    Contro.setBusy(false);
						localData.WaveHeadSet  = oData.results;
						if(oData.results.length == 0){
							messages.showText("查询结果为空");	
						}
						localData.WaveDeatilSet = [];
						localData.btSet = [];
						localData.appProperties.maxNumber = oData.results.length;
						Contro.byId("Msg").setText("0");
						Contro.getController()._JSONModel.setData(localData);
						Contro.byId("tbItem").setSelectedIndex(-1);   // 清除选中的行目标
				  },error : function(oError) {
					    Contro.setBusy(false);
						messages.showText("服务异常");	
						return;
				  } 
			 });
			
		},
		
		onCancelAction : function() {
			var localData = this._oViewModel.getData();
			if(localData.TrappProperties){
				var scode = localData.TrappProperties.fcode;
			}
			var fcode = this._oViewModel.getProperty("/appProperties/fcode");
			if (fcode == "Relty") {
				this._oController.setfcode(scode);
				this._oDialog.close();
				this.openDialog();
			} else {
				this._oDialog.close();
			}
		}
		
		
		});
});