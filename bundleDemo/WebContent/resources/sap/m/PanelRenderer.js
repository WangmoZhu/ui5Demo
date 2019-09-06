/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library"],function(e){"use strict";var t=e.ToolbarDesign;var a={};a.render=function(e,t){this.startPanel(e,t);this.renderHeader(e,t);this.renderContent(e,t);this.endPanel(e)};a.startPanel=function(e,t){e.write("<div");e.writeControlData(t);e.addClass("sapMPanel");e.writeClasses();e.addStyle("width",t.getWidth());e.addStyle("height",t.getHeight());e.writeStyles();e.writeAccessibilityState(t,{role:t.getAccessibleRole().toLowerCase(),labelledby:t._getLabellingElementId()});e.write(">")};a.renderHeader=function(e,a){var n=a.getExpandable(),r=a.getExpanded(),i=a.getHeaderToolbar(),d;if(n){e.write("<header");if(i){d="sapMPanelWrappingDivTb"}else{d="sapMPanelWrappingDiv"}e.addClass(d);if(r){e.addClass(d+"Expanded")}e.writeClasses();e.write(">");var s=a._getIcon();if(r){s.addStyleClass("sapMPanelExpandableIconExpanded")}else{s.removeStyleClass("sapMPanelExpandableIconExpanded")}e.renderControl(s)}var l=a.getHeaderText();if(i){i.setDesign(t.Transparent,true);i.addStyleClass("sapMPanelHeaderTB");e.renderControl(i)}else if(l||n){e.write("<h1");e.addClass("sapMPanelHdr");e.writeClasses();e.writeAttribute("id",a.getId()+"-header");e.write(">");e.writeEscaped(l);e.write("</h1>")}if(n){e.write("</header>")}var o=a.getInfoToolbar();if(o){if(n){o.addStyleClass("sapMPanelExpandablePart")}o.setDesign(t.Info,true);o.addStyleClass("sapMPanelInfoTB");e.renderControl(o)}};a.renderContent=function(e,t){this.startContent(e,t);this.renderChildren(e,t.getContent());this.endContent(e)};a.startContent=function(e,t){e.write("<div");e.writeAttribute("id",t.getId()+"-content");e.addClass("sapMPanelContent");e.addClass("sapMPanelBG"+t.getBackgroundDesign());if(t.getExpandable()){e.addClass("sapMPanelExpandablePart")}e.writeClasses();if(sap.ui.Device.browser.firefox){e.writeAttribute("tabindex","-1")}e.write(">")};a.renderChildren=function(e,t){t.forEach(e.renderControl,e)};a.endContent=function(e){e.write("</div>")};a.endPanel=function(e){e.write("</div>")};return a},true);