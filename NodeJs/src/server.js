const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
require("dotenv").config();
const route = require("./routes/index");

const app = express();

// Static content
app.use(express.static(path.join(__dirname, "public")));

// Config template engine
app.engine(
    "hbs",
    engine({
        extname: "hbs",
        defaultLayout: "main",
        helpers: {
            getCurrentPrice: function (initPrice, discount) {
                return parseInt(
                    (initPrice * (100 - discount)) / 100
                ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                });
            },
            getInitPrice: function (initPrice) {
                return parseInt(initPrice).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                });
            },
            getCurrentPriceNumber: function (initPrice, discount) {
                return parseInt((initPrice * (100 - discount)) / 100);
            },
            isOnSale: function (discount) {
                return discount > 0;
            },
            renderListSize: function (size) {
                var html = "";
                for (var i = 38; i < 45; i++) {
                    if (i === parseInt(size)) {
                        html += `
                            <div class="respon6-next mr-2"><span class="size-border size-border-active">${size}</span></div>
                        `;
                    } else {
                        html += `
                            <div class="respon6-next mr-2"><span class="size-border">${i}</span></div>
                        `;
                    }
                }
                return html;
            },
            renderProductInformation: function (information) {
                if (information !== "") {
                    var array = information.split(";");
                    var html = array.map((line) => {
                        if (line.includes(":")) {
                            return `
                                    <li class="flex-w flex-t p-b-7">
                                        <span class="stext-102 cl3 size-205">
                                            ${line.split(":")[0]}
                                        </span>

                                        <span class="stext-102 cl6 size-206">
                                        ${line.split(":")[1]}
                                        </span>
                                    </li>
                                `;
                        } else {
                            return `
                                    <li class="flex-w flex-t p-b-7">
                                        <span class="stext-102 cl6 size-206">
                                        ${line}
                                        </span>
                                    </li>
                                `;
                        }
                    });
                    return html.join("");
                }
            },
            isNotCartEmpty: function (numberOfProductsInCart) {
                return parseInt(numberOfProductsInCart) > 0;
            },
            isBillReceived: function (status) {
                return parseInt(status) === 1;
            },
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Add middlewares  to get post request body
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Route
route(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🤜 App listening on port ${PORT}`);
});
