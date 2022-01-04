import * as conFig from "./../constants/config.js";
import * as callApi from "./../utils/callApi.js";
import getPage from "./../utils/getPage.js";
import getParams from "./../utils/getParams.js";
//
const nameTableProducts = "products";
const nameTableCategories = "categories";
let dataUrl = "";
let params = getParams();
let page = getPage(window.location.search);
let id = -1;
let isSale = false;
let limit = conFig.limit;
//
let listPage = [];
let pageShowing;
function setDataUrl() {
    let result = "";
    if (isSale === true || isSale === "true") {
        result = `${nameTableProducts}?isSale=${isSale}&_page=${page}&_limit=${limit}`;
    } else {
        result = `${nameTableCategories}/${id}/${nameTableProducts}?_page=${page}&_limit=${limit}`;
    }
    return result;
}
function setProductsHeading() {
    let productHeadingEl = conFig.$(".product__heading > h2");
    if (id === -1) {
        let date = new Date();
        let innerText = `SALE THÁNG ${date.getMonth() + 1}`;
        productHeadingEl.innerHTML = innerText;
    } else {
        productHeadingEl.innerHTML = `${params.name}`;
    }
}
async function setUrl() {
    try {
        if (params.isSale === true || params.isSale === "true") {
            // trên thanh params có isSalse là true
            isSale = true;
        } else {
            if (params.name) {
                // trên thanh param tồn tại name
                let test = `${nameTableCategories}?name=${params.name}`;
                let categoryPm = new Promise((resolve, reject) => {
                    callApi.httpGetMethod(test, resolve, reject);
                });
                categoryPm.then((res) => {
                    let resData = JSON.parse(res.responseText);
                    if (resData.length > 0) {
                        id = resData[0].id;
                    } else {
                        isSale = true;
                    }
                });
                await categoryPm;
            } else {
                // trên thanh params không tồn tại name
                isSale = true;
            }
        }

        dataUrl = setDataUrl();
        // đã có dataUrl
        // render productList và pagination
        setProductsHeading();
        let pmProduct = new Promise((resolve, reject) => {
            callApi.httpGetMethod(dataUrl, resolve, reject, pendingProducts);
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
        await pmProduct;
    } catch {}
}

setUrl();

//
function findPage(list, item) {
    for (let value of list) {
        if (value === item) {
            return true;
        }
    }
    return false;
}
function pendingProducts() {
    conFig.$(".product__list").classList.add("loading");
}
// render 1 sản phẩm. tham số {name,title....}
function renderProduct(data) {
    let hrefDetailProduct = `${conFig.origin}/${conFig.pages.trang_chi_tiet_san_pham}/index.html?id=${data.id}`;
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
        html += `<a href="${hrefDetailProduct}" data-img="${data.mainImg}" class="product__item__img">`;
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
        html += `<a href="${hrefDetailProduct}" data-img="${data.mainImg}" class="product__item__img">`;
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
// end render 1 sản phẩm.

// render nhiều sản phẩm ,append id PageX, thay đổi pageShowing, thêm vào listPage.
// tham số:[product,product..],pagination
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
// end render nhiều sản phẩm

// on click pagination : thay đổi url,
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
window.onChangePagination = onChangePagination;
function addNewProducts(dataPage) {
    page = dataPage;
    dataUrl = setDataUrl();
    let pmNewProduct = new Promise((resolve, reject) => {
        callApi.httpGetMethod(dataUrl, resolve, reject, pendingProducts);
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
// end on click changePagination

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
