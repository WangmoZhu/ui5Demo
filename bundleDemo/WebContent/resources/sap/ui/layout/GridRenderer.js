/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/layout/library"],function(e,s){"use strict";var a=s.GridPosition;var i={apiVersion:2};i.render=function(s,i){var r=/^([X][L](?:[0-9]|1[0-1]))? ?([L](?:[0-9]|1[0-1]))? ?([M](?:[0-9]|1[0-1]))? ?([S](?:[0-9]|1[0-1]))?$/i;var t=/^([X][L](?:[1-9]|1[0-2]))? ?([L](?:[1-9]|1[0-2]))? ?([M](?:[1-9]|1[0-2]))? ?([S](?:[1-9]|1[0-2]))?$/i;s.openStart("div",i);s.class("sapUiRespGrid");var p=i._getCurrentMediaContainerRange(e.media.RANGESETS.SAP_STANDARD_EXTENDED).name;s.class("sapUiRespGridMedia-Std-"+p);var n=i.getHSpacing();if(n===.5){n="05"}else if(n!==0&&n!==1&&n!==2){n=1}s.class("sapUiRespGridHSpace"+n);var l=i.getVSpacing();if(l===.5){l="05"}else if(l!==0&&l!==1&&l!==2){l=1}s.class("sapUiRespGridVSpace"+l);var d=i.getPosition();if(d){d=d.toUpperCase();if(d===a.Center.toUpperCase()){s.class("sapUiRespGridPosCenter")}else if(d===a.Right.toUpperCase()){s.class("sapUiRespGridPosRight")}}var f=i.getWidth();if(f!=="100%"&&f!=="auto"&&f!=="inherit"){if(n===0){s.style("width",f)}else{s.style("width","-webkit-calc("+f+" - "+n+"rem)");s.style("width","calc("+f+" - "+n+"rem)")}}var v=i._getAccessibleRole();var c;if(v){c={role:v}}s.accessibilityState(i,c);s.openEnd();var g=i.getContent();var o=i.getDefaultSpan();var L=["","XL3","L3","M6","S12"];var S=["","XL0","L0","M0","S0"];var U=t.exec(o);var u=i._getSpanXLChanged();var R=i._getIndentXLChanged();var G=i.getDefaultIndent();var b=r.exec(G);for(var X=0;X<g.length;X++){s.openStart("div");var h=i._getLayoutDataForControl(g[X]);var C=false;if(!g[X].getVisible()){s.class("sapUiRespGridSpanInvisible")}if(h){var M=false;if(h.getLinebreak()===true){s.class("sapUiRespGridBreak")}else{if(h.getLinebreakXL()===true){M=true;s.class("sapUiRespGridBreakXL")}if(h.getLinebreakL()===true){if(!M&&!h._getLinebreakXLChanged()){s.class("sapUiRespGridBreakXL")}s.class("sapUiRespGridBreakL")}if(h.getLinebreakM()===true){s.class("sapUiRespGridBreakM")}if(h.getLinebreakS()===true){s.class("sapUiRespGridBreakS")}}var I;var k;var _=h.getSpan();if(!_||!_.lenght==0){I=U}else{I=t.exec(_);if(/XL/gi.test(_)){C=true}}if(I){for(var w=1;w<I.length;w++){var y=I[w];if(!y){y=U[w];if(!y){y=L[w]}}if(y.substr(0,1)==="L"){k=y.substr(1,2)}var B=h.getSpanXL();var D=h.getSpanL();var V=h.getSpanM();var x=h.getSpanS();y=y.toUpperCase();if(y.substr(0,2)==="XL"&&B>0&&B<13){s.class("sapUiRespGridSpanXL"+B);C=true}else if(y.substr(0,1)==="L"&&D>0&&D<13){s.class("sapUiRespGridSpanL"+D);k=D}else if(y.substr(0,1)==="M"&&V>0&&V<13){s.class("sapUiRespGridSpanM"+V)}else if(y.substr(0,1)==="S"&&x>0&&x<13){s.class("sapUiRespGridSpanS"+x)}else{if(y.substr(0,2)!=="XL"||u||C){s.class("sapUiRespGridSpan"+y)}}}if(!u&&!C){s.class("sapUiRespGridSpanXL"+k)}}var E;var H;var A=h.getIndent();if(!A||A.length==0){E=b}else{E=r.exec(A);if(/XL/gi.test(A)){R=true}}if(!E){E=b;if(!E){E=undefined}}var P=h.getIndentXL();var m=h.getIndentL();var F=h.getIndentM();var N=h.getIndentS();if(E){for(var w=1;w<E.length;w++){var T=E[w];if(!T){if(b&&b[w]){T=b[w]}else{T=S[w]}}if(T){T=T.toUpperCase();if(T.substr(0,1)==="L"){H=T.substr(1,2)}if(T.substr(0,2)==="XL"&&P>0&&P<12){s.class("sapUiRespGridIndentXL"+P);R=true}else if(T.substr(0,1)==="L"&&m>0&&m<12){s.class("sapUiRespGridIndentL"+m);H=m}else if(T.substr(0,1)==="M"&&F>0&&F<12){s.class("sapUiRespGridIndentM"+F)}else if(T.substr(0,1)==="S"&&N>0&&N<12){s.class("sapUiRespGridIndentS"+N)}else{if(!/^(XL0)? ?(L0)? ?(M0)? ?(S0)?$/.exec(T)){s.class("sapUiRespGridIndent"+T)}}}}if(!R){if(H&&H>0){s.class("sapUiRespGridIndentXL"+H)}}}if(!h.getVisibleXL()){s.class("sapUiRespGridHiddenXL")}if(!h.getVisibleL()){s.class("sapUiRespGridHiddenL")}if(!h.getVisibleM()){s.class("sapUiRespGridHiddenM")}if(!h.getVisibleS()){s.class("sapUiRespGridHiddenS")}var $=h.getMoveBackwards();if($&&$.length>0){var W=r.exec($);if(W){for(var w=1;w<W.length;w++){var j=W[w];if(j){s.class("sapUiRespGridBwd"+j.toUpperCase())}}}}var q=h.getMoveForward();if(q&&q.length>0){var z=r.exec(q);if(z){for(var w=1;w<z.length;w++){var J=z[w];if(J){s.class("sapUiRespGridFwd"+J.toUpperCase())}}}}s.class(h._sStylesInternal)}if(!h){var y="";if(U){for(var w=1;w<U.length;w++){y=U[w];if(!y){if(w===1&&U[w+1]){y="X"+U[w+1]}else{y=L[w]}}s.class("sapUiRespGridSpan"+y.toUpperCase())}}else{for(var w=1;w<L.length;w++){y=L[w];s.class("sapUiRespGridSpan"+y.toUpperCase())}}var T="";if(b){for(var w=1;w<b.length;w++){T=b[w];if(!T){if(w===1&&b[w+1]){T="X"+b[w+1]}else{T=S[w]}}if(T.substr(0,1)!=="X"&&T.substr(1,1)!=="0"||T.substr(0,1)=="X"&&T.substr(2,1)!=="0"){s.class("sapUiRespGridIndent"+T.toUpperCase())}}}}s.openEnd();s.renderControl(g[X]);s.close("div")}s.close("div")};return i},true);