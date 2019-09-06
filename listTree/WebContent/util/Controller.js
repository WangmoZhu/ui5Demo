sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/format/NumberFormat",
	"sap/ui/core/format/DateFormat"
], function(Controller, UIComponent, NumberFormat, DateFormat) {
	"use strict";

	return Controller.extend("echart.util.Controller", {
		/**
		 * get the event bus of the applciation component
		 * @returns {Object} the event bus
		 */
		getEventBus: function() {
			return sap.ui.getCore().getEventBus();
		},

		/**
		 * get the UIComponent router
		 * @param{Object} this either a view or controller
		 * @returns {Object} the event bus
		 */
		getRouter: function() {
			return UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function() {
			if (sap.ui.getCore().getComponent(window.componentId).getModel("i18n")) {
				return sap.ui.getCore().getComponent(window.componentId).getModel("i18n").getResourceBundle();
			} else {
				return null;
			}
		},

		getI18nText: function(key) {
			var rb = this.getResourceBundle();

			if (rb) {
				return rb.getText(key);
			} else {
				return null;
			}
		},

		getI18nTextReplace1: function(key, replace1) {
			var rb = this.getResourceBundle();

			if (rb) {
				var text = rb.getText(key);
				if (text !== null) {
					var textWithReplacement = text.replace("{0}", replace1);
					return textWithReplacement;
				}
			} else {
				return null;
			}
		},

		getI18nTextReplace2: function(key, replace1, replace2) {
			var rb = this.getResourceBundle();

			if (rb) {
				var text = rb.getText(key);
				if (text !== null) {
					var textWithReplacement = text.replace("{0}", replace1);
					textWithReplacement = textWithReplacement.replace("{1}", replace2);
					return textWithReplacement;
				}
			} else {
				return null;
			}
		},

		getI18nTextReplace3: function(key, replace1, replace2, replace3) {
			var rb = this.getResourceBundle();

			if (rb) {
				var text = rb.getText(key);
				if (text !== null) {
					var textWithReplacement = text.replace("{0}", replace1);
					textWithReplacement = textWithReplacement.replace("{1}", replace2);
					textWithReplacement = textWithReplacement.replace("{2}", replace3);
					return textWithReplacement;
				}
			} else {
				return null;
			}
		},

		getI18nTextReplace4: function(key, replace1, replace2, replace3, replace4) {
			var rb = this.getResourceBundle();

			if (rb) {
				var text = rb.getText(key);
				if (text !== null) {
					var textWithReplacement = text.replace("{0}", replace1);
					textWithReplacement = textWithReplacement.replace("{1}", replace2);
					textWithReplacement = textWithReplacement.replace("{2}", replace3);
					textWithReplacement = textWithReplacement.replace("{3}", replace4);
					return textWithReplacement;
				}
			} else {
				return null;
			}
		},

		navBack: function(route, data) {

			var history = sap.ui.core.routing.History.getInstance();
			var previousHash = history.getPreviousHash();

			// The history contains a previous entry
			if (previousHash !== undefined) {
				window.history.go(-1);
			} else {
				var replace = true; // otherwise we go backwards with a forward history
				this.getRouter().navTo(route, data, replace);
			}
		},

		errorCallBackShowInPopUp: function(oError) {

			if (oError) {
				if (oError.responseText) {
					var errorCode = JSON.parse(oError.responseText).error.code;
					var errorMessage = JSON.parse(oError.responseText).error.message.value;

					if (sap.hybrid) {
						//Log application error
						sap.Logger.error(errorCode + " " + errorMessage);
					}

					sap.m.MessageBox.error(this.getI18nText("Controller-Error-Prefix") + ": " + errorCode + " - " + errorMessage);
				} else {
					if (sap.hybrid) {
						//Log application error
						sap.Logger.error(oError.message);
					}

					sap.m.MessageBox.error(this.getI18nText("Controller-Error-Prefix") + ": " + oError.message);
				}
			}
		},

		errorBatchCallBackShowInPopUp: function(oError) {

			if (oError) {
				if (oError.body) {
					var body, errorCode, errorMessage;

					try {
						body = JSON.parse(oError.body);
						errorCode = body.error.code;
						errorMessage = body.error.message.value;
					} catch (error) {
						errorMessage = oError.body;
					}

					if (sap.hybrid) {
						//Log application error
						sap.Logger.error(errorCode + " " + errorMessage);
					}
					sap.m.MessageBox.error(this.getI18nText("Controller-Error-Prefix") + ": " + errorCode + " - " + errorMessage);
				} else {
					if (sap.hybrid) {
						//Log application error
						sap.Logger.error(oError.message);
					}
					sap.m.MessageBox.error(this.getI18nText("Controller-Error-Prefix") + ": " + oError.message);
				}
			}
		},
		readOnly: function(oContext, oModel) {

			var orderStatus = oModel.getProperty("OrderStatus", oContext);

			if (orderStatus === "COMPLETED" || orderStatus === "INITIAL") {
				return true;

			} else {
				return false;
			}
		},

		//Format float to correct localized format
		formatFloatValue: function(value) {
			var oNumberFormat = NumberFormat.getFloatInstance();
			return oNumberFormat.format(value);
		},

		//Format date to correct localized format
		formatDateValue: function(value) {
			var oDateFormat = DateFormat.getDateInstance();
			return oDateFormat.format(value);
		}
	});
});