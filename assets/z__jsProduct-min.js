"use strict";
Shopify.theme.jsProduct = {
    init: function (e) {
        (Shopify.theme.jsProduct = $.extend(this, Shopify.theme.getSectionData(e))),
            window.Shopify.loadFeatures(
                [
                    { name: "model-viewer", version: "0.8" },
                    { name: "shopify-xr", version: "1.0" },
                    { name: "model-viewer-ui", version: "1.0" },
                ],
                Shopify.theme.productMedia.setupMedia
            );
        var t = e.find(".product-gallery__main"),
            i = e.find(".sticky-product-scroll");
        t && (Shopify.theme.jsProduct.enableSlideshow(t), Shopify.theme.jsProduct.enable_zoom && Shopify.theme.jsProduct.enableZoom(t), Shopify.theme.jsProduct.enable_product_lightbox && Shopify.theme.jsProduct.enableLightbox(t)),
            i && isScreenSizeLarge() && "image-scroll" == Shopify.theme.jsProduct.template && Shopify.theme.jsProduct.enableStickyScroll(i),
            $(".product_form_options", e).each(function () {
                new Shopify.OptionSelectors($(this).data("select-id"), { product: $(this).data("product"), onVariantSelected: selectCallback, enableHistoryState: $(this).data("enable-state") });
            }),
            "?contact_posted=true" === window.location.search && ($(".notify_form .contact-form").hide(), $(".notify_form .contact-form").prev(".message").html(Shopify.translation.notify_form_success)),
            $(".notify_form .contact-form").each(function () {
                var t = $(this);
                t.on("submit", function (e) {
                    "true" !== $('input[name="challenge"]', t).val() &&
                        ($.ajax({
                            type: t.attr("method"),
                            url: t.attr("action"),
                            data: t.serialize(),
                            success: function () {
                                t.fadeOut("slow", function () {
                                    t.prev(".message").html(Shopify.translation.notify_form_success);
                                });
                            },
                            error: function () {
                                $('input[name="challenge"]', t).val("true"), t.submit();
                            },
                        }),
                        e.preventDefault());
                });
            }),
            "swatches" === Shopify.theme_settings.product_form_style
                ? this.enableProductSwatches()
                : "dropdown" === Shopify.theme_settings.product_form_style && ($(".selector-wrapper select", e).wrap('<span class="select" data-dropdown-form-style></span>'), this.findSelectedVariantImage()),
            0 < $(".masonry--true").length && Shopify.theme.applyMasonry(".thumbnail"),
            Shopify.theme.jsProduct.enableSticyATC(),
            $(window).on("resize", function () {
                Shopify.theme.jsProduct.enableSticyATC();
            });
    },
    enableStickyScroll: function (e) {
        var t = 0,
            i = 0;
        void 0 !== Shopify.theme.jsAnnouncementBar && Shopify.theme.jsAnnouncementBar.enable_sticky && (t = $("#announcement-bar").outerHeight()),
            "vertical" != Shopify.theme_settings.header_layout && Shopify.theme.jsHeader.enable_sticky && (i = $("#header").outerHeight()),
            e.stick_in_parent({ offset_top: t + i + 20 });
    },
    enableLightbox: function (e) {
        e.find(".product-gallery__link").fancybox({
            beforeClose: function (e) {
                var t = e.$trigger.first().parents(".product-gallery__main");
                t.hide(),
                    setTimeout(function () {
                        t.fadeIn(100);
                    }, 500);
            },
            afterClose: function () {
                setTimeout(function () {
                    e.find(".is-selected a").focus();
                }, 500);
            },
        });
    },
    enableZoom: function (e) {
        e.find("img").wrap('<span class="zoom-container"></span>').css("display", "block").parent().zoom({ touch: !1, magnify: 1 });
    },
    disableSlideshow: function (e, t) {
        var i = e ? e.find(".flickity-enabled") : $(t);
        i.flickity("destroy");
    },
    enableSlideshow: function (e, t) {
        var r = e,
            i = r.closest(".product-gallery").find(".product-gallery__thumbnails");
        r.find(".gallery-cell:not(.product-gallery__image)").addClass("product-gallery__image"), i.find(".gallery-cell:not(.product-gallery__thumbnail)").addClass("product-gallery__thumbnail");
        var a,
            o,
            n,
            d,
            l,
            s = r.find(".product-gallery__image"),
            c = i.find(".product-gallery__thumbnail"),
            u = t
                ? ((a = t.thumbnailsEnabled), (o = t.thumbnailsSliderEnabled), (n = t.thumbnailsPosition), (d = t.arrowsEnabled), (l = t.slideshowSpeed), t.slideshowTransition)
                : ((a = Shopify.theme.jsProduct.thumbnails_enabled),
                  (o = Shopify.theme.jsProduct.enable_thumbnail_slider),
                  (n = Shopify.theme.jsProduct.thumbnail_position),
                  (d = Shopify.theme.jsProduct.thumbnail_arrows),
                  (l = Shopify.theme.jsProduct.slideshow_speed),
                  Shopify.theme.jsProduct.slideshow_transition);
        r.on("ready.flickity", function () {
            s.each(function (e, t) {
                var i,
                    a = $(t).data("media-type") || $(t).find("[data-media-type]").data("media-type"),
                    o = $("[data-video-loop]").data("video-loop");
                switch (a) {
                    case "external_video":
                        if (((i = $(t).find("[data-plyr-video-id]").data("plyr-video-id")), videoPlayers))
                            for (var n = 0; n < videoPlayers.length; n++)
                                (videoPlayers[n].id != i && videoPlayers[n].media.id != i) || ((videoPlayers[n].loop = o), $(t).hasClass("is-selected") || (videoPlayers[n].keyboard = { focused: !1, global: !1 }));
                        break;
                    case "video":
                        if (((i = $(t).find("[data-plyr-video-id]").data("plyr-video-id")), videoPlayers))
                            for (var d = 0; d < videoPlayers.length; d++)
                                (videoPlayers[d].id != i && videoPlayers[d].media.id != i) || ((videoPlayers[d].loop = o), $(t).hasClass("is-selected") || (videoPlayers[d].keyboard = { focused: !0, global: !1 }));
                        break;
                    case "model":
                        $(t).hasClass("is-selected") &&
                            "model" == a &&
                            isScreenSizeLarge() &&
                            ($(t).on("mouseenter", function () {
                                r.flickity("unbindDrag");
                            }),
                            $(t).on("mouseleave", function () {
                                r.flickity("bindDrag");
                            }));
                }
                $(t).keypress(function (e) {
                    13 == e.which && ($(t).find("model-viewer, .product-gallery__link, .plyr").focus(), ("video" != a && "external_video" != a) || m(), "model" == a && autoplayModel());
                });
            });
        }),
            r.flickity({
                wrapAround: !0,
                adaptiveHeight: !0,
                dragThreshold: 10,
                imagesLoaded: !0,
                pageDots: !0,
                prevNextButtons: 1 < r.data("media-count") || 1 < s.length,
                autoPlay: 1e3 * l,
                fade: "fade" === u,
                watchCSS: "image-scroll" === this.template,
                arrowShape: arrowShape,
            }),
            r.on("change.flickity", function () {
                s.each(function (e, t) {
                    var i = $(t).data("media-type") || $(t).find("[data-media-type]").data("media-type");
                    if ($(t).hasClass("is-selected"))
                        switch (i) {
                            case "model":
                                isScreenSizeLarge() &&
                                    ($(t).on("mouseenter", function () {
                                        r.flickity("unbindDrag");
                                    }),
                                    $(t).on("mouseleave", function () {
                                        r.flickity("bindDrag");
                                    })),
                                    $(t)
                                        .find("model-viewer")
                                        .on("shopify_model_viewer_ui_toggle_play", function () {
                                            r.flickity("unbindDrag");
                                        }),
                                    $(t)
                                        .find("model-viewer")
                                        .on("shopify_model_viewer_ui_toggle_pause", function () {
                                            r.flickity("bindDrag");
                                        });
                                break;
                            default:
                                r.flickity("bindDrag");
                        }
                    else
                        switch (i) {
                            case "external_video":
                                $.each(videoPlayers, function (e, t) {
                                    t.pause();
                                });
                                break;
                            case "video":
                                $.each(videoPlayers, function (e, t) {
                                    t.pause();
                                });
                                break;
                            case "model":
                                $.each(Shopify.theme.productMedia.models, function (e, t) {
                                    t.pause();
                                });
                        }
                }),
                    Shopify.theme.productMedia.showModelIcon(r);
            });
        var f,
            p,
            h = r.find(".flickity-prev-next-button");
        function m() {
            s.each(function (e, t) {
                var i,
                    a,
                    o,
                    n,
                    d = $(t),
                    r = d.data("media-type") || d.find("[data-media-type]").data("media-type"),
                    l = d.find("video").data("plyr-video-id"),
                    s = d.find("iframe").attr("id");
                d.hasClass("is-selected") &&
                    ("video" == r
                        ? (l = d.find("video").data("plyr-video-id")) &&
                          ((o = l),
                          (n = d),
                          $.each(videoPlayers, function (e, t) {
                              t.id == o &&
                                  (t.play(),
                                  t.on("exitfullscreen", function () {
                                      n.closest(".product-gallery").find(".product-gallery__thumbnails").focus();
                                  }));
                          }))
                        : "external_video" == r &&
                          s &&
                          ((i = s),
                          (a = d),
                          $.each(videoPlayers, function (e, t) {
                              t.playing && t.pause(),
                                  t.media.id == i &&
                                      (t.play(),
                                      t.on("exitfullscreen", function () {
                                          a.closest(".product-gallery").find(".product-gallery__thumbnails").focus();
                                      }));
                          })));
            });
        }
        (h || c) &&
            isScreenSizeLarge() &&
            (h.on("click", function () {
                return (
                    r.on("settle.flickity", function (e, t) {
                        var i,
                            a = r.find(".product-gallery__image.is-selected"),
                            o = a.data("media-type") || a.find("[data-media-type]").data("media-type"),
                            n = r.data("product-id");
                        ("video" != o && "external_video" != o) || m(),
                            "model" == o &&
                                ((i = []),
                                $.each(Shopify.theme.productMedia.models, function (e, t) {
                                    $(t.container).closest(".product-gallery__image").data("product-id") == n && i.push(t);
                                }),
                                $.each(i, function (e, t) {
                                    $(t.container).parents(".product-gallery__image").hasClass("is-selected") && t.play();
                                })),
                            r.off("settle.flickity");
                    }),
                    !1
                );
            }),
            c.on("click", function (e) {
                var t = $(e.currentTarget).index();
                return (
                    r.flickity("select", t),
                    r.on("settle.flickity", function (e, t) {
                        var i,
                            a = r.find(".product-gallery__image.is-selected"),
                            o = a.data("media-type") || a.find("[data-media-type]").data("media-type"),
                            n = r.data("product-id");
                        ("video" != o && "external_video" != o) || m(),
                            "model" == o &&
                                ((i = []),
                                $.each(Shopify.theme.productMedia.models, function (e, t) {
                                    $(t.container).closest(".product-gallery__image").data("product-id") == n && i.push(t);
                                }),
                                $.each(i, function (e, t) {
                                    $(t.container).parents(".product-gallery__image").hasClass("is-selected") && t.play();
                                })),
                            r.off("settle.flickity");
                    }),
                    !1
                );
            }),
            c.keypress(function (e) {
                var t = $(e.currentTarget).index();
                if (13 == e.which) {
                    r.flickity("select", t);
                    var i = r.find(".product-gallery__image.is-selected"),
                        a = r.data("product-id");
                    r.on("settle.flickity", function (e, t) {
                        i.find("model-viewer, .plyr, a").focus(), i.find("[data-youtube-video]").attr("tabindex", "0"), r.off("settle.flickity");
                    });
                    var o,
                        n = i.data("media-type") || $selected.find("[data-media-type]").data("media-type");
                    return (
                        ("video" != n && "external_video" != n) || m(),
                        "model" == n &&
                            ((o = []),
                            $.each(Shopify.theme.productMedia.models, function (e, t) {
                                $(t.container).closest(".product-gallery__image").data("product-id") == a && o.push(t);
                            }),
                            $.each(o, function (e, t) {
                                $(t.container).parents(".product-gallery__image").hasClass("is-selected") && t.play();
                            })),
                        !1
                    );
                }
            })),
            setTimeout(function () {
                r.flickity("resize");
            }, 500),
            $(window).on("load", function () {
                r.flickity("resize");
            }),
            1 == a &&
                1 == o &&
                1 < s.length &&
                (isScreenSizeLarge()
                    ? "right-thumbnails" == n || "left-thumbnails" == n
                        ? (i.addClass("vertical-slider-enabled"),
                          (f = c.height()),
                          (p = i.height()),
                          r.on("select.flickity", function () {
                              var e,
                                  t = r.data("flickity");
                              t && (i.find(".is-nav-selected").removeClass("is-nav-selected"), (e = c.eq(t.selectedIndex).addClass("is-nav-selected").position().top + i.scrollTop() - (p + f) / 2), i.animate({ scrollTop: e }));
                          }))
                        : (i.flickity({
                              cellAlign: "center",
                              contain: !0,
                              groupCells: "80%",
                              imagesLoaded: !0,
                              pageDots: !1,
                              prevNextButtons: 5 < c.length && d,
                              asNavFor: "image-scroll" === this.template && isScreenSizeLarge() ? "" : r[0],
                              arrowShape: arrowShape,
                          }),
                          setTimeout(function () {
                              i.flickity("resize");
                          }, 500),
                          $(window).on("load", function () {
                              i.flickity("resize");
                          }))
                    : i.flickity({
                          cellAlign: "center",
                          contain: !0,
                          groupCells: "80%",
                          imagesLoaded: !0,
                          pageDots: !1,
                          prevNextButtons: 5 < c.length && d,
                          asNavFor: "image-scroll" === this.template && isScreenSizeLarge() ? "" : r[0],
                          arrowShape: arrowShape,
                      }));
    },
    updateQVSizeSwatch: function (e) {
        var t;
        e.closest(".quickshop-forms__container").length && ((t = "." + e.attr("id").replace("_form_", "-") + " .js-product_section"), Shopify.theme.updateOptionsInSelector(1, t));
    },
    enableProductSwatches: function () {
        var e;
        $("body").on("change", ".swatch :radio", function () {
            var e = $(this).closest(".swatch").attr("data-option-index"),
                t = $(this).val(),
                i = $(this).closest(".product_form form"),
                a = i.siblings(".notify_form").length ? i.siblings(".notify_form") : $(".js-notify-form"),
                o = i.find(".swatch_options input:checked").eq(0).val(),
                n = i.find(".swatch_options input:checked").eq(1).val() || "",
                d = i.find(".swatch_options input:checked").eq(2).val() || "",
                r = o && n && d ? o + " / " + n + " / " + d : o && n ? o + " / " + n : o;
            a.find(".notify_form_message").attr("value", a.find(".notify_form_message").data("body") + " - " + r);
            var l,
                s = $(this).closest("form").find(".single-option-selector").eq(e);
            s.length || ((l = i.attr("id")), (s = $('[id="' + l + '"] .single-option-selector').eq(e))), s.val(t).trigger("change"), "0" == e ? Shopify.theme.jsProduct.updateQVSizeSwatch(i) : "1" == e && (window.optionVal = t);
        }),
            $(".js-product_section").length &&
                ((e = $(".js-product_section").find(".product_form")).addClass("is-visible"),
                e.each(function () {
                    var e = $(this).data("product"),
                        t = ".product-" + $(this).data("product-id") + " .js-product_section";
                    1 < $(this).find(".swatch_options .swatch").length && Shopify.linkOptionSelectors(e, t);
                })),
            this.findSelectedVariantImage();
    },
    findSelectedVariantImage: function () {
        $("[data-variant-selector]").on("selectedVariantChanged", function () {
            $(this).attr("disabled") ||
                (function (e, t) {
                    var i = e.parents(".product_form").find("select option[value=".concat(t, "]")).attr("data-image-id");
                    if (!i) return;
                    var a = $("[data-image-id=".concat(i, "]")).data("index");
                    "image-scroll" === Shopify.theme.jsProduct.template && Shopify.theme.jsProduct.scrollSelectedImage(a);
                })($(this), $(this).val());
        });
    },
    scrollSelectedImage: function (e) {
        var t = 0,
            i = 0;
        1 == Shopify.theme.jsHeader.enable_sticky && "vertical" != Shopify.theme_settings.header_layout && (t = Shopify.theme.jsHeader.getHeaderHeight()),
            void 0 !== Shopify.theme.jsAnnouncementBar && 1 == Shopify.theme.jsAnnouncementBar.enable_sticky && "vertical" != Shopify.theme_settings.header_layout && (i = Shopify.theme.jsAnnouncementBar.getAnnouncementHeight());
        var a = t + i;
        Shopify.theme.scrollToTop($('[data-index="'.concat(e, '"]')), a);
    },
    relatedProducts: function () {
        $(".block__recommended-products .js-related-products-slider .products-slider, .block__featured-collection .products-slider").each(function (e, t) {
            var i = $(this),
                a = { products_per_slide: i.data("products-per-slide"), products_available: i.data("products-available"), products_limit: i.data("products-limit"), initialIndex: 0, cellAlign: "left", wrapAround: !0 };
            a.products_available > a.products_per_slide && a.products_limit > a.products_per_slide ? (a.wrapAround = !0) : (a.wrapAround = !1),
                a.products_available < a.products_per_slide || a.products_limit < a.products_per_slide
                    ? (i.addClass("container is-justify-center"), i.find(".gallery-cell").addClass("column"))
                    : (i.flickity({
                          lazyLoad: 2,
                          freeScroll: !0,
                          imagesLoaded: !0,
                          draggable: !0,
                          cellAlign: "center",
                          wrapAround: a.wrapAround,
                          pageDots: !1,
                          contain: !0,
                          prevNextButtons: a.products_limit > a.products_per_slide,
                          initialIndex: a.initialIndex,
                          arrowShape: arrowShape,
                      }),
                      setTimeout(function () {
                          i.flickity("resize");
                      }, 500),
                      $(window).on("load", function () {
                          i.flickity("resize");
                      }));
        });
    },
    enableSticyATC: function () {
        $(window).scroll(function () {
            var e = $(".product-form-container").offset().top + $(".product-form-container").height(),
                t = $(window).scrollTop(),
                i = $(".footer__container").offset().top,
                a = t + $(window).height();
            e < t && a < i ? ($(".mobile-add-tocart-button").fadeIn(500), $("body").addClass("atc-sticky")) : ($(".mobile-add-tocart-button").fadeOut(500), $("body").removeClass("atc-sticky"));
        });
    },
    unload: function (e) {
        $(".selector-wrapper select", e).unwrap(), this.disableSlideshow(e), $("[data-variant-selector]").off();
    },
};
