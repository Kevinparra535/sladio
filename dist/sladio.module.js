/*!
 * sladio-test
 * https://github.com/Kevinparra535/sladio.git
 * (c) 2020 @kevinparra535
 * Released under the MIT License.
 */
const navegationDefault = {
	dragAndDrop: true,
	orientation: 'horizontal',
	infinity: false,
	buttons: {
		active: false,
	},
};

const paginationDefault = {
	active: false,
};

const responsiveDefault = {
	desktop: {
		breakpoint: 991,
		itemsToShow: 1,
		dotsAreVisibles: false,
	},
	tablet: {
		breakpoint: 990,
		itemsToShow: 1,
		dotsAreVisibles: false,
	},
	mobile: {
		breakpoint: 730,
		itemsToShow: 1,
		dotsAreVisibles: false,
	},
};

/* eslint-disable no-console */

class Sladio {
	constructor(config) {
		this.config = config;

		this.report = this.report.bind(this);

		window.addEventListener('resize', () => {
			setTimeout(() => this.destroySlider(), 1000);
		});

		this.init();
	}

	init() {
		this.report('info', '#00ff00', 'Sladio is running');

		const sliders = document.querySelectorAll('.sladio');

		// Re asignacion, si nuestra config se encuentra vacia cargamos una por defecto
		// if (Object.keys(this.config).length === 0) this.config = { configUser: "config por default" };

		sliders.forEach((slider, index) => {
			// Si no hay un id se lo asignamos, esto sirve para la configuracion
			if (slider.id === '') slider.id = 'slider' + (index + 1);

			// Si hay un id repetido, lo reemplazamos por uno nuevo
			if (document.querySelectorAll(`#slider${slider.id}`).length > 1) {
				this.report('warn', 'orange', `El slider ${slider.id} tiene mas de un elemento`);

				const element = document.querySelectorAll(`#slider${slider.id}`);
				element[1].id = element.length + 1;
			}

			/// NAVEGACION ///
			const navegation = this.config.navegation[slider.id];

			if (navegation === undefined || navegation === null) {
				this.report('warn', 'yellow', `Se crea navegacion para el ${slider.id}`);

				const navegationDefault$1 = navegationDefault;

				this.config.navegation[slider.id] = { ...navegationDefault$1 };
			}

			/// PAGINACION ///
			const pagination = this.config.pagination[slider.id];

			if (pagination === undefined || pagination === null) {
				this.report('warn', 'yellow', `Se crea paginación para el ${slider.id}`);

				const paginationDefault$1 = paginationDefault;

				this.config.pagination[slider.id] = { ...paginationDefault$1 };
			}

			/// RESPONSIVE ///

			const responsive = this.config.responsive[slider.id];

			if (responsive === undefined || responsive === null) {
				this.report('warn', 'yellow', `Se crea responsive para el ${slider.id}`);

				const responsiveDefault$1 = responsiveDefault;

				this.config.responsive[slider.id] = { ...responsiveDefault$1 };
			}

			/// CONTENEDOR ///
			const container = slider.querySelector('.sladio__container');

			if (container === null || container === undefined) {
				this.report('warn', 'yellow', `No se encuentra el contenedor para el slider ${slider.id}`);
				this.createContainer(slider);
			} else {
				// Iniciamos las configuraciones iniciales
				this.createSliders(slider, container);
			}
		});
	}

	// Creamos el contenedor del slider, esto por si no lo tiene
	createContainer(slider) {
		const createContainer = document.createElement('div');
		createContainer.classList.add('sladio__container');
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

		this.createSliders(slider, createContainer);
	}

	// Crea y setea las configuraciones iniciales
	createSliders(slider, container) {
		const navegation = this.config.navegation[slider.id];
		const pagination = this.config.pagination[slider.id];
		const responsive = this.config.responsive[slider.id];
		const items = container.querySelectorAll('.sladio__items');

		/// NAVEGACION ///
		if (navegation) {
			const { dragAndDrop, buttons, orientation } = navegation;

			// Si la orientación es vertical
			if (orientation === 'vertical') {
				container.classList.add(`${orientation}`);

				for (let i = 0; i < items.length; i++) {
					items[i].classList.add('sladio__items-start');
				}
			}

			// Si la orientación es horizontal
			if (orientation === 'horizontal') {
				container.classList.add(`${orientation}`);

				for (let i = 0; i < items.length; i++) {
					items[i].classList.add('sladio__items-start');
				}
			}

			// Si los botones estan activos, los creamos
			if (buttons.active === true) this.createNavsButtons(slider, buttons);

			if (dragAndDrop === true) this.createDragAndDrop(slider, container, items);

			this.report('info', 'green', `Sladio = ${slider.getAttribute('id')} Cargado Correctamente`);
		}

		if (pagination) this.createPagination(slider, container, pagination, navegation);

		if (responsive) this.responsiveSlides(container, responsive, items);
	}

	/// BOTONES DE NAVEGACION ///
	createNavsButtons(slider, navsButtons) {
		const container = slider.querySelector('.sladio__container');
		const items = slider.querySelectorAll('.sladio__items');

		const { btnPrev, btnNext, position } = navsButtons;

		const prevButton = document.createElement('button');
		const nextButton = document.createElement('button');

		const textPrev = document.createTextNode('');
		const textNext = document.createTextNode('');

		prevButton.className = btnPrev;
		prevButton.title = 'change slide';
		nextButton.className = btnNext;
		nextButton.title = 'change slide';

		prevButton.appendChild(textPrev);
		nextButton.appendChild(textNext);

		prevButton.addEventListener('click', (e) => (e.preventDefault(), this.prevSlide(slider, container, items)));

		nextButton.addEventListener('click', (e) => (e.preventDefault(), this.nextSlide(slider, container, items)));

		if (position === 'top' || position === 'left' || position === 'right') {
			this.report('info', 'lightblue', 'No hay una diseño preestablecido para esta posición 😥');
		}

		if (position === 'center' || position === '') {
			prevButton.style.position = 'absolute';
			prevButton.style.top = '50%';
			prevButton.style.left = '10px';
			prevButton.style.padding = '5px';
			prevButton.style.cursor = 'pointer';
			// prevButton.style.width = 'auto';

			nextButton.style.position = 'absolute';
			nextButton.style.top = '50%';
			nextButton.style.right = '10px';
			nextButton.style.padding = '5px';
			nextButton.style.cursor = 'pointer';
			// nextButton.style.width = 'auto';
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

	/// DRAG AND DROP ///
	createDragAndDrop(slider, container, items) {
		const changeSlide = (e) => {
			e.preventDefault();

			this.dragEnd = e.clientX;

			if (this.dragEnd < this.dragStart) {
				this.nextSlide(slider, container, items);
			}

			if (this.dragEnd > this.dragStart) {
				this.prevSlide(slider, container, items);
			}
		};

		container.addEventListener('mousedown', (e) => (e.preventDefault(), (this.dragStart = e.clientX)));
		container.addEventListener('touchstart', (e) => (this.dragStart = e.changedTouches[0].clientX));
		container.addEventListener('mouseup', changeSlide, true);
		container.addEventListener('touchend', changeSlide, true);
	}

	/// PAGINACION ///
	createPagination(slider, container, pagination, navegation) {
		const { orientation } = navegation;
		const { active, type } = pagination;

		const items = container.querySelectorAll('.sladio__items');
		const indicator = document.createElement('div');
		indicator.className = 'sladio__indicator';

		if (active === false) indicator.style.display = 'none';

		if (type === 'bullets') {
			indicator.classList.add('sladio__indicator-bullets');
			this.createBulletIndicator(slider, container, items, indicator, pagination, orientation);
		}

		if (type === 'fraction') {
			indicator.classList.add('sladio__indicator-fraction');
			this.createFractionIndicator(slider, container, items, indicator);
		}

		if (type === 'progressbar') {
			indicator.classList.add('sladio__indicator-progressbar');
			this.createProgressBarIndicator(slider, container, indicator, items);
		}

		if (type === 'scrollbar') indicator.classList.add('sladio__indicator-scrollbar');
	}

	/// NEXT SLIDE ///
	nextSlide(slider, container) {
		const { active } = this.config.pagination[slider.id];
		const { infinity } = this.config.navegation[slider.id];
		if (active === true) {
			// Modo infinito, esto detecta cuando el ultimo bullet este activo para iniciar el conteo de 0
			if (!slider.querySelector('.sladio__indicator-bullets a:last-child').classList.contains('bullet_selected')) {
				container.scrollLeft += slider.scrollWidth; // Muestra el siguiente item
			}

			if (infinity === true) {
				slider.querySelector('.sladio__indicator-bullets a:first-child').click();
				container.scrollLeft = 0;
			}
		} else {
			container.scrollLeft += slider.scrollWidth; // Muestra el siguiente item
		}
	}

	/// PREV SLIDE ///
	prevSlide(slider, container) {
		const { active } = this.config.pagination[slider.id];
		const { infinity } = this.config.navegation[slider.id];

		if (active === true) {
			// Modo infinito, esto detecta cuando el primer bullet este activo para iniciar el conteo desde el ultimo
			if (
				!slider.querySelector('.sladio__indicator-bullets a:first-child').classList.contains('bullet_selected')
			) {
				container.scrollLeft -= slider.scrollWidth; // Muestra el anterior item
			}

			if (infinity === true) {
				slider.querySelector('.sladio__indicator-bullets a:last-child').click();
				slider.scrollLeft = slider.scrollWidth - container.scrollWidth; // Muestra el anterior item
			}
		} else {
			container.scrollLeft -= slider.scrollWidth; // Muestra el anterior item
		}
	}

	/// PROGRESS BAR ///
	createProgressBarIndicator(slider, container, indicator) {
		// Creamos el contenedor y la barra de progreso
		const bar = document.createElement('div');
		bar.className = 'sladio__indicator-progressbar__bar';
		bar.setAttribute('id', 'progressBar');

		indicator.appendChild(bar);

		// Si el elemento no está agregalo
		if (!slider.querySelector('.sladio__indicator-progressbar')) {
			slider.insertBefore(indicator, container);
		}

		// Cuando se hace scroll la función añade el porcentaje al indicador
		const updateProgressBar = (e) => {
			e.preventDefault();

			// Si el contenedor existe, encontes hace el proceso
			if (slider.querySelector('.sladio__indicator-progressbar')) {
				const scrolled = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;

				slider.querySelector('#progressBar').style.width = `${scrolled}%`;
				slider.querySelector('#progressBar').style.maxWidth = `100%`;
			}
		};

		// Escuchamos el evento scroll
		container.addEventListener('scroll', updateProgressBar, true);
	}

	/// FRACTION INDICATOR ///
	createFractionIndicator(slider, container, items, indicator) {
		// Creamos el contenedor donde se van a mostrar el texto
		const fractionContainer = document.createElement('p');
		const fractionText = document.createTextNode(`1 / ${items.length}`);

		fractionContainer.appendChild(fractionText);

		// Asigamos el texto a los items
		for (let i = 0; i < items.length; i++) {
			items[i].setAttribute('data-index', `${i} / ${items.length - 1}`);
		}

		indicator.append(fractionContainer);

		// Si el contenedor no existe, agregalo
		if (!slider.querySelector('.sladio__indicator-fraction')) {
			slider.append(indicator);
		}

		// Mostramos los indicadores por fracciones
		const updateFractions = (e) => {
			e.preventDefault();

			const scrolled = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;

			const actualPosition = Math.round((scrolled / 100) * (items.length - 1));
			fractionText.nodeValue = `${actualPosition + 1} / ${items.length}`;
		};

		// Cada vez que el slider hace scroll, actualizamos los indicadores
		container.addEventListener('scroll', updateFractions, true);
	}

	/// BULLETS INDICATOR ///
	createBulletIndicator(slider, container, items, indicator, pagination, orientation) {
		const responsive = this.config.responsive[slider.id];
		const { interactive } = pagination.bulletsConfig;
		const { desktop, tablet, mobile } = responsive;
		const bulletsContainer = document.createElement('div');

		bulletsContainer.className = 'sladio__indicator-bullets';
		indicator.classList.add(`${orientation}`);
		indicator.append(bulletsContainer);

		if (slider.querySelector('.sladio__indicator-bullets') === null) {
			slider.append(indicator);
		}

		// Asignamos el id a los items
		for (let i = 0; i < items.length; i++) {
			items[i].setAttribute('id', `${i}`);
		}

		/// CORREGIR EL TEMA DE LOS BULLETS ///
		// Creamos los bullets, e invocamos el id de cada item
		for (let i = 0; i < items.length; i++) {
			if (i % desktop.itemsToShow === 0)
				bulletsContainer.innerHTML += `<a class="bullets" href="javascript:;" data-index=${i} title="Go to item #${
					i + 1
				}" rel="nofollow"></a>`;
		}

		// Traemos todos los bullets del contenedor
		const allBullets = slider.querySelectorAll('.bullets');
		allBullets[0]?.classList.add('bullet_selected');

		// Si interactive no esta activado, desactiva la función click
		if (!interactive) {
			for (let i = 0; i < allBullets.length; i++) {
				allBullets[i].addEventListener('click', (e) => e.preventDefault());
			}
		} else {
			for (let i = 0; i < allBullets.length; i++) {
				allBullets[i].addEventListener('click', (e) => {
					e.preventDefault();
					const hash = e.target.getAttribute('data-index');
					const item = container.querySelector(`[id="${hash}"]`);
					item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				});
			}
		}

		// Esta función nos indicará cual elemento debe de mostrarse
		const setSelected = () => {
			// Removemos la clase active de los bullets
			allBullets.forEach((bullet) => {
				bullet.classList.remove('bullet_selected');
			});

			// Si la orientación es horizontal
			if (orientation === 'horizontal') {
				// Escuchamos la posición del elemento
				const nthChild = Math.round(container.scrollLeft / slider.scrollWidth) + 1 || 0;
				// Asignamos la clase dependiendo de la posición del scroll
				slider
					.querySelector(`.sladio__indicator-bullets a:nth-child(${nthChild})`)
					?.classList.add('bullet_selected');
			}

			// Si la orientación es vertical
			if (orientation === 'vertical') {
				// Escuchamos la posición del elemento
				const nthChild = Math.round(container.scrollTop / slider.scrollHeight) + 1;

				// Asignamos la clase dependiendo de la posición del scroll
				slider
					.querySelector(`.sladio__indicator-bullets a:nth-child(${nthChild})`)
					.classList.add('bullet_selected');
			}
		};

		// Escuchamos el evento scroll del contenedor
		container.addEventListener('scroll', setSelected);
	}

	/// RESPONSIVE ///
	responsiveSlides(container, responsive, items) {
		// Detecta el numero de items por slide y verifica el tamaño de la ventana

		const { desktop, tablet, mobile } = responsive;

		// Si el tamaño de la ventana corresponde con el tamaño en la configuración, sucede esto
		if (desktop.breakpoint && window.innerWidth >= desktop.breakpoint) {
			const { itemsToShow } = desktop;
			// const showNumOfItems = (items.length / itemsToShow) * 10;
			const showNumOfItems = 100 / itemsToShow;
			const convertToPercentage = showNumOfItems;

			for (let i = 0; i < items.length; i++) {
				items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
			}

			if (itemsToShow !== 1) {
				for (let i = 0; i < items.length; i++) {
					items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
				}
			}
		}

		if (tablet.breakpoint && window.innerWidth <= tablet.breakpoint && window.innerWidth >= mobile.breakpoint) {
			const { itemsToShow } = tablet;
			// const showNumOfItems = items.length / itemsToShow;
			const showNumOfItems = 100 / itemsToShow;
			const convertToPercentage = showNumOfItems;

			for (let i = 0; i < items.length; i++) {
				items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
			}

			if (itemsToShow !== 1) {
				for (let i = 0; i < items.length; i++) {
					items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
				}
			}
		}

		if (mobile.breakpoint && window.innerWidth <= mobile.breakpoint) {
			const { itemsToShow } = mobile;
			// const showNumOfItems = items.length / itemsToShow;
			const showNumOfItems = 100 / itemsToShow;

			const convertToPercentage = showNumOfItems;

			for (let i = 0; i < items.length; i++) {
				items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
			}

			if (itemsToShow !== 1) {
				for (let i = 0; i < items.length; i++) {
					items[i].style.minWidth = `${convertToPercentage.toFixed(2)}%`;
				}
			}
		}
	}

	/// DESTROY ///
	destroySlider() {
		const sliders = document.querySelectorAll('.sladio');

		sliders.forEach((slider) => {
			const responsive = this.config.responsive[slider.id];

			if (slider.querySelector('.sladio__indicator ')) slider.querySelector('.sladio__indicator ').remove();

			if (window.innerWidth >= responsive.desktop.breakpoint) {
				// Destruye el slider
				this.init();
			}
		});
	}

	/// REPORT ///
	report(type, color, message) {
		if (this.config.mode === 'development') {
			if (type === 'log') console.log(`%c${message}`, `color: ${color}; font-weight: bold;`);
			if (type === 'warn') console.warn(`%c${message}`, `color: ${color}; font-weight: bold;`);
			if (type === 'error') console.error(`%c${message}`, `color: ${color}; font-weight: bold;`);
			if (type === 'info') console.info(`%c${message}`, `color: ${color}; font-weight: bold;`);
			if (type === 'debug') console.debug(`%c${message}`, `color: ${color}; font-weight: bold;`);
		}
	}
}

export { Sladio as default };
