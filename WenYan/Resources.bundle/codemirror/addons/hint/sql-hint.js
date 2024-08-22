'use strict';(function(g){"object"==typeof exports&&"object"==typeof module?g(require("../../lib/codemirror"),require("../../mode/sql")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../../mode/sql"],g):g(CodeMirror)})(function(g){function u(a){return"[object Array]"==Object.prototype.toString.call(a)}function E(a){a=a.doc.modeOption;"sql"===a&&(a="text/x-sql");return g.resolveMode(a).keywords}function F(a){a=a.doc.modeOption;"sql"===a&&(a="text/x-sql");return g.resolveMode(a).identifierQuote||
"`"}function t(a){return"string"==typeof a?a:a.text}function x(a,b){u(b)&&(b={columns:b});b.text||(b.text=a);return b}function G(a){var b={};if(u(a))for(var c=a.length-1;0<=c;c--){var d=a[c];b[t(d).toUpperCase()]=x(t(d),d)}else if(a)for(c in a)b[c.toUpperCase()]=x(c,a[c]);return b}function y(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}function z(a,b){var c=a.length;b=t(b).substr(0,c);return a.toUpperCase()===b.toUpperCase()}function q(a,b,c,d){if(u(c))for(var e=0;e<c.length;e++)z(b,
c[e])&&a.push(d(c[e]));else for(e in c)if(c.hasOwnProperty(e)){var f=c[e];f=f&&!0!==f?f.displayText?{text:f.text,displayText:f.displayText}:f.text:e;z(b,f)&&a.push(d(f))}}function H(a){"."==a.charAt(0)&&(a=a.substr(1));a=a.split(h+h);for(var b=0;b<a.length;b++)a[b]=a[b].replace(new RegExp(h,"g"),"");return a.join(h)}function v(a){for(var b=t(a).split("."),c=0;c<b.length;c++)b[c]=h+b[c].replace(new RegExp(h,"g"),h+h)+h;b=b.join(".");if("string"==typeof a)return b;a=y(a);a.text=b;return a}function I(a,
b,c,d){for(var e=!1,f=[],A=b.start,r=!0;r;)r="."==b.string.charAt(0),e=e||b.string.charAt(0)==h,A=b.start,f.unshift(H(b.string)),b=d.getTokenAt(n(a.line,b.start)),"."==b.string&&(r=!0,b=d.getTokenAt(n(a.line,b.start)));a=f.join(".");q(c,a,p,function(a){return e?v(a):a});q(c,a,l,function(a){return e?v(a):a});a=f.pop();var k=f.join("."),m=!1,g=k;p[k.toUpperCase()]||(f=k,k=B(k,d),k!==f&&(m=!0));(d=p[k.toUpperCase()])&&d.columns&&(d=d.columns);d&&q(c,a,d,function(a){var b=k;1==m&&(b=g);"string"==typeof a?
a=b+"."+a:(a=y(a),a.text=b+"."+a.text);return e?v(a):a});return A}function J(a,b){a=a.split(/\s+/);for(var c=0;c<a.length;c++)a[c]&&b(a[c].replace(/[,;]/g,""))}function B(a,b){var c=b.doc,d=c.getValue(),e=a.toUpperCase(),f="",h="";a=[];for(var g=n(0,0),k=n(b.lastLine(),b.getLineHandle(b.lastLine()).length),m=d.indexOf(w.QUERY_DIV);-1!=m;)a.push(c.posFromIndex(m)),m=d.indexOf(w.QUERY_DIV,m+1);a.unshift(n(0,0));a.push(n(b.lastLine(),b.getLineHandle(b.lastLine()).text.length));d=null;m=b.getCursor();
for(b=0;b<a.length;b++){if((null==d||0<C(m,d))&&0>=C(m,a[b])){g=d;k=a[b];break}d=a[b]}if(g)for(c=c.getRange(g,k,!1),b=0;b<c.length&&(J(c[b],function(a){var b=a.toUpperCase();b===e&&p[f.toUpperCase()]&&(h=f);b!==w.ALIAS_KEYWORD&&(f=a)}),!h);b++);return h}var p,l,D,h,w={QUERY_DIV:";",ALIAS_KEYWORD:"AS"},n=g.Pos,C=g.cmpPos;g.registerHelper("hint","sql",function(a,b){p=G(b&&b.tables);var c=b&&b.defaultTable;b=b&&b.disableKeywords;l=c&&p[c.toUpperCase()];D=E(a);h=F(a);c&&!l&&(l=B(c,a));l=l||[];l.columns&&
(l=l.columns);c=a.getCursor();var d=[],e=a.getTokenAt(c);e.end>c.ch&&(e.end=c.ch,e.string=e.string.slice(0,c.ch-e.start));if(e.string.match(/^[.`"\w@]\w*$/)){var f=e.string;var g=e.start;var r=e.end}else g=r=c.ch,f="";if("."==f.charAt(0)||f.charAt(0)==h)g=I(c,e,d,a);else{var k=function(a,b){"object"===typeof a?a.className=b:a={text:a,className:b};return a};q(d,f,l,function(a){return k(a,"CodeMirror-hint-table CodeMirror-hint-default-table")});q(d,f,p,function(a){return k(a,"CodeMirror-hint-table")});
b||q(d,f,D,function(a){return k(a.toUpperCase(),"CodeMirror-hint-keyword")})}return{list:d,from:n(c.line,g),to:n(c.line,r)}})});