export default function getParams() {
    let result;
    let urlSearchParams = new URLSearchParams(window.location.search);
    result = Object.fromEntries(urlSearchParams.entries());
    return result;
}
