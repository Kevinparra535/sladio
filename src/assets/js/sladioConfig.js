/* eslint-disable import/prefer-default-export */
export const sladioConfig = {
  mode: 'development',

  slidersNames: ['slider', 'slider2'], // Nombre del slider, funciona para usar varios sliders en el mismo HTML

  navsButtons: {
    // Nombre de los botones de navegación, funciona para usar varios botones de navegación en el mismo HTML
    slider1: {
      navsActive: true,
      btnPrev: 'btn__prev', // Nombre de la clase que contiene el botón previo
      btnNext: 'btn__next', // Nombre de la clase que contiene el botón siguiente
      position: 'center', // posición preestablecida de los botones de navegación
    },

    slider2: {
      navsActive: 'bottom',
      btnPrev: 'btn__prev', // Nombre de la clase que contiene el botón previo
      btnNext: 'btn__next', // Nombre de la clase que contiene el botón siguiente
      position: 'center', // posición preestablecida de los botones de navegación
    },
  },

  pagination: {
    slider1: {
      pagActive: false,
      type: 'fraction', // bullets, fraction, progressbar, scrollbar,
      interactive: false,
      dynamicBullets: false,
    },
    slider2: {
      pagActive: false,
      type: 'fraction', // bullets, fraction, progressbar, scrollbar,
      interactive: false,
      dynamicBullets: false,
    },
  },

  autoSlide: {
    active: false,
    interval: 0,
  },

  JSON: [],

  supportIE: false,

  // Configuración personalizada del slider
  customSettings: {
    slider1: {
      active: true,
      desktop: {
        breakpoint: 991,
        infinity: true,
        itemsToShow: 2,
        dotsAreVisibles: true,
      },
      tablet: {
        breakpoint: 990,
        itemsToShow: 3,
        infinity: true,
      },
      mobile: {
        breakpoint: 730,
        itemsToShow: 1,
        infinity: true,
      },
    },

    slider2: {
      active: true,
      desktop: {
        breakpoint: 991,
        infinity: true,
        itemsToShow: 1,
        dotsAreVisibles: true,
      },
      tablet: {
        breakpoint: 990,
        itemsToShow: 2,
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
