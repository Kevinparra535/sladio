/* eslint-disable import/prefer-default-export */

/**
 * Autor: Kevin Parra Lopez <kevinparra535@gmail.com>
 * Github: https://github.com/Kevinparra535/
 * NPM: `npm i sladio`
 * Last version: 1.0.16 (https://www.npmjs.com/package/sladio)
 * License: MIT
 */

const sladioConfig = {
  mode: 'development',

  slidersNames: ['slider1', 'slider2'], // Nombre del slider, funciona para usar varios sliders en el mismo HTML

  navsButtons: {
    // Nombre de los botones de navegación, funciona para usar varios botones de navegación en el mismo HTML
    slider1: {
      navsActive: true,
      btnPrev: "btn__prev",
      btnNext: "btn__next",
      position: 'center',
    },
  },

  pagination: {
    slider1: {
      pagActive: true,
      type: 'bullets', // bullets, fraction, progressbar, scrollbar,
      interactive: true,
      dynamicBullets: false,
    },
  },

  autoSlide: {
    slider1: {
      autoSlideActive: false,
      interval: 8000,
      pauseOnHover: true,
    },
  },

  JSON: [],

  supportIE: false,

  // Configuración personalizada del slider
  customSettings: {
    slider1: {
      active: true,
      type: 'images',
      orientation: 'horizontal',
      desktop: {
        breakpoint: 991,
        infinity: true,
        itemsToShow: 1,
        dotsAreVisibles: true,
      },
      tablet: {
        breakpoint: 990,
        itemsToShow: 1,
        infinity: true,
      },
      mobile: {
        breakpoint: 730,
        itemsToShow: 1,
        infinity: true,
      },
    },
  },
};

module.exports = sladioConfig;