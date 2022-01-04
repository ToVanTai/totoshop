import { pages, about, origin, $ } from "./../constants/config.js";
import { httpGetMethod } from "./../utils/callApi.js";
let footerThongtin = $(".footer__about-thongtin");
let footerChinhsach = $(".footer__about-chinhsach");
let footerFaq = $(".footer__about-faq");
//<a href="" class="link">câu hỏi thường gặp</a>
async function renderFooter(url, footerCategory) {
    try {
        let footerPm = new Promise((res, rej) => {
            httpGetMethod(url, res, rej);
        });
        footerPm.then((res) => {
            let dataRes = JSON.parse(res.responseText);
            if (dataRes.length > 0) {
                let innerHtml = "";
                for (let i = 0; i < dataRes.length; i++) {
                    let href = `${origin}/${pages.chinh_sach}/index.html?name=${dataRes[i].name}&type=${url}`;
                    innerHtml += `<a href="${href}" class="link">${dataRes[i].name}</a>`;
                }
                footerCategory.innerHTML += innerHtml;
            }
        });
        await footerPm;
    } catch {}
}
renderFooter(about.chinh_sach, footerChinhsach);
renderFooter(about.thong_tin, footerThongtin);
renderFooter(about.faq, footerFaq);
// chinhsach thongtin faq
