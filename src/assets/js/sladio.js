class Sladio {
  constructor(config) {
    this.config = config;
    this.firtsSlider = null;
    this.index = 0;
    this.dragStart = 0;
    this.dragEnd = 0;

    this.init = this.init.bind(this);
    this.report = this.report.bind(this);
    this.createDefaultSlider = this.createDefaultSlider.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.customSlider = this.customSlider.bind(this);
    this.createNavsButtons = this.createNavsButtons.bind(this);

    if (!Object.keys(this.config).length) {
      // Si no recibe un objeto con la configuración, creamos una configuración global
      console.log("No hay un objeto de configuración");

      this.config = {
        mode: "development",
        slidersNames: ["slider"],
        navsButtons: {
          slider1: {
            navsActive: false,
            btnPrev: null,
            btnNext: null,
            position: "center"
          },
        },
        pagination: {
          pagActive: false,
          type: "none",
          interactive: false,
          dynamicBullets: false,
        },
        autoSlide: {
          active: false,
          interval: 0,
        },
        JSON: [],
        supportIE: true,
      };
    } else {
      // Si recibe un objeto de configuración lo asignamos a nuestra variable

      console.log("Recibe una configuración");

      this.config = {
        mode: "development" || this.config.mode,
        slidersNames: ["slider"] || this.config.slidersNames,
        navsButtons: {
          slider1: {
            navsActive: false || this.config.navsButtons.slider1.navsActive,
            btnPrev: null || this.config.navsButtons.slider1.btnPrev,
            btnNext: null || this.config.navsButtons.slider1.btnNext,
            position: this.config.navsButtons.slider1.position || "center",
          },
        },
        pagination: {
          pagActive: false || this.config.pagination.pagActive,
          type: "none" || this.config.pagination.type,
          interactive: false || this.config.pagination.interactive,
          dynamicBullets: false || this.config.pagination.dynamicBullets,
        },
        autoSlide: {
          active: false || this.config.autoSlide.active,
          interval: 0 || this.config.autoSlide.interval,
        },
        JSON: [] || this.config.JSON,
        supportIE: true || this.config.supportIE,
      };
    }

    this.init();
  }

  // Método inicial
  init() {
    // leemos toda la configuración y asignamos funciones
    const initialSlider = this.config.slidersNames;

    // Si no tenemos sliders nos lanza el aviso en el report
    if (!initialSlider.length) {
      this.report("No hay sliders para mostrar");
    }

    // Si tenemos un sliders inicia de manera normal
    if (initialSlider.length === 1) {
      this.firtsSlider = initialSlider[0];
      const defaultStyles = document
        .querySelector("#" + this.firtsSlider)
        .getAttribute("data-style");

      if (defaultStyles === "default") {
        this.createDefaultSlider();
      }

      if (
        defaultStyles === "custom" ||
        !defaultStyles ||
        defaultStyles === null
      ) {
        // Esta es la configuración global, aquí funciona todo
        this.customSlider();
      }
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
    const slider = document.querySelector(`#${this.firtsSlider}`);
    const container = slider.querySelector(".sladio__container");
    const items = container.querySelectorAll(".sladio__items");

    const changeSlide = (e) => {
      e.preventDefault();

      this.dragEnd = e.clientX;

      if (this.dragEnd < this.dragStart) {
        if (this.index < items.length - 1) {
          console.log("Next");

          this.index++;
          this.nextSlide();
        }
      } else {
        if (this.index > 0) {
          console.log("Prev");
          this.index--;
        }

        if (this.index < 0) {
          this.index = 0;
        }

        this.prevSlide();
      }
    };

    console.log("Modo Default");

    container.addEventListener("mousedown", (e) => (e.preventDefault(), (this.dragStart = e.clientX)));
    container.addEventListener("mouseup", changeSlide, true);
  }

  // Sistema custom
  customSlider() {
    console.log("Modo custom");
    const { navsButtons } = this.config
    const slider = document.querySelector(`#${this.firtsSlider}`);
    const container = slider.querySelector(".sladio__container");


    // Si el contenedor no existe, creamos uno
    if (!container) {
      console.log('No existe el container')

      const createContainer = document.createElement('div');
      createContainer.className = 'sladio__container';
      slider.appendChild(createContainer);

      // Una vez creado eliminamos todo lo que pueda estar en el slider
      const cloneElements = slider.querySelectorAll('.sladio__items');
      const newElements = [...cloneElements]

      for (let i = 0; i < cloneElements.length; i++) {
        // Borramos los elementos
        const parentElement = cloneElements[i].parentNode;
        parentElement.removeChild(cloneElements[i]);

        // Y los añadimos al nuevo contenedor
        createContainer.appendChild(newElements[i]);
      }

    }


    // Activamos los movimientos básicos del slider
    this.createDefaultSlider()


    // Leemos los valores de la configuración y empezamos a crear y mostrar elementos necesarios

    // Si los navs están activos
    if (navsButtons) {
      const { slider1: { navsActive } } = navsButtons;

      if (navsActive) {
        this.createNavsButtons(navsButtons)
      }
    }
  }

  createNavsButtons(navsButtons) {
    console.log('Navs Activos')

    const { slider1: { btnPrev, btnNext, position } } = navsButtons;

    const slider = document.querySelector(`#${this.firtsSlider}`);
    const container = slider.querySelector(".sladio__container");

    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');

    const textPrev = document.createTextNode('Back');
    const textNext = document.createTextNode('Next');

    prevButton.className = btnPrev;
    nextButton.className = btnNext;

    prevButton.appendChild(textPrev);
    nextButton.appendChild(textNext);

    prevButton.addEventListener('click', (e) => (e.preventDefault(), this.prevSlide()))
    nextButton.addEventListener('click', (e) => (e.preventDefault(), this.nextSlide()))

    if (position === 'top' || position === 'left' || position === 'right') {
      this.report('No hay una diseño preestablecido para esta posición 😥')
    }

    if (position === 'center' || position === '') {
      prevButton.style.position = 'absolute';
      prevButton.style.top = '50%';
      prevButton.style.left = '10px';
      prevButton.style.padding = '5px'
      prevButton.style.cursor = 'pointer'
      prevButton.style.width = 'auto'

      nextButton.style.position = 'absolute';
      nextButton.style.top = '50%';
      nextButton.style.right = '10px';
      nextButton.style.padding = '5px'
      nextButton.style.cursor = 'pointer'
      nextButton.style.width = 'auto'
    }

    if (position === 'bottom') {
      prevButton.style.position = 'absolute';
      prevButton.style.bottom = '0px';
      prevButton.style.left = '0px';
      prevButton.style.padding = '5px'
      prevButton.style.cursor = 'pointer'
      prevButton.style.width = '50%'

      nextButton.style.position = 'absolute';
      nextButton.style.bottom = '0px';
      nextButton.style.right = '0px';
      nextButton.style.padding = '5px'
      nextButton.style.cursor = 'pointer'
      nextButton.style.width = '50%'
    }

    container.appendChild(prevButton);
    container.appendChild(nextButton);

    console.log(position)

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
