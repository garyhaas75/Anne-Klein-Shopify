"use strict";
Shopify.theme.jsAccounts = {
    init: function () {
        $(".js-recover-password").on("click", function () {
          	$('#recover-email').val($('#customer_email').val());
            $("#login").hide(), $("#recover").show();
        }),
            $(".cancel-recover-password").on("click", function () {
                $("#recover").hide(), $("#login").show();
            });
    },
    unload: function () {
        $(".js-recover-password").off(), $(".cancel-recover-password").off();
    },
};
