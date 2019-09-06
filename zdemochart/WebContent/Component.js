/* =========================================================== */
/* App 公用组件控制器实现                                      */
/* =========================================================== */
sap.ui.define(["sap/ui/core/UIComponent",
			   "sap/ui/model/resource/ResourceModel",
	   	       "sap/ui/model/odata/v2/ODataModel",
			   "sap/ui/Device",
			   "./controller/messages",
			   "./model/models"
], function(UIComponent, ResourceModel, ODataModel, Device, messages, models) {
	// 严格JS 模式
	"use strict";
	return UIComponent.extend("ZAPI_VIEW.Component", {
		//---元数据
		metadata : { 
			// config : {fullWidth:true},
			manifest:"json"

		},

		//---初始化方法
		init : function() {
	        
	        // 设置设备模型
			this.setModel(models.createDeviceModel(), "device");
			
			// 设置FLP模型
			this.setModel(models.createFLPModel(), "FLP");
        	
        	// 设置FLP模型
			this.setModel(models.createImage(), "imageModel");
			
			// 设置本地模型
			this.setModel(models.createLocalModel());
            
            //---本地资源model路径获取
			//var sRootPath = jQuery.sap.getModulePath("ZTR18_3135_1010");
		    //	this.setModel(models.createResourceModel(sRootPath, mConfig.resourceBundle), "i18n");
			//---页面跳转初始化
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},
		
		// 退出后销毁事件
		destroy : function() {
			this.getModel().destroy();
			this.getModel("i18n").destroy();    // 本地测试注释
			this.getModel("FLP").destroy();     // 本地测试注释
			this.getModel("device").destroy();  // 本地测试注释
			this.getModel("OData").destroy();   // 本地测试注释
			UIComponent.prototype.destroy.apply(this, arguments);
		}
	}); 
});