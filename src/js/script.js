// TODO:
// * Добавить выключение модального окна по нажатию на затемненный экран.
$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 1500,
    prevArrow: '<button class="slick-prev"><img src="images/arrow-left.png" alt="Arrow"></button>',
    nextArrow: '<button class="slick-next"><img src="images/arrow-right.png" alt="Arrow"></button>',
    responsive: [{
      breakpoint: 992,
      settings: {
        // dots: true,
        arrows: false
      }
    }]
  });
  $("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function () {
    $(this)
      .addClass("catalog__tab_active")
      .siblings()
      .removeClass("catalog__tab_active")
      .closest("div.container")
      .find("div.catalog__content")
      .removeClass("catalog__content_active")
      .eq($(this).index())
      .addClass("catalog__content_active");
  });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list")
          .eq(i)
          .toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn();
  });
  $(".modal__close").on("click", function kek() {
    $(".overlay, #consultation, #ty, #order").fadeOut();
  });
  $(".catalog-item__btn").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text(
        $(".catalog-item__subtitle")
        .eq(i)
        .text()
      );
      $(".overlay, #order").fadeIn();
    });
  });

  function valideForm(form) {
    $(form).validate({
      rules: {
        name: {
          minlength: 3,
          required: true
        },
        tel: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Введите своё имя, пожалуйста.",
          minlength: jQuery.validator.format("Введите минимум {0} буквы.")
        },
        tel: "Введите, пожалуйста, Ваш телефон.",
        email: {
          required: "Введите, пожалуйста, Вашу почту.",
          email: "Вы ввели некорректный E-mail адрес."
        }
      }
    });
  }
  const forms = ["#consultation form", "#order form", "#consultation-form"];
  for (let i = 0; i < forms.length; i++) {
    valideForm(forms[i]);
  }
  $("input[name=tel]").mask("+7 (999) 999-99-99");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1300) {
      $('.page-up').fadeIn();
    } else {
      $('.page-up').fadeOut();
    }
  });
  $("a[href=#up]").click(function () {
    var _href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(_href).offset().top + "px"
    }, 1500);
    return false;
  });

  new WOW().init();
});