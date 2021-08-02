"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var carousels = document.querySelectorAll(".carousel");
  carousels.forEach(function (carousel) {
    var ele = carousel.querySelector("ul");
    var bullets = carousel.querySelectorAll("ol li");
    var nextarrow = carousel.querySelector(".next");
    var prevarrow = carousel.querySelector(".prev");
    bullets[0].classList.add("selected");

    var setSelected = function setSelected() {
      bullets.forEach(function (bullet) {
        bullet.classList.remove("selected");
      });
      var nthchild = Math.round(ele.scrollLeft / carousel.scrollWidth) + 1;
      carousel.querySelector("ol li:nth-child(" + nthchild + ")").classList.add("selected");
    };

    var nextSlide = function nextSlide() {
      if (!carousel.querySelector("ol li:last-child").classList.contains("selected")) {

        carousel.querySelector("ol li.selected").nextElementSibling.querySelector("a").click();
        ele.scrollLeft += carousel.scrollWidth;
      } else {
        carousel.querySelector("ol li:first-child a").click();
        ele.scrollLeft = 0;
      }
    };

    var prevSlide = function prevSlide() {
      if (!carousel.querySelector("ol li:first-child").classList.contains("selected")) {
        carousel.querySelector("ol li.selected").previousElementSibling.querySelector("a").click();
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
      setInterval(function () {
        if (ele != document.querySelector(".carousel:hover ul")) {
          if (ele.scrollWidth > ele.scrollLeft + carousel.scrollWidth) {
            ele.scrollLeft += carousel.scrollWidth;
          } else ele.scrollLeft = 0;
        }
      }, carousel.getAttribute("duration"));
    }
  }); // end foreach
}); // end onload