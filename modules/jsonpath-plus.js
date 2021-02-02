function t(r){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(r)}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function e(t,r){return(e=Object.setPrototypeOf||function(t,r){return t.__proto__=r,t})(t,r)}function n(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function a(t,r,o){return(a=n()?Reflect.construct:function(t,r,n){var a=[null];a.push.apply(a,r);var o=new(Function.bind.apply(t,a));return n&&e(o,n.prototype),o}).apply(null,arguments)}function o(t){var n="function"==typeof Map?new Map:void 0;return(o=function(t){if(null===t||(o=t,-1===Function.toString.call(o).indexOf("[native code]")))return t;var o;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,u)}function u(){return a(t,arguments,r(this).constructor)}return u.prototype=Object.create(t.prototype,{constructor:{value:u,enumerable:!1,writable:!0,configurable:!0}}),e(u,t)})(t)}function u(t,r){return!r||"object"!=typeof r&&"function"!=typeof r?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):r}function i(t){return function(t){if(Array.isArray(t))return l(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||c(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,r){if(t){if("string"==typeof t)return l(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(t,r):void 0}}function l(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}var s=Object.prototype.hasOwnProperty;function p(t,r){return(t=t.slice()).push(r),t}function h(t,r){return(r=r.slice()).unshift(t),r}var f=function(t){!function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),r&&e(t,r)}(l,o(Error));var a,i,c=(a=l,i=n(),function(){var t,e=r(a);if(i){var n=r(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return u(this,t)});function l(t){var r;return function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,l),(r=c.call(this,'JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)')).avoidNew=!0,r.value=t,r.name="NewError",r}return l}();function y(r,e,n,a,o){if(!(this instanceof y))try{return new y(r,e,n,a,o)}catch(t){if(!t.avoidNew)throw t;return t.value}"string"==typeof r&&(o=a,a=n,n=e,e=r,r=null);var u=r&&"object"===t(r);if(r=r||{},this.json=r.json||n,this.path=r.path||e,this.resultType=r.resultType||"value",this.flatten=r.flatten||!1,this.wrap=!s.call(r,"wrap")||r.wrap,this.sandbox=r.sandbox||{},this.preventEval=r.preventEval||!1,this.parent=r.parent||null,this.parentProperty=r.parentProperty||null,this.callback=r.callback||a||null,this.otherTypeCallback=r.otherTypeCallback||o||function(){throw new TypeError("You must supply an otherTypeCallback callback option with the @other() operator.")},!1!==r.autostart){var i={path:u?r.path:e};u?"json"in r&&(i.json=r.json):i.json=n;var c=this.evaluate(i);if(!c||"object"!==t(c))throw new f(c);return c}}y.prototype.evaluate=function(r,e,n,a){var o=this,u=this.parent,i=this.parentProperty,c=this.flatten,l=this.wrap;if(this.currResultType=this.resultType,this.currPreventEval=this.preventEval,this.currSandbox=this.sandbox,n=n||this.callback,this.currOtherTypeCallback=a||this.otherTypeCallback,e=e||this.json,(r=r||this.path)&&"object"===t(r)&&!Array.isArray(r)){if(!r.path&&""!==r.path)throw new TypeError('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');if(!s.call(r,"json"))throw new TypeError('You must supply a "json" property when providing an object argument to JSONPath.evaluate().');e=r.json,c=s.call(r,"flatten")?r.flatten:c,this.currResultType=s.call(r,"resultType")?r.resultType:this.currResultType,this.currSandbox=s.call(r,"sandbox")?r.sandbox:this.currSandbox,l=s.call(r,"wrap")?r.wrap:l,this.currPreventEval=s.call(r,"preventEval")?r.preventEval:this.currPreventEval,n=s.call(r,"callback")?r.callback:n,this.currOtherTypeCallback=s.call(r,"otherTypeCallback")?r.otherTypeCallback:this.currOtherTypeCallback,u=s.call(r,"parent")?r.parent:u,i=s.call(r,"parentProperty")?r.parentProperty:i,r=r.path}if(u=u||null,i=i||null,Array.isArray(r)&&(r=y.toPathString(r)),(r||""===r)&&e){this._obj=e;var p=y.toPathArray(r);"$"===p[0]&&p.length>1&&p.shift(),this._hasParentSelector=null;var h=this._trace(p,e,["$"],u,i,n).filter((function(t){return t&&!t.isParentSelector}));return h.length?l||1!==h.length||h[0].hasArrExpr?h.reduce((function(t,r){var e=o._getPreferredOutput(r);return c&&Array.isArray(e)?t=t.concat(e):t.push(e),t}),[]):this._getPreferredOutput(h[0]):l?[]:void 0}},y.prototype._getPreferredOutput=function(t){var r=this.currResultType;switch(r){case"all":var e=Array.isArray(t.path)?t.path:y.toPathArray(t.path);return t.pointer=y.toPointer(e),t.path="string"==typeof t.path?t.path:y.toPathString(t.path),t;case"value":case"parent":case"parentProperty":return t[r];case"path":return y.toPathString(t[r]);case"pointer":return y.toPointer(t.path);default:throw new TypeError("Unknown result type")}},y.prototype._handleCallback=function(t,r,e){if(r){var n=this._getPreferredOutput(t);t.path="string"==typeof t.path?t.path:y.toPathString(t.path),r(n,e,t)}},y.prototype._trace=function(r,e,n,a,o,u,i,l){var f,y=this;if(!r.length)return f={path:n,value:e,parent:a,parentProperty:o,hasArrExpr:i},this._handleCallback(f,u,"value"),f;var v=r[0],b=r.slice(1),F=[];function d(t){Array.isArray(t)?t.forEach((function(t){F.push(t)})):F.push(t)}if(("string"!=typeof v||l)&&e&&s.call(e,v))d(this._trace(b,e[v],p(n,v),e,v,u,i));else if("*"===v)this._walk(v,b,e,n,a,o,u,(function(t,r,e,n,a,o,u,i){d(y._trace(h(t,e),n,a,o,u,i,!0,!0))}));else if(".."===v)d(this._trace(b,e,n,a,o,u,i)),this._walk(v,b,e,n,a,o,u,(function(r,e,n,a,o,u,i,c){"object"===t(a[r])&&d(y._trace(h(e,n),a[r],p(o,r),a,r,c,!0))}));else{if("^"===v)return this._hasParentSelector=!0,{path:n.slice(0,-1),expr:b,isParentSelector:!0};if("~"===v)return f={path:p(n,v),value:o,parent:a,parentProperty:null},this._handleCallback(f,u,"property"),f;if("$"===v)d(this._trace(b,e,n,null,null,u,i));else if(/^(\x2D?[0-9]*):(\x2D?[0-9]*):?([0-9]*)$/.test(v))d(this._slice(v,b,e,n,a,o,u));else if(0===v.indexOf("?(")){if(this.currPreventEval)throw new Error("Eval [?(expr)] prevented in JSONPath expression.");this._walk(v,b,e,n,a,o,u,(function(t,r,e,n,a,o,u,i){y._eval(r.replace(/^\?\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?)\)$/,"$1"),n[t],t,a,o,u)&&d(y._trace(h(t,e),n,a,o,u,i,!0))}))}else if("("===v[0]){if(this.currPreventEval)throw new Error("Eval [(expr)] prevented in JSONPath expression.");d(this._trace(h(this._eval(v,e,n[n.length-1],n.slice(0,-1),a,o),b),e,n,a,o,u,i))}else if("@"===v[0]){var g=!1,_=v.slice(1,-2);switch(_){case"scalar":e&&["object","function"].includes(t(e))||(g=!0);break;case"boolean":case"string":case"undefined":case"function":t(e)===_&&(g=!0);break;case"integer":!Number.isFinite(e)||e%1||(g=!0);break;case"number":Number.isFinite(e)&&(g=!0);break;case"nonFinite":"number"!=typeof e||Number.isFinite(e)||(g=!0);break;case"object":e&&t(e)===_&&(g=!0);break;case"array":Array.isArray(e)&&(g=!0);break;case"other":g=this.currOtherTypeCallback(e,n,a,o);break;case"null":null===e&&(g=!0);break;default:throw new TypeError("Unknown value type "+_)}if(g)return f={path:n,value:e,parent:a,parentProperty:o},this._handleCallback(f,u,"value"),f}else if("`"===v[0]&&e&&s.call(e,v.slice(1))){var w=v.slice(1);d(this._trace(b,e[w],p(n,w),e,w,u,i,!0))}else if(v.includes(",")){var m,D=function(t,r){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=c(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,i=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return u=t.done,t},e:function(t){i=!0,o=t},f:function(){try{u||null==e.return||e.return()}finally{if(i)throw o}}}}(v.split(","));try{for(D.s();!(m=D.n()).done;){var P=m.value;d(this._trace(h(P,b),e,n,a,o,u,!0))}}catch(t){D.e(t)}finally{D.f()}}else!l&&e&&s.call(e,v)&&d(this._trace(b,e[v],p(n,v),e,v,u,i,!0))}if(this._hasParentSelector)for(var S=0;S<F.length;S++){var x=F[S];if(x&&x.isParentSelector){var E=y._trace(x.expr,e,x.path,a,o,u,i);if(Array.isArray(E)){F[S]=E[0];for(var A=E.length,j=1;j<A;j++)S++,F.splice(S,0,E[j])}else F[S]=E}}return F},y.prototype._walk=function(r,e,n,a,o,u,i,c){if(Array.isArray(n))for(var l=n.length,s=0;s<l;s++)c(s,r,e,n,a,o,u,i);else n&&"object"===t(n)&&Object.keys(n).forEach((function(t){c(t,r,e,n,a,o,u,i)}))},y.prototype._slice=function(t,r,e,n,a,o,u){if(Array.isArray(e)){var i=e.length,c=t.split(":"),l=c[2]&&Number.parseInt(c[2])||1,s=c[0]&&Number.parseInt(c[0])||0,p=c[1]&&Number.parseInt(c[1])||i;s=s<0?Math.max(0,s+i):Math.min(i,s),p=p<0?Math.max(0,p+i):Math.min(i,p);for(var f=[],y=s;y<p;y+=l){this._trace(h(y,r),e,n,a,o,u,!0).forEach((function(t){f.push(t)}))}return f}},y.prototype._eval=function(t,r,e,n,a,o){if(!this._obj||!r)return!1;t.includes("@parentProperty")&&(this.currSandbox._$_parentProperty=o,t=t.replace(/@parentProperty/g,"_$_parentProperty")),t.includes("@parent")&&(this.currSandbox._$_parent=a,t=t.replace(/@parent/g,"_$_parent")),t.includes("@property")&&(this.currSandbox._$_property=e,t=t.replace(/@property/g,"_$_property")),t.includes("@path")&&(this.currSandbox._$_path=y.toPathString(n.concat([e])),t=t.replace(/@path/g,"_$_path")),t.includes("@root")&&(this.currSandbox._$_root=this.json,t=t.replace(/@root/g,"_$_root")),/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/.test(t)&&(this.currSandbox._$_v=r,t=t.replace(/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/g,"_$_v$1"));try{return this.vm.runInNewContext(t,this.currSandbox)}catch(r){throw console.log(r),new Error("jsonPath: "+r.message+": "+t)}},y.cache={},y.toPathString=function(t){for(var r=t,e=r.length,n="$",a=1;a<e;a++)/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(r[a])||(n+=/^[\*0-9]+$/.test(r[a])?"["+r[a]+"]":"['"+r[a]+"']");return n},y.toPointer=function(t){for(var r=t,e=r.length,n="",a=1;a<e;a++)/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(r[a])||(n+="/"+r[a].toString().replace(/~/g,"~0").replace(/\//g,"~1"));return n},y.toPathArray=function(t){var r=y.cache;if(r[t])return r[t].concat();var e=[],n=t.replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/g,";$&;").replace(/['\[](\??\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\))['\]]/g,(function(t,r){return"[#"+(e.push(r)-1)+"]"})).replace(/\['((?:(?!['\]])[\s\S])*)'\]/g,(function(t,r){return"['"+r.replace(/\./g,"%@%").replace(/~/g,"%%@@%%")+"']"})).replace(/~/g,";~;").replace(/'?\.'?(?!(?:(?!\[)[\s\S])*\])|\['?/g,";").replace(/%@%/g,".").replace(/%%@@%%/g,"~").replace(/(?:;)?(\^+)(?:;)?/g,(function(t,r){return";"+r.split("").join(";")+";"})).replace(/;;;|;;/g,";..;").replace(/;$|'?\]|'$/g,"").split(";").map((function(t){var r=t.match(/#([0-9]+)/);return r&&r[1]?e[r[1]]:t}));return r[t]=n,r[t]};y.prototype.vm={runInNewContext:function(t,r){var e=Object.keys(r),n=[];!function(t,r,e){for(var n=t.length,a=0;a<n;a++)e(t[a])&&r.push(t.splice(a--,1)[0])}(e,n,(function(t){return"function"==typeof r[t]}));var o=e.map((function(t,e){return r[t]})),u=n.reduce((function(t,e){var n=r[e].toString();return/function/.test(n)||(n="function "+n),"var "+e+"="+n+";"+t}),"");/(["'])use strict\1/.test(t=u+t)||e.includes("arguments")||(t="var arguments = undefined;"+t);var c=(t=t.replace(/;[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/,"")).lastIndexOf(";"),l=c>-1?t.slice(0,c+1)+" return "+t.slice(c+1):" return "+t;return a(Function,i(e).concat([l])).apply(void 0,i(o))}};export{y as JSONPath};
//# sourceMappingURL=index-browser-esm.min.js.map