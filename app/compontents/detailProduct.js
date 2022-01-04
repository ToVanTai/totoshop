import * as conFig from "./../constants/config.js";
import * as callApi from "./../utils/callApi.js";
import getParams from "./../utils/getParams.js";

async function onRenderProduct() {
    try {
        let params = getParams();
        if ("id" in params) {
            let idProduct = params.id;
            let urlProductId = `products/${idProduct}`;
            let productPm = new Promise((res, rej) => {
                callApi.httpGetMethod(urlProductId, res, rej);
            });
            productPm.then((res) => {
                let dataRes = JSON.parse(res.responseText);
                renderProduct(dataRes);
            });
            await productPm;
            let tabContents = conFig.$$(".tab__content");

            let tabItems = conFig.$$(".tab__item");
            let productColorItems = conFig.$$(".product-color-item");
            let productSizeItems = conFig.$$(".product-size-item");
            let quantityProduct = conFig.$(".quantity-container .quantity");
            let productQuantityProcess = conFig.$(".product-quantity-process");
            for (let i = 0; i < tabItems.length; i++) {
                tabItems[i].addEventListener("click", onClickTabItem);
            }
            function onClickTabItem() {
                if (!this.classList.contains("active")) {
                    let idOpen = this.dataset.open;
                    for (let i = 0; i < tabItems.length; i++) {
                        tabItems[i].classList.remove("active");
                    }
                    for (let j = 0; j < tabContents.length; j++) {
                        tabContents[j].style.display = "none";
                    }
                    this.classList.add("active");
                    document.getElementById(idOpen).style.display = "block";
                }
            }
            if (productColorItems.length > 0) {
                for (let i = 0; i < productColorItems.length; i++) {
                    productColorItems[i].addEventListener(
                        "click",
                        onClickColorItem
                    );
                }
                function onClickColorItem() {
                    if (!this.classList.contains("active")) {
                        for (let i = 0; i < productColorItems.length; i++) {
                            productColorItems[i].classList.remove("active");
                        }
                        this.classList.add("active");
                    }
                }
            }
            for (let i = 0; i < productSizeItems.length; i++) {
                productSizeItems[i].addEventListener("click", onClickSizeItem);
            }
            function onClickSizeItem() {
                if (!this.classList.contains("active")) {
                    for (let i = 0; i < productSizeItems.length; i++) {
                        productSizeItems[i].classList.remove("active");
                    }
                    this.classList.add("active");
                }
            }
            for (let i = 0; i < productQuantityProcess.children.length; i++) {
                productQuantityProcess.children[i].addEventListener(
                    "click",
                    onClickQuantity
                );
            }
            function onClickQuantity() {
                let dataChange = Number.parseInt(this.dataset.change);
                let quantity =
                    Number.parseInt(quantityProduct.dataset.quantity) +
                    dataChange;
                if (quantity > 0) {
                    quantityProduct.innerHTML = quantity;
                    quantityProduct.dataset.quantity = quantity;
                }
            }
            if (productColorItems.length > 0) {
                productColorItems[0].click();
            }
            productSizeItems[0].click();
            tabItems[0].click();
            // console.log(productColorItems[0]);
            // console.log(productSizeItems[0]);
            // console.log(tabItems[0]);
        }
    } catch {}
}
function renderProduct(data) {
    let mainImgEl = conFig.$(".product__main__img img"); //ok
    let productNameEl = conFig.$(".product-name p"); //ok
    let priceEl = conFig.$(".product-price .price"); //ok

    let colorsEl = conFig.$(".product-colors-container"); //ok
    let sizesEl = conFig.$(".product-sizes-container"); //ok
    let quantity = conFig.$(".quantity-container .quantity"); //ok
    let description = document.getElementById("description"); //ok
    let title = conFig.$("#overrate .title"); //ok

    title.innerHTML = `0 ĐÁNH GIÁ CHO ${data.name}`;
    description.innerHTML = "";
    for (let i = 0; i < data.imgs.length; i++) {
        description.innerHTML += `<img src="${data.imgs[i].img}" alt="">`;
    }
    quantity.innerHTML = 1;
    quantity.dataset.maxquantity = data.quantity;
    if (data.isSale === true) {
        let newPrice =
            (Number.parseInt(data.price) *
                (100 - Number.parseInt(data.discount))) /
            100;
        priceEl.innerHTML = `${newPrice} <sup>đ</sup>`;
    } else {
        priceEl.innerHTML = `${data.price} <sup>đ</sup>`;
    }
    sizesEl.innerHTML = "";
    for (let i = 0; i < data.sizes.length; i++) {
        sizesEl.innerHTML += `<div class="product-size-item border-red">
        <p class="title">${data.sizes[i].name}</p></div>`;
    }

    colorsEl.innerHTML = "";
    if (data.imgs.length > 0) {
        for (let i = 0; i < data.imgs.length; i++) {
            colorsEl.innerHTML += `<div class="product-color-item border-red">
        <img src="${data.imgs[i].img}" alt=""/></div>`;
        }
    }

    productNameEl.innerHTML = data.name;
    mainImgEl.src = data.mainImg;
}
onRenderProduct();
