!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.readyState=t()}(this,function(){var e={capture:!0,once:!0,passive:!0},t=function(){return"interactive"===document.readyState||"complete"===document.readyState},n=function(e,n){return!(!function(e){return document.readyState===e}(e)&&!t())&&(n(e),!0)},o=function(){return new Promise(function(t){n("domready",t)||document.addEventListener("DOMContentLoaded",function(){t("domready")},e)})},r=function(){return new Promise(function(t){n("load",t)||window.addEventListener("load",function(){t("load")},e)})},d={};return Object.defineProperties(d,{state:{get:function(){return document.readyState}},loading:{get:function(){return new Promise(function(t){n("loading",t)||document.addEventListener("readystatechange",function(){"loading"===document.readyState&&t("loading")},e)})}},interactive:{get:function(){return new Promise(function(t){n("interactive",t)||document.addEventListener("readystatechange",function(){"interactive"===document.readyState&&t("interactive")},e)})}},complete:{get:function(){return new Promise(function(t){n("complete",t)||document.addEventListener("readystatechange",function(){"complete"===document.readyState&&t("complete")},e)})}},window:{get:function(){return r()}},load:{get:function(){return r()}},domready:{get:function(){return o()}},dom:{get:function(){return o()}},ready:{get:function(){return t()}}}),d});
//# sourceMappingURL=ready-state.umd.js.map
