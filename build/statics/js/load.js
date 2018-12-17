/*****************************************************source：resources/js/jquery.min.js*****************************************************//*! jQuery v3.1.0 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.1.0",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null!=a?a<0?this[a+this.length]:this[a]:f.call(this)},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=r.isArray(d)))?(e?(e=!1,f=c&&r.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"label"in b&&b.disabled===a||"form"in b&&b.disabled===a||"form"in b&&b.disabled===!1&&(b.isDisabled===a||b.isDisabled!==!a&&("label"in b||!ea(b))!==a)}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e)}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(_,aa),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=V.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(_,aa),$.test(j[0].type)&&qa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&sa(j),!a)return G.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||$.test(a)&&qa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext,B=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,C=/^.[^:#\[\.,]*$/;function D(a,b,c){if(r.isFunction(b))return r.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return r.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(C.test(b))return r.filter(b,a,c);b=r.filter(b,a)}return r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType})}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(D(this,a||[],!1))},not:function(a){return this.pushStack(D(this,a||[],!0))},is:function(a){return!!D(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var E,F=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,G=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||E,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:F.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),B.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};G.prototype=r.fn,E=r(d);var H=/^(?:parents|prev(?:Until|All))/,I={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function J(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return J(a,"nextSibling")},prev:function(a){return J(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return a.contentDocument||r.merge([],a.childNodes)}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(I[a]||r.uniqueSort(e),H.test(a)&&e.reverse()),this.pushStack(e)}});var K=/\S+/g;function L(a){var b={};return r.each(a.match(K)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?L(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function M(a){return a}function N(a){throw a}function O(a,b,c){var d;try{a&&r.isFunction(d=a.promise)?d.call(a).done(b).fail(c):a&&r.isFunction(d=a.then)?d.call(a,b,c):b.call(void 0,a)}catch(a){c.call(void 0,a)}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,M,e),g(f,c,N,e)):(f++,j.call(a,g(f,c,M,e),g(f,c,N,e),g(f,c,M,c.notifyWith))):(d!==M&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==N&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:M,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:M)),c[2][3].add(g(0,a,r.isFunction(d)?d:N))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(O(a,g.done(h(c)).resolve,g.reject),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)O(e[c],h(c),g.reject);return g.promise()}});var P=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&P.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var Q=r.Deferred();r.fn.ready=function(a){return Q.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,holdReady:function(a){a?r.readyWait++:r.ready(!0)},ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||Q.resolveWith(d,[r]))}}),r.ready.then=Q.then;function R(){d.removeEventListener("DOMContentLoaded",R),a.removeEventListener("load",R),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",R),a.addEventListener("load",R));var S=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)S(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,
r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},T=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function U(){this.expando=r.expando+U.uid++}U.uid=1,U.prototype={cache:function(a){var b=a[this.expando];return b||(b={},T(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){r.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(K)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var V=new U,W=new U,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Y=/[A-Z]/g;function Z(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Y,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c||"false"!==c&&("null"===c?null:+c+""===c?+c:X.test(c)?JSON.parse(c):c)}catch(e){}W.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return W.hasData(a)||V.hasData(a)},data:function(a,b,c){return W.access(a,b,c)},removeData:function(a,b){W.remove(a,b)},_data:function(a,b,c){return V.access(a,b,c)},_removeData:function(a,b){V.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=W.get(f),1===f.nodeType&&!V.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),Z(f,d,e[d])));V.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){W.set(this,a)}):S(this,function(b){var c;if(f&&void 0===b){if(c=W.get(f,a),void 0!==c)return c;if(c=Z(f,a),void 0!==c)return c}else this.each(function(){W.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){W.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=V.get(a,b),c&&(!d||r.isArray(c)?d=V.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return V.get(a,c)||V.access(a,c,{empty:r.Callbacks("once memory").add(function(){V.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=V.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var $=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,_=new RegExp("^(?:([+-])=|)("+$+")([a-z%]*)$","i"),aa=["Top","Right","Bottom","Left"],ba=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ca=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function da(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&_.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ea={};function fa(a){var b,c=a.ownerDocument,d=a.nodeName,e=ea[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ea[d]=e,e)}function ga(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=V.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&ba(d)&&(e[f]=fa(d))):"none"!==c&&(e[f]="none",V.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ga(this,!0)},hide:function(){return ga(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){ba(this)?r(this).show():r(this).hide()})}});var ha=/^(?:checkbox|radio)$/i,ia=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ja=/^$|\/(?:java|ecma)script/i,ka={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ka.optgroup=ka.option,ka.tbody=ka.tfoot=ka.colgroup=ka.caption=ka.thead,ka.th=ka.td;function la(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&r.nodeName(a,b)?r.merge([a],c):c}function ma(a,b){for(var c=0,d=a.length;c<d;c++)V.set(a[c],"globalEval",!b||V.get(b[c],"globalEval"))}var na=/<|&#?\w+;/;function oa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(na.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ia.exec(f)||["",""])[1].toLowerCase(),i=ka[h]||ka._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=la(l.appendChild(f),"script"),j&&ma(g),c){k=0;while(f=g[k++])ja.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var pa=d.documentElement,qa=/^key/,ra=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,sa=/^([^.]*)(?:\.(.+)|)/;function ta(){return!0}function ua(){return!1}function va(){try{return d.activeElement}catch(a){}}function wa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)wa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ua;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(pa,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;while(j--)h=sa.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.hasData(a)&&V.get(a);if(q&&(i=q.events)){b=(b||"").match(K)||[""],j=b.length;while(j--)if(h=sa.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&V.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(V.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;c<h;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?r(e,this).index(i)>-1:r.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==va()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===va()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&r.nodeName(this,"input"))return this.click(),!1},_default:function(a){return r.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ta:ua,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:ua,isPropagationStopped:ua,isImmediatePropagationStopped:ua,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ta,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ta,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ta,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&qa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ra.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return wa(this,a,b,c,d)},one:function(a,b,c,d){return wa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ua),this.each(function(){r.event.remove(this,a,c,b)})}});var xa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,ya=/<script|<style|<link/i,za=/checked\s*(?:[^=]|=\s*.checked.)/i,Aa=/^true\/(.*)/,Ba=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ca(a,b){return r.nodeName(a,"table")&&r.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function Da(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ea(a){var b=Aa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(V.hasData(a)&&(f=V.access(a),g=V.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}W.hasData(a)&&(h=W.access(a),i=r.extend({},h),W.set(b,i))}}function Ga(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ha.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ha(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&za.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(m&&(e=oa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(la(e,"script"),Da),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,la(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ea),l=0;l<i;l++)j=h[l],ja.test(j.type||"")&&!V.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Ba,""),k))}return a}function Ia(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(la(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&ma(la(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(xa,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=la(h),f=la(a),d=0,e=f.length;d<e;d++)Ga(f[d],g[d]);if(b)if(c)for(f=f||la(a),g=g||la(h),d=0,e=f.length;d<e;d++)Fa(f[d],g[d]);else Fa(a,h);return g=la(h,"script"),g.length>0&&ma(g,!i&&la(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(T(c)){if(b=c[V.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[V.expando]=void 0}c[W.expando]&&(c[W.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return S(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(la(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return S(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!ya.test(a)&&!ka[(ia.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(la(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(la(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var Ja=/^margin/,Ka=new RegExp("^("+$+")(?!px)[a-z%]+$","i"),La=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",pa.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,pa.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Ma(a,b,c){var d,e,f,g,h=a.style;return c=c||La(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ka.test(g)&&Ja.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Na(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Oa=/^(none|table(?!-c[ea]).+)/,Pa={position:"absolute",visibility:"hidden",display:"block"},Qa={letterSpacing:"0",fontWeight:"400"},Ra=["Webkit","Moz","ms"],Sa=d.createElement("div").style;function Ta(a){if(a in Sa)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ra.length;while(c--)if(a=Ra[c]+b,a in Sa)return a}function Ua(a,b,c){var d=_.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Va(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+aa[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+aa[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+aa[f]+"Width",!0,e))):(g+=r.css(a,"padding"+aa[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+aa[f]+"Width",!0,e)));return g}function Wa(a,b,c){var d,e=!0,f=La(a),g="border-box"===r.css(a,"boxSizing",!1,f);if(a.getClientRects().length&&(d=a.getBoundingClientRect()[b]),d<=0||null==d){if(d=Ma(a,b,f),(d<0||null==d)&&(d=a.style[b]),Ka.test(d))return d;e=g&&(o.boxSizingReliable()||d===a.style[b]),d=parseFloat(d)||0}return d+Va(a,b,c||(g?"border":"content"),e,f)+"px"}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ma(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=a.style;return b=r.cssProps[h]||(r.cssProps[h]=Ta(h)||h),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=_.exec(c))&&e[1]&&(c=da(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b);return b=r.cssProps[h]||(r.cssProps[h]=Ta(h)||h),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Ma(a,b,d)),"normal"===e&&b in Qa&&(e=Qa[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Oa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?Wa(a,b,d):ca(a,Pa,function(){return Wa(a,b,d)})},set:function(a,c,d){var e,f=d&&La(a),g=d&&Va(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=_.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ua(a,c,g)}}}),r.cssHooks.marginLeft=Na(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Ma(a,"marginLeft"))||a.getBoundingClientRect().left-ca(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+aa[d]+b]=f[d]||f[d-2]||f[0];return e}},Ja.test(a)||(r.cssHooks[a+b].set=Ua)}),r.fn.extend({css:function(a,b){return S(this,function(a,b,c){var d,e,f={},g=0;if(r.isArray(b)){for(d=La(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function Xa(a,b,c,d,e){return new Xa.prototype.init(a,b,c,d,e)}r.Tween=Xa,Xa.prototype={constructor:Xa,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=Xa.propHooks[this.prop];return a&&a.get?a.get(this):Xa.propHooks._default.get(this)},run:function(a){var b,c=Xa.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Xa.propHooks._default.set(this),this}},Xa.prototype.init.prototype=Xa.prototype,Xa.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},Xa.propHooks.scrollTop=Xa.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=Xa.prototype.init,r.fx.step={};var Ya,Za,$a=/^(?:toggle|show|hide)$/,_a=/queueHooks$/;function ab(){Za&&(a.requestAnimationFrame(ab),r.fx.tick())}function bb(){return a.setTimeout(function(){Ya=void 0}),Ya=r.now()}function cb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=aa[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function db(a,b,c){for(var d,e=(gb.tweeners[b]||[]).concat(gb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function eb(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&ba(a),q=V.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],$a.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=V.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ga([a],!0),j=a.style.display||j,k=r.css(a,"display"),ga([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=V.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ga([a],!0),m.done(function(){p||ga([a]),V.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=db(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function fb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],r.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function gb(a,b,c){var d,e,f=0,g=gb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Ya||bb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:Ya||bb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(fb(k,j.opts.specialEasing);f<g;f++)if(d=gb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,db,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}r.Animation=r.extend(gb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return da(c.elem,a,_.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(K);for(var c,d=0,e=a.length;d<e;d++)c=a[d],gb.tweeners[c]=gb.tweeners[c]||[],gb.tweeners[c].unshift(b)},prefilters:[eb],prefilter:function(a,b){b?gb.prefilters.unshift(a):gb.prefilters.push(a)}}),r.speed=function(a,b,c){var e=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off||d.hidden?e.duration=0:e.duration="number"==typeof e.duration?e.duration:e.duration in r.fx.speeds?r.fx.speeds[e.duration]:r.fx.speeds._default,null!=e.queue&&e.queue!==!0||(e.queue="fx"),e.old=e.complete,e.complete=function(){r.isFunction(e.old)&&e.old.call(this),e.queue&&r.dequeue(this,e.queue)},e},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(ba).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=gb(this,r.extend({},a),f);(e||V.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=V.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&_a.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=V.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(cb(b,!0),a,d,e)}}),r.each({slideDown:cb("show"),slideUp:cb("hide"),slideToggle:cb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(Ya=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),Ya=void 0},r.fx.timer=function(a){r.timers.push(a),a()?r.fx.start():r.timers.pop()},r.fx.interval=13,r.fx.start=function(){Za||(Za=a.requestAnimationFrame?a.requestAnimationFrame(ab):a.setInterval(r.fx.tick,r.fx.interval))},r.fx.stop=function(){a.cancelAnimationFrame?a.cancelAnimationFrame(Za):a.clearInterval(Za),Za=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var hb,ib=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return S(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?hb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&r.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(K);
if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),hb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ib[b]||r.find.attr;ib[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=ib[g],ib[g]=e,e=null!=c(a,b,d)?g:null,ib[g]=f),e}});var jb=/^(?:input|select|textarea|button)$/i,kb=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return S(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):jb.test(a.nodeName)||kb.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});var lb=/[\t\r\n\f]/g;function mb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,mb(this)))});if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=mb(c),d=1===c.nodeType&&(" "+e+" ").replace(lb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=r.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,mb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=mb(c),d=1===c.nodeType&&(" "+e+" ").replace(lb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=r.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,mb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(K)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=mb(this),b&&V.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":V.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+mb(c)+" ").replace(lb," ").indexOf(b)>-1)return!0;return!1}});var nb=/\r/g,ob=/[\x20\t\r\n\f]+/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":r.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(nb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:r.trim(r.text(a)).replace(ob," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type,g=f?null:[],h=f?e+1:d.length,i=e<0?h:f?e:0;i<h;i++)if(c=d[i],(c.selected||i===e)&&!c.disabled&&(!c.parentNode.disabled||!r.nodeName(c.parentNode,"optgroup"))){if(b=r(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(r.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var pb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!pb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,pb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(V.get(h,"events")||{})[b.type]&&V.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&T(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!T(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=V.access(d,b);e||d.addEventListener(a,c,!0),V.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=V.access(d,b)-1;e?V.access(d,b,e):(d.removeEventListener(a,c,!0),V.remove(d,b))}}});var qb=a.location,rb=r.now(),sb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var tb=/\[\]$/,ub=/\r?\n/g,vb=/^(?:submit|button|image|reset|file)$/i,wb=/^(?:input|select|textarea|keygen)/i;function xb(a,b,c,d){var e;if(r.isArray(b))r.each(b,function(b,e){c||tb.test(a)?d(a,e):xb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)xb(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(r.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)xb(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&wb.test(this.nodeName)&&!vb.test(a)&&(this.checked||!ha.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:r.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(ub,"\r\n")}}):{name:b.name,value:c.replace(ub,"\r\n")}}).get()}});var yb=/%20/g,zb=/#.*$/,Ab=/([?&])_=[^&]*/,Bb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Cb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Db=/^(?:GET|HEAD)$/,Eb=/^\/\//,Fb={},Gb={},Hb="*/".concat("*"),Ib=d.createElement("a");Ib.href=qb.href;function Jb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Kb(a,b,c,d){var e={},f=a===Gb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Lb(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Mb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Nb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qb.href,type:"GET",isLocal:Cb.test(qb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Hb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Lb(Lb(a,r.ajaxSettings),b):Lb(r.ajaxSettings,a)},ajaxPrefilter:Jb(Fb),ajaxTransport:Jb(Gb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Bb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||qb.href)+"").replace(Eb,qb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(K)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Ib.protocol+"//"+Ib.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Kb(Fb,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Db.test(o.type),f=o.url.replace(zb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(yb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(sb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Ab,""),n=(sb.test(f)?"&":"?")+"_="+rb++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Hb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Kb(Gb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Mb(o,y,d)),v=Nb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Ob={0:200,1223:204},Pb=r.ajaxSettings.xhr();o.cors=!!Pb&&"withCredentials"in Pb,o.ajax=Pb=!!Pb,r.ajaxTransport(function(b){var c,d;if(o.cors||Pb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Ob[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Qb=[],Rb=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Qb.pop()||r.expando+"_"+rb++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Rb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Rb.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Rb,"$1"+e):b.jsonp!==!1&&(b.url+=(sb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Qb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=B.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=oa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=r.trim(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length};function Sb(a){return r.isWindow(a)?a:9===a.nodeType&&a.defaultView}r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),d.width||d.height?(e=f.ownerDocument,c=Sb(e),b=e.documentElement,{top:d.top+c.pageYOffset-b.clientTop,left:d.left+c.pageXOffset-b.clientLeft}):d):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),r.nodeName(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||pa})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return S(this,function(a,d,e){var f=Sb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Na(o.pixelPosition,function(a,c){if(c)return c=Ma(a,b),Ka.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return S(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.parseJSON=JSON.parse,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Tb=a.jQuery,Ub=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Ub),b&&a.jQuery===r&&(a.jQuery=Tb),r},b||(a.jQuery=a.$=r),r});
/*****************************************************source：resources/js/weui.js*****************************************************//*!
 * weui.js v1.0.0 (https://weui.io)
 * Copyright 2016, wechat ui team
 * MIT license
 */
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["weui"] = factory();
    else
        root["weui"] = factory();
})(this, function () {
    return /******/ (function (modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/
        var installedModules = {};

        /******/ 	// The require function
        /******/
        function __webpack_require__(moduleId) {

            /******/ 		// Check if module is in cache
            /******/
            if (installedModules[moduleId])
            /******/            return installedModules[moduleId].exports;

            /******/ 		// Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/            exports: {},
                /******/            id: moduleId,
                /******/            loaded: false
                /******/
            };

            /******/ 		// Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            /******/ 		// Flag the module as loaded
            /******/
            module.loaded = true;

            /******/ 		// Return the exports of the module
            /******/
            return module.exports;
            /******/
        }


        /******/ 	// expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;

        /******/ 	// expose the module cache
        /******/
        __webpack_require__.c = installedModules;

        /******/ 	// __webpack_public_path__
        /******/
        __webpack_require__.p = "";

        /******/ 	// Load entry module and return exports
        /******/
        return __webpack_require__(0);
        /******/
    })
    /************************************************************************/
    /******/([
        /* 0 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _dialog = __webpack_require__(1);

            var _dialog2 = _interopRequireDefault(_dialog);

            var _alert = __webpack_require__(7);

            var _alert2 = _interopRequireDefault(_alert);

            var _confirm = __webpack_require__(8);

            var _confirm2 = _interopRequireDefault(_confirm);

            var _toast = __webpack_require__(9);

            var _toast2 = _interopRequireDefault(_toast);

            var _loading = __webpack_require__(11);

            var _loading2 = _interopRequireDefault(_loading);

            var _actionSheet = __webpack_require__(13);

            var _actionSheet2 = _interopRequireDefault(_actionSheet);

            var _topTips = __webpack_require__(15);

            var _topTips2 = _interopRequireDefault(_topTips);

            var _searchBar = __webpack_require__(17);

            var _searchBar2 = _interopRequireDefault(_searchBar);

            var _tab = __webpack_require__(18);

            var _tab2 = _interopRequireDefault(_tab);

            var _form = __webpack_require__(19);

            var _form2 = _interopRequireDefault(_form);

            var _uploader = __webpack_require__(20);

            var _uploader2 = _interopRequireDefault(_uploader);

            var _picker = __webpack_require__(24);

            var _gallery = __webpack_require__(29);

            var _gallery2 = _interopRequireDefault(_gallery);

            var _slider = __webpack_require__(31);

            var _slider2 = _interopRequireDefault(_slider);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            exports.default = {
                dialog: _dialog2.default,
                alert: _alert2.default,
                confirm: _confirm2.default,
                toast: _toast2.default,
                loading: _loading2.default,
                actionSheet: _actionSheet2.default,
                topTips: _topTips2.default,
                searchBar: _searchBar2.default,
                tab: _tab2.default,
                form: _form2.default,
                uploader: _uploader2.default,
                picker: _picker.picker,
                datePicker: _picker.datePicker,
                gallery: _gallery2.default,
                slider: _slider2.default
            };
            module.exports = exports['default'];

            /***/
        },
        /* 1 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _dialog = __webpack_require__(6);

            var _dialog2 = _interopRequireDefault(_dialog);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var _sington = void 0;

            /**
             * dialog，弹窗，alert和confirm的父类
             *
             * @param {object=} options 配置项
             * @param {string=} options.title 弹窗的标题
             * @param {string=} options.content 弹窗的内容
             * @param {string=} options.className 弹窗的自定义类名
             * @param {array=} options.buttons 按钮配置项
             *
             * @param {string} [options.buttons[].label=确定] 按钮的文字
             * @param {string} [options.buttons[].type=primary] 按钮的类型 [primary, default]
             * @param {function} [options.buttons[].onClick=$.noop] 按钮的回调
             *
             * @example
             * weui.dialog({
             *     title: 'dialog标题',
             *     content: 'dialog内容',
             *     className: 'custom-classname',
             *     buttons: [{
             *         label: '取消',
             *         type: 'default',
             *         onClick: function () { alert('取消') }
             *     }, {
             *         label: '确定',
             *         type: 'primary',
             *         onClick: function () { alert('确定') }
             *     }]
             * });
             */
            function dialog() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                if (_sington) return _sington;

                var isAndroid = _util2.default.os.android;
                options = _util2.default.extend({
                    title: null,
                    content: '',
                    className: '',
                    buttons: [{
                        label: '确定',
                        type: 'primary',
                        onClick: _util2.default.noop
                    }],
                    isAndroid: isAndroid
                }, options);

                var $dialogWrap = (0, _util2.default)(_util2.default.render(_dialog2.default, options));
                var $dialog = $dialogWrap.find('.weui-dialog');
                var $mask = $dialogWrap.find('.weui-mask');

                function hide() {
                    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _util2.default.noop;

                    $mask.addClass('weui-animate-fade-out');
                    $dialog.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
                        $dialogWrap.remove();
                        _sington = false;
                        callback();
                    });
                }

                (0, _util2.default)('body').append($dialogWrap);
                // 不能直接把.weui-animate-fade-in加到$dialog，会导致mask的z-index有问题
                $mask.addClass('weui-animate-fade-in');
                $dialog.addClass('weui-animate-fade-in');

                $dialogWrap.on('click', '.weui-dialog__btn', function (evt) {
                    var _this = this;

                    var index = (0, _util2.default)(this).index();
                    hide(function () {
                        options.buttons[index].onClick && options.buttons[index].onClick.call(_this, evt);
                    });
                });

                _sington = $dialogWrap[0];
                _sington.hide = hide;
                return _sington;
            }

            exports.default = dialog;
            module.exports = exports['default'];

            /***/
        },
        /* 2 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            __webpack_require__(3);

            var _objectAssign = __webpack_require__(4);

            var _objectAssign2 = _interopRequireDefault(_objectAssign);

            var _balajs = __webpack_require__(5);

            var _balajs2 = _interopRequireDefault(_balajs);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            // 其实，$ 的原型就是一个数组，拥有数组的各种方法
            // 这里只是库内部使用，所以通过文档约束，不做容错校验，达到代码最小化

            /* 判断系统 */
            function _detect(ua) {
                var os = this.os = {},
                    android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
                if (android) {
                    os.android = true;
                    os.version = android[2];
                }
            }

            _detect.call(_balajs2.default, navigator.userAgent);

            (0, _objectAssign2.default)(_balajs2.default.fn, {
                /**
                 * 只能是一个 HTMLElement 元素或者 HTMLElement 数组，不支持字符串
                 * @param {Element|Element[]} $child
                 * @returns {append}
                 */
                append: function append($child) {
                    if (!($child instanceof HTMLElement)) {
                        $child = $child[0];
                    }
                    this.forEach(function ($element) {
                        $element.appendChild($child);
                    });
                    return this;
                },
                /**
                 *
                 * @returns {remove}
                 */
                remove: function remove() {
                    this.forEach(function ($element) {
                        $element.parentNode.removeChild($element);
                    });
                    return this;
                },
                /**
                 *
                 * @param selector
                 * @returns {HTMLElement}
                 */
                find: function find(selector) {
                    return (0, _balajs2.default)(selector, this);
                },
                /**
                 *
                 * @param {String} className
                 * @returns {addClass}
                 */
                addClass: function addClass(className) {
                    this.forEach(function ($element) {
                        // http://caniuse.com/#search=classList
                        $element.classList.add(className);
                    });
                    return this;
                },
                /**
                 *
                 * @param {String} className
                 * @returns {removeClass}
                 */
                removeClass: function removeClass(className) {
                    this.forEach(function ($element) {
                        // http://caniuse.com/#search=classList
                        $element.classList.remove(className);
                    });
                    return this;
                },
                /**
                 *
                 * @param index
                 * @returns {*|jQuery|HTMLElement}
                 */
                eq: function eq(index) {
                    return (0, _balajs2.default)(this[index]);
                },
                /**
                 *
                 * @returns {show}
                 */
                show: function show() {
                    this.forEach(function ($element) {
                        $element.style.display = 'block';
                    });
                    return this;
                },
                /**
                 *
                 * @returns {hide}
                 */
                hide: function hide() {
                    this.forEach(function ($element) {
                        $element.style.display = 'none';
                    });
                    return this;
                },
                /**
                 *
                 * @param html 目前只能接受字符串
                 * @returns {html}
                 */
                html: function html(_html) {
                    this.forEach(function ($element) {
                        $element.innerHTML = _html;
                    });
                    return this;
                },
                /**
                 *
                 * @param {Object} obj 目前只能接受object
                 * @returns {css}
                 */
                css: function css(obj) {
                    var _this = this;

                    Object.keys(obj).forEach(function (key) {
                        _this.forEach(function ($element) {
                            $element.style[key] = obj[key];
                        });
                    });
                    return this;
                },
                /**
                 *
                 * @param eventType
                 * @param selector
                 * @param handler
                 */
                on: function on(eventType, selector, handler) {
                    var isDelegate = typeof selector === 'string' && typeof handler === 'function';
                    if (!isDelegate) {
                        handler = selector;
                    }
                    this.forEach(function ($element) {
                        eventType.split(' ').forEach(function (event) {
                            $element.addEventListener(event, function (evt) {
                                if (isDelegate) {
                                    // http://caniuse.com/#search=closest
                                    if (this.contains(evt.target.closest(selector))) {
                                        handler.call(evt.target, evt);
                                    }
                                } else {
                                    handler.call(this, evt);
                                }
                            });
                        });
                    });
                    return this;
                },
                /**
                 *
                 * @param {String} eventType
                 * @param {String|Function} selector
                 * @param {Function=} handler
                 * @returns {off}
                 */
                off: function off(eventType, selector, handler) {
                    if (typeof selector === 'function') {
                        handler = selector;
                        selector = null;
                    }

                    this.forEach(function ($element) {
                        eventType.split(' ').forEach(function (event) {
                            if (typeof selector === 'string') {
                                $element.querySelectorAll(selector).forEach(function ($element) {
                                    $element.removeEventListener(event, handler);
                                });
                            } else {
                                $element.removeEventListener(event, handler);
                            }
                        });
                    });
                    return this;
                },
                /**
                 *
                 * @returns {Number}
                 */
                index: function index() {
                    var $element = this[0];
                    var $parent = $element.parentNode;
                    return Array.prototype.indexOf.call($parent.children, $element);
                },
                /**
                 * @desc 因为off方法目前不可以移除绑定的匿名函数，现在直接暴力移除所有listener
                 * @returns {offAll}
                 */
                offAll: function offAll() {
                    var _this2 = this;

                    this.forEach(function ($element, index) {
                        var clone = $element.cloneNode(true);
                        $element.parentNode.replaceChild(clone, $element);

                        _this2[index] = clone;
                    });
                    return this;
                },
                /**
                 *
                 * @returns {*}
                 */
                val: function val() {
                    var _arguments = arguments;

                    if (arguments.length) {
                        this.forEach(function ($element) {
                            $element.value = _arguments[0];
                        });
                        return this;
                    }
                    return this[0].value;
                },
                /**
                 *
                 * @returns {*}
                 */
                attr: function attr() {
                    var _arguments2 = arguments,
                        _this3 = this;

                    if (_typeof(arguments[0]) == 'object') {
                        var _ret = function () {
                            var attrsObj = _arguments2[0];
                            var that = _this3;
                            Object.keys(attrsObj).forEach(function (attr) {
                                that.forEach(function ($element) {
                                    $element.setAttribute(attr, attrsObj[attr]);
                                });
                            });
                            return {
                                v: _this3
                            };
                        }();

                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                    }

                    if (typeof arguments[0] == 'string' && arguments.length < 2) {
                        return this[0].getAttribute(arguments[0]);
                    }

                    this.forEach(function ($element) {
                        $element.setAttribute(_arguments2[0], _arguments2[1]);
                    });
                    return this;
                }
            });

            (0, _objectAssign2.default)(_balajs2.default, {
                extend: _objectAssign2.default,
                /**
                 * noop
                 */
                noop: function noop() {
                },
                /**
                 * render
                 * 取值：<%= variable %>
                 * 表达式：<% if {} %>
                 * 例子：
                 *  <div>
                 *    <div class="weui-mask"></div>
                 *    <div class="weui-dialog">
                 *    <% if(typeof title === 'string'){ %>
                 *           <div class="weui-dialog__hd"><strong class="weui-dialog__title"><%=title%></strong></div>
                 *    <% } %>
                 *    <div class="weui-dialog__bd"><%=content%></div>
                 *    <div class="weui-dialog__ft">
                 *    <% for(var i = 0; i < buttons.length; i++){ %>
                 *        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_<%=buttons[i]['type']%>"><%=buttons[i]['label']%></a>
                 *    <% } %>
                 *    </div>
                 *    </div>
                 *  </div>
                 * A very simple template engine
                 * @param {String} tpl
                 * @param {Object=} data
                 * @returns {String}
                 */
                render: function render(tpl, data) {
                    var code = 'var p=[],print=function(){p.push.apply(p,arguments);};with(this){p.push(\'' + tpl.replace(/[\r\t\n]/g, ' ').split('<%').join('\t').replace(/((^|%>)[^\t]*)'/g, '$1\r').replace(/\t=(.*?)%>/g, '\',$1,\'').split('\t').join('\');').split('%>').join('p.push(\'').split('\r').join('\\\'') + '\');}return p.join(\'\');';
                    return new Function(code).apply(data);
                },
                /**
                 * getStyle 获得元素计算后的样式值
                 */
                getStyle: function getStyle(el, styleProp) {
                    var value,
                        defaultView = (el.ownerDocument || document).defaultView;
                    // W3C standard way:
                    if (defaultView && defaultView.getComputedStyle) {
                        // sanitize property name to css notation
                        // (hypen separated words eg. font-Size)
                        styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
                        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
                    } else if (el.currentStyle) {
                        // IE
                        // sanitize property name to camelCase
                        styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                            return letter.toUpperCase();
                        });
                        value = el.currentStyle[styleProp];
                        // convert other units to pixels on IE
                        if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                            return function (value) {
                                var oldLeft = el.style.left,
                                    oldRsLeft = el.runtimeStyle.left;
                                el.runtimeStyle.left = el.currentStyle.left;
                                el.style.left = value || 0;
                                value = el.style.pixelLeft + 'px';
                                el.style.left = oldLeft;
                                el.runtimeStyle.left = oldRsLeft;
                                return value;
                            }(value);
                        }
                        return value;
                    }
                }
            });

            exports.default = _balajs2.default;
            module.exports = exports['default'];

            /***/
        },
        /* 3 */
        /***/ function (module, exports) {

            // element-closest | CC0-1.0 | github.com/jonathantneal/closest

            (function (ElementProto) {
                if (typeof ElementProto.matches !== 'function') {
                    ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
                        var element = this;
                        var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
                        var index = 0;

                        while (elements[index] && elements[index] !== element) {
                            ++index;
                        }

                        return Boolean(elements[index]);
                    };
                }

                if (typeof ElementProto.closest !== 'function') {
                    ElementProto.closest = function closest(selector) {
                        var element = this;

                        while (element && element.nodeType === 1) {
                            if (element.matches(selector)) {
                                return element;
                            }

                            element = element.parentNode;
                        }

                        return null;
                    };
                }
            })(window.Element.prototype);


            /***/
        },
        /* 4 */
        /***/ function (module, exports) {

            'use strict';
            /* eslint-disable no-unused-vars */
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var propIsEnumerable = Object.prototype.propertyIsEnumerable;

            function toObject(val) {
                if (val === null || val === undefined) {
                    throw new TypeError('Object.assign cannot be called with null or undefined');
                }

                return Object(val);
            }

            function shouldUseNative() {
                try {
                    if (!Object.assign) {
                        return false;
                    }

                    // Detect buggy property enumeration order in older V8 versions.

                    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
                    var test1 = new String('abc');  // eslint-disable-line
                    test1[5] = 'de';
                    if (Object.getOwnPropertyNames(test1)[0] === '5') {
                        return false;
                    }

                    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                    var test2 = {};
                    for (var i = 0; i < 10; i++) {
                        test2['_' + String.fromCharCode(i)] = i;
                    }
                    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                        return test2[n];
                    });
                    if (order2.join('') !== '0123456789') {
                        return false;
                    }

                    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                    var test3 = {};
                    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
                        test3[letter] = letter;
                    });
                    if (Object.keys(Object.assign({}, test3)).join('') !==
                        'abcdefghijklmnopqrst') {
                        return false;
                    }

                    return true;
                } catch (e) {
                    // We don't expect any of the above to throw, but better to be safe.
                    return false;
                }
            }

            module.exports = shouldUseNative() ? Object.assign : function (target, source) {
                var from;
                var to = toObject(target);
                var symbols;

                for (var s = 1; s < arguments.length; s++) {
                    from = Object(arguments[s]);

                    for (var key in from) {
                        if (hasOwnProperty.call(from, key)) {
                            to[key] = from[key];
                        }
                    }

                    if (Object.getOwnPropertySymbols) {
                        symbols = Object.getOwnPropertySymbols(from);
                        for (var i = 0; i < symbols.length; i++) {
                            if (propIsEnumerable.call(from, symbols[i])) {
                                to[symbols[i]] = from[symbols[i]];
                            }
                        }
                    }
                }

                return to;
            };


            /***/
        },
        /* 5 */
        /***/ function (module, exports, __webpack_require__) {

            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function (root, $) {
                $ = (function (document, s_addEventListener, s_querySelectorAll) {
                    function $(s, context, bala) {
                        bala = Object.create($.fn);

                        s && bala.push.apply(bala, // if s is truly then push the following
                            s[s_addEventListener] // if arg is node or window,
                                ? [s] // then pass [s]
                                : "" + s === s // else if arg is a string
                                ? /</.test(s) // if the string contains "<" (if HTML code is passed)
                                    // then parse it and return node.children
                                    // use 'addEventListener' (HTMLUnknownElement) if content is not presented
                                    ? ((context = document.createElement(context || s_addEventListener)).innerHTML = s
                                        , context.children)
                                    : context // else if context is truly
                                        ? ((context = $(context)[0]) // if context element is found
                                            ? context[s_querySelectorAll](s) // then select element from context
                                            : bala) // else pass [] (context isn't found)
                                        : document[s_querySelectorAll](s) // else select elements globally
                                : typeof s == 'function' // else if function is passed
                                    // if DOM is ready
                                    // readyState[7] means readyState value is "interactive" or "complete" (not "loading")
                                    ? document.readyState[7]
                                        ? s() // then run given function
                                        : document[s_addEventListener]('DOMContentLoaded', s) // else wait for DOM ready
                                    : s); // else guessing that s variable is array-like Object

                        return bala;
                    }

                    $.fn = [];

                    $.one = function (s, context) {
                        return $(s, context)[0] || null;
                    };

                    return $;
                })(document, 'addEventListener', 'querySelectorAll');


                if (true) {
                    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                        return $;
                    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                } else if (typeof module == 'object' && module.exports) {
                    module.exports = $;
                } else {
                    root.$ = $;
                }
            })(this);


            /***/
        },
        /* 6 */
        /***/ function (module, exports) {

            module.exports = "<div class=\"<%=className%>\"> <div class=weui-mask></div> <div class=\"weui-dialog <% if(isAndroid){ %> weui-skin_android <% } %>\"> <% if(title){ %> <div class=weui-dialog__hd><strong class=weui-dialog__title><%=title%></strong></div> <% } %> <div class=weui-dialog__bd><%=content%></div> <div class=weui-dialog__ft> <% for(var i = 0; i < buttons.length; i++){ %> <a href=javascript:; class=\"weui-dialog__btn weui-dialog__btn_<%=buttons[i]['type']%>\"><%=buttons[i]['label']%></a> <% } %> </div> </div> </div> ";

            /***/
        },
        /* 7 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _dialog = __webpack_require__(1);

            var _dialog2 = _interopRequireDefault(_dialog);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            /**
             * alert 警告弹框，功能类似于浏览器自带的 alert 弹框，用于提醒、警告用户简单扼要的信息，只有一个“确认”按钮，点击“确认”按钮后关闭弹框。
             * @param {string} content 弹窗内容
             * @param {function=} yes 点击确定按钮的回调
             * @param {object=} options 配置项
             * @param {string=} options.title 弹窗的标题
             * @param {string=} options.className 自定义类名
             * @param {array=} options.buttons 按钮配置项，详情参考dialog
             *
             * @example
             * weui.alert('普通的alert');
             * weui.alert('带回调的alert', function(){ console.log('ok') });
             * weui.alert('自定义标题的alert', { title: '自定义标题' });
             * weui.alert('带回调的自定义标题的alert', function(){
             *    console.log('ok')
             * }, {
             *    title: '自定义标题'
             * });
             * weui.alert('自定义按钮的alert', {
             *     title: '自定义按钮的alert',
             *     buttons: [{
             *         label: 'OK',
             *         type: 'primary',
             *         onClick: function(){ console.log('ok') }
             *     }]
             * });
             */
            function alert() {
                var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var yes = arguments[1];
                var options = arguments[2];

                var type = (typeof yes === 'undefined' ? 'undefined' : _typeof(yes)) === 'object';
                if (type) {
                    options = yes;
                }

                options = _util2.default.extend({
                    content: content,
                    buttons: [{
                        label: '确定',
                        type: 'primary',
                        onClick: type ? _util2.default.noop : yes
                    }]
                }, options);

                return (0, _dialog2.default)(options);
            }

            exports.default = alert;
            module.exports = exports['default'];

            /***/
        },
        /* 8 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _dialog = __webpack_require__(1);

            var _dialog2 = _interopRequireDefault(_dialog);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            /**
             * 确认弹窗
             * @param {string} content 弹窗内容
             * @param {function=} yes 点击确定按钮的回调
             * @param {function=} no  点击取消按钮的回调
             * @param {object=} options 配置项
             * @param {string=} options.title 弹窗的标题
             * @param {string=} options.className 自定义类名
             * @param {array=} options.buttons 按钮配置项，详情参考dialog
             *
             * @example
             * weui.confirm('普通的confirm');
             * weui.confirm('自定义标题的confirm', { title: '自定义标题' });
             * weui.confirm('带回调的confirm', function(){ console.log('yes') }, function(){ console.log('no') });
             * weui.confirm('带回调的自定义标题的confirm', function(){ console.log('yes') }, function(){ console.log('no') }, {
             *     title: '自定义标题'
             * });
             * weui.confirm('自定义按钮的confirm', {
             *     title: '自定义按钮的confirm',
             *     buttons: [{
             *         label: 'NO',
             *         type: 'default',
             *         onClick: function(){ console.log('no') }
             *     }, {
             *         label: 'YES',
             *         type: 'primary',
             *         onClick: function(){ console.log('yes') }
             *     }]
             * });
             */
            function confirm() {
                var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var yes = arguments[1];
                var no = arguments[2];
                var options = arguments[3];

                var type = (typeof yes === 'undefined' ? 'undefined' : _typeof(yes)) === 'object';
                if (type) {
                    options = yes;
                }

                options = _util2.default.extend({
                    content: content,
                    buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: type ? _util2.default.noop : no
                    }, {
                        label: '确定',
                        type: 'primary',
                        onClick: type ? _util2.default.noop : yes
                    }]
                }, options);

                return (0, _dialog2.default)(options);
            }

            exports.default = confirm;
            module.exports = exports['default'];

            /***/
        },
        /* 9 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _toast = __webpack_require__(10);

            var _toast2 = _interopRequireDefault(_toast);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var _sington = void 0;

            /**
             * toast 一般用于操作成功时的提示场景
             * @param {string} content toast的文字
             * @param {Object|function=} options 配置项或回调
             * @param {number=} [options.duration=3000] 多少毫秒后关闭toast
             * @param {function=} options.callback 关闭后的回调
             * @param {string=} options.className 自定义类名
             *
             * @example
             * weui.toast('操作成功', 3000);
             * weui.toast('操作成功', {
             *     duration: 3000,
             *     className: 'custom-classname',
             *     callback: function(){ console.log('close') }
             * });
             */
            function toast() {
                var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                if (_sington) return _sington;

                if (typeof options === 'number') {
                    options = {
                        duration: options
                    };
                }
                if (typeof options === 'function') {
                    options = {
                        callback: options
                    };
                }

                options = _util2.default.extend({
                    content: content,
                    duration: 3000,
                    callback: _util2.default.noop,
                    className: ''
                }, options);

                var $toastWrap = (0, _util2.default)(_util2.default.render(_toast2.default, options));
                var $toast = $toastWrap.find('.weui-toast');
                var $mask = $toastWrap.find('.weui-mask');

                (0, _util2.default)('body').append($toastWrap);
                $toast.addClass('weui-animate-fade-in');
                $mask.addClass('weui-animate-fade-in');

                setTimeout(function () {
                    $mask.addClass('weui-animate-fade-out');
                    $toast.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
                        $toastWrap.remove();
                        _sington = false;
                        options.callback();
                    });
                }, options.duration);

                _sington = $toastWrap[0];
                return $toastWrap[0];
            }

            exports.default = toast;
            module.exports = exports['default'];

            /***/
        },
        /* 10 */
        /***/ function (module, exports) {

            module.exports = "<div class=\"<%= className %>\"> <div class=weui-mask_transparent></div> <div class=weui-toast> <i class=\"weui-icon_toast weui-icon-success-no-circle\"></i> <p class=weui-toast__content><%=content%></p> </div> </div> ";

            /***/
        },
        /* 11 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _loading = __webpack_require__(12);

            var _loading2 = _interopRequireDefault(_loading);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var _sington = void 0;

            /**
             * loading
             * @param {string} content loading的文字
             * @param {object=} options 配置项
             * @param {string=} options.className 自定义类名
             *
             * @example
             * var loading = weui.loading('loading', {
             *     className: 'custom-classname'
             * });
             * setTimeout(function () {
             *     loading.hide();
             * }, 3000);
             */
            function loading() {
                var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                if (_sington) return _sington;

                options = _util2.default.extend({
                    content: content,
                    className: ''
                }, options);

                var $loading = (0, _util2.default)(_util2.default.render(_loading2.default, options));

                function hide() {
                    $loading.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
                        $loading.remove();
                        _sington = false;
                    });
                }

                (0, _util2.default)('body').append($loading);
                $loading.addClass('weui-animate-fade-in');

                _sington = $loading[0];
                _sington.hide = hide;
                return _sington;
            }

            exports.default = loading;
            module.exports = exports['default'];

            /***/
        },
        /* 12 */
        /***/ function (module, exports) {

            module.exports = "<div class=\"weui-loading_toast <%= className %>\"> <div class=weui-mask_transparent></div> <div class=weui-toast> <i class=\"weui-loading weui-icon_toast\"></i> <p class=weui-toast__content><%=content%></p> </div> </div> ";

            /***/
        },
        /* 13 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _actionSheet = __webpack_require__(14);

            var _actionSheet2 = _interopRequireDefault(_actionSheet);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var _sington = void 0;

            /**
             * actionsheet 弹出式菜单
             * @param {array} menus 上层的选项
             * @param {string} menus[].label 选项的文字
             * @param {function} menus[].onClick 选项点击时的回调
             *
             * @param {array} actions 下层的选项
             * @param {string} actions[].label 选项的文字
             * @param {function} actions[].onClick 选项点击时的回调
             *
             * @param {object=} options 配置项
             * @param {string=} options.className 自定义类名
             *
             * @example
             * weui.actionSheet([
             *     {
             *         label: '拍照',
             *         onClick: function () {
             *             console.log('拍照');
             *         }
             *     }, {
             *         label: '从相册选择',
             *         onClick: function () {
             *             console.log('从相册选择');
             *         }
             *     }, {
             *         label: '其他',
             *         onClick: function () {
             *             console.log('其他');
             *         }
             *     }
             * ], [
             *     {
             *         label: '取消',
             *         onClick: function () {
             *             console.log('取消');
             *         }
             *     }
             * ], {
             *     className: 'custom-classname'
             * });
             */
            function actionSheet() {
                var menus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                if (_sington) return _sington;

                var isAndroid = _util2.default.os.android;
                options = _util2.default.extend({
                    menus: menus,
                    actions: actions,
                    className: '',
                    isAndroid: isAndroid
                }, options);
                var $actionSheetWrap = (0, _util2.default)(_util2.default.render(_actionSheet2.default, options));
                var $actionSheet = $actionSheetWrap.find('.weui-actionsheet');
                var $actionSheetMask = $actionSheetWrap.find('.weui-mask');

                function hide() {
                    $actionSheet.addClass(isAndroid ? 'weui-animate-fade-out' : 'weui-animate-slide-down');
                    $actionSheetMask.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
                        $actionSheetWrap.remove();
                        _sington = false;
                    });
                }

                (0, _util2.default)('body').append($actionSheetWrap);

                // 这里获取一下计算后的样式，强制触发渲染. fix IOS10下闪现的问题
                _util2.default.getStyle($actionSheet[0], 'transform');

                $actionSheet.addClass(isAndroid ? 'weui-animate-fade-in' : 'weui-animate-slide-up');
                $actionSheetMask.addClass('weui-animate-fade-in').on('click', hide);
                $actionSheetWrap.find('.weui-actionsheet__menu').on('click', '.weui-actionsheet__cell', function (evt) {
                    var that = this;
                    while (!that.classList.contains('weui-actionsheet__cell')) {
                        that = that.parentNode;
                    }
                    ;
                    var index = (0, _util2.default)(that).index();
                    menus[index].onClick.call(that, evt);
                    hide();
                });
                $actionSheetWrap.find('.weui-actionsheet__action').on('click', '.weui-actionsheet__cell', function (evt) {
                    var index = (0, _util2.default)(this).index();
                    actions[index].onClick.call(this, evt);
                    hide();
                });

                _sington = $actionSheetWrap[0];
                _sington.hide = hide;
                return _sington;
            }

            exports.default = actionSheet;
            module.exports = exports['default'];

            /***/
        },
        /* 14 */
        /***/ function (module, exports) {

            module.exports = "<div class=\"<% if(isAndroid){ %>weui-skin_android <% } %><%= className %>\"> <div class=weui-mask></div> <div class=weui-actionsheet> <div class=weui-actionsheet__menu> <% for(var i = 0; i < menus.length; i++){ %> <div class=weui-actionsheet__cell><%= menus[i].label %></div> <% } %> </div> <div class=weui-actionsheet__action> <% for(var j = 0; j < actions.length; j++){ %> <div class=weui-actionsheet__cell><%= actions[j].label %></div> <% } %> </div> </div> </div> ";

            /***/
        },
        /* 15 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _topTips = __webpack_require__(16);

            var _topTips2 = _interopRequireDefault(_topTips);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var _toptips = null;

            /**
             * toptips 顶部报错提示
             * @param {string} content 报错的文字
             * @param {number|function|object=} options 多少毫秒后消失|消失后的回调|配置项
             * @param {number=} [options.duration=3000] 多少毫秒后消失
             * @param {function=} options.callback 消失后的回调
             *
             * @example
             * weui.topTips('请填写正确的字段');
             * weui.topTips('请填写正确的字段', 3000);
             * weui.topTips('请填写正确的字段', function(){ console.log('close') });
             * weui.topTips('请填写正确的字段', {
             *     duration: 3000,
             *     className: 'custom-classname',
             *     callback: function(){ console.log('close') }
             * });
             */
            function topTips(content) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                if (typeof options === 'number') {
                    options = {
                        duration: options
                    };
                }

                if (typeof options === 'function') {
                    options = {
                        callback: options
                    };
                }

                options = _util2.default.extend({
                    content: content,
                    duration: 3000,
                    callback: _util2.default.noop,
                    className: ''
                }, options);

                var $topTips = (0, _util2.default)(_util2.default.render(_topTips2.default, options));

                function hide() {
                    $topTips.remove();
                    options.callback();
                    _toptips = null;
                }

                (0, _util2.default)('body').append($topTips);
                if (_toptips) {
                    clearTimeout(_toptips.timeout);
                    _toptips.hide();
                }

                _toptips = {
                    hide: hide
                };
                _toptips.timeout = setTimeout(hide, options.duration);

                $topTips[0].hide = hide;
                return $topTips[0];
            }

            exports.default = topTips;
            module.exports = exports['default'];

            /***/
        },
        /* 16 */
        /***/ function (module, exports) {

            module.exports = "<div class=\"weui-toptips weui-toptips_warn <%= className %>\" style=display:block><%= content %></div> ";

            /***/
        },
        /* 17 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            /**
             * searchbar 搜索框，主要实现搜索框组件一些显隐逻辑
             * @param {string} selector searchbar的selector
             *
             * @example
             * weui.searchBar('#searchBar');
             */
            function searchBar(selector) {
                var $eles = (0, _util2.default)(selector);

                $eles.forEach(function (ele) {
                    var $searchBar = (0, _util2.default)(ele);
                    var $searchLabel = $searchBar.find('.weui-search-bar__label');
                    var $searchInput = $searchBar.find('.weui-search-bar__input');
                    var $searchClear = $searchBar.find('.weui-icon-clear');
                    var $searchCancel = $searchBar.find('.weui-search-bar__cancel-btn');

                    function cancelSearch() {
                        $searchInput.val('');
                        $searchBar.removeClass('weui-search-bar_focusing');
                    }

                    $searchLabel.on('click', function () {
                        $searchBar.addClass('weui-search-bar_focusing');
                        $searchInput[0].focus();
                    });
                    $searchInput.on('blur', function () {
                        if (!this.value.length) cancelSearch();
                    });
                    $searchClear.on('click', function () {
                        $searchInput.val('');
                        $searchInput[0].focus();
                    });
                    $searchCancel.on('click', function () {
                        cancelSearch();
                        $searchInput[0].blur();
                    });
                });

                return $eles;
            }

            exports.default = searchBar;
            module.exports = exports['default'];

            /***/
        },
        /* 18 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            /**
             * tab tab导航栏
             * @param {string} selector tab的selector
             * @param {object=} options 配置项
             * @param {number=} [options.defaultIndex=0] 初始展示的index
             * @param {function=} options.onChange 点击tab时，返回对应的index
             *
             * @example
             * weui.tab('#tab',{
             *     defaultIndex: 0,
             *     onChange: function(index){
             *         console.log(index);
             *     }
             * });
             */
            function tab(selector) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var $eles = (0, _util2.default)(selector);
                options = _util2.default.extend({
                    defaultIndex: 0,
                    onChange: _util2.default.noop
                }, options);

                $eles.forEach(function (ele) {
                    var $tab = (0, _util2.default)(ele);
                    var $tabItems = $tab.find('.weui-navbar__item, .weui-tabbar__item');
                    var $tabContents = $tab.find('.weui-tab__content');

                    $tabItems.eq(options.defaultIndex).addClass('weui-bar__item_on');
                    $tabContents.eq(options.defaultIndex).show();

                    $tabItems.on('click', function () {
                        var $this = (0, _util2.default)(this),
                            index = $this.index();

                        $tabItems.removeClass('weui-bar__item_on');
                        $this.addClass('weui-bar__item_on');

                        $tabContents.hide();
                        $tabContents.eq(index).show();

                        options.onChange.call(this, index);
                    });
                });

                return this;
            }

            exports.default = tab;
            module.exports = exports['default'];

            /***/
        },
        /* 19 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _topTips = __webpack_require__(15);

            var _topTips2 = _interopRequireDefault(_topTips);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function _findCellParent(ele) {
                if (!ele || !ele.classList) return null;
                if (ele.classList.contains('weui-cell')) return ele;
                return _findCellParent(ele.parentNode);
            }

            function _validate($input, $form, regexp) {
                var input = $input[0],
                    val = $input.val();

                if (input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') {
                    var reg = input.getAttribute('required') || input.getAttribute('pattern') || '';

                    if (input.type == 'radio') {
                        var radioInputs = $form.find('input[type="radio"][name="' + input.name + '"]');
                        for (var i = 0, len = radioInputs.length; i < len; ++i) {
                            if (radioInputs[i].checked) return null;
                        }
                        return 'empty';
                    } else if (input.type == 'checkbox') {
                        if (reg) {
                            var _ret = function () {
                                var checkboxInputs = $form.find('input[type="checkbox"][name="' + input.name + '"]');
                                var regs = reg.replace(/[{\s}]/g, '').split(',');
                                var count = 0;

                                if (regs.length != 2) {
                                    throw input.outerHTML + ' regexp is wrong.';
                                }

                                checkboxInputs.forEach(function (checkboxInput) {
                                    if (checkboxInput.checked) ++count;
                                });

                                if (!count) return {
                                    v: 'empty'
                                };

                                if (regs[1] === '') {
                                    // {0,}
                                    if (count >= parseInt(regs[0])) {
                                        return {
                                            v: null
                                        };
                                    } else {
                                        return {
                                            v: 'notMatch'
                                        };
                                    }
                                } else {
                                    // {0,2}
                                    if (parseInt(regs[0]) <= count && count <= parseInt(regs[1])) {
                                        return {
                                            v: null
                                        };
                                    } else {
                                        return {
                                            v: 'notMatch'
                                        };
                                    }
                                }
                            }();

                            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                        } else {
                            return input.checked ? null : 'empty';
                        }
                    } else if (!$input.val().length) {
                        return 'empty';
                    } else if (reg) {
                        if (/^REG_/.test(reg)) {
                            if (!regexp) throw 'RegExp ' + reg + ' is empty.';

                            reg = reg.replace(/^REG_/, '');
                            if (!regexp[reg]) throw 'RegExp ' + reg + ' has not found.';

                            reg = regexp[reg];
                        }
                        return new RegExp(reg).test(val) ? null : 'notMatch';
                    } else {
                        return null;
                    }
                } else if (val.length) {
                    // 有输入值
                    return null;
                }

                return 'empty';
            }

            function _showErrorMsg(error) {
                if (error) {
                    var $ele = (0, _util2.default)(error.ele),
                        msg = error.msg,
                        tips = $ele.attr(msg + 'Tips') || $ele.attr('tips') || $ele.attr('placeholder');
                    if (tips) (0, _topTips2.default)(tips);

                    if (error.ele.type == 'checkbox' || error.ele.type == 'radio') return;

                    var cellParent = _findCellParent(error.ele);
                    if (cellParent) cellParent.classList.add('weui-cell_warn');
                }
            }

            /**
             * 表单校验
             * @param {string} selector 表单的selector
             * @param {function} callback 校验后的回调
             * @param {Object=} options 配置项
             * @param {object=} options.regexp 表单所需的正则表达式
             *
             * @example
             * ##### 普通input的HTML
             * ```html
             * <input type="tel" required pattern="[0-9]{11}" placeholder="输入你现在的手机号" emptyTips="请输入手机号" notMatchTips="请输入正确的手机号">
             * <input type="text" required pattern="REG_IDNUM" placeholder="输入你的身份证号码" emptyTips="请输入身份证号码" notMatchTips="请输入正确的身份证号码">
             * ```
             * - required 表示需要校验
             * - pattern 表示校验的正则，不填则进行为空校验。当以REG_开头时，则获取校验时传入的正则。如`pattern="REG_IDNUM"`，则需要在调用相应方法时传入`{regexp:{IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/}}`，详情请看下面`checkIfBlur`和`validate`
             * - 报错的wording会从 emptyTips | notMatchTips | tips | placeholder 里获得
             * <br>
             *
             * ##### radio
             * radio需要检验，只需把参数写在同一表单下，同name的第一个元素即可。
             * ```html
             * <input type="radio" value="male" name="sex" required tips="请选择性别" />
             * <input type="radio" value="female" name="sex" />
             * ```
             * <br>
             *
             * ##### checkbox
             * checkbox需要校验，只需把参数写在同一表单下，同name的第一个元素即可。
             * pattern 规定选择个数，用法与正则一致，例如：
             * ```html
             * <input type="checkbox" name="assistance" value="黄药师" required pattern="{1,2}" tips="请勾选1-2个敲码助手" />
             * <input type="checkbox" name="assistance" value="欧阳锋" />
             * <input type="checkbox" name="assistance" value="段智兴" />
             * <input type="checkbox" name="assistance" value="洪七公" />
             * ```
             * - {1,}   至少选择1个
             * - {1,2}  选择1-2个
             * - 这里不会出现{0,}这种情况，因为有required就表示必选。否则直接去掉required即可。
             * <br>
             *
             * ``` js
             * // weui.form.validate('#form', function(error){ console.log(error);}); // error: {dom:[Object], msg:[String]}
             * weui.form.validate('#form', function (error) {
             *     if (!error) {
             *         var loading = weui.loading('提交中...');
             *         setTimeout(function () {
             *             loading.hide();
             *             weui.toast('提交成功', 3000);
             *         }, 1500);
             *     }
             *     // return true; // 当return true时，不会显示错误
             * }, {
             *     regexp: {
             *         IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
             *         VCODE: /^.{4}$/
             *     }
             * });
             * ```
             */
            function validate(selector) {
                var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util2.default.noop;
                var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                var $eles = (0, _util2.default)(selector);

                $eles.forEach(function (ele) {
                    var $form = (0, _util2.default)(ele);
                    var $requireds = $form.find('[required]');
                    if (typeof callback != 'function') callback = _showErrorMsg;

                    for (var i = 0, len = $requireds.length; i < len; ++i) {
                        var $required = $requireds.eq(i),
                            errorMsg = _validate($required, $form, options.regexp),
                            error = {ele: $required[0], msg: errorMsg};
                        if (errorMsg) {
                            if (!callback(error)) _showErrorMsg(error);
                            return;
                        }
                    }
                    callback(null);
                });

                return this;
            }

            /**
             * checkIfBlur 当表单的input失去焦点时校验
             * @param {string} selector 表单的selector
             * @param {Object=} options 配置项
             * @param {object=} options.regexp 表单所需的正则表达式
             *
             * @example
             * weui.form.checkIfBlur('#form', {
             *     regexp: {
             *         IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
             *         VCODE: /^.{4}$/
             *     }
             * });
             */
            function checkIfBlur(selector) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var $eles = (0, _util2.default)(selector);

                $eles.forEach(function (ele) {
                    var $form = (0, _util2.default)(ele);
                    $form.find('[required]').on('blur', function () {
                        // checkbox 和 radio 不做blur检测，以免误触发
                        if (this.type == 'checkbox' || this.type == 'radio') return;

                        var $this = (0, _util2.default)(this);
                        if ($this.val().length < 1) return; // 当空的时候不校验，以防不断弹出toptips

                        var errorMsg = _validate($this, $form, options.regexp);
                        if (errorMsg) {
                            _showErrorMsg({
                                ele: $this[0],
                                msg: errorMsg
                            });
                        }
                    }).on('focus', function () {
                        var cellParent = _findCellParent(this);
                        if (cellParent) cellParent.classList.remove('weui-cell_warn');
                    });
                });

                return this;
            }

            exports.default = {
                validate: validate,
                checkIfBlur: checkIfBlur
            };
            module.exports = exports['default'];

            /***/
        },
        /* 20 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _item = __webpack_require__(21);

            var _item2 = _interopRequireDefault(_item);

            var _image = __webpack_require__(22);

            var _upload = __webpack_require__(23);

            var _upload2 = _interopRequireDefault(_upload);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var _id = 0;

            /**
             * uploader 上传组件
             * @param {string} selector 上传组件的selector
             * @param {object} options 配置项
             * @param {string} [options.url] 上传的url，返回值需要使用json格式
             * @param {boolean} [options.auto=true] 设置为`true`后，不需要手动调用上传，有文件选择即开始上传。用this.upload()来上传，详情请看example
             * @param {string} [options.type='file'] 上传类型, `file`为文件上传; `base64`为以base64上传
             * @param {string=} [options.fileVal=file] 文件上传域的name
             * @param {object=} [options.compress] 压缩配置, `false`则不压缩
             * @param {number=} [options.compress.width=1600] 图片的最大宽度
             * @param {number=} [options.compress.height=1600] 图片的最大高度
             * @param {number=} [options.compress.quality=.8] 压缩质量, 取值范围 0 ~ 1
             * @param {function=} [options.onBeforeQueued] 文件添加前的回调，return false则不添加
             * @param {function=} [options.onQueued] 文件添加成功的回调
             * @param {function=} [options.onBeforeSend] 文件上传前调用，具体参数看example
             * @param {function=} [options.onSuccess] 上传成功的回调
             * @param {function=} [options.onProgress] 上传进度的回调
             * @param {function=} [options.onError] 上传失败的回调
             *
             * @example
             * var uploadCount = 0;
             * weui.uploader('#uploader', {
             *    url: 'http://localhost:8081',
             *    auto: true,
             *    type: 'file',
             *    fileVal: 'fileVal',
             *    compress: {
             *        width: 1600,
             *        height: 1600,
             *        quality: .8
             *    },
             *    onBeforeQueued: function(files) {
             *        // `this` 是轮询到的文件, `files` 是所有文件
             *
             *        if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
             *            weui.alert('请上传图片');
             *            return false; // 阻止文件添加
             *        }
             *        if(this.size > 10 * 1024 * 1024){
             *            weui.alert('请上传不超过10M的图片');
             *            return false;
             *        }
             *        if (files.length > 5) { // 防止一下子选择过多文件
             *            weui.alert('最多只能上传5张图片，请重新选择');
             *            return false;
             *        }
             *        if (uploadCount + 1 > 5) {
             *            weui.alert('最多只能上传5张图片');
             *            return false;
             *        }
             *
             *        ++uploadCount;
             *
             *        // return true; // 阻止默认行为，不插入预览图的框架
             *    },
             *    onQueued: function(){
             *        console.log(this);
             *        // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
             *
             *        // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现
             *
             *        // return true; // 阻止默认行为，不显示预览图的图像
             *    },
             *    onBeforeSend: function(data, headers){
             *        console.log(this, data, headers);
             *        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
             *        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
             *
             *        // return false; // 阻止文件上传
             *    },
             *    onProgress: function(procent){
             *        console.log(this, procent);
             *        // return true; // 阻止默认行为，不使用默认的进度显示
             *    },
             *    onSuccess: function (ret) {
             *        console.log(this, ret);
             *        // return true; // 阻止默认行为，不使用默认的成功态
             *    },
             *    onError: function(err){
             *        console.log(this, err);
             *        // return true; // 阻止默认行为，不使用默认的失败态
             *    }
             * });
             */
            function uploader(selector, options) {
                var $uploader = (0, _util2.default)(selector);
                var URL = window.URL || window.webkitURL || window.mozURL;

                // 找到DOM里file-content，若无，则插入一个。
                function findFileCtn($uploader, id) {
                    var $file = $uploader.find('[data-id="' + id + '"]');
                    var $fileCtn = $file.find('.weui-uploader__file-content');

                    if (!$fileCtn.length) {
                        $fileCtn = (0, _util2.default)('<div class="weui-uploader__file-content"></div>');
                        $file.append($fileCtn);
                    }
                    $file.addClass('weui-uploader__file_status');
                    return $fileCtn;
                }

                // 清除DOM里的上传状态
                function clearFileStatus($uploader, id) {
                    var $file = $uploader.find('[data-id="' + id + '"]').removeClass('weui-uploader__file_status');
                    $file.find('.weui-uploader__file-content').remove();
                }

                // 设置上传
                function setUploadFile(file) {
                    file.url = URL.createObjectURL(file);
                    file.upload = function () {
                        (0, _upload2.default)(_util2.default.extend({
                            $uploader: $uploader,
                            file: file
                        }, options));
                    };

                    options.onQueued(file);
                    if (options.auto) file.upload();
                }

                options = _util2.default.extend({
                    url: '',
                    auto: true,
                    type: 'file',
                    fileVal: 'file',
                    onBeforeQueued: _util2.default.noop,
                    onQueued: _util2.default.noop,
                    onBeforeSend: _util2.default.noop,
                    onSuccess: _util2.default.noop,
                    onProgress: _util2.default.noop,
                    onError: _util2.default.noop
                }, options);

                if (options.compress !== false) {
                    options.compress = _util2.default.extend({
                        width: 1600,
                        height: 1600,
                        quality: .8
                    }, options.compress);
                }

                if (options.onBeforeQueued) {
                    (function () {
                        var onBeforeQueued = options.onBeforeQueued;
                        options.onBeforeQueued = function (file, files) {
                            var ret = onBeforeQueued.call(file, files);
                            if (ret === false) {
                                return false;
                            }
                            if (ret === true) {
                                return;
                            }

                            var $item = (0, _util2.default)(_util2.default.render(_item2.default, {
                                id: file.id
                            }));
                            $uploader.find('.weui-uploader__files').append($item);
                        };
                    })();
                }
                if (options.onQueued) {
                    (function () {
                        var onQueued = options.onQueued;
                        options.onQueued = function (file) {
                            if (!onQueued.call(file)) {
                                var $file = $uploader.find('[data-id="' + file.id + '"]');
                                //TODO 解决ios拍照旋转的bug
                                $file.html('<img data-id="'+ file.id +'" style="width: 100%;height: 100%;" class="weui-uploader__file_img" src="' + (file.base64 || file.url) + '"/>');
                                // $file.css({
                                //     background: 'url("' + (file.base64 || file.url) + '") no-repeat top left',
                                //     backgroundSize: '100% 100%'
                                // });
                                //TODO end
                                if (!options.auto) {
                                    clearFileStatus($uploader, file.id);
                                }
                            }
                        };
                    })();
                }
                if (options.onBeforeSend) {
                    (function () {
                        var onBeforeSend = options.onBeforeSend;
                        options.onBeforeSend = function (file, data, headers) {
                            var ret = onBeforeSend.call(file, data, headers);
                            if (ret === false) {
                                return false;
                            }
                        };
                    })();
                }
                if (options.onSuccess) {
                    (function () {
                        var onSuccess = options.onSuccess;
                        options.onSuccess = function (file, ret) {
                            if (!onSuccess.call(file, ret)) {
                                clearFileStatus($uploader, file.id);
                            }
                        };
                    })();
                }
                if (options.onProgress) {
                    (function () {
                        var onProgress = options.onProgress;
                        options.onProgress = function (file, percent) {
                            if (!onProgress.call(file, percent)) {
                                findFileCtn($uploader, file.id).html(percent + '%');
                            }
                        };
                    })();
                }
                if (options.onError) {
                    (function () {
                        var onError = options.onError;
                        options.onError = function (file, err) {
                            if (!onError.call(file, err)) {
                                findFileCtn($uploader, file.id).html('<i class="weui-icon-warn"></i>');
                            }
                        };
                    })();
                }

                $uploader.find('input[type="file"]').on('change', function (evt) {
                    var files = evt.target.files;

                    if (files.length === 0) {
                        return;
                    }

                    if (options.compress === false && options.type == 'file') {
                        // 以原文件方式上传
                        Array.prototype.forEach.call(files, function (file) {
                            file.id = ++_id;

                            if (options.onBeforeQueued(file, files) === false) return;

                            setUploadFile(file);
                        });
                    } else {
                        // base64上传 和 压缩上传
                        Array.prototype.forEach.call(files, function (file) {
                            file.id = ++_id;

                            if (options.onBeforeQueued(file, files) === false) return;

                            (0, _image.compress)(file, options, function (blob) {
                                if (blob) setUploadFile(blob);
                            });
                        });
                    }

                    this.value = '';
                });
            }

            exports.default = uploader;
            module.exports = exports['default'];

            /***/
        },
        /* 21 */
        /***/ function (module, exports) {

            module.exports = "<li class=\"weui-uploader__file weui-uploader__file_status\" data-id=\"<%= id %>\"> <div class=weui-uploader__file-content> <i class=weui-loading style=width:100%;height:100%;></i> </div> </li> ";

            /***/
        },
        /* 22 */
        /***/ function (module, exports) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.detectVerticalSquash = detectVerticalSquash;
            exports.dataURItoBlob = dataURItoBlob;
            exports.compress = compress;

            /**
             * 检查图片是否有被压扁，如果有，返回比率
             */
            function detectVerticalSquash(img) {
                // 拍照在IOS7或以下的机型会出现照片被压扁的bug
                var data;
                var ih = img.naturalHeight;
                var canvas = document.createElement('canvas');
                canvas.width = 1;
                canvas.height = ih;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                try {
                    data = ctx.getImageData(0, 0, 1, ih).data;
                } catch (err) {
                    console.log('Cannot check verticalSquash: CORS?');
                    return 1;
                }
                var sy = 0;
                var ey = ih;
                var py = ih;
                while (py > sy) {
                    var alpha = data[(py - 1) * 4 + 3];
                    if (alpha === 0) {
                        ey = py;
                    } else {
                        sy = py;
                    }
                    py = ey + sy >> 1; // py = parseInt((ey + sy) / 2)
                }
                var ratio = py / ih;
                return ratio === 0 ? 1 : ratio;
            }

            /**
             * dataURI to blob, ref to https://gist.github.com/fupslot/5015897
             * @param dataURI
             */
            function dataURItoBlob(dataURI) {
                var byteString = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], {type: mimeString});
            }

            /**
             * 压缩图片
             */
            function compress(file, options, callback) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    if (options.compress === false) {
                        // 不启用压缩 & base64上传 的分支
                        file.base64 = evt.target.result;
                        callback(file);
                        return;
                    }

                    // 启用压缩的分支
                    var img = new Image();
                    img.onload = function () {
                        var ratio = detectVerticalSquash(img);
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');

                        var maxW = options.compress.width;
                        var maxH = options.compress.height;
                        var w = img.width;
                        var h = img.height;
                        var dataURL = void 0;

                        if (w < h && h > maxH) {
                            w = parseInt(maxH * img.width / img.height);
                            h = maxH;
                        } else if (w >= h && w > maxW) {
                            h = parseInt(maxW * img.height / img.width);
                            w = maxW;
                        }

                        canvas.width = w;
                        canvas.height = h;

                        ctx.drawImage(img, 0, 0, w, h / ratio);

                        if (/image\/jpeg/.test(file.type) || /image\/jpg/.test(file.type)) {
                            dataURL = canvas.toDataURL('image/jpeg', options.compress.quality);
                        } else {
                            dataURL = canvas.toDataURL(file.type);
                        }

                        if (options.type == 'file') {
                            if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
                                // 压缩出错，以文件方式上传的，采用原文件上传
                                console.warn('Compress fail, dataURL is ' + dataURL + '. Next will use origin file to upload.');
                                callback(file);
                            } else {
                                var blob = dataURItoBlob(dataURL);
                                blob.id = file.id;
                                blob.name = file.name;
                                blob.lastModified = file.lastModified;
                                blob.lastModifiedDate = file.lastModifiedDate;
                                callback(blob);
                            }
                        } else {
                            if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
                                // 压缩失败，以base64上传的，直接报错不上传
                                options.onError(file, new Error('Compress fail, dataURL is ' + dataURL + '.'));
                                callback();
                            } else {
                                file.base64 = dataURL;
                                callback(file);
                            }
                        }
                    };
                    img.src = evt.target.result;
                };
                reader.readAsDataURL(file);
            }

            /***/
        },
        /* 23 */
        /***/ function (module, exports) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = upload;

            function upload(options) {
                var url = options.url,
                    file = options.file,
                    fileVal = options.fileVal,
                    onBeforeSend = options.onBeforeSend,
                    onProgress = options.onProgress,
                    onError = options.onError,
                    onSuccess = options.onSuccess;
                var name = file.name,
                    type = file.type,
                    lastModifiedDate = file.lastModifiedDate;

                var data = {
                    name: name,
                    type: type,
                    size: options.type == 'file' ? file.size : file.base64.length,
                    lastModifiedDate: lastModifiedDate
                };
                var headers = {};

                if (onBeforeSend(file, data, headers) === false) return;

                onProgress(file, 0);

                var formData = new FormData();
                var xhr = new XMLHttpRequest();

                file.xhr = xhr;

                // 设置参数
                Object.keys(data).forEach(function (key) {
                    formData.append(key, data[key]);
                });
                if (options.type == 'file') {
                    formData.append(fileVal, file, name);
                } else {
                    formData.append(fileVal, file.base64);
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            try {
                                // 只支持json
                                var ret = JSON.parse(xhr.responseText);
                                onSuccess(file, ret);
                            } catch (err) {
                                onError(file, err);
                            }
                        } else {
                            onError(file, new Error('XMLHttpRequest response status is ' + xhr.status));
                        }
                    }
                };
                xhr.upload.addEventListener('progress', function (evt) {
                    if (evt.total == 0) return;

                    var percent = Math.ceil(evt.loaded / evt.total) * 100;

                    onProgress(file, percent);
                }, false);

                xhr.open('POST', url);

                // 设置头部信息
                Object.keys(headers).forEach(function (key) {
                    xhr.setRequestHeader(key, headers[key]);
                });

                xhr.send(formData);
            }

            module.exports = exports['default'];

            /***/
        },
        /* 24 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            __webpack_require__(25);

            var _util3 = __webpack_require__(26);

            var util = _interopRequireWildcard(_util3);

            var _picker = __webpack_require__(27);

            var _picker2 = _interopRequireDefault(_picker);

            var _group = __webpack_require__(28);

            var _group2 = _interopRequireDefault(_group);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var _sington = void 0;

            var destroy = function destroy($picker) {
                if ($picker) {
                    $picker.remove();
                    _sington = false;
                }
            };

            var show = function show($picker) {
                (0, _util2.default)('body').append($picker);

                // 这里获取一下计算后的样式，强制触发渲染. fix IOS10下闪现的问题
                _util2.default.getStyle($picker[0], 'transform');

                $picker.find('.weui-mask').addClass('weui-animate-fade-in');
                $picker.find('.weui-picker').addClass('weui-animate-slide-up');
            };

            var hide = function hide($picker) {
                $picker.find('.weui-mask').addClass('weui-animate-fade-out');
                $picker.find('.weui-picker').addClass('weui-animate-slide-down').on('animationend webkitAnimationEnd', function () {
                    destroy($picker);
                });
            };

            // temp 存在上一次滑动的位置
            var temp = {};

            /**
             * picker 多列选择器。
             * @param {array} items picker的数据，即用于生成picker的数据，picker的层级可以自己定义，但建议最多三层。数据格式参考example。
             * @param {Object} options 配置项
             * @param {number=} [options.depth] picker深度(也就是picker有多少列) 取值为1-3。如果为空，则取items第一项的深度。
             * @param {string=} [options.id=default] 作为picker的唯一标识
             * @param {string=} [options.className] 自定义类名
             * @param {array=} [options.defaultValue] 默认选项的value数组
             * @param {function=} [options.onChange] 在picker选中的值发生变化的时候回调
             * @param {function=} [options.onConfirm] 在点击"确定"之后的回调。回调返回选中的结果(Array)，数组长度依赖于picker的层级。
             *
             * @example
             * // 单列picker
             * weui.picker([
             * {
             *     label: '飞机票',
             *     value: 0,
             *     disabled: true // 不可用
             * },
             * {
             *     label: '火车票',
             *     value: 1
             * },
             * {
             *     label: '汽车票',
             *     value: 3
             * },
             * {
             *     label: '公车票',
             *     value: 4,
             * }
             * ], {
             *    className: 'custom-classname',
             *    defaultValue: [3],
             *    onChange: function (result) {
             *        console.log(result)
             *    },
             *    onConfirm: function (result) {
             *        console.log(result)
             *    },
             *    id: 'singleLinePicker'
             * });
             *
             * @example
             * // 多列picker
             * weui.picker([
             *     {
             *         label: '1',
             *         value: '1'
             *     }, {
             *         label: '2',
             *         value: '2'
             *     }, {
             *         label: '3',
             *         value: '3'
             *     }
             * ], [
             *     {
             *         label: 'A',
             *         value: 'A'
             *     }, {
             *         label: 'B',
             *         value: 'B'
             *     }, {
             *         label: 'C',
             *         value: 'C'
             *     }
             * ], {
             *     defaultValue: ['3', 'A'],
             *     onChange: function (result) {
             *         console.log(result);
             *     },
             *     onConfirm: function (result) {
             *         console.log(result);
             *     },
             *     id: 'multiPickerBtn'
             * });
             *
             * @example
             * // 级联picker
             * weui.picker([
             * {
             *     label: '飞机票',
             *     value: 0,
             *     children: [
             *         {
             *             label: '经济舱',
             *             value: 1
             *         },
             *         {
             *             label: '商务舱',
             *             value: 2
             *         }
             *     ]
             * },
             * {
             *     label: '火车票',
             *     value: 1,
             *     children: [
             *         {
             *             label: '卧铺',
             *             value: 1,
             *             disabled: true // 不可用
             *         },
             *         {
             *             label: '坐票',
             *             value: 2
             *         },
             *         {
             *             label: '站票',
             *             value: 3
             *         }
             *     ]
             * },
             * {
             *     label: '汽车票',
             *     value: 3,
             *     children: [
             *         {
             *             label: '快班',
             *             value: 1
             *         },
             *         {
             *             label: '普通',
             *             value: 2
             *         }
             *     ]
             * }
             * ], {
             *    className: 'custom-classname',
             *    defaultValue: [1, 3],
             *    onChange: function (result) {
             *        console.log(result)
             *    },
             *    onConfirm: function (result) {
             *        console.log(result)
             *    },
             *    id: 'doubleLinePicker'
             * });
             */
            function picker() {
                if (_sington) return _sington;

                var isMulti = false; // 是否多列的类型

                // 数据
                var items = void 0;
                if (arguments.length > 2) {
                    var i = 0;
                    items = [];
                    while (i < arguments.length - 1) {
                        items.push(arguments[i++]);
                    }
                    isMulti = true;
                } else {
                    items = arguments[0];
                }

                // 配置项
                var options = arguments[arguments.length - 1];
                var defaults = _util2.default.extend({
                    id: 'default',
                    className: '',
                    onChange: _util2.default.noop,
                    onConfirm: _util2.default.noop
                }, options);

                // 获取缓存
                temp[defaults.id] = temp[defaults.id] || [];
                var result = [];
                var lineTemp = temp[defaults.id];
                var $picker = (0, _util2.default)(_util2.default.render(_picker2.default, defaults));
                var depth = options.depth || (isMulti ? items.length : util.depthOf(items[0])),
                    groups = '';

                while (depth--) {
                    groups += _group2.default;
                }

                $picker.find('.weui-picker__bd').html(groups);
                show($picker);

                // 初始化滚动
                function scroll(items, level) {
                    if (lineTemp[level] === undefined && defaults.defaultValue && defaults.defaultValue[level] !== undefined) {
                        // 没有缓存选项，而且存在defaultValue
                        var defaultVal = defaults.defaultValue[level];
                        var index = 0,
                            len = items.length;

                        for (; index < len; ++index) {
                            if (defaultVal == items[index].value) break;
                        }
                        if (index < len) {
                            lineTemp[level] = index;
                        } else {
                            console.warn('Picker has not match defaultValue: ' + defaultVal);
                        }
                    }
                    $picker.find('.weui-picker__group').eq(level).scroll({
                        items: items,
                        temp: lineTemp[level],
                        onChange: function onChange(item, index) {
                            //为当前的result赋值。
                            if (item) {
                                result[level] = item;//TODO 田鑫龙 返回对象，获取更多数据
                            } else {
                                result[level] = null;
                            }
                            lineTemp[level] = index;

                            if (isMulti) {
                                defaults.onChange(result);
                            } else {
                                /**
                                 * @子列表处理
                                 * 1. 在没有子列表，或者值列表的数组长度为0时，隐藏掉子列表。
                                 * 2. 滑动之后发现重新有子列表时，再次显示子列表。
                                 *
                                 * @回调处理
                                 * 1. 因为滑动实际上是一层一层传递的：父列表滚动完成之后，会call子列表的onChange，从而带动子列表的滑动。
                                 * 2. 所以，使用者的传进来onChange回调应该在最后一个子列表滑动时再call
                                 */
                                if (item.children && item.children.length > 0) {
                                    $picker.find('.weui-picker__group').eq(level + 1).show();
                                    !isMulti && scroll(item.children, level + 1); // 不是多列的情况下才继续处理children
                                } else {
                                    //如果子列表test不通过，子孙列表都隐藏。
                                    var $items = $picker.find('.weui-picker__group');
                                    $items.forEach(function (ele, index) {
                                        if (index > level) {
                                            (0, _util2.default)(ele).hide();
                                        }
                                    });

                                    result.splice(level + 1);

                                    defaults.onChange(result);
                                }
                            }
                        },
                        onConfirm: defaults.onConfirm
                    });
                }

                if (isMulti) {
                    items.forEach(function (item, index) {
                        scroll(item, index);
                    });
                } else {
                    scroll(items, 0);
                }

                $picker.on('click', '.weui-mask', function () {
                    hide($picker);
                }).on('click', '.weui-picker__action', function () {
                    hide($picker);
                }).on('click', '#weui-picker-confirm', function () {
                    defaults.onConfirm(result);
                });

                _sington = $picker[0];
                _sington.hide = function () {
                    hide($picker);
                };
                return _sington;
            }

            /**
             * dataPicker 时间选择器，由picker拓展而来，提供年、月、日的选择。
             * @param options 配置项
             * @param {string=} [options.id=datePicker] 作为picker的唯一标识
             * @param {number=} [options.start=2000] 起始年份
             * @param {number=} [options.end=2030] 结束年份
             * @param {function=} [options.onChange] 在picker选中的值发生变化的时候回调
             * @param {function=} [options.onConfirm] 在点击"确定"之后的回调。回调返回选中的结果(Array)，数组长度依赖于picker的层级。
             *
             *@example
             * weui.datePicker({
             *     start: 2010,
             *     end: 2016,
             *     onChange: function(result){
             *         console.log(result);
             *     },
             *     onConfirm: function(result){
             *         console.log(result);
             *     },
             *     id: 'datePicker'
             * });
             */
            function datePicker(options) {
                var defaults = _util2.default.extend({
                    id: 'datePicker',
                    onChange: _util2.default.noop,
                    onConfirm: _util2.default.noop,
                    start: 2000,
                    end: 2030
                }, options);

                var date = [];
                var daysTotal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //所有月份的天数
                for (var i = defaults.start; i <= defaults.end; i++) {
                    var months = [];
                    if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0) {
                        //判定为闰年
                        daysTotal[1] = 29;
                    } else {
                        daysTotal[1] = 28;
                    }
                    for (var j = 0; j < 12; j++) {
                        var dates = [];
                        for (var k = 1; k < daysTotal[j] + 1; k++) {
                            var _date = {
                                label: k + '日',
                                value: k
                            };
                            dates.push(_date);
                        }
                        months.push({
                            label: j + 1 + '月',
                            value: j + 1,
                            children: dates
                        });
                    }

                    var year = {
                        label: i + '年',
                        value: i,
                        children: months
                    };

                    date.push(year);
                }

                return picker(date, defaults);
            }

            exports.default = {
                picker: picker,
                datePicker: datePicker
            };
            module.exports = exports['default'];

            /***/
        },
        /* 25 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            /**
             * set transition
             * @param $target
             * @param time
             */
            var setTransition = function setTransition($target, time) {
                return $target.css({
                    '-webkit-transition': 'all ' + time + 's',
                    'transition': 'all ' + time + 's'
                });
            };

            /**
             * set translate
             */
            var setTranslate = function setTranslate($target, diff) {
                return $target.css({
                    '-webkit-transform': 'translate3d(0, ' + diff + 'px, 0)',
                    'transform': 'translate3d(0, ' + diff + 'px, 0)'
                });
            };

            /**
             * @desc get index of middle item
             * @param items
             * @returns {number}
             */
            var getDefaultIndex = function getDefaultIndex(items) {
                var current = Math.floor(items.length / 2);
                var count = 0;
                while (!!items[current] && items[current].disabled) {
                    current = ++current % items.length;
                    count++;

                    if (count > items.length) {
                        throw new Error('No selectable item.');
                    }
                }

                return current;
            };

            var getDefaultTranslate = function getDefaultTranslate(offset, rowHeight, items) {
                var currentIndex = getDefaultIndex(items);

                return (offset - currentIndex) * rowHeight;
            };

            /**
             * get max translate
             * @param offset
             * @param rowHeight
             * @returns {number}
             */
            var getMax = function getMax(offset, rowHeight) {
                return offset * rowHeight;
            };

            /**
             * get min translate
             * @param offset
             * @param rowHeight
             * @param length
             * @returns {number}
             */
            var getMin = function getMin(offset, rowHeight, length) {
                return -(rowHeight * (length - offset - 1));
            };

            _util2.default.fn.scroll = function (options) {
                var _this = this;

                var defaults = _util2.default.extend({
                    items: [], // 数据
                    scrollable: '.weui-picker__content', // 滚动的元素
                    offset: 3, // 列表初始化时的偏移量（列表初始化时，选项是聚焦在中间的，通过offset强制往上挪3项，以达到初始选项是为顶部的那项）
                    rowHeight: 34, // 列表每一行的高度
                    onChange: _util2.default.noop, // onChange回调
                    temp: null, // translate的缓存
                    bodyHeight: 7 * 34 // picker的高度，用于辅助点击滚动的计算
                }, options);
                var items = defaults.items.map(function (item) {
                    return '<div class="weui-picker__item' + (item.disabled ? ' weui-picker__item_disabled' : '') + '">' + item.label + '</div>';
                }).join('');
                (0, _util2.default)(this).find('.weui-picker__content').html(items);

                var $scrollable = (0, _util2.default)(this).find(defaults.scrollable); // 可滚动的元素
                var start = void 0; // 保存开始按下的位置
                var end = void 0; // 保存结束时的位置
                var startTime = void 0; // 开始触摸的时间
                var translate = void 0; // 缓存 translate
                var points = []; // 记录移动点
                var windowHeight = window.innerHeight; // 屏幕的高度

                // 首次触发选中事件
                // 如果有缓存的选项，则用缓存的选项，否则使用中间值。
                if (defaults.temp !== null && defaults.temp < defaults.items.length) {
                    var index = defaults.temp;
                    defaults.onChange.call(this, defaults.items[index], index);
                    translate = (defaults.offset - index) * defaults.rowHeight;
                } else {
                    var _index = getDefaultIndex(defaults.items);
                    defaults.onChange.call(this, defaults.items[_index], _index);
                    translate = getDefaultTranslate(defaults.offset, defaults.rowHeight, defaults.items);
                }
                setTranslate($scrollable, translate);

                var stop = function stop(diff) {
                    translate += diff;

                    // 移动到最接近的那一行
                    translate = Math.round(translate / defaults.rowHeight) * defaults.rowHeight;
                    var max = getMax(defaults.offset, defaults.rowHeight);
                    var min = getMin(defaults.offset, defaults.rowHeight, defaults.items.length);
                    // 不要超过最大值或者最小值
                    if (translate > max) {
                        translate = max;
                    }
                    if (translate < min) {
                        translate = min;
                    }

                    // 如果是 disabled 的就跳过
                    var index = defaults.offset - translate / defaults.rowHeight;
                    while (!!defaults.items[index] && defaults.items[index].disabled) {
                        diff > 0 ? ++index : --index;
                    }
                    translate = (defaults.offset - index) * defaults.rowHeight;
                    setTransition($scrollable, .3);
                    setTranslate($scrollable, translate);

                    // 触发选择事件
                    defaults.onChange.call(_this, defaults.items[index], index);
                };

                /**
                 * 因为现在没有移除匿名函数的方法，所以先暴力移除（offAll），并且改变$scrollable。
                 */
                $scrollable = (0, _util2.default)(this).offAll().on('touchstart', function (evt) {
                    start = evt.changedTouches[0].pageY;
                    startTime = +new Date();
                }).on('touchmove', function (evt) {
                    end = evt.changedTouches[0].pageY;
                    var diff = end - start;

                    setTransition($scrollable, 0);
                    setTranslate($scrollable, translate + diff);
                    startTime = +new Date();
                    points.push({time: startTime, y: end});
                    if (points.length > 40) {
                        points.shift();
                    }

                    evt.preventDefault();
                }).on('touchend', function (evt) {
                    /**
                     * 思路:
                     * 0. touchstart 记录按下的点和时间
                     * 1. touchmove 移动时记录前 40个经过的点和时间
                     * 2. touchend 松开手时, 记录该点和时间. 如果松开手时的时间, 距离上一次 move时的时间超过 100ms, 那么认为停止了, 不执行惯性滑动
                     *    如果间隔时间在 100ms 内, 查找 100ms 内最近的那个点, 和松开手时的那个点, 计算距离和时间差, 算出速度
                     *    速度乘以惯性滑动的时间, 例如 300ms, 计算出应该滑动的距离
                     */
                    var endTime = new Date().getTime();
                    end = evt.changedTouches[0].pageY;
                    var relativeY = windowHeight - defaults.bodyHeight / 2;

                    // 如果上次时间距离松开手的时间超过 100ms, 则停止了, 没有惯性滑动
                    if (endTime - startTime > 100) {
                        //如果end和start相差小于10，则视为
                        if (Math.abs(end - start) > 10) {
                            stop(end - start);
                        } else {
                            stop(relativeY - end);
                        }
                    } else {
                        if (Math.abs(end - start) > 10) {
                            var endPos = points.length - 1;
                            var startPos = endPos;
                            for (var i = endPos; i > 0 && startTime - points[i].time < 100; i--) {
                                startPos = i;
                            }

                            if (startPos !== endPos) {
                                var ep = points[endPos];
                                var sp = points[startPos];
                                var t = ep.time - sp.time;
                                var s = ep.y - sp.y;
                                var v = s / t; // 出手时的速度
                                var diff = v * 150 + (end - start); // 滑行 150ms,这里直接影响“灵敏度”
                                stop(diff);
                            } else {
                                stop(0);
                            }
                        } else {
                            stop(relativeY - end);
                        }
                    }
                }).find(defaults.scrollable);
            };

            /***/
        },
        /* 26 */
        /***/ function (module, exports) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var depthOf = exports.depthOf = function depthOf(object) {
                var depth = 1;
                if (object.children && object.children[0]) {
                    depth = depthOf(object.children[0]) + 1;
                }
                return depth;
            };

            /***/
        },
        /* 27 */
        /***/ function (module, exports) {

            module.exports = "<div class=\"<%= className %>\"> <div class=weui-mask></div> <div class=weui-picker> <div class=weui-picker__hd> <a href=javascript:; data-action=cancel class=weui-picker__action>取消</a> <a href=javascript:; data-action=select class=weui-picker__action id=weui-picker-confirm>确定</a> </div> <div class=weui-picker__bd></div> </div> </div> ";

            /***/
        },
        /* 28 */
        /***/ function (module, exports) {

            module.exports = "<div class=weui-picker__group> <div class=weui-picker__mask></div> <div class=weui-picker__indicator></div> <div class=weui-picker__content></div> </div>";

            /***/
        },
        /* 29 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            var _gallery = __webpack_require__(30);

            var _gallery2 = _interopRequireDefault(_gallery);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var _sington = void 0;

            /**
             * gallery 带删除按钮的图片预览，主要是配合图片上传使用
             * @param {string} url gallery显示的图片的url
             * @param {object=} options 配置项
             * @param {string=} options.className 自定义类名
             * @param {function=} options.onDelete 点击删除图片时的回调
             *
             * @example
             * var gallery = weui.gallery(url, {
             *     className: 'custom-classname',
             *     onDelete: function(){
             *         if(confirm('确定删除该图片？')){ console.log('删除'); }
             *         gallery.hide();
             *     }
             * });
             */
            function gallery(url) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                if (_sington) return _sington;

                //TODO 田鑫龙 没有onDelete方法就隐藏删除按钮
                if (!options.onDelete) {
                    options.hideDelete = true;
                }

                options = _util2.default.extend({
                    className: '',
                    onDelete: _util2.default.noop
                }, options);

                var $gallery = (0, _util2.default)(_util2.default.render(_gallery2.default, _util2.default.extend({
                    url: url
                }, options)));

                function hide() {
                    $gallery.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
                        $gallery.remove();
                        _sington = false;
                    });
                }

                (0, _util2.default)('body').append($gallery);
                $gallery.find('.weui-gallery__img').on('click', hide);

                //TODO 田鑫龙 没有onDelete方法就隐藏删除按钮
                if (options.hideDelete) {
                    $gallery.find('.weui-gallery__del').hide();
                } else {
                    $gallery.find('.weui-gallery__del').on('click', function () {
                        options.onDelete.call(this, url);
                    });
                }

                $gallery.show().addClass('weui-animate-fade-in');

                _sington = $gallery[0];
                _sington.hide = hide;
                return _sington;
            }

            exports.default = gallery;
            module.exports = exports['default'];

            /***/
        },
        /* 30 */
        /***/ function (module, exports) {

            module.exports = "<div class=\"weui-gallery <%= className %>\"> <span class=weui-gallery__img><img style=\"width: 100%;height: 100%;\" src=\"<%= url %>\"></span> <div class=weui-gallery__opr> <a href=javascript: class=weui-gallery__del> <i class=\"weui-icon-delete weui-icon_gallery-delete\"></i> </a> </div> </div> ";

            /***/
        },
        /* 31 */
        /***/ function (module, exports, __webpack_require__) {

            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _util = __webpack_require__(2);

            var _util2 = _interopRequireDefault(_util);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            /**
             * slider slider滑块，单位是百分比。注意，因为需要获取slider的长度，所以必须要在slider可见的情况下来调用。
             * @param {string} selector slider的selector
             * @param {object=} options 配置项
             * @param {number=} options.step slider的step，每次移动的百分比，取值范围 [0-100]
             * @param {number=} [options.defaultValue=0] slider的默认百分比值，取值范围 [0-100]
             * @param {function=} options.onChange slider发生改变时返回对应的百分比，取值范围 [0-100]
             *
             * @example
             * weui.slider('#sliderStep', {
             *     step: 10,
             *     defaultValue: 40,
             *     onChange: function(percent){
             *         console.log(percent);
             *     }
             * });
             */
            function slider(selector) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var $eles = (0, _util2.default)(selector);
                options = _util2.default.extend({
                    step: undefined,
                    defaultValue: 0,
                    onChange: _util2.default.noop
                }, options);

                if (options.step !== undefined) {
                    options.step = parseFloat(options.step);
                    if (!options.step || options.step < 0) {
                        throw new Error('Slider step must be a positive number.');
                    }
                }
                if (options.defaultValue !== undefined && options.defaultValue < 0 || options.defaultValue > 100) {
                    throw new Error('Slider defaultValue must be >= 0 and <= 100.');
                }

                $eles.forEach(function (ele) {
                    var $slider = (0, _util2.default)(ele);
                    var $sliderInner = $slider.find('.weui-slider__inner');
                    var $sliderTrack = $slider.find('.weui-slider__track');
                    var $sliderHandler = $slider.find('.weui-slider__handler');

                    var sliderLength = parseInt(_util2.default.getStyle($sliderInner[0], 'width')); // slider的长度
                    var sliderLeft = $sliderInner[0].offsetLeft; // slider相对于页面的offset
                    var handlerStartPos = 0; // handler起始位置
                    var handlerStartX = 0; // handler touchstart的X
                    var stepWidth = void 0; // 每个step的宽度

                    function getHandlerPos() {
                        var pos = _util2.default.getStyle($sliderHandler[0], 'left');

                        if (/%/.test(pos)) {
                            pos = sliderLength * parseFloat(pos) / 100;
                        } else {
                            pos = parseFloat(pos);
                        }
                        return pos;
                    }

                    function setHandler(distance) {
                        var dist = void 0,
                            // handler的目标位置
                            percent = void 0; // 所在位置的百分比

                        if (options.step) {
                            distance = Math.round(distance / stepWidth) * stepWidth;
                        }

                        dist = handlerStartPos + distance;
                        dist = dist < 0 ? 0 : dist > sliderLength ? sliderLength : dist;

                        percent = 100 * dist / sliderLength;

                        $sliderTrack.css({width: percent + '%'});
                        $sliderHandler.css({left: percent + '%'});
                        options.onChange.call(ele, percent);
                    }

                    if (options.step) {
                        stepWidth = sliderLength * options.step / 100;
                    }
                    if (options.defaultValue) {
                        setHandler(sliderLength * options.defaultValue / 100);
                    }

                    $slider.on('click', function (evt) {
                        evt.preventDefault();

                        handlerStartPos = getHandlerPos();
                        setHandler(evt.pageX - sliderLeft - handlerStartPos);
                    });
                    $sliderHandler.on('touchstart', function (evt) {
                        handlerStartPos = getHandlerPos();
                        handlerStartX = evt.changedTouches[0].clientX;
                    }).on('touchmove', function (evt) {
                        evt.preventDefault();

                        setHandler(evt.changedTouches[0].clientX - handlerStartX);
                    });
                });

                return this;
            }

            exports.default = slider;
            module.exports = exports['default'];
        }
    ])
});
/*****************************************************source：resources/js/load.js*****************************************************//**
 * @author 田鑫龙 v2.0
 *
 */
window.firstHost = 'mp';
if (/\w+\.zanchina.com/.test(location.hostname)) {
    window.firstHost = location.hostname.split('.')[0];
} else {
    window.firstHost = 'lyh';
}


window.lyb = window.lyb || {};

//判断浏览器环境
var ua = window.navigator.userAgent.toLowerCase();
var uaArray = ua.match(/MicroMessenger/i);
if (uaArray) {
    uaArray = Array.prototype.slice.call(uaArray);
}
uaArray = uaArray || [];
if (uaArray.indexOf('micromessenger') !== -1) { //微信浏览器
    lyb.wxBrowser = true;
} else {
    lyb.wxBrowser = false;
}

(function() {
    var decode = window.decodeURIComponent;
    decodeURIComponent = function(text) {
        while (/%/g.test(text)) {
            text = decode(text || '');
        }
        return text;
    };
})(window);

// localStorage.setItem('debugMode', 'debug');

(function() {
    //TODO 获取ctx
    window.ctx = location.origin;
    if (!window.ctx) {
        window.ctx = window.location.protocol + '//' + window.location.host
    }
    window.ctx += '/';

    var head = document.head;
    var scripts = document.head.getElementsByTagName("script");
    var position = scripts[0];
    for (var i = 0, len = scripts.length; i < len; i++) {
        var script = scripts[i],
            src = script.src;
        if (src.indexOf('resources/js/') != -1) {
            position = script;
            break;
        }
    }

    //截取 上下文路径和参数
    var url = window.location.href;
    var paramString = url.split('#')[0].split('?')[1];
    window.params = window.params || {};
    params.ctx = ctx;
    if (paramString) {
        paramString = paramString.replace(/\#\w+$/ig, '');
        if (paramString != '') {
            var kvs = paramString.split('&');
            for (var i = 0; i < kvs.length; i++) {
                var kv = kvs[i].split('=');
                params[kv[0]] = kv[1];
            }
        }
    }

    //缓存js和css技术
    var dispatchEvent = 'complete'; //页面初次加载调用complete时间，以后都会触发customloaded事件
    lyb.loadModule = function(config, single) {
        var __config = single ? {} : (window._config || {});
        __config.css = __config.css || [];
        __config.js = __config.js || [];
        for (var key in config) {
            if (key == 'pageUrl') {
                __config.pageUrl = config[key];
            } else {
                __config[key] = (__config[key] || []).concat(config[key]);
            }
        }
        this.config = JSON.parse(JSON.stringify(__config));
        this.cloneConfig = JSON.parse(JSON.stringify(__config));
        this.init();
    };
    lyb.loadModule.prototype = {
        init: function() {
            this.evalResources();
        },
        evalResources: function() {
            var config = this.config,
                that = this;

            var cssArray = config.css;
            for (var i = 0; i < cssArray.length; i++) {
                var url = cssArray[i];
                var style = document.createElement('link');
                style.type = "text/css";
                style.rel = 'styleSheet';
                head.insertBefore(style, scripts[0]);
                style.href = ctx + url;
            }

            var jsArray = config.js,
                loadObj = { index: 0, len: jsArray.length };

            function promiseLoad() {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = ctx + jsArray[loadObj.index];
                script.async = false;
                script.onload = function() {
                    loadObj.index++;
                    if (loadObj.index == loadObj.len) {
                        that._loadSuccess();
                    } else if (loadObj.index < loadObj.len) {
                        promiseLoad();
                    }
                }
                head.insertBefore(script, position);
            }

            if (jsArray.length) {
                promiseLoad();
            } else {
                this._loadSuccess();
            }
        },
        _loadSuccess: function() {
            var event = document.createEvent('HTMLEvents');
            event.initEvent(dispatchEvent, true, true);
            dispatchEvent = 'customloaded';
            window.dispatchEvent(event);
        },
        update: function(result) {
            var url = result.url,
                text = result.responseText;
            this.setItem(url.replace(ctx, ''), text);
            this.resourceThread++;
            if (this.resourceThread === this.config.js.length + this.config.css.length) {
                this.evalResources();
            }
        },
        setItem: function(key, value) {
            localStorage.setItem(key, value);
        },
        getItem: function(key) {
            return localStorage.getItem(key);
        },
        request: function(url, callback, asyncType) {
            var that = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, !asyncType);
            xhr.onload = function(e) {
                if (this.status === 200) {
                    if (callback) {
                        callback.call(that, { responseText: this.responseText, url: url });
                    }
                }
            };
            xhr.ontimeout = function(e) {

            };
            xhr.onerror = function(e) {

            };

            xhr.send();
        }
    };


    window.addEventListener('load', function() {
        var result = author();
        if (result) {
            //默认配置
            var config = window.config || {};
            //js和css脚手架
            new lyb.loadModule(config);
        }
    });


    // 动态加载业务模块功能
    var prefix = ctx + 'html/';
    lyb.require = function(key) {
        if (lyb.type(key) === 'object') {
            module = key;
        } else {
            var module = window.business.modules[key];
            if (!key || !module) {
                var url = ctx + location.pathname.replace(/^\/+/, '');
                var path = url.replace(prefix, ctx + 'resources/js/business/');
                path = path.replace(/\.\w+$/ig, '.js');
                var fileName = url.match(/\w+(\.\w+)$/ig)[0].replace(/\.\w+$/ig, '');
                module = window.business.modules[fileName] || { js: [path] };
            }
        }

        return new lyb.loadModule(module);
    }
})();


//获取微信重定向url
lyb.getWxSignInfo = function(url, customHost, redirect) {
    customHost = customHost || window.firstHost;
    redirect = redirect || '';
    var protol = location.protocol,
        root = ctx,
        appId = 'wx6d5e22ce79758540';
    switch (customHost) {
        case 'mp':
            root = 'https://mp.zanchina.com/';
            appId = 'wxda6e1b2c1b561518';
            break;
        case 'testmp':
            root = 'http://testmp.zanchina.com/';
            break;
        case 'lyb':
            appId = 'wx4b0decd67df189f7';
            root = 'https://lyb.zanchina.com/';
            break;
        case 'lyh':
            appId = 'wx39ee46e1eee69f08';
            root = 'http://lyh.zanchina.com/';
            break;
    }
    var ru = root + 'weixin/door/redirect?param=' + encodeURIComponent(url.replace(ctx, redirect));
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + encodeURIComponent(ru) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
};

// TODO 操作cookie
lyb.cookie = {
    // 获取指定名称的cookie值：getCookie(name)
    get: function(cookie_name) {
        var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
        if (results)
            return (unescape(results[2]));
        else
            return null;
    },
    // 删除指定名称的cookie：deleteCookie(name)
    remove: function(name) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=; expire=" + date.toGMTString();
    },
    set: function(name, value, expireHours) {
        var cookieString = name + "=" + escape(value);
        // 判断是否设置过期时间
        if (expireHours > 0) {
            var date = new Date();
            date.setTime(date.getTime() + expireHours * 3600 * 1000);
            cookieString = cookieString + "; expire=" + date.toGMTString();
        }
        document.cookie = cookieString;
    }
};

//判断是否有openId,没有就走授权
function author() {
    var openId = '';
    if (lyb.wxBrowser) {
        if (/^ly/.test(location.hostname)) {
            openId = lyb.cookie.get('lybOpenId');
        } else {
            openId = lyb.cookie.get('openId');
        }
        if (!openId) {
            top.location.href = lyb.getWxSignInfo(top.location.href);
            return false;
        }
    }

    return true;
}

//诸葛埋点接入
//var zhugeKey = '03929628eca942fa956dfe87d9fc88ca', zhugeDebug = false;
var zhugeKey = '8c28529f25694ae0b89899689588d967',
    zhugeDebug = false;
if (document.location.protocol === 'http:') {
    zhugeKey = 'ff46073faa36473a9dc4153b4137b17c';
    zhugeDebug = true;
}

var text = "window.zhuge = window.zhuge || [];window.zhuge.methods = '_init debug identify track trackLink trackForm page'.split(' ');window.zhuge.factory = function(b) {return function() {var a = Array.prototype.slice.call(arguments);a.unshift(b);window.zhuge.push(a);return window.zhuge;}};for (var i = 0; i < window.zhuge.methods.length; i++) {var key = window.zhuge.methods[i];window.zhuge[key] = window.zhuge.factory(key);}window.zhuge.load = function(b, x) {if (!document.getElementById('zhuge-js')) {var a = document.createElement('script');var verDate = new Date();var verStr = verDate.getFullYear().toString()+ verDate.getMonth().toString() + verDate.getDate().toString();a.type = 'text/javascript';a.id = 'zhuge-js';a.async = !0;a.src = (location.protocol == 'http:' ? 'http://sdk.zhugeio.com/zhuge.min.js?v=' : 'https://zgsdk.zhugeio.com/zhuge.min.js?v=') + verStr;a.onerror = function(){window.zhuge.identify = window.zhuge.track = function(ename, props, callback){if(callback && Object.prototype.toString.call(callback) === '[object Function]')callback();};};var c = document.getElementsByTagName('script')[0];c.parentNode.insertBefore(a, c);window.zhuge._init(b, x)}};window.zhuge.load('" + zhugeKey + "', {debug: " + zhugeDebug + "});//配置应用的AppKey";
var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode(text));
document.head.appendChild(script);


window.zhugemaidian = function(text, data, cb) { //打点
    data = data || {};
    cb = cb || function() {};

    zhuge.track(text, data, cb);
};

(function() {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }

    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
})();
/*****************************************************source：resources/js/zan.js*****************************************************//**
 * Created by tianxinlong on 2016-08-02-0002. v1.0
 */
(function() {
    var _lyb = {
        version: 1.0,
        HTML5: !!window['applicationCache'],
        noop: function() {

        },
        _index: 0,
        getUUID: function(prefix) {
            prefix = prefix || 'lyb';
            var id = prefix + '-' + this._index++;
            return id;
        },
        getValid: function() {
            var array = Array.prototype.slice.call(arguments);
            for (var index in array) {
                var o = array[index];
                if (o !== undefined && o !== null || (jQuery.type(o) == "number" && !isNaN(o))) {
                    return o;
                }
            }
        },
        isDate: function(value) {
            return !!(value && value.getTime);
        },
        isArray: function(value) {
            return !!(value && !!value.push);
        },
        isNull: function(value) {
            return value === null || value === undefined;
        },

        isNumber: function(value) {
            return !isNaN(value) && typeof value == 'number';
        },
        formatDate: function(date, format, returnDate) {
            if (date == undefined || date === '') {
                return "";
            }

            function convertToDate(time) {
                if (time instanceof Date) {
                    return time;
                }
                if (jQuery.type(time) === 'string') {
                    if (/^\w+.+\d{4}$/i.test(time)) {
                        time = new Date(time);
                    }
                }

                var __D = new Date();
                if (jQuery.type(time) === 'string') {
                    time = time.replace(/T/i, " "); // 针对date类型查询时间带T
                    time = time.replace(/\.\d+/i, ""); // 针对IE 对应数据库datetime
                    time = time.replace(/-/g, "/");
                    var _T = time.split(" ");
                    var _d = _T[0],
                        _t = _T[1];
                    if (/:/.test(_d)) {
                        _d = undefined;
                        _t = _T[0];
                    }

                    if (_t && _d) {
                        var _ds = _d.split("/"),
                            _ts = _t.split(":");
                        __D = new Date(Number(_ds[0] || __D.getFullYear()), Number(_ds[1] ? _ds[1] - 1 : __D.getMonth()),
                            Number(_ds[2] || __D.getDate()), Number(_ts[0] || __D.getHours()), Number(_ts[1] ||
                                __D.getMinutes()), Number(_ts[2] || __D.getSeconds()));
                    } else if (_d) {
                        var _ds = _d.split("/");
                        __D = new Date(Number(_ds[0] || __D.getFullYear()), Number(_ds[1] ? _ds[1] - 1 : __D.getMonth()),
                            Number(_ds[2] || __D.getDate()), 0, 0, 0);
                    } else if (_t) {
                        var _ts = _t.split(":");
                        __D = new Date(__D.getFullYear(), __D.getMonth(), __D.getDate(), Number(_ts[0] || __D.getHours()),
                            Number(_ts[1] || __D.getMinutes()), Number(_ts[2] || __D.getSeconds()));
                    }
                }
                return __D;
            }

            var _time = convertToDate(date);
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            format = format.replace(/YYYY/i, _time.getFullYear());
            format = format.replace(/YY/i, (_time.getYear() % 100) > 9 ? (_time.getYear() % 100).toString() : '0' +
                (_time.getYear() % 100));
            format = format.replace(/MM/i, (_time.getMonth() + 1) > 9 ? (_time.getMonth() + 1).toString() : '0' +
                (_time.getMonth() + 1));
            format = format.replace(/W/i, Week[_time.getDay()]);
            format = format.replace(/DD/i, _time.getDate() > 9 ? _time.getDate().toString() : '0' + _time.getDate());
            format = format.replace(/HH/i, _time.getHours() > 9 ? _time.getHours().toString() : '0' + _time.getHours());
            format = format.replace(/MI/i, _time.getMinutes() > 9 ? _time.getMinutes().toString() : '0' +
                _time.getMinutes());
            format = format.replace(/SS/i, _time.getSeconds() > 9 ? _time.getSeconds().toString() : '0' +
                _time.getSeconds());

            if (returnDate) {
                return convertToDate(format);
            }
            return format;
        },
        formatDecimal: function(number, formatFixed, backEmpty, spliter) {
            spliter = lyb.getValid(spliter, ',');
            if (backEmpty && number === '') {
                return '';
            }

            if (formatFixed === undefined || formatFixed === null) {
                formatFixed = 2;
            }
            if (jQuery.type(formatFixed) == 'string')
                formatFixed = Number(formatFixed.replace(/[a-zA-Z]/g, ''));

            // 格式化方法
            function _splitByGroup(str) {
                if (str == 0) {
                    return 0;
                }
                var len = str.length,
                    array = [],
                    start = 0,
                    end = len % 3,
                    step = Math.ceil(len / 3);

                for (var i = 0; i <= step; i++) {
                    var subStr = str.substring(start, end);
                    if (subStr != '')
                        array.push(subStr);
                    start = end;
                    end = start + 3;
                }
                return array.join(spliter) || "0";
            }

            number = String(number) || "";
            var clearRegExp = /\D*/ig,
                empty = '';
            var minus = /\-/.test(number) ? -1 : 1;
            var numbers = number.split('.'),
                number0 = numbers[0].replace(clearRegExp, empty),
                number1 = (numbers[1] || "")
                .replace(clearRegExp, empty);

            number0 = _splitByGroup(number0);
            number1 = (Number(number1) * Math.pow(0.1, number1.length)).toFixed(formatFixed) *
                Math.pow(10, formatFixed);
            number1 = parseInt(number1.toFixed(0)); //先四舍五入,防止JS计算错误 如: 0.08084 * 10000

            if (number1 == 0) {
                number1 = new Array(formatFixed + 1).join("0");
            } else if (number1.toString().length < formatFixed) {
                number1 = new Array(formatFixed - number1.toString().length + 1).join("0") + number1;
            }

            if (formatFixed == 0) {
                number = number0;
            } else {
                number = number0 + "." + number1;
            }
            return number;
        },
        /*------------克隆数据---------------*/
        clone: function(object) {
            return eval("(" + JSON.stringify(object) + ")");
        },
        // TODO 通过id属性提取注册的组件
        get: function(id) {
            if (this.components[id]) {
                return this.components[id];
            }
        },
        // TODO Deposit 组件寄存器
        components: {},
        type: function(obj) {
            var class2type = {
                '[object Array]': "array",
                '[object Boolean]': "boolean",
                '[object Date]': "date",
                '[object Error]': "error",
                '[object Function]': "function",
                '[object Number]': "number",
                '[object Object]': "object",
                '[object RegExp]': "regexp",
                '[object String]': "string"
            };

            if (obj == null) {
                return obj + "";
            }
            //'如果是object或者function，先查询集合class2type,如果没有查询到就返回object。
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },
        isWindow: function(obj) {
            return obj != null && obj === obj.window;
        },

        isPlainObject: function(obj) {
            var proto, Ctor, hasOwn = ({}).hasOwnProperty,
                fnToString = hasOwn.toString,
                getProto = Object.getPrototypeOf,
                ObjectFunctionString = fnToString.call(Object);
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }

            proto = getProto(obj);
            if (!proto) {
                return true;
            }

            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },

        concat: function() {
            var concat = function(source, target) {
                for (var key in target) {
                    var value = target[key];
                    if (_lyb.type(value) === "array") {
                        concat(source[key] = source[key] || [], value);
                    } else if (_lyb.isPlainObject(value)) {
                        concat(source[key] = source[key] || {}, value);
                    } else {
                        if (_lyb.type(source) === "array") {
                            source.push(value);
                        } else {
                            source[key] = value;
                        }
                    }
                }
                return source;
            };
            try {
                var subObject = arguments[0];
                for (var i = 1; i < arguments.length; i++) {
                    concat(subObject, arguments[i]);
                }
                return subObject;
            } catch (ex) {
                console.error(ex);
            }
        }
    };

    window.lyb = _lyb.concat(window.lyb || {}, _lyb);

    //销毁组件
    lyb.destroy = function(obj) {
        if (lyb.type(obj) === 'string') {
            delete lyb.components[obj];
        } else if (lyb.type(obj) === 'object') {
            delete lyb.components[obj.id];
        }
    };


    /**
     * @author 田鑫龙
     * @param el dom元素，可以是#id|.class|jQuery|dom
     * @param options 配置参数
     */
    lyb.searchBox = function(el, fn) {
        this.el = el;
        this.submitFn = fn || lyb.noop;
        this._init();
        this._bindEvent();
    };
    lyb.searchBox.prototype = {
        _init: function() {
            this.el = jQuery(this.el);
            this.id = this.el[0].id;
            this.formEl = jQuery('form.weui-search-bar__form', this.el);
            this.textEl = jQuery('input.weui-search-bar__input', this.formEl);
            this.clearEl = jQuery('.weui-icon-clear', this.formEl);
            this.labelEl = jQuery('.weui-search-bar__label', this.formEl);
            this.cancelEl = jQuery('.weui-search-bar__cancel-btn', this.el);
            this.searchBody = jQuery('<div class="search-body his-hide" style="position: fixed;top: 58px;right: 0;left: 0;bottom: 0;z-index: 11;background: #fff;"></div>').appendTo(document.body)[0];
            this.viewBody = jQuery('.view-body')[0];
            this.viewSearchText = jQuery(".weui-search-bar__label>span", this.el);

            if (this.textEl.val().trim()) {
                this.labelEl.removeClass('his-hide');
            }
        },
        _bindEvent: function() {
            var that = this;
            this.el.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            jQuery(document.body).on('click', function(e) {
                if (!that.textEl.val().length) {
                    window.setTimeout(function() {
                        that.el.removeClass('weui-search-bar_focusing');
                        that._empty.call(that, e);
                    }, 200);
                }
            });
            this.textEl.on('focus', function(e) {
                if (this.value) {
                    that.backupText = this.value;
                }
                that.el.addClass('weui-search-bar_focusing');
                that._focus.call(that, e);
                var len = this.value.length;
                if (document.selection) {
                    var sel = this.createTextRange();
                    sel.moveStart('character', len);
                    sel.collapse();
                    sel.select();
                } else if (typeof this.selectionStart === 'number' && typeof this.selectionEnd === 'number') {
                    this.selectionStart = this.selectionEnd = len;
                    /*平时所见的光标其实是由两部分组成的，即selectionStart和selectionEnd，一般时候这两个是想等的，但在选中一段文字，全选时，他们的差值就是所选文字的个数。*/
                }
            });
            this.textEl.on('input', function(e) {
                that._input.call(that, e);
                that.viewSearchText.html(this.value);
                //诸葛打点记录搜索
                zhuge.track('搜索记录', {
                    '内容': this.value,
                    '来源': document.title,
                    '时间': lyb.formatDate(new Date(), 'yyyy-mm-dd hh:mi:ss')
                });
            });
            this.textEl.on('blur', function(e) {
                if (!that.cancelEl[0]) {
                    that.el.removeClass('weui-search-bar_focusing');
                }
                var text = this.value;
                that.viewSearchText.html(text);
                if (text) {
                    that.viewSearchText.removeClass('his-hide');
                } else {
                    that.viewSearchText.addClass('his-hide');
                }
            });
            this.labelEl.on('click', function() {
                that.backupText = that.textEl.val();
                that.textEl.val('');
                that.viewSearchText.html('');
                that.textEl.focus();
            });
            this.clearEl.on('click', function(e) {
                that.textEl.val('').focus();
                that.viewSearchText.html('');
                that._input.call(that, e);
            });
            this.formEl.on('submit', function(e) {
                that._submit.call(that, e);
            });
            this.cancelEl.on('click', function(e) {
                that.backupText = that.backupText || '';
                that.textEl.val(that.backupText);
                that.viewSearchText.html(that.backupText);
                if (that.backupText) {
                    that.viewSearchText.removeClass('his-hide');
                } else {
                    that.viewSearchText.addClass('his-hide');
                }
                that.el.removeClass('weui-search-bar_focusing');
                that._cancelSearch.call(that, e);
            });
            jQuery(this.searchBody).on('click', '.search-result', function(e) {
                var el = this;
                var dataSet = el.dataset;
                var type = dataSet.type,
                    text = el.innerHTML,
                    id = dataSet.id;
                that._storeToHistory({ text: text, type: type, id: id });
            }).on('click', '.history-item', function(e) {
                that._itemClick.call(that, e);
            }).on('click', '.common-disease', function(e) {
                that._commonDiseaseClick.call(that, e);
            }).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var target = e.target;
                if (target.tagName === 'A' && target.href) {
                    window.location.href = target.href;
                }
            });
        },
        _commonDiseaseClick: function(e) {
            var dataSet = e.target.dataset;
            var text = this.innerText,
                href = dataSet.href;
            var that = this;
            //诸葛打点记录搜索
            zhuge.track('点击常见病症', {
                '内容': text,
                '来源': '全局搜索',
                '时间': lyb.formatDate(new Date(), 'yyyy-mm-dd hh:mi:ss')
            }, function() {
                window.location.href = href;
            });
        },
        _itemClick: function(e) {
            var dataSet = e.target.dataset;
            var text = this.innerText,
                type = dataSet.type,
                href = dataSet.href;
            var that = this;
            //诸葛打点记录搜索
            zhuge.track('搜索界面点击历史记录', {
                '内容': text,
                '类别': type === 'illness' ? '病症' : '医生',
                '来源': document.title,
                '时间': lyb.formatDate(new Date(), 'yyyy-mm-dd hh:mi:ss')
            }, function() {
                if (that.itemClickFn) {
                    that.itemClickFn.call(that, { type: type, text: text });
                } else {
                    window.location.href = href;
                }
            });
        },
        _empty: function(e) {
            if (this.searchBody) {
                this.searchBody.classList.add('his-hide');
                this.viewBody && this.viewBody.classList.remove('his-hide');
                // this.cancelEl.addClass('his-hide');
            }
            this.viewSearchText.html(this.textEl.placeholder);
            if (this.cancelFn) {
                this.cancelFn.call(this);
            }
        },
        _cancelSearch: function() {
            this.labelEl.show();
            this.textEl.blur();
            this.textEl.val('');

            this._hideViewBox();
            this.viewSearchText.html(this.textEl[0].placeholder);

            if (this.cancelFn) {
                var text = this.textEl.val();
                this.cancelFn.call(this, text);
            }
        },
        _hideViewBox: function() {
            this.searchBody.classList.add('his-hide');
            this.viewBody && this.viewBody.classList.remove('his-hide');
        },
        _submit: function(e) {
            e.preventDefault();
            this.textEl.blur();
            if (this.submitFn) {
                var text = this.textEl.val();
                // this._storeToHistory({text: text, type: 'common'});
                this.submitFn.call(this, text);
            }
        },
        _focus: function(e) {
            e.preventDefault();
            var text = this.textEl.val();
            if (this.searchBody) {
                this.viewBody && this.viewBody.classList.add('his-hide');
                this.searchBody.classList.remove('his-hide');

                // this.cancelEl.removeClass('his-hide');
                if (text === '') {
                    this._renderHistory();
                }
            }

            if (this.focusFn) {
                this.focusFn.call(this, text);
            }
        },
        _input: function(e) {
            e.preventDefault();
            if (this.inputFn) {
                var text = this.textEl.val();
                this.inputFn.call(this, text);
            }
        },
        _renderHistory: function() {
            var text = this._getFromHistory(),
                html = '';
            if (text) {
                html = '<div class="weui-panel his-nobackground no-after-line no-before-line">' +
                    '<div class="weui-panel__hd his-flex no-after-line" style="padding: 20px 12px 12px;">' +
                    '<span class="font15 middle-color">历史搜索</span> ' +
                    '<div class="" ontouchstart="localStorage.removeItem(\'__searchHistory\');this.parentNode.nextElementSibling.innerHTML = \'\';">' +
                    '<i class="ico-remove font13" style="width: 12px;height: 13px;vertical-align: middle;"></i>' +
                    '<span class="font13 light-color" style="margin-left: 4px;vertical-align: middle;">清空</span> ' +
                    '</div>' +
                    '</div>' +
                    '<div class="weui-panel__bd" style="padding: 0 12px;">' + text + '</div>' +
                    '</div>';
                html += this._renderCommonDisease(true);
            } else {
                html += this._renderCommonDisease(false);
            }
            this.searchBody.innerHTML = html;
        },
        _renderCommonDisease: function(flag) {
            var text = localStorage.getItem('commonDisease');
            if (text) {
                var html = '',
                    list = text.split(','),
                    page = location.pathname.replace(/^\//, '');
                if (/\/index\.html$/.test(page)) {
                    page = 'html/search/index_search.html';
                } else if (/\/lyb_index\.html$/.test(page)) {
                    page = 'html/search/lyb_search.html';
                }
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list[i];
                    html += '<span class="common-disease deep-color" data-href="' + ctx + page + '?condition=' + item + '" style="padding: 8px 12px;background: #f2f2f2;border-radius: 2px;margin-right: 12px;margin-bottom: 12px;display: inline-block;">' + item + '</span>';
                }
                return '<div class="weui-panel his-nobackground no-after-line no-before-line" style="margin-top: ' + (flag ? '8' : '0') + 'px;">' +
                    '<div class="weui-panel__hd his-flex no-after-line" style="padding: 20px 12px 12px;">' +
                    '<span class="font15 middle-color">常见病症</span> ' +
                    '</div>' +
                    '<div class="weui-panel__bd" style="padding: 0 12px;">' + html + '</div>' +
                    '</div>';
            } else {
                var that = this;
                lyb.ajax(ctx + 'sysDiseases/common', {
                    success: function(result) {
                        if (result.success) {
                            var list = result.data || [];
                            localStorage.setItem('commonDisease', list.join(','));
                            that._renderCommonDisease(flag);
                        }
                    }
                })
            }
            return '';
        },
        _getFromHistory: function() {
            var html = '';
            var his = localStorage.getItem('__searchHistory') || '[]';
            if (his) {
                his = JSON.parse(his);
                for (var i = 0, len = his.length; i < len; i++) {
                    html += this.getHistoryItem(his[i]);
                }
            }
            return html;
        },
        getHistoryItem: function(item) {
            var text = item.text,
                type = item.type,
                id = item.id,
                page = location.pathname.replace(/^\//, '');
            if (/\/index\.html$/.test(page)) {
                page = 'html/search/index_search.html';
            } else if (/\/lyb_index\.html$/.test(page)) {
                page = 'html/search/lyb_search.html';
            }
            page += '?condition=' + text;
            if (type === 'doctor' && id) {
                page = 'html/doctor/doctor_detail.html?id=' + id + '&isActiveGF=' + params.isActiveGF;
            }
            return '<span data-type="' + type + '" class="history-item deep-color" data-href="' + ctx + page + '" style="padding: 8px 12px;background: #f2f2f2;border-radius: 2px;margin-right: 12px;margin-bottom: 12px;display: inline-block;">' + text + '</span>'
        },
        hide: function() {
            this._hideViewBox();
        },
        _storeToHistory: function(item) {
            if (item.text.replace(/\s*/g, '') === '') {
                return;
            }
            var his = localStorage.getItem('__searchHistory') || '[]';
            if (his) {
                his = JSON.parse(his);
                if (item) {
                    for (var i = 0, len = his.length; i < len; i++) {
                        var history = his[i];
                        if (history.text === item.text) {
                            return;
                        }
                    }
                    if (his.length >= 10) {
                        his.shift();
                    }
                    if (item.type === 'illness') {
                        delete item.id;
                    }
                    his.unshift(item);
                }
            }
            localStorage.setItem('__searchHistory', JSON.stringify(his));
        },
        renderSearchResult: function(html) {
            this.searchBody.innerHTML = html;
        },
        getValue: function() {
            return this.textEl.val();
        }
    };


    /**
     * @author 田鑫龙
     * @param text 提示文本
     * @param time 消失时间
     * @param callback 回调函数
     */
    lyb.toast = function(text, callback, time) {
        text = text || '操作成功';
        if (jQuery.type(callback) == 'number') {
            time = callback;
        }
        time = time || 2000;
        weui.toast(text, {
            duration: time,
            callback: callback || lyb.noop
        })
    };
    lyb.confirm = weui.confirm;
    lyb.alert = weui.alert;
    lyb.topTips = weui.topTips;
    lyb.error = lyb.topTips;

    //动态替换url
    lyb.updateUrl = function(data, reset) {
            var paramString = '',
                array = [];
            for (var prop in data) {
                var _v = data[prop];
                if (_v === '' || _v === undefined || _v === null) {
                    continue;
                }
                if (prop === 'ctx' || prop === '_') {
                    continue;
                }
                params[prop] = _v;
                if (_v) {
                    array.push(prop + '=' + _v);
                }
            }
            paramString = array.join('&');

            var hash = window.location.hash,
                url = location.href.split('#')[0];
            if (url.indexOf('?') === -1) {
                url += '?' + paramString;
            } else {
                var _params = url.split('?')[1].split('&'),
                    map = {};
                if (!reset) {
                    for (var i = 0, len = _params.length; i < len; i++) {
                        var kv = _params[i].split('=');
                        map[kv[0]] = kv[1];
                    }
                }
                for (var _key in data) {
                    map[_key] = data[_key];
                }
                _params = [];
                for (var _key in map) {
                    if (_key === 'ctx' || _key === '_') {
                        continue;
                    }
                    _v = map[_key];
                    if (_v === '' || _v === undefined || _v === null) {
                        continue;
                    }
                    _params.push(_key + '=' + _v);
                }
                url = url.split('?')[0] + '?' + _params.join('&');
            }
            history.replaceState('', '', url);
        }
        //读取页面
    lyb.getPage = function(url, success) {
        success = success || function() {};
        lyb.ajax(url, { type: 'get', dataType: 'text', success: success });
    }

    /**
     * 加载数据框，常驻页面
     */
    var Mask = function() {
        this.init();
    }
    Mask.prototype = {
        init: function() {
            var el = document.createElement('div');
            el.classList.add('weui-loading_toast');
            el.classList.add('his-hide');

            var mask = document.createElement('div');
            mask.classList.add('weui-mask_transparent');
            mask.style.opacity = 1;

            var loadding = document.createElement('div');
            loadding.classList.add('weui-toast');
            loadding.classList.add('weui-animate-fade-in');

            var icon = document.createElement('i');
            icon.classList.add('weui-loading');
            icon.classList.add('weui-icon_toast');

            var text = document.createElement('p');
            text.classList.add('weui-toast__content');
            text.innerHTML = '加载中...';

            el.appendChild(mask);
            el.appendChild(loadding);
            loadding.appendChild(icon);
            loadding.appendChild(text);

            this.el = el;
            this.iconEl = icon;
            this.textEl = text;

            document.body.appendChild(el);
        },
        show: function(text) {
            this.update(text);
            this.el.classList.remove('his-hide');
        },
        update: function(text) {
            this.textEl.innerHTML = text || '加载中...';
        },
        success: function(text, callback) {
            text = text || '操作成功';
            if (typeof text === 'function') {
                callback = text;
                text = '操作成功';
            }
            this.iconEl.classList.remove('weui-loading');
            this.iconEl.classList.add('weui-icon-success-no-circle');
            this.update(text);
            var that = this;
            that.close(callback, 2000);
        },
        close: function(cb, time) {
            if (time) {
                var that = this;
                window.setTimeout(function() {
                    that.el.classList.add('his-hide');
                    if (cb) {
                        cb();
                    }
                }, time || 1000);
            } else {
                this.el.classList.add('his-hide');
                if (cb) {
                    cb();
                }
            }
        },
        finish: function(cb, time) {
            this.iconEl.classList.remove('weui-loading');
            this.iconEl.classList.add('weui-icon-success-no-circle');
            this.textEl.innerHTML = '已完成';
            this.close(cb, time);
        }
    };
    var mask = null;
    lyb.showMask = function() {
        mask = mask || new Mask();
        return mask;
    }

    //修正时间字符串
    lyb.fixDateString = function(string, format) {
        var array = string.match(/\d+/g),
            format = format || 'yyyy-mm-dd';
        for (var i = 0, len = array.length; i < len; i++) {
            array[i] = Number(array[i]);
        }
        format = format.replace(/YYYY/i, array[0]);
        array[1] && (format = format.replace(/MM/i, array[1] > 9 ? array[1] : '0' + array[1]));
        array[2] && (format = format.replace(/DD/i, array[2] > 9 ? array[2] : '0' + array[2]));
        array[3] && (format = format.replace(/HH/i, array[3] > 9 ? array[2] : '0' + array[3]));
        array[4] && (format = format.replace(/MI/i, array[4] > 9 ? array[2] : '0' + array[4]));
        array[5] && (format = format.replace(/SS/i, array[5] > 9 ? array[2] : '0' + array[5]));
        return format;
    }

    //封装多文件
    lyb.multiImages = function(el) {
        this.el = el;
        this.init();
        this.initEvent();
        this.fileList = [];

        var scrollerEl = jQuery('.scroll-wrapper')[0];
        if (scrollerEl) {
            this.scrollerId = scrollerEl.id;
            this.scrollerId && lyb.scroll('#' + this.scrollerId);
        }

    };
    lyb.multiImages.prototype = {
        init: function() {
            if (typeof this.el == 'string' || !(this.el instanceof jQuery)) {
                this.el = jQuery(this.el);
            }
            this.maxSize = this.el[0].dataset.maxSize || 6;
            this.uploadMode = this.el[0].dataset.uploadMode;
            this.fileBorderEl = jQuery('<ul class="weui-uploader__files"></ul>');
            this.btnBorderEl = jQuery('<div class="weui-uploader__input-box"></div>');
            this.fileEl = jQuery('<input class="weui-uploader__input" type="file" accept="image/*">');

            this.fileBorderEl.appendTo(this.el);
            this.btnBorderEl.appendTo(this.el);
            this.fileEl.appendTo(this.btnBorderEl);

            this.imgWidth = (this.fileBorderEl.width() - 24) / 4;
            this.btnBorderEl.css({
                width: this.imgWidth,
                height: this.imgWidth,
                margin: '0 0 8px 0'
            })
        },
        updateImgSize: function() {
            this.fileBorderEl.children().css({
                width: this.imgWidth,
                height: this.imgWidth,
                margin: '0 8px 8px 0',
                'vertical-align': 'top'
            })
        },
        initEvent: function() {
            var that = this;
            this.uploader = weui.uploader('#' + this.el[0].id, {
                auto: false,
                compress: false,
                onQueued: function() {
                    that.fileList.push(this);
                    if (that.onPush) {
                        that.onPush();
                    }
                    if (that.onQueueChange) {
                        that.onQueueChange();
                    }

                    that.scrollerId && lyb.scroll('#' + that.scrollerId);
                    that.updateImgSize();
                },
                onBeforeQueued: function(files) {
                    var len = that.fileList.length,
                        size = 0;
                    for (var i = 0; i < len; i++) {
                        size += that.fileList[i].size;
                    }
                    var oLen = that.el.find('li').length;
                    if (oLen >= parseInt(that.maxSize) - 1) {
                        that.btnBorderEl.addClass('his-hide');
                        if (oLen >= parseInt(that.maxSize)) {
                            if (that.uploadMode === 'photo') {
                                that.fileList = [];
                                that.fileBorderEl.empty();
                            } else {
                                weui.alert('最多上传' + that.maxSize + '张图片！');
                                return false;
                            }
                        }
                    } else {
                        that.btnBorderEl.removeClass('his-hide');
                    }
                    if (size > 100 * 1024 * 1024) {
                        weui.alert('请上传不超过100M的图片！');
                        return false;
                    }
                }
            });
            this.fileBorderEl.on('click', function(e) {
                if (that.uploadMode === 'photo') {
                    jQuery('.weui-uploader__input').trigger('click');
                    return;
                }
                var target = e.target;

                while (!target.classList.contains('weui-uploader__file_img') && target) {
                    target = target.parentNode;
                }
                if (!target) return;

                var url = target.src || '';
                var id = target.dataset.id;

                // if (url) {
                //     url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
                // }
                var gallery = weui.gallery(url, {
                    onDelete: function onDelete() {
                        weui.confirm('确定删除该图片？', function() {
                            var index, list = that.fileList;
                            for (var i = 0, len = list.length; i < len; ++i) {
                                var file = list[i];
                                if (file.id.toString() === id) {
                                    index = i;
                                    break;
                                }
                            }
                            if (index !== undefined) list.splice(index, 1);

                            target.parentNode.remove();
                            gallery.hide();
                            if (that.onShift) {
                                that.onShift();
                            }
                            if (that.onQueueChange) {
                                that.onQueueChange();
                            }
                            if (that.el.find('li').length < parseInt(that.maxSize)) {
                                that.btnBorderEl.removeClass('his-hide');
                            }
                            this.scrollerId && lyb.scroll('#' + this.scrollerId);
                        });
                    }
                });
            });
        },
        setValue: function(url) {
            this.fileBorderEl.append('<li class="weui-uploader__file"><img style="width: 100%;height: 100%;" class="weui-uploader__file_img" src="' + url + '"/></li>');
            this.btnBorderEl.addClass('his-hide');
        },
        getFiles: function() {
            return this.fileList;
        }
    };

    //封装多页签
    lyb.Tabs = function(selector) {
        this.init(selector);
        this.bindEvent();
    };
    lyb.Tabs.prototype = {
        init: function(selector) {
            var id = typeof selector == 'string' ? '#' + selector : selector;
            this.el = jQuery(id);
            var children = this.el.children();
            this.tabEls = this.el.children('.weui-tab-titles').children();
            this.panelEls = this.el.children('.weui-tab-contents').children();
        },
        bindEvent: function() {
            var that = this;
            this.el.on('click', '.weui-navbar__item', function(e) {
                that.onItemClick.call(that, this, e);
            });
        },
        onItemClick: function(el, e) {
            var index = jQuery(el).index();
            this.tabEls.removeClass('lyb-active');
            el.classList.add('lyb-active');
            if (this.panelEls[0]) {
                this.panelEls.removeClass('lyb-active');
                this.panelEls.eq(index).addClass('lyb-active');
            }

            var detail = JSON.parse(JSON.stringify(el.dataset));
            detail._index = index;

            var event = new CustomEvent('change', { detail: detail });
            event.initEvent('change', true, true);
            el.dispatchEvent(event);
        }
    }
})();

;
(function() {
    /**
     * 2017-09-21
     * 倒计时
     **/
    lyb.countDown = function(options) {
        this.init(options);
        this.write();
        this.start();
    };
    lyb.countDown.prototype = {
        init: function(options) {
            this.endTime = options.endTime || this.now;
            this.el = document.getElementById(options.el);
            this.callback = options.callback || function() {};
        },
        start: function() {
            var that = this;
            if (this.interval != undefined) {
                window.clearInterval(this.interval);
            }
            this.interval = window.setInterval(function() {
                that.write();
            }, 1000);
        },
        write: function() {
            var endTime = this.endTime
            var leftTime = endTime - new Date().getTime();

            var day = 0,
                hour = 0,
                minute = 0,
                second = 0;

            if (leftTime > 0) {
                var leftSecond = parseInt(leftTime / 1000);
                day = Math.floor(leftSecond / (60 * 60 * 24));
                hour = Math.floor((leftSecond - day * 24 * 60 * 60) / 3600);
                minute = Math.floor((leftSecond - day * 24 * 60 * 60 - hour * 3600) / 60);
                second = Math.floor(leftSecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
            }
            var array = [second + ' 秒'];
            if (minute >= 1) {
                array.unshift(minute + " 分 ");
            }
            if (hour >= 1) {
                array.unshift(hour + " 时 ");
            }
            if (day >= 1) {
                array.unshift(day + " 天 ");
            }
            this.el.innerHTML = array.join('');

            var event = { day: day, hour: hour, minute: minute, second: second };
            if (day == 0 && hour == 0 && minute == 0 && second == 0) {
                if (this.interval != undefined) {
                    window.clearInterval(this.interval);
                }
                if (this.callback) {
                    var e = JSON.parse(JSON.stringify(event));
                    e.status = 'finish';
                    this.callback();
                }
            }
            if (this.event) {
                var e = JSON.parse(JSON.stringify(event));
                e.status = 'running';
                this.event(e);
            }
        }
    };
})();

(function() {
    /**
     * 文本框根据输入内容自适应高度
     * {HTMLElement}   输入框元素
     * {Number}        设置光标与输入框保持的距离(默认0)
     * {Number}        设置最大高度(可选)
     */
    var autoTextarea = function(elem, extra, maxHeight) {
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
            isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
            addEvent = function(type, callback) {
                elem.addEventListener ?
                    elem.addEventListener(type, callback, false) :
                    elem.attachEvent('on' + type, callback);
            },
            getStyle = elem.currentStyle ?
            function(name) {
                var val = elem.currentStyle[name];
                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                };
                return val;
            } : function(name) {
                return getComputedStyle(elem, null)[name];
            },
            minHeight = parseFloat(getStyle('height'));
        elem.style.resize = 'both'; //如果不希望使用者可以自由的伸展textarea的高宽可以设置其他值

        var change = function() {
            var scrollTop, height,
                padding = 0,
                style = elem.style;

            if (elem._length === elem.value.length) return;
            elem._length = elem.value.length;

            if (!isFirefox && !isOpera) {
                padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
            };
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            elem.style.height = minHeight + 'px';
            if (elem.scrollHeight > minHeight) {
                if (maxHeight && elem.scrollHeight > maxHeight) {
                    height = maxHeight - padding;
                    style.overflowY = 'auto';
                } else {
                    height = elem.scrollHeight - padding;
                    style.overflowY = 'hidden';
                };
                style.height = height + extra + 'px';
                scrollTop += parseInt(style.height) - elem.currHeight;
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
                elem.currHeight = parseInt(style.height);
            };
        };

        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
    };

    lyb.autoHeightTextarea = function(id) {
        var textList = [];
        if (id) {
            textList.push(document.querySelector('#' + id))
        } else {
            textList = document.querySelectorAll('textarea');
        }
        for (var i = 0, len = textList.length; i < len; i++) {
            var el = textList[i];
            autoTextarea(el);
        }
    }
})();
(function() {
    lyb.replaceText = function(html, obj) {
        obj = obj || params;
        var matchers = html.match(/\$\{.+?\}/g);
        if (matchers) {
            for (var i = 0; i < matchers.length; i++) {
                var matcher = matchers[i];
                var _cloneMatcher = matcher;
                var _vars = matcher.match(/params.\w+/igm) || [];
                for (var j = 0; j < _vars.length; j++) {
                    var _var = _vars[j].replace(/params\./g, '');
                    var value = obj[_var] || '';
                    if (value === 'undefined' || value === 'null') {
                        value = '';
                    }
                    matcher = matcher.replace('params.' + _var, '"' + value + '"');
                }
                var result = matcher.replace(/\$\{:*|\}/g, '');
                result = new Function('return ' + result)();
                html = html.replace(_cloneMatcher, result);
            }
        }
        return html;
    };

    lyb.parse = function() {
        //TODO replace params
        var body = document.body,
            html = body.innerHTML;
        body.classList.add(lyb.os.ios ? 'ios' : lyb.os.android ? 'android' : 'pc');
        html = lyb.replaceText(html, window.params);
        html = html.replace(/data\-src/ig, 'src');
        body.innerHTML = html;
        //显示数据
        body.style.visibility = 'visible';

        //待转换对象
        var array = [{ express: '.weui-tab', fn: lyb.Tabs }, {
            express: '.scroll-wrapper',
            fn: lyb.scroll
        }, { express: '.multi-image', fn: lyb.multiImages }, { express: '.weui-search-bar', fn: lyb.searchBox }];
        for (var i = 0, len = array.length; i < len; i++) {
            var comp = array[i];
            var els = document.querySelectorAll(comp.express);
            for (var j = 0, length = els.length; j < length; j++) {
                var el = els[j];
                if (!el.id) {
                    el.id = lyb.getUUID('lyb');
                }
                var result = new comp.fn(el);
                if (!lyb.components[el.id])
                    lyb.components[el.id] = result;
            }
        }
        //如果使用了侧滑页面，就初始化
        lyb.initPageManager && lyb.initPageManager();

        //判断浏览器环境
        var ua = window.navigator.userAgent.toLowerCase();
        var uaArray = ua.match(/MicroMessenger/i);
        if (uaArray) {
            uaArray = Array.prototype.slice.call(uaArray);
        }
        uaArray = uaArray || [];
        if (uaArray.indexOf('micromessenger') !== -1 && !window.lybMp && params && params.fromWhere !== 'lyb' && params.fromWhere !== 'lyh') { //微信浏览器 TODO 良医帮公众号隐藏快速导航
            lyb.fastNav();
        }


        //TODO   判断是否有微信分享功能， 没有就分享主页
        window.setTimeout(function() {
            if (!window.wx) {
                var wxShareScript = document.createElement('script');
                wxShareScript.type = 'text/javascript';
                wxShareScript.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
                wxShareScript.addEventListener('load', function() {
                    var wxSign = document.createElement('script');
                    wxSign.type = 'text/javascript';
                    wxSign.src = ctx + 'resources/js/commons/wxSign.js';
                    wxSign.addEventListener('load', function() {
                        var shareIndex = document.createElement('script');
                        shareIndex.type = 'text/javascript';
                        shareIndex.src = ctx + 'resources/js/commons/share_index.js';
                        document.body.appendChild(shareIndex);
                    });
                    document.body.appendChild(wxSign);
                }, false);
                document.body.appendChild(wxShareScript);
            }
        }, 0);

        //TODO 处理ios 11.4 坑货导航条
        window.setTimeout(function() {
            var scroll = jQuery('.scroll-wrapper')[0];
            var border = jQuery('.scroll-border')[0];
            if (scroll && border) {
                var id = scroll.id;
                lyb.scroll('#' + id);
                console.log('reset scroll after 0.3 second later')
            }
        }, 300);

        jQuery(window).resize(function() {
            var wrapper = jQuery('.scroll-wrapper')[0];
            if (wrapper) {
                var id = wrapper.id;
                if (id) {
                    lyb.get(id).refresh();
                }
            }
        })
    }
})();
/**
 * @author tianxinlong
 * @date 2017-11-25
 * @description promise的简单实现
 * */
(function() {
    var Promise = function(fn) {
        this.doneQueue = [];
        this.exceptionQueue = [];
        this.status = 'pending';
        var that = this;
        window.setTimeout(function() {
            that._init(fn);
        }, 0);
    };

    Promise.all = function() {
        var array = Array.prototype.slice.call(arguments);
        var count = 0,
            len = array.length,
            result = [];

        return new Promise(function(resolve, reject) {
            for (var i = 0; i < len; i++) {
                var fn = array[i];
                new Promise(fn).then(function(value) {
                    result.push(value);
                    count++;
                    if (count === len) {
                        resolve(result);
                    }
                })
            }
        });
    };
    Promise.race = function() {
        var array = Array.prototype.slice.call(arguments);
        return new Promise(function(resolve, reject) {
            for (var i = 0, len = array.length; i < len; i++) {
                var fn = array[i];
                new Promise(fn).then(function(value) {
                    resolve(result);
                });
            }
        });
    };

    Promise.prototype = {
        _init: function(fn) {
            var that = this;
            fn = fn || lyb.noop;
            fn.call(this, function(value) {
                that.status = 'resolve';
                that._fireThen(value);
            }, function(value) {
                that.status = 'reject';
                that._fireThen(value);
            });
        },
        then: function(done, fail) {
            this.status = 'pending';
            this.doneQueue.push({ done: done, fail: fail });
            return this;
        },
        catch: function(exception) {
            this.status = 'pending';
            this.exceptionQueue.push(exception);
            return this;
        },
        finally: function(fn) {
            this.status = 'pending';
            this._finally = fn || lyb.noop;
            return this;
        },
        _fireThen: function(value) {
            var fnKV = this.doneQueue.shift();
            do {
                try {
                    if (fnKV) {
                        var fn;
                        if (this.status === 'resolve' && fnKV.done) {
                            // this.status = 'pending';
                            fn = fnKV.done.call(this, value);
                        } else if (this.status === 'reject' && fnKV.fail) {
                            // this.status = 'pending';
                            fn = fnKV.fail.call(this, value);
                        }
                        // if (fn && fn instanceof Promise) {
                        //     fn.finally = this._finally;
                        // }
                    } else {
                        this._fireFinally();
                    }
                } catch (e) {
                    this._fireCatch(e);
                }
            } while (fnKV = this.doneQueue.shift());
        },
        _fireFinally: function() {
            if (this.doneQueue.length === 0 && this.exceptionQueue.length === 0) {
                this._finally && this._finally.call(this);
            }
        },
        _fireCatch: function(e) {
            var except = this.exceptionQueue.shift();
            try {
                if (except) {
                    except.call(this, value);
                    this._fireFinally();
                }
            } catch (e) {
                this._fireCatch(e);
            }
        }
    };
    lyb.Promise = Promise;
})();

window.Cookie = {
    getExpiresDate: function(days, hours, minutes) {
        var ExpiresDate = new Date();
        if (typeof days == "number" && typeof hours == "number" &&
            typeof hours == "number") {
            ExpiresDate.setDate(ExpiresDate.getDate() + parseInt(days));
            ExpiresDate.setHours(ExpiresDate.getHours() + parseInt(hours));
            ExpiresDate.setMinutes(ExpiresDate.getMinutes() + parseInt(minutes));
            return ExpiresDate.toGMTString();
        }
    },
    _getValue: function(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    },
    get: function(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                return this._getValue(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return "";
    },
    set: function(name, value, expires, path, domain, secure) {
        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    },
    remove: function(name, path, domain) {
        if (this.get(name)) {
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    },
    clear: function() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++)
            var cookieName = cookies[i].split('=')[0];
        if (cookieName == 'ProductListIds') {
            this.remove(cookieName);
        }
    }
};
//快速导航
lyb.fastNav = function() {
    var id = lyb.getUUID(),
        _position = localStorage.getItem('_FASTBUTTON'),
        winHeight = jQuery(window).height();
    if (!_position) {
        _position = 90;
        localStorage.setItem('_FASTBUTTON', _position);
    }

    var html = '<div id="' + id + '" class="lyb_aside" style="bottom: ' + _position + 'px;right: 0;">' +
        '<div class="lyb-mask_transparent"></div> ' +
        '<div class="lyb_aside_nav">' +
        '<div class="lyb_aside_nav_btn">' +
        '<i class="nav-text">快速导航</i>' +
        '</div> ' +
        '<div class="his-flex">' +
        '<a href="' + ctx + 'html/index.html" class="weui-tabbar__item"><i class="icon-home weui-tabbar__icon"></i><p class="weui-tabbar__label">首页</p></a>' +
        '<a href="' + ctx + 'html/chat/chat_list.html" class="weui-tabbar__item"><i class=" icon-comments weui-tabbar__icon"></i><p class="weui-tabbar__label">咨询</p></a>' +
        '<a href="' + ctx + 'html/discovery/discovery.html" class="weui-tabbar__item"><i class="icon-globe weui-tabbar__icon"></i><p class="weui-tabbar__label">发现</p></a>' +
        '<a href="' + ctx + 'html/personal/personal.html" class="weui-tabbar__item"><i class="icon-user weui-tabbar__icon"></i><p class="weui-tabbar__label">我的</p></a>' +
        '</div>' +
        '</div>' +
        '</div>';
    var url = window.location.href;
    var uri = url.split('?')[0].split('#')[0];
    if (/\/index.html$/.test(uri) || /\/chat_list.html$/.test(uri) || /\/personal.html$/.test(uri) ||
        /\/discovery.html$/.test(uri) || /\/phone_pay.html$/.test(uri) || /\/bind.html$/.test(uri) || /\/add_info.html$/.test(uri) ||
        /\/selector\/\w+.html$/.test(uri) || /\/activities\/\w*_*\w+\/\w+.html$/.test(uri)) {
        return;
    }

    jQuery(document.body).append(html);
    var nav = jQuery('#' + id);
    var textEl = jQuery('.nav-text', nav);

    var allowMove = false,
        _btnPosition = 0,
        _start = 0,
        _move = 0,
        stopExpend = false;

    var toggleFastNav = function() {
        if (!stopExpend) {
            if (nav[0].classList.contains('show')) {
                textEl.html('快速导航');
            } else {
                textEl.html('收起');
            }
            nav.toggleClass('show');
        }
    };
    var moveBtn = nav.find('.lyb_aside_nav_btn')[0],
        background = nav.find('.lyb-mask_transparent')[0];
    background.addEventListener('click', toggleFastNav);
    background.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });
    moveBtn.addEventListener('click', toggleFastNav);
    moveBtn.addEventListener('touchstart', function(e) {
        allowMove = true;
        _btnPosition = jQuery(window) - jQuery(this).offset().top;
        _start = e.touches[0].clientY;
    });
    moveBtn.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if (allowMove) {
            _move = e.touches[0].clientY - _start;
            if (_position - _move <= 5) {
                nav.css('bottom', 5);
            } else if (_position - _move >= winHeight - 65) {
                nav.css('bottom', winHeight - 65);
            } else {
                nav.css('bottom', _position - _move);
            }
            stopExpend = true;
        }
    });
    moveBtn.addEventListener('touchend', function(e) {
        if (allowMove) {
            window.setTimeout(function() {
                stopExpend = false;
            }, 100);
        }
        allowMove = false;

        if (_position - _move <= 5) {
            _position = 5;
        } else if (_position - _move >= winHeight - 65) {
            _position = winHeight - 65;
        } else {
            _position -= _move;
        }

        _move = _start = _btnPosition = 0;
        localStorage.setItem('_FASTBUTTON', _position);
    });
};

//更新滑动页面数据
window.updateSliderData = function(cbFn, data, times) {
    history.go(-(times || 1));
    window.setTimeout(function() { //必须用延时加载，否则url设置太快，导致单页面失效
        lyb.updateUrl(data);
        if (cbFn) {
            cbFn(data);
        }
    }, 200);
};

//图片加载成功
(function() {
    lyb.imgLoaded = function(list, callback) {
        var count = 0,
            finished = 0,
            len = list.length;
        if (list instanceof jQuery) {
            list = list.toArray();
        }
        for (var i = 0; i < len; i++) {
            var el = list[i];
            if (jQuery(el).height() !== 0) {
                finished++;
                continue;
            }
            el.addEventListener('load', function() {
                count++;
                if ((count + finished) >= len) {
                    callback();
                }
            });
        }

    }
})();

//客户端机型检测
(function($, window) {
    function detect(ua) {
        this.os = {};
        var funcs = [

            function() { //wechat
                var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
                if (wechat) { //wechat
                    this.os.wechat = {
                        version: wechat[2].replace(/_/g, '.')
                    };
                }
                return false;
            },
            function() { //android
                var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
                if (android) {
                    this.os.android = true;
                    this.os.version = android[2];

                    this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
                }
                return this.os.android === true;
            },
            function() { //ios
                var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
                if (iphone) { //iphone
                    this.os.ios = this.os.iphone = true;
                    this.os.version = iphone[2].replace(/_/g, '.');
                } else {
                    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
                    if (ipad) { //ipad
                        this.os.ios = this.os.ipad = true;
                        this.os.version = ipad[2].replace(/_/g, '.');
                    }
                }
                return this.os.ios === true;
            }
        ];
        [].every.call(funcs, function(func) {
            return !func.call($);
        });
    }

    detect.call($, navigator.userAgent);

    if (lyb.os.ios) {
        var num = lyb.os.version.split('.')[0];
        if (Number(num) < 11) {
            try {
                localStorage.setItem('noShadow', 'true');
            } catch (e) {
                alert('当前系统版本是' + lyb.os.version + '，我站暂不支持该系统版本的无痕模式，为了不影响您的使用，请切换正常模式或升级最新版本（iphone6+）。');
            }

        }
    }
})(lyb, window);

//actionsheet
(function($) {
    var actionSheet = function(options) {
        this.options = options || {};
        this._init();
        this._bindEvents();
        this.render();
    };
    actionSheet.prototype = {
        _init: function() {
            this.textField = this.options.textField || 'text';
            this.valueField = this.options.valueField || 'id';
            this.el = $('<div></div>').appendTo(document.body);
        },
        render: function(array) {
            array = array || this.options.data || [];
            var height = array.length * 41,
                flag = false;
            if (height > 300) {
                height = 300;
                flag = true;
            }

            var html = '<div class="weui-mask weui-animate-fade-in"></div>' +
                '<div class="weui-actionsheet weui-animate-slide-up">' +
                '<div class="weui-actionsheet__menu">';
            if (flag) { //超过预设高度
                html = '<div class="weui-mask weui-animate-fade-in"></div>' +
                    '<div class="weui-actionsheet weui-animate-slide-up">' +
                    '<div class="weui-actionsheet__menu" style="position: relative;height: ' + height + 'px;overflow: auto;">' +
                    '<div class="weui-actionsheet__menu">';
            }

            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                html += '<div class="weui-actionsheet__cell item" data-value="' + (item[this.valueField] || '') + '" style="height: 41px;">' + (item[this.textField] || '') + '</div>';
            }
            if (flag) { //超过预设高度
                html += '</div>';
            }
            html += '</div>' +
                '<div class="weui-actionsheet__action">' +
                '    <div class="weui-actionsheet__cell red-color close">关闭</div>' +
                '</div>' +
                '</div>';
            this.el.html(html);
        },
        _bindEvents: function() {
            var that = this;
            this.el.on('click', '.close,.weui-mask', function(e) {
                that._closeActionSheet.call(that, e);
            });

            this.el.on('click', '.weui-actionsheet__cell.item', function(e) {
                that._itemClick.call(that, e);
            });
        },
        _itemClick: function(e) {
            var el = e.target;
            var dataSet = el.dataset;
            if (this.options.onclick) {
                this.options.onclick({ text: el.innerText, value: dataSet.value });
            }
            this._closeActionSheet();
        },
        _closeActionSheet: function(e) {
            var that = this;
            if (this.options.onclose) {
                this.options.onclose();
            }
            this.el.children('.weui-animate-slide-up').addClass('weui-animate-slide-down');
            this.el.children('.weui-animate-fade-in').removeClass('weui-animate-fade-in');
            window.setTimeout(function() {
                that.el.off('click');
                that.el.remove();
            }, 300);
        }
    };

    lyb.actionSheet = function(options) {
        return new actionSheet(options);
    };
})(jQuery);

//根据生日算年龄 小于1岁显示月
lyb.getAge = function(birthday, endDay) {
    if (!birthday) {
        return ''
    }
    if (typeof birthday === 'string') {
        birthday = birthday.replace(/-/g, '\/');
    }

    var date = new Date(birthday);
    var yearBirthday = date.getFullYear();
    var monthBirthday = date.getMonth();
    var dayBirthday = date.getDate();

    var today = endDay ? new Date(endDay.replace(/-/g, '\/')) : new Date();
    var yearNow = today.getFullYear();
    var monthNow = today.getMonth();
    var dayNow = today.getDate();

    var age = yearNow - yearBirthday;

    if (monthNow <= monthBirthday) {
        if (monthNow === monthBirthday) {
            if (dayNow < dayBirthday) {
                age--;
            }
        } else {
            age--;
        }
    }
    if (age < 0) {
        return 0 + "岁";
    }
    var months = Math.floor(monthNow - monthBirthday);
    if (months < 0) {
        months = 12 + months;
    }
    if (age === 0) {
        if (months === 0) {
            months = 1;
        }
        return months + "个月";
    }
    return age + "岁";
};


//公众号跳转页面执行诸葛打点，判断是否是来自公众号,跳转url参数需携带publicSource参数
lyb.doPublicSourceZhugeTrack = function() {
    var pathMap = {
        '/html/illness/illness_list.html': '点此找明医',
        '/html/activities/tjyl/get_coupon.html': '拆新人福利',
        '/html/personal/personal.html': '开启健康档案',
        '/html/patient/patient_list.html': '查看健康档案',
        '/html/doctor/doctor_recently_list.html': '点此快速复诊',
        '/html/login/login.html': '注册登录页',
        '/html/doctor/doctor_detail.html': '医生主页'
    };
    if (params.publicSource) {
        var source = pathMap[window.location.pathname];
        if (window.location.pathname === '/html/article/art_detail.html') {
            if (params.artId === 'a427050745c24d77a3811efe9e5222a3') {
                source = '正安中医介绍(公众号顶部banner)'
            } else if (params.artId === '28230309554442209c0ad8aefed0b8c3') {
                source = '预约指南'
            }
        }
        zhuge.track('关注公众号', { '来源': decodeURIComponent(params.publicSource) + source });
    }
};

//记录登录人给诸葛
(function() {
    var user = JSON.parse(localStorage.getItem('userInfo') || '{}'),
        status = localStorage.getItem('zhugeIdentify');
    if (!jQuery.isEmptyObject(user) && user.nickName && user.memberId && status !== "1") {
        zhuge.identify(user.memberId, {
            '姓名': user.memeberName,
            '手机号': user.mobile
        });
        localStorage.setItem('zhugeIdentify', '1');
    } else {
        jQuery.ajax(ctx + 'member/info/personal', {
            type: 'get',
            dataType: 'json',
            success: function(result) {
                var data = result.data;
                var obj = {
                    nickName: data.nickname
                };
                if (result.success) {
                    obj.name = data.name;
                    obj.memberId = data.memberId;
                    obj.id = data.memberId;
                    obj.mobile = data.mobile;
                    localStorage.setItem('userInfo', JSON.stringify(obj));
                    zhuge.identify(data.memberId, {
                        '姓名': data.name,
                        '手机号': data.mobile
                    });
                    localStorage.setItem('zhugeIdentify', '1');
                } else {
                    localStorage.setItem('userInfo', JSON.stringify(obj));
                }
            }
        });
    }
})();

(function() {
    /**
     * @Description:
     * @Author:         create by 田鑫龙
     * @Email:          tiantian010110@126.com
     * @CreateDate:     2018-7-6 下午 06:13
     * @Version:        1.0
     */
    var pullToLoading = function(options) {
        this.type = 'pullLoad';
        this._init(options);
        this._bindEvent();
        this._prepare();
    };
    pullToLoading.prototype = {
        _init: function(options) {
            lyb.concat(this, options);
            this.auto = options.auto === undefined || Boolean(options.auto) === true;
            this.direction = this.direction || 'up';
            this.pageNum = this.pageNum || options.pageNum || 1;
            this.pageSize = this.pageSize || options.pageSize || 15;
            this.success = options.success;
            this.reference = options.reference || document.scrollingElement || this.el;
            this.url = options.url;
            this.params = options.params || options.data || {};
            this.noMoreText = options.noMoreText || '没有更多了';
            this.loadingText = options.loadingText || '正在努力的加载';
            this.upMoreText = options.upMoreText || '上拉显示更多';
            this.downMoreText = options.downMoreText || '下拉显示更多';
            this.emptyText = options.emptyText || '没有找到相关数据';
            this.allowPager = options.allowPager === undefined || Boolean(options.allowPager) === true;
            this.el = lyb.type(options.el) === 'string' ? document.querySelector(options.el) : options.el;
            this.id = this.el.id;
            this.borderEl = this.el.querySelector('.pull-border');
            this.upStatusEl = this.borderEl.querySelector('.up');
            this.downStatusEl = this.borderEl.querySelector('.down');
            if (!this.upStatusEl) {
                this.upStatusEl = document.createElement('div');
                this.upStatusEl.classList.add('pull-load-block');
                this.upStatusEl.classList.add('up');
                this.upStatusEl.classList.add('his-hide');
                this.el.appendChild(this.upStatusEl);
            }
            if (!this.downStatusEl) {
                this.downStatusEl = document.createElement('div');
                this.downStatusEl.classList.add('pull-load-block');
                this.downStatusEl.classList.add('down');
                this.downStatusEl.classList.add('his-hide');
                this.el.insertBefore(this.downStatusEl, this.borderEl);
            }
            this._calculate();
            this.direction === 'up' ? this.upStatusEl.classList.remove('his-hide') : this.downStatusEl.classList.remove('his-hide');
        },
        _calculate: function() {
            this.scroll = {
                wrapperHeight: Number(window.getComputedStyle(this.el).getPropertyValue('height').replace(/px/i, '')),
                scrollHeight: document.body.scrollHeight,
                clientHeight: document.body.clientHeight,
                scrollY: 0
            };
        },
        _prepare: function() {
            this.auto && this.load();
        },
        load: function(flag) {
            if (this.preventLoad === true) {
                return;
            }
            var data = this.params;
            if (this.allowPager) {
                data.pageNum = this.pageNum;
                data.pageSize = this.pageSize;
            }
            this.showLoading();
            if (this.request) {
                if (!flag) { //通过flag判断是否为滑动请求 true
                    this.request.abort();
                    delete this.request;
                }
                return;
            }
            this.request = lyb.ajax({
                url: this.url,
                data: data,
                type: 'get',
                dataType: 'json',
                context: this,
                success: this._success
            });
        },
        _success: function(result) {
            result.data = result.data || [];
            if (result.data) {
                if (result.data.length < this.pageSize) {
                    this.setPreventLoad(true);
                    if (this.pageNum === 1 && !result.data.length) {
                        this.showFirstNoMore();
                    } else {
                        this.showNoMore();
                    }
                } else {
                    this.showLoadMore();
                }
            }
            if (this.success) {
                this.success.call(this, result);
            }
            this.pageNum++;
            this.refresh();

            delete this.request;
        },
        setPreventLoad: function(flag) {
            this.preventLoad = flag;
        },
        showFirstNoMore: function() {
            var html = '<div class="no-record padding-20-0" style="margin-top: 100px;">' +
                '<img src="//image-1252304461.file.myqcloud.com/image/no_record.png" alt="" style="height: 100px;"/>' +
                '<div class="light-color font12 padding-0-5">' + this.emptyText + '</div>' +
                '</div>';
            if (this.direction === 'up') {
                this.upStatusEl.style.height = 'auto';
                this.upStatusEl.style.lineHeight = 'initial';
                this.upStatusEl.innerHTML = html;
            } else if (this.direction === 'down') {
                this.showNoMore();
            }
        },
        showNoMore: function() {
            var html = '<div class="his-title-line">' +
                '<span class="light-color font12 padding-0-5">' + this.noMoreText + '</span>' +
                '</div>';
            if (this.direction === 'up') {
                this.upStatusEl.innerHTML = html;
            } else if (this.direction === 'down') {
                this.downStatusEl.innerHTML = html;
                this.downStatusEl.classList.remove('his-hide');
            }
        },
        showLoadMore: function() {
            var text = this.upMoreText;
            if (this.direction === 'down') {
                text = this.downMoreText;
            }
            var html = '<div class="his-title-line">' +
                '        <span class="light-color font12 padding-0-5">' + text + '</span>' +
                '</div>';
            if (this.direction === 'up') {
                this.upStatusEl.innerHTML = html;
            } else if (this.direction === 'down') {
                this.downStatusEl.innerHTML = html;
                this.upStatusEl.classList.remove('his-hide');
            }
        },
        showLoading: function() {
            var html = '<div class="his-title-line">' +
                '<span class="light-color font12 padding-0-5">' +
                '<i class="weui-loading"></i>' +
                '<span style="vertical-align: middle;">' + this.loadingText + '</span>' +
                '</span>' +
                '</div>';
            if (this.direction === 'up') {
                this.upStatusEl.innerHTML = html;
            } else if (this.direction === 'down') {
                this.downStatusEl.innerHTML = html;
                this.downStatusEl.classList.remove('his-hide');
            }
        },
        _bindEvent: function() {
            var that = this;
            window.addEventListener('scroll', function(e) {
                that._scroll(e);
            });
        },
        _scroll: function(e) {
            if (this.reference.offsetHeight > window.screen.availHeight && window.scrollY + window.screen.availHeight >= this.reference.offsetHeight - 150) {
                this.pullUpFlag = true;
                this.load(true); //传参true代表滑动请求
                this.pullUpFlag = false;
            } else if (this.reference.offsetHeight > window.screen.availHeight && window.scrollY < 100) {
                this.pullDownFlag = true;
                this.load(true); //传参true代表滑动请求
                this.pullDownFlag = false;
            }
        },
        refresh: function() {
            this.scroll.clientHeight = document.body.clientHeight;
            this.scroll.scrollHeight = document.body.scrollHeight;
            this.scroll.wrapperHeight = Number(window.getComputedStyle(this.el).getPropertyValue('height').replace(/px/i, ''));
        },
        scrollToBottom: function() {
            var hegith = this.borderEl.scrollHeight;
            window.scrollTo(0, hegith);
        },
        reset: function(callback) {
            this.data = {};
            this.pageNum = 1;
            this.__array = [];
            if (callback) {
                callback.call(this);
            }
            this.setPreventLoad(false);
            this.showLoadMore();
        }
    };

    lyb.pullUpLoading = function(options) {
        return new pullToLoading(options);
    };
    lyb.pullDownLoading = function(options) {
        options.direction = 'down';
        return lyb.pullUpLoading(options);
    };

})();
/*****************************************************source：resources/js/ajax.js*****************************************************//*
* author: 田鑫龙
* date: 2017-11-02
* description: 覆盖lyb.ajax,如果成功就替换ajax
* */
(function () {
    "use strict";
    window.lyb = window.lyb || {};
    lyb.ajax = function (url, options) {
        options = options || {};
        if (typeof url === 'string') {
            options.url = url;
        } else {
            options = url;
        }
        var _default = {
            dataType: 'json',
            type: 'get',
            cache: false,
            async: true,
            timeout: 120000
        };
        _default = lyb.concat(_default, options);

        var _success = options.success || lyb.noop, _error = options.error || lyb.noop,
            _complete = options.complete || lyb.noop, _timeout = options.timeout || lyb.noop;
        _default.context = _default.context || _default;
        _default.success = function (data, xhr, settings) {
            if (data && data.code === 403) {
                if (lyb.wxBrowser) {
                    history.replaceState('', '', lyb.getWxSignInfo(window.location.href));
                    location.reload();
                    return;
                }
            }else if (data && data.code === 401) {
                var callbackUrl = top.location.href;
                sessionStorage.setItem('callbackUrl', callbackUrl);
                history.replaceState('', '', ctx + 'html/login/login.html');
                window.setTimeout(function () {
                    location.reload();
                }, 200);
                return;
            }
            _success.apply(this, arguments);
        };
        _default.timeout = function () {
            _timeout.apply(this, arguments);
            _complete && _complete.apply(this, arguments);
        };
        _default.complete = function (data, xhr, settings) {
            _complete && _complete.apply(this, arguments);
        };
        _default.error = function (xreq, status) {
            console.log(xreq, status);
            // lyb.error('系统异常，攻城狮们正在全力抢救中...');
            _error && _error.apply(this, arguments);
        };

        //如果支持h5则使用formdata发送数据
        var sendData;
        if (_default.type.toLowerCase() === 'post' && window.FormData) {
            sendData = new FormData();
            var data = {};
            var _params = _default.url.split('?')[1];
            if (_params) {
                _params = _params.split('&');
                for (var i = 0, len = _params.length; i < len; i++) {
                    var item = _params[i];
                    var kv = item.split('=');
                    data[kv[0]] = kv[1];
                }
            }
            data = lyb.concat(data, _default.data || {});
            for (var key in data) {
                sendData.append(key, data[key]);
            }
        } else {
            var p = [];
            var data = _default.data || {};
            for (var key in data) {
                p.push(key + '=' + data[key]);
            }
            sendData = p.join('&');
            if(sendData){
                if (_default.url.indexOf('?') === -1) {
                    _default.url += '?' + sendData;
                } else {
                    _default.url += '&' + sendData;
                }
            }
            sendData = null;
        }

        var xhr = new XMLHttpRequest();
        if(_default.async === true) {
            xhr.responseType = _default.dataType;
        }
        xhr.open(_default.type.toUpperCase(), _default.url, Boolean(_default.async));
        if (Boolean(_default.async)) {
            xhr.timeout = _default.timeout || 0;
        }
        xhr.withCredentials = true;//携带cookie
        xhr.onload = function (e) {
            if (this.status === 200) {
                var res = this.response;
                if(lyb.type(this.response) === 'string') {
                    res = JSON.parse(res);
                }
                _default.success.call(_default.context, res);
                _default.complete.call(_default.context, res);
            }
        };
        xhr.onerror = function (e) {
            var res = this.response;
            if(lyb.type(this.response) === 'string') {
                res = JSON.parse(res);
            }
            _default.error.call(_default.context, e);
            _default.complete.call(_default.context, res);
        };
        xhr.ontimeout = function (e) {
            var res = this.response;
            if(lyb.type(this.response) === 'string') {
                res = JSON.parse(res);
            }
            _default.timeout.call(_default.context);
            _default.complete.call(_default.context, res);
        };
        xhr.send(sendData);
        return xhr;
    }
})();
