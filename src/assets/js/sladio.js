class Sladio {
  constructor(config) {
    this.config = config;

    this.init = this.init.bind(this);
    this.report = this.report.bind(this);
    this.createDefaultSlider = this.createDefaultSlider.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);

    this.init();
  }

  // Método inicial
  init() {
    // leemos toda la configuración y asignamos funciones
    let initialSlider = this.config.slidersNames;
    let navButtons = this.config.navsButtons;
    let pagination = this.config.pagination;

    // Si no tenemos sliders nos lanza el aviso en el report
    if (!initialSlider.length) {
      this.report("No hay sliders para mostrar");
    }

    // Si tenemos un sliders inicia de manera normal
    if (initialSlider.length === 1) {
      let { navsActive, btnPrev, btnNext } = navButtons.slider1;
      let { pagActive, type, interactive, dynamicBullets } = pagination;
      this.firtsSlider = initialSlider[0]
      const defaultStyles = document.querySelector("#" + this.firtsSlider).getAttribute("data-style");

      if (defaultStyles === "default") {
        navsActive = false;
        pagActive = false;

        this.createDefaultSlider(navsActive, pagActive);
      }

      if(defaultStyles === "custom" || !defaultStyles || defaultStyles === null) {
        // Esta es la configuración global, aqui funciona todo
      }

      console.log(this.firtsSlider);
      console.log(navsActive, btnPrev, btnNext);
      console.log(pagActive, type, interactive, dynamicBullets);

    }

    // Si tenemos dos sliders nos redirige a este metodo
    if (initialSlider.length >= 2) {
      for (let i = 0; i < initialContainer.length; i++) {
        console.log(initialContainer[i]);
      }
    }
  }

  // Creamos el sistema por default del slider
  createDefaultSlider() {
    let index = 0;
    let dragStart = 0;
    let dragEnd = 0;

    const slider = document.querySelector(`#${this.firtsSlider}`);
    const container = slider.querySelector(".sladio__container");
    const items = container.querySelectorAll(".sladio__items");

    const changeSlide = (e) => {
      e.preventDefault();

      dragEnd = e.clientX;

      if (dragEnd < dragStart) {
        if (index < items.length - 1) {
          console.log("Next");

          index++;
          this.nextSlide()
        }

      } else {
        if (index > 0) {
          console.log("Prev");
          index--;
        }

        if (index < 0) {
          index = 0;
        }

        this.prevSlide()
      }
    };

    container.addEventListener("mousedown", (e) => (e.preventDefault(), (dragStart = e.clientX)));

    container.addEventListener("mouseup", changeSlide, true);
  }

  // Muestra el siguiente item
  nextSlide() {
    const slider = document.querySelector(`#${this.firtsSlider}`);
    const container = slider.querySelector(".sladio__container");

    container.scrollLeft = container.scrollLeft + slider.scrollWidth; // Muestra el siguiente item
  }

  // Muestra el anterior item
  prevSlide() {
    const slider = document.querySelector(`#${this.firtsSlider}`);
    const container = slider.querySelector(".sladio__container");

    container.scrollLeft = container.scrollLeft - slider.scrollWidth; // Muestra el anterior item
  }

  // Report nos sirve para mostrarle al usuario que esta fallando
  report(message) {
    this.message = message;
    console.error(this.message);
    alert(this.message);
  }
}

export default Sladio;
