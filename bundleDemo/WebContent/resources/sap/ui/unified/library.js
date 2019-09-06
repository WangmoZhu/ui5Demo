/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/base/Object","sap/ui/core/library"],function(e,i){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.unified",version:"1.68.1",dependencies:["sap.ui.core"],designtime:"sap/ui/unified/designtime/library.designtime",types:["sap.ui.unified.CalendarAppointmentVisualization","sap.ui.unified.CalendarDayType","sap.ui.unified.CalendarIntervalType","sap.ui.unified.ColorPickerDisplayMode","sap.ui.unified.ColorPickerMode","sap.ui.unified.ContentSwitcherAnimation","sap.ui.unified.GroupAppointmentsMode","sap.ui.unified.StandardCalendarLegendItem"],interfaces:["sap.ui.unified.IProcessableBlobs"],controls:["sap.ui.unified.calendar.DatesRow","sap.ui.unified.calendar.Header","sap.ui.unified.calendar.Month","sap.ui.unified.calendar.MonthPicker","sap.ui.unified.calendar.MonthsRow","sap.ui.unified.calendar.TimesRow","sap.ui.unified.calendar.YearPicker","sap.ui.unified.Calendar","sap.ui.unified.CalendarDateInterval","sap.ui.unified.CalendarWeekInterval","sap.ui.unified.CalendarMonthInterval","sap.ui.unified.CalendarTimeInterval","sap.ui.unified.CalendarLegend","sap.ui.unified.CalendarRow","sap.ui.unified.ContentSwitcher","sap.ui.unified.ColorPicker","sap.ui.unified.ColorPickerPopover","sap.ui.unified.Currency","sap.ui.unified.FileUploader","sap.ui.unified.Menu","sap.ui.unified.Shell","sap.ui.unified.ShellLayout","sap.ui.unified.ShellOverlay","sap.ui.unified.SplitContainer"],elements:["sap.ui.unified.CalendarAppointment","sap.ui.unified.CalendarLegendItem","sap.ui.unified.DateRange","sap.ui.unified.DateTypeRange","sap.ui.unified.FileUploaderParameter","sap.ui.unified.FileUploaderXHRSettings","sap.ui.unified.MenuItem","sap.ui.unified.MenuItemBase","sap.ui.unified.MenuTextFieldItem","sap.ui.unified.ShellHeadItem","sap.ui.unified.ShellHeadUserItem"],extensions:{"sap.ui.support":{publicRules:true}}});var n=sap.ui.unified;n.CalendarDayType={None:"None",NonWorking:"NonWorking",Type01:"Type01",Type02:"Type02",Type03:"Type03",Type04:"Type04",Type05:"Type05",Type06:"Type06",Type07:"Type07",Type08:"Type08",Type09:"Type09",Type10:"Type10",Type11:"Type11",Type12:"Type12",Type13:"Type13",Type14:"Type14",Type15:"Type15",Type16:"Type16",Type17:"Type17",Type18:"Type18",Type19:"Type19",Type20:"Type20"};n.StandardCalendarLegendItem={Today:"Today",WorkingDay:"WorkingDay",NonWorkingDay:"NonWorkingDay",Selected:"Selected"};n.CalendarIntervalType={Hour:"Hour",Day:"Day",Month:"Month",Week:"Week",OneMonth:"One Month"};n.GroupAppointmentsMode={Collapsed:"Collapsed",Expanded:"Expanded"};n.CalendarAppointmentVisualization={Standard:"Standard",Filled:"Filled"};n.ContentSwitcherAnimation={None:"None",Fade:"Fade",ZoomIn:"ZoomIn",ZoomOut:"ZoomOut",Rotate:"Rotate",SlideRight:"SlideRight",SlideOver:"SlideOver"};n.ColorPickerMode={HSV:"HSV",HSL:"HSL"};n.ColorPickerDisplayMode={Default:"Default",Large:"Large",Simplified:"Simplified"};n._ContentRenderer=i.extend("sap.ui.unified._ContentRenderer",{constructor:function(e,n,a,r){i.apply(this);this._id=n;this._cntnt=a;this._ctrl=e;this._rm=sap.ui.getCore().createRenderManager();this._cb=r||function(){}},destroy:function(){this._rm.destroy();delete this._rm;delete this._id;delete this._cntnt;delete this._cb;delete this._ctrl;if(this._rerenderTimer){clearTimeout(this._rerenderTimer);delete this._rerenderTimer}i.prototype.destroy.apply(this,arguments)},render:function(){if(!this._rm){return}if(this._rerenderTimer){clearTimeout(this._rerenderTimer)}this._rerenderTimer=setTimeout(function(){var e=document.getElementById(this._id);if(e){if(typeof this._cntnt==="string"){var i=this._ctrl.getAggregation(this._cntnt,[]);for(var n=0;n<i.length;n++){this._rm.renderControl(i[n])}}else{this._cntnt(this._rm)}this._rm.flush(e)}this._cb(!!e)}.bind(this),0)}});n._iNumberOfOpenedShellOverlays=0;if(!n.ColorPickerHelper){n.ColorPickerHelper={isResponsive:function(){return false},factory:{createLabel:function(){throw new Error("no Label control available")},createInput:function(){throw new Error("no Input control available")},createSlider:function(){throw new Error("no Slider control available")},createRadioButtonGroup:function(){throw new Error("no RadioButtonGroup control available")},createRadioButtonItem:function(){throw new Error("no RadioButtonItem control available")}},bFinal:false}}if(!n.FileUploaderHelper){n.FileUploaderHelper={createTextField:function(e){throw new Error("no TextField control available!")},setTextFieldContent:function(e,i){throw new Error("no TextField control available!")},createButton:function(){throw new Error("no Button control available!")},addFormClass:function(){return null},bFinal:false}}n.calendar=n.calendar||{};return n});