/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/Context","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/odata/ODataUtils","sap/ui/model/odata/CountMode","sap/ui/model/odata/Filter","sap/ui/model/odata/OperationMode","sap/ui/model/ChangeReason","sap/ui/model/Filter","sap/ui/model/FilterProcessor","sap/ui/model/Sorter","sap/ui/model/SorterProcessor","sap/base/util/uid","sap/base/util/deepEqual","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery"],function(t,e,i,s,a,n,r,h,o,l,d,u,f,p,g,c,y){"use strict";var b=i.extend("sap.ui.model.odata.v2.ODataListBinding",{constructor:function(t,e,s,n,r,h){i.apply(this,arguments);this.sFilterParams=null;this.sSortParams=null;this.sRangeParams=null;this.sCustomParams=this.oModel.createCustomParams(this.mParameters);this.iStartIndex=0;this.iLength=0;this.bPendingChange=false;this.aAllKeys=null;this.aKeys=[];this.sCountMode=h&&h.countMode||this.oModel.sDefaultCountMode;this.sOperationMode=h&&h.operationMode||this.oModel.sDefaultOperationMode;this.bCreatePreliminaryContext=h&&h.createPreliminaryContext||t.bPreliminaryContext;this.bUsePreliminaryContext=h&&h.usePreliminaryContext||t.bPreliminaryContext;this.bRefresh=false;this.bNeedsUpdate=false;this.bDataAvailable=false;this.bIgnoreSuspend=false;this.bPendingRefresh=false;this.sGroupId=undefined;this.sRefreshGroupId=undefined;this.bLengthRequested=false;this.bUseExtendedChangeDetection=true;this.bFaultTolerant=h&&h.faultTolerant;this.bLengthFinal=false;this.iLastEndIndex=0;this.aLastContexts=null;this.aLastContextData=null;this.bInitial=true;this.mRequestHandles={};this.oCountHandle=null;this.bSkipDataEvents=false;this.bUseExpandedList=false;this.oCombinedFilter=null;this.oModel.checkFilterOperation(this.aApplicationFilters);if(h&&(h.batchGroupId||h.groupId)){this.sGroupId=h.groupId||h.batchGroupId}this.iThreshold=h&&h.threshold||0;this.bThresholdRejected=false;if(this.sCountMode==a.None){this.bThresholdRejected=true}var o=this.checkExpandedList();if(!o){this.resetData()}},metadata:{publicMethods:["getLength"]}});b.prototype.getContexts=function(t,e,i){if(this.bInitial){return[]}if(!this.bLengthFinal&&this.sOperationMode==r.Auto&&(this.sCountMode==a.Request||this.sCountMode==a.Both)){if(!this.bLengthRequested){this._getLength();this.bLengthRequested=true}return[]}if(!this.bLengthFinal&&!this.bPendingRequest&&!this.bLengthRequested){this._getLength();this.bLengthRequested=true}this.iLastLength=e;this.iLastStartIndex=t;this.iLastThreshold=i;if(!t){t=0}if(!e){e=this.oModel.iSizeLimit;if(this.bLengthFinal&&this.iLength<e){e=this.iLength}}if(!i){i=0}if(this.sOperationMode==r.Auto){if(this.iThreshold>=0){i=Math.max(this.iThreshold,i)}}var s=true,n=this._getContexts(t,e),h=[],o;if(this.useClientMode()){if(!this.aAllKeys&&!this.bPendingRequest&&this.oModel.getServiceMetadata()){this.loadData();n.dataRequested=true}}else{o=this.calculateSection(t,e,i,n);s=n.length!==e&&!(this.bLengthFinal&&n.length>=this.iLength-t);if(this.oModel.getServiceMetadata()){if(!this.bPendingRequest&&o.length>0&&(s||e<o.length)){this.loadData(o.startIndex,o.length);n.dataRequested=true}}}if(this.bRefresh){this.bRefresh=false}else{for(var l=0;l<n.length;l++){h.push(this.getContextData(n[l]))}if(this.bUseExtendedChangeDetection){if(this.aLastContexts&&t<this.iLastEndIndex){n.diff=this.diffData(this.aLastContextData,h)}}this.iLastEndIndex=t+e;this.aLastContexts=n.slice(0);this.aLastContextData=h.slice(0)}return n};b.prototype.getCurrentContexts=function(){return this.aLastContexts||[]};b.prototype.getEntryKey=function(t){return t.getPath()};b.prototype.getEntryData=function(t){return JSON.stringify(t.getObject(this.mParameters))};b.prototype._getContexts=function(t,e){var i=[],s,a;if(!t){t=0}if(!e){e=this.oModel.iSizeLimit;if(this.bLengthFinal&&this.iLength<e){e=this.iLength}}for(var n=t;n<t+e;n++){a=this.aKeys[n];if(!a){break}s=this.oModel.getContext("/"+a);s.sDeepPath=this.oModel.resolveDeep(this.sPath,this.oContext)+a.substr(a.indexOf("("));i.push(s)}return i};b.prototype.calculateSection=function(t,e,i,s){var a,n,r,h,o,l={},d;n=t;a=0;for(var u=t;u>=Math.max(t-i,0);u--){d=this.aKeys[u];if(!d){h=u+1;break}}for(var f=t+e;f<t+e+i;f++){d=this.aKeys[f];if(!d){r=f;break}}o=t-h;if(h&&t>i&&o<i){if(s.length!==e){n=t-i}else{n=h-i}a=i}n=Math.max(n,0);if(n===t){n+=s.length}if(s.length!==e){a+=e-s.length}o=r-t-e;if(o===0){a+=i}if(r&&o<i&&o>0){if(n>t){n=r;a+=i}}if(this.bLengthFinal&&this.iLength<a+n){a=this.iLength-n}l.startIndex=n;l.length=a;return l};b.prototype.setContext=function(e){var i,s=e&&e.bCreated,a=e&&e.isRefreshForced(),n=e&&e.isUpdated(),r=e&&e.isPreliminary();if(this.bInitial||!this.isRelative()){return}if(r&&!this.bUsePreliminaryContext){return}if(n&&this.bUsePreliminaryContext){this._fireChange({reason:h.Context});return}if(t.hasChanged(this.oContext,e)){this.oContext=e;i=this.oModel.resolve(this.sPath,this.oContext);if(!this._checkPathType()){g.error("List Binding is not bound against a list for "+i)}if(!i||s){if(this.aAllKeys||this.aKeys.length>0||this.iLength>0){this.aAllKeys=null;this.aKeys=[];this.iLength=0;this.bLengthFinal=true;this._fireChange({reason:h.Context})}return}this._initSortersFilters();if(this.checkExpandedList()&&!a){this.abortPendingRequest();this._fireChange({reason:h.Context})}else{this._refresh()}}};b.prototype.checkExpandedList=function(t){var e=!!this.oModel.resolve(this.sPath,this.oContext),i=this.oModel._getObject(this.sPath,this.oContext);if(!e||i===undefined||this.sOperationMode===r.Server&&(this.aApplicationFilters.length>0||this.aFilters.length>0||this.aSorters.length>0)){this.bUseExpandedList=false;this.aExpandRefs=undefined;return false}else{this.bUseExpandedList=true;if(Array.isArray(i)){if(!t&&(this.oModel._isReloadNeeded("/"+i[0],this.mParameters)||this.oModel._isReloadNeeded("/"+i[i.length-1],this.mParameters))){this.bUseExpandedList=false;this.aExpandRefs=undefined;return false}this.aExpandRefs=i;this.aAllKeys=i;this.iLength=i.length;this.bLengthFinal=true;this.bDataAvailable=true;this._initSortersFilters();this.applyFilter();this.applySort()}else{this.aExpandRefs=undefined;this.aAllKeys=null;this.aKeys=[];this.iLength=0;this.bLengthFinal=true;this.bDataAvailable=true}return true}};b.prototype.updateExpandedList=function(t){if(this.aExpandRefs){for(var e=0;e<t.length;e++){this.aExpandRefs[e]=t[e]}this.aExpandRefs.length=t.length}};b.prototype.useClientMode=function(){return this.sOperationMode===r.Client||this.sOperationMode===r.Auto&&!this.bThresholdRejected||this.sOperationMode!==r.Server&&this.bUseExpandedList};b.prototype.loadData=function(t,e){var i=this,s=false,n=f(),o;if(t||e){this.sRangeParams="$skip="+t+"&$top="+e;this.iStartIndex=t}else{t=this.iStartIndex}var l=[];if(this.sRangeParams&&!this.useClientMode()){l.push(this.sRangeParams)}if(this.sSortParams){l.push(this.sSortParams)}if(this.sFilterParams&&!this.useClientMode()){l.push(this.sFilterParams)}if(this.sCustomParams){l.push(this.sCustomParams)}if(this.sCountMode==a.InlineRepeat||!this.bLengthFinal&&(this.sCountMode===a.Inline||this.sCountMode===a.Both)){l.push("$inlinecount=allpages");s=true}function d(a){if(s&&a.__count!==undefined){i.iLength=parseInt(a.__count);i.bLengthFinal=true;if(i.sOperationMode==r.Auto){if(i.iLength<=i.mParameters.threshold){i.bThresholdRejected=false}else{i.bThresholdRejected=true;delete i.mRequestHandles[n];i.bPendingRequest=false;i.bNeedsUpdate=true;return}}}if(i.useClientMode()){i.aKeys=[];y.each(a.results,function(t,e){i.aKeys[t]=i.oModel._getKey(e)});i.updateExpandedList(i.aKeys);i.aAllKeys=i.aKeys.slice();i.iLength=i.aKeys.length;i.bLengthFinal=true;i.applyFilter();i.applySort()}else{if(a.results.length>0){y.each(a.results,function(e,s){i.aKeys[t+e]=i.oModel._getKey(s)});if(i.iLength<t+a.results.length){i.iLength=t+a.results.length;i.bLengthFinal=false}if(!a.__next&&(a.results.length<e||e===undefined)){i.iLength=t+a.results.length;i.bLengthFinal=true}}else{if(i.bFaultTolerant&&a.__next){i.iLength=t;i.bLengthFinal=true}if(t===0){i.iLength=0;i.aKeys=[];i.bLengthFinal=true}if(t===i.iLength){i.bLengthFinal=true}}}delete i.mRequestHandles[n];i.bPendingRequest=false;i.bNeedsUpdate=true;i.bIgnoreSuspend=true;i.oModel.callAfterUpdate(function(){i.fireDataReceived({data:a})})}function u(t){var e=t.statusCode==0;delete i.mRequestHandles[n];i.bPendingRequest=false;if(i.bFaultTolerant){i.iLength=i.aKeys.length;i.bLengthFinal=true;i.bDataAvailable=true}else if(!e){i.aKeys=[];i.aAllKeys=[];i.iLength=0;i.bLengthFinal=true;i.bDataAvailable=true;i._fireChange({reason:h.Change})}if(!i.bSkipDataEvents){i.fireDataReceived()}}var p=this.sPath,g=this.oContext;if(this.isRelative()){p=this.oModel.resolve(p,g)}if(p){this.bPendingRequest=true;if(!this.bSkipDataEvents){this.fireDataRequested()}this.bSkipDataEvents=false;o=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.mRequestHandles[n]=this.oModel.read(p,{groupId:o,urlParameters:l,success:d,error:u})}};b.prototype.isLengthFinal=function(){return this.bLengthFinal};b.prototype.getLength=function(){if(this.bLengthFinal||this.iLength==0){return this.iLength}else{var t=this.iLastThreshold||this.iLastLength||10;return this.iLength+t}};b.prototype._getLength=function(){var t=this;var e;if(this.sCountMode!==a.Request&&this.sCountMode!==a.Both){return}var i=[];if(this.sFilterParams&&this.sOperationMode!=r.Auto){i.push(this.sFilterParams)}if(this.mParameters&&this.mParameters.custom){var s={custom:{}};y.each(this.mParameters.custom,function(t,e){s.custom[t]=e});i.push(this.oModel.createCustomParams(s))}function n(e){t.iLength=parseInt(e);t.bLengthFinal=true;t.bLengthRequested=true;t.oCountHandle=null;if(t.sOperationMode==r.Auto){if(t.iLength<=t.mParameters.threshold){t.bThresholdRejected=false}else{t.bThresholdRejected=true}t._fireChange({reason:h.Change})}}function o(e){delete t.mRequestHandles[l];var i="Request for $count failed: "+e.message;if(e.response){i+=", "+e.response.statusCode+", "+e.response.statusText+", "+e.response.body}g.warning(i)}var l=this.oModel.resolve(this.sPath,this.oContext);if(l){l=l+"/$count";e=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.oCountHandle=this.oModel.read(l,{withCredentials:this.oModel.bWithCredentials,groupId:e,urlParameters:i,success:n,error:o})}};b.prototype.refresh=function(t,e){if(typeof t==="string"){e=t;t=false}this.sRefreshGroupId=e;this._refresh(t);this.sRefreshGroupId=undefined};b.prototype._refresh=function(t,e,i){var s=false,a=this.isRelative()&&this.oContext&&this.oContext.bCreated;if(a){return}this.bPendingRefresh=false;if(!t){if(i){var n=this.oModel.resolve(this.sPath,this.oContext);if(n){var r=this.oModel.oMetadata._getEntityTypeByPath(n);if(r&&r.entityType in i){s=true}}}if(e&&!s){y.each(this.aKeys,function(t,i){if(i in e){s=true;return false}})}if(!e&&!i){s=true}}if(t||s){if(this.bSuspended&&!this.bIgnoreSuspend&&!t){this.bPendingRefresh=true;return}this.abortPendingRequest(true);this.resetData();this._fireRefresh({reason:h.Refresh})}};b.prototype._fireRefresh=function(t){if(this.oModel.resolve(this.sPath,this.oContext)){this.bRefresh=true;this.fireEvent("refresh",t)}};b.prototype._checkPathType=function(){var t=this.oModel.resolve(this.sPath,this.oContext);if(t){if(!this._mPathType||!this._mPathType[t]){this._mPathType={};var e=t.lastIndexOf("/");var i,s;if(e>1){s=this.oModel.oMetadata._getEntityTypeByPath(t.substring(0,e));if(s){i=this.oModel.oMetadata._getEntityAssociationEnd(s,t.substring(e+1));if(i&&i.multiplicity==="*"){this._mPathType[t]=true}}}else if(e===0){var a,n=t.substring(1);a=this.oModel.oMetadata._findEntitySetByName(n);if(a){this._mPathType[t]=true}else{var r=this.oModel.oMetadata._getFunctionImportMetadataByName(n);for(var h=0;h<r.length;h++){var o=r[h];if(o.entitySet){a=this.oModel.oMetadata._findEntitySetByName(o.entitySet);if(a){this._mPathType[t]=true}}}}}}return!!this._mPathType[t]}return true};b.prototype.initialize=function(){var t=this.isRelative()&&this.oContext&&this.oContext.bCreated;if(this.oModel.oMetadata&&this.oModel.oMetadata.isLoaded()&&this.bInitial&&!t){if(!this._checkPathType()){g.error("List Binding is not bound against a list for "+this.oModel.resolve(this.sPath,this.oContext))}this.bInitial=false;this._initSortersFilters();if(!this.bSuspended){if(this.bDataAvailable){this._fireChange({reason:h.Change})}else{this._fireRefresh({reason:h.Refresh})}}}return this};b.prototype.checkUpdate=function(t,e){var i=this.sChangeReason?this.sChangeReason:h.Change,s=false,a,n=this,r;if(this.bSuspended&&!this.bIgnoreSuspend&&!t||this.bPendingRequest){return}if(this.bInitial){if(this.oContext&&this.oContext.isUpdated()){this.initialize()}return}this.bIgnoreSuspend=false;if(!t&&!this.bNeedsUpdate){r=this.aExpandRefs;var o=this.aKeys.slice();var l=this.checkExpandedList(true);if(!l&&this.useClientMode()){this.applyFilter();this.applySort()}if(!p(r,this.aExpandRefs)){s=true}else if(e){if(this.aKeys.length!==o.length){s=true}else{for(var d in e){if(this.aKeys.indexOf(d)>-1||o.indexOf(d)>-1){s=true;break}}}}else{s=true}if(s&&this.aLastContexts){s=false;var u=this._getContexts(this.iLastStartIndex,this.iLastLength,this.iLastThreshold);if(this.aLastContexts.length!==u.length){s=true}else{y.each(this.aLastContextData,function(t,e){a=n.getContextData(u[t]);if(e!==a){s=true;return false}})}}}if(t||s||this.bNeedsUpdate){this.bNeedsUpdate=false;this._fireChange({reason:i})}this.sChangeReason=undefined};b.prototype.resetData=function(){this.aKeys=[];this.aAllKeys=null;this.iLength=0;this.bLengthFinal=false;this.sChangeReason=undefined;this.bDataAvailable=false;this.bLengthRequested=false;this.bThresholdRejected=false;if(this.sCountMode==a.None){this.bThresholdRejected=true}};b.prototype.abortPendingRequest=function(t){if(!y.isEmptyObject(this.mRequestHandles)){this.bSkipDataEvents=true;y.each(this.mRequestHandles,function(t,e){e.abort()});if(t&&this.oCountHandle){this.oCountHandle.abort()}this.mRequestHandles={};this.bPendingRequest=false}};b.prototype.getDownloadUrl=function(t){var e=[],i;if(t){e.push("$format="+encodeURIComponent(t))}if(this.sSortParams){e.push(this.sSortParams)}if(this.sFilterParams){e.push(this.sFilterParams)}if(this.sCustomParams){e.push(this.sCustomParams)}i=this.oModel.resolve(this.sPath,this.oContext);if(i){return this.oModel._createRequestUrl(i,null,e)}};b.prototype.sort=function(t,e){var i=false;this.bIgnoreSuspend=true;if(!t){t=[]}if(t instanceof d){t=[t]}this.aSorters=t;if(!this.useClientMode()){this.createSortParams(t)}if(!this.bInitial){this.addComparators(t,true);if(this.useClientMode()){if(this.aAllKeys){if(t.length==0){this.applyFilter()}else{this.applySort()}this._fireChange({reason:h.Sort})}else{this.sChangeReason=h.Sort}}else{this.aKeys=[];this.abortPendingRequest(false);this.sChangeReason=h.Sort;this._fireRefresh({reason:this.sChangeReason})}this._fireSort({sorter:t});i=true}if(e){return i}else{return this}};b.prototype.addComparators=function(t,e){var i,a,n=this.oEntityType,r;if(!n){g.warning("Cannot determine sort/filter comparators, as entitytype of the collection is unkown!");return}t.forEach(function(t){if(t.aFilters){this.addComparators(t.aFilters)}else if(!t.fnCompare){i=this.oModel.oMetadata._getPropertyMetadata(n,t.sPath);a=i&&i.type;c(i,"PropertyType for property "+t.sPath+" of EntityType "+n.name+" not found!");r=s.getComparator(a);if(e){t.fnCompare=m(r)}else{t.fnCompare=r;C(a,t)}}}.bind(this))};function m(t){return function(e,i){if(e===i){return 0}if(e===null){return-1}if(i===null){return 1}return t(e,i)}}function C(t,e){switch(t){case"Edm.Decimal":case"Edm.Int64":if(typeof e.oValue1=="number"){e.oValue1=e.oValue1.toString()}if(typeof e.oValue2=="number"){e.oValue2=e.oValue2.toString()}break;case"Edm.Byte":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":if(typeof e.oValue1=="string"){e.oValue1=parseInt(e.oValue1)}if(typeof e.oValue2=="string"){e.oValue2=parseInt(e.oValue2)}break;case"Edm.Float":case"Edm.Single":case"Edm.Double":if(typeof e.oValue1=="string"){e.oValue1=parseFloat(e.oValue1)}if(typeof e.oValue2=="string"){e.oValue2=parseFloat(e.oValue2)}break;default:}}b.prototype.applySort=function(){var t=this,e;this.aKeys=u.apply(this.aKeys,this.aSorters,function(i,s){e=t.oModel.getContext("/"+i);return t.oModel.getProperty(s,e)})};b.prototype.createSortParams=function(t){this.sSortParams=s.createSortParams(t)};b.prototype.filter=function(t,i,s){var a=false;this.bIgnoreSuspend=true;if(!t){t=[]}if(t instanceof o){t=[t]}this.oModel.checkFilterOperation(t);if(i===e.Application){this.aApplicationFilters=t}else{this.aFilters=t}if(!this.aFilters||!Array.isArray(this.aFilters)){this.aFilters=[]}if(!this.aApplicationFilters||!Array.isArray(this.aApplicationFilters)){this.aApplicationFilters=[]}this.convertFilters();this.oCombinedFilter=l.combineFilters(this.aFilters,this.aApplicationFilters);if(!this.useClientMode()){this.createFilterParams(this.oCombinedFilter)}if(!this.bInitial){this.addComparators(this.aFilters);this.addComparators(this.aApplicationFilters);if(this.useClientMode()){if(this.aAllKeys){this.applyFilter();this.applySort();this._fireChange({reason:h.Filter})}else{this.sChangeReason=h.Filter}}else{this.resetData();this.abortPendingRequest(true);this.sChangeReason=h.Filter;this._fireRefresh({reason:this.sChangeReason})}if(i===e.Application){this._fireFilter({filters:this.aApplicationFilters})}else{this._fireFilter({filters:this.aFilters})}a=true}if(s){return a}else{return this}};b.prototype.convertFilters=function(){this.aFilters=this.aFilters.map(function(t){return t instanceof n?t.convert():t});this.aApplicationFilters=this.aApplicationFilters.map(function(t){return t instanceof n?t.convert():t})};b.prototype.applyFilter=function(){var t=this,e;this.oCombinedFilter=l.combineFilters(this.aFilters,this.aApplicationFilters);this.aKeys=l.apply(this.aAllKeys,this.oCombinedFilter,function(i,s){e=t.oModel.getContext("/"+i);return t.oModel.getProperty(s,e)});this.iLength=this.aKeys.length};b.prototype.createFilterParams=function(t){this.sFilterParams=s.createFilterParams(t,this.oModel.oMetadata,this.oEntityType)};b.prototype._initSortersFilters=function(){var t=this.oModel.resolve(this.sPath,this.oContext);if(!t){return}this.oEntityType=this._getEntityType();this.addComparators(this.aSorters,true);this.addComparators(this.aFilters);this.addComparators(this.aApplicationFilters);this.convertFilters();this.oCombinedFilter=l.combineFilters(this.aFilters,this.aApplicationFilters);if(!this.useClientMode()){this.createSortParams(this.aSorters);this.createFilterParams(this.oCombinedFilter)}};b.prototype._getEntityType=function(){var t=this.oModel.resolve(this.sPath,this.oContext);if(t){var e=this.oModel.oMetadata._getEntityTypeByPath(t);c(e,"EntityType for path "+t+" could not be found!");return e}return undefined};b.prototype.resume=function(){this.bIgnoreSuspend=false;this.bSuspended=false;if(this.bPendingRefresh){this._refresh()}else{this.checkUpdate()}};b.prototype.suspend=function(){if(this.bInitial){this.bPendingRefresh=true}i.prototype.suspend.apply(this,arguments)};return b});