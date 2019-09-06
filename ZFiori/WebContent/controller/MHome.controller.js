sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"util/app"
], function (Controller, appUtil) {

	return Controller.extend("sap.vo.mengniu.controller.MHome", {

		_firstLoad:true,
		onBeforeRendering: function () {
			if(this._firstLoad) {
				this._firstLoad = false;
			}
			else {
				return;
			}
			var mapping =appUtil.getAppMapping();
			var appList = appUtil.getAppList();
			var tileContainer = this.byId('tileContainer');

			appList.forEach(function (v) {
				var tile = new sap.m.GenericTile(this.createId(v.id),{
					header: mapping[v.id].title,
					press: this.onNavTo,
					tileContent: new sap.m.TileContent({
						content: new sap.m.ImageContent({
							src:mapping[v.id].icon
						})
					})
				});
				tile.addStyleClass('sapUiSmallMargin');
				tileContainer.addContent(tile);
			}.bind(this));
		},
		
		onNavTo: function(oEvent){
            var appId = oEvent.getSource().getId().split("--")[1];
			var component = sap.ui.getCore().getComponent('__component0')
			var oRouter = component.getRouter();
			oRouter.navTo("mSingle", {
				appId: appId
			});
		}.bind(this)

	});

});