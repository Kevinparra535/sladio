/* eslint-disable no-restricted-syntax */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-multi-assign */
/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

import * as configDefault from './core/utils/configDefault';
import AutoCompleteSettings from './core/utils/autoCompleteSettings';

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
    this.createIndicators = this.createIndicators.bind(this);
    this.progressBarIndicator = this.progressBarIndicator.bind(this);
    this.fractionIndicator = this.fractionIndicator.bind(this);


    if (!Object.keys(this._config).length) {
      // Si no recibe un objeto con la configuración, creamos una configuración global
      console.log('No hay un objeto de configuración');

      this._config = configDefault.default;

    } else {
      this.createDefaultSettings();
    }

    window.addEventListener('resize', this.init);

    this.init();
  }

  // Si recibe un objeto de configuración lo asignamos a nuestra variable y Verificamos si no hay un parámetro se lo asignamos
  createDefaultSettings() {

    const _this = this;
    const autoCompleteSettings = new AutoCompleteSettings()

    autoCompleteSettings.run(_this)
  }

  // Método inicial
  init() {
    // leemos toda la configuración y asignamos funciones
    const initialSlider = this._config.slidersNames;

    // Si no tenemos sliders nos lanza el aviso en el report
    if (!initialSlider.length) {
      this.report('No hay sliders para mostrar');
    }

    // Si tenemos un sliders inicia de manera normal
    if (initialSlider.length) {
      this.firstSlider = [...initialSlider];
      this.customSlider();
    }
  }

  // Sistema custom
  customSlider() {
    console.log('Modo custom');
    const sliders = document.querySelectorAll('.sladio');

    sliders.forEach((slider) => {
      const { navsButtons } = this._config;
      const container = slider.querySelector('.sladio__container');
      const defaultStyles = slider.getAttribute('data-style') || 'default'

      // Si el contenedor no existe, creamos uno
      if (!container) {
        console.log('No existe el container');

        const createContainer = document.createElement('div');
        createContainer.className = 'sladio__container';
        slider.appendChild(createContainer);

        // Una vez creado eliminamos todo lo que pueda estar en el slider
        const cloneElements = slider.querySelectorAll('.sladio__items');
        const newElements = [...cloneElements];

        for (let i = 0; i < cloneElements.length; i++) {
          // Borramos los elementos
          const parentElement = cloneElements[i].parentNode;
          parentElement.removeChild(cloneElements[i]);

          // Y los añadimos al nuevo contenedor
          createContainer.appendChild(newElements[i]);
        }
      }

      // Activamos los movimientos básicos del slider, un segundo después
      // Esto para que verifique si los contenedores exiten
      if (defaultStyles === 'default' || defaultStyles === null) {
        setTimeout(() => this.createDefaultSlider(slider, defaultStyles), 1000);
      }

      // Si esta iniciado algun demo lo iniciamos aqui
      // if(){}

      // Si los navs están activos
      if (navsButtons) {
        const { navsActive } = navsButtons[slider.getAttribute('id')];

        if (navsActive) {
          this.createNavsButtons(slider, navsButtons);
        }
      }
    });
  }

  // Creamos el sistema por default del slider
  createDefaultSlider(slider) {
    const container = slider.querySelector('.sladio__container');
    const items = container.querySelectorAll('.sladio__items');
    const { active, orientation, type, desktop, tablet, mobile } = this._config.customSettings[slider.getAttribute('id')];
    const { pagActive } = this._config.pagination[slider.getAttribute('id')];

    // Si la orientación es vertical
    if (orientation === 'vertical') {
      container.classList.add(`${orientation}`)

      for (let i = 0; i < items.length; i++) {
        items[i].classList.add('sladio__items-start');
      }
    }

    // Si la orientación es horizontal
    if (orientation === 'horizontal') {
      container.classList.add(`${orientation}`)

      for (let i = 0; i < items.length; i++) {
        items[i].classList.add('sladio__items-start');
      }
    }

    if (active) {
      // Detecta el numero de items por slide y verifica el tamaño de la ventana
      this.responsiveSlides(items, desktop, tablet, mobile, container);
    }

    if (pagActive) {
      // Iniciamos el creador de indicadores
      this.createIndicators(slider, orientation);
    }

    const changeSlide = (e) => {
      e.preventDefault();


      this.dragEnd = e.clientX;

      if (this.dragEnd < this.dragStart) {
        // if (this.index < items.length - 1) {
        //   console.log('Next');
        //   this.index++;
        // }

        this.nextSlide(slider, container, items);

      } else {
        // if (this.index > 0) {
        //   console.log('Prev');
        //   this.index--;
        // }

        // if (this.index < 0) {
        //   this.index = 0;
        // }

        this.prevSlide(slider, container, items);
      }

    };

    container.addEventListener('mousedown', (e) => (e.preventDefault(), (this.dragStart = e.clientX)));
    container.addEventListener('mouseup', changeSlide, true);
  }

  // Crea los botones de navegación
  createNavsButtons(slider, navsButtons) {
    const container = slider.querySelector('.sladio__container');
    const items = slider.querySelectorAll('.sladio__items');

    const { btnPrev, btnNext, position } = navsButtons[slider.getAttribute('id')];

    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');

    const textPrev = document.createTextNode('<');
    const textNext = document.createTextNode('>');

    prevButton.className = btnPrev;
    nextButton.className = btnNext;

    prevButton.appendChild(textPrev);
    nextButton.appendChild(textNext);

    prevButton.addEventListener('click', (e) => (e.preventDefault(), this.prevSlide(slider, container, items)));
    nextButton.addEventListener('click', (e) => (e.preventDefault(), this.nextSlide(slider, container, items)));

    if (position === 'top' || position === 'left' || position === 'right') {
      this.report('No hay una diseño preestablecido para esta posición 😥');
    }

    if (position === 'center' || position === '') {
      prevButton.style.position = 'absolute';
      prevButton.style.top = '50%';
      prevButton.style.left = '10px';
      prevButton.style.padding = '5px';
      prevButton.style.cursor = 'pointer';
      prevButton.style.width = 'auto';

      nextButton.style.position = 'absolute';
      nextButton.style.top = '50%';
      nextButton.style.right = '10px';
      nextButton.style.padding = '5px';
      nextButton.style.cursor = 'pointer';
      nextButton.style.width = 'auto';
    }

    if (position === 'bottom') {
      prevButton.style.position = 'absolute';
      prevButton.style.bottom = '0px';
      prevButton.style.left = '0px';
      prevButton.style.padding = '5px';
      prevButton.style.cursor = 'pointer';
      prevButton.style.width = '50%';

      nextButton.style.position = 'absolute';
      nextButton.style.bottom = '0px';
      nextButton.style.right = '0px';
      nextButton.style.padding = '5px';
      nextButton.style.cursor = 'pointer';
      nextButton.style.width = '50%';
    }

    if (!slider.querySelector(`.${btnPrev}`) && !slider.querySelector(`.${btnNext}`)) {
      slider.appendChild(prevButton);
      slider.appendChild(nextButton);
    }

  }

  // Muestra el siguiente item
  nextSlide(slider, container, items) {
    this.slider = slider;
    this.container = container;
    this.items = items;
    const { pagActive } = this._config.pagination[slider.getAttribute('id')];

    if (pagActive) {

      // Modo infinito, esto detecta cuando el ultimo bullet este activo para iniciar el conteo de 0
      if (!slider.querySelector('.sladio__indicator__bullets a:last-child').classList.contains('bullet_selected')) {
        container.scrollLeft += slider.scrollWidth; // Muestra el siguiente item
      } else {
        slider.querySelector('.sladio__indicator__bullets a:first-child').click();
        container.scrollLeft = 0
      }
    } else {

      container.scrollLeft += slider.scrollWidth; // Muestra el siguiente item
    }

  }

  // Muestra el anterior item
  prevSlide(slider, container) {
    this.slider = slider;
    this.container = container;
    const { pagActive } = this._config.pagination[slider.getAttribute('id')];

    if (pagActive) {

      // Modo infinito, esto detecta cuando el primer bullet este activo para iniciar el conteo desde el ultimo
      if (!slider.querySelector('.sladio__indicator__bullets a:first-child').classList.contains('bullet_selected')) {
        container.scrollLeft -= slider.scrollWidth; // Muestra el anterior item
      } else {
        slider.querySelector('.sladio__indicator__bullets a:last-child').click();
        slider.scrollLeft = slider.scrollWidth - container.scrollWidth; // Muestra el anterior item
      }

    } else {
      container.scrollLeft -= slider.scrollWidth; // Muestra el anterior item
    }
  }

  // Crea los bullets o indicadores de posición
  createIndicators(slider, orientation) {

    this.orientation = orientation

    const container = slider.querySelector('.sladio__container');
    const items = container.querySelectorAll('.sladio__items');
    const { interactive, type } = this._config.pagination[slider.getAttribute('id')]
    const indicator = document.createElement('div');


    this.progressBarIndicator(slider, container)
    this.fractionIndicator(slider, container, items, indicator)
    this.bulletIndicator(slider, container, items, indicator, interactive, orientation)

    // Barra de progreso
    // Si el tipo de indicador no es progressbar y los indicadores no estan activos, Ocultamos el contenedor
    if (type !== 'progressbar') {
      slider.querySelector('.sladio__progressbar').style.display = 'none'
    }

    // Fracciones
    // Si el tipo de indicador no es fractions y los indicadores no estan activos, Ocultamos el contenedor
    if (type !== 'fraction') {
      slider.querySelector('.sladio__indicator p').style.display = 'none'
    }

    // Bullets
    // Si el tipo de indicador no es progressbar y los indicadores no estan activos, Ocultamos el contenedor
    if (type !== 'bullets') {
      slider.querySelector('.sladio__indicator__bullets').style.display = 'none'
    }
  }

  // Barra de progreso
  progressBarIndicator(slider, container) {
    this.slider = slider;
    this.container = container;

    // Creamos el contenedor y la barra de progreso
    const progressBar = document.createElement('div');
    const bar = document.createElement('div');

    progressBar.className = 'sladio__progressbar';
    bar.className = 'sladio__progressbar-bar';
    bar.setAttribute('id', 'progressBar')

    progressBar.appendChild(bar);

    // Si el elemento no está agregalo
    if (!slider.querySelector('.sladio__progressbar')) {
      slider.insertBefore(progressBar, container);
    }

    // Cuando se hace scroll la función añade el porcentaje al indicador
    const updateProgressBar = (e) => {
      e.preventDefault()

      // Si el contenedor existe, encontes hace el proceso
      if (slider.querySelector('.sladio__progressbar')) {
        const scrolled = container.scrollLeft / (container.scrollWidth - container.clientWidth) * 100;
        slider.querySelector("#progressBar").style.width = `${scrolled}%`;
        slider.querySelector("#progressBar").style.maxWidth = `100%`;
      }
    }

    // Escuchamos el evento scroll
    container.addEventListener('scroll', updateProgressBar, true);
  }

  // Fracciones
  fractionIndicator(slider, container, items, indicator) {

    // Creamos el contenedor donde se van a mostrar el texto
    const fractionContainer = document.createElement('p');
    const fractionText = document.createTextNode(`0 / ${items.length - 1}`);

    indicator.className = 'sladio__indicator';
    fractionContainer.appendChild(fractionText);

    // Asigamos el texto a los items
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute('data-index', (`${i} / ${items.length - 1}`));
    }

    indicator.append(fractionContainer)


    // Si el contenedor no existe, agregalo
    if (!slider.querySelector('.sladio__indicator')) {
      slider.append(indicator)
    }

    // Mostramos los indicadores por fracciones
    const updateFractions = (e) => {
      e.preventDefault()
    }

    // Cada vez que el slider hace scroll, actualizamos los indicadores
    container.addEventListener('scroll', updateFractions, true)
  }

  // Bullets
  bulletIndicator(slider, container, items, indicator, interactive, orientation) {
    const bulletsContainer = document.createElement('div')
    const { itemsToShow } = this.desktop

    console.log(orientation)

    bulletsContainer.className = 'sladio__indicator__bullets'
    indicator.classList.add(`${orientation}`)
    indicator.append(bulletsContainer)

    // Asigamos el id a los items
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute('id', `${i}`);
    }

    // Creamos los bullets, e invocamos el id de cada item
    for (let i = 0; i < items.length; i++) {
      if (i % itemsToShow === 0)
        bulletsContainer.innerHTML += `<a class="bullets" href="#${i}" data-index=${i}></a>`;
    }

    // Traemos todos los bullets del contenedor
    const allBullets = slider.querySelectorAll('.bullets')
    allBullets[0].classList.add('bullet_selected')

    // Si interactive no esta activado, desactiva la función click
    if (!interactive) {

      for (let i = 0; i < allBullets.length; i++) {
        allBullets[i].addEventListener('click', e => e.preventDefault());
      }
    }

    // Esta función nos indicará cual elemento debe de mostrarse
    const setSelected = () => {

      // Removemos la clase active de los bullets
      allBullets.forEach(bullet => {
        bullet.classList.remove('bullet_selected')
      })

      // Si la orientación es horizontal
      if (orientation === 'horizontal') {

        // Escuchamos la posición del elemento
        const nthChild = (Math.round(container.scrollLeft / slider.scrollWidth) + 1)

        // Asignamos la clase dependiendo de la posición del scroll
        slider.querySelector(`.sladio__indicator__bullets a:nth-child(${nthChild})`).classList.add('bullet_selected')
      }

      // Si la orientación es vertical
      if (orientation === 'vertical') {

        // Escuchamos la posición del elemento
        const nthChild = (Math.round(container.scrollTop / slider.scrollHeight) + 1)

        // Asignamos la clase dependiendo de la posición del scroll
        slider.querySelector(`.sladio__indicator__bullets a:nth-child(${nthChild})`).classList.add('bullet_selected')
      }
    }

    // Escuchamos el evento scroll del contenedor
    container.addEventListener("scroll", setSelected);
  }

  // Detecta el numero de items por slide y verifica el tamaño de la ventana
  responsiveSlides(items, desktop, tablet, mobile, container) {
    this.items = items;
    this.desktop = desktop;
    this.tablet = tablet;
    this.mobile = mobile;
    this.container = container;

    // Si el tamaño de la ventana corresponde con el tamaño en la configuración, sucede esto
    if (desktop && window.innerWidth >= desktop.breakpoint) {
      const { itemsToShow } = desktop;
      // const showNumOfItems = (items.length / itemsToShow) * 10;
      const showNumOfItems = (100 / itemsToShow);
      const convertToPercentage = showNumOfItems;

      for (let i = 0; i < items.length; i++) {
        items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
      }


      // if (itemsToShow !== 1) {
      //   for (let i = 0; i < items.length; i++) {
      //     items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
      //   }
      // }
    }

    if (tablet && window.innerWidth <= tablet.breakpoint && window.innerWidth >= mobile.breakpoint) {
      const { itemsToShow } = tablet;
      // const showNumOfItems = items.length / itemsToShow;
      const showNumOfItems = (100 / itemsToShow);
      const convertToPercentage = showNumOfItems;

      for (let i = 0; i < items.length; i++) {
        items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
      }


      // if (itemsToShow !== 1) {
      //   for (let i = 0; i < items.length; i++) {
      //     items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
      //   }
      // }
    }

    if (mobile && window.innerWidth <= mobile.breakpoint) {
      const { itemsToShow } = mobile;
      // const showNumOfItems = items.length / itemsToShow;
      const showNumOfItems = (100 / itemsToShow);

      const convertToPercentage = showNumOfItems;

      for (let i = 0; i < items.length; i++) {
        items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
      }

      // if (itemsToShow !== 1) {
      //   for (let i = 0; i < items.length; i++) {
      //     items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
      //   }
      // }
    }
  }

  // Report nos sirve para mostrarle al usuario que esta fallando
  report(message) {
    this.message = message;
    console.error(this.message);
    alert(this.message);
  }
}

module.exports = Sladio;
// export default Sladio;

