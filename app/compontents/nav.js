import * as conFig from "../constants/config.js";
import * as callApi from "../utils/callApi.js";
// toggle main nav
(function () {
    let mainNav = conFig.$(".main__nav");
    let btnClose = conFig.$(".main__nav__close");
    let control = conFig.$(".main__nav__mobile__control");
    let overlay = conFig.$(".main__nav__mobile__overlay");
    let show = function () {
        mainNav.classList.add("show");
        overlay.classList.add("show");
    };
    let close = function () {
        mainNav.classList.remove("show");
        overlay.classList.remove("show");
    };
    control.addEventListener("click", show);
    btnClose.addEventListener("click", close);
    overlay.addEventListener("click", close);
})();
const navPromise = new Promise((resolve, reject) => {
    callApi.httpGetMethod("categories", resolve, reject);
});
let hrefNavItem = `${conFig.origin}/${conFig.pages.trang_san_pham}/index.html`;
let hrefHome = `${conFig.origin}/${conFig.pages.trang_chu}/index.html`;
conFig.$(".main__nav__logo__img").href = hrefHome;
conFig.$(".main__nav__mobile__logo").href = hrefHome;
navPromise.then((res) => {
    let data = JSON.parse(res.responseText);
    if (data.length > 0) {
        let date = new Date();
        let mainNav = conFig.$(".main__nav__list");
        mainNav.innerHTML = "";
        mainNav.innerHTML = renderNavItems(data);
        let afterHtml = "";
        afterHtml += `<li class="main__nav__item"><a href="${hrefNavItem}?isSale=true">
        <span class="main__nav__item__sale">hot</span>săn sale tháng ${
            date.getMonth() + 1
        }</a></li>`;
        afterHtml += `<li class="main__nav__item"><a href="#"> chính sách </a></li>`;
        mainNav.innerHTML += afterHtml;
    }
});
function renderNavItems(list) {
    let html = "";
    list.forEach((el) => {
        html += `<li class="main__nav__item"><a href="${hrefNavItem}?name=${el.name}"> ${el.name} </a></li>`;
    });
    return html;
}
let searchBtnOpenMobile = conFig.$(".main__nav__mobile__search");

let searchBtnOpenLarge = conFig.$(".main__nav__header__search");

let mainSearchEl = document.querySelector(".main__search");

let searchOverlayEl = conFig.$(".search__overlay");

let btnSearch = conFig.$(".main__search__container .button-search");
let btnClose = conFig.$(".main__search__container .button-close");
searchBtnOpenMobile.addEventListener("click", onOpenSearch);
searchBtnOpenLarge.addEventListener("click", onOpenSearch);
searchOverlayEl.addEventListener("click", onCloseSearch);
btnSearch.addEventListener("click", onCloseSearch);
btnClose.addEventListener("click", onCloseSearch);

function onOpenSearch() {
    mainSearchEl.classList.add("show");
    searchOverlayEl.classList.add("show");
}
function onCloseSearch() {
    mainSearchEl.classList.remove("show");
    searchOverlayEl.classList.remove("show");
}
