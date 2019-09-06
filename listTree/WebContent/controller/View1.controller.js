sap.ui.define([
	"echart/util/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function(Controller, JSONModel, History) {
	"use strict";

	return Controller.extend("echart.controller.View1", {
		onInit: function() {
			this.currentSearchId = "";

			this.getView().setModel(new JSONModel({
				parentView: ""
			}), "visibleSelectButtonModel");

//			this.getRouter().getRoute("locationList").attachMatched(this.onRouteMatched, this);
			this.onRouteMatched();

			var locationMap = {};
			locationMap["FCUP-B2C"] = {
				done: 0,
				inProgress: 33,
				notDone: 0,
				children: ["FCUP-B2C-GB", "GRND-CTR", "CITY-PLZ"]
			};

			locationMap["CHNA-CC"] = {
				done: 0,
				inProgress: 30,
				notDone: 0,
				children: ["CHNA-CC--CA", "INT8-VNU", "GLDN-CNM"]
			};

			locationMap["SEA--SS"] = {
				done: 0,
				inProgress: 22,
				notDone: 0,
				children: ["SEA--SSS-AA", "TOMA-LV2", "BLDN-44V"]
			};

			locationMap["FCUP-B2C-GB"] = {
				image: jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/melawati.jpg",
				done: 0,
				inProgress: 28,
				notDone: 0,
				street: "Taman Melawati",
				city: "Kuala Lumpur"
			};

			locationMap["GRND-CTR"] = {
				image: jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/sungei.jpg",
				done: 0,
				inProgress: 34,
				notDone: 0,
				street: "Jalan Bukit Bintang",
				city: "Kuala Lumpur, 55100"
			};

			locationMap["CITY-PLZ"] = {
				image: jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/gurney.jpg",
				done: 0,
				inProgress: 28,
				notDone: 0,
				street: "Gurney Plaza",
				city: "10250 George Town, Penang, Malaysia"
			};

			locationMap["SEA--SSS-AA"] = {
				image: jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/changi.jpg",
				done: 0,
				inProgress: 25,
				notDone: 0,
				street: "Airport Blvd",
				city: "Singapore"
			};

			locationMap["TOMA-LV2"] = {
				image: jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/bedok.jpg",
				done: 0,
				inProgress: 38,
				notDone: 0,
				street: "311 New Upper Changi Rd",
				city: "Singapore 467360"
			};

			locationMap["BLDN-44V"] = {
				image: jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/westgate.jpg",
				done: 0,
				inProgress: 32,
				notDone: 0,
				street: "3 Gateway Dr",
				city: "Singapore 608532"
			};

			locationMap["CHNA-CC--CA"] = {
				image: jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/capital.jpg",
				done: 0,
				inProgress: 40,
				notDone: 0,
				street: "No. 268, Hengtong Road",
				city: "Shanghai"
			};

			locationMap["INT8-VNU"] = {
				image: jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/capitaMall.jpg",
				done: 0,
				inProgress: 27,
				notDone: 0,
				street: "No. 265, Xujiahui Road",
				city: "China, Shanghai"
			};

			locationMap["GLDN-CNM"] = {
				image: jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/rock.jpg",
				done: 0,
				inProgress: 28,
				notDone: 0,
				street: "No. 106-108 Gongye Avenue North",
				city: "China, Guangzhou"
			};

			this.locationMap = locationMap;
		},

		onRouteMatched: function(oEvent) {
			var direction = sap.ui.core.routing.History.getInstance().getDirection();

			if (direction !== "Backwards") {
//				this.oArguments = oEvent.getParameter("arguments");
				var model = this.getView().getModel("visibleSelectButtonModel");

				//Clear searchfield
				//this.getView().byId("searchField").setValue("");

				// set the binding model for select button
//				if ((this.oArguments.notificationContext && this.oArguments.parentView === "notificationCreate") ||
//					this.oArguments.parentView === "workOrderCreate" || this.oArguments.parentView === "notificationList") {
//					model.setProperty("/parentView", this.oArguments.parentView);
//				} else {
//					model.setProperty("/parentView", "");
//				}
//				model.refresh();
				this.getFunctionalLocationsWithoutParent();	
//				if (this.getView().getModel("device").getData().isHybridApp) {
				// set map with notification done, inProgress and not done 
				this.setLocationNotificationData().then(function() {
					// get locations
					this.getFunctionalLocationsWithoutParent();	
				}.bind(this ));
//				}else{
//					this.getFunctionalLocationsWithoutParent();	
//				}
			}
		},

		setLocationNotificationData: function() {
			return new Promise(function(resolve, reject) {
				// functional location (olny children)
				var funcLocations = ["FCUP-B2C-GB", "GRND-CTR", "CITY-PLZ", "SEA--SSS-AA", "TOMA-LV2", "BLDN-44V",
					"CHNA-CC--CA", "INT8-VNU", "GLDN-CNM"
				];

				var statusOptions = [{
					"status": "ZTAF",
					"type": "done"

				}, {
					"status": "ZINI",
					"type": "notDone"
				}];

				// variable used to check when to resolve promise
				var expectedTotalCounts = funcLocations.length * statusOptions.length;
				var totalCounts = 0;

				funcLocations.forEach(function(funcLoc) {

					statusOptions.forEach(function(option) {
						var aFilters = [];
						aFilters.push(new sap.ui.model.Filter("FunctionalLoc", sap.ui.model.FilterOperator.EQ, funcLoc));
						aFilters.push(new sap.ui.model.Filter("UserStatus", sap.ui.model.FilterOperator.EQ, option.status));

						// tilføj date filter for ikke overdue - req end date skal være større end dagsdato
						/*if(option.type !== "overdue") { 
							aFilters.push(new sap.ui.model.Filter("RequiredEndDate", sap.ui.model.FilterOperator.GT, "2018-11-02T00:00:00"));
						}else {
							aFilters.push(new sap.ui.model.Filter("RequiredEndDate", sap.ui.model.FilterOperator.LE, new Date()));
						}*/

						this.countSetWithFilter("/NotificationsSet", aFilters)
							.then(
								function(count) {
									if (option.type === "done") {
										this.locationMap[funcLoc].done = count;
									} else {
										this.locationMap[funcLoc].notDone = count;
									}

									totalCounts++;
									if (expectedTotalCounts === totalCounts) {
										resolve();
									}
								}.bind(this),
								function(error) {
//									this.errorCallBackShowInPopUp(error);
								}.bind(this));
					}.bind(this));

				}.bind(this));

			}.bind(this));
		},

		countSetWithFilter: function(path, filter) {
			return new Promise(function(resolve, reject) {
				this.getView().getModel().read(path + "/$count", { // /OrderSet/$count
					filters: filter,
					success: function(oData) {
						resolve(parseInt(oData, 10));
					}.bind(this),
					error: function(error) {
						reject(error);
					}.bind(this)
				});
			}.bind(this));
		},
		

		getFunctionalLocationsWithoutParent: function() {
			var viewModel = new sap.ui.model.json.JSONModel({
				items: []
			});
			this.getView().setModel(viewModel, "viewModel");

			this.currentSearchId = "";

			var parameters = {
				filters: [new sap.ui.model.Filter("ParentFuncLoc", sap.ui.model.FilterOperator.EQ, "")],
				sorters: [new sap.ui.model.Sorter("Description", false, false)],
				success: function(data) {
					if (this.currentSearchId !== "") {
						return;
					}

					for (var i = 0; i < data.results.length; i++) {
						var currentResult = data.results[i];

						if (currentResult.FunctionalLocation === "CHNA-CC" ||
							currentResult.FunctionalLocation === "FCUP-B2C" ||
							currentResult.FunctionalLocation === "SEA--SS") {

							// count done and notDone for children
							var children = this.locationMap[currentResult.FunctionalLocation].children;
							var done = 0;
							var notDone = 0;
							children.forEach(function(child) {
								done = done + this.locationMap[child].done;
								notDone = notDone + this.locationMap[child].notDone;
							}.bind(this));

							// create item
							var item = {
								name: currentResult.FunctionalLocation,
								description: currentResult.Description,
								id: currentResult.FunctionalLocation,
								parentId: currentResult.ParentFuncLoc,
								leaf: currentResult.Isleaf,
								type: "FUNCTIONAL_LOCATION",
								level: 0,
								uniqueId: this.createGUID(),
								done: done,
								//inProgress: this.locationMap[currentResult.FunctionalLocation].inProgress,
								notDone: notDone
							};

							viewModel.getData().items.splice(i, 0, item);
						}
					}

					this.getView().getModel("viewModel").refresh();
					this.getView().setBusy(false);
				}.bind(this),
				error: function(error) {
					sap.m.MessageBox.error(error);
					this.getView().setBusy(false);
				}.bind(this)
			};

//			this.getView().getModel().read("/FunctionalLocationsSet", parameters);
		},

		onPressItem: function(oEvent) {
			var bindingContext = oEvent.getSource().getBindingContextPath();
			var item = this.getView().getModel("viewModel").getProperty(bindingContext);

			if (item.leaf) {
				// set functionalLoc in globel filterModel
				this.getView().getModel("notificationFilterModel").getData().functionalLoc = item.id;
				this.getView().getModel("notificationFilterModel").getData().locationName =  item.description;
				this.getView().getModel("notificationFilterModel").refresh();

				this.getRouter().navTo("checkList", {
					locationName: "test"
				});
			}

			if (!item.expanded && !item.leaf) {
				item.expanded = true;

				if (item.parentId === "") {
					item.level = 0;
				}

				if (item.type === "FUNCTIONAL_LOCATION") {
					this.getFunctionalLocationsByParent(item);
				} else {
					this.getEquipmentByParentEquipment(item);
				}

			} else {
				this.closeItem(item);
			}
		},

		searchStructureLive: function(oEvent) {
			var sValue = oEvent.getParameter("newValue");
			var searchString = sValue.toLowerCase();

			this.searchStructure(searchString);
		},

		searchStructurePress: function(oEvent) {

			if (oEvent.getParameter("clearButtonPressed"))
				return;

			var sValue = oEvent.getParameter("query");
			var searchString = sValue.toLowerCase();

			this.getView().setBusy(true);

			this.searchStructure(searchString);
		},

		searchStructure: function(sValue) {
			if (sValue === "") {

				this.getFunctionalLocationsWithoutParent();
				return;
			} else {
				var searchId = this.createGUID();
				this.currentSearchId = searchId;
			}

			var searchString = sValue.toLowerCase();
			//this.getView().setBusy(true);
			var filters = new Array();
			filters.push(new sap.ui.model.Filter("Searchstring", sap.ui.model.FilterOperator.Contains, searchString));
			//var filterByName = new sap.ui.model.Filter("ParentFuncLoc", sap.ui.model.FilterOperator.EQ, "");
			//filters.push(filterByName);
			var url = "/FunctionalLocationsSet";
			this.getView().getModel().read(url, {
				filters: filters,
				success: function(data) {
					if (searchId !== this.currentSearchId) {
						return;
					}

					for (var i = 0; i < data.results.length; i++) {
						var currentResult = data.results[i];

						var item = {
							name: currentResult.FunctionalLocation,
							description: currentResult.Description,
							id: currentResult.FunctionalLocation,
							parentId: currentResult.ParentFuncLoc,
							leaf: currentResult.Isleaf,
							type: "FUNCTIONAL_LOCATION",
							level: 0,
							uniqueId: this.createGUID()
						};

						this.getView().getModel("viewModel").getData().items.splice(i, 0, item);
					}

					this.searchEquipment(searchString, searchId);
				}.bind(this),
				error: function(error) {
					sap.m.MessageBox.error(error);
					this.getView().setBusy(false);
				}.bind(this)
			});
		},

		searchEquipment: function(searchString, searchId) {
			var filters = new Array();
			filters.push(new sap.ui.model.Filter("Searchstring", sap.ui.model.FilterOperator.Contains, searchString));

			var sorters = new Array();
			sorters.push(new sap.ui.model.Sorter("Description", false, false));

			var url = "/EquipmentsSet";
			this.getView().getModel().read(url, {
				filters: filters,
				sorters: sorters,
				success: function(result) {

					if (searchId !== this.currentSearchId) {
						if (this.currentSearchId === "")
							this.getView().setBusy(false);

						return;
					}

					var results = result.results;
					var children = [];

					for (var i = 0; i < results.length; i++) {
						var currentResult = results[i];

						children[children.length] = {
							name: currentResult.Equipment,
							description: currentResult.Description,
							id: currentResult.Equipment,
							parentId: currentResult.Funcloc,
							parentEquipmentId: currentResult.ParentEquipment,
							leaf: currentResult.Isleaf,
							type: "EQUIPMENT",
							level: 0,
							uniqueId: this.createGUID(),
							parentFunctionalLocationName: currentResult.Funcloc,
							parentFunctionalLocationdescription: currentResult.Funclocdesc
						};

						this.getView().getModel("viewModel").getData().items.splice(i, 0, children[i]);
					}

					this.getView().getModel("viewModel").getData().items.sort(function(itemA, itemB) {
						if (itemA.description > itemB.description)
							return 1;
						else if (itemA.description < itemB.description)
							return -1;
						else return 0;
					});

					this.getView().getModel("viewModel").refresh();
					this.getView().setBusy(false);
				}.bind(this),
				error: function(error) {
					sap.m.MessageBox.error(error);
					this.getView().setBusy(false);
				}.bind(this)
			});
		},


		getFunctionalLocationsByParent: function(item) {
			var itemIndex = this.getView().getModel("viewModel").getData().items.findIndex(function(currentItem) {
				return currentItem.uniqueId === item.uniqueId;
			});

			var url = "/FunctionalLocationsSet";
			item.busy = true;
			this.getView().getModel().read(url, {
				filters: [new sap.ui.model.Filter("ParentFuncLoc", sap.ui.model.FilterOperator.EQ, item.id)],
				sorters: [new sap.ui.model.Sorter("Description", false, false)],
				success: function(data) {
					for (var i = 0; i < data.results.length; i++) {
						var currentResult = data.results[i];

						var funcLoc = {
							name: currentResult.FunctionalLocation,
							description: currentResult.Description,
							id: currentResult.FunctionalLocation,
							parentId: currentResult.ParentFuncLoc,
							uniqueParentId: item.uniqueId,
							leaf: true,
							type: "FUNCTIONAL_LOCATION",
							level: item.level + 1,
							uniqueId: this.createGUID(),
							image: this.locationMap[currentResult.FunctionalLocation].image,
							done: this.locationMap[currentResult.FunctionalLocation].done,
							//inProgress: this.locationMap[currentResult.FunctionalLocation].inProgress,
							notDone: this.locationMap[currentResult.FunctionalLocation].notDone,
							street: this.locationMap[currentResult.FunctionalLocation].street,
							city: this.locationMap[currentResult.FunctionalLocation].city
						};

						this.getView().getModel("viewModel").getData().items.splice(itemIndex + 1 + i, 0, funcLoc);
					}

					this.getEquipmentByParentFunctionalLocation(item);
				}.bind(this),
				error: function(error) {
					item.busy = false;
				}
			});
		},

		getEquipmentByParentFunctionalLocation: function(item) {
			var itemIndex = this.getView().getModel("viewModel").getData().items.findIndex(function(currentItem) {
				return currentItem.id === item.id;
			});

			var filters = new Array();
			var filterByFLParent = new sap.ui.model.Filter("Funcloc", sap.ui.model.FilterOperator.EQ, item.id);
			filters.push(filterByFLParent);
			var filterByNoEQUParent = new sap.ui.model.Filter("ParentEquipment", sap.ui.model.FilterOperator.EQ, "");
			filters.push(filterByNoEQUParent);

			var sorters = new Array();
			sorters.push(new sap.ui.model.Sorter("Description", false, false));

			var url = "/EquipmentsSet";
			this.getView().getModel().read(url, {
				filters: filters,
				sorters: sorters,
				success: function(result) {
					var results = result.results;
					var children = [];

					for (var i = 0; i < results.length; i++) {
						var currentResult = results[i];

						children[children.length] = {
							name: currentResult.Equipment,
							description: currentResult.Description,
							id: currentResult.Equipment,
							parentId: currentResult.Funcloc,
							uniqueParentId: item.uniqueId,
							parentEquipmentId: currentResult.ParentEquipment,
							leaf: currentResult.Isleaf,
							type: "EQUIPMENT",
							level: item.level + 1,
							uniqueId: this.createGUID(),
							parentFunctionalLocationName: currentResult.Funcloc,
							parentFunctionalLocationdescription: currentResult.Funclocdesc
						};

						this.getView().getModel("viewModel").getData().items.splice(itemIndex + 1 + i, 0, children[i]);
					}

					item.busy = false;
					this.getView().getModel("viewModel").refresh();
				}.bind(this),
				error: function(error) {
					item.busy = false;
				}
			});
		},

		getEquipmentByParentEquipment: function(item) {
			var itemIndex = this.getView().getModel("viewModel").getData().items.findIndex(function(currentItem) {
				return currentItem.uniqueId === item.uniqueId;
			});

			var filters = new Array();
			var filterByEQParent = new sap.ui.model.Filter("ParentEquipment", sap.ui.model.FilterOperator.EQ, item.id);
			filters.push(filterByEQParent);

			var sorters = new Array();
			sorters.push(new sap.ui.model.Sorter("Description", false, false));

			var url = "/EquipmentsSet";
			this.getView().getModel().read(url, {
				filters: filters,
				sorters: sorters,
				success: function(result) {
					var results = result.results;
					var children = [];

					for (var i = 0; i < results.length; i++) {
						var currentResult = results[i];

						children[children.length] = {
							name: currentResult.Equipment,
							description: currentResult.Description,
							id: currentResult.Equipment,
							parentId: currentResult.Funcloc,
							uniqueParentId: item.uniqueId,
							parentEquipmentId: currentResult.ParentEquipment,
							leaf: currentResult.Isleaf,
							type: "EQUIPMENT",
							level: item.level + 1,
							uniqueId: this.createGUID(),
							parentFunctionalLocationName: currentResult.Funcloc,
							parentFunctionalLocationdescription: currentResult.Funclocdesc
						};

						this.getView().getModel("viewModel").getData().items.splice(itemIndex + 1 + i, 0, children[i]);
					}

					item.busy = false;
					this.getView().getModel("viewModel").refresh();
				}.bind(this),
				error: function(error) {
					item.busy = false;
				}
			});
		},

		closeItem: function(item) {
			var children = this.getView().getModel("viewModel").getData().items.filter(function(currentItem) {
				/*if (item.type === "FUNCTIONAL_LOCATION") {
					return currentItem.parentId === item.id || (currentItem.parentFunctionalLocationId === item.id && !currentItem.parentEquipmentId);
				} else {
					return currentItem.parentEquipmentId === item.id;
				}*/
				return currentItem.uniqueParentId === item.uniqueId;
			});
			for (var i = 0; i < children.length; i++) {
				this.closeItem(children[i]);
				var itemIndex = this.getView().getModel("viewModel").getData().items.findIndex(function(currentItem) {
					return currentItem.id === children[i].id;
				});
				this.getView().getModel("viewModel").getData().items.splice(itemIndex, 1);
				item.expanded = false;
			}

			this.getView().getModel("viewModel").refresh();
		},

		isLeaf: function(isLeaf, expanded) {
			if (expanded) {
				return "sap-icon://slim-arrow-down";
			} else if (!isLeaf) {
				return "sap-icon://slim-arrow-right";
			}

			return "";
		},

		navigateWithDirectionsToAddress: function(oEvent) {
			var street = oEvent.getSource().getParent().getBindingContext("viewModel").getObject().street;
			var city = oEvent.getSource().getParent().getBindingContext("viewModel").getObject().city;

			var navigateurl = "https://www.google.com/maps/dir/?api=1&destination={0}&travelmode=driving"; //url used in online version

			if (window.cordova.require("cordova/platform").id === "ios") {
				navigateurl = "http://maps.apple.com/?daddr={0}&dirflg=d&t=h";
			}

			if (window.cordova.require("cordova/platform").id === "android") {
				navigateurl = navigateurl;
			}

			if (window.cordova.require("cordova/platform").id === "windows") {
				navigateurl = "bingmaps:?where={0}";

			}

			navigateurl = navigateurl.replace("{0}", encodeURI(street + ", " + city));

			if (this.getView().getModel("device").getData().isHybridApp) {
				window.location.assign(navigateurl);
				//window.open(navigateurl); //Will open the Attachment viewer
			} else {
				window.open(navigateurl);
			}
		},

		typeIcon: function(type) {
			if (type === "FUNCTIONAL_LOCATION") {
				return "sap-icon://functional-location";
			}

			return "sap-icon://wrench";
		},

		navigateBack: function(oEvent) {
			window.history.go(-1);
		},

		onDetailsPress: function(oEvent) {
			if (this.getView().getModel("viewModel").getProperty(oEvent.getSource().getBindingContext("viewModel").getPath()).type ===
				"EQUIPMENT") {

				var objecContext = "/EquipmentsSet('" + this.getView().getModel("viewModel").getProperty(oEvent.getSource().getBindingContext(
					"viewModel").getPath()).name + "')";

				this.getRouter().navTo("equipmentDetails", {
					objectContext: objecContext.substr(1)

				}, false);
			} else {
				var funcObjectContext = "/FunctionalLocationsSet('" + this.getView().getModel("viewModel").getProperty(oEvent.getSource().getBindingContext(
					"viewModel").getPath()).name + "')";

				this.getRouter().navTo("functionalLocationDetails", {
					objectContext: funcObjectContext.substr(1)

				}, false);
			}
		},

		onSelectBtnPress: function(oEvent) {
			var object = this.getView().getModel("viewModel").getProperty(oEvent.getSource().getBindingContext(
				"viewModel").getPath());

			if (this.oArguments.parentView === "notificationList") {
				var notificationFilterModel = this.getView().getModel("notificationFilterModel");

				if (object.type !== "EQUIPMENT") {
					notificationFilterModel.getData().equipmentNo = "NONE";
					notificationFilterModel.getData().functionalLoc = object.name;
				} else {
					notificationFilterModel.getData().equipmentNo = object.name;
					notificationFilterModel.getData().functionalLoc = object.parentFunctionalLocationName;
				}

				notificationFilterModel.refresh();
			} else {
				var selectObjectForNewNotificationModel = this.getView().getModel("selectObjectForNewNotificationModel");

				if (object.type !== "EQUIPMENT") {
					selectObjectForNewNotificationModel.getData().equipmentNo = "NONE";
					selectObjectForNewNotificationModel.getData().equipmentDesc = "NONE";
					selectObjectForNewNotificationModel.getData().functionalLoc = object.name;
					selectObjectForNewNotificationModel.getData().funcLocDesc = object.description;
				} else {
					selectObjectForNewNotificationModel.getData().equipmentNo = object.name;
					selectObjectForNewNotificationModel.getData().equipmentDesc = object.description;
					selectObjectForNewNotificationModel.getData().functionalLoc = object.parentFunctionalLocationName;
					selectObjectForNewNotificationModel.getData().funcLocDesc = object.parentFunctionalLocationdescription;
				}

				selectObjectForNewNotificationModel.refresh();
			}

			this.navigateBack();
		},

		//formatter function to either show or hide the button
		EnableButtonVisbleCheck: function(str) {
			if (str === "notificationCreate" || str === "workOrderCreate" || str === "notificationList") {
				return true;
			} else {
				return false;
			}
		},

		onSearch: function() {
			this.getRouter().navTo("structureSearch");
		},

		formatIndentWidth: function(level) {
			if (level === undefined)
				level = 0;

			return (level * 2) + 0.6 + "em";
		},

		createGUID: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		},

		onFilterEquipment: function(event) {
			var list = this.getView().byId("structureTable");
			var itemsBinding = list.getBinding("items");

			if (event.getSource().getPressed()) {

				this.getView().getModel("viewModel").setProperty("/showEquipment", false);

				var aFilters = [];
				aFilters.push(new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.EQ, "FUNCTIONAL_LOCATION"));

				if (itemsBinding) {
					itemsBinding.aApplicationFilters = [];

					if (aFilters.length > 0) {

						var filter = new sap.ui.model.Filter({
							filters: aFilters,
							and: true
						});

						itemsBinding.filter(filter);
					} else {
						itemsBinding.filter(aFilters);
					}
				}

			} else {
				this.getView().getModel("viewModel").setProperty("/showEquipment", true);
				itemsBinding.filter();
			}
		},

		formatToggleEquipment: function(showEquipment) {
			if (showEquipment)
				return this.getI18nText("StructureBrowser-ButtonText-HideEquipment");
			else
				return this.getI18nText("StructureBrowser-ButtButtonTexton-EquipmentHidden");
		},

		getImageVisible: function(level) {
			if (level === 0) {
				return false;
			} else {
				return true;
			}
		},

		getChartSize: function(isPhone) {
			if (isPhone) {
				return "L";
			} else {
				return "XS";
			}
		},

		getTechObjImage: function() {
			return jQuery.sap.getModulePath("com.twobm.mobileworkorder") + "/images/demoImages/T_Xizhimen.jpg";
		}
	});
});