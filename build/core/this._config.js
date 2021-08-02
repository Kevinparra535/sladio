"use strict";

undefined._config = {
  mode: "development" || undefined._config.mode,
  slidersNames: ["slider"] || undefined._config.slidersNames,
  navsButtons: {
    slider1: {
      navsActive: false || undefined._config.navsButtons.slider1.navsActive,
      btnPrev: null || undefined._config.navsButtons.slider1.btnPrev,
      btnNext: null || undefined._config.navsButtons.slider1.btnNext,
      position: undefined._config.navsButtons.slider1.position || "center"
    }
  },
  pagination: {
    pagActive: false || undefined._config.pagination.pagActive,
    type: "none" || undefined._config.pagination.type,
    interactive: false || undefined._config.pagination.interactive,
    dynamicBullets: false || undefined._config.pagination.dynamicBullets
  },
  autoSlide: {
    active: false || undefined._config.autoSlide.active,
    interval: 0 || undefined._config.autoSlide.interval
  },
  JSON: [] || undefined._config.JSON,
  supportIE: true || undefined._config.supportIE
};