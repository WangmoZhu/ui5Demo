/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/ChangeHandlerMediator","sap/ui/fl/Utils"],function(e,t){"use strict";function n(e){var t=[];var n;var a;if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){n=e.getLabel();if(n){t.push(n)}t=t.concat(e.getFields())}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){a=e.getTitle()||e.getToolbar();if(a){t[0]=a}e.getFormElements().forEach(function(e){n=e.getLabel();if(n){t.push(n)}t=t.concat(e.getFields())})}else if(e.getMetadata().getName()==="sap.ui.layout.form.Form"){t.push(e)}return t}function a(e){if(e.getMetadata().getName()==="sap.ui.layout.form.SimpleForm"){return e}else if(e.getParent()){return a(e.getParent())}}function r(e){var n=a(e);return n&&n.getContent().every(function(e){return t.checkControlId(e)})}var o={aggregations:{formContainers:{childNames:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},getIndex:function(e,t){var n=e.getFormContainers();if(t){return n.indexOf(t)+1}if(n.length>0&&n[0].getFormElements().length===0&&n[0].getTitle()===null){return 0}return n.length},beforeMove:function(e){if(e){e._bChangedByMe=true}},afterMove:function(e){if(e){e._bChangedByMe=false}},actions:{move:function(e){if(r(e)){return{changeType:"moveSimpleFormGroup"}}},createContainer:{changeType:"addSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:function(e){var t=e.getFormContainers();for(var n=0;n<t.length;n++){if(t[n].getToolbar&&t[n].getToolbar()){return false}}return true},getCreatedContainerId:function(e){var t=sap.ui.getCore().byId(e);var n=t.getParent().getId();return n}}}}},getStableElements:n};var i={name:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},aggregations:{formElements:{childNames:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},beforeMove:function(e){if(e){e._bChangedByMe=true}},afterMove:function(e){if(e){e._bChangedByMe=false}},actions:{move:function(e){if(r(e)){return{changeType:"moveSimpleFormField"}}},addODataProperty:function(t){var n=e.getAddODataFieldWithLabelSettings(t);if(n){return{changeType:"addSimpleFormField",changeOnRelevantContainer:true,changeHandlerSettings:n}}}}}},actions:{rename:function(e){return{changeType:"renameTitle",changeOnRelevantContainer:true,isEnabled:!(e.getToolbar()||!e.getTitle()),domRef:function(e){if(e.getTitle&&e.getTitle()){return e.getTitle().getDomRef()}}}},remove:function(e){return{changeType:"removeSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:!!(e.getToolbar()||e.getTitle()),getConfirmationText:function(e){var t=false;if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"&&e.getToolbar&&e.getToolbar()){var n=e.getToolbar().getContent();if(n.length>1){t=true}else if(n.length===1&&(!n[0].getMetadata().isInstanceOf("sap.ui.core.Label")&&!n[0]instanceof sap.ui.core.Title&&!n[0]instanceof sap.m.Title)){t=true}}if(t){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout.designtime");return a.getText("MSG_REMOVING_TOOLBAR")}}}}},getStableElements:n};var l={name:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},actions:{rename:{changeType:"renameLabel",changeOnRelevantContainer:true,domRef:function(e){return e.getLabel().getDomRef()}},remove:{changeType:"hideSimpleFormField",changeOnRelevantContainer:true},reveal:{changeType:"unhideSimpleFormField",changeOnRelevantContainer:true}},getStableElements:n};return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/SimpleForm.icon.svg"}},aggregations:{content:{ignore:true},title:{ignore:true},toolbar:{ignore:function(e){return!e.getToolbar()},domRef:function(e){return e.getToolbar().getDomRef()}},form:{ignore:false,propagateMetadata:function(e){var t=e.getMetadata().getName();if(t==="sap.ui.layout.form.Form"){return o}else if(t==="sap.ui.layout.form.FormContainer"){return i}else if(t==="sap.ui.layout.form.FormElement"){return l}else{return{actions:null}}},propagateRelevantContainer:true}}}},false);