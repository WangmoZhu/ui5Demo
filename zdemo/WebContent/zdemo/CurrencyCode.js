sap.ui.define("nabisoft/bookstore/datatypes/CurrencyCode",
		[ "sap/ui/base/DataType" ], function(DataType) {
			"use strict";

			return DataType.createType(
					"zdemo.CurrencyCode", {
						isValid : function(sValue) {
							return sValue === "EUR" || sValue === "USD";
						},
					}, DataType.getType("string"));
		}, true);