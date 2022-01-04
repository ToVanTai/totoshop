export default function getPage(search) {
    let result = 1;
    let urlSearchParams = new URLSearchParams(search);
    let params = Object.fromEntries(urlSearchParams.entries());
    if (params.page) {
        result = params.page;
        let myRegular = /[\D]/g;
        if (myRegular.test(result) === true) {
            result = 1;
        }
    }
    if (result < 1) {
        result = 1;
    }
    return result;
}
