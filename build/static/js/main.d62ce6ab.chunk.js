/*! For license information please see main.d62ce6ab.chunk.js.LICENSE.txt */
(this.webpackJsonpimdb=this.webpackJsonpimdb||[]).push([[0],{15:function(t,e,n){},16:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var r=n(1),i=n.n(r),c=n(5),o=n.n(c),a=(n(15),n(6)),s=n(7),l=n(10),u=n(9),h=n(2),d=n(3),f=(n(16),n(8)),p=n.n(f),j=n(0);function m(){m=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},i=r.iterator||"@@iterator",c=r.asyncIterator||"@@asyncIterator",o=r.toStringTag||"@@toStringTag";function a(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{a({},"")}catch(S){a=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var i=e&&e.prototype instanceof h?e:h,c=Object.create(i.prototype),o=new N(r||[]);return c._invoke=function(t,e,n){var r="suspendedStart";return function(i,c){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===i)throw c;return L()}for(n.method=i,n.arg=c;;){var o=n.delegate;if(o){var a=y(o,n);if(a){if(a===u)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=l(t,e,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===u)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(t,n,o),c}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(S){return{type:"throw",arg:S}}}t.wrap=s;var u={};function h(){}function d(){}function f(){}var p={};a(p,i,(function(){return this}));var j=Object.getPrototypeOf,b=j&&j(j(E([])));b&&b!==e&&n.call(b,i)&&(p=b);var v=f.prototype=h.prototype=Object.create(p);function x(t){["next","throw","return"].forEach((function(e){a(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(i,c,o,a){var s=l(t[i],t,c);if("throw"!==s.type){var u=s.arg,h=u.value;return h&&"object"==typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,o,a)}),(function(t){r("throw",t,o,a)})):e.resolve(h).then((function(t){u.value=t,o(u)}),(function(t){return r("throw",t,o,a)}))}a(s.arg)}var i;this._invoke=function(t,n){function c(){return new e((function(e,i){r(t,n,e,i)}))}return i=i?i.then(c,c):c()}}function y(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,y(t,e),"throw"===e.method))return u;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var r=l(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,u;var i=r.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,u):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,u)}function g(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function w(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(g,this),this.reset(!0)}function E(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,c=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return c.next=c}}return{next:L}}function L(){return{value:void 0,done:!0}}return d.prototype=f,a(v,"constructor",f),a(f,"constructor",d),d.displayName=a(f,o,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,f):(t.__proto__=f,a(t,o,"GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},x(O.prototype),a(O.prototype,c,(function(){return this})),t.AsyncIterator=O,t.async=function(e,n,r,i,c){void 0===c&&(c=Promise);var o=new O(s(e,n,r,i),c);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},x(v),a(v,o,"Generator"),a(v,i,(function(){return this})),a(v,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=E,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return o.type="throw",o.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var i=this.tryEntries.length-1;i>=0;--i){var c=this.tryEntries[i],o=c.completion;if("root"===c.tryLoc)return r("end");if(c.tryLoc<=this.prev){var a=n.call(c,"catchLoc"),s=n.call(c,"finallyLoc");if(a&&s){if(this.prev<c.catchLoc)return r(c.catchLoc,!0);if(this.prev<c.finallyLoc)return r(c.finallyLoc)}else if(a){if(this.prev<c.catchLoc)return r(c.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return r(c.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var c=i;break}}c&&("break"===t||"continue"===t)&&c.tryLoc<=e&&e<=c.finallyLoc&&(c=null);var o=c?c.completion:{};return o.type=t,o.arg=e,c?(this.method="next",this.next=c.finallyLoc,u):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),u},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),w(n),u}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;w(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:E(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),u}},t}var b="k_l56508qd",v={actor1:[],actor2:[],title1:[],title2:[]},x=function(){return Object(j.jsxs)("div",{className:"loader",children:[Object(j.jsx)("span",{children:"loading"}),Object(j.jsxs)("div",{className:"lds-ellipsis",children:[Object(j.jsx)("div",{}),Object(j.jsx)("div",{}),Object(j.jsx)("div",{}),Object(j.jsx)("div",{})]})]})},O=function(t){t.current.value.length>0?t.current.nextElementSibling.className="del show-ex":t.current.nextElementSibling.className="del"},y=function(t,e){t.current.value="",t.current.focus(),O(t)};function g(t,e){return w.apply(this,arguments)}function w(){return(w=Object(d.a)(m().mark((function t(e,n){var r,i,c;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r="".concat(e,"/").concat(b,"/").concat(n),i={method:"GET",redirect:"follow"},t.next=4,fetch(r,i).then((function(t){return t.text()})).then((function(t){return JSON.parse(t)})).catch((function(t){return console.log("error",t)}));case 4:return c=t.sent,t.abrupt("return",c);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var N=function(t){var e=t.movie;return"movie"===L(e.title)?Object(j.jsx)("h2",{children:Object(j.jsxs)("a",{href:"https://www.imdb.com/title/".concat(e.id),children:[e.title," (",e.year,")"]})}):Object(j.jsx)("h2",{children:Object(j.jsx)("a",{href:"https://www.imdb.com/title/".concat(e.id),children:e.title})})},E=function(t){if(t.roles.match(/\(TV /g)||t.roles.match(/\(Video\)/g)){var e=t.roles.split(" - ")[0].split(") ")[1];try{e=(e=e.replace("(Video) ","")).replace("...","more...")}catch(n){console.log(n)}return Object(j.jsx)("span",{children:e})}return Object(j.jsx)("span",{children:t.roles})},L=function(t){return t.match(/\(TV /g)?"tv":"movie"},S=function(t,e){if(t.match(/episode/g)){var n=t.split(/\s\d+\sepisode[s]?,\s/gm);t="".concat(n[0].replace("...","more...")," in ").concat(e," (").concat(n[1],")")}else t="".concat(t," in ").concat(e);return t},k=function(){if(0===v.title1.length&&0===v.title2.length)return Object(j.jsx)("p",{children:"Unable to find a match. Make sure you've selected the right tab up top."});var t=v.title1.actors.map((function(t){return t.id})),e=v.title2.actors.map((function(t){return t.id})),n=t.filter((function(t){return e.includes(t)})),r=n.map((function(t){var e=v.title1.actors.find((function(e){return e.id===t})),n=v.title2.actors.find((function(e){return e.id===t})),r=[e.asCharacter,n.asCharacter];return r[0]===r[1]?(r=e.asCharacter,Object(j.jsxs)("li",{className:"actor",children:[Object(j.jsx)("a",{href:"https://www.imdb.com/name/".concat(e.id),children:e.name})," as ",r]},t)):Object(j.jsxs)("li",{className:"actor",children:[Object(j.jsx)("a",{href:"https://www.imdb.com/name/".concat(e.id),children:e.name})," as",Object(j.jsxs)("ul",{className:"role-sublist",children:[Object(j.jsx)("li",{children:S(r[0],v.title1.title)}),Object(j.jsx)("li",{children:S(r[1],v.title2.title)})]})]},t)}));return Object(j.jsxs)("div",{children:[n.length>0&&Object(j.jsxs)("h2",{children:["These actors appeared in ",v.title1.title," and ",v.title2.title,":"]}),0===n.length&&Object(j.jsxs)("div",{children:[Object(j.jsxs)("h2",{children:[v.title1.title," and ",v.title2.title," do not share any actors."]}),Object(j.jsx)("p",{children:"Something seem off? Make sure you've selected the right tab up top."})]}),Object(j.jsx)("ul",{children:r})]})},C=function(t){var e=Object(r.useState)(!1),n=Object(h.a)(e,2),i=n[0],c=n[1],o=Object(r.useState)(!1),a=Object(h.a)(o,2),s=a[0],l=a[1],u=Object(r.useRef)(),f=Object(r.useRef)(),p=Object(r.useState)(t.new),b=Object(h.a)(p,2),w=b[0],N=b[1];function E(){return(E=Object(d.a)(m().mark((function t(e){return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),N(!1),c(!1),l(!1),g("https://imdb-api.com/en/API/SearchTitle",u.current.value).then((function(t){g("https://imdb-api.com/en/API/FullCast",t.results[0].id).then((function(t){v.title1=t||"",c(!0)}))})),g("https://imdb-api.com/en/API/SearchTitle",f.current.value).then((function(t){g("https://imdb-api.com/en/API/FullCast",t.results[0].id).then((function(t){v.title2=t||"",l(!0)}))}));case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(j.jsxs)("div",{children:[Object(j.jsxs)("form",{id:"findMovies",onSubmit:function(t){return E.apply(this,arguments)},children:[Object(j.jsxs)("div",{className:"input-wrapper",onChange:function(){return O(u)},children:[Object(j.jsx)("input",{type:"text",className:"acting",placeholder:"Title",ref:u}),Object(j.jsx)("span",{className:"del",onClick:function(){return y(u)},children:"\u2715"})]}),Object(j.jsx)("div",{className:"ex",children:"&"}),Object(j.jsxs)("div",{className:"input-wrapper",onChange:function(){return O(f)},children:[Object(j.jsx)("input",{type:"text",className:"acting",placeholder:"Title",ref:f}),Object(j.jsx)("span",{className:"del",onClick:function(){return y(f)},children:"\u2715"})]}),Object(j.jsx)("button",{id:"submit",type:"submit",children:"compare"})]}),!i&&!s&&!w&&Object(j.jsx)(x,{}),i&&s&&Object(j.jsx)("div",{className:"results",children:Object(j.jsx)(k,{})})]})},A=function(){var t=v.actor1.castMovies.filter((function(t){return"Actor"===t.role||"Actress"===t.role})),e=v.actor2.castMovies.filter((function(t){return"Actor"===t.role||"Actress"===t.role})),n=t.map((function(t){return t.id})),r=e.map((function(t){return t.id})),i=n.filter((function(t){return r.includes(t)})),c=t.filter((function(t){return i.includes(t.id)})),o=e.filter((function(t){return i.includes(t.id)})),a=i.map((function(t){return Object(j.jsxs)("li",{className:L(c.find((function(e){return e.id===t})).description),children:[Object(j.jsx)(N,{movie:c.find((function(e){return e.id===t}))}),Object(j.jsxs)("ul",{children:[Object(j.jsxs)("li",{className:"actor sub",children:[v.actor1.name," as ",Object(j.jsx)(E,{roles:c.find((function(e){return e.id===t})).description})]},"".concat(v.actor1.name,"-").concat(t)),Object(j.jsxs)("li",{className:"actor sub",children:[v.actor2.name," as ",Object(j.jsx)(E,{roles:o.find((function(e){return e.id===t})).description})]},"".concat(v.actor2.name,"-").concat(t))]})]},t)}));return Object(j.jsxs)("div",{children:[c.length>0&&Object(j.jsxs)("h2",{children:[v.actor1.name," and ",v.actor2.name," have both appeared in:"]}),0===c.length&&Object(j.jsxs)("div",{children:[Object(j.jsxs)("h2",{children:[v.actor1.name," and ",v.actor2.name," have never appeared together."]}),Object(j.jsx)("p",{children:"Something seem off? Make sure you've selected the right tab up top."})]}),Object(j.jsx)("ul",{children:a})]})},I=function(t,e){return e.forEach((function(e){var n,r;e.similarity=(n=t.toLowerCase(),r=e.title.toLowerCase(),p.a.compareTwoStrings(n,r))})).sort((function(t,e){return e.similarity-t.similarity})),e[0].id},T=function(t){var e=Object(r.useState)(!1),n=Object(h.a)(e,2),i=n[0],c=n[1],o=Object(r.useState)(!1),a=Object(h.a)(o,2),s=a[0],l=a[1],u=Object(r.useRef)(),f=Object(r.useRef)(),p=Object(r.useState)(t.new),b=Object(h.a)(p,2),w=b[0],N=b[1];function E(){return(E=Object(d.a)(m().mark((function t(e){return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),N(!1),c(!1),l(!1),g("https://imdb-api.com/en/API/SearchName",u.current.value).then((function(t){g("https://imdb-api.com/en/API/Name",I(u.current.value,t.results)).then((function(t){v.actor1=t,c(!0)}))})),g("https://imdb-api.com/en/API/SearchName",f.current.value).then((function(t){var e=I(f.current.value,t.results);console.log(e);g("https://imdb-api.com/en/API/Name",e).then((function(t){v.actor2=t,l(!0)}))}));case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(j.jsxs)("div",{children:[Object(j.jsxs)("form",{id:"findActors",onSubmit:function(t){return E.apply(this,arguments)},children:[Object(j.jsxs)("div",{className:"input-wrapper",onChange:function(){return O(u)},children:[Object(j.jsx)("input",{type:"text",className:"acting",placeholder:"Actor Name",ref:u}),Object(j.jsx)("span",{className:"del",onClick:function(){return y(u)},children:"\u2715"})]}),Object(j.jsx)("div",{className:"ex",children:"&"}),Object(j.jsxs)("div",{className:"input-wrapper",onChange:function(){return O(f)},children:[Object(j.jsx)("input",{type:"text",className:"acting",placeholder:"Actor Name",ref:f}),Object(j.jsx)("span",{className:"del",onClick:function(){return y(f)},children:"\u2715"})]}),Object(j.jsx)("button",{id:"submit",type:"submit",children:"compare"})]}),!i&&!s&&!w&&Object(j.jsx)(x,{}),i&&s&&Object(j.jsx)("div",{className:"results",children:Object(j.jsx)(A,{})})]})},P=["Compare Actors","Compare Titles"],_=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var r;return Object(a.a)(this,n),(r=e.call(this,t)).state={activeElement:0,allElements:P},r}return Object(s.a)(n,[{key:"render",value:function(){var t=this;return Object(j.jsx)(F,{elements:this.state.allElements,showIndex:this.state.activeElement,toggleIndex:function(e){return t.setState({activeElement:e})}})}}]),n}(r.Component),F=function(t){var e=t.elements,n=t.showIndex,r=t.toggleIndex;t.isActive;return Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"admin-nav",children:e.map((function(t,i){return Object(j.jsx)("div",{children:Object(j.jsx)("div",{onClick:function(){return r(i)},className:n===i?"selected":null,children:e[i]})},i)}))}),0===n&&Object(j.jsx)(T,{new:!0}),1===n&&Object(j.jsx)(C,{new:!0})]})};var G=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsx)(_,{})})},M=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(e){var n=e.getCLS,r=e.getFID,i=e.getFCP,c=e.getLCP,o=e.getTTFB;n(t),r(t),i(t),c(t),o(t)}))};o.a.render(Object(j.jsxs)(i.a.StrictMode,{children:[Object(j.jsxs)("div",{id:"title",children:[Object(j.jsx)("span",{children:"\u2728"}),"starcrossed"]}),Object(j.jsx)(G,{})]}),document.getElementById("root")),M()}},[[18,1,2]]]);
//# sourceMappingURL=main.d62ce6ab.chunk.js.map