export const sladioConfig = {
  mode: "development",

  slidersNames: ["slider"], // Nombre del slider, funciona para usar varios sliders en el mismo HTML

  navsButtons: {
    // Nombre de los botones de navegación, funciona para usar varios botones de navegación en el mismo HTML
    slider1: {
      navsActive: true,
      btnPrev: "btn__prev", // Nombre de la clase que contiene el botón previo
      btnNext: "btn__next", // Nombre de la clase que contiene el botón siguiente
      position: "center", // posición preestablecida de los botones de navegación
    },
  },

  pagination: {
    pagActive: true,
    type: "bullets", // bullets, fraction, progressbar, scrollbar,
    interactive: true,
    dynamicBullets: true,
  },

  autoSlide: {
    active: true,
    interval: 5000,
  },

  JSON: [],

  supportIE: true,

  responsive: [
    {
      breakpoint: 991, //Tamaño mínimo en Desktop
      settings: {
        itemsToShow: 3, // Numbers: min 1 - max 4, Default 1
        itemsToScroll: 1, // NO LO MUEVAS
        infinity: true, // Scoll inifite, False default
        dotsAreVisibles: true, // Only works on desktop
      },
    },
    {
      breakpoint: 990, //Tamaño máximo en tablet
      settings: {
        itemsToShow: 2, // Numbers: min 1 - max 3, Default 1
        itemsToScroll: 1,
        infinity: true,
      },
    },
    {
      breakpoint: 730, // Tamaño máximo en mobile
      settings: {
        itemsToShow: 1, // Numbers: min 1 - max 2, Default 1
        itemsToScroll: 1,
        infinity: true,
      },
    },
  ],
};
