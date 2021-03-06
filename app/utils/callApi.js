import url from "./../constants/config.js";
export const httpGetMethod = function (myUrl, resolve, reject, pending = null) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            resolve(httpRequest);
        }
        if (httpRequest.readyState === 3 || httpRequest.readyState === 2) {
            if (pending !== null) {
                pending();
            }
        }
        if (httpRequest.readyState === 4 && httpRequest.status !== 200) {
            reject("err");
        }
    };
    httpRequest.open("GET", `${url}${myUrl}`, true);
    httpRequest.send(null);
};
