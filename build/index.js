'use strict';

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null || iter['@@iterator'] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/* eslint-disable no-console */

/* eslint-disable no-undef */

/* eslint-disable class-methods-use-this */

/* eslint-disable no-param-reassign */

/* eslint-disable no-return-assign */

/* eslint-disable no-sequences */

/* eslint-disable no-unused-vars */

/* eslint-disable no-plusplus */
var configDefault = require('./config/configDefault');

var AutoCompleteSettings = require('./config/autoCompleteSettings');

var Sladio = /*#__PURE__*/function () {
  function Sladio(config, active) {
    _classCallCheck(this, Sladio);

    this.active = active;
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
    this.bulletIndicator = this.bulletIndicator.bind(this);
    this.autoChangeSlide = this.autoChangeSlide.bind(this);

    if (this.active) {
      if (!Object.keys(this._config).length) {
        // Si no recibe un objeto con la configuración, creamos una configuración global
        this.report('info', 'No hay un objeto de configuración', 'white');
        this._config = configDefault['default'];
      } else {
        this.createDefaultSettings();
      } // window.addEventListener('resize', () => {
      //   setTimeout(() => this.init(), 1000);
      // });

      this.init();
    } else {
      this.report('info', 'Deteniendo Sladio', 'orange');
    }
  } // Si recibe un objeto de configuración lo asignamos a nuestra variable y Verificamos si no hay un parámetro se lo asignamos

  _createClass(Sladio, [{
    key: 'createDefaultSettings',
    value: function createDefaultSettings() {
      var _this = this;

      var autoCompleteSettings = new AutoCompleteSettings();
      autoCompleteSettings.run(_this);
    } // Método inicial
  }, {
    key: 'init',
    value: function init() {
      this.report('info', 'Iniciando Sladio...', 'yellow'); // leemos toda la configuración y asignamos funciones

      var initialSlider = this._config.slidersNames; // Si no tenemos sliders nos lanza el aviso en el report

      if (!initialSlider.length) {
        this.report('error', 'No hay sliders para mostrar', 'yellow');
      } // Si tenemos un sliders inicia de manera normal

      if (initialSlider.length) {
        this.firstSlider = _toConsumableArray(initialSlider);
        this.customSlider();
      }
    } // Sistema custom
  }, {
    key: 'customSlider',
    value: function customSlider() {
      var _this2 = this;

      var sliders = document.querySelectorAll('.sladio');
      sliders.forEach(function (slider) {
        var navsButtons = _this2._config.navsButtons;
        var container = slider.querySelector('.sladio__container');
        var defaultStyles = slider.getAttribute('data-style') || 'default'; // Si el contenedor no existe, creamos uno

        if (!container) {
          var createContainer = document.createElement('div');
          createContainer.className = 'sladio__container';
          slider.appendChild(createContainer); // Una vez creado eliminamos todo lo que pueda estar en el slider

          var cloneElements = slider.querySelectorAll('.sladio__items');

          var newElements = _toConsumableArray(cloneElements);

          for (var i = 0; i < cloneElements.length; i++) {
            // Borramos los elementos
            var parentElement = cloneElements[i].parentNode;
            parentElement.removeChild(cloneElements[i]); // Y los añadimos al nuevo contenedor

            createContainer.appendChild(newElements[i]);
          }
        } // Activamos los movimientos básicos del slider, un segundo después
        // Esto para que verifique si los contenedores exiten

        if (defaultStyles === 'default' || defaultStyles === null) {
          setTimeout(function () {
            return _this2.createDefaultSlider(slider, defaultStyles);
          }, 1000);
        } // Si esta iniciado algun demo lo iniciamos aqui
        // if(){}
        // Si los navs están activos

        if (navsButtons) {
          // console.log('Navs activos', navsButtons[slider?.getAttribute('id')]);
          var _ref = navsButtons[slider === null || slider === void 0 ? void 0 : slider.getAttribute('id')] || false,
              navsActive = _ref.navsActive;

          if (navsActive) {
            _this2.createNavsButtons(slider, navsButtons);
          }
        }
      });
    } // Creamos el sistema por default del slider
  }, {
    key: 'createDefaultSlider',
    value: function createDefaultSlider(slider) {
      var _this3 = this;

      var container = slider.querySelector('.sladio__container');
      var items = container.querySelectorAll('.sladio__items');

      var _this$_config$customS = this._config.customSettings[slider.getAttribute('id')],
          active = _this$_config$customS.active,
          orientation = _this$_config$customS.orientation,
          desktop = _this$_config$customS.desktop,
          tablet = _this$_config$customS.tablet,
          mobile = _this$_config$customS.mobile;

      var pagActive = this._config.pagination[slider.getAttribute('id')].pagActive;

      var autoSlideActive = this._config.autoSlide[slider.getAttribute('id')].autoSlideActive; // Si la orientación es vertical

      if (orientation === 'vertical') {
        container.classList.add(''.concat(orientation));

        for (var i = 0; i < items.length; i++) {
          items[i].classList.add('sladio__items-start');
        }
      } // Si la orientación es horizontal

      if (orientation === 'horizontal') {
        container.classList.add(''.concat(orientation));

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
      } // Si esta activo el auto slide

      if (autoSlideActive) {
        var _this$_config$autoSli = this._config.autoSlide[slider.getAttribute('id')],
            interval = _this$_config$autoSli.interval,
            pauseOnHover = _this$_config$autoSli.pauseOnHover;

        this.autoChangeSlide(slider, container, items, interval, pauseOnHover);
      }

      var changeSlide = function changeSlide(e) {
        // e.preventDefault();
        if (_this3.dragEnd < _this3.dragStart) {
          _this3.nextSlide(slider, container, items);
        }

        if (_this3.dragEnd > _this3.dragStart) {
          _this3.prevSlide(slider, container, items);
        }
      };

      container.addEventListener('mousedown', function (e) {
        return e.preventDefault(), _this3.dragStart = e.clientX;
      });
      container.addEventListener('touchstart', function (e) {
        return _this3.dragStart = e.changedTouches[0].clientX;
      });
      container.addEventListener('mouseup', changeSlide, true);
      container.addEventListener('touchend', changeSlide, true);
      this.report('info', 'Sladio = '.concat(slider.getAttribute('id'), ' Cargado Correctamente'), 'green');
    } // Crea los botones de navegación
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
      var textPrev = document.createTextNode('');
      var textNext = document.createTextNode('');
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
        prevButton.style.cursor = 'pointer'; // prevButton.style.width = 'auto';

        nextButton.style.position = 'absolute';
        nextButton.style.top = '50%';
        nextButton.style.right = '10px';
        nextButton.style.padding = '5px';
        nextButton.style.cursor = 'pointer'; // nextButton.style.width = 'auto';
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

      if (!slider.querySelector('.'.concat(btnPrev)) && !slider.querySelector('.'.concat(btnNext))) {
        slider.appendChild(prevButton);
        slider.appendChild(nextButton);
      }
    } // Muestra el siguiente item
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
    } // Muestra el anterior item
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
    } // Crea los bullets o indicadores de posición
  }, {
    key: 'createIndicators',
    value: function createIndicators(slider, orientation) {
      this.orientation = orientation;
      var container = slider.querySelector('.sladio__container');
      var items = container.querySelectorAll('.sladio__items');

      var _this$_config$paginat = this._config.pagination[slider.getAttribute('id')],
          interactive = _this$_config$paginat.interactive,
          type = _this$_config$paginat.type;

      var indicator = document.createElement('div');
      this.progressBarIndicator(slider, container);
      this.fractionIndicator(slider, container, items, indicator);
      this.bulletIndicator(slider, container, items, indicator, interactive, orientation); // Barra de progreso
      // Si el tipo de indicador no es progressbar y los indicadores no estan activos, Ocultamos el contenedor

      if (type !== 'progressbar') {
        slider.querySelector('.sladio__progressbar').style.display = 'none';
      } // Fracciones
      // Si el tipo de indicador no es fractions y los indicadores no estan activos, Ocultamos el contenedor

      if (type !== 'fraction') {
        slider.querySelector('.sladio__indicator p').style.display = 'none';
      } // Bullets
      // Si el tipo de indicador no es progressbar y los indicadores no estan activos, Ocultamos el contenedor

      if (type !== 'bullets') {
        slider.querySelector('.sladio__indicator__bullets').style.display = 'none';
      }
    } // Barra de progreso
  }, {
    key: 'progressBarIndicator',
    value: function progressBarIndicator(slider, container) {
      this.slider = slider;
      this.container = container; // Creamos el contenedor y la barra de progreso

      var progressBar = document.createElement('div');
      var bar = document.createElement('div');
      progressBar.className = 'sladio__progressbar';
      bar.className = 'sladio__progressbar-bar';
      bar.setAttribute('id', 'progressBar');
      progressBar.appendChild(bar); // Si el elemento no está agregalo

      if (!slider.querySelector('.sladio__progressbar')) {
        slider.insertBefore(progressBar, container);
      } // Cuando se hace scroll la función añade el porcentaje al indicador

      var updateProgressBar = function updateProgressBar(e) {
        e.preventDefault(); // Si el contenedor existe, encontes hace el proceso

        if (slider.querySelector('.sladio__progressbar')) {
          var scrolled = container.scrollLeft / (container.scrollWidth - container.clientWidth) * 100;
          slider.querySelector('#progressBar').style.width = ''.concat(scrolled, '%');
          slider.querySelector('#progressBar').style.maxWidth = '100%';
        }
      }; // Escuchamos el evento scroll

      container.addEventListener('scroll', updateProgressBar, true);
    } // Fracciones
  }, {
    key: 'fractionIndicator',
    value: function fractionIndicator(slider, container, items, indicator) {
      // Creamos el contenedor donde se van a mostrar el texto
      var fractionContainer = document.createElement('p');
      var fractionText = document.createTextNode('0 / '.concat(items.length - 1));
      indicator.className = 'sladio__indicator';
      fractionContainer.appendChild(fractionText); // Asigamos el texto a los items

      for (var i = 0; i < items.length; i++) {
        items[i].setAttribute('data-index', ''.concat(i, ' / ').concat(items.length - 1));
      }

      indicator.append(fractionContainer); // Si el contenedor no existe, agregalo

      if (!slider.querySelector('.sladio__indicator')) {
        slider.append(indicator);
      } // Mostramos los indicadores por fracciones

      var updateFractions = function updateFractions(e) {
        e.preventDefault();
      }; // Cada vez que el slider hace scroll, actualizamos los indicadores

      container.addEventListener('scroll', updateFractions, true);
    } // Bullets
  }, {
    key: 'bulletIndicator',
    value: function bulletIndicator(slider, container, items, indicator, interactive, orientation) {
      var _allBullets$;

      var bulletsContainer = document.createElement('div');
      var itemsToShow = this.desktop.itemsToShow;
      bulletsContainer.className = 'sladio__indicator__bullets';
      indicator.classList.add(''.concat(orientation));
      indicator.append(bulletsContainer); // Asigamos el id a los items

      for (var i = 0; i < items.length; i++) {
        items[i].setAttribute('id', ''.concat(i));
      } // Creamos los bullets, e invocamos el id de cada item

      for (var _i2 = 0; _i2 < items.length; _i2++) {
        if (_i2 % itemsToShow === 0) bulletsContainer.innerHTML += '<a class="bullets" href="javascript:;" data-index='.concat(_i2, ' rel="nofollow"></a>');
      } // Traemos todos los bullets del contenedor

      var allBullets = slider.querySelectorAll('.bullets');
      (_allBullets$ = allBullets[0]) === null || _allBullets$ === void 0 ? void 0 : _allBullets$.classList.add('bullet_selected'); // Si interactive no esta activado, desactiva la función click

      if (!interactive) {
        for (var _i3 = 0; _i3 < allBullets.length; _i3++) {
          allBullets[_i3].addEventListener('click', function (e) {
            return e.preventDefault();
          });
        }
      } else {
        for (var _i4 = 0; _i4 < allBullets.length; _i4++) {
          allBullets[_i4].addEventListener('click', function (e) {
            e.preventDefault();
            var hash = e.target.getAttribute('data-index');
            var item = container.querySelector('[id="'.concat(hash, '"]'));
            item.scrollIntoView({
              block: 'nearest',
              behavior: 'smooth'
            });
          });
        }
      } // Esta función nos indicará cual elemento debe de mostrarse

      var setSelected = function setSelected() {
        // Removemos la clase active de los bullets
        allBullets.forEach(function (bullet) {
          bullet.classList.remove('bullet_selected');
        }); // Si la orientación es horizontal

        if (orientation === 'horizontal') {
          var _slider$querySelector;

          // Escuchamos la posición del elemento
          var nthChild = Math.round(container.scrollLeft / slider.scrollWidth) + 1 || 0; // Asignamos la clase dependiendo de la posición del scroll

          (_slider$querySelector = slider.querySelector('.sladio__indicator__bullets a:nth-child('.concat(nthChild, ')'))) === null || _slider$querySelector === void 0 ? void 0 : _slider$querySelector.classList.add('bullet_selected');
        } // Si la orientación es vertical

        if (orientation === 'vertical') {
          // Escuchamos la posición del elemento
          var _nthChild = Math.round(container.scrollTop / slider.scrollHeight) + 1; // Asignamos la clase dependiendo de la posición del scroll

          slider.querySelector('.sladio__indicator__bullets a:nth-child('.concat(_nthChild, ')')).classList.add('bullet_selected');
        }
      }; // Escuchamos el evento scroll del contenedor

      container.addEventListener('scroll', setSelected);
    } //  Cambio automatico del slider
  }, {
    key: 'autoChangeSlide',
    value: function autoChangeSlide(slider, container, items, interval, pauseOnHover) {
      var _this5 = this;

      var isVisibleInView = true;
      var isVisibleTab = true;
      var threshold = 0.25;

      var handleVisibilityChange = function handleVisibilityChange() {
        isVisibleTab = document.visibilityState === 'visible';
        return isVisibleTab;
      }; // Si el intervalo es distinto de 0, establecemos el intervalo

      var changeSlide = function changeSlide(e) {
        var nextSlide;
        clearTimeout(nextSlide);

        var handlerIntersection = function handlerIntersection(entries) {
          var entry = entries[0];
          isVisibleInView = entry.intersectionRatio > threshold;
          return isVisibleInView;
        };

        var observer = new IntersectionObserver(handlerIntersection, {
          threshold: threshold
        });
        observer.observe(slider);

        if (pauseOnHover) {
          clearTimeout(nextSlide);

          container.onmouseenter = function (e) {
            e.preventDefault();
            clearTimeout(nextSlide);
          };

          container.onmouseleave = function (e) {
            e.preventDefault();
            clearTimeout(nextSlide);
            nextSlide = setTimeout(changeSlide, interval);
          };
        }

        if (isVisibleInView) {
          clearTimeout(nextSlide);
          nextSlide = setTimeout(changeSlide, interval);
        } else {
          clearTimeout(nextSlide);
        }

        if (isVisibleTab) {
          clearTimeout(nextSlide);
          nextSlide = setTimeout(changeSlide, interval);
        } else {
          clearTimeout(nextSlide);
        }

        _this5.nextSlide(slider, container, items);

        if (nextSlide === undefined && isVisibleInView) {
          // console.log('Funciono');
          nextSlide = setTimeout(changeSlide, interval);
        }
      };

      changeSlide();
      document.addEventListener('visibilitychange', handleVisibilityChange);
    } // Detecta el numero de items por slide y verifica el tamaño de la ventana
  }, {
    key: 'responsiveSlides',
    value: function responsiveSlides(items, desktop, tablet, mobile, container) {
      this.items = items;
      this.desktop = desktop;
      this.tablet = tablet;
      this.mobile = mobile;
      this.container = container; // Si el tamaño de la ventana corresponde con el tamaño en la configuración, sucede esto

      if (desktop && window.innerWidth >= desktop.breakpoint) {
        var itemsToShow = desktop.itemsToShow; // const showNumOfItems = (items.length / itemsToShow) * 10;

        var showNumOfItems = 100 / itemsToShow;
        var convertToPercentage = showNumOfItems;

        for (var i = 0; i < items.length; i++) {
          items[i].style.minWidth = ''.concat(convertToPercentage.toFixed(2), '%');
        } // if (itemsToShow !== 1) {
        //   for (let i = 0; i < items.length; i++) {
        //     items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
        //   }
        // }
      }

      if (tablet && window.innerWidth <= tablet.breakpoint && window.innerWidth >= mobile.breakpoint) {
        var _itemsToShow = tablet.itemsToShow; // const showNumOfItems = items.length / itemsToShow;

        var _showNumOfItems = 100 / _itemsToShow;

        var _convertToPercentage = _showNumOfItems;

        for (var _i5 = 0; _i5 < items.length; _i5++) {
          items[_i5].style.minWidth = ''.concat(_convertToPercentage.toFixed(2), '%');
        } // if (itemsToShow !== 1) {
        //   for (let i = 0; i < items.length; i++) {
        //     items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
        //   }
        // }
      }

      if (mobile && window.innerWidth <= mobile.breakpoint) {
        var _itemsToShow2 = mobile.itemsToShow; // const showNumOfItems = items.length / itemsToShow;

        var _showNumOfItems2 = 100 / _itemsToShow2;

        var _convertToPercentage2 = _showNumOfItems2;

        for (var _i6 = 0; _i6 < items.length; _i6++) {
          items[_i6].style.minWidth = ''.concat(_convertToPercentage2.toFixed(2), '%');
        } // if (itemsToShow !== 1) {
        //   for (let i = 0; i < items.length; i++) {
        //     items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
        //   }
        // }
      }
    } // Report nos sirve para mostrarle al usuario que esta fallando
  }, {
    key: 'report',
    value: function report(type, message, color) {
      if (this._config.mode === 'development') {
        this.message = message;
        if (type === 'error') console.error('%c'.concat(this.message), 'color: '.concat(color));
        if (type === 'log') console.log('%c'.concat(this.message), 'color: '.concat(color));
        if (type === 'info') console.info('%c'.concat(this.message), 'color: '.concat(color));
      } // alert(this.message);
    }
  }]);

  return Sladio;
}();

module.exports = Sladio;