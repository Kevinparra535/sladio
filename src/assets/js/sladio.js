class Sladio {
  constructor(config) {
    this._config = config;
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
    this.createDefaultSettings = this.createDefaultSettings.bind(this);

    if (!Object.keys(this._config).length) {
      // Si no recibe un objeto con la configuración, creamos una configuración global
      console.log("No hay un objeto de configuración");

      this._config = {
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
    } else {
      this.createDefaultSettings();
    }

    this.init();
  }

  createDefaultSettings() {
    // Si recibe un objeto de configuración lo asignamos a nuestra variable y Verificamos si no hay un parámetro se lo asignamos

    // Agregamos el modo en el entorno
    if (!this._config.mode) {
      this._config.mode = "development";
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
        position: "center"
      };
    }

    if (!this._config.pagination) {
      this._config.pagination = {
        pagActive: false,
        type: "none", // bullets, fraction, progressbar, scrollbar,
        interactive: false,
        dynamicBullets: false,
      }
    }

    if (!this._config.autoSlide) {
      this._config.autoSlide = {
        active: false,
        interval: 0,
      }
    }

    if (!this._config.JSON) {
      this._config.JSON = [];
    }

    if (!this._config.customSettings) {
      this._config.customSettings = {};
    }

    if (!this._config.customSettings.slider1) {
      this._config.customSettings.slider1 = {
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

  // Método inicial
  init() {
    // leemos toda la configuración y asignamos funciones
    const initialSlider = this._config.slidersNames;

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


    container.addEventListener("mousedown", (e) => (e.preventDefault(), (this.dragStart = e.clientX)));
    container.addEventListener("mouseup", changeSlide, true);
  }

  // Sistema custom
  customSlider() {
    console.log("Modo custom");
    const { navsButtons } = this._config
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
    console.log(this._config);


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
