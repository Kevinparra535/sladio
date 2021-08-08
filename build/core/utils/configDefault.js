'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable import/prefer-default-export */
exports.default = {
  mode: 'development',
  slidersNames: ['slider'],
  navsButtons: {
    slider1: {
      navsActive: false,
      btnPrev: null,
      btnNext: null,
      position: 'center'
    }
  },
  pagination: {
    slider1: {
      pagActive: false,
      type: 'bullets',
      interactive: true,
      dynamicBullets: false
    }
  },
  autoSlide: {
    active: false,
    interval: 0
  },
  JSON: [],
  supportIE: true,
  customSettings: {
    slider1: {
      active: true,
      type: 'images',
      orientation: 'horizontal',
      desktop: {
        breakpoint: 991,
        infinity: true,
        itemsToShow: 1,
        dotsAreVisibles: true
      },
      tablet: {
        breakpoint: 990,
        itemsToShow: 2,
        infinity: true
      },
      mobile: {
        breakpoint: 730,
        itemsToShow: 1,
        infinity: true
      }
    }
  }
};