class Sladio {
  constructor(config) {
    this.config = config;

    this.init = this.init.bind(this);
    this.report = this.report.bind(this);
    this.createDefaultSlider = this.createDefaultSlider.bind(this);

    this.init();
  }

  // Método inicial
  init() {
    // leemos toda la configuración y asignamos funciones
    let initialContainer = this.config.slidersNames;
    let navButtons = this.config.navsButtons;
    let pagination = this.config.pagination;

    // Si no tenemos sliders nos lanza el aviso en el report
    if (!initialContainer.length) {
      this.report("No hay sliders para mostrar");
    }

    // Si tenemos un sliders inicia de manera normal
    if (initialContainer.length === 1) {
      let { navsActive, btnPrev, btnNext } = navButtons.slider1;
      let { pagActive, type, interactive, dynamicBullets } = pagination;

      console.log(initialContainer[0]);
      console.log(navsActive, btnPrev, btnNext);
      console.log(pagActive, type, interactive, dynamicBullets);

      this.createDefaultSlider(initialContainer[0]);
    }

    // Si tenemos dos sliders nos redirige a este metodo
    if (initialContainer.length >= 2) {
      for (let i = 0; i < initialContainer.length; i++) {
        console.log(initialContainer[i]);
      }
    }
  }

  // Creamos el sistema por default del slider
  createDefaultSlider(initialContainer) {
    let index = 0;
    let dragStart = 0;
    let dragEnd = 0;
    const container = document.querySelector(`#${initialContainer}`);
    const items = container.querySelectorAll(".sladio__items");
    const virtualWidth = 100 * items.length + "%";
    container.style.width = virtualWidth;

    for (let i = 0; i < items.length; i++) {
      // items[i].style.display = 'none';
    }

    items[0].style.display = "flex";

    const changeSlide = (e) => {

      dragEnd = e.clientX;


      if (dragEnd < dragStart) {


        // Estamos aqui, necesitamos hacer slide
        index++
        console.log("Next");
        console.log(index);
        container.style.transform = `translate(${nexItem}px, 0)`;
        let actualItem = items[index].clientWidth;
        let nexItem = items[(index + 1)].clientWidth;

        items[index].style.transform = `translate(-${nexItem}, 0)`;
      } else {
        console.log("Prev");
      }
    }

    container.addEventListener("drag", (e) => { }, false);

    container.addEventListener("dragstart", (e) => (dragStart = e.clientX), false);

    container.addEventListener("dragend", (e) => changeSlide(e), false);
  }

  // Report nos sirve para mostrarle al usuario que esta fallando
  report(message) {
    this.message = message;
    console.error(this.message);
    alert(this.message);
  }
}

export default Sladio;
