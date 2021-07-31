document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    const ele = carousel.querySelector("ul");
    const bullets = carousel.querySelectorAll("ol li");
    const nextarrow = carousel.querySelector(".next");
    const prevarrow = carousel.querySelector(".prev");
    bullets[0].classList.add("selected");

    const setSelected = function () {
      bullets.forEach((bullet) => {
        bullet.classList.remove("selected");
      });
      const nthchild = Math.round(ele.scrollLeft / carousel.scrollWidth) + 1;
      carousel.querySelector(`ol li:nth-child(${  nthchild  })`).classList.add("selected");
    };

    const nextSlide = function () {
      if (!carousel.querySelector("ol li:last-child").classList.contains("selected")) {

        carousel.querySelector("ol li.selected").nextElementSibling.querySelector("a").click();
        ele.scrollLeft += carousel.scrollWidth;

      } else {
        carousel.querySelector("ol li:first-child a").click();
        ele.scrollLeft = 0;
      }
    };

    const prevSlide = function () {
      if (
        !carousel
          .querySelector("ol li:first-child")
          .classList.contains("selected")
      ) {
        carousel
          .querySelector("ol li.selected")
          .previousElementSibling.querySelector("a")
          .click();
        ele.scrollLeft -= carousel.scrollWidth;
      } else {
        carousel.querySelector("ol li:last-child a").click();
        ele.scrollLeft = ele.scrollWidth - carousel.scrollWidth;
      }
    };

    // Attach the handlers
    ele.addEventListener("scroll", setSelected);
    nextarrow.addEventListener("click", nextSlide);
    prevarrow.addEventListener("click", prevSlide);

    // setInterval for autoplay
    if (carousel.getAttribute("duration")) {
      setInterval(() => {
        if (ele != document.querySelector(".carousel:hover ul")) {
          if (ele.scrollWidth > ele.scrollLeft + carousel.scrollWidth) {
            ele.scrollLeft += carousel.scrollWidth;
          } else ele.scrollLeft = 0;
        }
      }, carousel.getAttribute("duration"));
    }
  }); // end foreach
}); // end onload
