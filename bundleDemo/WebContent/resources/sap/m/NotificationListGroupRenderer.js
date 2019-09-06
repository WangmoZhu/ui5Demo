/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/InvisibleRenderer"],function(e,r){"use strict";var t=e.Priority;var i={};var a="sapMNLG";var s="sapMNLB";var n="sapMLIB";var o="sapMNLB-AuthorPicture";var d="sapMNLG-GroupHeader";var l="sapMNLB-Header";var u="sapMNLG-Header";var v="sapMNLG-Body";var w="sapMNLB-SubHeader";var c="sapMNLG-SubHeader";var f="sapMNLB-CloseButton";var C="sapMNLB-Priority";var p="sapMNLG-Details";var N="sapMNLB-Bullet";var g="sapMNLG-Description";var h="sapMNLG-Collapsed";var b="sapMNLGNoHdrFooter";var M="sapMNLG-MaxNotifications";var B="sapMNLG-NoNotifications";i.render=function(e,r){if(r.getVisible()){var t=r._getVisibleItemsCount();var i=r.getShowEmptyGroup()||t>0;e.write("<li");e.addClass(a);e.addClass(s);e.addClass(n);if(!i){e.addClass(b)}if(r.getCollapsed()){e.addClass(h)}if(t==0){e.addClass(B)}e.writeClasses();e.writeControlData(r);e.writeAttribute("tabindex","0");e.writeAccessibilityState(r,{labelledby:r._ariaLabbeledByIds,role:"option"});e.write(">");if(i){e.write("<div");e.addClass(d);e.writeClasses();e.write(">");this.renderHeader(e,r);this.renderSubHeader(e,r);e.write("</div>");this.renderBody(e,r)}e.write("</li>")}else{this.renderInvisibleItem(e,r)}};i.renderHeader=function(e,r){e.write("<div");e.addClass(l);e.addClass(u);e.writeClasses();e.write(">");this.renderInvisibleInfoText(e,r);this.renderPriorityArea(e,r);this.renderCloseButton(e,r);this.renderTitle(e,r);e.write("</div>");this.renderDetails(e,r)};i.renderTitle=function(e,r){e.renderControl(r._getHeaderTitle())};i.renderCloseButton=function(e,r){if(r.getShowCloseButton()){e.renderControl(r.getAggregation("_closeButton").addStyleClass(f))}};i.renderAuthorPicture=function(e,r){if(!r.getAuthorPicture()){return}e.write("<div");e.addClass(o);e.writeClasses();e.write(">");e.renderControl(r._getAuthorImage());e.write("</div>")};i.renderDetails=function(e,r){e.write('<div class="'+p+'">');this.renderPriorityArea(e,r);this.renderAuthorPicture(e,r);e.write('<div class="'+g+'">');this.renderAuthorName(e,r);if(r.getAuthorName()!=""&&r.getDatetime()!=""){e.write('<span class="'+N+'">&#x00B7</span>')}this.renderDatetime(e,r);e.write("</div></div>")};i.renderInvisibleInfoText=function(e,r){e.renderControl(r.getAggregation("_ariaDetailsText"))};i.renderAuthorName=function(e,r){e.renderControl(r._getAuthorName())};i.renderSubHeader=function(e,r){var t=r.getButtons();e.write("<div");e.addClass(c);e.addClass(w);e.writeClasses();e.write(">");this.renderPriorityArea(e,r);this.renderCollapseGroupButton(e,r);if(t&&t.length&&r.getShowButtons()){e.renderControl(r.getAggregation("_overflowToolbar"))}e.write("</div>")};i.renderPriorityArea=function(e,r){e.write("<div");var i="";var a=r.getPriority();switch(a){case t.Low:i="sapMNLB-Low";break;case t.Medium:i="sapMNLB-Medium";break;case t.High:i="sapMNLB-High";break;default:i="sapMNLB-None";break}e.addClass(C);e.addClass(i);e.writeClasses();e.write(">");e.write("</div>")};i.renderCollapseGroupButton=function(e,r){e.renderControl(r.getAggregation("_collapseButton"))};i.renderInvisibleItem=function(e,t){r.render(e,t,"li")};i.renderBody=function(e,r){e.write("<ul");e.addClass(v);e.writeAttribute("role","listbox");e.writeClasses();e.write(">");this.renderNotifications(e,r);if(r._maxNumberReached){this.renderMaxNumberReachedMessage(e,r)}e.write("</ul>")};i.renderDatetime=function(e,r){e.renderControl(r._getDateTimeText())};i.renderNotifications=function(e,r){var t=r.getItems();var i=t.length;if(i){for(var a=0;a<r._maxNumberOfNotifications;a++){e.renderControl(t[a])}}};i.renderMaxNumberReachedMessage=function(e,r){var t="<span>"+r._maxNumberOfNotificationsTitle+"</span> <br>"+r._maxNumberOfNotificationsBody;e.write("<div");e.addClass(M);e.writeClasses();e.write(">");e.write(t);e.write("</div>")};return i},true);