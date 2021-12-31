import * as conFig from "./../constants/config.js";
import * as callApi from "./../utils/callApi.js";
import Swiper from "https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js";
(function () {
    let myPm = new Promise((resolve, reject) => {
        callApi.httpGetMedhod("slides", resolve, reject);
    });
    myPm.then((res) => {
        let data = JSON.parse(res.responseText);
        if (data.length > 0) {
            let swiperSlides = "";
            let mainSlider = conFig.$(".main__slider");
            data.forEach((element) => {
                swiperSlides += `
                <div class="swiper-slide">
                    <div class="main__slider__item">
                        <img
                            src="${element.img}"
                            alt=""
                        />
                    </div>
                </div>
                `;
            });
            mainSlider.innerHTML = `
            <div class="myswiper">
                    <div class="swiper-wrapper">
                        ${swiperSlides}
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>`;
            const myswiper = new Swiper(".myswiper", {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            });
        }
    });
})();
