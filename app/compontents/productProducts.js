import * as conFig from "../constants/config.js";
import * as callApi from "../utils/callApi.js";
const urlSearchParams = new URLSearchParams(window.location.search);
let params = Object.fromEntries(urlSearchParams.entries());
let location = window.location;
let pathName = location.pathname;
let limit = 8;
let currentPage = 1;
let namePage = "products";
let dataUrl = "";
let listPage = [];
let pageShowing;
function findPage(list, item) {
    for (let value of list) {
        if (value === item) {
            return true;
        }
    }
    return false;
}
dataUrl = "products?isSale=true&_page=2&_limit=8";
function onChangePagination(dataPage) {
    const url = new URL(window.location);
    url.searchParams.set("page", dataPage);
    history.pushState({}, "", url);
    let isExistPage = findPage(listPage, dataPage);
    if (isExistPage === true) {
        let idPageHide = "page" + pageShowing;
        let idPageShow = "page" + dataPage;
        document.getElementById(idPageShow).style.display = "block";
        document.getElementById(idPageHide).style.display = "none";
        pageShowing = dataPage;
    } else {
        addNewProducts(dataPage);
    }
}
function pendingProducts() {
    conFig.$(".product__list").classList.add("loading");
}
window.onChangePagination = onChangePagination;
function addNewProducts(dataPage) {
    dataUrl = `categories/1/${namePage}/?_page=${dataPage}&_limit=${limit}`;
    let pmNewProduct = new Promise((resolve, reject) => {
        callApi.httpGetMedhod(dataUrl, resolve, reject, pendingProducts);
    });
    pmNewProduct.then((res) => {
        setTimeout(() => {
            conFig.$(".product__list").classList.remove("loading");
        }, 500);
        let idPage = "page" + pageShowing;
        document.getElementById(idPage).style.display = "none";
        let dataRes = JSON.parse(res.responseText);
        let products = dataRes.data;
        let pagination = dataRes.pagination;
        renderMultiProducts(products, pagination);
    });
}
let pmProduct = new Promise((resolve, reject) => {
    callApi.httpGetMedhod(dataUrl, resolve, reject, pendingProducts);
});
pmProduct.then((res) => {
    setTimeout(() => {
        conFig.$(".product__list").classList.remove("loading");
    }, 500);
    let dataRes = JSON.parse(res.responseText);
    let products = dataRes.data;
    let pagination = dataRes.pagination;

    renderMultiProducts(products, pagination);
    // render pagination
    let totalPage = Math.ceil(pagination.totalRows / pagination.limit);
    if (totalPage > 1) {
        let currentPage = pagination.page;
        wdPagination(totalPage, currentPage);
    }
});
// render idPage ,thêm vào danh sách page
function renderMultiProducts(products, pagination) {
    let productList = conFig.$(".product__list"); //el danh sách productlist
    let pageContainer = document.createElement("div"); //el #page
    let idPage = "page" + pagination.page;
    listPage.push(pagination.page);
    pageShowing = pagination.page;
    pageContainer.setAttribute("id", idPage);
    let pageContainerHtml = "";
    if (products.length > 0) {
        products.forEach((product) => {
            pageContainerHtml += renderProduct(product);
        });
    }
    pageContainer.innerHTML += pageContainerHtml;
    productList.appendChild(pageContainer);
}
//render 1 product
function replaceMainImg(event) {
    let target = event.target;
    if (target.matches(".img-extra")) {
        let imgExtra = target.dataset.img;
        let parentNode = target.parentNode.parentNode;
        let imgMain = parentNode.querySelector(".img-main");
        imgMain.src = imgExtra;
    } else if (target.matches(".img")) {
        let src = target.src;
        let parentNode = target.parentNode.parentNode.parentNode;
        let imgMain = parentNode.querySelector(".img-main");
        imgMain.src = src;
    }
}

window.replaceMainImg = replaceMainImg;
function replaceExtraImg(event) {
    let target = event.target;
    if (target.matches(".product__item__img-list")) {
        let parentNode = target.parentNode;
        let imgMain = parentNode.querySelector(".img-main");
        imgMain.src = parentNode.dataset.img;
    }
}

window.replaceExtraImg = replaceExtraImg;
function renderProduct(data) {
    function renderProductExtra(dataEt) {
        let exHtml = ``;
        if (dataEt.length > 0) {
            dataEt.forEach((el) => {
                exHtml += `<div onmouseover="replaceMainImg(event)" data-img="${el.img}" class="img-extra">`;
                exHtml += `<img class="img" src="${el.img}" alt="" />`;
                exHtml += ` </div>`;
            });
        }
        return exHtml;
    }
    let html = ``;
    if (data.isSale === true) {
        let newPrice = data.price * (0.1 * data.discount);
        html += `<div class="product__item discount col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">`;
        html += `<a href="" data-img="${data.mainImg}" class="product__item__img">`;
        html += `<img  class="img-main" src="${data.mainImg}" alt="" />`;
        html += `<span class="img-discount">-${data.discount}% </span>`;
        html += `<div class="product__item__img-list" >`;
        html += renderProductExtra(data.imgs);
        html += `</div>`;
        html += `</a>`;
        html += `<div class="product__item__price">`;
        html += `<h4 class="old-price">${data.price}<span>đ</span></h4>`;
        html += `<h4 class="new-price">${newPrice}<span>đ</span></h4>`;
        html += `</div>`;
        html += `</div>`;
    } else {
        html += `<div class="product__item col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">`;
        html += `<a data-img="${data.mainImg}" class="product__item__img">`;
        html += `<img class="img-main" src="${data.mainImg}" alt="" />`;
        html += `<div onmouseleave="replaceExtraImg(event)" class="product__item__img-list">`;
        html += renderProductExtra(data.imgs);
        html += `</div>`;
        html += `</a>`;
        html += `<div class="product__item__price">`;
        html += `<h4 class="old-price">${data.price}<span>đ</span></h4>`;
        html += `</div>`;
        html += `</div>`;
    }
    return html;
}
// render pagination

// pagination
var paginationEl = conFig.$(".product__pagination > ul");
function pagination(totalPage, currentPage) {
    let liTag = "";
    if (totalPage > 5) {
        let before = currentPage - 1;
        let after = currentPage + 1;
        if (currentPage > 1) {
            liTag += `<li onclick="wdPagination(${totalPage},${
                currentPage - 1
            });onChangePagination(${
                currentPage - 1
            });" class="button prev">Prev</li>`;
        }
        if (currentPage > 2) {
            liTag += `<li onclick="wdPagination(${totalPage},1);onChangePagination(1)" class="numb">1</li>`;
            if (currentPage > 3) {
                liTag += `<li class="dots">...</li>`;
            }
        }
        if (currentPage == 1) {
            before++;
            after++;
        }
        if (currentPage == totalPage) {
            before--;
            after--;
        }
        for (let i = before; i <= after; i++) {
            if (i == currentPage) {
                liTag += `<li class="numb active">${i}</li>`;
            } else {
                liTag += `<li onclick="wdPagination(${totalPage},${i});onChangePagination(${i});" class="numb">${i}</li>`;
            }
        }
        if (currentPage < totalPage - 1) {
            if (currentPage < totalPage - 2) {
                liTag += `<li class="dots">...</li>`;
            }
            liTag += `<li onclick="wdPagination(${totalPage},${totalPage});onChangePagination(${totalPage})" class="numb">${totalPage}</li>`;
        }
        if (currentPage < totalPage) {
            liTag += `<li onclick="wdPagination(${totalPage},${
                currentPage + 1
            });onChangePagination(${
                currentPage + 1
            })" class="button next">Next</li>`;
        }
    } else {
        if (currentPage > 1) {
            liTag += `<li onclick="wdPagination(${totalPage},${
                currentPage - 1
            });onChangePagination(${
                currentPage - 1
            })" class="button prev">Prev</li>`;
        }
        for (let i = 1; i <= totalPage; i++) {
            if (i == currentPage) {
                liTag += `<li class="numb active">${i}</li>`;
            } else {
                liTag += `<li onclick="wdPagination(${totalPage},${i});onChangePagination(${i})" class="numb">${i}</li>`;
            }
        }
        if (currentPage < totalPage) {
            liTag += `<li onclick="wdPagination(${totalPage},${
                currentPage + 1
            });onChangePagination(${
                currentPage + 1
            })" class="button next">Next</li>`;
        }
    }
    paginationEl.innerHTML = liTag;
}
window.wdPagination = pagination;
// end pagination

// show category
let productCategory = conFig.$(".product__categorysb");
let productCategoryClose = conFig.$(".product__categorysb__close");
let productControlFilter = conFig.$(".product__control__filter");
function closeCategory() {
    productCategory.classList.remove("open");
}
productControlFilter.onclick = function () {
    productCategory.classList.toggle("open");
};
productCategoryClose.addEventListener("click", closeCategory);
// end product category
