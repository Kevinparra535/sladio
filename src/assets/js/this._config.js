this._config = {
  mode: "development" || this._config.mode,
  slidersNames: ["slider"] || this._config.slidersNames,
  navsButtons: {
    slider1: {
      navsActive: false || this._config.navsButtons.slider1.navsActive,
      btnPrev: null || this._config.navsButtons.slider1.btnPrev,
      btnNext: null || this._config.navsButtons.slider1.btnNext,
      position: this._config.navsButtons.slider1.position || "center",
    },
  },
  pagination: {
    pagActive: false || this._config.pagination.pagActive,
    type: "none" || this._config.pagination.type,
    interactive: false || this._config.pagination.interactive,
    dynamicBullets: false || this._config.pagination.dynamicBullets,
  },
  autoSlide: {
    active: false || this._config.autoSlide.active,
    interval: 0 || this._config.autoSlide.interval,
  },
  JSON: [] || this._config.JSON,
  supportIE: true || this._config.supportIE,
};