/* eslint-disable import/prefer-default-export */
export default {
  mode: 'development',
  slidersNames: ['slider'],
  navsButtons: {
    slider1: {
      navsActive: false,
      btnPrev: null,
      btnNext: null,
      position: 'center',
    },
  },
  pagination: {
    pagActive: false,
    type: 'none',
    interactive: false,
    dynamicBullets: false,
  },
  autoSlide: {
    active: false,
    interval: 0,
  },
  JSON: [],
  supportIE: true,
  customSettings: {
    slider1: {
      desktop: {
        breakpoint: 991,
        infinity: true,
        dotsAreVisibles: true,
        itemsToShow: 3,
        itemsToScroll: 1,
      },
      tablet: {
        breakpoint: 990,
        itemsToShow: 2,
        itemsToScroll: 1,
        infinity: true,
      },
      mobile: {
        breakpoint: 730,
        itemsToShow: 1,
        itemsToScroll: 1,
        infinity: true,
      },
    },
  },
};
