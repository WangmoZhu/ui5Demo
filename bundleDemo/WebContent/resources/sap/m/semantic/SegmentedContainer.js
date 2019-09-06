/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/Segment","sap/ui/base/Metadata","sap/base/Log"],function(t,e,n){"use strict";var r=e.createClass("sap.m.semantic.SegmentedContainer",{constructor:function(t,e){if(!t){n.error("missing argumment: constructor expects a container reference",this);return}this._oContainer=t;e||(e="content");this._sContainerAggregationName=e;this._aSegments=[]}});r.prototype.addSection=function(e){if(!e||!e.sTag){n.error("missing argumment: section options expected",this);return}if(e.aContent){var r=e.aContent;var a=r.length;for(var i=0;i<a;i++){this._oContainer.addAggregation(this._sContainerAggregationName,r[i])}}var o=new t(r,this._oContainer,this._sContainerAggregationName,e.fnSortFunction);o.sTag=e.sTag;var s=this._aSegments;o.getStartIndex=function(){var t=0;var e=s.indexOf(this);if(e>0){var n=e-1;while(n>=0){t+=s[n].getContent().length;n--}}return t};this._aSegments.push(o)};r.prototype.getSection=function(t){var e;this._aSegments.forEach(function(n){if(n.sTag===t){e=n}});return e};r.prototype.destroy=function(t){this._oContainer.destroy(t);this.aSegments=null};r.prototype.getContainer=function(){return this._oContainer};return r},false);