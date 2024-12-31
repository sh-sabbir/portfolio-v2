(function ($) {
  "use strict";

/*
STICKY
================================== */

  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    var AESticky = $(".active-sticky");
    if (scroll < 245) {
      AESticky.removeClass("is-sticky");
    } else {
      AESticky.addClass("is-sticky");
    }
  });

  //smooth scroll
  $('.smooth-scroll a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          750
        );
        return false;
      }
    }
  });

/*
ONE PAGE NAVIGATE
================================== */
  var OnePNav = $(".onepage-nev");
  var top_offset = OnePNav.height() - -0;
  OnePNav.onePageNav({
    currentClass: "active",
    scrollOffset: top_offset,
  });

/*
EXPEND MENU 
================================== */

  var CloseMu = $(".close-menu");
  var ExMu = $(".mainmenu-expand");
  var ExMuOp = $(".expand-menu-open");
  CloseMu.on("click", function () {
    $(this).parent(ExMu).removeClass("slide_right");
  });
  ExMuOp.on("click", function () {
    CloseMu.parent(ExMu).addClass("slide_right");
  });

/*
PROGRESS WITH WAYPOINT ACTIVE
================================== */

  var ProWey = $(".skill-progress");
  if (ProWey.length > 0) {
    ProWey.waypoint(
      function () {
        // element
        jQuery(".skill-bar").each(function () {
          jQuery(this)
            .find(".progress-content")
            .animate(
              {
                width: jQuery(this).attr("data-percentage"),
              },
              2000
            );

          jQuery(this)
            .find(".progress-mark")
            .animate(
              { left: jQuery(this).attr("data-percentage") },
              {
                duration: 2150,
                step: function (now, fx) {
                  var data = Math.round(now);
                  jQuery(this)
                    .find(".percent")
                    .html(data + "%");
                },
              }
            );
        });
      },
      { offset: "90%" }
    );
  }

/*
ISOTOPE ACTIVE
================================ */

  // isotope menu
  var ProjMli = $(".portfolio-menu li");
  var ProjGrid = $(".portfolio-grid");
  ProjMli.on("click", function () {
    ProjMli.removeClass("active");
    $(this).addClass("active");
    var selector = $(this).attr("data-filter");
    ProjGrid.isotope({
      filter: selector,
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });
  });

/*
fancybox Popup
================================ */
  $(".fancybox").fancybox({
    openEffect: "fade",
    closeEffect: "fade",
    padding: 0,

    closeBtn: true,

    helpers: {
      title: {
        type: "inside",
      },
      buttons: {},
    },
    helpers: {
      overlay: {
        locked: false,
      },
    },
  });
  /* youtube video popup
	--------------------*/
  $(".various").fancybox({
    padding: 0,
    maxWidth: 800,
    maxHeight: 600,
    fitToView: false,
    width: "70%",
    height: "70%",
    autoSize: false,
    closeClick: false,
    openEffect: "fade",
    closeEffect: "fade",
  });

/*
SLICK CAROUSEL AS NAV
===================================*/

  $(".one-item").slick({
    dots: true,
    arrows: false,
  });

/*
CONTACT FORM VALIDATIONS SETTINGS
========================================*/
  var CTForm = $("#contact_form");
  CTForm.validate({
    onfocusout: false,
    onkeyup: false,
    rules: {
      name: "required",
      email: {
        required: true,
        email: true,
      },
    },
    errorPlacement: function (error, element) {
      error.insertBefore(element);
    },
    messages: {
      name: "What's your name?",
      email: {
        required: "What's your email?",
        email: "Please, enter a valid email",
      },
    },

    highlight: function (element) {
      $(element).text("").addClass("error");
    },

    success: function (element) {
      element.text("").addClass("valid");
    },
  });

/*
CONTACT FORM SCRIPT
========================================*/
  var CTSubmit = $("#contact_submit");
  CTForm.submit(function () {
    // submit the form
    if ($(this).valid()) {
      CTSubmit.button("loading");
      var action = $(this).attr("action");
      $.ajax({
        url: action,
        type: "POST",
        data: {
          contactname: $("#contact_name").val(),
          contactemail: $("#contact_email").val(),
          contactmessage: $("#contact_message").val(),
        },
        success: function () {
          CTSubmit.button("reset");
          CTSubmit.button("complete");
        },
        error: function () {
          CTSubmit.button("reset");
          CTSubmit.button("error");
        },
      });
      // return false to prevent normal browser submit and page navigation
    } else {
      CTSubmit.button("reset");
    }
    return false;
  });

/*
SCROLLUP
================================ */

  $.scrollUp({
    scrollText: '<i class="zmdi zmdi-chevron-up"></i>',
    easingType: "linear",
    scrollSpeed: 900,
    animation: "fade",
  });
})(jQuery);

/*
LODING BAR
================================ */

jQuery(window).on("load", function () {
  //Preloader
  var preeLoad = $("#loading");
  preeLoad.fadeOut(1000);

  // isotope grid
  var IsoGriddoload = $(".portfolio-grid");
  IsoGriddoload.isotope({
    itemSelector: ".grid-item",
    masonryHorizontal: {
      rowHeight: 100,
    },
  });
});

/*
AUTO NIGHT MODE
================================ */
jQuery(document).ready(function () {
  var d = new Date();
  var n = d.getHours();

  var loading = $("#loading");
  var header = $("header");
  var footer = $("footer");

  if (n > 19 || n < 6) {
    // If time is after 7PM or before 6AM, apply night theme to ‘body’
    //document.body.className = "day";
    loading.addClass("dark-version");
    header.removeClass("bg-color-1").addClass("dark-version dark-bg");
    footer.removeClass("bg-color-1").addClass("dark-version dark-bg");
    $("section").each(function () {
      $(this).addClass("dark-version");
      if ($(this).hasClass("light-bg")) {
        $(this).removeClass("light-bg").addClass("dark-bg");
      }

      if ($(this).hasClass("bg-color-1")) {
        $(this).removeClass("bg-color-1").addClass("dark-bg");
      } else {
        $(this).addClass("bg-color-3");
      }
    });
    $(".section-title h2").addClass("white-color");
    $(".slider-text h1").addClass("white-color");
    $("section.dark-version h3").addClass("white-color");
    $(".single-experi h3").addClass("light-color");
    $(".single-experi h4").addClass("light-color");
    $(".logo img").attr("src", "assets/img/dark-logo.png");
    $(".menu-logo img").attr("src", "assets/img/dark-logo.png");
  } else {
    loading.removeClass("dark-version");
    header.removeClass("dark-version");
    footer.removeClass("dark-version");
    $("section").each(function () {
      $(this).removeClass("dark-version");
    });
  }
});
