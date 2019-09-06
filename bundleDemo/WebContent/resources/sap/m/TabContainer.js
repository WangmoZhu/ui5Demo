/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","./TabContainerRenderer","./TabStrip","./TabStripItem","./Button"],function(t,e,i,r,o,n,a){"use strict";var s=t.ButtonType;var p=e.extend("sap.m.TabContainer",{metadata:{library:"sap.m",properties:{showAddNewButton:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{items:{type:"sap.m.TabContainerItem",multiple:true,singularName:"item",bindable:"bindable"},_addNewButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_tabStrip:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.m.TabContainerItem",multiple:false}},events:{itemClose:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabContainerItem"}}},itemSelect:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabContainerItem"}}},addNewButtonPress:{}},designtime:"sap/m/designtime/TabContainer.designtime",dnd:{draggable:false,droppable:true}},constructor:function(t,i){var r=[];if(!i&&typeof t==="object"){i=t}if(i&&Array.isArray(i["items"])){r=i["items"];delete i["items"]}e.prototype.constructor.apply(this,arguments);var n=new o(this.getId()+"--tabstrip",{hasSelect:true,itemSelect:function(t){var e=t.getParameter("item"),i=this._fromTabStripItem(e);this.setSelectedItem(i,t)}.bind(this),itemClose:function(t){var e=t.getParameter("item"),i=this._fromTabStripItem(e);t.preventDefault();if(this.fireItemClose({item:i})){this.removeItem(i)}}.bind(this)});this.setAggregation("_tabStrip",n,true);if(i&&i["showAddNewButton"]){this.setShowAddNewButton(true)}r.forEach(function(t){this.addItem(t)},this);this.data("sap-ui-fastnavgroup","true",true)}});var d={name:"text",additionalText:"additionalText",icon:"icon",iconTooltip:"iconTooltip",modified:"modified"};p.prototype.onBeforeRendering=function(){if(this.getSelectedItem()){return}this._setDefaultTab()};p.prototype._getAddNewTabButton=function(){var t=this.getAggregation("_addNewButton");var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(!t){t=new a({type:s.Transparent,tooltip:e.getText("TABCONTAINER_ADD_NEW_TAB"),icon:i.getIconURI("add"),press:function(){this.getParent().getParent().fireAddNewButtonPress()}});t.addStyleClass("sapMTSAddNewTabBtn");this.setAggregation("_addNewButton",t,true)}return t};p.prototype._getTabStrip=function(){return this.getAggregation("_tabStrip")};p.prototype._fromTabStripItem=function(t){var e=this.getItems()||[],i=e.length,r=0;for(;r<i;r++){if(e[r].getId()===t.getKey()){return e[r]}}return null};p.prototype._toTabStripItem=function(t){var e=0,i=t,r,o,n=this._getTabStrip();if(!n){return null}r=n.getItems();o=r.length;if(typeof t==="object"){i=t.getId()}for(;e<o;e++){if(r[e].getKey()===i){return r[e]}}return null};p.prototype._getSelectedItemContent=function(){var t=this._getTabStrip(),e=this.getSelectedItem(),i=sap.ui.getCore().byId(e),r=this._toTabStripItem(i);if(t){t.setSelectedItem(r)}return i?i.getContent():null};p.prototype._moveToNextItem=function(t){if(!this._getTabStrip()._oItemNavigation){return}var e=this.getItems().length,i=this._getTabStrip()._oItemNavigation.getFocusedIndex(),r=e===i?--i:i,o=this.getItems()[r],n=function(){if(this._getTabStrip()._oItemNavigation){this._getTabStrip()._oItemNavigation.focusItem(r)}};if(t){this.setSelectedItem(o);this.fireItemSelect({item:o})}if(document.activeElement.classList.contains("sapMTabStripSelectListItemCloseBtn")){setTimeout(n.bind(this),0)}};p.prototype._attachItemPropertyChanged=function(t){t.attachItemPropertyChanged(function(t){var e=t["mParameters"].propertyKey;if(d[e]){e=d[e];var i=this._toTabStripItem(t.getSource());var r="set"+e.substr(0,1).toUpperCase()+e.substr(1);i&&i[r](t["mParameters"].propertyValue)}}.bind(this))};p.prototype.removeItem=function(t){var e;if(typeof t==="undefined"||t===null){return null}t=this.removeAggregation("items",t);e=t.getId()===this.getSelectedItem();this._getTabStrip().removeItem(this._toTabStripItem(t));this._moveToNextItem(e);return t};p.prototype.addAggregation=function(t,i,r){if(t==="items"){this._attachItemPropertyChanged(i)}return e.prototype.addAggregation.call(this,t,i,r)};p.prototype.insertAggregation=function(t,i,r,o){if(t==="items"){this._attachItemPropertyChanged(i)}return e.prototype.insertAggregation.call(this,t,i,r,o)};p.prototype.addItem=function(t){this.addAggregation("items",t,false);this._getTabStrip().addItem(new n({key:t.getId(),text:t.getName(),additionalText:t.getAdditionalText(),icon:t.getIcon(),iconTooltip:t.getIconTooltip(),modified:t.getModified(),tooltip:t.getTooltip()}));return this};p.prototype.destroyItems=function(){this._getTabStrip().destroyItems();this.setAssociation("selectedItem",null);return this.destroyAggregation("items")};p.prototype.insertItem=function(t,e){this._getTabStrip().insertItem(new n({key:t.getId(),text:t.getName(),additionalText:t.getAdditionalText(),icon:t.getIcon(),iconTooltip:t.getIconTooltip(),modified:t.getModified(),tooltip:t.getTooltip()}),e);return this.insertAggregation("items",t,e)};p.prototype.removeAllItems=function(){this._getTabStrip().removeAllItems();this.setSelectedItem(null);return this.removeAllAggregation("items")};p.prototype.setAddButton=function(t){return this._getTabStrip().setAddButton(t)};p.prototype.getAddButton=function(){return this._getTabStrip().getAddButton()};p.prototype.setShowAddNewButton=function(t){this.setProperty("showAddNewButton",t,true);var e=this._getTabStrip();if(e){e.setAddButton(t?this._getAddNewTabButton():null)}return this};p.prototype.setSelectedItem=function(t,e){if(this.fireItemSelect({item:t})){var i=this._getTabStrip();if(t&&i){i.setSelectedItem(this._toTabStripItem(t));this._rerenderContent(t.getContent())}p.prototype.setAssociation.call(this,"selectedItem",t,true);return this}if(e){e.preventDefault()}return this};p.prototype._rerenderContent=function(t){var e=this.$("content"),i;if(!t||e.length<=0){return}i=sap.ui.getCore().createRenderManager();for(var r=0;r<t.length;r++){i.renderControl(t[r])}i.flush(e[0]);i.destroy()};p.prototype._setDefaultTab=function(){var t=this.getItems()[0]||null;this.setSelectedItem(t);return t};return p});