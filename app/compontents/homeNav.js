import * as conFig from "../constants/conFig.js";
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
    callApi.httpGetMedhod("categories", resolve, reject);
});
let isDev = true;
let port = window.location.port;
if ((port = "")) {
    isDev = false;
}
if ((isDev = true)) {
    console.log("là môi trường dev");
} else {
    console.log("là môi trường production");
}
navPromise.then((res) => {
    let data = JSON.parse(res.responseText);
    if (data.length > 0) {
        let mainNav = conFig.$(".main__nav__list");
        mainNav.innerHTML = "";
        mainNav.innerHTML = renderNavItems(data);
        let afterHtml = "";
        afterHtml += `<li class="main__nav__item"><a href="#">
        <span class="main__nav__item__sale">hot</span>săn sale tháng 12</a></li>`;
        afterHtml += `<li class="main__nav__item"><a href="#"> chính sách </a></li>`;
        mainNav.innerHTML += afterHtml;
    }
});
function renderNavItems(list) {
    let html = "";
    list.forEach((el) => {
        html += `<li class="main__nav__item"><a href="#"> ${el.name} </a></li>`;
    });
    return html;
}