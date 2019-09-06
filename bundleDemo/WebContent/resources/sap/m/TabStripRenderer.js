/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TabStripItem","sap/ui/Device","sap/ui/core/InvisibleText"],function(e,t,i){"use strict";var r={};r.LEFT_OVERRFLOW_BTN_CLASS_NAME="sapMTSLeftOverflowButtons";r.RIGHT_OVERRFLOW_BTN_CLASS_NAME="sapMTSRightOverflowButtons";r.render=function(e,i){if(!i.getVisible()){return}this.beginTabStrip(e,i);if(t.system.phone===true){this.renderTouchArea(e,i)}else{e.write("<div id='"+i.getId()+"-leftOverflowButtons' class='"+this.LEFT_OVERRFLOW_BTN_CLASS_NAME+"'>");if(i.getAggregation("_leftArrowButton")){this.renderLeftOverflowButtons(e,i,false)}e.write("</div>");this.beginTabsContainer(e,i);this.renderItems(e,i);this.endTabsContainer(e);e.write("<div id='"+i.getId()+"-rightOverflowButtons' class='"+this.RIGHT_OVERRFLOW_BTN_CLASS_NAME+"'>");if(i.getAggregation("_rightArrowButton")){this.renderRightOverflowButtons(e,i,false)}e.write("</div>");this.renderTouchArea(e,i)}this.endTabStrip(e)};r.renderItems=function(e,t){var i=t.getItems(),r=t.getSelectedItem();i.forEach(function(i){var n=r&&r===i.getId();this.renderItem(e,t,i,n)},this)};r.renderItem=function(t,i,r,d){var o=r.getTooltip();t.write("<div id='"+r.getId()+"'");t.addClass(e.CSS_CLASS);if(r.getModified()){t.addClass(e.CSS_CLASS_MODIFIED)}if(d){t.addClass(e.CSS_CLASS_SELECTED)}t.writeClasses();if(o){t.writeAttributeEscaped("title",o)}t.writeElementData(r);t.writeAccessibilityState(r,s(r,i,sap.ui.getCore().byId(i.getSelectedItem())));t.write(">");if(r.getIcon()){t.renderControl(r._getImage())}t.write("<div");t.addClass("sapMTSTexts");t.writeClasses();t.write(">");t.write("<div id='"+n(r)+"-addText' class='"+e.CSS_CLASS_TEXT+"'>");this.renderItemText(t,r.getAdditionalText());t.write("</div>");t.write("<div id='"+n(r)+"-text' class='"+e.CSS_CLASS_LABEL+"'>");this.renderItemText(t,r.getText());t.write("</div>");t.write("</div>");this.renderItemCloseButton(t,r);t.write("</div>")};r.renderItemText=function(t,i){if(i.length>e.DISPLAY_TEXT_MAX_LENGTH){t.writeEscaped(i.slice(0,e.DISPLAY_TEXT_MAX_LENGTH));t.write("...")}else{t.writeEscaped(i)}};r.renderItemCloseButton=function(e,t){e.write("<div class='sapMTSItemCloseBtnCnt'>");e.renderControl(t.getAggregation("_closeButton"));e.write("</div>")};r.beginTabStrip=function(e,t){e.write("<div");e.addClass("sapMTabStrip");e.addClass("sapContrastPlus");e.writeControlData(t);e.writeClasses();e.write(">")};r.endTabStrip=function(e){e.write("</div>")};r.beginTabsContainer=function(e,t){e.write("<div id='"+t.getId()+"-tabsContainer' class='sapMTSTabsContainer'>");e.write("<div id='"+t.getId()+"-tabs'  class='sapMTSTabs'");e.writeAccessibilityState(t,{role:"tablist"});e.write(">")};r.endTabsContainer=function(e){e.write("</div>");e.write("</div>")};r.renderLeftOverflowButtons=function(e,t,i){e.renderControl(t.getAggregation("_leftArrowButton"));if(i){e.flush(t.$("leftOverflowButtons")[0])}};r.renderRightOverflowButtons=function(e,t,i){e.renderControl(t.getAggregation("_rightArrowButton"));if(i){e.flush(t.$("rightOverflowButtons")[0])}};r.renderTouchArea=function(e,t){e.write("<div id='"+t.getId()+"-touchArea'  class='sapMTSTouchArea'>");e.renderControl(t.getAggregation("_select"));e.renderControl(t.getAddButton());e.write("</div>")};function n(e){return e.getId()+"-label"}function s(e,t,r){var s=t.getItems(),d=s.indexOf(e),o=t.getParent(),a={role:"tab"},l=i.getStaticId("sap.m","TABSTRIP_ITEM_CLOSABLE")+" ";l+=i.getStaticId("sap.m",e.getModified()?"TABSTRIP_ITEM_MODIFIED":"TABSTRIP_ITEM_NOT_MODIFIED");a["describedby"]=l;a["posinset"]=d+1;a["setsize"]=s.length;a["labelledby"]=n(e)+"-addText "+n(e)+"-text";if(o&&o.getRenderer&&o.getRenderer().getContentDomId){a["controls"]=o.getRenderer().getContentDomId(o)}if(r&&r.getId()===e.getId()){a["selected"]="true"}else{a["selected"]="false"}return a}return r},true);