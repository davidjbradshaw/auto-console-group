/*!
 *  @module      auto-console-group v1.2.2
 *
 *  @description Automagically group console logs in the browser console.
 *
 *  @author      David J. Bradshaw <info@iframe-resizer.com>
 *  @see         {@link https://github.com/davidjbradshaw/auto-console-group#readme}
 *  @license     MIT
 *
 *  @copyright  (c) 2025, David J. Bradshaw. All rights reserved.
 */


(function(n,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(n=typeof globalThis<"u"?globalThis:n||self,i(n.createAutoConsoleGroup={}))})(this,function(n){"use strict";const i="font-weight: normal;",E="font-weight: bold;",w="font-style: italic;",O=i+w,$="color: #135CD2;",A="color: #A9C7FB;",I="color: #1F1F1F;",M="color: #E3E3E3;",l="default",v="error",C="log",R={collapsed:!1,defaultEvent:void 0,event:void 0,label:"AutoConsoleGroup",showTime:!0},D={profile:0,profileEnd:0,timeStamp:0,trace:0},H=t=>{const e=t.event||t.defaultEvent;return e?`${e}`:""};function y(){const t=new Date,e=(a,d)=>t[a]().toString().padStart(d,"0"),s=e("getHours",2),u=e("getMinutes",2),c=e("getSeconds",2),f=e("getMilliseconds",3);return`@ ${s}:${u}:${c}.${f}`}const{fromEntries:B,keys:F}=Object,S=t=>[t,console[t]],N=t=>e=>[e,function(s){t[e]=s}],g=(t,e)=>B(F(t).map(e));function U(t={}){const e={},s={},u=[],c={...R,...t};let f;function a(){u.length=0}function d(){delete c.event,a()}const j=()=>u.some(([o])=>o==="error"||o==="warn"),Q=()=>j()?!1:!!c.collapsed,k=()=>c.showTime?f:"";function T(){if(u.length===0){d();return}console[Q()?"groupCollapsed":"group"](`%c${c.label}%c ${H(c)} %c${k()}`,i,E,O);for(const[o,...r]of u)console[o](...r);console.groupEnd(),d()}function q(){f=y(),queueMicrotask(()=>queueMicrotask(T))}function p(o,...r){u.length===0&&q(),u.push([o,...r])}const P=o=>(...r)=>{let m;try{m=o(...r)}catch(h){if(Error.prototype.isPrototypeOf(h))p(v,h);else throw h}return m};function V(o=l){s[o]?s[o]+=1:s[o]=1,p(C,`${o}: ${s[o]}`)}function W(o=l){delete s[o]}function K(o=l){e[o]=performance.now()}function G(o=l,...r){const m=performance.now()-e[o];p(C,`${o}: ${m} ms`,...r)}function z(o=l){G(o),delete e[o]}const J=o=>[o,(...r)=>p(o,...r)];return{...g(c,N(c)),...g(console,J),...g(D,S),count:V,countReset:W,endAutoGroup:T,errorBoundary:P,purge:a,time:K,timeEnd:z,timeLog:G}}const L=typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-color-scheme: dark)").matches,b=L?A:$,_=L?M:I;n.BOLD=E,n.FOREGROUND=_,n.HIGHLIGHT=b,n.ITALIC=w,n.NORMAL=i,n.default=U,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
