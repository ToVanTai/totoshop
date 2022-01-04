export default function fnIsDev() {
    let result = true;
    let port = window.location.port;
    if (port === "") {
        result = false;
    }
    return result;
}
