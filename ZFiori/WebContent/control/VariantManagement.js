sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/comp/variants/VariantManagement",
	"sap/ui/comp/variants/VariantItem",
	"sap/ui/layout/HorizontalLayout",
	"sap/ui/model/json/JSONModel",
	'sap/m/ButtonType'
], function(Control, VariantManagement, VariantItem, HorizontalLayout, JSONModel, ButtonType) {
	var myVariantManagement = Control.extend("sap.vco.VariantManagement", {

		metadata: {
			properties: {
				width: {
					type: 'sap.ui.core.CSSSize',
					defaultValue: 'auto'
				},
				height: {
					type: 'sap.ui.core.CSSSize',
					defaultValue: 'auto'
				},
				item: {
					type: 'object',
					defaultValue: []
				},
				defaultKey: {
					type: 'string',
					defaultValue: '*standard*'
				},
				user: {
					type: 'string'
				},
				textManage: {
					type: 'string'
				},
				textSave: {
					type: 'string'
				},
				textCreate: {
					type: 'string'
				},
				customStyle: {
					type: 'boolean',
					defaultValue: false
				}
			},
			events: {
				select: {},
				manage: {},
				save: {},
				create: {},
				initDefault: {}
			}
		},

		renderer: function(oRm, oControl) {
			oRm.write("<div style='width:" + oControl.getWidth() + "; height:" + oControl.getHeight() + "'");
			oRm.writeControlData(oControl);
			oRm.addClass("VariantManagementContainer");
			oRm.writeClasses();
			oRm.write('>');
			oRm.renderControl(oControl._oVariantLayout);
			oRm.write("</div>");
		}
	});

	myVariantManagement.prototype.init = function() {
		this._firstLoad = true;
		this._variantManagement = null;
		this._oVariantLayout = null;
		this._manageButton = null;
		this._saveButton = null;
		this._oriSaveButton = null;
		this._createButton = null;
		this._oriItem = null;
		this._item = [];
		this._itemMap = {};
		this._currentVariant = {};
	};
	myVariantManagement.prototype.onBeforeRendering = function() {
		if(this._firstLoad) {
			this._firstLoad = false;
		}
		else {
			return;
		}
		this._variantManagement = new VariantManagement(this.getId() + "-variantmanagement", {
			showShare: true
		});
		this._manageButton = new sap.m.Button(this.getId() + "-managebutton", {
			type: ButtonType.Transparent,
			icon: "sap-icon://action-settings",
			tooltip: this.getTextManage(),
			visible: this.getCustomStyle()
		});
		this._saveButton = new sap.m.Button(this.getId() + "-savebutton", {
			type: ButtonType.Transparent,
			icon: "sap-icon://save",
			tooltip: this.getTextSave(),
			enabled: false,
			visible: this.getCustomStyle()
		});
		this._createButton = new sap.m.Button(this.getId() + "-saveasbutton", {
			type: ButtonType.Transparent,
			icon: "sap-icon://add-document",
			tooltip: this.getTextCreate(),
			visible: this.getCustomStyle()
		});
		this._oriItem = this.getItem();
		if (this._oriItem.length !== 0) {
			this._oriItem.forEach(function(v, i, arr) {
				var aItem = $.extend(true, {}, arr[i]);
				aItem.text = aItem.text || "";
				aItem.key = aItem.key || "";
				aItem.readOnly = !!(aItem.readOnly && true);
				aItem.global = true;
				aItem.author = aItem.author || "";
				aItem.variant = aItem.variant || {};

				if (aItem.readOnly) {
					aItem.accessOptions = "R";
				} else {
					aItem.accessOptions = "RWD";
				}
				if (aItem.text && aItem.key) {
					this._item.push(aItem);
					this._itemMap[aItem.key] = aItem;
					this._variantManagement.insertVariantItem(new VariantItem(aItem));
				}
			}.bind(this));
		}	
		var standardItem = {
			text: this._variantManagement.getStandardItemText(),
			key: this._variantManagement.getStandardVariantKey(),
			readOnly: true,
			global: true,
			author: 'SAP',
			variant: {}
		};
		this._itemMap[standardItem.key] = standardItem;
		
		if(this.getDefaultKey() === '') {
			this.setDefaultKey('*standard*');
		}
		
		this._oVariantLayout = new HorizontalLayout({
			content: [this._variantManagement, this._manageButton, this._saveButton, this._createButton]
		});
		this._bindEvent();
		this._variantManagement.setInitialSelectionKey(this.getDefaultKey());
		var newP = this._makeSelectedParameters(this.getDefaultKey(), 'init');
		this.fireInitDefault(newP);
		this.addDependent(this._oVariantLayout);
	};
	myVariantManagement.prototype._bindEvent = function() {
		var that = this;
		var vmId = that._variantManagement.getId();
		sap.ui.getCore().byId(vmId + "-trigger").attachPress(function() {
			if (that.getCustomStyle()) {
				that._variantManagement.oVariantManage.setVisible(false);
				that._variantManagement.oVariantSave.setVisible(false);
				that._variantManagement.oVariantSaveAs.setVisible(false);
			} else {
				if (!that._oriSaveButton) {
					that._oriSaveButton = sap.ui.getCore().byId(vmId + "-mainsave");
				}
				var key = that._variantManagement.getSelectionKey();
				var readOnly = that._itemMap[key].readOnly;
				if (that._oriSaveButton) {
					that._oriSaveButton.setEnabled(!readOnly);
				}
			}
		});
		var fireOpenSelection = function() {
			sap.ui.getCore().byId(vmId + "-trigger").firePress();
			sap.ui.getCore().byId(vmId + '-popover-popover').setVisible(false);
		};
		var fManagePress = function() {
			fireOpenSelection();
			sap.ui.getCore().byId(vmId + "-manage").firePress();
			sap.ui.getCore().byId(vmId + '-popover-popover').setVisible(true);
		};
		var fCreatePress = function() {
			fireOpenSelection();
			sap.ui.getCore().byId(vmId + "-saveas").firePress();
			sap.ui.getCore().byId(vmId + '-popover-popover').setVisible(true);
		};
		this._manageButton.attachPress(fManagePress);
		this._createButton.attachPress(fCreatePress);
		this._saveButton.attachPress(function() {
			var data = {};
			data.key = that._variantManagement.getSelectionKey();
			data.user = that.getUser();
			data.variant = JSON.stringify(that._currentVariant);
			var newP = {};
			newP.type = "update";
			newP.data = data;
			that.fireSave(newP);
			that._itemMap[data.key].variant = $.extend(true, {}, that._currentVariant);
			that._variantManagement.oVariantModifiedText.setVisible(false);
		});

		this._variantManagement.attachSelect(function(oEvent) {
			var parameters = oEvent.getParameters();
			var key = parameters.key;
			var newP = that._makeSelectedParameters(key, 'select');
			that.fireSelect(newP);
		});
		this._variantManagement.attachManage(function(oEvent) {
			var parameters = oEvent.getParameters();
			var data = {};
			data.def = parameters.def;
			data.deleted = parameters.deleted;
			data.renamed = parameters.renamed;
			var newP = {};
			newP.type = "manage";
			newP.data = data;
			that.fireManage(newP);
		});
		this._variantManagement.attachSave(function(oEvent) {
			var parameters = oEvent.getParameters();
			var overwrite = parameters.overwrite;
			var data = {};
			data.key = parameters.key;
			data.user = that.getUser();
			data.variant = JSON.stringify(that._currentVariant);
			// new create
			if (!overwrite) {
				data.text = parameters.name;
				data.def = parameters.def;
				data.global = parameters.global;
			}
			var newP = {};
			newP.type = "update";
			if (!overwrite) {
				newP.type = "create";
			}
			newP.data = data;
			if (overwrite) {
				that.fireSave(newP);
			} else {
				that.fireCreate(newP);
			}
			that._itemMap[data.key] = {
				text: data.text,
				key: data.key,
				readOnly: false,
				global: data.global,
				author: data.author,
				accessOptions: "RWD",
				variant: that._currentVariant
			};
			that._saveButton.setEnabled(true);
			that._variantManagement.oVariantModifiedText.setVisible(false);
		});
	};

	myVariantManagement.prototype._makeSelectedParameters = function(key, type) {
		this._variantManagement.oVariantModifiedText.setVisible(false);
		var readOnly = this._itemMap[key].readOnly;
		this._saveButton.setEnabled(!readOnly);
		var variant = $.extend(true, {}, this._itemMap[key].variant);
		this._currentVariant = variant;
		var newP = {};
		newP.type = type;
		newP.variant = variant;
		return newP;
	};
	myVariantManagement.prototype.exit = function() {

		if (this._variantManagement) {
			this._variantManagement.destroy();
			this._variantManagement = undefined;
		}
		if (this._oVariantLayout) {
			this._oVariantLayout.destroy();
			this._oVariantLayout = undefined;
		}
		if (this._manageButton) {
			this._manageButton.destroy();
			this._manageButton = undefined;
		}
		if (this._saveButton) {
			this._saveButton.destroy();
			this._saveButton = undefined;
		}
		if (this._createButton) {
			this._createButton.destroy();
			this._createButton = undefined;
		}
		if (this._oriSaveButton) {
			this._oriSaveButton.destroy();
			this._oriSaveButton = undefined;
		}

		delete this._oriItem;
		delete this._item;
		delete this._itemMap;
		delete this._currentVariant;
	};

	myVariantManagement.prototype.setCurrentVariant = function(path, value) {
		var arr = path.split('.');
		var current = null;
		var last = this._currentVariant;
		for (var i = 0, l = arr.length; i < l; i++) {
			var key = arr[i];
			current = last;
			if (i === l - 1) {
				current[key] = value;
			} else if (!current[key]) {
				current[key] = {};
			}
			last = current[key];
		}
		this._variantManagement.oVariantModifiedText.setVisible(true);
	};
	return myVariantManagement;
});