/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExpressionParser","sap/ui/model/BindingMode","sap/ui/model/Filter","sap/ui/model/Sorter","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/JSTokenizer"],function(t,e,n,r,i,o,s){"use strict";var a={_keepBindingStrings:false};var f=/^\{\s*('|"|)[a-zA-Z$_][a-zA-Z0-9$_]*\1\s*:/;var u=/(\\[\\\{\}])|(\{)/g;var p=/([\\\{\}])/g;function c(t,e){function n(){var n,r=t.length,i=new Array(r);for(n=0;n<r;n+=1){i[n]=t[n].apply(this,arguments)}if(e){return e.apply(this,i)}return r>1?i.join(" "):i[0]}n.textFragments=e&&e.textFragments||"sap.ui.base.BindingParser: composeFormatters";return n}function l(t){var e=function(){var e=[],n=t.length,r;for(r=0;r<n;r++){if(typeof t[r]==="number"){e.push(arguments[t[r]])}else{e.push(t[r])}}return e.join("")};e.textFragments=t;return e}function d(t){var e=t.indexOf(">"),n={path:t};if(e>0){n.model=t.slice(0,e);n.path=t.slice(e+1)}return n}function h(t,e){try{a.mergeParts(t)}catch(t){i.error("Cannot merge parts: "+t.message,e,"sap.ui.base.BindingParser")}}function g(t,e){function s(e,n){if(typeof e[n]==="string"){var r,s=e[n];if(e[n][0]==="."){r=o.get(e[n].slice(1),t.oContext);e[n]=t.bStaticContext?r:r&&r.bind(t.oContext)}else{e[n]=t.bPreferContext&&o.get(e[n],t.oContext)||o.get(e[n])}if(typeof e[n]!=="function"){if(t.bTolerateFunctionsNotFound){t.aFunctionsNotFound=t.aFunctionsNotFound||[];t.aFunctionsNotFound.push(s)}else{i.error(n+" function "+s+" not found!")}}}}function a(e){var n;if(typeof e.type==="string"){if(e.type[0]==="."){n=o.get(e.type.slice(1),t.oContext)}else{n=o.get(e.type)}if(typeof n==="function"){e.type=new n(e.formatOptions,e.constraints)}else{e.type=n}delete e.formatOptions;delete e.constraints}}function f(t){if(t!=null&&typeof t==="object"){for(var e in t){s(t,e)}}}function u(t,e){var r=t[e];if(Array.isArray(r)){r.forEach(function(t,e){u(r,e)});return}if(r&&typeof r==="object"){s(r,"test");u(r,"filters");u(r,"condition");t[e]=new n(r)}}function p(t,e){var n=t[e];if(Array.isArray(n)){n.forEach(function(t,e){p(n,e)});return}if(n&&typeof n==="object"){s(n,"group");s(n,"comparator");t[e]=new r(n)}}if(typeof e==="object"){if(Array.isArray(e.parts)){e.parts.forEach(function(e){g(t,e)})}a(e);u(e,"filters");p(e,"sorter");f(e.events);s(e,"formatter");s(e,"factory");s(e,"groupHeaderFactory")}return e}function y(t,e,n){var r=s.parseJS,i,o;if(f.test(e.slice(n))){i=r(e,n);g(t,i.result);return i}o=e.indexOf("}",n);if(o<n){throw new SyntaxError("no closing braces found in '"+e+"' after pos:"+n)}return{result:d(e.slice(n+1,o)),at:o+1}}a.simpleParser=function(t,e){if(t.startsWith("{")&&t.endsWith("}")){return d(t.slice(1,-1))}};a.simpleParser.escape=function(t){return t};a.complexParser=function(n,r,i,o,s,f){var p=false,c={parts:[]},d=false,g={oContext:r,aFunctionsNotFound:undefined,bPreferContext:f,bStaticContext:s,bTolerateFunctionsNotFound:o},x=[],m,b=0,F,v;function A(e,i,o){var a=t.parse(y.bind(null,g),n,i,null,s?r:null);function f(t,e){if(t.parts){t.parts.forEach(function(e,n){if(typeof e==="string"){e=t.parts[n]={path:e}}f(e,n)});p=p||e!==undefined}else{t.mode=o}}if(e.charAt(a.at)!=="}"){throw new SyntaxError("Expected '}' and instead saw '"+e.charAt(a.at)+"' in expression binding "+e+" at position "+a.at)}a.at+=1;if(a.result){f(a.result)}else{x[x.length-1]=String(a.constant);m=true}return a}u.lastIndex=0;while((F=u.exec(n))!==null){if(b<F.index){x.push(n.slice(b,F.index))}if(F[1]){x.push(F[1].slice(1));m=true}else{x.push(c.parts.length);if(n.indexOf(":=",F.index)===F.index+1){v=A(n,F.index+3,e.OneTime)}else if(n.charAt(F.index+1)==="="){v=A(n,F.index+2,e.OneWay)}else{v=y(g,n,F.index)}if(v.result){c.parts.push(v.result);d=d||"parts"in v.result}u.lastIndex=v.at}b=u.lastIndex}if(b<n.length){x.push(n.slice(b))}if(c.parts.length>0){if(x.length===1){c=c.parts[0];d=p}else{c.formatter=l(x)}if(d){h(c,n)}if(a._keepBindingStrings){c.bindingString=n}if(g.aFunctionsNotFound){c.functionsNotFound=g.aFunctionsNotFound}return c}else if(i&&m){return x.join("")}};a.complexParser.escape=function(t){return t.replace(p,"\\$1")};a.mergeParts=function(t){var e=[],n=[];t.parts.forEach(function(t){var r,i=function(){return t},o,s=n.length;function a(){return arguments[s]}if(t&&typeof t==="object"){if(t.parts){for(o in t){if(o!=="formatter"&&o!=="parts"){throw new Error("Unsupported property: "+o)}}n=n.concat(t.parts);r=n.length;if(t.formatter){i=function(){return t.formatter.apply(this,Array.prototype.slice.call(arguments,s,r))}}else if(r-s>1){i=function(){return Array.prototype.slice.call(arguments,s,r).join(" ")}}else{i=a}}else if(t.path){n.push(t);i=a}}e.push(i)});t.parts=n;t.formatter=c(e,t.formatter)};a.parseExpression=function(e,n,r,i){return t.parse(y.bind(null,r||{}),e,n,i)};return a},true);