'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

// Creamos una configuración de autocompletado, para evitar errores en la config faltante

var AutoCompleteSettings = function () {
  function AutoCompleteSettings() {
    _classCallCheck(this, AutoCompleteSettings);
  }

  _createClass(AutoCompleteSettings, [{
    key: 'run',
    value: function run(slider) {
      this._config = slider._config;

      // Agregamos el modo en el entorno
      if (!this._config.mode) {
        this._config.mode = 'development';
      }

      // Si no hay configuracion de navs lo creamos
      if (!this._config.navsButtons) {
        this._config.navsButtons = {
          slider1: {}
        };
      }

      // Si no hay un objeto con los parametros del primer slider lo creamos
      if (!this._config.navsButtons.slider1) {
        this._config.navsButtons.slider1 = {
          navsActive: false,
          btnPrev: null,
          btnNext: null,
          position: 'center'
        };
      }

      if (!this._config.pagination) {
        this._config.pagination = {
          pagActive: false,
          type: 'none', // bullets, fraction, progressbar, scrollbar,
          interactive: false,
          dynamicBullets: false
        };
      }

      if (!this._config.autoSlide) {
        this._config.autoSlide = {
          active: false,
          interval: 0
        };
      }

      if (!this._config.JSON) {
        this._config.JSON = [];
      }

      if (!this._config.customSettings) {
        this._config.customSettings = {};
      }

      if (!this._config.customSettings.slider1) {
        this._config.customSettings.slider1 = {
          active: false,
          desktop: {
            breakpoint: 991,
            infinity: true,
            dotsAreVisibles: false,
            itemsToShow: 1,
            itemsToScroll: 1
          },
          tablet: {
            breakpoint: 990,
            itemsToShow: 1,
            itemsToScroll: 1,
            infinity: true
          },
          mobile: {
            breakpoint: 730,
            itemsToShow: 1,
            itemsToScroll: 1,
            infinity: true
          }
        };
      }
    }
  }]);

  return AutoCompleteSettings;
}();

exports.default = AutoCompleteSettings;