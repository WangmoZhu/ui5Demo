/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery"],function(e,t,r,i,n,a){"use strict";var o=e.extend("sap.ui.core.format.NumberFormat",{constructor:function(e){throw new Error}});var s=/0+(\.0+)?/;var u={INTEGER:"integer",FLOAT:"float",CURRENCY:"currency",UNIT:"unit",PERCENT:"percent"};var c={FLOOR:"floor",CEILING:"ceiling",TOWARDS_ZERO:"towards_zero",AWAY_FROM_ZERO:"away_from_zero",HALF_FLOOR:"half_floor",HALF_CEILING:"half_ceiling",HALF_TOWARDS_ZERO:"half_towards_zero",HALF_AWAY_FROM_ZERO:"half_away_from_zero"};var l={};l[c.FLOOR]=Math.floor;l[c.CEILING]=Math.ceil;l[c.TOWARDS_ZERO]=function(e){return e>0?Math.floor(e):Math.ceil(e)};l[c.AWAY_FROM_ZERO]=function(e){return e>0?Math.ceil(e):Math.floor(e)};l[c.HALF_TOWARDS_ZERO]=function(e){return e>0?Math.ceil(e-.5):Math.floor(e+.5)};l[c.HALF_AWAY_FROM_ZERO]=function(e){return e>0?Math.floor(e+.5):Math.ceil(e-.5)};l[c.HALF_FLOOR]=function(e){return Math.ceil(e-.5)};l[c.HALF_CEILING]=Math.round;o.RoundingMode=c;o.oDefaultIntegerFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:0,groupingEnabled:false,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:true,type:u.INTEGER,showMeasure:false,style:"standard",parseAsString:false,roundingMode:o.RoundingMode.TOWARDS_ZERO,emptyString:NaN,showScale:true};o.oDefaultFloatFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:u.FLOAT,showMeasure:false,style:"standard",parseAsString:false,roundingMode:o.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};o.oDefaultPercentFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",percentSign:"%",isInteger:false,type:u.PERCENT,showMeasure:false,style:"standard",parseAsString:false,roundingMode:o.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};o.oDefaultCurrencyFormat={minIntegerDigits:1,maxIntegerDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:u.CURRENCY,showMeasure:true,currencyCode:true,currencyContext:"standard",style:"standard",customCurrencies:undefined,parseAsString:false,roundingMode:o.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true,ignorePrecision:true};o.oDefaultUnitFormat={minIntegerDigits:1,maxIntegerDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:u.UNIT,showMeasure:true,style:"standard",customUnits:undefined,allowedUnits:undefined,parseAsString:false,roundingMode:o.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};o.getInstance=function(e,t){return this.getFloatInstance(e,t)};o.getFloatInstance=function(e,t){var r=this.createInstance(e,t),i=this.getLocaleFormatOptions(r.oLocaleData,u.FLOAT);r.oFormatOptions=a.extend(false,{},this.oDefaultFloatFormat,i,e);return r};o.getIntegerInstance=function(e,t){var r=this.createInstance(e,t),i=this.getLocaleFormatOptions(r.oLocaleData,u.INTEGER);r.oFormatOptions=a.extend(false,{},this.oDefaultIntegerFormat,i,e);return r};o.getCurrencyInstance=function(e,t){var r=this.createInstance(e,t),i=e&&e.currencyContext,n=this.getLocaleFormatOptions(r.oLocaleData,u.CURRENCY,i);r.oFormatOptions=a.extend(false,{},this.oDefaultCurrencyFormat,n,e);r._defineCustomCurrencySymbols();return r};o.getUnitInstance=function(e,t){var r=this.createInstance(e,t),i=this.getLocaleFormatOptions(r.oLocaleData,u.UNIT);r.oFormatOptions=a.extend(false,{},this.oDefaultUnitFormat,i,e);return r};o.getPercentInstance=function(e,t){var r=this.createInstance(e,t),i=this.getLocaleFormatOptions(r.oLocaleData,u.PERCENT);r.oFormatOptions=a.extend(false,{},this.oDefaultPercentFormat,i,e);return r};o.createInstance=function(e,i){var o=Object.create(this.prototype),s;if(e instanceof t){i=e;e=undefined}if(!i){i=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}o.oLocale=i;o.oLocaleData=r.getInstance(i);o.oOriginalFormatOptions=e;if(e){if(e.pattern){s=this.parseNumberPattern(e.pattern);a.each(s,function(t,r){e[t]=r})}if(e.emptyString!==undefined){n(e.emptyString===""||e.emptyString===0||e.emptyString===null||e.emptyString!==e.emptyString,"The format option 'emptyString' must be either 0, null or NaN")}}return o};o.getDefaultUnitPattern=function(e){return"{0} "+e};o.getLocaleFormatOptions=function(e,t,r){var i,n;switch(t){case u.PERCENT:n=e.getPercentPattern();break;case u.CURRENCY:n=e.getCurrencyPattern(r);break;case u.UNIT:n=e.getDecimalPattern();break;default:n=e.getDecimalPattern()}i=this.parseNumberPattern(n);i.plusSign=e.getNumberSymbol("plusSign");i.minusSign=e.getNumberSymbol("minusSign");i.decimalSeparator=e.getNumberSymbol("decimal");i.groupingSeparator=e.getNumberSymbol("group");i.percentSign=e.getNumberSymbol("percentSign");i.pattern=n;switch(t){case u.UNIT:case u.FLOAT:case u.PERCENT:i.minFractionDigits=0;i.maxFractionDigits=99;break;case u.INTEGER:i.minFractionDigits=0;i.maxFractionDigits=0;i.groupingEnabled=false;break;case u.CURRENCY:i.minFractionDigits=undefined;i.maxFractionDigits=undefined;break}return i};o.parseNumberPattern=function(e){var t=0,r=0,i=0,n=false,a=0,o=0,s=e.indexOf(";"),u={Integer:0,Fraction:1},c=u.Integer;if(s!==-1){e=e.substring(0,s)}for(var l=0;l<e.length;l++){var g=e[l];switch(g){case",":if(n){a=o;o=0}n=true;break;case".":c=u.Fraction;break;case"0":if(c===u.Integer){t++;if(n){o++}}else{r++;i++}break;case"#":if(c===u.Integer){if(n){o++}}else{i++}break}}if(!a){a=o;o=0}return{minIntegerDigits:t,minFractionDigits:r,maxFractionDigits:i,groupingEnabled:n,groupingSize:a,groupingBaseSize:o}};o.prototype._defineCustomCurrencySymbols=function(){var e=this.oFormatOptions;var t=this.oLocaleData.getCurrencySymbols();var r=function(e,t){var r=[];var n;for(var a in e){n=e[a];if(r.indexOf(n)===-1){r.push(n)}else if(n!==undefined){t[n]=true;i.error("Symbol '"+n+"' is defined multiple times in custom currencies.",undefined,"NumberFormat")}}};if(e.customCurrencies&&typeof e.customCurrencies==="object"){this.mKnownCurrencySymbols={};this.mKnownCurrencyCodes={};Object.keys(e.customCurrencies).forEach(function(r){if(e.customCurrencies[r].symbol){this.mKnownCurrencySymbols[r]=e.customCurrencies[r].symbol}else{var i=e.customCurrencies[r].isoCode;if(i){this.mKnownCurrencySymbols[r]=t[i]}}this.mKnownCurrencyCodes[r]=r}.bind(this))}else{this.mKnownCurrencySymbols=t;this.mKnownCurrencyCodes=this.oLocaleData.getCustomCurrencyCodes()}this.mDuplicatedSymbols={};r(this.mKnownCurrencySymbols,this.mDuplicatedSymbols)};o.prototype.format=function(e,t){if(Array.isArray(e)){t=e[1];e=e[0]}var r="",s="",c="",l="",f="",p="",y=0,S=0,C=0,F=0,b=e<0,D=-1,R=a.extend({},this.oFormatOptions),v=this.oOriginalFormatOptions,N=R.type===u.CURRENCY&&t==="INR"&&this.oLocale.getLanguage()==="en"&&this.oLocale.getRegion()==="IN",O,E,L,I,A,M;if(e===R.emptyString||isNaN(e)&&isNaN(R.emptyString)){return""}if(t&&R.customCurrencies&&!R.customCurrencies[t]){i.error("Currency '"+t+"' is unknown.");return""}if(R.type===u.UNIT){if(R.customUnits&&typeof R.customUnits==="object"){A=R.customUnits[t]}else{M=this.oLocaleData.getUnitFromMapping(t)||t;A=this.oLocaleData.getUnitFormat(M)}R.decimals=A&&(typeof A.decimals==="number"&&A.decimals>=0)?A.decimals:R.decimals;R.precision=A&&(typeof A.precision==="number"&&A.precision>=0)?A.precision:R.precision}if(R.type==u.CURRENCY){if(R.customCurrencies&&R.customCurrencies[t]){R.decimals=R.customCurrencies[t].decimals!==undefined?R.customCurrencies[t].decimals:R.decimals}}if(R.decimals!==undefined){R.minFractionDigits=R.decimals;R.maxFractionDigits=R.decimals}if(R.shortLimit===undefined||Math.abs(e)>=R.shortLimit){L=R.shortRefNumber===undefined?e:R.shortRefNumber;E=g(L,R,this.oLocaleData,N);if(E&&E.formatString!="0"){e=e/E.magnitude;if(R.shortDecimals!==undefined){R.minFractionDigits=R.shortDecimals;R.maxFractionDigits=R.shortDecimals}else{if(v.minFractionDigits===undefined&&v.maxFractionDigits===undefined&&v.decimals===undefined&&v.precision===undefined&&v.pattern===undefined){R.precision=2;R.minFractionDigits=0;R.maxFractionDigits=99}if(v.maxFractionDigits===undefined&&v.decimals===undefined){R.maxFractionDigits=99}}R.roundingMode=o.RoundingMode.HALF_AWAY_FROM_ZERO}}if((E||!R.ignorePrecision)&&R.precision!==undefined){R.maxFractionDigits=Math.min(R.maxFractionDigits,h(e,R.precision));R.minFractionDigits=Math.min(R.minFractionDigits,R.maxFractionDigits)}if(R.type==u.PERCENT){e=o._shiftDecimalPoint(e,2)}if(R.type==u.CURRENCY){var w=this.oLocaleData.getCurrencyDigits(t);if(R.customCurrencies&&R.customCurrencies[t]&&R.customCurrencies[t].decimals!==undefined){w=R.customCurrencies[t].decimals}if(R.maxFractionDigits===undefined){R.maxFractionDigits=w}if(R.minFractionDigits===undefined){R.minFractionDigits=w}}if(typeof e==="number"){e=d(e,R.maxFractionDigits,R.roundingMode)}if(e==0){b=false}f=this.convertToDecimal(e);if(f=="NaN"){return f}if(b){f=f.substr(1)}D=f.indexOf(".");if(D>-1){r=f.substr(0,D);s=f.substr(D+1)}else{r=f}if(r.length<R.minIntegerDigits){r=r.padStart(R.minIntegerDigits,"0")}else if(r.length>R.maxIntegerDigits){r="".padStart(R.maxIntegerDigits,"?")}if(s.length<R.minFractionDigits){s=s.padEnd(R.minFractionDigits,"0")}else if(s.length>R.maxFractionDigits){s=s.substr(0,R.maxFractionDigits)}S=r.length;if(R.groupingEnabled){if(N){var x=[3,2,2],_,U=0;y=r.length;while(y>0){_=x[U%3];y-=_;if(U>0){c=R.groupingSeparator+c}if(y<0){_+=y;y=0}c=r.substr(y,_)+c;U++}}else{C=R.groupingSize;F=R.groupingBaseSize||C;y=Math.max(S-F,0)%C||C;c=r.substr(0,y);while(S-y>=F){c+=R.groupingSeparator;c+=r.substr(y,C);y+=C}c+=r.substr(y)}}else{c=r}if(b){l=R.minusSign}l+=c;if(s){l+=R.decimalSeparator+s}if(E&&E.formatString&&R.showScale&&R.type!==u.CURRENCY){I=this.oLocaleData.getPluralCategory(r+"."+s);E.formatString=this.oLocaleData.getDecimalFormat(R.style,E.key,I);l=E.formatString.replace(E.valueSubString,l);l=l.replace(/'.'/g,".")}if(R.type===u.CURRENCY){p=R.pattern;if(E&&E.formatString&&R.showScale){I=this.oLocaleData.getPluralCategory(r+"."+s);if(N){p=m("short",E.key,I)}else{p=this.oLocaleData.getCurrencyFormat("short",E.key,I)}p=p.replace(/'.'/g,".")}O=p.split(";");if(O.length===2){p=b?O[1]:O[0];if(b){l=l.substring(1)}}if(!R.currencyCode){var P;if(R.customCurrencies&&typeof R.customCurrencies==="object"){P=this.mKnownCurrencySymbols[t]}else{P=this.oLocaleData.getCurrencySymbol(t)}if(P&&P!==t){t=P}}l=this._composeCurrencyResult(p,l,t,{showMeasure:R.showMeasure,negative:b,minusSign:R.minusSign})}if(R.type===u.PERCENT){p=R.pattern;l=p.replace(/[0#.,]+/,l);l=l.replace(/%/,R.percentSign)}if(R.showMeasure&&R.type===u.UNIT){I=this.oLocaleData.getPluralCategory(r+"."+s);n(I,"Cannot find plural category for "+(r+"."+s));var T=!R.allowedUnits||R.allowedUnits.indexOf(t)>=0;if(!T){n(T,"The given unit '"+t+"' is not part of the allowed unit types: ["+R.allowedUnits.join(",")+"].");return""}if(A){p=A["unitPattern-count-"+I];if(!p){p=A["unitPattern-count-other"]}n(p,"Cannot find pattern 'unitPattern-count-"+I+"' in '"+t+"'");if(!p){return""}l=p.replace("{0}",l)}else if(!R.unitOptional){n(A,"Unit '"+t+"' is unknown");return""}}if(sap.ui.getCore().getConfiguration().getOriginInfo()){l=new String(l);l.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString()}}return l};o.prototype._composeCurrencyResult=function(e,t,r,i){var n=i.minusSign;e=e.replace(/[0#.,]+/,t);if(i.showMeasure&&r){var a="¤",o={"[:digit:]":/\d/,"[:^S:]":/[^\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/},s=e.indexOf(a),u=s<e.length/2?"after":"before",c=this.oLocaleData.getCurrencySpacing(u),l=u==="after"?r.charAt(r.length-1):r.charAt(0),g,f=o[c.currencyMatch],m=o[c.surroundingMatch],d;e=e.replace(a,r);g=u==="after"?e.charAt(s+r.length):e.charAt(s-1);if(f&&f.test(l)&&m&&m.test(g)){if(u==="after"){d=s+r.length}else{d=s}e=e.slice(0,d)+c.insertBetween+e.slice(d)}else if(i.negative&&u==="after"){n="\ufeff"+i.minusSign}}else{e=e.replace(/\s*\u00a4\s*/,"")}if(i.negative){e=e.replace(/-/,n)}return e};o.prototype.parse=function(e){var t=this.oFormatOptions,r=p(t.plusSign+t.minusSign),i=p(t.groupingSeparator),a=p(t.decimalSeparator),s="^\\s*(["+r+"]?(?:[0-9"+i+"]+|[0-9"+i+"]*"+a+"[0-9]*)(?:[eE][+-][0-9]+)?)\\s*$",c="^\\s*(["+r+"]?[0-9"+i+"]+)\\s*$",l=new RegExp(i,"g"),g=new RegExp(a,"g"),m=this.oLocaleData.getNumberSymbol("percentSign"),d=t.type===u.CURRENCY&&this.oLocale.getLanguage()==="en"&&this.oLocale.getRegion()==="IN",h,S,F,b,D=0,R,v;if(e===""){v=t.emptyString;if(t.parseAsString&&(t.emptyString===0||isNaN(t.emptyString))){v=t.emptyString+""}if(t.type===u.CURRENCY||t.type===u.UNIT){return[v,undefined]}else{return v}}b=t.type===u.PERCENT?t.pattern:this.oLocaleData.getPercentPattern();if(b.charAt(0)==="%"){s=s.slice(0,1)+"%?"+s.slice(1)}else if(b.charAt(b.length-1)==="%"){s=s.slice(0,s.length-1)+"%?"+s.slice(s.length-1)}var N;if(t.type===u.UNIT){var O;if(t.customUnits&&typeof t.customUnits==="object"){O=t.customUnits}else{O=this.oLocaleData.getUnitFormats()}n(O,"Unit patterns cannot be loaded");if(t.allowedUnits){var E={};for(var L=0;L<t.allowedUnits.length;L++){var I=t.allowedUnits[L];E[I]=O[I]}O=E}var A=y(O,e);N=A.cldrCode;if(N.length===1){F=N[0]}else if(N.length===0){if((t.unitOptional||!t.showMeasure)&&typeof e==="string"){A.numberValue=e}else{n(N.length===1,"Cannot find unit for input: '"+e+"'");return null}}else{n(N.length===1,"Ambiguous unit ["+N.join(", ")+"] for input: '"+e+"'");F=undefined}e=A.numberValue||e}var M;if(t.type===u.CURRENCY){M=C({value:e,currencySymbols:this.mKnownCurrencySymbols,customCurrencyCodes:this.mKnownCurrencyCodes,duplicatedSymbols:this.mDuplicatedSymbols,customCurrenciesAvailable:!!t.customCurrencies});if(!M){return null}e=M.numberValue;F=M.currencyCode;if(t.customCurrencies&&F===null||!t.showMeasure&&F){return null}}if(typeof e==="string"||e instanceof String){e=e.replace(/[\u202a\u200e\u202c\u202b\u200f]/g,"");e=e.replace(/\s/g,"")}R=f(e,this.oLocaleData,d);if(R){e=R.number}if(t.isInteger&&!R){h=new RegExp(c)}else{h=new RegExp(s)}if(!h.test(e)){return t.type===u.CURRENCY||t.type===u.UNIT?null:NaN}e=e.replace(l,"");e=e.replace(t.plusSign,"+");e=e.replace(t.minusSign,"-");e=e.replace(/^\+/,"");if(R){e=e.replace(g,".");e=o._shiftDecimalPoint(e,Math.round(Math.log(R.factor)/Math.LN10))}if(t.isInteger){D=t.parseAsString?e:parseInt(e)}else{e=e.replace(g,".");if(e.indexOf(m)!==-1){S=true;e=e.replace(m,"")}D=t.parseAsString?e:parseFloat(e);if(S){D=o._shiftDecimalPoint(D,-2)}}if(t.parseAsString){D=o._shiftDecimalPoint(e,0)}if(t.type===u.CURRENCY||t.type===u.UNIT){return[D,F]}return D};o.prototype.convertToDecimal=function(e){var t=""+e,r,i,n,a,o,s;if(t.indexOf("e")==-1&&t.indexOf("E")==-1){return t}var u=t.match(/^([+-]?)((\d+)(?:\.(\d+))?)[eE]([+-]?\d+)$/);r=u[1]=="-";i=u[2].replace(/\./g,"");n=u[3]?u[3].length:0;a=u[4]?u[4].length:0;o=parseInt(u[5]);if(o>0){if(o<a){s=n+o;t=i.substr(0,s)+"."+i.substr(s)}else{t=i;o-=a;for(var c=0;c<o;c++){t+="0"}}}else{if(-o<n){s=n+o;t=i.substr(0,s)+"."+i.substr(s)}else{t=i;o+=n;for(var c=0;c>o;c--){t="0"+t}t="0."+t}}if(r){t="-"+t}return t};o.prototype.getScale=function(){if(this.oFormatOptions.style!=="short"&&this.oFormatOptions.style!=="long"||this.oFormatOptions.shortRefNumber===undefined){return}var e=g(this.oFormatOptions.shortRefNumber,this.oFormatOptions,this.oLocaleData),t;if(e&&e.formatString){t=e.formatString.replace(s,"").replace(/'.'/g,".").trim();if(t){return t}}};o._shiftDecimalPoint=function(e,t){if(typeof t!=="number"){return NaN}var r="";var i=e.toString().toLowerCase().split("e");if(typeof e==="number"){t=i[1]?+i[1]+t:t;return+(i[0]+"e"+t)}else if(typeof e==="string"){if(parseFloat(e)===0&&t>=0){return e}var n=i[0].charAt(0);r=n==="-"?n:"";if(r){i[0]=i[0].slice(1)}e=i[0];var a=e.indexOf("."),o,s,u;if(a===-1){e=e+".";a=e.length-1}if(i[1]){a+=+i[1]}o=a+t;if(o<=0){e=e.padStart(e.length-o+1,"0");o=1}else if(o>=e.length-1){e=e.padEnd(o+1,"0");o=e.length-1}e=e.replace(".","");s=e.substring(0,o);u=e.substring(o);s=s.replace(/^(-?)0+(\d)/,"$1$2");return r+s+(u?"."+u:"")}else{return null}};function g(e,t,r,i){var n,a,o,u,c=t.style,l=t.precision!==undefined?t.precision:2;if(c!="short"&&c!="long"){return undefined}for(var g=0;g<15;g++){a=Math.pow(10,g);if(d(Math.abs(e)/a,l-1)<10){break}}o=a.toString();if(i){u=m(c,o,"other",true)}else{u=r.getDecimalFormat(c,o,"other")}if(!u||u=="0"){return undefined}else{n={};n.key=o;n.formatString=u;var f=u.match(s);if(f){n.valueSubString=f[0];var p=n.valueSubString.indexOf(".");if(p==-1){n.decimals=0;n.magnitude=a*Math.pow(10,1-n.valueSubString.length)}else{n.decimals=n.valueSubString.length-p-1;n.magnitude=a*Math.pow(10,1-p)}}else{return undefined}}return n}function f(e,t,r){var i,n=1,a=10,o=t.getPluralCategories(),u,c={number:undefined,factor:n},l=function(r,a,o,l){if(l){u=m(o,a.toString(),r,true)}else{u=t.getDecimalFormat(o,a.toString(),r)}if(u){u=u.replace(/[\s\u00a0\u200F]/g,"");u=u.replace(/'.'/g,".");var g=u.match(s);if(g){var f=g[0];var d=u.replace(f,"");if(!d){return}var p=e.indexOf(d);if(p>=0){i=e.replace(d,"");i=i.replace(/\u200F/g,"");n=a;n*=Math.pow(10,1-f.length);if(c.number===undefined||i.length<c.number.length){c.number=i;c.factor=n}}}}};["long","short"].forEach(function(e){a=10;while(a<1e15){for(var t=0;t<o.length;t++){var r=o[t];l(r,a,e)}a=a*10}});if(r&&!i){a=10;while(a<1e15){for(var g=0;g<o.length;g++){var f=o[g];l(f,a,"short",true)}a=a*10}}if(!i){return}return c}function m(e,t,r,i){var n,a={short:{"1000-one":"¤0000","1000-other":"¤0000","10000-one":"¤00000","10000-other":"¤00000","100000-one":"¤0 Lk","100000-other":"¤0 Lk","1000000-one":"¤00 Lk","1000000-other":"¤00 Lk","10000000-one":"¤0 Cr","10000000-other":"¤0 Cr","100000000-one":"¤00 Cr","100000000-other":"¤00 Cr","1000000000-one":"¤000 Cr","1000000000-other":"¤000 Cr","10000000000-one":"¤0000 Cr","10000000000-other":"¤0000 Cr","100000000000-one":"¤00000 Cr","100000000000-other":"¤00000 Cr","1000000000000-one":"¤0 Lk Cr","1000000000000-other":"¤0 Lk Cr","10000000000000-one":"¤00 Lk Cr","10000000000000-other":"¤00 Lk Cr","100000000000000-one":"¤0 Cr Cr","100000000000000-other":"¤0 Cr Cr"}};e="short";if(r!=="one"){r="other"}n=a[e][t+"-"+r];if(n&&i){n=n.substr(1)}return n}function d(e,t,r){if(typeof e!=="number"){return NaN}r=r||o.RoundingMode.HALF_AWAY_FROM_ZERO;t=parseInt(t);if(typeof r==="function"){e=r(e,t)}else{if(!t){return l[r](e)}e=o._shiftDecimalPoint(l[r](o._shiftDecimalPoint(e,t)),-t)}return e}function p(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}function h(e,t){var r=Math.floor(Math.log(Math.abs(e))/Math.LN10);return Math.max(0,t-r-1)}function y(e,t){var r={numberValue:undefined,cldrCode:[]};if(typeof t!=="string"){return r}var i=Number.POSITIVE_INFINITY;var n,a;for(n in e){for(a in e[n]){if(a.indexOf("unitPattern")===0){var o=e[n][a];var s=o.indexOf("{0}");var u=s>-1;if(u){var c=o.substring(0,s);var l=o.substring(s+"{0}".length);var g=t.startsWith(c)&&t.endsWith(l);var f=g&&t.substring(c.length,t.length-l.length);if(f){if(f.length<i){i=f.length;r.numberValue=f;r.cldrCode=[n]}else if(f.length===i&&r.cldrCode.indexOf(n)===-1){r.cldrCode.push(n)}}}else if(o===t){r.cldrCode=[n];var m;if(a.endsWith("-zero")){m="0"}else if(a.endsWith("-one")){m="1"}else if(a.endsWith("-two")){m="2"}r.numberValue=m;return r}}}}return r}function S(e,t){var r="",i,n;for(var a in t){n=t[a];if(e.indexOf(n)>=0&&r.length<n.length){r=n;i=a}}return{symbol:r,code:i}}function C(e){var t=e.value;var r=S(t,e.currencySymbols);if(!r.code){r=S(t,e.customCurrencyCodes);if(!r.code&&!e.customCurrenciesAvailable){var n=t.match(/(^[A-Z]{3}|[A-Z]{3}$)/);r.code=n&&n[0]}}if(r.code){var a=r.code.length-1;var o=r.code.charAt(a);var s;var u=/[\-\s]+/;if(/\d$/.test(o)){if(t.startsWith(r.code)){s=a+1;if(!u.test(t.charAt(s))){return undefined}}}else if(/^\d/.test(r.code)){if(t.endsWith(r.code)){s=t.indexOf(r.code)-1;if(!u.test(t.charAt(s))){return undefined}}}t=t.replace(r.symbol||r.code,"")}if(e.duplicatedSymbols&&e.duplicatedSymbols[r.symbol]){r.code=undefined;i.error("The parsed currency symbol '"+r.symbol+"' is defined multiple "+"times in custom currencies.Therefore the result is not distinct.")}return{numberValue:t,currencyCode:r.code||undefined}}return o});