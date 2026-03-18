"use strict";
function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : (a[t] = e), a;
}
Shopify.theme.jsAjaxCart = {
    init: function (a) {
        (Shopify.theme.jsAjaxCart = $.extend(this, Shopify.theme.getSectionData(a))),
            isScreenSizeLarge() || "drawer" == this.cart_action ? this.initializeAjaxCart() : this.initializeAjaxCartOnMobile(),
            "drawer" == this.cart_action
                ? ((this.ajaxCartDrawer = $("[data-ajax-cart-drawer]")),
                  $(document).on("click", "[data-ajax-cart-trigger]", function (a) {
                      return a.preventDefault(), Shopify.theme.jsAjaxCart.showDrawer(), !1;
                  }))
                : "mini_cart" == this.cart_action && this.showMiniCartOnHover(),
            $(document).on("click", ".ajax-submit", function (a) {
                a.preventDefault();
                var t = $(this).closest("form");
                return Shopify.theme.jsAjaxCart.addToCart(t), !1;
            }),
            $(document).on("click", "[data-ajax-cart-delete]", function (a) {
                a.preventDefault();
                var t = $(this).parents("[data-line-item]").data("line-item");
                return Shopify.theme.jsAjaxCart.removeFromCart(t), Shopify.theme.jsCart && Shopify.theme.jsCart.removeFromCart(t), !1;
            }),
            $(document).on("click", "[data-ajax-cart-close]", function (a) {
                return a.preventDefault(), Shopify.theme.jsAjaxCart.hideDrawer(), Shopify.theme.jsAjaxCart.hideMiniCart(), !1;
            });
    },
    showMiniCartOnHover: function () {
        var a = $("[data-ajax-cart-trigger]");
        a.hover(
            function () {
                "centered" == Shopify.theme_settings.header_layout && $(".header-sticky-wrapper").hasClass("is-sticky") ? $(".header-sticky-wrapper [data-ajax-cart-trigger]").addClass("show-mini-cart") : a.addClass("show-mini-cart");
            },
            function () {
                a.removeClass("show-mini-cart");
            }
        );
    },
    hideMiniCart: function () {
        if ("mini_cart" != this.cart_action) return !1;
        $("[data-ajax-cart-close]").parents("[data-ajax-cart-trigger]").removeClass("show-mini-cart");
    },
    toggleMiniCart: function () {
        var r = $(".mobile-header [data-ajax-cart-trigger]");
        r.attr("href", "#"),
            r.off("click").on("click", function (a) {
                var t, e;
                a.target.closest("[data-ajax-cart-mini_cart]") ||
                    (Shopify.theme.jsAjaxCart.initializeAjaxCartOnMobile(),
                    r.toggleClass("show-mini-cart"),
                    (t = 0),
                    (e = parseInt($(".mobile-header").height())),
                    void 0 !== Shopify.theme.jsAnnouncementBar && Shopify.theme.jsAnnouncementBar.enable_sticky && (t = Shopify.theme.jsAnnouncementBar.getAnnouncementHeight()),
                    $(".mobile-header .theme-ajax-cart").css({ height: "calc(100vh - ".concat(e + t, "px)") }));
            });
    },
    showDrawer: function () {
        if ("drawer" != this.cart_action) return !1;
        this.ajaxCartDrawer.addClass("is-visible"), $(".ajax-cart__overlay").addClass("is-visible");
    },
    hideDrawer: function () {
        if ("drawer" != this.cart_action) return !1;
        this.ajaxCartDrawer.removeClass("is-visible"), $(".ajax-cart__overlay").removeClass("is-visible");
    },
    removeFromCart: function removeFromCart(lineID, callback) {
        $.ajax({
            type: "POST",
            url: "/cart/change.js",
            data: "quantity=0&line=" + lineID,
            dataType: "json",
            success: function () {
                Shopify.theme.jsAjaxCart.updateView();
            },
            error: function error(XMLHttpRequest, textStatus) {
                var response = eval("(" + XMLHttpRequest.responseText + ")"),
                    response = response.description;
            },
        });
    },
    initializeAjaxCart: function () {
        Shopify.theme.asyncView
            .load("/cart", "ajax")
            .done(function (a) {
                var t = a.html;
                a.options;
                $("[data-ajax-cart-content]").html(t.content), Shopify.theme_settings.show_multiple_currencies && convertCurrencies();
            })
            .fail(function () {});
    },
    initializeAjaxCartOnMobile: function () {
        this.toggleMiniCart(),
            Shopify.theme.asyncView
                .load("/cart", "ajax")
                .done(function (a) {
                    var t = a.html;
                    a.options;
                    $(".mobile-header [data-ajax-cart-content]").html(t.content), Shopify.theme_settings.show_multiple_currencies && convertCurrencies();
                })
                .fail(function () {});
    },
    addToCart: function addToCart($addToCartForm) {
        var $addToCartBtn = $addToCartForm.find(".button--add-to-cart");
        $.ajax({
            url: "/cart/add.js",
            dataType: "json",
            cache: !1,
            type: "post",
            data: $addToCartForm.serialize(),
            beforeSend: function () {
                $addToCartBtn.attr("disabled", "disabled").addClass("disabled"), $addToCartBtn.find("span").removeClass("fadeInDown").addClass("animated zoomOut");
            },
            success: function () {
                var a,
                    t = $("[data-ajax-cart-trigger]");
                function e() {
                    isScreenSizeLarge() ? (t = $("[data-ajax-cart-trigger]")) : ((t = $(".mobile-header [data-ajax-cart-trigger]")), Shopify.theme.scrollToTop(t)),
                        t.addClass("show-mini-cart"),
                        $addToCartBtn.find("span").removeClass("fadeInDown");
                }
                $addToCartBtn.find(".checkmark").addClass("checkmark-active"),
                    window.setTimeout(function () {
                        $addToCartBtn.removeAttr("disabled").removeClass("disabled"),
                            $addToCartBtn.find(".checkmark").removeClass("checkmark-active"),
                            $addToCartBtn.find(".text, .icon").removeClass("zoomOut").addClass("fadeInDown"),
                            $addToCartBtn.on("webkitAnimationEnd oanimationend msAnimationEnd animationend", e);
                    }, 1e3),
                    Shopify.theme.jsAjaxCart.showDrawer(),
                    Shopify.theme.jsAjaxCart.updateView(),
                    Shopify.theme.jsCart &&
                        $.ajax(
                            (_defineProperty((a = { dataType: "json", async: !1, cache: !1 }), "dataType", "html"),
                            _defineProperty(a, "url", "/cart"),
                            _defineProperty(a, "success", function (a) {
                                var t = $(a).find(".cart__form");
                                $(".cart__form").replaceWith(t), Shopify.theme_settings.show_multiple_currencies && convertCurrencies();
                            }),
                            a)
                        );
            },
            error: function error(XMLHttpRequest) {
                var response = eval("(" + XMLHttpRequest.responseText + ")"),
                    response = response.description,
                    cartWarning = '<p class="cart-warning__message animated bounceIn">'.concat(response.replace("All 1 ", "All "), "</p>");
                $(".warning").remove(),
                    $addToCartForm.find(".cart-warning").html(cartWarning),
                    $addToCartBtn.removeAttr("disabled").removeClass("disabled"),
                    $addToCartBtn.find(".icon").removeClass("zoomOut").addClass("zoomIn"),
                    $addToCartBtn.find(".text").text(Shopify.translation.addToCart).removeClass("zoomOut").addClass("zoomIn");
            },
        });
    },
    updateView: function () {
      	//Extend - dispatch CartRefreshed event to normalize ajax cart changes
        window.dispatchEvent(window.Extend.CustomEvent("ExtendCartRefreshed"));
        Shopify.theme.asyncView
            .load("/cart", "ajax")
            .done(function (a) {
                var t,
                    e,
                    r = a.html,
                    i = a.options;
                0 < i.item_count
                    ? ((t = $(r.content).find(".ajax-cart__list")),
                      (e = $(r.content).find(".ajax-cart__details-wrapper")),
                      $(".ajax-cart__list").replaceWith(t),
                      $(".ajax-cart__details-wrapper").replaceWith(e),
                      $(".ajax-cart__empty-cart-message").addClass("is-hidden"),
                      $(".ajax-cart__form").removeClass("is-hidden"),
                      $("[data-ajax-cart-trigger]").addClass("has-cart-count"),
                      $('[data-bind="itemCount"]').text(i.item_count))
                    : ($(".ajax-cart__empty-cart-message").removeClass("is-hidden"), $(".ajax-cart__form").addClass("is-hidden"), $("[data-ajax-cart-trigger]").removeClass("has-cart-count"), $('[data-bind="itemCount"]').text("0")),
                    Shopify.theme_settings.show_multiple_currencies && convertCurrencies();
            })
            .fail(function () {});
    },
    unload: function () {
        $(".ajax-submit").off(), $("[data-ajax-cart-delete]").off();
    },
};
