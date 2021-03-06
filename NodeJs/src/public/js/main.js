(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: "fade-in",
        outClass: "fade-out",
        inDuration: 1500,
        outDuration: 800,
        linkElement: ".animsition-link",
        loading: true,
        loadingParentElement: "html",
        loadingClass: "animsition-loading-1",
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ["animation-duration", "-webkit-animation-duration"],
        overlay: false,
        overlayClass: "animsition-overlay-slide",
        overlayParentElement: "html",
        transition: function (url) {
            window.location.href = url;
        },
    });

    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height() / 2;

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css("display", "flex");
        } else {
            $("#myBtn").css("display", "none");
        }
    });

    $("#myBtn").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
    });

    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $(".container-menu-desktop");
    var wrapMenu = $(".wrap-menu-desktop");

    if ($(".top-bar").length > 0) {
        var posWrapHeader = $(".top-bar").height();
    } else {
        var posWrapHeader = 0;
    }

    if ($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass("fix-menu-desktop");
        $(wrapMenu).css("top", 0);
    } else {
        $(headerDesktop).removeClass("fix-menu-desktop");
        $(wrapMenu).css("top", posWrapHeader - $(this).scrollTop());
    }

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass("fix-menu-desktop");
            $(wrapMenu).css("top", 0);
        } else {
            $(headerDesktop).removeClass("fix-menu-desktop");
            $(wrapMenu).css("top", posWrapHeader - $(this).scrollTop());
        }
    });

    /*==================================================================
    [ Menu mobile ]*/
    $(".btn-show-menu-mobile").on("click", function () {
        $(this).toggleClass("is-active");
        $(".menu-mobile").slideToggle();
    });

    var arrowMainMenu = $(".arrow-main-menu-m");

    for (var i = 0; i < arrowMainMenu.length; i++) {
        $(arrowMainMenu[i]).on("click", function () {
            $(this).parent().find(".sub-menu-m").slideToggle();
            $(this).toggleClass("turn-arrow-main-menu-m");
        });
    }

    $(window).resize(function () {
        if ($(window).width() >= 992) {
            if ($(".menu-mobile").css("display") == "block") {
                $(".menu-mobile").css("display", "none");
                $(".btn-show-menu-mobile").toggleClass("is-active");
            }

            $(".sub-menu-m").each(function () {
                if ($(this).css("display") == "block") {
                    console.log("hello");
                    $(this).css("display", "none");
                    $(arrowMainMenu).removeClass("turn-arrow-main-menu-m");
                }
            });
        }
    });

    /*==================================================================
    [ Show / hide modal search ]*/
    $(".js-show-modal-search").on("click", function () {
        $(".modal-search-header").addClass("show-modal-search");
        $(this).css("opacity", "0");
    });

    $(".js-hide-modal-search").on("click", function () {
        $(".modal-search-header").removeClass("show-modal-search");
        $(".js-show-modal-search").css("opacity", "1");
    });

    $(".container-search-header").on("click", function (e) {
        e.stopPropagation();
    });

    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $(".isotope-grid");
    var $filter = $(".filter-tope-group");

    // filter items on button click
    $filter.each(function () {
        $filter.on("click", "button", function () {
            var filterValue = $(this).attr("data-filter");
            $topeContainer.isotope({ filter: filterValue });
        });
    });

    // init Isotope
    $(window).on("load", function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: ".isotope-item",
                layoutMode: "fitRows",
                percentPosition: true,
                animationEngine: "best-available",
                masonry: {
                    columnWidth: ".isotope-item",
                },
            });
        });
    });

    var isotopeButton = $(".filter-tope-group button");

    $(isotopeButton).each(function () {
        $(this).on("click", function () {
            for (var i = 0; i < isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass("how-active1");
            }

            $(this).addClass("how-active1");
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $(".js-show-filter").on("click", function () {
        $(this).toggleClass("show-filter");
        $(".panel-filter").slideToggle(400);

        if ($(".js-show-search").hasClass("show-search")) {
            $(".js-show-search").removeClass("show-search");
            $(".panel-search").slideUp(400);
        }
    });

    $(".js-show-search").on("click", function () {
        $(this).toggleClass("show-search");
        $(".panel-search").slideToggle(400);

        if ($(".js-show-filter").hasClass("show-filter")) {
            $(".js-show-filter").removeClass("show-filter");
            $(".panel-filter").slideUp(400);
        }
    });

    /*==================================================================
    [ Cart ]*/
    $(".js-show-cart").on("click", function () {
        $(".js-panel-cart").addClass("show-header-cart");
    });

    $(".js-hide-cart").on("click", function () {
        $(".js-panel-cart").removeClass("show-header-cart");
    });

    /*==================================================================
    [ Cart ]*/
    $(".js-show-sidebar").on("click", function () {
        $(".js-sidebar").addClass("show-sidebar");
    });

    $(".js-hide-sidebar").on("click", function () {
        $(".js-sidebar").removeClass("show-sidebar");
    });

    /*==================================================================
    [ +/- num product ]*/
    $(".btn-num-product-down").on("click", function () {
        var numProduct = Number($(this).next().val());
        if (numProduct > 1) {
            $(this)
                .next()
                .val(numProduct - 1);
            const productPrice = $(this)
                .parent()
                .parent()
                .parent()[0]
                .querySelector(".column-3");
            const unitPrice = parseInt(productPrice.dataset.productPrice);
            const newPrice = parseInt(
                unitPrice * (numProduct - 1)
            ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
            productPrice.innerHTML = newPrice;
            updateCartTotalPrice();
        }
    });

    $(".btn-num-product-up").on("click", function () {
        var numProduct = Number($(this).prev().val());
        $(this)
            .prev()
            .val(numProduct + 1);
        const productPrice = $(this)
            .parent()
            .parent()
            .parent()[0]
            .querySelector(".column-3");
        const unitPrice = parseInt(productPrice.dataset.productPrice);
        const newPrice = parseInt(unitPrice * (numProduct + 1)).toLocaleString(
            "vi-VN",
            {
                style: "currency",
                currency: "VND",
            }
        );
        productPrice.innerHTML = newPrice;
        updateCartTotalPrice();
    });

    // Function to uodate cart total price
    function updateCartTotalPrice() {
        const listAllCartItem = Array.from(
            document.querySelectorAll("#list-cart-detail-items tr")
        );
        var totalPrice = 0;
        listAllCartItem.forEach((item) => {
            const itemPrice = parseInt(
                item.querySelector(".column-3").dataset.productPrice
            );
            const productQuantity = parseInt(
                item.querySelector(".num-product").value
            );
            totalPrice += itemPrice * productQuantity;
        });
        document.getElementById("bill-total-price").innerHTML = parseInt(
            totalPrice
        ).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }

    /*==================================================================
    [ Rating ]*/
    $(".wrap-rating").each(function () {
        var item = $(this).find(".item-rating");
        var rated = -1;
        var input = $(this).find("input");
        $(input).val(0);

        $(item).on("mouseenter", function () {
            var index = item.index(this);
            var i = 0;
            for (i = 0; i <= index; i++) {
                $(item[i]).removeClass("zmdi-star-outline");
                $(item[i]).addClass("zmdi-star");
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass("zmdi-star-outline");
                $(item[j]).removeClass("zmdi-star");
            }
        });

        $(item).on("click", function () {
            var index = item.index(this);
            rated = index;
            $(input).val(index + 1);
        });

        $(this).on("mouseleave", function () {
            var i = 0;
            for (i = 0; i <= rated; i++) {
                $(item[i]).removeClass("zmdi-star-outline");
                $(item[i]).addClass("zmdi-star");
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass("zmdi-star-outline");
                $(item[j]).removeClass("zmdi-star");
            }
        });
    });

    /*==================================================================
    [ Show modal1 ]*/
    $(".js-show-modal1").on("click", function (e) {
        e.preventDefault();
        $(".js-modal1").addClass("show-modal1");
    });

    $(".js-hide-modal1").on("click", function () {
        $(".js-modal1").removeClass("show-modal1");
    });

    $(".js-select2").each(function () {
        $(this).select2({
            minimumResultsForSearch: 20,
            dropdownParent: $(this).next(".dropDownSelect2"),
        });
    });

    $(".gallery-lb").each(function () {
        // the containers for all your galleries
        $(this).magnificPopup({
            delegate: "a", // the selector for gallery item
            type: "image",
            gallery: {
                enabled: true,
            },
            mainClass: "mfp-fade",
        });
    });

    $(".parallax100").parallax100();

    $(".js-addwish-b2").on("click", function (e) {
        e.preventDefault();
    });

    $(".js-addwish-b2").each(function () {
        var nameProduct = $(this).parent().parent().find(".js-name-b2").html();
        $(this).on("click", function () {
            swal(nameProduct, "is added to wishlist !", "success");

            $(this).addClass("js-addedwish-b2");
            $(this).off("click");
        });
    });

    $(".js-addwish-detail").each(function () {
        var nameProduct = $(this)
            .parent()
            .parent()
            .parent()
            .find(".js-name-detail")
            .html();

        $(this).on("click", function () {
            swal(nameProduct, "is added to wishlist !", "success");

            $(this).addClass("js-addedwish-detail");
            $(this).off("click");
        });
    });

    /*---------------------------------------------*/

    function reRenderProductsInCartSidebar() {
        const listProductsInCartSidebar = document.getElementById(
            "detail-list-all-products-in-cart"
        );
        var totalPrice = 0;
        fetch("https://localhost:44330/api/cart")
            .then((res) => res.json())
            .then((listItems) => {
                if (listItems.length == 0) {
                    listProductsInCartSidebar.innerHTML = "Gi??? h??ng tr???ng";
                    document.getElementById(
                        "detail-cart-total-price-sidebar"
                    ).innerHTML = parseInt(0).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    });
                } else {
                    const html = listItems.map((item) => {
                        totalPrice += parseInt(item.price);
                        const price = parseInt(item.price).toLocaleString(
                            "vi-VN",
                            {
                                style: "currency",
                                currency: "VND",
                            }
                        );
                        return `
                            <li class="header-cart-item flex-w flex-t m-b-12 align-items-center">
                                <div class="header-cart-item-img">
                                    <img src="https://localhost:44330/public/image/${item.Product.image}"
                                        alt="IMG" />
                                </div>

                                <div class="header-cart-item-txt p-t-8">
                                    <a href="/${item.Product.slug}"
                                        class="header-cart-item-name m-b-8 hov-cl1 trans-04">
                                        ${item.Product.name}
                                    </a>

                                    <span class="header-cart-item-info" style="color: #D70018;">
                                        ${price}
                                    </span>
                                </div>
                            </li>
                        `;
                    });
                    listProductsInCartSidebar.innerHTML = html.join("");
                    document.getElementById(
                        "detail-cart-total-price-sidebar"
                    ).innerHTML = parseInt(totalPrice).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    });
                }
            });
    }

    // TH??M S???N PH???M V??O GI??? H??NG
    $(".js-addcart-detail").each(function () {
        var nameProduct = $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".js-name-detail")
            .html();
        $(this).on("click", function () {
            const productId = parseInt(this.dataset.productId);
            const productPrice = parseInt(this.dataset.productPrice);

            // Fetch api to add product to cart
            const data = {
                productId: productId,
                price: productPrice,
            };
            fetch("https://localhost:44330/api/cart", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((cartItem) => {
                    // console.log(cartItem);
                    swal(
                        nameProduct,
                        "???? ???????c th??m v??o gi??? h??ng c???a b???n",
                        "success"
                    );

                    reRenderProductsInCartSidebar();

                    // Call api l???y s??? l?????ng s???n ph???m trong gi??? h??ng v?? t???ng ti???n
                    async function getNumberOfProductsInCart(url = "") {
                        const res = await fetch(url);
                        return res.json();
                    }

                    async function getTotalPriceInCart(url = "") {
                        const res = await fetch(url);
                        return res.json();
                    }

                    async function getAllItemsInCart(url = "") {
                        const res = await fetch(url);
                        return res.json();
                    }

                    Promise.all([
                        getNumberOfProductsInCart(
                            "https://localhost:44330/api/cart/count"
                        ),
                        getTotalPriceInCart(
                            "https://localhost:44330/api/cart/price/total"
                        ),
                        getAllItemsInCart("https://localhost:44330/api/cart"),
                    ]).then((results) => {
                        // Thay ?????i s??? l?????ng s???n ph???m trong gi???
                        document.getElementById(
                            "product-quantity-of-cart"
                        ).dataset.notify = parseInt(results[0]);

                        // Thay ?????i t???ng ti???n
                        const cartTotalPrice = parseInt(
                            results[1]
                        ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        });
                        document.getElementById(
                            "detail-cart-total-price-sidebar"
                        ).innerHTML = cartTotalPrice;

                        // Re render list cart item
                        const listProductsInCartSidebar =
                            document.getElementById(
                                "detail-list-all-products-in-cart"
                            );
                        const listItems = results[2];
                        if (listItems.length == 0) {
                            listProductsInCartSidebar.innerHTML =
                                "Gi??? h??ng tr???ng";
                            document.getElementById(
                                "detail-cart-total-price-sidebar"
                            ).innerHTML = parseInt(0).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            });
                        } else {
                            const html = listItems.map((item) => {
                                const price = parseInt(
                                    item.price
                                ).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                });
                                return `
                                        <li class="header-cart-item flex-w flex-t m-b-12 align-items-center">
                                            <div class="header-cart-item-img">
                                                <img src="https://localhost:44330/public/image/${item.Product.image}"
                                                    alt="IMG" />
                                            </div>
            
                                            <div class="header-cart-item-txt p-t-8">
                                                <a href="/${item.Product.slug}"
                                                    class="header-cart-item-name m-b-8 hov-cl1 trans-04">
                                                    ${item.Product.name}
                                                </a>
            
                                                <span class="header-cart-item-info" style="color: #D70018;">
                                                    ${price}
                                                </span>
                                            </div>
                                        </li>
                                    `;
                            });
                            listProductsInCartSidebar.innerHTML = html.join("");
                        }
                    });
                })
                .catch((error) => {
                    console.log("Add product to cart failed");
                });
        });
    });

    // X??A S???N PH???M KH???I GI??? H??NG
    $("#confirm-delete-modal").on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        var cartDetailId = button.data("cart-detail-id");
        var cartDetailProductName = button.data("cart-detail-product-name");
        // console.log(cartDetailId, cartDetailProductName);
        var modal = $(this);
        modal
            .find("#confirm-detele-modal-product-name")
            .text(cartDetailProductName);
        document.getElementById(
            "confirm-delete-modal-agree-btn"
        ).dataset.cartDetailId = cartDetailId;
    });

    $(".js-pscroll").each(function () {
        $(this).css("position", "relative");
        $(this).css("overflow", "hidden");
        var ps = new PerfectScrollbar(this, {
            wheelSpeed: 1,
            scrollingThreshold: 1000,
            wheelPropagation: false,
        });

        $(window).on("resize", function () {
            ps.update();
        });
    });
})(jQuery);
