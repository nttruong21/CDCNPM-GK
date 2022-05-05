function getAllProductsAndRender() {
    fetch("https://localhost:44330/api/Product")
        .then((res) => res.json())
        .then((json) => {
            const htmlCode = json.map((product) => {
                return `
                        <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item cat-1">
                            <div class="card bg-light">
                                <div class="block2">
                                    <div class="flash__sale__discount">
                                        <p>Giảm ${product.discount}%</p>
                                    </div>
                                    <div class="block2-pic hov-img0">
                                        <img src="https://localhost:44330/public/image/${product.image}" alt="IMG-OF-PRODUCT"/>
                                        <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                            Xem nhanh
                                        </a>
                                    </div>

                                    <div class="block2-txt flex-w flex-t p-t-14 p-b-14 px-3">
                                        <div class="block2-txt-child1 flex-col-l">
                                            <a href="detail.html" class="stext-104 cltext hov-cl1 font-weight-bold trans-04 js-name-b2 p-b-6">
                                                ${product.name}
                                            </a>
                                            <div class="flash__sale__product__desc__price">
                                                <div class="flash__sale__product__desc__price__new">
                                                    <p>${product.price}</p>
                                                </div>
                                                <div class="flash__sale__product__desc__price__old">
                                                    <p>${product.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
            });
            document.getElementById("list-products").innerHTML =
                htmlCode.join("");
        });
}
