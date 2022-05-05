"use strict";
function createProduct() {
    const name = document.getElementById("add-modal-name").value;
    //const color = document.getElementById("add-modal-color").value;
    const size = document.getElementById("add-modal-size").value;
    const price = document.getElementById("add-modal-price").value;
    const discount = document.getElementById("add-modal-discount").value;
    const information = document.getElementById("add-modal-infor").value;
    const image = document.getElementById("add-modal-image").files[0];

    var error = "";
    // Validate inputs
    if (name === "") {
        error = "Name can not be empty";
    } else if (size === "") {
        error = "Size can not be empty";
    } else if (price === "") {
        error = "Price can not be empty";
    } else if (parseInt(price) <= 0) {
        error = "Price is invalid";
    } else if (discount === "") {
        error = "Discount value can not be empty";
    } else if (parseInt(discount) < 0 || parseInt(discount) > 100) {
        error = "Discount value is invalid";
    } else if (information === "") {
        error = "Information can not be empty";
    } else if (image === undefined) {
        error = "Image can not be empty";
    }

    if (error !== "") {
        showToast("danger", error);
    } else {
        // Call api to create new product
        let formData = new FormData();
        formData.append("name", name);
        // formData.append("color", color);
        formData.append("size", parseInt(size));
        formData.append("price", parseInt(price));
        formData.append("discount", parseInt(discount));
        formData.append("information", information);
        formData.append("image", image);
        fetch("https://localhost:44330/api/Product", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                $("#create-modal").modal("hide");
                var codeResult;
                if (typeof json === "string") {
                    codeResult = json.split("-")[0];
                } else if (typeof json === "object") {
                    codeResult = json.Message.split("-")[0];
                }
                if (codeResult === "1") {
                    // Success
                    showToast("success", "Create new product successed");
                } else if (codeResult === "0") {
                    // Fail
                    showToast(
                        "danger",
                        "Create new product failed, please try again"
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
