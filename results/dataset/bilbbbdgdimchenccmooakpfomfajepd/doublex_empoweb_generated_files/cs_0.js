// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bilbbbdgdimchenccmooakpfomfajepd/node_modules/underscore/underscore-min.js

//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);
//# sourceMappingURL=underscore-min.map
// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bilbbbdgdimchenccmooakpfomfajepd/js/Helper.js

var helperDebug=0;  	// 0-off  1-some dbg. messages  2-most dbg. messages  3-all dbg. messages
			// MUST BE 0 FOR RELEASE !!!
			// helper has its own helperDebug, because it doesn't know about debugMode var
helperDebug>0   && console.warn('Begin     Helper.js');
/**
 *   Contructor
 */
function Helper() {

}

/**
 * Define prototype
 */
Helper.prototype = {

};



/**
 * Static method call test
 */
Helper.log = function(tag, object) {
    if (helperDebug) {
        console.log('<' + tag + '>');
        console.log(object);
        console.log('</' + tag + '>');
    }
};



/**
 *
 */
Helper.HHMMSStoSeconds = function HHMMSStoSeconds(str) {
helperDebug>1   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var p = str.split(':'),
        s = 0,
        m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
};



/**
 *
 */
Helper.secondsToHHMMSS = function secondsToHHMMSS(secondsParam, trimLeadingZeros) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var sec_num = parseInt(secondsParam, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return trimLeadingZeros ? Helper.trimLeadingZerosHHMMSS(time) : time;
};



/**
 *
 */
Helper.weightedPercentiles = function weightedPercentiles(values, weights, percentiles) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    // inspired from https://en.wikipedia.org/wiki/Weighted_median and https://en.wikipedia.org/wiki/Percentile#Definition_of_the_Weighted_Percentile_method
    //
    // percentiles to be calculated should be given from lowest to highest,
    // otherwise any lower percentile after higher one won't be calculated properly!
    //
    // example:   Helper.weightedPercentiles([1,2,3,4,5,6,7,8,9,10] , [1,1,1,1,1,1,1,1,1,1], [ 0 , 0.5 , 1])  returns  [1, 5, 10]
    //            Helper.weightedPercentiles(_.range(1,101) , Array(100).fill(1) , [ 0.25 , 0.5 , 0.75])      returns  [25, 50, 75]
    //            Helper.weightedPercentiles([1,2,3,4,5] , [1,1,1,1,1], [ 0.5 ])                              returns  [3]
    //            Helper.weightedPercentiles([1,2,3,4,5] , [2,1,1,1,1], [ 0.5 ])                              returns  [2]
    //

    var list = [];
    var tot = 0;

    // prepare sorted list of values with weights and calculate total weight
    for (var i = 0; i < values.length; i++) {
        list.push({ value : values[i], weight : weights[i]});
        tot += weights[i];
    }
    list.sort(function(a, b) {
        return a.value - b.value;
    });

	// prepare empty results array
    var result = Array(percentiles.length).fill(0);

    // prepare percentile target values
    var percentiletargets = [];
    for (var j = 0; j < percentiles.length; j++) {
    	percentiletargets[j] = percentiles[j] * tot;
    }

    var cur=0;
	j = 0;
    for (var i = 0; i < list.length; i++) {
        // loop through list to find sample matching percentile target values
        cur += list[i].weight;
        if (cur >= percentiletargets[j] ) {	// target reached?
            result[j] = list[i].value;      // save result
            j++;	// next target
        }
        if (j==percentiles.length) break;   // if last target reached, exit loop
    }

    return result;
};



/**
 *
 */
Helper.median = function median(valuesSorted) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var half = Math.floor(valuesSorted.length / 2);
    if (valuesSorted.length % 2)
        return valuesSorted[half];
    else
        return (valuesSorted[half - 1] + valuesSorted[half]) / 2.0;
};



/**
 *
 */
Helper.upperQuartile = function upperQuartile(valuesSorted) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
	if(valuesSorted.length<3) return (0);
//	if(valuesSorted.length<3) return ("-");
	if(Helper.isEven(valuesSorted.length)) { 
		var valuesSortedUpperHalf=valuesSorted.slice(valuesSorted.length/2);
	} else {
		var valuesSortedUpperHalf=valuesSorted.slice((valuesSorted.length+1)/2);
	}
	return Helper.median(valuesSortedUpperHalf);
//    var q3 = Math.round(0.75 * (valuesSorted.length + 1));
//    return (valuesSorted[q3]);
};



/**
 *
 */
Helper.lowerQuartile = function lowerQuartile(valuesSorted) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
	if(valuesSorted.length<3) return (0);
//	if(valuesSorted.length<3) return ("-");
	if(Helper.isEven(valuesSorted.length)) {
		var valuesSortedLowerHalf=valuesSorted.slice(0,valuesSorted.length/2);
	} else {
		var valuesSortedLowerHalf=valuesSorted.slice(0,(valuesSorted.length-1)/2);
	}
	return Helper.median(valuesSortedLowerHalf);
//    var q1 = Math.round(0.25 * (valuesSorted.length + 1));
//    return (valuesSorted[q1]);
};



/**
 *
 */
// Use abstract equality == for "is number" test
Helper.isEven = function isEven(n) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return n == parseFloat(n) ? !(n % 2) : void 0;
}



/**
 *
 */
Helper.heartrateFromHeartRateReserve = function heartrateFromHeartRateReserve(hrr, maxHr, restHr) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return (parseFloat(hrr) / 100 * (parseInt(maxHr) - parseInt(restHr)) + parseInt(restHr)).toFixed(0);
};



/**
 *
 */
Helper.heartRateReserveFromHeartrate = function heartRateReserveFromHeartrate(hr, maxHr, restHr) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return (parseFloat(hr) - parseInt(restHr)) / (parseInt(maxHr) - parseInt(restHr));
};



/**
 *
 */
Helper.hrrPercentFromHeartrate = function hrrPercentFromHeartrate(hr, maxHr, restHr) {
helperDebug>1   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return 100 * (parseFloat(hr) - parseInt(restHr)) / (parseInt(maxHr) - parseInt(restHr));
};



/**
 *
 */
Helper.hrPercentFromHeartrate = function hrPercentFromHeartrate(hr, maxHr) {
helperDebug>1   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return 100 * parseFloat(hr) / parseInt(maxHr);
};



/**
 *
 */
Helper.setToStorage = function setToStorage(extensionId, storageType, key, value, callback) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    // Sending message to background page
    chrome.runtime.sendMessage(extensionId, {
            method: StravistiX.setToStorageMethod,
            params: {
                storage: storageType,
                'key': key,
                'value': value
            }
        },
        function(response) {
            callback(response);
        }
    );
};



/**
 *
 */
Helper.getFromStorage = function getFromStorage(extensionId, storageType, key, callback) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    // Sending message to background page
    chrome.runtime.sendMessage(extensionId, {
            method: StravistiX.getFromStorageMethod,
            params: {
                storage: storageType,
                'key': key
            }
        },
        function(response) {
            callback(response);
        }
    );
};



/**
 *
 */
Helper.includeJs = function includeJs(scriptUrl) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var link = document.createElement('link');
    link.href = chrome.extension.getURL(scriptUrl);
    link.type = 'text/css';
    link.rel = 'stylesheet';
    (document.head || document.documentElement).appendChild(link);
};



/**
 *
 */
Helper.formatNumber = function formatNumber(n, c, d, t) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};



/**
 *
 */
Helper.secondsToDHM = function secondsToDHM(sec_num, trimZeros) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var days = Math.floor(sec_num / 86400);
    var hours = Math.floor((sec_num - (days * 86400)) / 3600);
    var minutes = Math.floor((sec_num - (days * 86400) - (hours * 3600)) / 60);
    if (trimZeros && days === 0) {
        if (hours === 0) {
            return minutes + 'm';
        }
        return hours + 'h ' + minutes + 'm';
    }
    return days + 'd ' + hours + 'h ' + minutes + 'm';
};



/**
 *
 */
Helper.trimLeadingZerosHHMMSS = function trimLeadingZerosHHMMSS(time) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var result = time.replace(/^(0*:)*/, '').replace(/^0*/, '') || "0";
    if (result.indexOf(":") < 0) {
        return result + "s";
    }
    return result;
};



/**
 *
 */
Helper.guid = function guid() {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    // from http://stackoverflow.com/a/105074
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};



/**
 *
 */
Helper.csv = function csv(export_array) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
	// export original Strava streams to csv for easy analysis in Excel
	var csvContent = "data:text/csv;charset=utf-8,";
    var Keys = Object.keys(StravaStreams);
    var KeysExp = [];
    var Size = StravaStreams[Keys[0]].length;
    var Sizes = [];

	index=0;
	index1=0;
	for (val of Keys) {
		if (typeof StravaStreams[Keys[index]] !== 'undefined') {
			KeysExp[index1++]=Keys[index];
			Sizes[index]= (typeof StravaStreams[Keys[index]].length === 'undefined') ? 1 : (StravaStreams[val].length);
			console.log(index+1+": "+val+" ("+Sizes[index++]+")");
		} else index++;
//		console.log(index+1+": "+val+" ("+Sizes[index++]+")");
//		console.log(index+1+": "+val+" ("+ (typeof Sizes[index++] === 'undefined') ? "-" : Sizes[index++]  +")");
	}

	for (index = 0; index < KeysExp.length; index++) {
	    csvContent+='"'+(KeysExp[index])+'"'; if(index<KeysExp.length-1) csvContent+=";";
	}
	csvContent+="\n";

	for (indexn = 0; indexn < Size; indexn++) {				// all rows
		for (index = 0; index < KeysExp.length; index++) {		// all columns
	    	csvContent+='"'+(StravaStreams[KeysExp[index]][indexn]).toString().replace(",",";").replace(".",",")+'"'; if(index<KeysExp.length-1) csvContent+=";";
		}
		csvContent+="\n";
	}
	

	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
//	link.setAttribute("href", escape(csvContent));
	link.setAttribute("download", pageView.activityId()+".csv");
	link.click(); // This will download the data file named "my_data.csv"
	window.open(encodedUri);
	expcsv=window.open("", "", "toolbar=yes, width=600, height=200");
	expcsv.document.write(csvContent);
	
	
};



/**
 *
 */
Helper.getMaxOfArray = function getMaxOfArray(numArray) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
  return Math.max.apply(null, numArray);
};



/**
 *
 */
Helper.getMinOfArray = function getMinOfArray(numArray) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
  return Math.min.apply(null, numArray);
};
helperDebug>0   && console.warn('End       Helper.js');

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bilbbbdgdimchenccmooakpfomfajepd/js/UserSettings.js

var userSettings = {
    extensionHasJustUpdated: false,
    localStorageMustBeCleared: false,
    userGender: 'men',
    userMaxHr: 185,
    userRestHr: 50,
    userFTP: 300,
    userHrrZones: [
        {
            fromHrr: 0,
            toHrr: 30,
        },
        {
            fromHrr: 30,
            toHrr: 50,
        },
        {
            fromHrr: 50,
            toHrr: 60,
        },
        {
            fromHrr: 60,
            toHrr: 70,
        },
        {
            fromHrr: 70,
            toHrr: 80,
        },
        {
            fromHrr: 80,
            toHrr: 90,
        },
        {
            fromHrr: 90,
            toHrr: 100,
        },
        {
            fromHrr: 100,
            toHrr: 110,
        }
    ],
    zones: {
        speed: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 6
        }, {
            from: 6,
            to: 9
        }, {
            from: 9,
            to: 12
        }, {
            from: 12,
            to: 15
        }, {
            from: 15,
            to: 18
        }, {
            from: 18,
            to: 21
        }, {
            from: 21,
            to: 24
        }, {
            from: 24,
            to: 27
        }, {
            from: 27,
            to: 30
        }, {
            from: 30,
            to: 33
        }, {
            from: 33,
            to: 36
        }, {
            from: 36,
            to: 39
        }, {
            from: 39,
            to: 42
        }, {
            from: 42,
            to: 45
        }, {
            from: 45,
            to: 50
        }, {
            from: 50,
            to: 55
        }, {
            from: 55,
            to: 60
        }, {
            from: 60,
            to: 75
        }, {
            from: 75,
            to: 999
        }],
        pace: [{
            from: 0,
            to: 180
        }, {
            from: 180,
            to: 200
        }, {
            from: 200,
            to: 220
        }, {
            from: 220,
            to: 240
        }, {
            from: 240,
            to: 260
        }, {
            from: 260,
            to: 280
        }, {
            from: 280,
            to: 300
        }, {
            from: 300,
            to: 320
        }, {
            from: 320,
            to: 340
        }, {
            from: 340,
            to: 360
        }, {
            from: 360,
            to: 390
        }, {
            from: 390,
            to: 420
        }, {
            from: 420,
            to: 450
        }, {
            from: 450,
            to: 480
        }, {
            from: 480,
            to: 600
        }, {
            from: 600,
            to: 720
        }, {
            from: 720,
            to: 900
        }, {
            from: 900,
            to: 1200
        }, {
            from: 1200,
            to: 1800
        }, {
            from: 1800,
            to: 3599
        }],
        power: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 25
        }, {
            from: 25,
            to: 50
        }, {
            from: 50,
            to: 75
        }, {
            from: 75,
            to: 100
        }, {
            from: 100,
            to: 125
        }, {
            from: 125,
            to: 150
        }, {
            from: 150,
            to: 175
        }, {
            from: 175,
            to: 200
        }, {
            from: 200,
            to: 225
        }, {
            from: 225,
            to: 250
        }, {
            from: 250,
            to: 275
        }, {
            from: 275,
            to: 300
        }, {
            from: 300,
            to: 350
        }, {
            from: 350,
            to: 400
        }, {
            from: 400,
            to: 500
        }, {
            from: 500,
            to: 750
        }, {
            from: 750,
            to: 1000
        }, {
            from: 1000,
            to: 1500
        }, {
            from: 1500,
            to: 9999
        }],
        cyclingCadence: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 10
        }, {
            from: 10,
            to: 20
        }, {
            from: 20,
            to: 30
        }, {
            from: 30,
            to: 40
        }, {
            from: 40,
            to: 50
        }, {
            from: 50,
            to: 55
        }, {
            from: 55,
            to: 60
        }, {
            from: 60,
            to: 65
        }, {
            from: 65,
            to: 70
        }, {
            from: 70,
            to: 75
        }, {
            from: 75,
            to: 80
        }, {
            from: 80,
            to: 85
        }, {
            from: 85,
            to: 90
        }, {
            from: 90,
            to: 95
        }, {
            from: 95,
            to: 100
        }, {
            from: 100,
            to: 105
        }, {
            from: 105,
            to: 110
        }, {
            from: 110,
            to: 120
        }, {
            from: 120,
            to: 150
        }],
        runningCadence: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 10
        }, {
            from: 10,
            to: 20
        }, {
            from: 20,
            to: 30
        }, {
            from: 30,
            to: 40
        }, {
            from: 40,
            to: 45
        }, {
            from: 45,
            to: 48
        }, {
            from: 48,
            to: 51
        }, {
            from: 51,
            to: 54
        }, {
            from: 54,
            to: 57
        }, {
            from: 57,
            to: 60
        }, {
            from: 60,
            to: 63
        }, {
            from: 63,
            to: 66
        }, {
            from: 66,
            to: 70
        }, {
            from: 70,
            to: 75
        }, {
            from: 75,
            to: 80
        }, {
            from: 80,
            to: 85
        }, {
            from: 85,
            to: 90
        }, {
            from: 90,
            to: 100
        }, {
            from: 100,
            to: 120
        }],
        grade: [{
            from: -100,
            to: -50
        }, {
            from: -50,
            to: -30
        }, {
            from: -30,
            to: -20
        }, {
            from: -20,
            to: -15
        }, {
            from: -15,
            to: -12
        }, {
            from: -12,
            to: -9
        }, {
            from: -9,
            to: -6
        }, {
            from: -6,
            to: -3
        }, {
            from: -3,
            to: -1
        }, {
            from: -1,
            to: 1
        }, {
            from: 1,
            to: 3
        }, {
            from: 3,
            to: 6
        }, {
            from: 6,
            to: 9
        }, {
            from: 9,
            to: 12
        }, {
            from: 12,
            to: 15
        }, {
            from: 15,
            to: 20
        }, {
            from: 20,
            to: 30
        }, {
            from: 30,
            to: 40
        }, {
            from: 40,
            to: 50
        }, {
            from: 50,
            to: 100
        }],
        elevation: [{
            from: 0,
            to: 50
        }, {
            from: 50,
            to: 100
        }, {
            from: 100,
            to: 200
        }, {
            from: 200,
            to: 300
        }, {
            from: 300,
            to: 400
        }, {
            from: 400,
            to: 500
        }, {
            from: 500,
            to: 600
        }, {
            from: 600,
            to: 700
        }, {
            from: 700,
            to: 800
        }, {
            from: 800,
            to: 1000
        }, {
            from: 1000,
            to: 1250
        }, {
            from: 1250,
            to: 1500
        }, {
            from: 1500,
            to: 2000
        }, {
            from: 2000,
            to: 2500
        }, {
            from: 2500,
            to: 3000
        }, {
            from: 3000,
            to: 3500
        }, {
            from: 3500,
            to: 4000
        }, {
            from: 4000,
            to: 5000
        }, {
            from: 5000,
            to: 6000
        }, {
            from: 6000,
            to: 8848
        }],
        ascent: [{
            from: 0,
            to: 10
        }, {
            from: 10,
            to: 100
        }, {
            from: 100,
            to: 200
        }, {
            from: 200,
            to: 300
        }, {
            from: 300,
            to: 400
        }, {
            from: 400,
            to: 500
        }, {
            from: 500,
            to: 600
        }, {
            from: 600,
            to: 700
        }, {
            from: 700,
            to: 800
        }, {
            from: 800,
            to: 900
        }, {
            from: 900,
            to: 1000
        }, {
            from: 1000,
            to: 1100
        }, {
            from: 1100,
            to: 1200
        }, {
            from: 1200,
            to: 1300
        }, {
            from: 1300,
            to: 1400
        }, {
            from: 1400,
            to: 1500
        }, {
            from: 1500,
            to: 1750
        }, {
            from: 1750,
            to: 2000
        }, {
            from: 2000,
            to: 2500
        }, {
            from: 2500,
            to: 5000
        }]
    },
    remoteLinks: true,
    feedAutoScroll: true,
    defaultLeaderboardFilter: 'overall',
    activateRunningGradeAdjustedPace: true,
    activateRunningHeartRate: true,
    activityGoogleMapType: 'satellite',
	customMapboxStyle: 'mapbox.outdoors',
    hidePremiumFeatures: true,
    displaySegmentRankPercentage: true,
    displayNearbySegments: true,
    displayMotivationScore: true,
    displayActivityRatio: true,
    displayAdvancedPowerData: true,
    displayAdvancedSpeedData: true,
    displayAdvancedHrData: true,
    displayCadenceData: true,
    displayAdvancedGradeData: true,
    displayAdvancedElevationData: true,
    displayBikeOdoInActivity: true,
    enableBothLegsCadence: false,
    feedHideChallenges: false,
    feedHideCreatedRoutes: false,
    highLightStravistiXFeature: false, // For heartrate related data.
    displaySegmentTimeComparisonToKOM: true,
    displaySegmentTimeComparisonToPR: true,
    reviveGoogleMaps: true,
    reviveGoogleMapsLayerType: 'hybrid',
    displayActivityBestSplits: true,
    bestSplitsConfiguration: null,
    temperatureUnit: 'C',
    windUnit: 'km/h',
};

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bilbbbdgdimchenccmooakpfomfajepd/js/Content.js

var contentDebug=0;
if (contentDebug) console.warn('Begin     Content.js');
//if (contentDebug) console.log(' > > (f:  Content.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
/**
 *   
 */
var Loader = function() {}

Loader.prototype = {

    require: function(scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(chrome.extension.getURL(scripts[i]));
        }
    },
    loaded: function(evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function(src) {

        var ext = src.substr(src.lastIndexOf('.') + 1);

        var self = this;

        if (ext === 'js') {
            var s = document.createElement('script');
            s.type = "text/javascript";
            s.async = false;
            s.src = src;
            s.addEventListener('load', function(e) {
//if (contentDebug) console.log(' > (f:  Content.js) > Load JS:' + src.toString() );
                self.loaded(e);
            }, false);
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(s);
        } else if (ext === 'css') {
//if (contentDebug) console.log(' > (f:  Content.js) > LoadCSS:' + src.toString() );
            var link = document.createElement('link');
            link.href = src;
            link.addEventListener('load', function(e) {
                self.loaded(e);
            }, false);
            link.async = false;
            link.type = 'text/css';
            link.rel = 'stylesheet';
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(link);
        }
    }
}





/**
 *   Content is responsible of ...
 */
function Content(jsDependencies, cssDependencies, userSettings, appResources) {
    this.jsDependencies_ = jsDependencies;
    this.cssDependencies = cssDependencies;
    this.userSettings_ = userSettings;
    this.appResources_ = appResources;
}

/**
 * Define prototype
 */
Content.prototype = {

    loadDependencies: function loadDependencies(finishLoading) {

        var loader = new Loader();
        var dependencies = _.union(this.jsDependencies_, this.cssDependencies);
        loader.require(dependencies, function() {
            finishLoading();
        });
    },

    isExtensionRunnableInThisContext_: function isExtensionRunnableInThisContext_() {

        var isRunnable = true;

        // Eject if http://www.strava.com/routes/new OR http://www.strava.com/routes/XXXX/edit
        if (window.location.pathname.match(/^\/routes\/new/) ||
            window.location.pathname.match(/^\/routes\/(\d+)\/edit$/) ||
            window.location.pathname.match(/^\/about/) ||
            window.location.pathname.match(/^\/running-app/) ||
            window.location.pathname.match(/^\/features/) ||
            window.location.pathname.match(/^\/how-it-works/)) {

            isRunnable = false;
        }

        // Do not run extension if user not logged
        if (document.getElementsByClassName('btn-login').length > 0) {
            isRunnable = false;
        }

        return isRunnable;
    },

    start: function start() {

        // Skip execution if needed
        if (!this.isExtensionRunnableInThisContext_()) {
            console.log("Skipping StravistiX chrome extension execution in this page");
            return;
        }

        var self = this;

        this.loadDependencies(function() {

            chrome.storage.sync.get(this.userSettings_, function(chromeSettings) {

                var injectedScript = document.createElement('script');
                injectedScript.src = chrome.extension.getURL('js/StravistiX.js');
                injectedScript.onload = function() {

                    this.parentNode.removeChild(this);
                    var inner = document.createElement('script');

                    if (_.isEmpty(chromeSettings)) { // If settings from chrome sync storage are empty
                        chromeSettings = self.userSettings_;
                    }

                    inner.textContent = 'var $ = jQuery;';
                    inner.textContent += 'var stravistiX = new StravistiX(' + JSON.stringify(chromeSettings) + ', ' + JSON.stringify(self.appResources_) + ');';

                    inner.onload = function() {
                        this.parentNode.removeChild(this);
                    };
                    (document.head || document.documentElement).appendChild(inner);
                };
                (document.head || document.documentElement).appendChild(injectedScript);
            });

        });

    }
};

var appResources = {
    settingsLink: chrome.extension.getURL('/options/app/index.html'),
    menuIconBlack: chrome.extension.getURL('/icons/ic_menu_24px_black.svg'),
    menuIconOrange: chrome.extension.getURL('/icons/ic_menu_24px_orange.svg'),
//    remoteViewIcon: chrome.extension.getURL('/icons/ic_launch_24px.svg'),
    remoteViewIcon: chrome.extension.getURL('/icons/ic_open_in_new_24px.svg'),
    pollIcon: chrome.extension.getURL('/icons/ic_poll_24px.svg'),
    veloviewerIcon: chrome.extension.getURL('/icons/veloviewer.ico'),
    raceshapeIcon: chrome.extension.getURL('/icons/raceshape.ico'),
    veloviewerDashboardIcon: chrome.extension.getURL('/icons/ic_dashboard_24px.svg'),
    veloviewerChallengesIcon: chrome.extension.getURL('/icons/ic_landscape_24px.svg'),
    labIcon: chrome.extension.getURL('/icons/lab.png'),
    settingsIcon: chrome.extension.getURL('/icons/ic_settings_24px.svg'),
    heartIcon: chrome.extension.getURL('/icons/ic_favorite_24px.svg'),
    zonesIcon: chrome.extension.getURL('/icons/ic_format_line_spacing_24px.svg'),
    komMapIcon: chrome.extension.getURL('/icons/ic_looks_one_24px.svg'),
    heatmapIcon: chrome.extension.getURL('/icons/ic_whatshot_24px.svg'),
    bugIcon: chrome.extension.getURL('/icons/ic_bug_report_24px.svg'),
    rateIcon: chrome.extension.getURL('/icons/ic_star_24px.svg'),
    aboutIcon: chrome.extension.getURL('/icons/ic_info_outline_24px.svg'),
    eyeIcon: chrome.extension.getURL('/icons/ic_remove_red_eye_24px.svg'),
    bikeIcon: chrome.extension.getURL('/icons/ic_directions_bike_24px.svg'),
   OCMIcon: chrome.extension.getURL('/icons/OCM24.png'),
   OCMlsIcon: chrome.extension.getURL('/icons/OCMls24.png'),
   OCModIcon: chrome.extension.getURL('/icons/OCMod24.png'),
   OSMIcon: chrome.extension.getURL('/icons/OSM24.png'),
   OSMhbIcon: chrome.extension.getURL('/icons/OSMhikebike24.png'),
   MBIcon: chrome.extension.getURL('/icons/Mapbox24.png'),
   GMIcon: chrome.extension.getURL('/icons/GM24.png'),
   aRPEeIcon: chrome.extension.getURL('/icons/aRPEe.png'),
   heartbeatIcon: chrome.extension.getURL('/icons/heartbeat.png'),
   sisuIcon: chrome.extension.getURL('/icons/sisu.png'),
   KOMdefenderIcon: chrome.extension.getURL('/icons/komdefender.png'),
   segmentIcon: chrome.extension.getURL('/icons/Segment64.png'),
   AnnualSummIcon: chrome.extension.getURL('/icons/JOKAnnualSummary16.png'),
   multimapIcon: chrome.extension.getURL('/icons/JOKAmultimap.png'),
   gpsvisualizerIcon: chrome.extension.getURL('/icons/gpsvisualizer.png'),
   gpsvProfileIcon: chrome.extension.getURL('/icons/gpsvisualizer_profile.png'),
   gpsvMapIcon: chrome.extension.getURL('/icons/gpsvisualizer_map.png'),
    wheatherIcon: chrome.extension.getURL('/icons/ic_wb_sunny_24px.svg'),
    twitterIcon: chrome.extension.getURL('/icons/twitter.svg'),
    systemUpdatesIcon: chrome.extension.getURL('/icons/ic_system_update_24px.svg'),
    donateIcon: chrome.extension.getURL('/icons/ic_attach_money_24px.svg'),
    shareIcon: chrome.extension.getURL('/icons/ic_share_24px.svg'),
    trackChangesIcon: chrome.extension.getURL('/icons/ic_track_changes_24px.svg'),
    trendingUpIcon: chrome.extension.getURL('/icons/ic_trending_up_black_24px.svg'),
    qrCodeIcon: chrome.extension.getURL('/icons/qrcode.svg'),
    extVersion: chrome.runtime.getManifest().version,
    extensionId: chrome.runtime.id,
};

var jsDependencies = [
    'config/env.js',
    'node_modules/chart.js/Chart.min.js',
    'node_modules/fiber/src/fiber.min.js',
    'node_modules/fancybox/dist/js/jquery.fancybox.pack.js',
    'modules/StorageManager.js',
    'modules/geo.js',
    'modules/latlong.js',
    'modules/qrcode.min.js',
//    'modules/simplify.js',
    'modules/vv.mapFlipper.js',
    'js/processors/VacuumProcessor.js',
    'js/processors/ActivityProcessor.js',
    'js/processors/BikeOdoProcessor.js',
    'js/processors/SegmentProcessor.js',
    'js/Helper.js',
    'js/Follow.js',
    'js/modifiers/ActivityScrollingModifier.js',
    'js/modifiers/RemoteLinksModifier.js',
    'js/modifiers/WindyTyModifier.js',
    'js/modifiers/DefaultLeaderboardFilterModifier.js',
    'js/modifiers/MenuModifier.js',
    'js/modifiers/SegmentRankPercentageModifier.js',
    'js/modifiers/VirtualPartnerModifier.js',
    'js/modifiers/ActivityGoogleMapTypeModifier.js',
    'js/modifiers/HidePremiumModifier.js',
    'js/modifiers/AthleteStatsModifier.js',
    'js/modifiers/ActivitySegmentTimeComparisonModifier.js',
    'js/modifiers/ActivityBestSplitsModifier.js',

    // Extended data views
    'js/modifiers/extendedActivityData/views/AbstractDataView.js',
    'js/modifiers/extendedActivityData/views/FeaturedDataView.js',
    'js/modifiers/extendedActivityData/views/SpeedDataView.js',
    'js/modifiers/extendedActivityData/views/PaceDataView.js',
    'js/modifiers/extendedActivityData/views/HeartRateDataView.js',
    'js/modifiers/extendedActivityData/views/AbstractCadenceDataView.js',
    'js/modifiers/extendedActivityData/views/CyclingCadenceDataView.js',
    'js/modifiers/extendedActivityData/views/RunningCadenceDataView.js',
    'js/modifiers/extendedActivityData/views/PowerDataView.js',
    'js/modifiers/extendedActivityData/views/ElevationDataView.js',
    'js/modifiers/extendedActivityData/views/AscentSpeedDataView.js',
    'js/modifiers/extendedActivityData/views/AbstractGradeDataView.js',
    'js/modifiers/extendedActivityData/views/CyclingGradeDataView.js',
    'js/modifiers/extendedActivityData/views/RunnningGradeDataView.js',

    // Extended data modifiers
    'js/modifiers/extendedActivityData/AbstractExtendedActivityDataModifier.js',
    'js/modifiers/extendedActivityData/CyclingExtendedActivityDataModifier.js',
    'js/modifiers/extendedActivityData/RunningExtendedActivityDataModifier.js',
    'js/modifiers/extendedActivityData/GenericExtendedActivityDataModifier.js',

    'js/modifiers/HideFeedModifier.js',
    'js/modifiers/DisplayFlyByFeedModifier.js',
    'js/modifiers/ActivityBikeOdoModifier.js',
    'js/modifiers/ActivityQRCodeDisplayModifier.js',
    'js/modifiers/RunningGradeAdjustedPaceModifier.js',
    'js/modifiers/RunningHeartRateModifier.js',
    'js/modifiers/NearbySegmentsModifier.js',
    'js/modifiers/GoogleMapsComeBackModifier.js'
];

var cssDependencies = [
    'node_modules/fancybox/dist/css/jquery.fancybox.css',
    'css/extendedData.css'
];


var content = new Content(jsDependencies, cssDependencies, userSettings, appResources);
content.start();
if (contentDebug) console.warn('End       Content.js');

