const axios = require("axios").default;
const https = require("https");

const agent = new https.Agent({
    rejectUnauthorized: false,
});
class SiteController {
    // [GET] /
    index(req, res) {
        function getAllProducts() {
            return axios.get("https://localhost:44330/api/product", {
                httpsAgent: agent,
            });
        }

        function getDiscountProducts() {
            return axios.get("https://localhost:44330/api/product/discount", {
                httpsAgent: agent,
            });
        }

        function getAllProductsInCart() {
            return axios.get("https://localhost:44330/api/cart", {
                httpsAgent: agent,
            });
        }

        function getProductQuantityOfCart() {
            return axios.get("https://localhost:44330/api/cart/count", {
                httpsAgent: agent,
            });
        }

        function getTotalCartPrice() {
            return axios.get("https://localhost:44330/api/cart/price/total", {
                httpsAgent: agent,
            });
        }

        Promise.all([
            getAllProducts(),
            getDiscountProducts(),
            getProductQuantityOfCart(),
            getAllProductsInCart(),
            getTotalCartPrice(),
        ]).then(function (results) {
            const listAllProducts = results[0].data;
            const listDiscountProducts = results[1].data;
            const numberOfProductsInCart = results[2].data;
            const listProductsInCart = results[3].data;
            const totalCartPrice = results[4].data;
            return res.render("home", {
                listAllProducts,
                listDiscountProducts,
                numberOfProductsInCart,
                listProductsInCart,
                totalCartPrice,
            });
        });
    }

    // [GET] /:slug
    detail(req, res) {
        const slug = req.params.slug;

        function getProductDetail() {
            if (slug) {
                return axios.get(
                    `https://localhost:44330/api/product?slug=${slug}`,
                    {
                        httpsAgent: agent,
                    }
                );
            }
        }

        function getDiscountProducts() {
            return axios.get("https://localhost:44330/api/product/discount", {
                httpsAgent: agent,
            });
        }

        function getProductQuantityOfCart() {
            return axios.get("https://localhost:44330/api/cart/count", {
                httpsAgent: agent,
            });
        }

        function getAllProductsInCart() {
            return axios.get("https://localhost:44330/api/cart", {
                httpsAgent: agent,
            });
        }

        function getTotalCartPrice() {
            return axios.get("https://localhost:44330/api/cart/price/total", {
                httpsAgent: agent,
            });
        }

        Promise.all([
            getProductDetail(),
            getDiscountProducts(),
            getProductQuantityOfCart(),
            getAllProductsInCart(),
            getTotalCartPrice(),
        ])
            .then((results) => {
                const product = results[0].data;
                const listDiscountProducts = results[1].data;
                const numberOfProductsInCart = results[2].data;
                const listProductsInCart = results[3].data;
                const totalCartPrice = results[4].data;
                return res.render("detail", {
                    product,
                    listDiscountProducts,
                    numberOfProductsInCart,
                    listProductsInCart,
                    totalCartPrice,
                });
            })
            .catch((error) => console.log(error));
    }

    // [GET] /cart
    getViewCart(req, res) {
        function getAllProductsInCart() {
            return axios.get("https://localhost:44330/api/cart", {
                httpsAgent: agent,
            });
        }

        function getProductQuantityOfCart() {
            return axios.get("https://localhost:44330/api/cart/count", {
                httpsAgent: agent,
            });
        }

        function getTotalCartPrice() {
            return axios.get("https://localhost:44330/api/cart/price/total", {
                httpsAgent: agent,
            });
        }

        Promise.all([
            getAllProductsInCart(),
            getProductQuantityOfCart(),
            getTotalCartPrice(),
        ])
            .then((results) => {
                const listProductsInCart = results[0].data;
                const numberOfProductsInCart = results[1].data;
                const totalCartPrice = results[2].data;
                return res.render("cart", {
                    listProductsInCart,
                    numberOfProductsInCart,
                    totalCartPrice,
                });
            })
            .catch((error) => console.log(error));
    }

    getViewBill(req, res) {
        function getAllBills() {
            return axios.get("https://localhost:44330/api/bill", {
                httpsAgent: agent,
            });
        }

        function getAllProductsInCart() {
            return axios.get("https://localhost:44330/api/cart", {
                httpsAgent: agent,
            });
        }

        function getProductQuantityOfCart() {
            return axios.get("https://localhost:44330/api/cart/count", {
                httpsAgent: agent,
            });
        }

        function getTotalCartPrice() {
            return axios.get("https://localhost:44330/api/cart/price/total", {
                httpsAgent: agent,
            });
        }

        Promise.all([
            getAllBills(),
            getAllProductsInCart(),
            getProductQuantityOfCart(),
            getTotalCartPrice(),
        ])
            .then((results) => {
                const listAllBills = results[0].data;
                const listProductsInCart = results[1].data;
                const numberOfProductsInCart = results[2].data;
                const totalCartPrice = results[3].data;
                return res.render("bill", {
                    listAllBills,
                    listProductsInCart,
                    numberOfProductsInCart,
                    totalCartPrice,
                });
            })
            .catch((error) => console.log(error));
    }
}

module.exports = new SiteController();
