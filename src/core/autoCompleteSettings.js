/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

// Creamos una configuración de autocompletado, para evitar errores en la config faltante

class AutoCompleteSettings {
  constructor() { }

  run(slider) {
    this._config = slider._config;

    // Agregamos el modo en el entorno
    if (!this._config.mode) {
      this._config.mode = 'development';
    }

    // Si no hay configuracion de navs lo creamos
    if (!this._config.navsButtons) {
      this._config.navsButtons = {
        slider1: {},
      };
    }

    // Si no hay un objeto con los parametros del primer slider lo creamos
    if (!this._config.navsButtons.slider1) {
      this._config.navsButtons.slider1 = {
        navsActive: false,
        btnPrev: null,
        btnNext: null,
        position: 'center',
      };
    }

    if (!this._config.pagination) {
      this._config.pagination = {
        pagActive: false,
        type: 'none', // bullets, fraction, progressbar, scrollbar,
        interactive: false,
        dynamicBullets: false,
      };
    }

    if (!this._config.autoSlide) {
      this._config.autoSlide = {
        active: false,
        interval: 0,
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
          itemsToScroll: 1,
        },
        tablet: {
          breakpoint: 990,
          itemsToShow: 1,
          itemsToScroll: 1,
          infinity: true,
        },
        mobile: {
          breakpoint: 730,
          itemsToShow: 1,
          itemsToScroll: 1,
          infinity: true,
        },
      };
    }

  }

}

export default AutoCompleteSettings;