!function(){"use strict";var e=[,function(e,t,i){function _toConsumableArray(e){return function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}(e)||function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function _unsupportedIterableToArray(e,t){if(!e)return;if("string"==typeof e)return _arrayLikeToArray(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return _arrayLikeToArray(e,t)}(e)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}i.r(t);var r=function(){function Sladio(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Sladio),this.config=e,this.firtsSlider=null,this.index=0,this.dragStart=0,this.dragEnd=0,this.init=this.init.bind(this),this.report=this.report.bind(this),this.createDefaultSlider=this.createDefaultSlider.bind(this),this.nextSlide=this.nextSlide.bind(this),this.prevSlide=this.prevSlide.bind(this),this.customSlider=this.customSlider.bind(this),this.createNavsButtons=this.createNavsButtons.bind(this),Object.keys(this.config).length?(console.log("Recibe una configuración"),this.config={mode:"development",slidersNames:["slider"]||0,navsButtons:{slider1:{navsActive:this.config.navsButtons.slider1.navsActive,btnPrev:this.config.navsButtons.slider1.btnPrev,btnNext:this.config.navsButtons.slider1.btnNext,position:this.config.navsButtons.slider1.position||"center"}},pagination:{pagActive:this.config.pagination.pagActive,type:"none",interactive:this.config.pagination.interactive,dynamicBullets:this.config.pagination.dynamicBullets},autoSlide:{active:this.config.autoSlide.active,interval:this.config.autoSlide.interval},JSON:[]||0,supportIE:!0}):(console.log("No hay un objeto de configuración"),this.config={mode:"development",slidersNames:["slider"],navsButtons:{slider1:{navsActive:!1,btnPrev:null,btnNext:null,position:"center"}},pagination:{pagActive:!1,type:"none",interactive:!1,dynamicBullets:!1},autoSlide:{active:!1,interval:0},JSON:[],supportIE:!0}),this.init()}return function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}(Sladio,[{key:"init",value:function init(){var e=this.config.slidersNames;if(e.length||this.report("No hay sliders para mostrar"),1===e.length){this.firtsSlider=e[0];var t=document.querySelector("#"+this.firtsSlider).getAttribute("data-style");"default"===t&&this.createDefaultSlider(),"custom"!==t&&t&&null!==t||this.customSlider()}if(e.length>=2)for(var i=0;i<initialContainer.length;i++)console.log(initialContainer[i])}},{key:"createDefaultSlider",value:function createDefaultSlider(){var e=this,t=document.querySelector("#".concat(this.firtsSlider)).querySelector(".sladio__container"),i=t.querySelectorAll(".sladio__items");console.log("Modo Default"),t.addEventListener("mousedown",(function(t){return t.preventDefault(),e.dragStart=t.clientX})),t.addEventListener("mouseup",(function changeSlide(t){t.preventDefault(),e.dragEnd=t.clientX,e.dragEnd<e.dragStart?e.index<i.length-1&&(console.log("Next"),e.index++,e.nextSlide()):(e.index>0&&(console.log("Prev"),e.index--),e.index<0&&(e.index=0),e.prevSlide())}),!0)}},{key:"customSlider",value:function customSlider(){console.log("Modo custom");var e=this.config.navsButtons,t=document.querySelector("#".concat(this.firtsSlider));if(!t.querySelector(".sladio__container")){console.log("No existe el container");var i=document.createElement("div");i.className="sladio__container",t.appendChild(i);for(var r=t.querySelectorAll(".sladio__items"),n=_toConsumableArray(r),o=0;o<r.length;o++){r[o].parentNode.removeChild(r[o]),i.appendChild(n[o])}}(this.createDefaultSlider(),e)&&(e.slider1.navsActive&&this.createNavsButtons(e))}},{key:"createNavsButtons",value:function createNavsButtons(e){var t=this;console.log("Navs Activos");var i=e.slider1,r=i.btnPrev,n=i.btnNext,o=i.position,a=document.querySelector("#".concat(this.firtsSlider)).querySelector(".sladio__container"),s=document.createElement("button"),l=document.createElement("button"),c=document.createTextNode("Back"),u=document.createTextNode("Next");s.className=r,l.className=n,s.appendChild(c),l.appendChild(u),s.addEventListener("click",(function(e){return e.preventDefault(),t.prevSlide()})),l.addEventListener("click",(function(e){return e.preventDefault(),t.nextSlide()})),"top"!==o&&"left"!==o&&"right"!==o||this.report("No hay una diseño preestablecido para esta posición 😥"),"center"!==o&&""!==o||(s.style.position="absolute",s.style.top="50%",s.style.left="10px",s.style.padding="5px",s.style.cursor="pointer",s.style.width="auto",l.style.position="absolute",l.style.top="50%",l.style.right="10px",l.style.padding="5px",l.style.cursor="pointer",l.style.width="auto"),"bottom"===o&&(s.style.position="absolute",s.style.bottom="0px",s.style.left="0px",s.style.padding="5px",s.style.cursor="pointer",s.style.width="50%",l.style.position="absolute",l.style.bottom="0px",l.style.right="0px",l.style.padding="5px",l.style.cursor="pointer",l.style.width="50%"),a.appendChild(s),a.appendChild(l),console.log(o)}},{key:"nextSlide",value:function nextSlide(){var e=document.querySelector("#".concat(this.firtsSlider)),t=e.querySelector(".sladio__container");t.scrollLeft=t.scrollLeft+e.scrollWidth}},{key:"prevSlide",value:function prevSlide(){var e=document.querySelector("#".concat(this.firtsSlider)),t=e.querySelector(".sladio__container");t.scrollLeft=t.scrollLeft-e.scrollWidth}},{key:"report",value:function report(e){this.message=e,console.error(this.message),alert(this.message)}}]),Sladio}();t["default"]=r},function(e,t,i){i.r(t),i.d(t,{sladioConfig:function(){return r}});var r={mode:"development",slidersNames:["slider"],navsButtons:{slider1:{navsActive:!0,btnPrev:"btn__prev",btnNext:"btn__next",position:"center"}},pagination:{pagActive:!0,type:"bullets",interactive:!0,dynamicBullets:!0},autoSlide:{active:!0,interval:5e3},JSON:[],supportIE:!0,responsive:[{breakpoint:991,settings:{itemsToShow:3,itemsToScroll:1,infinity:!0,dotsAreVisibles:!0}},{breakpoint:990,settings:{itemsToShow:2,itemsToScroll:1,infinity:!0}},{breakpoint:730,settings:{itemsToShow:1,itemsToScroll:1,infinity:!0}}]}}],t={};function __webpack_require__(i){var r=t[i];if(r!==undefined)return r.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=function(e,t){for(var i in t)__webpack_require__.o(t,i)&&!__webpack_require__.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};!function(){__webpack_require__.r(i);var e=__webpack_require__(1),t=__webpack_require__(2),r=new e["default"](t.sladioConfig);i["default"]=r}()}();
//# sourceMappingURL=index-dist.js.map