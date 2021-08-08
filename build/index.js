'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-restricted-syntax */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-multi-assign */
/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

var _configDefault = require('./core/utils/configDefault');

var configDefault = _interopRequireWildcard(_configDefault);

var _autoCompleteSettings = require('./core/utils/autoCompleteSettings');

var _autoCompleteSettings2 = _interopRequireDefault(_autoCompleteSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sladio = function () {
  function Sladio(config) {
    _classCallCheck(this, Sladio);

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


  _createClass(Sladio, [{
    key: 'createDefaultSettings',
    value: function createDefaultSettings() {

      var _this = this;
      var autoCompleteSettings = new _autoCompleteSettings2.default();

      autoCompleteSettings.run(_this);
    }

    // Método inicial

  }, {
    key: 'init',
    value: function init() {
      // leemos toda la configuración y asignamos funciones
      var initialSlider = this._config.slidersNames;

      // Si no tenemos sliders nos lanza el aviso en el report
      if (!initialSlider.length) {
        this.report('No hay sliders para mostrar');
      }

      // Si tenemos un sliders inicia de manera normal
      if (initialSlider.length) {
        this.firstSlider = [].concat(_toConsumableArray(initialSlider));
        this.customSlider();
      }
    }

    // Sistema custom

  }, {
    key: 'customSlider',
    value: function customSlider() {
      var _this2 = this;

      console.log('Modo custom');
      var sliders = document.querySelectorAll('.sladio');

      sliders.forEach(function (slider) {
        var navsButtons = _this2._config.navsButtons;

        var container = slider.querySelector('.sladio__container');
        var defaultStyles = slider.getAttribute('data-style') || 'default';

        // Si el contenedor no existe, creamos uno
        if (!container) {
          console.log('No existe el container');

          var createContainer = document.createElement('div');
          createContainer.className = 'sladio__container';
          slider.appendChild(createContainer);

          // Una vez creado eliminamos todo lo que pueda estar en el slider
          var cloneElements = slider.querySelectorAll('.sladio__items');
          var newElements = [].concat(_toConsumableArray(cloneElements));

          for (var i = 0; i < cloneElements.length; i++) {
            // Borramos los elementos
            var parentElement = cloneElements[i].parentNode;
            parentElement.removeChild(cloneElements[i]);

            // Y los añadimos al nuevo contenedor
            createContainer.appendChild(newElements[i]);
          }
        }

        // Activamos los movimientos básicos del slider, un segundo después
        // Esto para que verifique si los contenedores exiten
        if (defaultStyles === 'default' || defaultStyles === null) {
          setTimeout(function () {
            return _this2.createDefaultSlider(slider, defaultStyles);
          }, 1000);
        }

        // Si esta iniciado algun demo lo iniciamos aqui
        // if(){}

        // Si los navs están activos
        if (navsButtons) {
          var navsActive = navsButtons[slider.getAttribute('id')].navsActive;


          if (navsActive) {
            _this2.createNavsButtons(slider, navsButtons);
          }
        }
      });
    }

    // Creamos el sistema por default del slider

  }, {
    key: 'createDefaultSlider',
    value: function createDefaultSlider(slider) {
      var _this3 = this;

      var container = slider.querySelector('.sladio__container');
      var items = container.querySelectorAll('.sladio__items');

      var _config$customSetting = this._config.customSettings[slider.getAttribute('id')],
          active = _config$customSetting.active,
          orientation = _config$customSetting.orientation,
          type = _config$customSetting.type,
          desktop = _config$customSetting.desktop,
          tablet = _config$customSetting.tablet,
          mobile = _config$customSetting.mobile;

      var pagActive = this._config.pagination[slider.getAttribute('id')].pagActive;

      console.log(orientation, type); // Estamos agregando el modo vertical

      // Si la orientación es vertical
      if (orientation === 'vertical') {
        container.classList.add('' + orientation);

        for (var i = 0; i < items.length; i++) {
          items[i].classList.add('sladio__items-start');
        }
      }

      // Si la orientación es horizontal
      if (orientation === 'horizontal') {
        container.classList.add('' + orientation);

        for (var _i = 0; _i < items.length; _i++) {
          items[_i].classList.add('sladio__items-start');
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

      var changeSlide = function changeSlide(e) {
        e.preventDefault();

        _this3.dragEnd = e.clientX;

        if (_this3.dragEnd < _this3.dragStart) {
          // if (this.index < items.length - 1) {
          //   console.log('Next');
          //   this.index++;
          // }

          _this3.nextSlide(slider, container, items);
        } else {
          // if (this.index > 0) {
          //   console.log('Prev');
          //   this.index--;
          // }

          // if (this.index < 0) {
          //   this.index = 0;
          // }

          _this3.prevSlide(slider, container, items);
        }
      };

      container.addEventListener('mousedown', function (e) {
        return e.preventDefault(), _this3.dragStart = e.clientX;
      });
      container.addEventListener('mouseup', changeSlide, true);
    }

    // Crea los botones de navegación

  }, {
    key: 'createNavsButtons',
    value: function createNavsButtons(slider, navsButtons) {
      var _this4 = this;

      var container = slider.querySelector('.sladio__container');
      var items = slider.querySelectorAll('.sladio__items');

      var _navsButtons$slider$g = navsButtons[slider.getAttribute('id')],
          btnPrev = _navsButtons$slider$g.btnPrev,
          btnNext = _navsButtons$slider$g.btnNext,
          position = _navsButtons$slider$g.position;


      var prevButton = document.createElement('button');
      var nextButton = document.createElement('button');

      var textPrev = document.createTextNode('<');
      var textNext = document.createTextNode('>');

      prevButton.className = btnPrev;
      nextButton.className = btnNext;

      prevButton.appendChild(textPrev);
      nextButton.appendChild(textNext);

      prevButton.addEventListener('click', function (e) {
        return e.preventDefault(), _this4.prevSlide(slider, container, items);
      });
      nextButton.addEventListener('click', function (e) {
        return e.preventDefault(), _this4.nextSlide(slider, container, items);
      });

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

      if (!slider.querySelector('.' + btnPrev) && !slider.querySelector('.' + btnNext)) {
        slider.appendChild(prevButton);
        slider.appendChild(nextButton);
      }
    }

    // Muestra el siguiente item

  }, {
    key: 'nextSlide',
    value: function nextSlide(slider, container, items) {
      this.slider = slider;
      this.container = container;
      this.items = items;

      var pagActive = this._config.pagination[slider.getAttribute('id')].pagActive;

      if (pagActive) {

        // Modo infinito, esto detecta cuando el ultimo bullet este activo para iniciar el conteo de 0
        if (!slider.querySelector('.sladio__indicator__bullets a:last-child').classList.contains('bullet_selected')) {
          container.scrollLeft += slider.scrollWidth; // Muestra el siguiente item
        } else {
          slider.querySelector('.sladio__indicator__bullets a:first-child').click();
          container.scrollLeft = 0;
        }
      } else {

        container.scrollLeft += slider.scrollWidth; // Muestra el siguiente item
      }
    }

    // Muestra el anterior item

  }, {
    key: 'prevSlide',
    value: function prevSlide(slider, container) {
      this.slider = slider;
      this.container = container;

      var pagActive = this._config.pagination[slider.getAttribute('id')].pagActive;

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

  }, {
    key: 'createIndicators',
    value: function createIndicators(slider, orientation) {

      this.orientation = orientation;

      var container = slider.querySelector('.sladio__container');
      var items = container.querySelectorAll('.sladio__items');

      var _config$pagination$sl = this._config.pagination[slider.getAttribute('id')],
          interactive = _config$pagination$sl.interactive,
          type = _config$pagination$sl.type;

      var indicator = document.createElement('div');

      this.progressBarIndicator(slider, container);
      this.fractionIndicator(slider, container, items, indicator);
      this.bulletIndicator(slider, container, items, indicator, interactive, orientation);

      // Barra de progreso
      // Si el tipo de indicador no es progressbar y los indicadores no estan activos, Ocultamos el contenedor
      if (type !== 'progressbar') {
        slider.querySelector('.sladio__progressbar').style.display = 'none';
      }

      // Fracciones
      // Si el tipo de indicador no es fractions y los indicadores no estan activos, Ocultamos el contenedor
      if (type !== 'fraction') {
        slider.querySelector('.sladio__indicator p').style.display = 'none';
      }

      // Bullets
      // Si el tipo de indicador no es progressbar y los indicadores no estan activos, Ocultamos el contenedor
      if (type !== 'bullets') {
        slider.querySelector('.sladio__indicator__bullets').style.display = 'none';
      }
    }

    // Barra de progreso

  }, {
    key: 'progressBarIndicator',
    value: function progressBarIndicator(slider, container) {
      this.slider = slider;
      this.container = container;

      // Creamos el contenedor y la barra de progreso
      var progressBar = document.createElement('div');
      var bar = document.createElement('div');

      progressBar.className = 'sladio__progressbar';
      bar.className = 'sladio__progressbar-bar';
      bar.setAttribute('id', 'progressBar');

      progressBar.appendChild(bar);

      // Si el elemento no está agregalo
      if (!slider.querySelector('.sladio__progressbar')) {
        slider.insertBefore(progressBar, container);
      }

      // Cuando se hace scroll la función añade el porcentaje al indicador
      var updateProgressBar = function updateProgressBar(e) {
        e.preventDefault();

        // Si el contenedor existe, encontes hace el proceso
        if (slider.querySelector('.sladio__progressbar')) {
          var scrolled = container.scrollLeft / (container.scrollWidth - container.clientWidth) * 100;
          slider.querySelector("#progressBar").style.width = scrolled + '%';
          slider.querySelector("#progressBar").style.maxWidth = '100%';
        }
      };

      // Escuchamos el evento scroll
      container.addEventListener('scroll', updateProgressBar, true);
    }

    // Fracciones

  }, {
    key: 'fractionIndicator',
    value: function fractionIndicator(slider, container, items, indicator) {

      // Creamos el contenedor donde se van a mostrar el texto
      var fractionContainer = document.createElement('p');
      var fractionText = document.createTextNode('0 / ' + (items.length - 1));

      indicator.className = 'sladio__indicator';
      fractionContainer.appendChild(fractionText);

      // Asigamos el texto a los items
      for (var i = 0; i < items.length; i++) {
        items[i].setAttribute('data-index', i + ' / ' + (items.length - 1));
      }

      indicator.append(fractionContainer);

      // Si el contenedor no existe, agregalo
      if (!slider.querySelector('.sladio__indicator')) {
        slider.append(indicator);
      }

      // Mostramos los indicadores por fracciones
      var updateFractions = function updateFractions(e) {
        e.preventDefault();
      };

      // Cada vez que el slider hace scroll, actualizamos los indicadores
      container.addEventListener('scroll', updateFractions, true);
    }

    // Bullets

  }, {
    key: 'bulletIndicator',
    value: function bulletIndicator(slider, container, items, indicator, interactive, orientation) {
      var bulletsContainer = document.createElement('div');
      var itemsToShow = this.desktop.itemsToShow;


      console.log(orientation);

      bulletsContainer.className = 'sladio__indicator__bullets';
      indicator.classList.add('' + orientation);
      indicator.append(bulletsContainer);

      // Asigamos el id a los items
      for (var i = 0; i < items.length; i++) {
        items[i].setAttribute('id', '' + i);
      }

      // Creamos los bullets, e invocamos el id de cada item
      for (var _i2 = 0; _i2 < items.length; _i2++) {
        if (_i2 % itemsToShow === 0) bulletsContainer.innerHTML += '<a class="bullets" href="#' + _i2 + '" data-index=' + _i2 + '></a>';
      }

      // Traemos todos los bullets del contenedor
      var allBullets = slider.querySelectorAll('.bullets');
      allBullets[0].classList.add('bullet_selected');

      // Si interactive no esta activado, desactiva la función click
      if (!interactive) {

        for (var _i3 = 0; _i3 < allBullets.length; _i3++) {
          allBullets[_i3].addEventListener('click', function (e) {
            return e.preventDefault();
          });
        }
      }

      // Esta función nos indicará cual elemento debe de mostrarse
      var setSelected = function setSelected() {

        // Removemos la clase active de los bullets
        allBullets.forEach(function (bullet) {
          bullet.classList.remove('bullet_selected');
        });

        // Si la orientación es horizontal
        if (orientation === 'horizontal') {

          // Escuchamos la posición del elemento
          var nthChild = Math.round(container.scrollLeft / slider.scrollWidth) + 1;

          // Asignamos la clase dependiendo de la posición del scroll
          slider.querySelector('.sladio__indicator__bullets a:nth-child(' + nthChild + ')').classList.add('bullet_selected');
        }

        // Si la orientación es vertical
        if (orientation === 'vertical') {

          // Escuchamos la posición del elemento
          var _nthChild = Math.round(container.scrollTop / slider.scrollHeight) + 1;

          // Asignamos la clase dependiendo de la posición del scroll
          slider.querySelector('.sladio__indicator__bullets a:nth-child(' + _nthChild + ')').classList.add('bullet_selected');
        }
      };

      // Escuchamos el evento scroll del contenedor
      container.addEventListener("scroll", setSelected);
    }

    // Detecta el numero de items por slide y verifica el tamaño de la ventana

  }, {
    key: 'responsiveSlides',
    value: function responsiveSlides(items, desktop, tablet, mobile, container) {
      this.items = items;
      this.desktop = desktop;
      this.tablet = tablet;
      this.mobile = mobile;
      this.container = container;

      // Si el tamaño de la ventana corresponde con el tamaño en la configuración, sucede esto
      if (desktop && window.innerWidth >= desktop.breakpoint) {
        var itemsToShow = desktop.itemsToShow;
        // const showNumOfItems = (items.length / itemsToShow) * 10;

        var showNumOfItems = 100 / itemsToShow;
        var convertToPercentage = showNumOfItems;

        for (var i = 0; i < items.length; i++) {
          items[i].style.minWidth = convertToPercentage.toFixed(2) + '%';
        }

        // if (itemsToShow !== 1) {
        //   for (let i = 0; i < items.length; i++) {
        //     items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
        //   }
        // }
      }

      if (tablet && window.innerWidth <= tablet.breakpoint && window.innerWidth >= mobile.breakpoint) {
        var _itemsToShow = tablet.itemsToShow;
        // const showNumOfItems = items.length / itemsToShow;

        var _showNumOfItems = 100 / _itemsToShow;
        var _convertToPercentage = _showNumOfItems;

        for (var _i4 = 0; _i4 < items.length; _i4++) {
          items[_i4].style.minWidth = _convertToPercentage.toFixed(2) + '%';
        }

        // if (itemsToShow !== 1) {
        //   for (let i = 0; i < items.length; i++) {
        //     items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
        //   }
        // }
      }

      if (mobile && window.innerWidth <= mobile.breakpoint) {
        var _itemsToShow2 = mobile.itemsToShow;
        // const showNumOfItems = items.length / itemsToShow;

        var _showNumOfItems2 = 100 / _itemsToShow2;

        var _convertToPercentage2 = _showNumOfItems2;

        for (var _i5 = 0; _i5 < items.length; _i5++) {
          items[_i5].style.minWidth = _convertToPercentage2.toFixed(2) + '%';
        }

        // if (itemsToShow !== 1) {
        //   for (let i = 0; i < items.length; i++) {
        //     items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
        //   }
        // }
      }
    }

    // Report nos sirve para mostrarle al usuario que esta fallando

  }, {
    key: 'report',
    value: function report(message) {
      this.message = message;
      console.error(this.message);
      alert(this.message);
    }
  }]);

  return Sladio;
}();

module.exports = Sladio;
// export default Sladio;