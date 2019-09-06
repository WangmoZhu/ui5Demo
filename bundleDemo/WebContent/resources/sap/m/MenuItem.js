/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Item"],function(t,e){"use strict";var r=e.extend("sap.m.MenuItem",{metadata:{library:"sap.m",properties:{icon:{type:"string",group:"Appearance",defaultValue:null},visible:{type:"boolean",group:"Appearance",defaultValue:true},startsSection:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.MenuItem",multiple:true,singularName:"item",bindable:"bindable"}},events:{press:{},propertyChanged:{parameters:{propertyKey:{type:"string"},propertyValue:{type:"any"}}},aggregationChanged:{parameters:{aggregationName:{type:"String"},methodName:{type:"String"},methodParams:{type:"Object"}}}}}});r.prototype.exit=function(){if(this._sVisualChild){this._sVisualChild=null}if(this._sVisualParent){this._sVisualParent=null}if(this._sVisualControl){this._sVisualControl=null}};r.prototype.setProperty=function(t,r){e.prototype.setProperty.apply(this,arguments);this.fireEvent("propertyChanged",{propertyKey:t,propertyValue:r})};r.prototype.setAggregation=function(t,r,a){e.prototype.setAggregation.apply(this,arguments);this.fireEvent("aggregationChanged",{aggregationName:t,methodName:"set",methodParams:{item:r}});return this};r.prototype.addAggregation=function(t,r,a){e.prototype.addAggregation.apply(this,arguments);this.fireEvent("aggregationChanged",{aggregationName:t,methodName:"add",methodParams:{item:r}});return this};r.prototype.insertAggregation=function(t,r,a,o){e.prototype.insertAggregation.apply(this,arguments);this.fireEvent("aggregationChanged",{aggregationName:t,methodName:"insert",methodParams:{item:r,index:a}});return this};r.prototype.removeAggregation=function(t,r,a){var o=e.prototype.removeAggregation.apply(this,arguments);this.fireEvent("aggregationChanged",{aggregationName:t,methodName:"remove",methodParams:{item:o}});return o};r.prototype.removeAllAggregation=function(t,r){var a=e.prototype.removeAllAggregation.apply(this,arguments);this.fireEvent("aggregationChanged",{aggregationName:t,methodName:"removeall",methodParams:{items:a}});return a};r.prototype.destroyAggregation=function(t,r){this.fireEvent("aggregationChanged",{aggregationName:t,methodName:"destroy"});return e.prototype.destroyAggregation.apply(this,arguments)};r.prototype.destroy=function(){var t=sap.ui.getCore().byId(this._getVisualControl());if(t){t.destroy()}return e.prototype.destroy.apply(this,arguments)};r.prototype._setVisualChild=function(t){this._setInternalRef(t,"_sVisualChild")};r.prototype._setVisualParent=function(t){this._setInternalRef(t,"_sVisualParent")};r.prototype._setVisualControl=function(t){this._setInternalRef(t,"_sVisualControl")};r.prototype._setInternalRef=function(t,e){if(!t||typeof t==="string"){this[e]=t}else if(t.getId){this[e]=t.getId()}};r.prototype._getVisualChild=function(){return this._sVisualChild};r.prototype._getVisualParent=function(){return this._sVisualParent};r.prototype._getVisualControl=function(){return this._sVisualControl};return r});