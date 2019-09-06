/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/URI","../Element","sap/base/util/UriParameters","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,r,a,t,n){"use strict";var i=window["sap-ui-config"]||{};var o=0;if(i["xx-nosync"]==="warn"||/(?:\?|&)sap-ui-xx-nosync=(?:warn)/.exec(window.location.search)){o=1}if(i["xx-nosync"]===true||i["xx-nosync"]==="true"||/(?:\?|&)sap-ui-xx-nosync=(?:x|X|true)/.exec(window.location.search)){o=2}var s={};var u=null;var f=null;var c=[];var l=/url[\s]*\('?"?([^\'")]*)'?"?\)/;var p=new a(window.location.href).get("sap-ui-xx-no-inline-theming-parameters")!=="true";function m(){u=null}function g(r,a){var t=l.exec(r);if(t){var n=new e(t[1]);if(n.is("relative")){var i=n.absoluteTo(a).normalize().toString();r="url('"+i+"')"}}return r}function d(e,r,a){for(var t in r){if(typeof e[t]==="undefined"){e[t]=g(r[t],a)}}return e}function v(e,r){if(typeof e["default"]!=="object"){e={default:e,scopes:{}}}u=u||{};u["default"]=u["default"]||{};u["scopes"]=u["scopes"]||{};d(u["default"],e["default"],r);if(typeof e["scopes"]==="object"){for(var a in e["scopes"]){u["scopes"][a]=u["scopes"][a]||{};d(u["scopes"][a],e["scopes"][a],r)}}}function h(e){n("link[id^=sap-ui-theme-]").each(function(){e(this.getAttribute("id"))})}function y(r){var a=document.getElementById(r);if(!a){t.warning("Could not find stylesheet element with ID",r,"sap.ui.core.theming.Parameters");return}var i=a.href;var s=new e(i).filename("").query("").toString();var u=sap.ui.getCore().isThemeApplied();if(!u){t.warning("Parameters have been requested but theme is not applied, yet.","sap.ui.core.theming.Parameters")}if(u&&p){var f=n(a);var c=f.css("background-image");var l=/\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(c);if(l&&l.length>=2){var m=l[1];if(m.charAt(0)!=="{"&&m.charAt(m.length-1)!=="}"){try{m=decodeURIComponent(m)}catch(e){t.warning("Could not decode theme parameters URI from "+i)}}try{var g=n.parseJSON(m);v(g,s);return}catch(e){t.warning("Could not parse theme parameters from "+i+". Loading library-parameters.json as fallback solution.")}}}var d=i.replace(/\/library([^\/.]*)\.(?:css|less)($|[?#])/,function(e,r,a){return"/library-parameters.json"+(a?a:"")});if(o===2){t.error("[nosync] Loading library-parameters.json ignored",d,"sap.ui.core.theming.Parameters");return}else if(o===1){t.error("[nosync] Loading library-parameters.json with sync XHR",d,"sap.ui.core.theming.Parameters")}n.ajax({url:d,dataType:"json",async:false,success:function(e,r,a){if(Array.isArray(e)){for(var t=0;t<e.length;t++){var n=e[t];v(n,s)}}else{v(e,s)}},error:function(e,r,a){t.error("Could not load theme parameters from: "+d,a)}})}function b(){if(!u){v({},"");f=sap.ui.getCore().getConfiguration().getTheme();h(y)}return u}function x(){c.forEach(y);c=[]}s._addLibraryTheme=function(e){if(u){c.push("sap-ui-theme-"+e)}};function w(e){var r=b();if(e.scopeName){r=r["scopes"][e.scopeName]}else{r=r["default"]}var a=r[e.parameterName];if(typeof a==="undefined"&&typeof e.parameterName==="string"){var t=e.parameterName.indexOf(":");if(t!==-1){e.parameterName=e.parameterName.substr(t+1)}a=r[e.parameterName]}if(e.loadPendingParameters&&typeof a==="undefined"){x();a=w({parameterName:e.parameterName,scopeName:e.scopeName,loadPendingParameters:false})}return a}function N(e,r){for(var a=0;a<r.length;a++){var t=r[a];for(var n=0;n<t.length;n++){var i=t[n];var o=w({parameterName:e,scopeName:i});if(o){return o}}}return w({parameterName:e})}s._getScopes=function(e){if(e&&!u){return}var r=b();var a=Object.keys(r["scopes"]);return a};s.getActiveScopesFor=function(e){var a=[];if(e instanceof r){var t=e.getDomRef();x();var n=this._getScopes();if(t){var i=function(e){var r=t.classList;return r&&r.contains(e)};while(t){var o=n.filter(i);if(o.length>0){a.push(o)}t=t.parentNode}}else{var s=function(r){return typeof e.hasStyleClass==="function"&&e.hasStyleClass(r)};while(e){var o=n.filter(s);if(o.length>0){a.push(o)}e=typeof e.getParent==="function"&&e.getParent()}}}return a};s.get=function(e,a){var i;if(!sap.ui.getCore().isInitialized()){t.warning("Called sap.ui.core.theming.Parameters.get() before core has been initialized. "+"This could lead to bad performance and sync XHR as inline parameters might not be available, yet. "+"Consider using the API only when required, e.g. onBeforeRendering.")}if(arguments.length===0){x();var o=b();return n.extend({},o["default"])}if(!e){return undefined}if(a instanceof r){x();var u=this.getActiveScopesFor(a);if(typeof e==="string"){return N(e,u)}else if(Array.isArray(e)){var f={};for(var c=0;c<e.length;c++){var l=e[c];f[l]=N(l,u)}return f}}else{if(typeof e==="string"){i=w({parameterName:e,loadPendingParameters:true});return i}else if(Array.isArray(e)){var f={};for(var p=0;p<e.length;p++){var l=e[p];f[l]=s.get(l)}return f}}};s._setOrLoadParameters=function(e){u={default:{},scopes:{}};f=sap.ui.getCore().getConfiguration().getTheme();h(function(r){var a=r.substr(13);if(e[a]){n.extend(u["default"],e[a])}else{y(r)}})};s.reset=function(){var e=arguments[0]===true;if(!e||sap.ui.getCore().getConfiguration().getTheme()!==f){m()}};s._getThemeImage=function(e,r){e=e||"sapUiGlobalLogo";var a=s.get(e);if(a){var t=l.exec(a);if(t){a=t[1]}else if(a==="''"||a==="none"){a=null}}if(!!r&&!a){return sap.ui.resource("sap.ui.core","themes/base/img/1x1.gif")}return a};return s},true);