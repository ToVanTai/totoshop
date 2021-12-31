import "../compontents/homeNav.js";
import "../compontents/sliders.js";
import "../compontents/homeProducts.js";
// show button scroll top when scrolltop > clientHeight;
let clientHeight = document.documentElement.clientHeight;
let btnScrollTop = document.querySelector(".scroll-top");
function scrollTop() {
    let position =
        document.documentElement.scrollTop || document.body.scrollTop;
    if (position > clientHeight) {
        btnScrollTop.classList.add("show");
    } else {
        btnScrollTop.classList.remove("show");
    }
}
window.addEventListener("scroll", scrollTop);
