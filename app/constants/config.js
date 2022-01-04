export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
export const nameRepository = "totoshop";
export const limit = 8;
export const origin =
    window.location.port === ""
        ? `${window.location.origin}/${nameRepository}`
        : window.location.origin;
export const pages = {
    trang_chu: "trang_chu",
    trang_san_pham: "products",
    trang_chi_tiet_san_pham: "product_detail",
    chinh_sach: "chinhsach",
};
export const about = {
    chinh_sach: "chinhsach",
    thong_tin: "thongtin",
    faq: "faq",
};
const myUrl = "https://js-totoshop.herokuapp.com/api/";
export default myUrl;
