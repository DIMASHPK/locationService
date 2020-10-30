/*!
 * Applify v1.0.0 (http://codeytech.com/site-templates/applify/)
 * Author: Codeytech (http://codeytech.com/)
 */
(function ($, undefined) {
  "use strict";
  // Constants
  var doc = $(document),
    body = $("body"),
    win = $(window),
    breaks = {
      xs: 480,
      sm: 740,
      md: 992,
      lg: 1200,
    };

  /* 1 :: Navbar */
  $.fn.ui_navbar = function () {
    var navbar = this;
    var toggle = $(".ui-mobile-nav-toggle");
    var navbar_nav = $(".ui-navigation");
    // Scroll Function
    win.scroll(function () {
      var scroll_top = $(this).scrollTop();
      if (
        body.hasClass("ui-transparent-nav") &&
        !body.hasClass("mobile-nav-active")
      ) {
        if (scroll_top >= 24) {
          navbar.removeClass("transparent");
        } else {
          navbar.addClass("transparent");
        }
      }
    });
    // Nav Toggle HTML
    toggle.html(
      "<div><span></span><span></span><span></span><span></span></div>"
    );
    // Nav Toggle Action
    var toggle_nav = function () {
      var win_top = win.scrollTop();
      // Nav Is NOT Active
      if (!body.hasClass("mobile-nav-active")) {
        body.addClass("mobile-nav-active");
        toggle.addClass("active");
        navbar_nav.slideDown(250);
        if (body.hasClass("ui-transparent-nav")) {
          navbar.removeClass("transparent");
        }
      }
      // Nav IS Active
      else {
        body.removeClass("mobile-nav-active");
        toggle.removeClass("active");
        navbar_nav.slideUp(200);
        if (body.hasClass("ui-transparent-nav")) {
          if (win_top < 24) {
            navbar.addClass("transparent");
          }
        }
      }
    };
    toggle.on("click", function (e) {
      e.preventDefault();
      toggle_nav();
    });
    win.resize(function () {
      var w = $(this).width();
      var win_top = win.scrollTop();
      if (w >= breaks.md) {
        if (body.hasClass("mobile-nav-active")) {
          body.removeClass("mobile-nav-active");
          toggle.removeClass("active");
          if (body.hasClass("ui-transparent-nav")) {
            if (win_top < 24) {
              navbar.addClass("transparent");
            }
          }
        }
        navbar_nav.show();
      } else {
        if (!body.hasClass("mobile-nav-active")) {
          navbar_nav.hide();
        }
      }
      $(".ui-variable-logo").css({
        width: $(".ui-variable-logo img").width() + 32 + "px",
      });
    });
  };

  /* 12 :: Collapsible Nav */
  $.fn.ui_collapsible_nav = function () {
    var cnav_toggle = this.find("a.toggle");
    var collapsible = {
      show: function (e) {
        e.slideDown(250);
      },
      hide: function (e) {
        e.slideUp(250);
      },
    };
    cnav_toggle.on("click", function (e) {
      e.preventDefault();
      var a = $(this);
      var ul = a.next();
      var sibs = a.parent().siblings();
      var sibs_togg = sibs.children(".toggle");
      if (!a.hasClass("active")) {
        if (sibs_togg.length) {
          sibs_togg.removeClass("active");
          collapsible.hide(sibs_togg.next("ul"));
        }
        collapsible.show(ul);
        a.addClass("active");
      } else {
        collapsible.hide(ul);
        a.removeClass("active");
      }
    });
    cnav_toggle.each(function () {
      var togg = $(this);
      if (togg.hasClass("active")) {
        collapsible.show(togg.next("ul"));
      } else {
        collapsible.hide(togg.next("ul"));
      }
    });
  };

  /* 14 :: Scroll To Section */
  $.fn.ui_scroll_to = function () {
    var link = $("[data-scrollto]");
    link.on("click", function (e) {
      e.preventDefault();

      var scroll_to = $(this).attr("data-scrollto");

      if ($("body#landing-page").length === 0) {
        window.location.href = "./index.html#" + scroll_to;
      } else {
        if (
          $("#" + scroll_to + ".section").length > 0 &&
          scroll_to !== undefined
        ) {
          console.log(scroll_to);
          var pos = $("#" + scroll_to).offset().top;
          $("html, body").animate(
            {
              scrollTop: pos,
            },
            500,
            function () {
              window.location.hash = scroll_to;
            }
          );
        }
      }
    });
  };

  /* 15 :: Actions Cards */
  $.fn.ui_action_card = function () {
    var card = this;
    card.on("click", function () {
      window.location.href = $(this).data("target");
    });
  };

  /* 16 :: Load Images By Screen Density */
  $.fn.ui_uhd_images = function () {
    var img = this;
    var total = img.length;
    var loaded = 0;
    if (window.devicePixelRatio >= 1.25) {
      setUHDImage(img);
    }

    function setUHDImage(images) {
      images.each(function () {
        loaded++;
        var this_img = $(this);
        var img_src = this_img.attr("src");
        if (typeof img_src !== "undefined") {
          var img_type = img_src.split(".").pop();
          var retina_img = img_src.replace("." + img_type, "@2x." + img_type);
          this_img.attr("src", retina_img);
          if (loaded >= total) {
            setTimeout(function () {
              doc.trigger("images_did_load");
            }, 500);
          }
        }
      });
    }
  };
  load_bg_images();

  function load_bg_images() {
    var images = doc.find("[data-bg]");
    var uhd = doc.find("[data-uhd][data-bg]");
    if (window.devicePixelRatio >= 1.25) {
      uhd.each(function () {
        var this_img = $(this);
        var img_src = this_img.attr("data-bg");
        var img_type = img_src.split(".").pop();
        var retina_img = img_src.replace("." + img_type, "@2x." + img_type);
        this_img.css({
          "background-image": "url('" + retina_img + "')",
        });
      });
    } else {
      images.each(function () {
        var this_img = $(this);
        var img_src = this_img.attr("data-bg");
        this_img.css({
          "background-image": "url('" + img_src + "')",
        });
      });
    }
  }
  images_loaded();

  function images_loaded() {
    var images = doc.find("img");
    var total = images.length;
    var loaded = 0;
    var dummy = $("<img/>");
    images.each(function () {
      var img_src = $(this).attr("src");
      dummy.attr("src", img_src).on("load", function () {
        loaded++;
        if (loaded >= total) {
          setTimeout(function () {
            doc.trigger("images_did_load");
          }, 300);
        }
      });
    });
  }

  /* 17 ::  Images Max Widths */
  $("[data-max_width]").each(function () {
    $(this).css({
      "max-width": $(this).attr("data-max_width") + "px",
    });
  });

  /* 18 ::  Animate When In Viewport */
  $.fn.isOnScreen = function () {
    var viewport = {
      top: win.scrollTop(),
    };
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    bounds.bottom = bounds.top + this.outerHeight();
    var winWidth = win.width();
    if (winWidth > breaks.lg) {
      return !(
        viewport.bottom < bounds.top + 200 || viewport.top > bounds.bottom + 60
      );
    } else {
      return !(
        viewport.bottom < bounds.top + 20 || viewport.top > bounds.bottom + 20
      );
    }
  };
  win.scroll(function () {
    $("[data-show]")
      .not(".animated")
      .each(function () {
        var el = $(this);
        var show_animation = $(this).attr("data-show");
        var animation_delay = $(this).attr("data-delay");
        if (el.isOnScreen()) {
          if (!animation_delay) {
            el.addClass(show_animation);
          } else {
            setTimeout(function () {
              el.addClass(show_animation);
            }, animation_delay);
          }
          el.addClass("animated");
        }
      });
  });

  /* 20 :: Vertical Align Elements */
  if ($('[data-vertical_center="true"]').length) {
    var elements = $('[data-vertical_center="true"]');
    var resizeThreshold;
    win.on("resize", function () {
      clearTimeout(resizeThreshold);
      resizeThreshold = setTimeout(function () {
        elements.each(function () {
          var e = $(this);
          var p = e.parent();
          var o = e.data("vertical_offset");
          var y = 0;
          if (o) {
            y = (p.height() - e.height()) / 2 - o;
          } else {
            y = (p.height() - e.height()) / 2;
          }
          var px = p.width();
          var ex = e.outerWidth();
          if (ex < px) {
            e.css({
              "margin-top": y + "px",
            });
          } else {
            e.css({
              "margin-top": "0",
            });
          }
        });
      }, 250);
    });
  }

  /* XX :: Waypoints */
  win.on("scroll", function () {
    var cur_pos = $(this).scrollTop();
    $(".section").each(function () {
      var section = $(this);
      var section_id = $(this).attr("id");
      var top = section.offset().top - 60,
        bottom = top + section.outerHeight();
      if (cur_pos >= top && cur_pos <= bottom) {
        $('[data-scrollto="' + section_id + '"]')
          .parent()
          .addClass("active")
          .siblings()
          .removeClass("active");
      } else {
        $('[data-scrollto="' + section_id + '"]')
          .parent()
          .removeClass("active");
      }
    });
  });

  /* 22 Iinitialize Plugin & Functions */
  // Navbar
  $(".navbar").ui_navbar();
  // UltraHD Images @2x
  if ($("[data-uhd]").length) {
    $("[data-uhd]").ui_uhd_images();
  }
  // UI Scroll to Sections
  if ($("[data-scrollto]").length) {
    $("[data-scrollto]").ui_scroll_to();
  }
  // Collapsible Nav
  if ($(".ui-collapsible-nav").length) {
    doc.ui_collapsible_nav();
  }

  // On Images Did Load
  doc.imagesLoaded(function () {
    win.trigger("resize");
    setTimeout(function () {
      win.trigger("scroll");
    }, 50);
    // Fade In Body
    $('[data-fade_in="on-load"]').animate(
      {
        opacity: 1,
      },
      450
    );
  });

  $(".alert .close").on("click", function () {
    win.trigger("resize");
  });
})(jQuery);
